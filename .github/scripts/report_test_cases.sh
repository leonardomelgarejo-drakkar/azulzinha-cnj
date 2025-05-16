#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Reportando Test Cases como subtasks…"
mkdir -p tmp

# 1) Mapeia FEATURE → PARENT_ID
declare -A PARENT
while IFS='|' read -r FEATURE ID; do
  PARENT["$FEATURE"]=$ID
done < tmp/scenario_ids.csv

# 2) Lista cenários
readarray -t SCENARIOS < <(
  jq -r '.[].elements[].name' test-results/cucumber-report.json | sort -u
)

for idx in "${!SCENARIOS[@]}"; do
  SCENARIO="${SCENARIOS[idx]}"
  FEATURE=$(jq -r --arg s "$SCENARIO" '
    .[] | select([.elements[].name]|index($s)) | .name
  ' test-results/cucumber-report.json)

  PARENT_ID=${PARENT["$FEATURE"]}
  if [ -z "$PARENT_ID" ]; then
    echo "⚠️ Pai não encontrado para \"$SCENARIO\""
    continue
  fi

  TASK_NAME="$SCENARIO"
  echo "🔎 Carregando parent $PARENT_ID com subtasks…"
  RESPONSE=$(curl -s -G "https://api.clickup.com/api/v2/task/$PARENT_ID" \
    --data-urlencode "include_subtasks=true" \
    -H "Authorization: $CLICKUP_TOKEN")
  SUBS=$(echo "$RESPONSE" | jq '.subtasks // []')
  TASK_ID=$(echo "$SUBS" | jq -r --arg name "$TASK_NAME" '.[] | select(.name==$name) | .id // empty')
  EXISTING_STATUS=$(echo "$SUBS" | jq -r --arg name "$TASK_NAME" '.[] | select(.name==$name) | .status // empty')

  # 3) Define novo status
  if jq -e --arg s "$SCENARIO" '
      [ .[] | .elements[] | select(.name==$s) | .steps[] | select(.result.status=="failed") ] | length>0
    ' test-results/cucumber-report.json >/dev/null; then
    NEW_STATUS="rejected"
  else
    NEW_STATUS="test complete"
  fi

  # 4) Prepara comentário de passos e erros
  RAW=$(jq -r --arg s "$SCENARIO" '
    .[] | .elements[] | select(.name==$s)
    | .steps[] | select((.keyword|test("^(Before|After)";"i"))|not)
    | .keyword + " " + .name
      + (if .result.status=="failed" then "\nError: " + (.result.error_message|gsub("\r?\n";"\n")) else "" end)
  ' test-results/cucumber-report.json)
  COMMENT="Scenario: $SCENARIO"$'\n'"$RAW"

  # 5) Extrai e salva embeddings como arquivos
  readarray -t EMBEDS < <(
    jq -r --arg s "$SCENARIO" '
      .[]
      | select([.elements[].name]|index($s))
      | (
          (.elements[] | select(.name==$s) | .steps[]?.embeddings[]?),
          (.elements[] | select(.name==$s) | .embeddings[]?)
        )
      | select(.mime_type != null)
      | .mime_type + "," + (.data // "")
    ' test-results/cucumber-report.json
  )
  ATTACH_FILES=()
  for e in "${EMBEDS[@]}"; do
    MTYPE=${e%%,*}
    B64=${e#*,}
    [ -z "$B64" ] && continue
    case "$MTYPE" in
      video/webm)       EXT="webm" ;;
      application/json) EXT="json" ;;
      text/plain)       EXT="txt" ;;
      image/png)        EXT="png" ;;
      *)                EXT="bin" ;;
    esac
    BASE="tmp/${idx}_${SCENARIO// /_}"
    FNAME="${BASE}.${EXT}"
    COUNT=1
    while [[ -e "$FNAME" ]]; do
      FNAME="${BASE}_${COUNT}.${EXT}"
      ((COUNT++))
    done
    echo "$B64" | base64 -d > "$FNAME"
    ATTACH_FILES+=( "$FNAME" )
  done

  # 6) Cria ou atualiza a subtask
  if [ -n "$TASK_ID" ]; then
    echo "✅ Subtask existente (ID=$TASK_ID) status=$EXISTING_STATUS"
    if [ "$EXISTING_STATUS" != "$NEW_STATUS" ]; then
      echo "🔄 Atualizando status $EXISTING_STATUS → $NEW_STATUS"
      curl -s -X PUT "https://api.clickup.com/api/v2/task/$TASK_ID" \
        -H "Authorization: $CLICKUP_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"status\":\"$NEW_STATUS\"}"
      echo "📎 Anexando evidências após mudança para '$NEW_STATUS'..."
      for F in "${ATTACH_FILES[@]}"; do
        echo "📎 Anexando '$F'"
        curl -s -X POST "https://api.clickup.com/api/v2/task/$TASK_ID/attachment" \
          -H "Authorization: $CLICKUP_TOKEN" \
          -F "attachment=@${F}"
      done
      if [ "$NEW_STATUS" = "rejected" ]; then
        curl -s -X POST "https://api.clickup.com/api/v2/task/$TASK_ID/comment" \
          -H "Authorization: $CLICKUP_TOKEN" \
          -H "Content-Type: application/json" \
          -d "$(jq -n --arg text "$COMMENT" '{comment_text:$text}')"
      fi
    else
      echo "ℹ️ Status já é '$EXISTING_STATUS' – sem anexos nem comentários."
    fi
  else
    echo "➕ Criando subtask '$TASK_NAME' → $NEW_STATUS"
    PAYLOAD=$(jq -n \
      --arg name        "$TASK_NAME" \
      --arg description "$COMMENT" \
      --arg status      "$NEW_STATUS" \
      --arg parent      "$PARENT_ID" \
      --argjson custom_item_id 1010 \
      '{name:$name,description:$description,status:$status,parent:$parent,custom_item_id:$custom_item_id}')
    CREATED=$(curl -s -X POST "https://api.clickup.com/api/v2/list/$LIST_ID/task" \
      -H "Authorization: $CLICKUP_TOKEN" \
      -H "Content-Type: application/json" \
      -d "$PAYLOAD")
    TASK_ID=$(echo "$CREATED" | jq -r '.id')
    echo "📎 Anexando evidências na criação de subtask..."
    for F in "${ATTACH_FILES[@]}"; do
      echo "📎 Anexando '$F'"
      curl -s -X POST "https://api.clickup.com/api/v2/task/$TASK_ID/attachment" \
        -H "Authorization: $CLICKUP_TOKEN" \
        -F "attachment=@${F}"
    done
  fi

done
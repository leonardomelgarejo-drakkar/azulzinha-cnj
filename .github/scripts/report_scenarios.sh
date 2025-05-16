#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Reportando Test Scenarios..."
mkdir -p tmp
> tmp/scenario_ids.csv

readarray -t FEATURES < <(jq -r '.[].name' test-results/cucumber-report.json | sort -u)
for FEATURE in "${FEATURES[@]}"; do
  if jq -e --arg f "$FEATURE" '
      [ .[] | select(.name==$f) | .elements[] | .steps[] 
        | select(.result.status=="failed") ] | length>0
    ' test-results/cucumber-report.json >/dev/null; then
    NEW_STATUS="rejected"
  else
    NEW_STATUS="test complete"
  fi

  echo "🔎 Buscando '$FEATURE'…"
  RESPONSE=$(curl -s -G "https://api.clickup.com/api/v2/list/$LIST_ID/task" \
    --data-urlencode "search=$FEATURE" \
    --data-urlencode "include_closed=true" \
    -H "Authorization: $CLICKUP_TOKEN")
  TASK_ID=$(echo "$RESPONSE" | jq -r --arg name "$FEATURE" '.tasks[] | select(.name==$name) | .id // empty')
  EXISTING_STATUS=$(echo "$RESPONSE" | jq -r --arg name "$FEATURE" '.tasks[] | select(.name==$name) | .status // empty')

  if [ -n "$TASK_ID" ]; then
    if [ "$EXISTING_STATUS" != "$NEW_STATUS" ]; then
      echo "🔄 Atualizando '$FEATURE' ($TASK_ID): $EXISTING_STATUS → $NEW_STATUS"
      curl -s -X PUT "https://api.clickup.com/api/v2/task/$TASK_ID" \
        -H "Authorization: $CLICKUP_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"status\":\"$NEW_STATUS\"}"
    else
      echo "✅ '$FEATURE' já está em '$EXISTING_STATUS'."
    fi
  else
    echo "➕ Criando '$FEATURE' → $NEW_STATUS"
    CREATED=$(curl -s -X POST "https://api.clickup.com/api/v2/list/$LIST_ID/task" \
      -H "Authorization: $CLICKUP_TOKEN" \
      -H "Content-Type: application/json" \
      -d "$(jq -n \
            --arg name        "$FEATURE" \
            --arg description "Feature \"$FEATURE\" com status: $NEW_STATUS." \
            --arg status      "$NEW_STATUS" \
            --argjson custom_item_id 1009 \
            '{name:$name,description:$description,status:$status,custom_item_id:$custom_item_id}')")
    TASK_ID=$(echo "$CREATED" | jq -r '.id')
  fi

  echo "${FEATURE}|${TASK_ID}" >> tmp/scenario_ids.csv
done
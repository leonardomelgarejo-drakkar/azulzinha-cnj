#!/usr/bin/env bash
set -euo pipefail

# Valida variáveis de ambiente obrigatórias
: "${CLICKUP_TOKEN:?Environment variable CLICKUP_TOKEN is not set}"
: "${WORKSPACE_ID:?Environment variable WORKSPACE_ID is not set}"
: "${DOC_ID:?Environment variable DOC_ID is not set}"
: "${PAGE_ID:?Environment variable PAGE_ID is not be set}"

REPORT_JSON="test-results/cucumber-report.json"
if [[ ! -f "$REPORT_JSON" ]]; then
  echo "❌ Arquivo $REPORT_JSON não encontrado!" >&2
  exit 1
fi

echo "📝 Gerando QA Report em Markdown…"
mkdir -p tmp

# 1) Indicadores de Test Scenarios (features)
TOTAL_SCENARIOS=$(jq 'length' "$REPORT_JSON")
FAILED_SCENARIOS=$(jq '[ .[] | select((.elements?[]? | select(.steps?[]? | .result?.status? == "failed")))] | length' "$REPORT_JSON")
EXECUTED_SCENARIOS=$((TOTAL_SCENARIOS - FAILED_SCENARIOS))

# 2) Indicadores de Test Cases (cenários únicos)
TOTAL_CASES=$(jq '[ .[].elements?[]?.name ] | unique | length' "$REPORT_JSON")
FAILED_CASES=$(jq '[ .[].elements?[]? | select(.steps?[]? | .result?.status? == "failed") | .name ] | unique | length' "$REPORT_JSON")
EXECUTED_CASES=$((TOTAL_CASES - FAILED_CASES))

# 3) Monta o Markdown inicial
cat <<EOF > tmp/qa_report.md
## Test Results

![Totals](https://img.shields.io/badge/Totals-green?style=for-the-badge)
| **Type**           | **Total** | **Executed** | **Failed** |
|:------------------:|:---------:|:------------:|:----------:|
| Test_Scenarios     | $TOTAL_SCENARIOS | $EXECUTED_SCENARIOS | $FAILED_SCENARIOS |
| Test_Cases         | $TOTAL_CASES     | $EXECUTED_CASES     | $FAILED_CASES     |

![Cases per Scenario](https://img.shields.io/badge/Cases%20Per%20Scenario-purple?style=for-the-badge)
| **Scenario**      | **Passed**   | **Failed** |
|:-----------------:|:-----------:|:----------:|
EOF

# 4) Preenche a tabela “Number of test cases per Test Scenario”
mapfile -t FEATURES < <(jq -r '.[].name // empty | unique' "$REPORT_JSON")
for FEATURE in "${FEATURES[@]}"; do
  TOTAL=$(jq --arg f "$FEATURE" '[ .[] | select(.name==$f) | .elements?[]?.name ] | unique | length' "$REPORT_JSON")
  FAILED=$(jq --arg f "$FEATURE" '[ .[] | select(.name==$f) | .elements?[]? | select(.steps?[]? | .result?.status? == "failed") | .name ] | unique | length' "$REPORT_JSON")
  PASSED=$((TOTAL - FAILED))
  echo "| $FEATURE | $PASSED | $FAILED |" >> tmp/qa_report.md
done

# 5) Test Evidence links extraídos dos attachments
ATTACH_CSV="tmp/attachments_urls.csv"
if [[ -f "$ATTACH_CSV" ]]; then
  declare -A EVIDENCES
  declare -A COUNT

  # 5.1) Acumula URLs por FEATURE|||SCENARIO
  while IFS='|' read -r FEATURE SCENARIO URL; do
    KEY="${FEATURE}|||${SCENARIO}"
    if [[ -n "${EVIDENCES[$KEY]:-}" ]]; then
      EVIDENCES[$KEY]="${EVIDENCES[$KEY]}||$URL"
      COUNT[$KEY]=$((COUNT[$KEY] + 1))
    else
      EVIDENCES[$KEY]="$URL"
      COUNT[$KEY]=1
    fi
  done < "$ATTACH_CSV"

  # 5.2) Para cada FEATURE em ordem alfabética
  mapfile -t FEATURES < <(
    printf '%s\n' "${!EVIDENCES[@]}" |
    cut -d '|' -f1 |
    sort -u
  )

  for FEATURE in "${FEATURES[@]}"; do
    # Descobre cenários deste FEATURE e calcula máximo de evidências
    mapfile -t SCENARIOS < <(
      printf '%s\n' "${!EVIDENCES[@]}" |
      grep -F "${FEATURE}|||" |
      cut -d '|' -f4 |
      sort -u
    )
    MAX=0
    for SCENARIO in "${SCENARIOS[@]}"; do
      CNT=${COUNT["${FEATURE}|||${SCENARIO}"]:-0}
      ((CNT > MAX)) && MAX=$CNT
    done

    # Insere badge e cabeçalho dinâmico
    {
      echo ""
      echo "![Test Evidence](https://img.shields.io/badge/Test%20Evidence-orange?style=for-the-badge)"
      header="| Test Scenario       | Test Case            "
      sep="|:-------------------:|:--------------------:"
      for ((i=1; i<=MAX; i++)); do
        header+="| Test Evidence $i "
        sep+="|:---------------:"
      done
      header+="|"
      sep+="|"
      echo "$header"
      echo "$sep"
    } >> tmp/qa_report.md

    # Preenche linhas
    for SCENARIO in "${SCENARIOS[@]}"; do
      KEY="${FEATURE}|||${SCENARIO}"
      IFS='||' read -r -a URLS <<< "${EVIDENCES[$KEY]:-}"

      line="| $FEATURE | $SCENARIO "
      for url in "${URLS[@]}"; do
        [[ -n "$url" ]] && line+="| [ver evidência]($url) " || line+="|  "
      done

      # preenche colunas vazias
      for ((c=${#URLS[@]}; c<MAX; c++)); do
        line+="|  "
      done
      line+="|"

      echo "$line" >> tmp/qa_report.md
    done
  done
else
  echo "🔍 Nenhum attachment encontrado em $ATTACH_CSV"
fi

# 6) Atualiza documento no ClickUp
echo "🔄 Atualizando ClickUp Doc com QA Report…"
CONTENT=$(jq -Rs . tmp/qa_report.md)
cat <<JSON > tmp/payload.json
{"content_format":"text/md","content":$CONTENT}
JSON

curl -s -X PUT \
  "https://api.clickup.com/api/v3/workspaces/${WORKSPACE_ID}/docs/${DOC_ID}/pages/${PAGE_ID}" \
  -H "Authorization: ${CLICKUP_TOKEN}" \
  -H "Content-Type: application/json" \
  --data-binary @tmp/payload.json

echo "✅ QA Report enviado para ClickUp"
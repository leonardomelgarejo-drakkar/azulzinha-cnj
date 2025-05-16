#!/usr/bin/env bash
set -euo pipefail

# Valida variáveis de ambiente obrigatórias
: "${CLICKUP_TOKEN:?Environment variable CLICKUP_TOKEN is not set}"
: "${WORKSPACE_ID:?Environment variable WORKSPACE_ID is not set}"
: "${DOC_ID:?Environment variable DOC_ID is not set}"
: "${PAGE_ID:?Environment variable PAGE_ID is not set}"

# Caminho do relatório JSON
REPORT_JSON="test-results/cucumber-report.json"
if [[ ! -f "$REPORT_JSON" ]]; then
  echo "❌ Arquivo $REPORT_JSON não encontrado!" >&2
  exit 1
fi

echo "📝 Gerando QA Report em Markdown…"
mkdir -p tmp

# 1) Indicadores de Test Scenarios (features)
TOTAL_SCENARIOS=$(jq 'length' "$REPORT_JSON")
FAILED_SCENARIOS=$(jq '[ .[] | select([ .elements[].steps[].result.status ] | index("failed")) ] | length' "$REPORT_JSON")
EXECUTED_SCENARIOS=$((TOTAL_SCENARIOS - FAILED_SCENARIOS))

# 2) Indicadores de Test Cases (cenários únicos)
TOTAL_CASES=$(jq '[ .[].elements[].name ] | unique | length' "$REPORT_JSON")
FAILED_CASES=$(jq '[ .[].elements[] | select([ .steps[].result.status ] | index("failed")) | .name ] | unique | length' "$REPORT_JSON")
EXECUTED_CASES=$((TOTAL_CASES - FAILED_CASES))

# 3) Monta o Markdown inicial
cat <<EOF > tmp/qa_report.md
## Test Results

![Totals](https://img.shields.io/badge/Totals%20-green?style=for-the-badge)
| **Type**           | **Total** | **Executed** | **Failed** |
|:------------------:|:---------:|:------------:|:----------:|
| Test_Scenarios     | $TOTAL_SCENARIOS | $EXECUTED_SCENARIOS | $FAILED_SCENARIOS |
| Test_Cases         | $TOTAL_CASES     | $EXECUTED_CASES     | $FAILED_CASES     |

![Cases per Scenario](https://img.shields.io/badge/Cases%20%20Per%20Scenario-purple?style=for-the-badge)
| **Scenario**      | **Passed**   | **Failed** |
|:-----------------:|:-----------:|:----------:|
EOF

# 4) Preenche a tabela “Number of test cases per Test Scenario”
mapfile -t FEATURES < <(jq -r '.[].name' "$REPORT_JSON" | sort -u)
for FEATURE in "${FEATURES[@]}"; do
  TOTAL=$(jq --arg f "$FEATURE" '[ .[] | select(.name==$f) | .elements[].name ] | unique | length' "$REPORT_JSON")
  FAILED=$(jq --arg f "$FEATURE" '[ .[] | select(.name==$f) | .elements[] | select([.steps[].result.status]|index("failed")) | .name ] | unique | length' "$REPORT_JSON")
  PASSED=$((TOTAL - FAILED))
  echo "| $FEATURE | $PASSED | $FAILED |" >> tmp/qa_report.md
done

# 5) Link para o relatório completo em HTML
cat <<EOF >> tmp/qa_report.md

![Test Evidence](https://img.shields.io/badge/Test%20Evidence-orange?style=for-the-badge)

| **HTML Report** |
|:---------------:|
| [Open full report (HTML)](https://leonardomelgarejo-drakkar.github.io/azulzinha-cnj/) |
EOF

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
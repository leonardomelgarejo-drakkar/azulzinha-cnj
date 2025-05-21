#!/usr/bin/env bash
set -euo pipefail

TAGS_INPUT="$1"
TAGS_OPTION=""

if [[ -n "$TAGS_INPUT" ]]; then
  TAGS_OPTION="--tags=\"$TAGS_INPUT\""
fi

# executa os testes e coleta o log
echo "📌 Executando: npx cross-env ENV=test FORCE_COLOR=0 cucumber-js --config=config/cucumber.js $TAGS_OPTION"
eval npx cross-env ENV=test FORCE_COLOR=0 cucumber-js --config=config/cucumber.js $TAGS_OPTION | tee output.log

# falha se encontrar “failed”
if grep -q "failed" output.log; then
  echo "❌ Testes falharam!"
  exit 1
fi
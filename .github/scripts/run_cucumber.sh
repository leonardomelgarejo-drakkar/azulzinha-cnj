#!/usr/bin/env bash
set -euo pipefail

TAGS_INPUT="$1"
TAGS_OPTION=""

# Detecta número de núcleos disponíveis (fallback: 2)
if command -v nproc >/dev/null; then
  PARALLEL=$(nproc)
else
  PARALLEL=2
fi

# Prepara as tags se fornecidas
if [[ -n "$TAGS_INPUT" ]]; then
  TAGS_OPTION="--tags \"$TAGS_INPUT\""
fi

echo "📌 Executando testes com $PARALLEL workers..."
echo "📌 Comando: npx cross-env ENV=test FORCE_COLOR=0 cucumber-js --config=config/cucumber.js $TAGS_OPTION --parallel $PARALLEL"

# Executa testes e salva log
eval npx cross-env ENV=test FORCE_COLOR=0 cucumber-js --config=config/cucumber.js $TAGS_OPTION --parallel $PARALLEL | tee output.log

# Verifica falha
if grep -q "failed" output.log; then
  echo "❌ Testes falharam!"
  exit 1
fi
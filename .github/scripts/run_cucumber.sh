#!/usr/bin/env bash
set -euo pipefail

TAGS_INPUT="$1"
TAGS_OPTION=""

if [[ -n "$TAGS_INPUT" ]]; then
  TAGS_OPTION="--TAGS=$TAGS_INPUT"
fi

# executa os testes e coleta o log
npm test $TAGS_OPTION --exit | tee output.log

# falha se encontrar “failed”
if grep -q "failed" output.log; then
  echo "❌ Testes falharam!"
  exit 1
fi
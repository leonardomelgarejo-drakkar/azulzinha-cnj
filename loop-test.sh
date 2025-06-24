#!/bin/bash

count=0

while true; do
  count=$((count+1))
  echo "🏁 Execução número $count..."
  
  # roda somente o cenário com a tag desejada
  npm test --tags="@pagamento-aprovado and @1x" --fail-fast

  status=$?
  
  if [ $status -ne 0 ]; then
    echo "❌ Falha detectada na execução $count. Encerrando loop."
    break
  fi
done

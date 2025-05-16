#!/usr/bin/env bash
set -euo pipefail

# Script para criar o arquivo de ambiente de teste
# Variables esperadas via ENV:
# USER_NAME, PASSWORD, BASEURL, RESOURCE_PATH_DEPOSITO_JUDICIAL

ENV_DIR="helper/env"
ENV_FILE="$ENV_DIR/.env.test"

mkdir -p "$ENV_DIR"
cat > "$ENV_FILE" <<EOF
USER_NAME=$USER_NAME
PASSWORD=$PASSWORD
BASEURL=$BASEURL
RESOURCE_PATH_DEPOSITO_JUDICIAL=$RESOURCE_PATH_DEPOSITO_JUDICIAL
ENV=test
EOF

echo "✅ Arquivo de ambiente criado em $ENV_FILE"
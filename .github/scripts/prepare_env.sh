#!/usr/bin/env bash
set -euo pipefail

# Script para criar o arquivo de ambiente de teste
# Variáveis esperadas via ENV:
# ENV, USER_NAME, PASSWORD, BASEURL, RESOURCE_PATH_DEPOSITO_JUDICIAL

ENV_DIR="helper/env"
ENV_FILE="$ENV_DIR/.env.${ENV}"

mkdir -p "$ENV_DIR"

cat > "$ENV_FILE" <<EOF
USER_NAME=$USER_NAME
PASSWORD=$PASSWORD
BASEURL=$BASEURL
RESOURCE_PATH_DEPOSITO_JUDICIAL=$RESOURCE_PATH_DEPOSITO_JUDICIAL
ENV=$ENV
EOF

echo "✅ Arquivo de ambiente criado em $ENV_FILE"
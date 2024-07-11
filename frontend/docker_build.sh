#!/bin/bash
echo "Started:"

# Navigate to the frontend directory (current directory of the script)
cd "$(dirname "$0")"

# Load environment variables from .env_dev file in the root directory
set -o allexport
source ../.env_dev
set +o allexport

# Print environment variables for debugging
echo "Loaded environment variables:"
echo "VUE_APP_BACKEND_PATH=${VUE_APP_BACKEND_PATH}"
echo "VUE_APP_LOGIN_PATH=${VUE_APP_LOGIN_PATH}"

# Build the Docker image with the environment variables as build arguments, without cache
docker build --no-cache --build-arg VUE_APP_BACKEND_PATH="${VUE_APP_BACKEND_PATH}" \
             --build-arg VUE_APP_LOGIN_PATH="${VUE_APP_LOGIN_PATH}" \
             --build-arg VUE_APP_KEYCLOAK_REALM="${VUE_APP_KEYCLOAK_REALM}" \
             --build-arg VUE_APP_KEYCLOAK_CLIENTID="${VUE_APP_KEYCLOAK_CLIENTID}" \
             -t rgz-ocr-frontend:latest -f Dockerfile .
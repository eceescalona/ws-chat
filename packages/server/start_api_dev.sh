#!/bin/bash

cleanup() {
  echo "Received SIGINT signal, cleaning up..."
  yarn dev:dependencies:down
  exit 0
}

trap cleanup SIGINT

yarn dev:dependencies:up
yarn build
DOTENV_CONFIG_PATH=config/development.env NODE_ENV=development NODE_PATH=dist nodemon --ext ts --exec 'yarn build && node -r dotenv/config --inspect dist/index.js'
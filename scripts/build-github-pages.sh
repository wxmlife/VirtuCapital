#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

rm -rf \
  "$ROOT_DIR/build" \
  "$ROOT_DIR/.docusaurus-github-pages" \
  "$ROOT_DIR/admin-guide/build"

DOCUSAURUS_GENERATED_FILES_DIR_NAME=.docusaurus-github-pages \
  DEPLOY_TARGET=github-pages \
  npm run build:user

DEPLOY_TARGET=github-pages npm run build:admin

mkdir -p "$ROOT_DIR/build/admin"
cp -R "$ROOT_DIR/admin-guide/build/." "$ROOT_DIR/build/admin/"
touch "$ROOT_DIR/build/.nojekyll"

node scripts/check-publish-layout.mjs build

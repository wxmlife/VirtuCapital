#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "发布已停止：当前分支是 $CURRENT_BRANCH，请先切换到 main。"
  exit 1
fi

if ! git diff --cached --quiet; then
  echo "发布已停止：暂存区中已有文件。请先提交或取消暂存，避免混入本次发布。"
  exit 1
fi

echo "1/4 检查 Markdown、图片引用和网站构建……"
git diff --check
npm run build:github-pages

echo "2/4 收集用户指南和管理员指南的正式源文件……"
SOURCE_PATHS=(
  "docs"
  "static"
  "src"
  "i18n"
  "sidebars.js"
  "docusaurus.config.js"
  "admin-guide/docs"
  "admin-guide/static"
  "admin-guide/src"
  "admin-guide/i18n"
  "admin-guide/sidebars.js"
  "admin-guide/docusaurus.config.js"
)

EXISTING_PATHS=()
for path in "${SOURCE_PATHS[@]}"; do
  if [[ -e "$path" ]] || git ls-files --error-unmatch "$path" >/dev/null 2>&1; then
    EXISTING_PATHS+=("$path")
  fi
done

git add -A -- "${EXISTING_PATHS[@]}"

if git diff --cached --quiet; then
  echo "没有检测到需要提交的指南内容，继续刷新 GitHub Pages。"
else
  PUBLISH_MESSAGE="${1:-docs: update Virtu Capital guides $(date '+%Y-%m-%d %H:%M')}"
  git commit -m "$PUBLISH_MESSAGE"
  git push origin main
fi

echo "3/4 发布用户指南和管理员指南到 GitHub Pages……"
npx gh-pages -d build -m "deploy: publish Virtu Capital guides"

echo "4/4 发布完成。"
echo "用户指南：https://wxmlife.github.io/VirtuCapital/app-guide/"
echo "管理员指南：https://wxmlife.github.io/VirtuCapital/admin/"

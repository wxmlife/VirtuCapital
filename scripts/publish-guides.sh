#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

APP_GUIDE_URL="https://wxmlife.github.io/VirtuCapital/app-guide/"
ADMIN_GUIDE_URL="https://wxmlife.github.io/VirtuCapital/admin/"
ADMIN_RELEASE_URL="https://github.com/wxmlife/VirtuCapital/releases/tag/Web"
RELEASE_NOTES_FILE=""

cleanup() {
  if [[ -n "$RELEASE_NOTES_FILE" && -f "$RELEASE_NOTES_FILE" ]]; then
    rm -f -- "$RELEASE_NOTES_FILE"
  fi
}
trap cleanup EXIT

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "发布已停止：当前分支是 $CURRENT_BRANCH，请先切换到 main。"
  exit 1
fi

if ! git diff --cached --quiet; then
  echo "发布已停止：暂存区中已有文件。请先提交或取消暂存，避免混入本次发布。"
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "发布已停止：未找到 GitHub CLI（gh）。"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "发布已停止：GitHub CLI 尚未登录，请先运行 gh auth login。"
  exit 1
fi

echo "1/4 检查并构建 APP 用户指南与管理员手册……"
git diff --check
npm run build:github-pages

echo "2/4 收集两份指南的正式源文件……"
SOURCE_PATHS=(
  ".gitignore"
  "README.md"
  "package.json"
  "package-lock.json"
  "scripts"
  "docs"
  "static"
  "src"
  "i18n"
  "sidebars.js"
  "docusaurus.config.js"
  "admin-guide"
  "一键发布指南.command"
)

EXISTING_PATHS=()
for path in "${SOURCE_PATHS[@]}"; do
  if [[ -e "$path" ]] || git ls-files --error-unmatch "$path" >/dev/null 2>&1; then
    EXISTING_PATHS+=("$path")
  fi
done

git add -A -- "${EXISTING_PATHS[@]}"

if git diff --cached --quiet; then
  echo "没有检测到需要提交的指南内容，继续刷新在线预览。"
else
  PUBLISH_MESSAGE="${1:-docs: publish updated Virtu Capital guides $(date '+%Y-%m-%d %H:%M')}"
  git commit -m "$PUBLISH_MESSAGE"
  git push origin main
fi

echo "3/4 发布两份指南到 GitHub Pages……"
npx gh-pages -d build -m "deploy: publish Virtu Capital guides"

echo "4/4 更新管理员手册 Release 快捷入口……"
RELEASE_NOTES_FILE="$(mktemp "${TMPDIR:-/tmp}/virtu-admin-release.XXXXXX")"
printf '%s\n' "$ADMIN_GUIDE_URL" >"$RELEASE_NOTES_FILE"

if gh release view Web >/dev/null 2>&1; then
  gh release edit Web \
    --title "管理员手册（在线预览）" \
    --notes-file "$RELEASE_NOTES_FILE"
else
  gh release create Web \
    --target gh-pages \
    --title "管理员手册（在线预览）" \
    --notes-file "$RELEASE_NOTES_FILE"
fi

echo
echo "发布完成。"
echo "APP 用户指南：$APP_GUIDE_URL"
echo "管理员手册：$ADMIN_GUIDE_URL"
echo "管理员手册快捷入口：$ADMIN_RELEASE_URL"

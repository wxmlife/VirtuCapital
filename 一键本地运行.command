#!/usr/bin/env bash

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR" || exit 1

USER_PID=""
ADMIN_PID=""
CLEANED_UP=0

pause_if_interactive() {
  if [[ -t 0 ]]; then
    echo
    echo "按任意键关闭窗口。"
    read -n 1 -s
  fi
}

die() {
  echo
  echo "启动失败：$*" >&2
  pause_if_interactive
  exit 1
}

cleanup() {
  if [[ $CLEANED_UP -eq 1 ]]; then
    return
  fi
  CLEANED_UP=1

  trap - EXIT INT TERM HUP

  if [[ -n "$USER_PID" ]] && kill -0 "$USER_PID" 2>/dev/null; then
    kill -TERM "$USER_PID" 2>/dev/null || true
  fi
  if [[ -n "$ADMIN_PID" ]] && kill -0 "$ADMIN_PID" 2>/dev/null; then
    kill -TERM "$ADMIN_PID" 2>/dev/null || true
  fi

  [[ -n "$USER_PID" ]] && wait "$USER_PID" 2>/dev/null || true
  [[ -n "$ADMIN_PID" ]] && wait "$ADMIN_PID" 2>/dev/null || true
}

handle_signal() {
  echo
  echo "正在停止 APP 端和管理员端……"
  exit 130
}

check_command() {
  local command_name="$1"
  local display_name="$2"
  command -v "$command_name" >/dev/null 2>&1 ||
    die "未找到 ${display_name}，请先安装后再重试。"
}

check_port() {
  local port="$1"
  if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    die "端口 $port 已被占用，请先停止占用该端口的程序。"
  fi
}

wait_until_ready() {
  local attempts=0

  while (( attempts < 120 )); do
    if ! kill -0 "$USER_PID" 2>/dev/null; then
      die "APP 端启动进程已意外退出，请查看上方日志。"
    fi
    if ! kill -0 "$ADMIN_PID" 2>/dev/null; then
      die "管理员端启动进程已意外退出，请查看上方日志。"
    fi

    if node scripts/check-local-preview-ready.mjs &&
      kill -0 "$USER_PID" 2>/dev/null &&
      kill -0 "$ADMIN_PID" 2>/dev/null; then
      echo "APP 端已就绪：http://localhost:3000/"
      echo "管理员端已就绪：http://localhost:3001/"
      return 0
    fi

    sleep 0.5
    attempts=$((attempts + 1))
  done

  die "等待两个站点启动超时，请查看上方日志。"
}

trap cleanup EXIT
trap handle_signal INT TERM HUP

echo "Virtu Capital 本地开发环境"
echo

check_command node "Node.js"
check_command npm "npm"
check_command lsof "lsof"
check_command open "macOS open 命令"

[[ -x node_modules/.bin/docusaurus ]] ||
  die "项目依赖尚未安装，请先在项目根目录运行 npm install。"

check_port 3000
check_port 3001

echo "正在启动 APP 端（http://localhost:3000）……"
npm run start:user -- --no-open &
USER_PID=$!

echo "正在启动管理员端（http://localhost:3001）……"
npm run start:admin -- --no-open &
ADMIN_PID=$!

wait_until_ready

PREVIEW_SESSION="${LOCAL_PREVIEW_SESSION:-$(date +%s)-$$}"
open "http://localhost:3000/?local-preview=$PREVIEW_SESSION"
open "http://localhost:3001/?local-preview=$PREVIEW_SESSION"

echo
echo "两个站点均已启动。保持此窗口开启；按 Ctrl+C 可同时停止。"

while kill -0 "$USER_PID" 2>/dev/null && kill -0 "$ADMIN_PID" 2>/dev/null; do
  sleep 1
done

if ! kill -0 "$USER_PID" 2>/dev/null; then
  wait "$USER_PID"
  STATUS=$?
  echo "APP 端已退出（状态码：$STATUS）。"
else
  wait "$ADMIN_PID"
  STATUS=$?
  echo "管理员端已退出（状态码：$STATUS）。"
fi

exit "$STATUS"

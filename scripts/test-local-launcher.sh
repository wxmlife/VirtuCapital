#!/usr/bin/env bash

set -u

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LAUNCHER_SOURCE="$REPO_DIR/一键本地运行.command"
TEST_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/virtu launcher test.XXXXXX")"
FAKE_PROJECT="$TEST_ROOT/project with spaces"
FAKE_BIN="$TEST_ROOT/bin"
CALL_LOG="$TEST_ROOT/calls.log"

cleanup() {
  if [[ -n "${LAUNCHER_PID:-}" ]] && kill -0 "$LAUNCHER_PID" 2>/dev/null; then
    kill -TERM "$LAUNCHER_PID" 2>/dev/null || true
    wait "$LAUNCHER_PID" 2>/dev/null || true
  fi
  rm -rf "$TEST_ROOT"
}
trap cleanup EXIT

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

assert_contains() {
  local file="$1"
  local expected="$2"
  if ! grep -F "$expected" "$file" >/dev/null; then
    echo "---- $file ----" >&2
    sed -n '1,120p' "$file" >&2
    fail "未在 $file 中找到：$expected"
  fi
}

wait_for_log() {
  local expected="$1"
  local attempts=0
  while (( attempts < 100 )); do
    if [[ -f "$CALL_LOG" ]] && grep -F "$expected" "$CALL_LOG" >/dev/null; then
      return 0
    fi
    sleep 0.05
    attempts=$((attempts + 1))
  done
  fail "等待日志超时：$expected"
}

install_fake_commands() {
  mkdir -p "$FAKE_PROJECT/node_modules/.bin" "$FAKE_BIN"
  : >"$FAKE_PROJECT/node_modules/.bin/docusaurus"
  chmod +x "$FAKE_PROJECT/node_modules/.bin/docusaurus"

  cat >"$FAKE_BIN/node" <<'EOF'
#!/usr/bin/env bash
exit 0
EOF

  cat >"$FAKE_BIN/lsof" <<'EOF'
#!/usr/bin/env bash
if [[ "${FAKE_OCCUPIED_PORT:-}" == "3000" && "$*" == *"-iTCP:3000"* ]]; then
  exit 0
fi
if [[ "${FAKE_OCCUPIED_PORT:-}" == "3001" && "$*" == *"-iTCP:3001"* ]]; then
  exit 0
fi
exit 1
EOF

  cat >"$FAKE_BIN/curl" <<'EOF'
#!/usr/bin/env bash
exit 0
EOF

  cat >"$FAKE_BIN/open" <<'EOF'
#!/usr/bin/env bash
echo "open $*" >>"$CALL_LOG"
EOF

  cat >"$FAKE_BIN/npm" <<'EOF'
#!/usr/bin/env bash
case "$*" in
  *"start:user"*) service="user" ;;
  *"start:admin"*) service="admin" ;;
  *) service="unknown" ;;
esac
echo "npm $*" >>"$CALL_LOG"
trap 'echo "TERM '"$service"'" >>"$CALL_LOG"; exit 0' TERM INT HUP
while :; do
  sleep 0.1
done
EOF

  chmod +x "$FAKE_BIN/node" "$FAKE_BIN/lsof" "$FAKE_BIN/curl" \
    "$FAKE_BIN/open" "$FAKE_BIN/npm"
}

run_missing_node_test() {
  local output="$TEST_ROOT/missing-node.log"
  local status
  set +e
  (
    cd "$FAKE_PROJECT" || exit 1
    PATH="/usr/bin:/bin" bash "./一键本地运行.command"
  ) >"$output" 2>&1
  status=$?
  set -e
  [[ $status -ne 0 ]] || fail "缺少 Node.js 时脚本仍然成功退出"
  assert_contains "$output" "未找到 Node.js"
}

run_occupied_port_test() {
  local output="$TEST_ROOT/occupied-port.log"
  local status
  set +e
  (
    cd "$FAKE_PROJECT" || exit 1
    PATH="$FAKE_BIN:/usr/bin:/bin" FAKE_OCCUPIED_PORT=3000 \
      CALL_LOG="$CALL_LOG" bash "./一键本地运行.command"
  ) >"$output" 2>&1
  status=$?
  set -e
  [[ $status -ne 0 ]] || fail "端口被占用时脚本仍然成功退出"
  assert_contains "$output" "端口 3000 已被占用"
}

run_happy_path_test() {
  local output="$TEST_ROOT/happy-path.log"
  (
    cd /
    PATH="$FAKE_BIN:/usr/bin:/bin" CALL_LOG="$CALL_LOG" \
      exec bash "$FAKE_PROJECT/一键本地运行.command"
  ) >"$output" 2>&1 &
  LAUNCHER_PID=$!

  wait_for_log "open http://localhost:3001"
  kill -TERM "$LAUNCHER_PID"
  wait "$LAUNCHER_PID" || true
  LAUNCHER_PID=""

  assert_contains "$CALL_LOG" "npm run start:user -- --no-open"
  assert_contains "$CALL_LOG" "npm run start:admin -- --no-open"
  assert_contains "$CALL_LOG" "open http://localhost:3000"
  assert_contains "$CALL_LOG" "open http://localhost:3001"
  assert_contains "$CALL_LOG" "TERM user"
  assert_contains "$CALL_LOG" "TERM admin"
}

[[ -f "$LAUNCHER_SOURCE" ]] || fail "启动器不存在：$LAUNCHER_SOURCE"
install_fake_commands
cp "$LAUNCHER_SOURCE" "$FAKE_PROJECT/一键本地运行.command"

run_missing_node_test
run_occupied_port_test
run_happy_path_test

echo "PASS: 一键本地启动器行为测试通过"

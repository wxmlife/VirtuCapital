# Local Dual-Site Launcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Finder-double-clickable macOS command that starts the APP user guide and admin guide together and cleans up both processes on exit.

**Architecture:** A single Bash 3.2-compatible launcher owns both npm child processes. A shell behavior test executes the real launcher with controlled command shims so validation, startup, browser opening, and cleanup can be verified without running persistent development servers.

**Tech Stack:** macOS Bash, npm, Docusaurus, POSIX process signals, Node.js test-free shell harness

## Global Constraints

- The launcher must work when invoked from a working directory other than the repository.
- APP and admin services use ports `3000` and `3001`.
- Missing prerequisites and occupied ports must produce clear Chinese errors.
- The launcher must never install dependencies or terminate unrelated processes.
- `Ctrl+C`, Terminal closure, and either child exiting must clean up both owned child processes.

---

### Task 1: Launcher behavior

**Files:**
- Create: `scripts/test-local-launcher.sh`
- Create: `一键本地运行.command`
- Modify: `README.md`

**Interfaces:**
- Consumes: root npm scripts `start:user` and `start:admin`
- Produces: Finder launcher `一键本地运行.command`
- Produces: test entrypoint `bash scripts/test-local-launcher.sh`

- [ ] **Step 1: Write the failing behavior test**

Create a temporary fake project and command shim directory. Copy the real launcher into the fake project. Verify these observable behaviors:

```bash
run_launcher missing_node
assert_status 1
assert_output_contains "未找到 Node.js"

run_launcher occupied_port
assert_status 1
assert_output_contains "端口 3000 已被占用"

run_launcher happy_path
assert_log_contains "npm run start:user -- --no-open"
assert_log_contains "npm run start:admin -- --no-open"
assert_log_contains "open http://localhost:3000"
assert_log_contains "open http://localhost:3001"
assert_log_contains "TERM user"
assert_log_contains "TERM admin"
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
bash scripts/test-local-launcher.sh
```

Expected: FAIL because `一键本地运行.command` does not exist.

- [ ] **Step 3: Implement the minimal launcher**

The launcher will:

```bash
cd "$(dirname "$0")" || exit 1
command -v node
command -v npm
command -v curl
test -x node_modules/.bin/docusaurus
lsof -nP -iTCP:3000 -sTCP:LISTEN
lsof -nP -iTCP:3001 -sTCP:LISTEN
npm run start:user -- --no-open &
npm run start:admin -- --no-open &
curl --silent --fail http://localhost:3000/
curl --silent --fail http://localhost:3001/
open http://localhost:3000
open http://localhost:3001
```

It stores both child PIDs, installs `EXIT INT TERM HUP` cleanup handling, polls child liveness using Bash 3.2-compatible `kill -0`, and terminates the sibling when either child exits.

- [ ] **Step 4: Run behavior and syntax tests**

Run:

```bash
bash -n 一键本地运行.command
bash -n scripts/test-local-launcher.sh
bash scripts/test-local-launcher.sh
```

Expected: all commands exit `0`.

- [ ] **Step 5: Make the Finder launcher executable and document it**

Run:

```bash
chmod +x 一键本地运行.command scripts/test-local-launcher.sh
```

Add the Finder double-click command, URLs, and `Ctrl+C` stop instruction to the README local preview section.

- [ ] **Step 6: Run a real smoke test**

Launch `./一键本地运行.command`, wait for both URLs to respond, then send `SIGINT`. Confirm both ports are released:

```bash
curl --fail http://localhost:3000/
curl --fail http://localhost:3001/
lsof -nP -iTCP:3000 -sTCP:LISTEN
lsof -nP -iTCP:3001 -sTCP:LISTEN
```

- [ ] **Step 7: Commit**

```bash
git add 一键本地运行.command scripts/test-local-launcher.sh README.md
git commit -m "feat: add local dual-site launcher"
```

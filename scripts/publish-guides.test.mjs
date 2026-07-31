import assert from 'node:assert/strict';
import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import test from 'node:test';

const publishScript = resolve('scripts/publish-guides.sh');

async function writeExecutable(path, contents) {
  await writeFile(path, contents);
  await chmod(path, 0o755);
}

async function createFakeRepository(t) {
  const root = await mkdtemp(join(tmpdir(), 'virtu-publish-flow-'));
  const fakeBin = join(root, 'fake-bin');
  const scriptsDir = join(root, 'scripts');
  const callLog = join(root, 'calls.log');
  const diffCount = join(root, 'diff-count');
  t.after(() => rm(root, {force: true, recursive: true}));

  await mkdir(fakeBin, {recursive: true});
  await mkdir(scriptsDir, {recursive: true});
  for (const directory of [
    'docs',
    'static',
    'src',
    'i18n',
    'admin-guide',
  ]) {
    await mkdir(join(root, directory), {recursive: true});
  }
  for (const file of [
    '.gitignore',
    'README.md',
    'package.json',
    'sidebars.js',
    'docusaurus.config.js',
    '一键发布指南.command',
  ]) {
    await writeFile(join(root, file), '');
  }
  await writeFile(diffCount, '0');
  await writeFile(
    join(scriptsDir, 'publish-guides.sh'),
    await readFile(publishScript),
  );

  await writeExecutable(
    join(fakeBin, 'git'),
    `#!/usr/bin/env bash
echo "git $*" >>"$CALL_LOG"
case "$*" in
  "branch --show-current")
    echo main
    ;;
  "diff --cached --quiet")
    count="$(/bin/cat "$DIFF_COUNT")"
    if [[ "$count" == "0" ]]; then
      echo 1 >"$DIFF_COUNT"
      exit 0
    fi
    exit 1
    ;;
  "diff --check")
    ;;
  add*|commit*|push*)
    ;;
  "ls-files --error-unmatch "*)
    exit 1
    ;;
  *)
    exit 91
    ;;
esac
`,
  );
  await writeExecutable(
    join(fakeBin, 'npm'),
    `#!/usr/bin/env bash
echo "npm $*" >>"$CALL_LOG"
if [[ "\${FAIL_BUILD:-0}" == "1" ]]; then
  exit 42
fi
`,
  );
  await writeExecutable(
    join(fakeBin, 'npx'),
    `#!/usr/bin/env bash
echo "npx $*" >>"$CALL_LOG"
`,
  );
  await writeExecutable(
    join(fakeBin, 'gh'),
    `#!/usr/bin/env bash
echo "gh $*" >>"$CALL_LOG"
if [[ "$*" == "auth status" ]]; then
  exit 0
fi
if [[ "$*" == "release view Web" ]]; then
  [[ "\${RELEASE_EXISTS:-1}" == "1" ]]
  exit
fi
if [[ "$*" == release\\ edit\\ Web* || "$*" == release\\ create\\ Web* ]]; then
  previous=""
  for argument in "$@"; do
    if [[ "$previous" == "--notes-file" ]]; then
      echo "release-notes $(/bin/cat "$argument")" >>"$CALL_LOG"
    fi
    previous="$argument"
  done
  exit 0
fi
exit 92
`,
  );

  return {callLog, diffCount, fakeBin, root};
}

function runPublish({callLog, diffCount, fakeBin, root}, env = {}) {
  return spawnSync('/bin/bash', [join(root, 'scripts/publish-guides.sh')], {
    cwd: root,
    encoding: 'utf8',
    env: {
      ...process.env,
      CALL_LOG: callLog,
      DIFF_COUNT: diffCount,
      PATH: `${fakeBin}:/usr/bin:/bin`,
      ...env,
    },
  });
}

function assertCallBefore(calls, earlier, later) {
  const earlierIndex = calls.findIndex((call) => call.includes(earlier));
  const laterIndex = calls.findIndex((call) => call.includes(later));
  assert.notEqual(earlierIndex, -1, `missing call: ${earlier}`);
  assert.notEqual(laterIndex, -1, `missing call: ${later}`);
  assert.ok(earlierIndex < laterIndex, `${earlier} must run before ${later}`);
}

test('publishes both source trees, one Pages snapshot, and the Release URL', async (t) => {
  const fixture = await createFakeRepository(t);
  const result = runPublish(fixture);
  const calls = (await readFile(fixture.callLog, 'utf8')).trim().split('\n');

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assertCallBefore(calls, 'npm run build:github-pages', 'git add -A --');
  assertCallBefore(calls, 'git push origin main', 'npx gh-pages -d build');
  assertCallBefore(calls, 'npx gh-pages -d build', 'gh release edit Web');
  assert.match(calls.join('\n'), /git add -A -- .*admin-guide/);
  assert.match(
    calls.join('\n'),
    /release-notes https:\/\/wxmlife\.github\.io\/VirtuCapital\/admin\//,
  );
  assert.equal(
    calls.filter((call) => call.startsWith('npx gh-pages -d build')).length,
    1,
  );
  assert.doesNotMatch(calls.join('\n'), /gh release upload/);
});

test('creates the URL-only Release when tag Web has no release', async (t) => {
  const fixture = await createFakeRepository(t);
  const result = runPublish(fixture, {RELEASE_EXISTS: '0'});
  const calls = await readFile(fixture.callLog, 'utf8');

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(calls, /gh release create Web --target gh-pages/);
  assert.doesNotMatch(calls, /gh release upload/);
});

test('stops before every remote write when the combined build fails', async (t) => {
  const fixture = await createFakeRepository(t);
  const result = runPublish(fixture, {FAIL_BUILD: '1'});
  const calls = await readFile(fixture.callLog, 'utf8');

  assert.equal(result.status, 42);
  assert.doesNotMatch(calls, /git commit|git push|npx gh-pages|gh release/);
});

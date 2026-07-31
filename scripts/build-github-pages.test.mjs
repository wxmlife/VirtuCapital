import assert from 'node:assert/strict';
import {
  chmod,
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import test from 'node:test';

const buildScript = resolve('scripts/build-github-pages.sh');
const layoutVerifier = resolve('scripts/check-publish-layout.mjs');

async function fileExists(path) {
  try {
    await readFile(path);
    return true;
  } catch {
    return false;
  }
}

async function writeExecutable(path, contents) {
  await writeFile(path, contents);
  await chmod(path, 0o755);
}

test('builds both guides and verifies the merged Pages snapshot', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'virtu-pages-build-'));
  const scriptsDir = join(root, 'scripts');
  const fakeBin = join(root, 'fake-bin');
  const callLog = join(root, 'calls.log');
  t.after(() => rm(root, {force: true, recursive: true}));

  await mkdir(scriptsDir, {recursive: true});
  await mkdir(fakeBin, {recursive: true});
  await mkdir(join(root, 'admin-guide'), {recursive: true});
  await copyFile(buildScript, join(scriptsDir, 'build-github-pages.sh'));
  await copyFile(layoutVerifier, join(scriptsDir, 'check-publish-layout.mjs'));

  await writeExecutable(
    join(fakeBin, 'npm'),
    `#!/usr/bin/env bash
set -e
echo "npm $*" >>"$CALL_LOG"
if [[ "$*" == "run build:user" ]]; then
  for path in \
    build/index.html \
    build/app-guide/index.html \
    build/en/app-guide/index.html \
    build/zh-Hant/app-guide/index.html; do
    mkdir -p "$(dirname "$path")"
    : >"$path"
  done
elif [[ "$*" == "run build:admin" ]]; then
  for path in \
    admin-guide/build/index.html \
    admin-guide/build/getting-started/login/index.html \
    admin-guide/build/en/index.html \
    admin-guide/build/zh-Hant/index.html; do
    mkdir -p "$(dirname "$path")"
    : >"$path"
  done
else
  exit 90
fi
`,
  );
  await writeExecutable(
    join(fakeBin, 'node'),
    `#!/usr/bin/env bash
echo "node $*" >>"$CALL_LOG"
exec "$REAL_NODE" "$@"
`,
  );

  for (const command of ['bash', 'cp', 'dirname', 'mkdir', 'rm', 'touch']) {
    const commandPath = spawnSync('which', [command], {
      encoding: 'utf8',
    }).stdout.trim();
    await symlink(commandPath, join(fakeBin, command));
  }

  const result = spawnSync(
    join(fakeBin, 'bash'),
    [join(scriptsDir, 'build-github-pages.sh')],
    {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        CALL_LOG: callLog,
        PATH: fakeBin,
        REAL_NODE: process.execPath,
      },
    },
  );

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.equal(await fileExists(join(root, 'build/admin/index.html')), true);
  assert.equal(await fileExists(join(root, 'build/.nojekyll')), true);

  const calls = (await readFile(callLog, 'utf8')).trim().split('\n');
  assert.deepEqual(calls, [
    'npm run build:user',
    'npm run build:admin',
    'node scripts/check-publish-layout.mjs build',
  ]);
});

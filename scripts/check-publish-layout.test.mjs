import assert from 'node:assert/strict';
import {mkdir, mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {dirname, join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import test from 'node:test';

const verifier = resolve('scripts/check-publish-layout.mjs');
const requiredFiles = [
  'index.html',
  'app-guide/index.html',
  'en/app-guide/index.html',
  'zh-Hant/app-guide/index.html',
  'admin/index.html',
  'admin/getting-started/login/index.html',
  'admin/en/index.html',
  'admin/zh-Hant/index.html',
  '.nojekyll',
];

async function createFixture(t, omitted = []) {
  const root = await mkdtemp(join(tmpdir(), 'virtu-publish-layout-'));
  t.after(() => rm(root, {force: true, recursive: true}));

  for (const relativePath of requiredFiles.filter(
    (path) => !omitted.includes(path),
  )) {
    const path = join(root, relativePath);
    await mkdir(dirname(path), {recursive: true});
    await writeFile(path, '<!doctype html>');
  }

  return root;
}

test('accepts a complete merged Pages layout', async (t) => {
  const root = await createFixture(t);
  const result = spawnSync(process.execPath, [verifier, root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /9 required publish files/);
});

test('lists a missing administrator entry point', async (t) => {
  const root = await createFixture(t, ['admin/index.html']);
  const result = spawnSync(process.execPath, [verifier, root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /admin\/index\.html/);
});

import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, resolve} from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const adminGuideDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const checker = resolve(adminGuideDir, 'scripts/check-built-routes.mjs');
const routePaths = [
  '',
  'communications/feedback',
  'communications/message-templates',
  'getting-started/admin-role',
  'getting-started/dashboard',
  'getting-started/login',
  'market/market-data',
  'reference/faq',
  'reference/permissions',
  'reviews/audit-log',
  'reviews/records',
  'settings/system-settings',
  'stocks/stock-management',
  'users/customers',
  'users/investors',
];
const localePrefixes = ['', 'zh-Hant', 'en'];

function createBuild({omit} = {}) {
  const buildDir = mkdtempSync(resolve(tmpdir(), 'admin-guide-routes-'));

  for (const localePrefix of localePrefixes) {
    for (const routePath of routePaths) {
      const relativePath = [localePrefix, routePath, 'index.html']
        .filter(Boolean)
        .join('/');
      if (relativePath === omit) continue;

      const outputPath = resolve(buildDir, relativePath);
      mkdirSync(dirname(outputPath), {recursive: true});
      writeFileSync(outputPath, '<!doctype html><title>Guide</title>\n');
    }
  }

  return buildDir;
}

function runChecker(buildDir) {
  return spawnSync(process.execPath, [checker, buildDir], {
    cwd: adminGuideDir,
    encoding: 'utf8',
  });
}

test('accepts a build containing every administrator-guide locale route', () => {
  const buildDir = createBuild();
  try {
    const result = runChecker(buildDir);
    assert.equal(
      result.status,
      0,
      `Route checker rejected a complete build:\n${result.stdout}${result.stderr}`,
    );
    assert.match(result.stdout, /45 routes/);
  } finally {
    rmSync(buildDir, {recursive: true, force: true});
  }
});

test('reports the exact missing localized route', () => {
  const missingRoute = 'en/getting-started/dashboard/index.html';
  const buildDir = createBuild({omit: missingRoute});
  try {
    const result = runChecker(buildDir);
    assert.notEqual(
      result.status,
      0,
      `Route checker unexpectedly accepted a build missing ${missingRoute}`,
    );
    assert.match(result.stderr, new RegExp(missingRoute));
  } finally {
    rmSync(buildDir, {recursive: true, force: true});
  }
});

test('rejects a build that server-renders the passcode form', () => {
  const affectedRoute = 'en/users/customers/index.html';
  const buildDir = createBuild();
  try {
    writeFileSync(
      resolve(buildDir, affectedRoute),
      '<!doctype html><main class="admin-auth-page"><form class="admin-auth-card"></form></main>',
    );

    const result = runChecker(buildDir);
    assert.notEqual(
      result.status,
      0,
      'Route checker unexpectedly accepted a server-rendered passcode form',
    );
    assert.match(result.stderr, /server-rendered passcode form/);
    assert.match(result.stderr, new RegExp(affectedRoute));
  } finally {
    rmSync(buildDir, {recursive: true, force: true});
  }
});

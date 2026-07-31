import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const adminGuideDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const rootPath = resolve(adminGuideDir, 'src/theme/Root.js');

test('keeps the server-rendered auth gate neutral until session storage is checked', () => {
  const root = readFileSync(rootPath, 'utf8');

  assert.match(root, /const \[authState, setAuthState\] = useState\('checking'\)/);
  assert.match(
    root,
    /setAuthState\(\s*hasActiveAdminSession\(window\)\s*\?\s*'authenticated'\s*:\s*'unauthenticated',?\s*\)/s,
  );
  assert.match(
    root,
    /if \(authState === 'checking'\) \{\s*return null;\s*\}/s,
  );
  assert.match(root, /if \(authState === 'unauthenticated'\)/);
  assert.match(root, /setAuthState\('authenticated'\)/);
});

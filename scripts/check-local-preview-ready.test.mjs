import assert from 'node:assert/strict';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import test from 'node:test';

const modulePath = resolve('scripts/check-local-preview-ready.mjs');

async function loadReadyCheck() {
  try {
    return await import(pathToFileURL(modulePath));
  } catch {
    return null;
  }
}

async function createManifest(t, contents) {
  const directory = await mkdtemp(join(tmpdir(), 'virtu-ready-check-'));
  const manifestPath = join(directory, 'routesChunkNames.json');
  await writeFile(manifestPath, contents);
  t.after(() => rm(directory, {force: true, recursive: true}));
  return manifestPath;
}

test('accepts a complete manifest when every asset is JavaScript', async (t) => {
  const readyCheck = await loadReadyCheck();
  assert.ok(readyCheck, `${modulePath} must be importable`);

  const requested = [];
  const baseUrl = 'http://preview.test';
  const fetchImpl = async (url, options) => {
    requested.push({
      accept: options.headers.Accept,
      url: new URL(url).pathname,
    });
    if (new URL(url).pathname === '/') {
      return new Response('<!doctype html>', {
        headers: {'content-type': 'text/html'},
        status: 200,
      });
    }
    return new Response('export default true;', {
      headers: {'content-type': 'application/javascript'},
      status: 200,
    });
  };
  const manifestPath = await createManifest(
    t,
    JSON.stringify({
      routes: [
        {modules: {content: 'content---first'}},
        {modules: {content: 'content---second'}},
      ],
    }),
  );

  await readyCheck.checkPreviewSite({
    baseUrl,
    fetchImpl,
    manifestPath,
    requestTimeoutMs: 250,
  });

  assert.deepEqual(
    requested.map(({url}) => url).sort(),
    [
      '/',
      '/content---first.js',
      '/content---second.js',
      '/runtime~main.js',
    ],
  );
  assert.equal(
    requested
      .filter(({url}) => url.endsWith('.js'))
      .every(({accept}) => accept === 'application/javascript'),
    true,
  );
});

test('rejects an HTML fallback returned for a missing JavaScript chunk', async (t) => {
  const readyCheck = await loadReadyCheck();
  assert.ok(readyCheck, `${modulePath} must be importable`);

  const baseUrl = 'http://preview.test';
  const fetchImpl = async (url) => {
    if (new URL(url).pathname === '/') {
      return new Response('<!doctype html>', {
        headers: {'content-type': 'text/html'},
        status: 200,
      });
    }
    return new Response('<!doctype html>', {
      headers: {'content-type': 'text/html'},
      status: 200,
    });
  };
  const manifestPath = await createManifest(
    t,
    JSON.stringify({content: 'content---missing'}),
  );

  await assert.rejects(
    readyCheck.checkPreviewSite({
      baseUrl,
      fetchImpl,
      manifestPath,
      requestTimeoutMs: 250,
    }),
    /expected JavaScript/,
  );
});

test('rejects a truncated chunk manifest', async (t) => {
  const readyCheck = await loadReadyCheck();
  assert.ok(readyCheck, `${modulePath} must be importable`);

  const manifestPath = await createManifest(
    t,
    '{"content":"content---first",',
  );

  await assert.rejects(
    readyCheck.checkPreviewSite({
      baseUrl: 'http://127.0.0.1:1',
      manifestPath,
      requestTimeoutMs: 25,
    }),
    SyntaxError,
  );
});

test('times out when an asset request never completes', async (t) => {
  const readyCheck = await loadReadyCheck();
  assert.ok(readyCheck, `${modulePath} must be importable`);

  const baseUrl = 'http://preview.test';
  const fetchImpl = (_url, {signal}) =>
    new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => {
        reject(Object.assign(new Error('aborted'), {name: 'AbortError'}));
      });
    });
  const manifestPath = await createManifest(
    t,
    JSON.stringify({content: 'content---waiting'}),
  );

  await assert.rejects(
    readyCheck.checkPreviewSite({
      baseUrl,
      fetchImpl,
      manifestPath,
      requestTimeoutMs: 25,
    }),
    /timed out/,
  );
});

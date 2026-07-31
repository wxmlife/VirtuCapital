import assert from 'node:assert/strict';
import {resolve} from 'node:path';
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

test('checks every configured locale route as an HTML page', async () => {
  const readyCheck = await loadReadyCheck();
  assert.ok(readyCheck, `${modulePath} must be importable`);

  const requested = [];
  const fetchImpl = async (url, options) => {
    requested.push({
      accept: options.headers.Accept,
      url: new URL(url).pathname,
    });
    return new Response('<!doctype html>', {
      headers: {'content-type': 'text/html; charset=utf-8'},
      status: 200,
    });
  };

  await readyCheck.checkPreviewSite({
    baseUrl: 'http://preview.test',
    fetchImpl,
    requestTimeoutMs: 250,
    routes: ['/', '/zh-Hant/users/customers/', '/en/users/customers/'],
  });

  assert.deepEqual(
    requested.map(({url}) => url),
    ['/', '/zh-Hant/users/customers/', '/en/users/customers/'],
  );
  assert.equal(
    requested.every(({accept}) => accept === 'text/html'),
    true,
  );
});

test('checks representative routes for every locale on both local sites', async () => {
  const readyCheck = await loadReadyCheck();
  assert.ok(readyCheck, `${modulePath} must be importable`);

  const requested = [];
  await readyCheck.checkLocalPreviews({
    fetchImpl: async (url) => {
      requested.push(url);
      return new Response('<!doctype html>', {
        headers: {'content-type': 'text/html'},
        status: 200,
      });
    },
  });

  assert.deepEqual(
    requested.sort(),
    [
      'http://localhost:3000/',
      'http://localhost:3000/app-guide/',
      'http://localhost:3000/en/app-guide/',
      'http://localhost:3000/zh-Hant/app-guide/',
      'http://localhost:3001/',
      'http://localhost:3001/en/users/customers/',
      'http://localhost:3001/users/customers/',
      'http://localhost:3001/zh-Hant/users/customers/',
    ],
  );
});

test('rejects a missing locale route', async () => {
  const readyCheck = await loadReadyCheck();
  assert.ok(readyCheck, `${modulePath} must be importable`);

  const fetchImpl = async (url) =>
    new Response(new URL(url).pathname === '/en/app-guide/' ? 'missing' : 'ok', {
      headers: {'content-type': 'text/html'},
      status: new URL(url).pathname === '/en/app-guide/' ? 404 : 200,
    });

  await assert.rejects(
    readyCheck.checkPreviewSite({
      baseUrl: 'http://preview.test',
      fetchImpl,
      requestTimeoutMs: 250,
      routes: ['/', '/en/app-guide/'],
    }),
    /\/en\/app-guide\/ returned HTTP 404/,
  );
});

test('rejects a non-HTML response for a preview route', async () => {
  const readyCheck = await loadReadyCheck();
  assert.ok(readyCheck, `${modulePath} must be importable`);

  await assert.rejects(
    readyCheck.checkPreviewSite({
      baseUrl: 'http://preview.test',
      fetchImpl: async () =>
        new Response('export default true;', {
          headers: {'content-type': 'application/javascript'},
          status: 200,
        }),
      requestTimeoutMs: 250,
      routes: ['/'],
    }),
    /expected HTML/,
  );
});

test('times out when a preview route never responds', async () => {
  const readyCheck = await loadReadyCheck();
  assert.ok(readyCheck, `${modulePath} must be importable`);

  const fetchImpl = (_url, {signal}) =>
    new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => {
        reject(Object.assign(new Error('aborted'), {name: 'AbortError'}));
      });
    });

  await assert.rejects(
    readyCheck.checkPreviewSite({
      baseUrl: 'http://preview.test',
      fetchImpl,
      requestTimeoutMs: 25,
      routes: ['/en/app-guide/'],
    }),
    /timed out/,
  );
});

import assert from 'node:assert/strict';
import test from 'node:test';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';

const recoveryModulePaths = [
  resolve('src/chunk-load-recovery.mjs'),
  resolve('admin-guide/src/chunk-load-recovery.mjs'),
];

async function loadRecoveryModule(modulePath) {
  try {
    return await import(pathToFileURL(modulePath));
  } catch {
    return null;
  }
}

function createBrowserWindow(
  initialUrl = 'http://localhost:3000/app-guide',
) {
  const listeners = new Map();
  let replacementUrl = null;
  let currentUrl = initialUrl;

  return {
    browserWindow: {
      addEventListener(type, listener) {
        listeners.set(type, listener);
      },
      removeEventListener(type, listener) {
        if (listeners.get(type) === listener) {
          listeners.delete(type);
        }
      },
      location: {
        get href() {
          return currentUrl;
        },
        reload() {},
        replace(url) {
          replacementUrl = url;
          currentUrl = url;
        },
      },
      history: {
        state: null,
        replaceState(_state, _title, url) {
          currentUrl = url;
        },
      },
    },
    dispatch(type, event) {
      listeners.get(type)?.(event);
    },
    getReplacementUrl() {
      return replacementUrl;
    },
    getCurrentUrl() {
      return currentUrl;
    },
    hasListener(type) {
      return listeners.has(type);
    },
  };
}

for (const modulePath of recoveryModulePaths) {
  const siteName = modulePath.includes('admin-guide') ? 'admin' : 'app';

  test(`${siteName} reloads once after a rejected chunk request`, async () => {
    const recovery = await loadRecoveryModule(modulePath);
    assert.ok(recovery, `${modulePath} must be importable`);

    const harness = createBrowserWindow();
    const cleanup = recovery.installChunkLoadRecovery(harness.browserWindow);
    const event = {
      reason: Object.assign(
        new Error('Loading chunk content---app-guide failed.'),
        {name: 'ChunkLoadError'},
      ),
      preventDefault() {},
    };

    harness.dispatch('unhandledrejection', event);
    harness.dispatch('unhandledrejection', event);

    const replacementUrl = harness.getReplacementUrl();
    assert.ok(replacementUrl);
    assert.equal(
      new URL(replacementUrl).searchParams.get('chunk-load-recovery'),
      '1',
    );

    const reloadedPage = createBrowserWindow(replacementUrl);
    recovery.installChunkLoadRecovery(reloadedPage.browserWindow);
    reloadedPage.dispatch('unhandledrejection', event);
    assert.equal(reloadedPage.getReplacementUrl(), null);

    cleanup();
    assert.equal(harness.hasListener('error'), false);
    assert.equal(harness.hasListener('unhandledrejection'), false);
  });

  test(`${siteName} ignores unrelated runtime errors`, async () => {
    const recovery = await loadRecoveryModule(modulePath);
    assert.ok(recovery, `${modulePath} must be importable`);

    const harness = createBrowserWindow();
    recovery.installChunkLoadRecovery(harness.browserWindow);
    harness.dispatch('error', {error: new Error('ordinary failure')});

    assert.equal(harness.getReplacementUrl(), null);
  });

  test(`${siteName} shares its guard with Docusaurus route reloads`, async () => {
    const recovery = await loadRecoveryModule(modulePath);
    assert.ok(recovery, `${modulePath} must be importable`);
    assert.equal(typeof recovery.guardRouteUpdate, 'function');

    const pendingNavigation = createBrowserWindow(
      'http://localhost:3000/getting-started/admin-role',
    );
    const cleanup = recovery.guardRouteUpdate(
      pendingNavigation.browserWindow,
      {pathname: '/previous'},
    );
    const guardedUrl = pendingNavigation.getCurrentUrl();
    assert.equal(
      new URL(guardedUrl).searchParams.get('chunk-load-recovery'),
      '1',
    );

    const reloadedPage = createBrowserWindow(guardedUrl);
    recovery.installChunkLoadRecovery(reloadedPage.browserWindow);
    reloadedPage.dispatch('unhandledrejection', {
      reason: Object.assign(new Error('Loading chunk route failed.'), {
        name: 'ChunkLoadError',
      }),
    });
    assert.equal(reloadedPage.getReplacementUrl(), null);

    cleanup();
    assert.equal(
      new URL(pendingNavigation.getCurrentUrl()).searchParams.has(
        'chunk-load-recovery',
      ),
      false,
    );
  });
}

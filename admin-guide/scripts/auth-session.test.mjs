import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ADMIN_AUTH_SESSION_KEY,
  hasActiveAdminSession,
  startAdminSession,
} from '../src/auth-session.mjs';

function createStorage(initialEntries = []) {
  const values = new Map(initialEntries);
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

function createBrowserWindow({
  persistentAuthentication = false,
  sessionAuthentication = false,
  sessionStorage,
} = {}) {
  const authenticatedEntry = [[ADMIN_AUTH_SESSION_KEY, 'true']];
  return {
    localStorage: createStorage(
      persistentAuthentication ? authenticatedEntry : [],
    ),
    sessionStorage:
      sessionStorage ??
      createStorage(sessionAuthentication ? authenticatedEntry : []),
  };
}

test('does not authenticate a new tab from the legacy persistent flag', () => {
  const browserWindow = createBrowserWindow({persistentAuthentication: true});

  assert.equal(hasActiveAdminSession(browserWindow), false);
  assert.equal(
    browserWindow.localStorage.getItem(ADMIN_AUTH_SESSION_KEY),
    null,
  );
});

test('keeps authentication only in the active tab session', () => {
  const browserWindow = createBrowserWindow();

  startAdminSession(browserWindow);

  assert.equal(hasActiveAdminSession(browserWindow), true);
  assert.equal(
    browserWindow.sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY),
    'true',
  );
  assert.equal(
    browserWindow.localStorage.getItem(ADMIN_AUTH_SESSION_KEY),
    null,
  );
});

test('keeps authentication across a full-page language navigation in one tab', () => {
  const sharedSessionStorage = createStorage();
  const simplifiedPage = createBrowserWindow({
    sessionStorage: sharedSessionStorage,
  });

  startAdminSession(simplifiedPage);

  const englishPage = createBrowserWindow({
    sessionStorage: sharedSessionStorage,
  });
  assert.equal(hasActiveAdminSession(englishPage), true);
});

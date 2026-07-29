export const ADMIN_AUTH_SESSION_KEY = 'virtu-admin-guide-authenticated';

export function hasActiveAdminSession(browserWindow) {
  browserWindow.localStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
  return (
    browserWindow.sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY) === 'true'
  );
}

export function startAdminSession(browserWindow) {
  browserWindow.localStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
  browserWindow.sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, 'true');
}

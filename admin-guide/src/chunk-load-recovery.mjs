const RECOVERY_QUERY_KEY = 'chunk-load-recovery';

export function isChunkLoadError(error) {
  const name = typeof error?.name === 'string' ? error.name : '';
  const message = typeof error?.message === 'string' ? error.message : '';

  return (
    name === 'ChunkLoadError' ||
    /Loading chunk [^\s]+ failed/i.test(message)
  );
}

function getCurrentUrl(browserWindow) {
  return new URL(browserWindow.location.href);
}

export function clearRecoveryMarker(browserWindow) {
  let currentUrl;
  try {
    currentUrl = getCurrentUrl(browserWindow);
    if (!currentUrl.searchParams.has(RECOVERY_QUERY_KEY)) {
      return;
    }
    currentUrl.searchParams.delete(RECOVERY_QUERY_KEY);
    browserWindow.history.replaceState(
      browserWindow.history.state,
      '',
      currentUrl.href,
    );
  } catch {
    // URL cleanup is best effort and must not break page rendering.
  }
}

export function guardRouteUpdate(browserWindow, previousLocation) {
  if (!previousLocation) {
    return undefined;
  }

  try {
    const guardedUrl = getCurrentUrl(browserWindow);
    guardedUrl.searchParams.set(RECOVERY_QUERY_KEY, '1');
    browserWindow.history.replaceState(
      browserWindow.history.state,
      '',
      guardedUrl.href,
    );
  } catch {
    return undefined;
  }

  return () => clearRecoveryMarker(browserWindow);
}

export function installChunkLoadRecovery(browserWindow) {
  let recoveryRequested = false;

  function recover(event) {
    const error = event?.reason ?? event?.error ?? event;
    if (recoveryRequested || !isChunkLoadError(error)) {
      return;
    }

    let recoveryUrl;
    try {
      recoveryUrl = getCurrentUrl(browserWindow);
    } catch {
      return;
    }

    if (recoveryUrl.searchParams.has(RECOVERY_QUERY_KEY)) {
      return;
    }

    recoveryRequested = true;
    recoveryUrl.searchParams.set(RECOVERY_QUERY_KEY, '1');
    event?.preventDefault?.();
    browserWindow.location.replace(recoveryUrl.href);
  }

  browserWindow.addEventListener('error', recover);
  browserWindow.addEventListener('unhandledrejection', recover);

  return () => {
    browserWindow.removeEventListener('error', recover);
    browserWindow.removeEventListener('unhandledrejection', recover);
  };
}

export function onRouteUpdate({previousLocation}) {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return guardRouteUpdate(window, previousLocation);
}

export function onRouteDidUpdate() {
  if (typeof window !== 'undefined') {
    clearRecoveryMarker(window);
  }
}

if (typeof window !== 'undefined') {
  installChunkLoadRecovery(window);
}

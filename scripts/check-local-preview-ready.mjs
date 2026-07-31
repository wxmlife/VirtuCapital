import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const DEFAULT_REQUEST_TIMEOUT_MS = 1_500;

async function fetchHtmlPage({
  fetchImpl,
  requestTimeoutMs,
  url,
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    let response;
    try {
      response = await fetchImpl(url, {
        headers: {Accept: 'text/html'},
        signal: controller.signal,
      });
      await response.arrayBuffer();
    } catch (error) {
      if (controller.signal.aborted) {
        throw new Error(`${url} timed out after ${requestTimeoutMs}ms`);
      }
      throw error;
    }

    if (!response.ok) {
      throw new Error(`${url} returned HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!/text\/html/i.test(contentType)) {
      throw new Error(
        `${url} expected HTML but received ${contentType || 'no Content-Type'}`,
      );
    }
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkPreviewSite({
  baseUrl,
  fetchImpl = globalThis.fetch,
  requestTimeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
  routes,
}) {
  await Promise.all(
    routes.map((route) =>
      fetchHtmlPage({
        fetchImpl,
        requestTimeoutMs,
        url: new URL(route, `${baseUrl}/`).href,
      }),
    ),
  );
}

export async function checkLocalPreviews({
  fetchImpl = globalThis.fetch,
} = {}) {
  await Promise.all([
    checkPreviewSite({
      baseUrl: 'http://localhost:3000',
      fetchImpl,
      routes: [
        '/',
        '/app-guide/',
        '/zh-Hant/app-guide/',
        '/en/app-guide/',
      ],
    }),
    checkPreviewSite({
      baseUrl: 'http://localhost:3001',
      fetchImpl,
      routes: [
        '/',
        '/users/customers/',
        '/zh-Hant/users/customers/',
        '/en/users/customers/',
      ],
    }),
  ]);
}

const isCommandLine =
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isCommandLine) {
  try {
    await checkLocalPreviews();
  } catch {
    process.exitCode = 1;
  }
}

import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const DEFAULT_REQUEST_TIMEOUT_MS = 1_500;

function collectContentChunkNames(value, chunks) {
  if (!value || typeof value !== 'object') {
    return;
  }

  if (typeof value.content === 'string') {
    chunks.add(value.content);
  }

  for (const child of Object.values(value)) {
    collectContentChunkNames(child, chunks);
  }
}

async function readContentChunkNames(manifestPath) {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const chunks = new Set();
  collectContentChunkNames(manifest, chunks);

  if (chunks.size === 0) {
    throw new Error(`No content chunks found in ${manifestPath}`);
  }

  return [...chunks];
}

async function fetchAsset({
  expectJavaScript,
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
        headers: expectJavaScript
          ? {Accept: 'application/javascript'}
          : {Accept: 'text/html'},
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

    if (expectJavaScript) {
      const contentType = response.headers.get('content-type') ?? '';
      if (!/(?:java|ecma)script/i.test(contentType)) {
        throw new Error(
          `${url} expected JavaScript but received ${contentType || 'no Content-Type'}`,
        );
      }
    }
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkPreviewSite({
  baseUrl,
  fetchImpl = globalThis.fetch,
  manifestPath,
  requestTimeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
}) {
  const contentChunks = await readContentChunkNames(manifestPath);
  const assets = [
    {expectJavaScript: false, url: `${baseUrl}/`},
    {expectJavaScript: true, url: `${baseUrl}/runtime~main.js`},
    ...contentChunks.map((chunkName) => ({
      expectJavaScript: true,
      url: `${baseUrl}/${chunkName}.js`,
    })),
  ];

  await Promise.all(
    assets.map((asset) =>
      fetchAsset({
        ...asset,
        fetchImpl,
        requestTimeoutMs,
      }),
    ),
  );
}

export async function checkLocalPreviews() {
  await Promise.all([
    checkPreviewSite({
      baseUrl: 'http://localhost:3000',
      manifestPath: resolve('.docusaurus/routesChunkNames.json'),
    }),
    checkPreviewSite({
      baseUrl: 'http://localhost:3001',
      manifestPath: resolve(
        'admin-guide/.docusaurus/routesChunkNames.json',
      ),
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

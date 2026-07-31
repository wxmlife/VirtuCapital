import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const adminGuideDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const componentPath = resolve(
  adminGuideDir,
  'src/theme/DocImagePreview/index.js',
);
const rootPath = resolve(adminGuideDir, 'src/theme/Root.js');
const cssPath = resolve(adminGuideDir, 'src/css/custom.css');

test('mounts an accessible document image preview for authenticated pages', () => {
  assert.equal(
    existsSync(componentPath),
    true,
    'DocImagePreview component must exist',
  );

  const component = readFileSync(componentPath, 'utf8');
  const root = readFileSync(rootPath, 'utf8');

  assert.match(component, /role="dialog"/);
  assert.match(component, /aria-modal="true"/);
  assert.match(component, /className="admin-image-preview__close"/);
  assert.match(component, /getPreviewRequest/);
  assert.match(component, /preparePreviewImages/);
  assert.match(component, /MutationObserver/);
  assert.match(component, /document\.body\.style\.overflow/);
  assert.match(component, /event\.key === 'Escape'/);
  assert.match(
    root,
    /<DocImagePreview locale=\{i18n\.currentLocale\} \/>/,
  );
});

test('uses a light scrollable backdrop without shrinking tall preview images', () => {
  const css = readFileSync(cssPath, 'utf8');
  const previewImageBlock = css.match(
    /\.admin-image-preview__image\s*\{([^}]*)\}/s,
  );

  assert.match(css, /\.theme-doc-markdown img\s*\{[^}]*cursor:\s*zoom-in/s);
  assert.match(css, /\.admin-image-preview\s*\{/);
  assert.match(css, /background:\s*rgba\(248,\s*250,\s*252,\s*\.96\)/);
  assert.match(css, /overflow:\s*auto/);
  assert.ok(previewImageBlock, 'Preview image styles must exist');
  assert.doesNotMatch(previewImageBlock[1], /max-height/);
});

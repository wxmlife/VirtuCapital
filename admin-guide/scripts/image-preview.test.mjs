import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DOCUMENT_IMAGE_SELECTOR,
  getPreviewRequest,
  isPreviewActivation,
  preparePreviewImages,
} from '../src/image-preview.mjs';

function createImage({
  eligible = true,
  currentSrc = '',
  src = '',
  alt = '',
  attributes = {},
} = {}) {
  const values = new Map(Object.entries(attributes));
  const image = {
    currentSrc,
    src,
    alt,
    closest(selector) {
      return eligible && selector === DOCUMENT_IMAGE_SELECTOR ? image : null;
    },
    getAttribute(name) {
      if (name === 'src' && !values.has(name)) return src || null;
      if (name === 'alt' && !values.has(name)) return alt || null;
      return values.get(name) ?? null;
    },
    hasAttribute(name) {
      return values.has(name);
    },
    setAttribute(name, value) {
      values.set(name, String(value));
    },
  };
  return image;
}

test('accepts click, Enter, and Space as preview activation', () => {
  assert.equal(isPreviewActivation({type: 'click'}), true);
  assert.equal(isPreviewActivation({type: 'keydown', key: 'Enter'}), true);
  assert.equal(isPreviewActivation({type: 'keydown', key: ' '}), true);
  assert.equal(isPreviewActivation({type: 'keydown', key: 'Escape'}), false);
  assert.equal(isPreviewActivation({type: 'pointermove'}), false);
});

test('resolves only administrator document images and prefers currentSrc', () => {
  const documentImage = createImage({
    currentSrc: '/full-resolution.png',
    src: '/fallback.png',
    alt: '  Account-opening form  ',
  });
  const authLogo = createImage({
    eligible: false,
    src: '/logo.png',
    alt: 'Virtu Capital',
  });

  assert.deepEqual(getPreviewRequest(documentImage), {
    image: documentImage,
    src: '/full-resolution.png',
    alt: 'Account-opening form',
  });
  assert.equal(getPreviewRequest(authLogo), null);
  assert.equal(getPreviewRequest(createImage()), null);
  assert.equal(getPreviewRequest(null), null);
});

test('prepares document images for keyboard and dialog activation', () => {
  const plainImage = createImage({src: '/plain.png'});
  const customImage = createImage({
    src: '/custom.png',
    attributes: {tabindex: '-1', role: 'link'},
  });
  const root = {
    querySelectorAll(selector) {
      assert.equal(selector, DOCUMENT_IMAGE_SELECTOR);
      return [plainImage, customImage];
    },
  };

  preparePreviewImages(root);

  assert.equal(plainImage.getAttribute('tabindex'), '0');
  assert.equal(plainImage.getAttribute('role'), 'button');
  assert.equal(plainImage.getAttribute('aria-haspopup'), 'dialog');
  assert.equal(customImage.getAttribute('tabindex'), '-1');
  assert.equal(customImage.getAttribute('role'), 'link');
  assert.equal(customImage.getAttribute('aria-haspopup'), 'dialog');
});

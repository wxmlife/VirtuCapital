export const DOCUMENT_IMAGE_SELECTOR = '.theme-doc-markdown img';

function firstNonEmptyString(values) {
  return values.find(
    (value) => typeof value === 'string' && value.trim().length > 0,
  )?.trim();
}

export function isPreviewActivation(event) {
  if (event?.type === 'click') return true;
  return (
    event?.type === 'keydown' &&
    (event.key === 'Enter' || event.key === ' ')
  );
}

export function getPreviewRequest(target) {
  const image = target?.closest?.(DOCUMENT_IMAGE_SELECTOR);
  if (!image) return null;

  const src = firstNonEmptyString([
    image.currentSrc,
    image.src,
    image.getAttribute?.('src'),
  ]);
  if (!src) return null;

  const alt =
    firstNonEmptyString([image.alt, image.getAttribute?.('alt')]) ?? '';
  return {image, src, alt};
}

export function preparePreviewImages(root) {
  const images = root?.querySelectorAll?.(DOCUMENT_IMAGE_SELECTOR) ?? [];

  for (const image of images) {
    if (!image.getAttribute?.('tabindex')?.trim()) {
      image.setAttribute('tabindex', '0');
    }
    if (!image.getAttribute?.('role')?.trim()) {
      image.setAttribute('role', 'button');
    }
    image.setAttribute('aria-haspopup', 'dialog');
  }
}

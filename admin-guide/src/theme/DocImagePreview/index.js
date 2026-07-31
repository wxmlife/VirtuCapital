import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';

import {
  getPreviewRequest,
  isPreviewActivation,
  preparePreviewImages,
} from '../../image-preview.mjs';

const copies = {
  'zh-Hans': {
    dialog: '图片放大预览',
    close: '关闭图片预览',
  },
  'zh-Hant': {
    dialog: '圖片放大預覽',
    close: '關閉圖片預覽',
  },
  en: {
    dialog: 'Enlarged image preview',
    close: 'Close image preview',
  },
};

export default function DocImagePreview({locale}) {
  const {pathname} = useLocation();
  const [preview, setPreview] = useState(null);
  const openerRef = useRef(null);
  const copy = copies[locale] ?? copies['zh-Hans'];

  const closePreview = useCallback((restoreFocus = true) => {
    const opener = openerRef.current;
    openerRef.current = null;
    setPreview(null);

    if (!restoreFocus || !opener?.isConnected) return;
    const focusOpener = () => opener.focus();
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(focusOpener);
    } else {
      focusOpener();
    }
  }, []);

  useEffect(() => {
    preparePreviewImages(document);

    const observer = new MutationObserver(() => {
      preparePreviewImages(document);
    });
    observer.observe(document.body, {childList: true, subtree: true});

    function handleActivation(event) {
      if (!isPreviewActivation(event)) return;

      const request = getPreviewRequest(event.target);
      if (!request) return;

      event.preventDefault();
      openerRef.current = request.image;
      setPreview({src: request.src, alt: request.alt});
    }

    document.addEventListener('click', handleActivation);
    document.addEventListener('keydown', handleActivation);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleActivation);
      document.removeEventListener('keydown', handleActivation);
    };
  }, []);

  useEffect(() => {
    openerRef.current = null;
    setPreview(null);
  }, [pathname]);

  useEffect(() => {
    if (!preview) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleEscape(event) {
      if (event.key === 'Escape') {
        closePreview();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [closePreview, preview]);

  if (!preview) return null;

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closePreview();
    }
  }

  return (
    <div
      aria-label={copy.dialog}
      aria-modal="true"
      className="admin-image-preview"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <button
        aria-label={copy.close}
        autoFocus
        className="admin-image-preview__close"
        onClick={() => closePreview()}
        type="button"
      >
        <span aria-hidden="true">×</span>
      </button>
      <figure className="admin-image-preview__figure">
        <img
          alt={preview.alt}
          className="admin-image-preview__image"
          draggable="false"
          src={preview.src}
        />
        {preview.alt ? (
          <figcaption className="admin-image-preview__caption">
            {preview.alt}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}

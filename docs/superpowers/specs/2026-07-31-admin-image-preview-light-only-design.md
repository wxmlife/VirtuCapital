# Administrator Guide Image Preview and Light-Only Theme Design

## Context

The administrator guide contains long operational screenshots. Their inline size keeps document pages readable, but fine details can be difficult to inspect. The existing Docusaurus color-mode switch also exposes an unwanted dark theme.

## Goals

- Make every administrator-guide body image open in a clear, enlarged preview.
- Keep long screenshots readable by allowing the preview surface to scroll vertically.
- Apply the behavior automatically to Simplified Chinese, Traditional Chinese, and English documents, including future images.
- Force the administrator guide to use the light theme and remove the color-mode switch.
- Keep the preview accessible by mouse, touch, and keyboard.

## Scope

The preview applies only to images inside `.theme-doc-markdown`. It must not affect the authentication logo, navbar logo, icons, or the separate user guide.

The feature does not add image galleries, previous/next navigation, download controls, or editing tools.

## User Experience

### Inline images

- Existing body-image dimensions and left alignment remain unchanged.
- Previewable images show a zoom-in cursor.
- Each image is keyboard-focusable and exposes button semantics.
- Clicking or tapping an image opens its largest available source.
- Pressing Enter or Space while an image is focused also opens it.

### Preview

- The preview appears above the entire administrator guide.
- Its backdrop is a light, slightly translucent surface rather than a darkened page.
- The image retains its aspect ratio and may extend below the viewport; the preview surface scrolls so long screenshots remain legible.
- The image alternative text is displayed as a caption when available.
- Users can close the preview with the visible close button, by clicking the backdrop, or by pressing Escape.
- Opening the preview prevents the underlying page from scrolling.
- Closing it restores scrolling and returns keyboard focus to the image that opened it.
- Changing routes closes any open preview.

## Architecture

### Light-only theme

`admin-guide/docusaurus.config.js` will configure Docusaurus with:

- `defaultMode: 'light'`
- `disableSwitch: true`
- `respectPrefersColorScheme: false`

With the switch disabled, Docusaurus ignores a previously stored dark-theme choice during initial page setup and clears the obsolete preference after hydration.

### Image-preview behavior

A focused preview module under `admin-guide/src/` will own:

- the selector for eligible document images;
- image activation by pointer or keyboard;
- normalization of preview source and alternative text;
- cleanup of delegated event listeners;
- restoration of page scrolling and focus.

A React component mounted by `admin-guide/src/theme/Root.js` will render the preview dialog. Delegated document events will allow the feature to cover Markdown images, MDX `<img>` elements, localized pages, and images introduced by client-side navigation without changing every document.

### Styling

`admin-guide/src/css/custom.css` will add:

- zoom and focus styles for eligible body images;
- a fixed, light preview backdrop with a high stacking level;
- a readable close control and caption;
- a scrollable preview canvas;
- responsive spacing for narrow screens.

No dark-theme-specific preview rules will be added.

## Error Handling

- An element outside the document body image selector is ignored.
- An eligible image without a usable source does not open a preview.
- Repeated activation replaces the current preview rather than creating multiple overlays.
- Event listeners and temporary body styles are always restored when the component unmounts.

## Testing

Automated tests will verify:

- only administrator body images are eligible;
- click, Enter, and Space activation resolve the intended image;
- unrelated images and unsupported keys are ignored;
- the light-only Docusaurus configuration is present;
- the preview component is mounted from the administrator root;
- required dialog, close, scrolling, focus, and light-backdrop styles exist.

The final verification will run administrator tests, documentation validation, the three-locale administrator build, the combined two-guide GitHub Pages build, route checks, and generated-site link and asset checks.

## Acceptance Criteria

- The administrator guide exposes no dark-mode switch and always loads in light mode.
- Every administrator-guide body image can open from pointer and keyboard input.
- The preview uses a light backdrop and supports vertical scrolling for long images.
- The authentication and navbar images do not open the preview.
- Escape, backdrop click, and the close button all dismiss the preview.
- All three locales build successfully and existing documentation checks remain green.

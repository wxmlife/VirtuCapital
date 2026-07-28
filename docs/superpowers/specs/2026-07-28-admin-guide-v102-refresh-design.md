# Admin Guide V102 Refresh Design

## Objective

Refresh the administrator guide with the screenshots captured on 2026-07-28 in `admin-guide/docs/assets/V102`, give every retained screenshot a descriptive English kebab-case filename, remove duplicate and superseded screenshots, replace the relevant Markdown image references, and complete the functional instructions that are currently missing or incomplete.

## Scope

The refresh covers the administrator modules represented by the V102 screenshots:

- Market data
- Unified records and review details
- Administrator audit logs
- System settings
- Personal and enterprise customer management
- Stock management
- User feedback

Pages without a new V102 screenshot remain unchanged unless a broken cross-reference must be repaired. In particular, existing work in `admin-guide/docs/getting-started/login.md` and `admin-guide/docs/getting-started/admin-role.md` must be preserved.

## Screenshot Policy

- Treat screenshots captured on 2026-07-28 as the current V102 source of truth.
- Prefer complete Xnip scrolling captures when they show the full workflow or page.
- Retain a normal Snipaste capture when it shows a focused state that is not visible in a scrolling capture.
- Delete every screenshot from 2026-07-27.
- Delete duplicate or incomplete 2026-07-28 screenshots.
- Keep all retained images in `admin-guide/docs/assets/V102/`.
- Rename retained images with descriptive English kebab-case names.
- Ensure every retained screenshot is referenced by at least one Markdown page.
- Do not delete legacy images outside `V102` unless they are exact duplicates and no longer referenced.

## Naming Convention

Names describe the module and visible state, for example:

- `market-data-market-rate.jpg`
- `market-data-manual-rate.jpg`
- `records-pending-list.jpg`
- `records-inbound-transfer-detail.jpg`
- `records-outbound-transfer-detail.jpg`
- `records-stock-transfer-detail.jpg`
- `audit-log-list.jpg`
- `system-settings-fees-and-deposits.jpg`
- `system-settings-transfers-wallet-and-agreements.jpg`
- `system-settings-enterprise-and-market-content.jpg`
- `customers-personal-list.png`
- `customers-personal-detail.png`
- `customers-enterprise-list.png`
- `customers-enterprise-actions.png`
- `customers-enterprise-onboarding.jpg`
- `stocks-create-and-allocate.png`
- `stocks-allocation-complete.png`
- `feedback-list.png`

The final inventory may combine or split names only when the retained visual content requires it.

## Documentation Structure

Each affected Markdown page will use the following structure where applicable:

1. Page purpose
2. Search and filtering
3. Viewing details
4. Creating or changing data
5. Review and approval flow
6. Status meanings
7. Operational cautions

Instructions must distinguish actions available to administrators from actions that require super-administrator approval. Descriptions must reflect visible V102 labels and avoid inventing behavior not supported by the screenshots or existing documentation.

## Functional Coverage

### Market Data

Document market-rate and manual-rate modes, synchronization controls, displayed exchange-rate pairs, regional market synchronization cards, and the review requirement for changing the active rate mode.

### Records

Document the unified records list, record type and status filters, investor and stock searches, refresh behavior, inbound transfer review, outbound position review, stock-transfer review, attachments, lifecycle information, related transaction records, audit trails, approval, and rejection.

### Audit Logs

Document keyword, operation type, result, resource type, resource ID, administrator ID, target-user ID, and date filters; explain list fields and the detail action.

### System Settings

Document currency exchange fees, stock trading fees, deposit instructions and fees, withdrawal fees, stock-transfer fees, crypto wallet addresses, client agreement management, enterprise onboarding content, broker information, and recommended market indices. Explain that configurable sections are submitted for review before taking effect where the UI shows a review action.

### Customer Management

Document personal-user search, filtering, onboarding and Sumsub states, personal-user detail sections, enterprise-user search and status display, draft continuation and deletion, detail access, and the five-step enterprise onboarding form.

### Stock Management

Document stock search, total quantity and cost entry, investor allocation, allocation validation, allocation summary, and creation.

### User Feedback

Document summary counters, keyword and type filters, list fields, pagination, and opening feedback details including attached images.

## Validation

The implementation is complete only when:

- All retained V102 images use descriptive names.
- All superseded and duplicate V102 images are removed.
- Every retained V102 image has at least one Markdown reference.
- No Markdown page references a missing image.
- A repository search finds no references to deleted filenames.
- The administrator guide builds successfully with its existing build command.
- Existing unrelated workspace changes remain untouched.


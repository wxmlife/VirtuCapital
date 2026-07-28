# Admin Guide Complete Screenshot and Enterprise Onboarding Refresh Design

## Objective

Finish the V102 administrator-guide refresh without leaving any page on an obsolete, incorrect, duplicated, or missing screenshot. Update the source Simplified Chinese guide and its Traditional Chinese and English translations together, expand incomplete functions, and turn enterprise onboarding into a usable five-step tutorial that matches the current administrator UI.

This design extends the earlier V102 refresh. The 18 already curated V102 screenshots remain valid; this work adds the remaining UI states and replaces the legacy numbered assets still used by the guide.

## Approved Scope

The work is performed directly in the current workspace. No worktree or isolated copy is created.

The refresh covers:

- `admin-guide/docs/getting-started/login.md`
- `admin-guide/docs/getting-started/dashboard.md`
- `admin-guide/docs/users/investors.md`
- `admin-guide/docs/users/customers.md`
- `admin-guide/docs/stocks/stock-management.md`
- `admin-guide/docs/communications/message-templates.md`
- `admin-guide/docs/reference/permissions.md`
- The corresponding files under:
  - `admin-guide/i18n/en/docusaurus-plugin-content-docs/current/`
  - `admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/`

The remaining administrator pages are also included in final asset, build, metadata, link, and route verification so the refresh cannot leave a hidden regression elsewhere in the guide.

## Screenshot Inventory

### Retained V102 screenshots

Keep the 18 current, descriptively named images in `admin-guide/docs/assets/V102/` that already cover:

- Market data
- Unified records
- Audit logs
- System settings
- Personal and enterprise customer lists and actions
- Enterprise onboarding step 1
- Stock creation and allocation
- User feedback

### New screenshots

Capture and add the following current V102 states:

| Filename | Required visible state |
| --- | --- |
| `login-page.png` | Administrator login page |
| `dashboard-overview.jpg` | Full dashboard overview |
| `dashboard-system-status.png` | Focused lower dashboard area containing the current platform-account balance and system-information cards |
| `investors-list.png` | Current investor list with search and table fields |
| `investors-actions.png` | Investor row action menu |
| `investors-detail.jpg` | Investor detail page and its primary sections |
| `investors-role-change-dialog.png` | Role-change dialog before confirmation |
| `stocks-overview.jpg` | Current stock-management overview or list |
| `message-templates-list.jpg` | Current message-template list |
| `message-template-preview.png` | Message-template preview or detail state |
| `customers-enterprise-onboarding-step-2-finance-and-structure.jpg` | Step 2, “财务与结构” |
| `customers-enterprise-onboarding-step-3-compliance-and-accounts.jpg` | Step 3, “合规与账户” |
| `customers-enterprise-onboarding-step-4-tax-and-documents.jpg` | Step 4, “税务与文件” |
| `customers-enterprise-onboarding-step-5-document-signing.jpg` | Step 5, “文件签署”, before any signature or submission |

Rename the existing `customers-enterprise-onboarding.jpg` to `customers-enterprise-onboarding-step-1-main.jpg` so all five stages form one stable sequence.

If a page uses a long form, capture it with Snipaste scrolling capture. Use a normal focused capture for short menus, dialogs, previews, or status panels. Every image must show the current UI clearly and must not expose real customer personal information, credentials, account numbers, or uploaded legal documents.

## Asset Storage and Cleanup

- Store source images in `admin-guide/docs/assets/V102/`.
- Copy the same approved image files into each locale’s `assets/V102/` directory so translated Markdown resolves locally and remains portable.
- Use descriptive English kebab-case names without timestamps or capture-tool prefixes.
- Remove `.DS_Store`, duplicate captures, incomplete captures, and legacy numbered images only after repository-wide reference checks prove that no Markdown file still uses them.
- Remove the obsolete permission-chart images after the role matrix replaces them and no references remain.
- Ensure every retained V102 image is referenced by at least one document and every Markdown image target exists.

## Documentation Design

### Login and dashboard

Replace `01-login-page.jpg`, `02-post-login.jpg`, `02-post-login.png`, and `03-system-info.jpg` with current V102 captures. Explain login, language/theme controls, safe logout, dashboard summary cards, platform assets, funding information, and system status only where visible in the current UI.

### Investor management

Replace `04-investor-list.jpg` and remove the incorrect `07-stockManage-addStock.jpg` reference. Document:

- Search by phone, name, or email
- Current table fields and role labels
- Opening investor details and navigating available data sections
- Row actions
- Role changes and their authorization boundary
- Any available account edit or management actions actually present in V102

The guide must not claim that permanent deletion exists unless that action is visible and verified. Opening the role dialog is allowed for documentation; confirming a role change is not.

### Enterprise customer management and onboarding

Keep the current enterprise list and actions screenshots. Rewrite the tutorial to use the real five-stage labels and order:

1. `主体资料`
2. `财务与结构`
3. `合规与账户`
4. `税务与文件`
5. `文件签署`

For every stage, document:

- Purpose of the stage
- Visible required and optional fields
- Repeated sections or add-item controls
- Upload requirements shown by the UI
- Validation messages encountered during safe test entry
- `保存草稿` and `保存并下一步` behavior where available
- How to leave and resume the existing draft

The tutorial begins with prerequisites and the entry path from the enterprise-user list, and ends with review guidance, draft status, and how to resume or correct data.

Only an existing test draft may be used. Dummy test values may be entered and saved as a draft when required to reach the next stage. Do not use real customer data, create a real account, submit the onboarding application, accept an agreement, upload a real legal document, sign any document, or delete a record. Step 5 is captured and explained before any legally binding action.

### Stock management

Add a current stock overview screenshot while keeping the valid V102 creation/allocation states. Document list/search behavior and the create, allocate, validate, and completion flow. Remove the legacy stock screenshots after all three locales use V102.

### Message templates

Replace the legacy list and preview images. Document list fields, filtering or search, opening a template, previewing localized content, and visible management actions. Do not send a message or save a production template as part of screenshot capture.

### Permissions

Replace the outdated static permission screenshots with a current Markdown role matrix. Use the verified investor role dialog and current audit-log screenshot as supporting UI evidence rather than fabricating a nonexistent permissions page.

The role matrix must distinguish:

- Investor
- Administrator
- Super administrator

Only permissions confirmed by the current UI and existing guide behavior may be stated. Destructive actions and settings that require review must include a caution.

Remove placeholder email addresses and hotline numbers from the support appendix. Retain only a support route that can be verified in the current product or repository; if none exists, direct administrators to their organization’s authorized internal support process without inventing contact details.

### Metadata and incomplete content

Keep Docusaurus front matter only at the top of each Markdown file. No page may render raw trailing metadata such as:

`title: 投资者管理 sidebar_position: 1`

Complete missing functional instructions only from current UI evidence, retained V102 screenshots, or already verified product behavior. Remove speculative statements that cannot be confirmed.

## Locale Synchronization

Simplified Chinese is the source version. Traditional Chinese and English receive the same:

- Heading structure
- Functional coverage
- Warnings and authorization boundaries
- Screenshot order
- V102 asset filenames

Text is localized naturally; it is not left as untranslated Simplified Chinese. The three versions must have equivalent operational meaning even when UI labels remain in the language visible in the captured administrator portal.

## Capture and UI-Safety Workflow

1. Confirm the active browser tab is the administrator portal, not the documentation site.
2. Confirm the target record is an existing test record or test draft.
3. Navigate to the required state and inspect visible data for sensitive content.
4. Open Snipaste with `F1`.
5. Use scrolling capture for long forms and normal capture for menus/dialogs.
6. Save to a temporary approved location, visually inspect the image, then move it to the V102 asset directory with the specified name.
7. Return the UI to a neutral state without confirming role changes, deleting records, sending messages, signing documents, or submitting onboarding.

If Snipaste cannot capture a particular transient state reliably, use a focused macOS screen capture for that state. Browser-native full-page screenshots are not used for the long forms because the user has already found that they introduce excessive blank space.

## Failure Handling

### UI navigation

- If a route, menu, or dialog does not match the guide, stop editing that instruction and verify the current UI first.
- If enterprise onboarding cannot advance using the existing test draft without a real upload, signature, or final submission, capture the furthest safe state and document the verified visible behavior without inventing later fields.
- If a test draft contains sensitive data, do not capture it; select another test record or mask the view before capture.

### Documentation runtime

Every run must check for route-transition failures, especially `ChunkLoadError`.

If a chunk fails:

1. Confirm that the Docusaurus server is still running.
2. Confirm the browser is using the current server and generated bundles.
3. Restart the development server and rebuild stale generated artifacts when needed.
4. Repeat the same sequential navigation that exposed the error.
5. Do not report completion until the runtime overlay is absent and the browser console has zero errors for the verified route chain.

## Validation

Implementation is complete only when all checks below pass.

### Asset checks

- No refreshed document references legacy numbered screenshots.
- No timestamp-based, duplicate, incomplete, or `.DS_Store` files remain in V102.
- Every V102 asset is referenced.
- Every Markdown image path exists in all three locales.
- All new screenshots pass visual inspection for clarity, cropping, content correctness, and sensitive-data safety.

### Content checks

- The investor page uses current investor screenshots and contains no stock screenshot.
- The enterprise tutorial contains all five real stages in the correct order.
- The permissions page uses a text role matrix rather than obsolete static charts.
- No document contains a second or trailing front-matter block.
- Simplified Chinese, Traditional Chinese, and English have equivalent coverage.

### Build and route checks

- Run the administrator-guide production build for Simplified Chinese, Traditional Chinese, and English.
- Start the local guide and navigate sequentially through all 15 sidebar documents:
  - Guide index
  - Administrator role
  - Login
  - Dashboard
  - Investors
  - Personal and enterprise customers
  - Stock management
  - Market data
  - Records
  - Audit logs
  - System settings
  - Message templates
  - User feedback
  - FAQ
  - Permissions
- Repeat the route chain for `/en/` and `/zh-Hant/`.
- Confirm every image loads, no runtime overlay appears, no route produces `ChunkLoadError`, and the browser console reports zero errors.

## Completion Boundary

The repository outputs are documentation and screenshot assets only. The existing test draft may receive dummy values and draft saves solely to expose later tutorial stages. This does not authorize any production-data change, account creation, role confirmation, record deletion, message sending, agreement acceptance, legal signature, or final enterprise-onboarding submission.

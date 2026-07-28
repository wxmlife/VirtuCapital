# Admin Guide Complete Screenshots and Enterprise Onboarding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every remaining obsolete or incorrect administrator-guide screenshot, add the missing V102 UI states, publish a verified five-step enterprise-onboarding tutorial, and keep Simplified Chinese, Traditional Chinese, and English documentation equivalent.

**Architecture:** Treat `admin-guide/docs/assets/V102/` as the canonical visual inventory, mirror its exact files into both translated documentation trees, and enforce integrity with one deterministic Node validation script. Capture browser states serially because they share one signed-in UI session; update the two translation trees independently after the Simplified Chinese source is stable; finish with a three-locale build and browser-driven route transitions across all 45 localized pages.

**Tech Stack:** Docusaurus 3, Markdown/MDX, Node.js ESM, Snipaste, macOS Computer Use, in-app Browser, PNG/JPEG assets, npm, Git.

## Global Constraints

- Work directly in `/Users/apple/Documents/VirtuCapital`; do not create a worktree or isolated checkout.
- Preserve unrelated dirty-worktree changes and stage only exact task files.
- Keep the 18 approved V102 screenshots and add the 14 named missing screenshots from the approved design.
- Use only an existing test enterprise draft and dummy values required to expose later stages.
- Never confirm a role change, delete a record, send a message, create a real account, submit onboarding, accept an agreement, or sign a document.
- Do not capture real personal data, credentials, account numbers, or legal documents.
- Use Snipaste scrolling capture for long forms and a focused capture for menus, dialogs, previews, and status cards.
- Use Simplified Chinese as the content source; Traditional Chinese and English must preserve the same headings, warnings, screenshot order, and operational meaning.
- Every runtime verification must check route transitions, image loading, raw front-matter leakage, runtime overlays, `ChunkLoadError`, and browser console errors.
- Use `apply_patch` for Markdown, JSON, and JavaScript edits. Binary moves and copies may use explicit shell paths.

## File Map

### Validation and build

- Create: `admin-guide/scripts/validate-docs.mjs`
- Modify: `admin-guide/package.json`
- Preserve and include: `admin-guide/scripts/build-isolated.mjs`

### Canonical source documents

- Modify: `admin-guide/docs/getting-started/login.md`
- Modify: `admin-guide/docs/getting-started/dashboard.md`
- Modify: `admin-guide/docs/users/investors.md`
- Modify: `admin-guide/docs/users/customers.md`
- Modify: `admin-guide/docs/stocks/stock-management.md`
- Modify: `admin-guide/docs/communications/message-templates.md`
- Modify: `admin-guide/docs/reference/permissions.md`

### Translated documents

Update the matching files under both:

- `admin-guide/i18n/en/docusaurus-plugin-content-docs/current/`
- `admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/`

The translation sync covers these twelve relative paths:

- `getting-started/login.md`
- `getting-started/dashboard.md`
- `users/investors.md`
- `users/customers.md`
- `stocks/stock-management.md`
- `market/market-data.md`
- `reviews/records.md`
- `reviews/audit-log.md`
- `settings/system-settings.md`
- `communications/message-templates.md`
- `communications/feedback.md`
- `reference/permissions.md`

### Assets

- Curate: `admin-guide/docs/assets/V102/`
- Create and mirror: `admin-guide/i18n/en/docusaurus-plugin-content-docs/current/assets/V102/`
- Create and mirror: `admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/assets/V102/`

---

### Task 1: Add Deterministic Documentation Validation

**Files:**

- Create: `admin-guide/scripts/validate-docs.mjs`
- Modify: `admin-guide/package.json`
- Include: `admin-guide/scripts/build-isolated.mjs`

**Interfaces:**

- Consumes: all three documentation roots and their `assets/V102` directories.
- Produces: `npm run validate:docs`, which exits nonzero on missing assets, legacy references, raw trailing metadata, locale image-order drift, inventory drift, or test contact markers.

- [ ] **Step 1: Add the validation script**

Create `admin-guide/scripts/validate-docs.mjs` with this implementation:

```js
import {createHash} from 'node:crypto';
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'node:fs';
import {basename, dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const roots = [
  {locale: 'zh-Hans', docsDir: resolve(siteDir, 'docs')},
  {
    locale: 'zh-Hant',
    docsDir: resolve(
      siteDir,
      'i18n/zh-Hant/docusaurus-plugin-content-docs/current',
    ),
  },
  {
    locale: 'en',
    docsDir: resolve(
      siteDir,
      'i18n/en/docusaurus-plugin-content-docs/current',
    ),
  },
];

const expectedDocs = [
  'communications/feedback.md',
  'communications/message-templates.md',
  'getting-started/admin-role.md',
  'getting-started/dashboard.md',
  'getting-started/login.md',
  'index.md',
  'market/market-data.md',
  'reference/faq.md',
  'reference/permissions.md',
  'reviews/audit-log.md',
  'reviews/records.md',
  'settings/system-settings.md',
  'stocks/stock-management.md',
  'users/customers.md',
  'users/investors.md',
];

const expectedV102 = [
  'audit-log-list.jpg',
  'customers-enterprise-actions.png',
  'customers-enterprise-list.png',
  'customers-enterprise-onboarding-step-1-main.jpg',
  'customers-enterprise-onboarding-step-2-finance-and-structure.jpg',
  'customers-enterprise-onboarding-step-3-compliance-and-accounts.jpg',
  'customers-enterprise-onboarding-step-4-tax-and-documents.jpg',
  'customers-enterprise-onboarding-step-5-document-signing.jpg',
  'customers-personal-detail.png',
  'customers-personal-list.png',
  'dashboard-overview.jpg',
  'dashboard-system-status.png',
  'feedback-list.png',
  'investors-actions.png',
  'investors-detail.jpg',
  'investors-list.png',
  'investors-role-change-dialog.png',
  'login-page.png',
  'market-data-manual-rate.jpg',
  'market-data-market-rate.jpg',
  'message-template-preview.png',
  'message-templates-list.jpg',
  'records-inbound-transfer-detail.jpg',
  'records-outbound-transfer-detail.jpg',
  'records-pending-list.jpg',
  'records-stock-transfer-detail.jpg',
  'stocks-allocation-complete.png',
  'stocks-create-and-allocate.png',
  'stocks-overview.jpg',
  'system-settings-enterprise-and-market-content.jpg',
  'system-settings-fees-and-deposits.jpg',
  'system-settings-transfers-wallet-and-agreements.jpg',
].sort();

const errors = [];
const sequences = new Map();
const sourceHashes = new Map();

function walkMarkdown(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, {withFileTypes: true})
    .flatMap((entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory() && entry.name !== 'assets') {
        return walkMarkdown(path);
      }
      return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
    })
    .sort();
}

function listFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory)
    .filter((name) => statSync(resolve(directory, name)).isFile())
    .sort();
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function sameList(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

for (const {locale, docsDir} of roots) {
  const markdownFiles = walkMarkdown(docsDir);
  const relativeDocs = markdownFiles.map((path) => relative(docsDir, path));
  if (!sameList(relativeDocs, expectedDocs)) {
    errors.push(`${locale}: document inventory differs from the 15 sidebar pages`);
  }

  const referencedV102 = new Set();
  const localeSequences = new Map();

  for (const path of markdownFiles) {
    const rel = relative(docsDir, path);
    const text = readFileSync(path, 'utf8');
    const lines = text.split(/\r?\n/);
    const closing = lines.findIndex((line, index) => index > 0 && line.trim() === '---');

    if (lines[0]?.trim() !== '---' || closing < 1) {
      errors.push(`${locale}/${rel}: missing top front matter`);
      continue;
    }

    const bodyLines = lines.slice(closing + 1);
    if (bodyLines.some((line) => line.trim() === '---')) {
      errors.push(`${locale}/${rel}: extra horizontal/front-matter delimiter`);
    }
    const body = bodyLines.join('\n');
    if (/^(?:title|sidebar_position):/m.test(body)) {
      errors.push(`${locale}/${rel}: raw metadata appears in document body`);
    }
    if (rel === 'reference/permissions.md' && /(占位|placeholder|xxxx)/i.test(body)) {
      errors.push(`${locale}/${rel}: unverified support contact marker remains`);
    }

    const imageNames = [];
    for (const match of text.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)) {
      let target = match[1].trim();
      if (target.startsWith('<') && target.endsWith('>')) {
        target = target.slice(1, -1);
      }
      if (/^(?:https?:|data:|#)/.test(target)) continue;

      const resolved = resolve(dirname(path), target);
      if (!existsSync(resolved)) {
        errors.push(`${locale}/${rel}: missing image ${target}`);
      }

      const name = basename(target);
      imageNames.push(name);
      if (
        target.includes('/assets/') &&
        !target.includes('/assets/V102/') &&
        /^(?:\d{2}-.+|(?:client|admin)-permissions\.(?:png|jpe?g))$/i.test(name)
      ) {
        errors.push(`${locale}/${rel}: legacy image reference ${target}`);
      }
      if (target.includes('/assets/V102/')) {
        referencedV102.add(name);
      }
    }
    localeSequences.set(rel, imageNames);
  }
  sequences.set(locale, localeSequences);

  const assetDir = resolve(docsDir, 'assets/V102');
  const assetNames = listFiles(assetDir);
  if (!sameList(assetNames, expectedV102)) {
    errors.push(`${locale}: V102 inventory differs from the approved 32 files`);
  }

  for (const name of expectedV102) {
    const path = resolve(assetDir, name);
    if (!existsSync(path)) continue;
    if (!referencedV102.has(name)) {
      errors.push(`${locale}: unreferenced V102 image ${name}`);
    }
    const hash = sha256(path);
    if (locale === 'zh-Hans') {
      sourceHashes.set(name, hash);
    } else if (sourceHashes.get(name) !== hash) {
      errors.push(`${locale}: V102 image differs from source ${name}`);
    }
  }
}

const sourceSequences = sequences.get('zh-Hans');
for (const locale of ['zh-Hant', 'en']) {
  const localeSequences = sequences.get(locale);
  for (const rel of expectedDocs) {
    const source = sourceSequences?.get(rel) ?? [];
    const translated = localeSequences?.get(rel) ?? [];
    if (!sameList(source, translated)) {
      errors.push(`${locale}/${rel}: screenshot order differs from zh-Hans`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('Validated 15 documents and 32 V102 assets in zh-Hans, zh-Hant, and en.');
```

- [ ] **Step 2: Add the npm command**

Add this script entry without changing the existing start, build, or serve commands:

```json
"validate:docs": "node scripts/validate-docs.mjs"
```

- [ ] **Step 3: Run the baseline validation**

Run:

```bash
npm run validate:docs
```

Working directory: `admin-guide`

Expected: exit code `1`, including the missing 14 new V102 files, absent locale V102 directories, legacy image references, and translation screenshot-order differences. This failure proves that the validator detects the current gaps.

- [ ] **Step 4: Commit only validation/build files**

```bash
git add admin-guide/package.json admin-guide/scripts/build-isolated.mjs admin-guide/scripts/validate-docs.mjs
git commit -m "test: validate multilingual admin guide assets"
```

---

### Task 2: Capture Login, Dashboard, Investor, Stock, and Message States

**Files:**

- Create: `admin-guide/docs/assets/V102/login-page.png`
- Create: `admin-guide/docs/assets/V102/dashboard-overview.jpg`
- Create: `admin-guide/docs/assets/V102/dashboard-system-status.png`
- Create: `admin-guide/docs/assets/V102/investors-list.png`
- Create: `admin-guide/docs/assets/V102/investors-actions.png`
- Create: `admin-guide/docs/assets/V102/investors-detail.jpg`
- Create: `admin-guide/docs/assets/V102/investors-role-change-dialog.png`
- Create: `admin-guide/docs/assets/V102/stocks-overview.jpg`
- Create: `admin-guide/docs/assets/V102/message-templates-list.jpg`
- Create: `admin-guide/docs/assets/V102/message-template-preview.png`

**Interfaces:**

- Consumes: the signed-in administrator portal and Snipaste.
- Produces: ten current, sanitized screenshots used by Tasks 5, 7, and 8.

- [ ] **Step 1: Confirm the correct browser tab**

Inspect the focused Chrome window and select the actual administrator portal. Confirm the page contains the dark VirtuCapital admin sidebar and is not `localhost:3001`, which is the documentation site.

- [ ] **Step 2: Capture the login page**

Use the portal’s safe logout path only if the login page cannot otherwise be opened without ending another required session. Capture the whole login card and language/theme controls as `login-page.png`; do not expose saved credentials.

- [ ] **Step 3: Capture the dashboard**

After safe sign-in, capture the complete dashboard using Snipaste scrolling capture as `dashboard-overview.jpg`. Capture the lower account-balance and system-information cards as `dashboard-system-status.png`.

- [ ] **Step 4: Capture the investor list**

Open the investor list, clear any sensitive search text, and capture the current search/table state as `investors-list.png`.

- [ ] **Step 5: Capture investor actions**

Open an action menu on a clearly synthetic or internal test account and save `investors-actions.png`. Do not choose a destructive command.

- [ ] **Step 6: Capture investor details**

Open the same safe test account’s detail page and use a scrolling capture for `investors-detail.jpg`. Exclude or mask sensitive personal fields.

- [ ] **Step 7: Capture the role dialog**

Open the role-change dialog and save `investors-role-change-dialog.png`. Close it with Cancel or the close control; do not confirm.

- [ ] **Step 8: Capture the stock overview**

Open stock management, clear search filters, and capture the complete overview as `stocks-overview.jpg`. Do not create or allocate stock.

- [ ] **Step 9: Capture message templates**

Capture the template list as `message-templates-list.jpg`, then open a safe template preview and capture `message-template-preview.png`. Close without saving or sending.

- [ ] **Step 10: Visually inspect all ten images**

Use image inspection on every file. Reject any image with blank scroll gaps, cropped controls, runtime overlays, exposed sensitive data, or the documentation site instead of the portal.

- [ ] **Step 11: Commit only the ten screenshots**

```bash
git add admin-guide/docs/assets/V102/login-page.png admin-guide/docs/assets/V102/dashboard-overview.jpg admin-guide/docs/assets/V102/dashboard-system-status.png admin-guide/docs/assets/V102/investors-list.png admin-guide/docs/assets/V102/investors-actions.png admin-guide/docs/assets/V102/investors-detail.jpg admin-guide/docs/assets/V102/investors-role-change-dialog.png admin-guide/docs/assets/V102/stocks-overview.jpg admin-guide/docs/assets/V102/message-templates-list.jpg admin-guide/docs/assets/V102/message-template-preview.png
git commit -m "docs: add remaining V102 admin screenshots"
```

---

### Task 3: Capture the Five-Step Enterprise Onboarding Flow

**Files:**

- Rename: `admin-guide/docs/assets/V102/customers-enterprise-onboarding.jpg` → `admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-1-main.jpg`
- Create: `admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-2-finance-and-structure.jpg`
- Create: `admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-3-compliance-and-accounts.jpg`
- Create: `admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-4-tax-and-documents.jpg`
- Create: `admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-5-document-signing.jpg`

**Interfaces:**

- Consumes: one existing test enterprise draft.
- Produces: one visually verified scrolling capture per real wizard stage, without a signature or final submission.

- [ ] **Step 1: Rename and inspect step 1**

Move the existing step-1 image to the new exact filename and confirm it visibly contains `主体资料`.

- [ ] **Step 2: Open an existing test draft**

From the enterprise-user list, choose `继续开户` on a draft that contains no real customer information. Record the visible field names for the tutorial while navigating.

- [ ] **Step 3: Capture step 2**

Reach `财务与结构` using only dummy values and draft saves when required. Capture the entire stage as `customers-enterprise-onboarding-step-2-finance-and-structure.jpg`.

- [ ] **Step 4: Capture step 3**

Reach `合规与账户` and capture it as `customers-enterprise-onboarding-step-3-compliance-and-accounts.jpg`. Do not connect or create a real account.

- [ ] **Step 5: Capture step 4**

Reach `税务与文件` and capture it as `customers-enterprise-onboarding-step-4-tax-and-documents.jpg`. If the UI requires an upload for navigation, use only a harmless test-only file containing no personal or legal data.

- [ ] **Step 6: Capture step 5**

Reach `文件签署` and capture the page as `customers-enterprise-onboarding-step-5-document-signing.jpg` before checking acceptance boxes or signing controls. Do not submit.

- [ ] **Step 7: Leave the record as a draft**

Return to the enterprise list using the ordinary navigation path. Confirm the record still shows a draft/incomplete state and no success/submitted status.

- [ ] **Step 8: Visually inspect all five stages**

Confirm each filename matches its visible stage label, scrolling joins contain no blank bands, and no captured field contains real personal, bank, tax, or legal-document data.

- [ ] **Step 9: Commit the five-stage inventory**

```bash
git add admin-guide/docs/assets/V102/customers-enterprise-onboarding.jpg admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-1-main.jpg admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-2-finance-and-structure.jpg admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-3-compliance-and-accounts.jpg admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-4-tax-and-documents.jpg admin-guide/docs/assets/V102/customers-enterprise-onboarding-step-5-document-signing.jpg
git commit -m "docs: capture enterprise onboarding stages"
```

---

### Task 4: Curate and Mirror the Canonical V102 Inventory

**Files:**

- Modify: `admin-guide/docs/assets/V102/`
- Create: `admin-guide/i18n/en/docusaurus-plugin-content-docs/current/assets/V102/`
- Create: `admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/assets/V102/`

**Interfaces:**

- Consumes: 18 retained screenshots plus 14 new screenshots.
- Produces: three byte-identical directories containing exactly the approved 32 filenames.

- [ ] **Step 1: Remove V102 metadata debris**

Delete only:

```text
admin-guide/docs/assets/V102/.DS_Store
```

- [ ] **Step 2: Confirm the canonical set**

Run:

```bash
find admin-guide/docs/assets/V102 -maxdepth 1 -type f -print | sort
```

Expected: exactly 32 files, all listed in `expectedV102` in Task 1, with no timestamp-based name.

- [ ] **Step 3: Create locale asset directories**

Create the two `assets/V102` directories under `en` and `zh-Hant`.

- [ ] **Step 4: Copy the 32 canonical images**

Copy each canonical V102 file into both locale V102 directories. Do not copy `.DS_Store` or any legacy numbered image.

- [ ] **Step 5: Compare names and hashes**

Run:

```bash
npm run validate:docs
```

Expected: validation still fails on documentation references and content parity, but it must no longer report missing, extra, or hash-different V102 files.

- [ ] **Step 6: Commit all three V102 inventories**

Stage the three V102 directories explicitly and commit:

```bash
git add admin-guide/docs/assets/V102 admin-guide/i18n/en/docusaurus-plugin-content-docs/current/assets/V102 admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/assets/V102
git commit -m "docs: synchronize multilingual V102 assets"
```

---

### Task 5: Update Core Simplified Chinese Guides

**Files:**

- Modify: `admin-guide/docs/getting-started/login.md`
- Modify: `admin-guide/docs/getting-started/dashboard.md`
- Modify: `admin-guide/docs/users/investors.md`
- Modify: `admin-guide/docs/stocks/stock-management.md`
- Modify: `admin-guide/docs/communications/message-templates.md`

**Interfaces:**

- Consumes: the ten screenshots from Task 2 and two retained stock-allocation screenshots.
- Produces: current source-language instructions and image order for translation tasks.

- [ ] **Step 1: Record the failing legacy references**

Run:

```bash
rg -n '../assets/(01-|02-|03-|04-|06-|07-|08-|24-|25-)' admin-guide/docs/getting-started admin-guide/docs/users/investors.md admin-guide/docs/stocks/stock-management.md admin-guide/docs/communications/message-templates.md
```

Expected: matches in all five target guides.

- [ ] **Step 2: Rewrite login**

Replace the two old images with `V102/login-page.png` and `V102/dashboard-overview.jpg`. Document credential entry, sign-in, language/theme controls, failure handling, session safety, and logout using only verified UI behavior.

- [ ] **Step 3: Rewrite dashboard**

Use `V102/dashboard-overview.jpg` and `V102/dashboard-system-status.png`. Match visible summary cards, account-balance areas, quick links, and system information. Remove the trailing delimiter after the document body.

- [ ] **Step 4: Rewrite investor management**

Use the four `investors-*` images. Cover search, current columns, detail navigation, row actions, role boundaries, and cancellation of the role dialog. Remove the stock screenshot and any unverified permanent-delete claim.

- [ ] **Step 5: Complete stock management**

Place `V102/stocks-overview.jpg` before the retained `stocks-create-and-allocate.png` and `stocks-allocation-complete.png`. Cover list/search fields, create inputs, allocation limits, duplicate-investor prevention, remaining quantity, validation, and completion.

- [ ] **Step 6: Rewrite message templates**

Use `V102/message-templates-list.jpg` and `V102/message-template-preview.png`. Cover search/list fields, language tabs, variables, payload preview, verified save behavior, and a warning not to remove required variables.

- [ ] **Step 7: Verify the five source pages**

Run:

```bash
rg -n '../assets/(01-|02-|03-|04-|06-|07-|08-|24-|25-)' admin-guide/docs/getting-started admin-guide/docs/users/investors.md admin-guide/docs/stocks/stock-management.md admin-guide/docs/communications/message-templates.md
```

Expected: no output.

Run:

```bash
rg -n 'V102/(login|dashboard|investors|stocks|message)' admin-guide/docs/getting-started admin-guide/docs/users/investors.md admin-guide/docs/stocks/stock-management.md admin-guide/docs/communications/message-templates.md
```

Expected: all thirteen intended references appear.

- [ ] **Step 8: Commit the five source pages**

```bash
git add admin-guide/docs/getting-started/login.md admin-guide/docs/getting-started/dashboard.md admin-guide/docs/users/investors.md admin-guide/docs/stocks/stock-management.md admin-guide/docs/communications/message-templates.md
git commit -m "docs: refresh core administrator workflows"
```

---

### Task 6: Write the Enterprise Tutorial and Current Permission Matrix

**Files:**

- Modify: `admin-guide/docs/users/customers.md`
- Modify: `admin-guide/docs/reference/permissions.md`

**Interfaces:**

- Consumes: all five onboarding-stage captures, the retained customer list/action captures, `investors-role-change-dialog.png`, and `audit-log-list.jpg`.
- Produces: the definitive Simplified Chinese enterprise tutorial and role-permission source text.

- [ ] **Step 1: Expand enterprise prerequisites and entry paths**

Document the required preparation, `企业用户` list path, `企业开户`, `继续开户`, visible draft statuses, and how to resume a draft.

- [ ] **Step 2: Write stage 1**

Use `customers-enterprise-onboarding-step-1-main.jpg`. Document the visible subject/company profile, registration, address, and contact fields; distinguish required and optional fields from the UI.

- [ ] **Step 3: Write stage 2**

Use `customers-enterprise-onboarding-step-2-finance-and-structure.jpg`. Document every visible finance, ownership, director, shareholder, beneficial-owner, and repeatable-section control actually shown.

- [ ] **Step 4: Write stage 3**

Use `customers-enterprise-onboarding-step-3-compliance-and-accounts.jpg`. Document visible compliance declarations, account choices, and contact/account fields without claiming an account is created at this stage.

- [ ] **Step 5: Write stage 4**

Use `customers-enterprise-onboarding-step-4-tax-and-documents.jpg`. Document visible tax fields, upload slots, accepted UI states, and the prohibition on uploading unapproved real documents.

- [ ] **Step 6: Write stage 5**

Use `customers-enterprise-onboarding-step-5-document-signing.jpg`. Explain review and signing controls, explicitly stopping before agreement acceptance, signature, or final submission.

- [ ] **Step 7: Document draft validation and recovery**

Explain `保存草稿`, `保存并下一步`, field validation, returning to earlier stages, leaving safely, resuming, and the difference between draft and submitted states.

- [ ] **Step 8: Replace permission images with a role matrix**

Remove the old permission-chart references. Add a Markdown matrix for Investor, Administrator, and Super Administrator using only verified capabilities. Reference `V102/investors-role-change-dialog.png` and `V102/audit-log-list.jpg` as supporting UI examples.

- [ ] **Step 9: Remove unverified support contacts**

Delete fake email addresses, hotline values, and marker text. Direct users to their organization’s authorized internal support path unless a current support route is verified in the repository.

- [ ] **Step 10: Verify source coverage**

Run:

```bash
rg -n '主体资料|财务与结构|合规与账户|税务与文件|文件签署' admin-guide/docs/users/customers.md
```

Expected: all five stage labels appear in order.

Run:

```bash
rg -n '27-client-permissions|28-admin-permissions|占位|xxxx' admin-guide/docs/reference/permissions.md
```

Expected: no output.

- [ ] **Step 11: Commit the two source pages**

```bash
git add admin-guide/docs/users/customers.md admin-guide/docs/reference/permissions.md
git commit -m "docs: add enterprise onboarding and role matrix"
```

---

### Task 7: Synchronize Traditional Chinese Documentation

**Files:**

- Modify: the twelve paths listed under “Translated documents” inside `admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/`

**Interfaces:**

- Consumes: the finalized Simplified Chinese content and screenshot sequences from Tasks 5 and 6, plus the already refreshed source pages for market data, records, audit logs, system settings, and feedback.
- Produces: natural Traditional Chinese equivalents with identical V102 image order.

- [ ] **Step 1: Update login, dashboard, and investors**

Translate the current source meaning into Traditional Chinese, retaining product labels where appropriate and using the exact same V102 filenames and order.

- [ ] **Step 2: Update customers and the five onboarding stages**

Translate all prerequisites, five real stages, draft controls, validation, safety warnings, and image captions.

- [ ] **Step 3: Update stocks and message templates**

Translate the current overview, creation/allocation workflow, list, preview, variables, and safety notes.

- [ ] **Step 4: Update permissions**

Translate the role matrix and authorized support guidance. Do not reintroduce static charts or unverified contact values.

- [ ] **Step 5: Port earlier V102 source improvements**

Synchronize `market/market-data.md`, `reviews/records.md`, `reviews/audit-log.md`, `settings/system-settings.md`, and `communications/feedback.md` from their current Simplified Chinese structure, preserving natural Traditional Chinese wording and identical screenshot order.

- [ ] **Step 6: Remove raw trailing metadata**

Ensure all 15 Traditional Chinese documents contain front matter only at the top and no body line containing `title:` or `sidebar_position:`.

- [ ] **Step 7: Run targeted checks**

Run:

```bash
rg -n '../assets/[0-9][0-9]-|client-permissions|admin-permissions' admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current --glob '*.md'
```

Expected: no output.

- [ ] **Step 8: Commit the twelve Traditional Chinese pages**

Stage only the twelve explicit Markdown paths:

```bash
git add admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/getting-started/login.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/getting-started/dashboard.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/users/investors.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/users/customers.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/stocks/stock-management.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/market/market-data.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/reviews/records.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/reviews/audit-log.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/settings/system-settings.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/communications/message-templates.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/communications/feedback.md admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/reference/permissions.md
git commit -m "docs: synchronize Traditional Chinese admin guide"
```

---

### Task 8: Synchronize English Documentation

**Files:**

- Modify: the twelve paths listed under “Translated documents” inside `admin-guide/i18n/en/docusaurus-plugin-content-docs/current/`

**Interfaces:**

- Consumes: the same finalized source structure as Task 7.
- Produces: concise operational English with identical V102 image order and safety boundaries.

- [ ] **Step 1: Update login, dashboard, and investors**

Translate the verified functions and warnings into natural English. Preserve exact V102 filenames and order.

- [ ] **Step 2: Update customers and enterprise onboarding**

Use the exact stage sequence: Company Profile, Finance and Structure, Compliance and Accounts, Tax and Documents, Document Signing. Keep draft, validation, resume, and no-sign/no-submit warnings.

- [ ] **Step 3: Update stocks and message templates**

Translate list/search, creation/allocation, preview, variables, save behavior, and cautions.

- [ ] **Step 4: Update permissions**

Use Investor, Administrator, and Super Administrator in the role matrix. Remove old charts and unverified contact values.

- [ ] **Step 5: Port earlier V102 source improvements**

Synchronize market data, records, audit logs, system settings, and feedback with current source coverage and exact image order.

- [ ] **Step 6: Remove raw trailing metadata**

Ensure all 15 English documents contain front matter only at the top and no body metadata.

- [ ] **Step 7: Run targeted checks**

Run:

```bash
rg -n '../assets/[0-9][0-9]-|client-permissions|admin-permissions' admin-guide/i18n/en/docusaurus-plugin-content-docs/current --glob '*.md'
```

Expected: no output.

- [ ] **Step 8: Commit the twelve English pages**

Stage only the twelve explicit Markdown paths:

```bash
git add admin-guide/i18n/en/docusaurus-plugin-content-docs/current/getting-started/login.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/getting-started/dashboard.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/users/investors.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/users/customers.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/stocks/stock-management.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/market/market-data.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/reviews/records.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/reviews/audit-log.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/settings/system-settings.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/communications/message-templates.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/communications/feedback.md admin-guide/i18n/en/docusaurus-plugin-content-docs/current/reference/permissions.md
git commit -m "docs: synchronize English admin guide"
```

---

### Task 9: Remove Superseded and Duplicate Legacy Assets

**Files:**

- Delete obsolete numbered screenshots from:
  - `admin-guide/docs/assets/`
  - `admin-guide/i18n/en/docusaurus-plugin-content-docs/current/assets/`
  - `admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/assets/`
- Preserve: `virtu-capital-logo.png` and any non-screenshot asset still referenced outside Markdown.

**Interfaces:**

- Consumes: three documentation trees with zero legacy image references.
- Produces: a recoverable Git deletion set containing only superseded or duplicate screenshots.

- [ ] **Step 1: Prove no legacy reference remains**

Run:

```bash
rg -n '../assets/[0-9][0-9]-|client-permissions|admin-permissions' admin-guide/docs admin-guide/i18n/en/docusaurus-plugin-content-docs/current admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current --glob '*.md'
```

Expected: no output. Do not delete any asset if this command finds a reference.

- [ ] **Step 2: Resolve the exact deletion inventory**

List the three asset directories and select only these exact legacy basenames where present:

```text
01-login-page.jpg
02-post-login.jpg
02-post-login.png
03-system-info.jpg
04-investor-list.jpg
05-trade-limits.jpg
06-stockManage-accountPosition.jpg
07-stockManage-addStock.jpg
08-stock-allocateStock.jpg
09-marketData-exchangeRateDefault.jpg
10-marketData-exchangeRateManual.jpg
11-marketData-stockData.jpg
12-record-pendingReview.jpg
13-record-statueChange.jpg
14-record-filterByTime.jpg
15-record-deposit-detail.jpg
16-record-deposit-detail-voucher.jpg
17-audit-log.jpg
17-audit-log-detail.jpg
18-audit-log-filter-operationType.jpg
19-systemSettings- exchangeFees.jpg
20-systemSettings- stockTradeFees.jpg
21-systemSettings-deposit-config.jpg
22-systemSettings- walletAddress-config.jpg
23-crypto-wallet.jpg
24-messageTemplate-list.jpg
25-messageTemplate- preview.jpg
27-client-permissions.png
28-admin-permissions.png
29-customer-personal-list.png
30-customer-personal-detail.png
31-customer-enterprise-list.png
32-customer-enterprise-create.png
33-marketData-exchangeRateMode.png
34-systemSettings-stockTransfer-config.png
35-systemSettings-enterprise-account-config.png
36-record-unified-list.png
37-userFeedback-list.png
client-permissions.png
admin-permissions.png
.DS_Store
```

Do not delete the V102 directory, logo, or any file not in this resolved set.

- [ ] **Step 3: Delete tracked assets recoverably**

Use `git rm` with explicit paths for every tracked file in the resolved set. Delete the untracked duplicate and `.DS_Store` only by their exact paths.

- [ ] **Step 4: Re-run reference and inventory checks**

Run:

```bash
npm run validate:docs
```

Expected: no missing-image or legacy-reference errors.

- [ ] **Step 5: Commit the exact deletion set**

```bash
git commit -m "docs: remove superseded admin screenshots"
```

---

### Task 10: Validate All Content and Build All Locales

**Files:**

- Verify: `admin-guide/docs/`
- Verify: `admin-guide/i18n/en/docusaurus-plugin-content-docs/current/`
- Verify: `admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current/`
- Verify: `admin-guide/docs/assets/V102/`
- Verify: both translated `assets/V102/` directories

**Interfaces:**

- Consumes: final documents and assets.
- Produces: deterministic validation and production-build evidence for all three locales.

- [ ] **Step 1: Run documentation validation**

Run:

```bash
npm run validate:docs
```

Expected:

```text
Validated 15 documents and 32 V102 assets in zh-Hans, zh-Hant, and en.
```

- [ ] **Step 2: Scan for raw metadata and old capture names**

Run:

```bash
rg -n 'Snipaste_2026|Xnip2026|^title:|^sidebar_position:' admin-guide/docs admin-guide/i18n/en/docusaurus-plugin-content-docs/current admin-guide/i18n/zh-Hant/docusaurus-plugin-content-docs/current --glob '*.md'
```

Expected: `title:` and `sidebar_position:` appear only inside the top front matter of each file; no timestamp capture name appears.

- [ ] **Step 3: Run the three-locale production build**

Run:

```bash
npm run build
```

Working directory: `admin-guide`

Expected: Docusaurus completes zh-Hans, zh-Hant, and en output without broken links, missing images, MDX errors, or nonzero exit status.

- [ ] **Step 4: Review the final diff**

Run:

```bash
git diff --check
git status --short
```

Confirm that no unrelated file is staged and no intended document, screenshot, or validation file is omitted.

---

### Task 11: Exercise All 45 Routes in a Real Browser

**Files:**

- Verify only; no planned source modifications.

**Interfaces:**

- Consumes: the completed guide and local Docusaurus server on port `3001`.
- Produces: route-transition, image-loading, raw-metadata, overlay, and console evidence across all 15 pages in all three locales.

- [ ] **Step 1: Start a fresh development server**

Run:

```bash
npm run start
```

Working directory: `admin-guide`

Wait for the server to report `http://localhost:3001/`.

- [ ] **Step 2: Define the route sequence**

Use this exact sequence:

```text
/
/getting-started/admin-role
/getting-started/login
/getting-started/dashboard
/users/investors
/users/customers
/stocks/stock-management
/market/market-data
/reviews/records
/reviews/audit-log
/settings/system-settings
/communications/message-templates
/communications/feedback
/reference/faq
/reference/permissions
```

- [ ] **Step 3: Verify Simplified Chinese transitions**

Open `/`, then navigate to every subsequent page through visible sidebar or document links so Docusaurus loads route chunks client-side.

At each page evaluate:

```js
({
  path: location.pathname,
  failedImages: [...document.images]
    .filter((image) => !image.complete || image.naturalWidth === 0)
    .map((image) => image.src),
  rawMetadata:
    document.body.innerText.includes('sidebar_position:') ||
    document.body.innerText.includes('title: 投资者管理'),
  runtimeOverlay:
    Boolean(document.querySelector('iframe#webpack-dev-server-client-overlay')) ||
    document.body.innerText.includes('Uncaught runtime errors:') ||
    document.body.innerText.includes('ChunkLoadError'),
})
```

Expected: `failedImages` is empty, `rawMetadata` is `false`, and `runtimeOverlay` is `false` on every route. Browser console error count must remain zero.

- [ ] **Step 4: Verify Traditional Chinese transitions**

Repeat the same sequence under `/zh-Hant`, using `/zh-Hant/` for the index and prefixing every route. Expected results are identical.

- [ ] **Step 5: Verify English transitions**

Repeat the same sequence under `/en`, using `/en/` for the index and prefixing every route. Expected results are identical.

- [ ] **Step 6: Repair and repeat any failed transition**

If `ChunkLoadError`, a runtime overlay, or a console error appears:

1. Record the source and destination route.
2. Confirm the server is alive and serves the current generated bundle.
3. Restart the server if the bundle is stale.
4. Fix the actual route, asset, or MDX cause.
5. Repeat the entire affected locale sequence, not only the failed page.

Do not accept a browser reload as the only fix; the client-side transition must pass.

- [ ] **Step 7: Visually inspect the critical pages**

Inspect these pages at normal viewport width:

- Investors: correct current investor images; no stock screenshot.
- Enterprise customers: nine customer/onboarding images in correct order.
- Permissions: Markdown role matrix and verified UI examples; no static chart or fake contact.
- Login, dashboard, stock management, and message templates: no legacy image.

- [ ] **Step 8: Stop the local server cleanly**

Stop only the server process started in Step 1.

---

### Task 12: Final Review and Completion Commit

**Files:**

- Review all files changed by Tasks 1–11.

**Interfaces:**

- Consumes: passing validation, build, and browser-route evidence.
- Produces: one clean final state with no unstaged intended changes.

- [ ] **Step 1: Request an independent review**

Compare the implementation against the approved design and this plan. Check screenshot correctness, five-stage accuracy, locale parity, destructive-action boundaries, and route-test evidence.

- [ ] **Step 2: Apply only verified review fixes**

For every accepted finding, edit the exact affected file, rerun `npm run validate:docs`, rerun `npm run build`, and repeat the affected locale’s full route sequence.

- [ ] **Step 3: Run final verification**

Run:

```bash
npm run validate:docs
npm run build
git diff --check
git status --short
```

Expected: validation and build pass; no whitespace errors; remaining dirty files are either explicitly part of this task or pre-existing unrelated user changes.

- [ ] **Step 4: Commit any final reviewed fixes**

If review produced changes, stage only explicit task paths and commit:

```bash
git commit -m "docs: complete multilingual admin guide refresh"
```

- [ ] **Step 5: Report evidence**

Report:

- 32 canonical V102 screenshots mirrored in three locales
- 15 documents per locale
- Five enterprise stages documented
- Legacy images removed
- Three-locale build result
- 45 route transitions with zero failed images, raw metadata, runtime overlays, `ChunkLoadError`, or browser console errors

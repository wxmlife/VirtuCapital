# Admin Guide V102 Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace outdated administrator-guide screenshots with the 2026-07-28 V102 captures, remove duplicates, and complete the affected Chinese administrator documentation.

**Architecture:** Treat the retained V102 screenshots as a curated asset set with stable descriptive filenames. Update only the seven Markdown pages represented by those captures, preserve unrelated workspace changes, and validate asset references before running the Docusaurus production build.

**Tech Stack:** Markdown, Docusaurus, npm, PNG/JPEG assets, shell validation with `rg`, `find`, and `git diff`.

## Global Constraints

- Treat 2026-07-28 screenshots as the V102 source of truth.
- Delete every 2026-07-27 screenshot and duplicate or incomplete 2026-07-28 screenshot in `admin-guide/docs/assets/V102/`.
- Keep retained screenshots in `admin-guide/docs/assets/V102/` with descriptive English kebab-case names.
- Every retained V102 screenshot must be referenced by Markdown.
- Do not modify unrelated workspace changes, including current edits in `admin-guide/docs/getting-started/login.md` and `admin-guide/docs/getting-started/admin-role.md`.
- Do not invent behavior absent from the screenshots or existing documentation.

---

### Task 1: Curate and Rename V102 Screenshot Assets

**Files:**
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_11-34-20.jpg` → `admin-guide/docs/assets/V102/market-data-market-rate.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_11-37-03.jpg` → `admin-guide/docs/assets/V102/market-data-manual-rate.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_11-52-31.jpg` → `admin-guide/docs/assets/V102/records-pending-list.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_11-53-21.jpg` → `admin-guide/docs/assets/V102/records-inbound-transfer-detail.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_11-56-03.jpg` → `admin-guide/docs/assets/V102/records-outbound-transfer-detail.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_11-57-48.jpg` → `admin-guide/docs/assets/V102/records-stock-transfer-detail.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_11-59-07.jpg` → `admin-guide/docs/assets/V102/audit-log-list.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_14-05-30.jpg` → `admin-guide/docs/assets/V102/system-settings-fees-and-deposits.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_14-06-38.jpg` → `admin-guide/docs/assets/V102/system-settings-transfers-wallet-and-agreements.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_14-07-26.jpg` → `admin-guide/docs/assets/V102/system-settings-enterprise-and-market-content.jpg`
- Rename: `admin-guide/docs/assets/V102/Xnip2026-07-28_14-23-49.jpg` → `admin-guide/docs/assets/V102/customers-enterprise-onboarding.jpg`
- Rename: `admin-guide/docs/assets/V102/Snipaste_2026-07-28_10-12-53.png` → `admin-guide/docs/assets/V102/stocks-create-and-allocate.png`
- Rename: `admin-guide/docs/assets/V102/Snipaste_2026-07-28_10-16-40.png` → `admin-guide/docs/assets/V102/stocks-allocation-complete.png`
- Rename: `admin-guide/docs/assets/V102/Snipaste_2026-07-28_14-10-12.png` → `admin-guide/docs/assets/V102/feedback-list.png`
- Rename: `admin-guide/docs/assets/V102/Snipaste_2026-07-28_14-18-32.png` → `admin-guide/docs/assets/V102/customers-personal-list.png`
- Rename: `admin-guide/docs/assets/V102/Snipaste_2026-07-28_14-19-38.png` → `admin-guide/docs/assets/V102/customers-personal-detail.png`
- Rename: `admin-guide/docs/assets/V102/Snipaste_2026-07-28_14-20-05.png` → `admin-guide/docs/assets/V102/customers-enterprise-list.png`
- Rename: `admin-guide/docs/assets/V102/Snipaste_2026-07-28_14-20-24.png` → `admin-guide/docs/assets/V102/customers-enterprise-actions.png`
- Delete: all remaining files in `admin-guide/docs/assets/V102/` whose names begin `Snipaste_2026-07-27_`
- Delete: `admin-guide/docs/assets/V102/Xnip2026-07-28_12-00-22.jpg`
- Delete: `admin-guide/docs/assets/V102/Snipaste_2026-07-28_14-20-15.png`
- Delete: `admin-guide/docs/assets/V102/Snipaste_2026-07-28_14-21-29.png`
- Delete: `admin-guide/docs/assets/V102/.DS_Store`

**Interfaces:**
- Consumes: the 2026-07-28 visual inventory approved in the design specification.
- Produces: exactly 18 retained, descriptively named V102 image assets used by Tasks 2–8.

- [ ] **Step 1: Rename retained screenshots with explicit source and destination paths**

Use `mv` for each mapping listed in this task. Do not use globs for destination names.

- [ ] **Step 2: Delete only the approved duplicate and superseded screenshot paths**

Remove the 2026-07-27 screenshots, the three listed duplicate/incomplete 2026-07-28 screenshots, and `.DS_Store`.

- [ ] **Step 3: Verify the curated inventory**

Run:

```bash
find admin-guide/docs/assets/V102 -maxdepth 1 -type f -print | sort
```

Expected: exactly the 18 descriptive image filenames listed as task outputs and no timestamp-based filename.

---

### Task 2: Refresh Market Data Documentation

**Files:**
- Modify: `admin-guide/docs/market/market-data.md`
- Reference: `admin-guide/docs/assets/V102/market-data-market-rate.jpg`
- Reference: `admin-guide/docs/assets/V102/market-data-manual-rate.jpg`

**Interfaces:**
- Consumes: the two curated market-data screenshots from Task 1.
- Produces: a single valid Docusaurus Markdown page covering rate mode, synchronization, displayed pairs, and regional market status.

- [ ] **Step 1: Replace obsolete screenshots and duplicate front matter**

Use the two V102 images and remove the repeated trailing front matter.

- [ ] **Step 2: Complete rate-mode and synchronization instructions**

Document “同步全部”, “刷新”, optional forced resynchronization, “同步市场汇率”, market/manual mode selection, review submission, the six displayed rate pairs, and the source/date/last-sync fields.

- [ ] **Step 3: Complete regional market-card instructions**

Document exchange, stock, ETF, index, last-sync, duration, trigger source, next schedule, schedule identifier, supported/unsupported synchronization, and per-market sync actions.

- [ ] **Step 4: Validate local image references**

Run:

```bash
rg -n "V102/(market-data-market-rate|market-data-manual-rate)" admin-guide/docs/market/market-data.md
```

Expected: both references are present.

---

### Task 3: Refresh Unified Records Documentation

**Files:**
- Modify: `admin-guide/docs/reviews/records.md`
- Reference: `admin-guide/docs/assets/V102/records-pending-list.jpg`
- Reference: `admin-guide/docs/assets/V102/records-inbound-transfer-detail.jpg`
- Reference: `admin-guide/docs/assets/V102/records-outbound-transfer-detail.jpg`
- Reference: `admin-guide/docs/assets/V102/records-stock-transfer-detail.jpg`

**Interfaces:**
- Consumes: the four records screenshots from Task 1.
- Produces: complete list, filtering, detail, attachment, lifecycle, transaction, audit, and approval instructions.

- [ ] **Step 1: Replace obsolete images and provisional text**

Remove old image references, repeated trailing front matter, “【暂定】” labels, and speculative text not supported by V102.

- [ ] **Step 2: Document unified list and filters**

Cover record type, investor search, review status, stock search, apply/reset, refresh, list columns, pending item, review status, business status, pagination, and detail access.

- [ ] **Step 3: Document inbound transfer review**

Cover summary cards, lifecycle, transferred stock, application PDF, signed image, broker statement, operation log, review comment, approve, and reject.

- [ ] **Step 4: Document outbound position review**

Cover receiving broker and account details, frozen holdings, fee calculation, attachments, lifecycle, related transaction, audit log, approval, and rejection.

- [ ] **Step 5: Document stock-transfer review**

Cover transfer parties, stock, quantity, price, amount, currency, BSN file, frozen holdings, related transactions, audit log, approval, and rejection.

- [ ] **Step 6: Validate the four V102 references**

Run:

```bash
rg -n "V102/records-" admin-guide/docs/reviews/records.md
```

Expected: four distinct image references.

---

### Task 4: Refresh Audit Log Documentation

**Files:**
- Modify: `admin-guide/docs/reviews/audit-log.md`
- Reference: `admin-guide/docs/assets/V102/audit-log-list.jpg`

**Interfaces:**
- Consumes: the selected complete audit-log scrolling capture.
- Produces: filter, table, pagination, and detail-access documentation.

- [ ] **Step 1: Replace old images and duplicate front matter**

- [ ] **Step 2: Document all visible filters and list fields**

Include keyword, operation type, result, resource type, resource ID, administrator ID, target-user ID, start/end time, source IP, summary, and refresh.

- [ ] **Step 3: Document detail access and troubleshooting use**

- [ ] **Step 4: Validate the V102 reference**

Run:

```bash
rg -n "V102/audit-log-list.jpg" admin-guide/docs/reviews/audit-log.md
```

Expected: one reference.

---

### Task 5: Refresh System Settings Documentation

**Files:**
- Modify: `admin-guide/docs/settings/system-settings.md`
- Reference: `admin-guide/docs/assets/V102/system-settings-fees-and-deposits.jpg`
- Reference: `admin-guide/docs/assets/V102/system-settings-transfers-wallet-and-agreements.jpg`
- Reference: `admin-guide/docs/assets/V102/system-settings-enterprise-and-market-content.jpg`

**Interfaces:**
- Consumes: the three system-settings scrolling captures.
- Produces: a non-duplicated settings guide matching the V102 section order.

- [ ] **Step 1: Replace obsolete and repeated screenshots**

Remove repeated old references and trailing duplicate front matter.

- [ ] **Step 2: Complete fees, deposits, withdrawals, transfers, and wallet sections**

Document exchange fees, buy/sell fees, international/local/USDT deposit details, international/local/USDT withdrawal fees, US/HK stock transfer fees, and TRC-20/ERC-20 addresses.

- [ ] **Step 3: Complete agreements and enterprise display sections**

Document agreement upload, identifiers, languages, required flag, ordering, review, enterprise copy in three languages, support labels, deep link, email, phone, and working hours.

- [ ] **Step 4: Complete broker and recommended-index sections**

Document broker creation, ordering, editing, deletion, the configured-count limit shown by the UI, market tabs, adding/removing indices, ordering, and review submission.

- [ ] **Step 5: Explain review boundaries and safety cautions**

State that sections showing “提交审核” require super-administrator approval; add precise cautions for percentages, bank information, and wallet addresses.

- [ ] **Step 6: Validate the three V102 references**

Run:

```bash
rg -n "V102/system-settings-" admin-guide/docs/settings/system-settings.md
```

Expected: three distinct image references.

---

### Task 6: Refresh Customer Management Documentation

**Files:**
- Modify: `admin-guide/docs/users/customers.md`
- Reference: `admin-guide/docs/assets/V102/customers-personal-list.png`
- Reference: `admin-guide/docs/assets/V102/customers-personal-detail.png`
- Reference: `admin-guide/docs/assets/V102/customers-enterprise-list.png`
- Reference: `admin-guide/docs/assets/V102/customers-enterprise-actions.png`
- Reference: `admin-guide/docs/assets/V102/customers-enterprise-onboarding.jpg`

**Interfaces:**
- Consumes: the five customer-management screenshots from Task 1.
- Produces: personal list/detail and enterprise list/action/onboarding documentation.

- [ ] **Step 1: Replace old customer screenshots**

- [ ] **Step 2: Complete personal-user list and detail instructions**

Cover search, state filter, columns, onboarding status, Sumsub status, preview, all visible detail navigation sections, the “显示全部字段” switch, and sensitive-data handling.

- [ ] **Step 3: Complete enterprise list and row actions**

Cover search, status filtering, list fields, drafts, view detail, continue onboarding, and recoverable deletion caution.

- [ ] **Step 4: Document the five enterprise-onboarding stages**

Describe main data, directors and shareholders, contracts and accounts, tax and documents, and document review; include save draft, save and next step, address-source options, contact details, and optional fax/additional information.

- [ ] **Step 5: Validate the five V102 references**

Run:

```bash
rg -n "V102/customers-" admin-guide/docs/users/customers.md
```

Expected: five distinct image references.

---

### Task 7: Refresh Stock Management Documentation

**Files:**
- Modify: `admin-guide/docs/stocks/stock-management.md`
- Reference: `admin-guide/docs/assets/V102/stocks-create-and-allocate.png`
- Reference: `admin-guide/docs/assets/V102/stocks-allocation-complete.png`

**Interfaces:**
- Consumes: the two focused stock-creation screenshots.
- Produces: current stock creation, allocation, validation, and summary instructions while retaining valid overview text.

- [ ] **Step 1: Replace obsolete add/allocation screenshots**

- [ ] **Step 2: Complete stock search and allocation workflow**

Cover region-code search, total quantity, initial cost, adding investors, per-investor quantity and cost, auto-calculated percentage, allocation constraints, available holdings, summary, and create action.

- [ ] **Step 3: Explain validation and completion states**

Document duplicate-investor prohibition, total-allocation ceiling, remaining quantity, and fully allocated state.

- [ ] **Step 4: Validate the two V102 references**

Run:

```bash
rg -n "V102/stocks-" admin-guide/docs/stocks/stock-management.md
```

Expected: two distinct image references.

---

### Task 8: Refresh User Feedback Documentation

**Files:**
- Modify: `admin-guide/docs/communications/feedback.md`
- Reference: `admin-guide/docs/assets/V102/feedback-list.png`

**Interfaces:**
- Consumes: the focused feedback-list screenshot.
- Produces: summary, filter, list, pagination, and detail workflow instructions.

- [ ] **Step 1: Replace the obsolete feedback screenshot**

- [ ] **Step 2: Complete visible summary and filtering behavior**

Cover matched count, current-page item count, current-page image count, keyword search, feedback type, search, and refresh.

- [ ] **Step 3: Complete list, pagination, and detail behavior**

Cover user, type, content, image count, submitted time, pagination, full-text details, and attached images.

- [ ] **Step 4: Validate the V102 reference**

Run:

```bash
rg -n "V102/feedback-list.png" admin-guide/docs/communications/feedback.md
```

Expected: one reference.

---

### Task 9: Validate Asset Integrity and Build the Guide

**Files:**
- Verify: `admin-guide/docs/**/*.md`
- Verify: `admin-guide/docs/assets/V102/*`
- Verify: `admin-guide/package.json`

**Interfaces:**
- Consumes: all documentation and asset changes from Tasks 1–8.
- Produces: evidence that references resolve, no timestamp assets remain, and Docusaurus builds.

- [ ] **Step 1: Check for deleted or timestamp-based references**

Run:

```bash
rg -n "Snipaste_2026|Xnip2026|assets/(09-marketData|10-marketData|11-marketData|12-record|13-record|14-record|15-record|16-record|17-audit|18-audit|19-systemSettings|20-systemSettings|21-systemSettings|22-systemSettings|23-crypto|29-customer|30-customer|31-customer|32-customer|34-systemSettings|35-systemSettings|37-userFeedback)" admin-guide/docs --glob '*.md'
```

Expected: no output from the seven refreshed pages.

- [ ] **Step 2: Check that every retained V102 asset is referenced**

For each file returned by `find admin-guide/docs/assets/V102 -type f`, search its basename under `admin-guide/docs`. Expected: at least one match per file.

- [ ] **Step 3: Check that every Markdown image target exists**

Resolve each `../assets/...` path relative to its Markdown page and fail if any target is missing.

- [ ] **Step 4: Run Markdown and diff checks**

Run:

```bash
git diff --check
```

Expected: no whitespace errors introduced by this work.

- [ ] **Step 5: Build the administrator guide**

Run:

```bash
npm run build
```

Working directory: `admin-guide`

Expected: exit code 0 with a successful Docusaurus production build.

- [ ] **Step 6: Review the final scoped diff**

Run:

```bash
git status --short
git diff -- admin-guide/docs/market/market-data.md admin-guide/docs/reviews/records.md admin-guide/docs/reviews/audit-log.md admin-guide/docs/settings/system-settings.md admin-guide/docs/users/customers.md admin-guide/docs/stocks/stock-management.md admin-guide/docs/communications/feedback.md admin-guide/docs/assets/V102
```

Expected: only the approved screenshot and documentation refresh appears in the scoped diff; unrelated pre-existing workspace changes remain untouched.


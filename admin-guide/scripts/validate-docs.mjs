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

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

const sidebarLabels = [
  ...readFileSync(resolve(siteDir, 'sidebars.js'), 'utf8').matchAll(
    /\blabel:\s*['"]([^'"]+)['"]/g,
  ),
].map((match) => match[1]);
const expectedLocalizedSidebarKeys = sidebarLabels
  .map((label) => `sidebar.adminSidebar.category.${label}`)
  .sort();

const expectedV102 = readdirSync(resolve(siteDir, 'docs/assets/V102'))
  .filter((name) => statSync(resolve(siteDir, 'docs/assets/V102', name)).isFile())
  .sort();

const expectedPlaceholderLabel = new Map([
  ['zh-Hans', '截图待补'],
  ['zh-Hant', '截圖待補'],
  ['en', 'Screenshot pending'],
]);

const expectedEnterpriseOnboarding = new Map([
  [
    'zh-Hans',
    {
      stages: [
        '### 第 1 步：主体资料',
        '### 第 2 步：财务与结构',
        '### 第 3 步：合规与账户',
        '### 第 4 步：税务与文件',
        '### 第 5 步：文件签署',
      ],
      stagePattern: /^### 第 \d+ 步：.+$/gm,
      boundaryHeading: '### 草稿与提交边界',
    },
  ],
  [
    'zh-Hant',
    {
      stages: [
        '### 第 1 步：主體資料',
        '### 第 2 步：財務與結構',
        '### 第 3 步：合規與帳戶',
        '### 第 4 步：稅務與文件',
        '### 第 5 步：文件簽署',
      ],
      stagePattern: /^### 第 \d+ 步：.+$/gm,
      boundaryHeading: '### 草稿與提交邊界',
    },
  ],
  [
    'en',
    {
      stages: [
        '### Step 1: Company Profile',
        '### Step 2: Finance and Structure',
        '### Step 3: Compliance and Accounts',
        '### Step 4: Tax and Documents',
        '### Step 5: Document Signing',
      ],
      stagePattern: /^### Step \d+: .+$/gm,
      boundaryHeading: '### Draft and Submission Boundaries',
    },
  ],
]);

const enterpriseBoundaryMarker =
  '<!-- enterprise-onboarding-submission-boundary: authorized-review-required -->';

const errors = [];
const sequences = new Map();
const slotSequences = new Map();
const headingSequences = new Map();
const admonitionSequences = new Map();
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

for (const locale of ['zh-Hant', 'en']) {
  const catalogPath = resolve(
    siteDir,
    `i18n/${locale}/docusaurus-plugin-content-docs/current.json`,
  );
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
  const localizedSidebarKeys = Object.keys(catalog)
    .filter((key) => key.startsWith('sidebar.adminSidebar.category.'))
    .sort();
  if (!sameList(localizedSidebarKeys, expectedLocalizedSidebarKeys)) {
    errors.push(`${locale}: localized sidebar keys differ from sidebars.js`);
  }
}

for (const {locale, docsDir} of roots) {
  const markdownFiles = walkMarkdown(docsDir);
  const relativeDocs = markdownFiles.map((path) => relative(docsDir, path));
  if (!sameList(relativeDocs, expectedDocs)) {
    errors.push(`${locale}: document inventory differs from the 15 sidebar pages`);
  }

  const referencedV102 = new Set();
  const localeSequences = new Map();
  const localeSlotSequences = new Map();
  const localeHeadingSequences = new Map();
  const localeAdmonitionSequences = new Map();

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
    const body = bodyLines.join('\n');
    if (/^\s*(?:title|sidebar_position)\s*:/m.test(body)) {
      errors.push(`${locale}/${rel}: raw metadata appears in document body`);
    }
    localeHeadingSequences.set(
      rel,
      [...body.matchAll(/^(#{1,6})\s+\S/gm)].map((match) => match[1].length),
    );
    localeAdmonitionSequences.set(
      rel,
      [...body.matchAll(/^:::(\w+)/gm)].map((match) => match[1]),
    );

    const slots = [];
    for (const match of text.matchAll(
      /<!--\s*screenshot-slot:\s*([a-z0-9-]+);\s*status:\s*(placeholder|image)\s*-->/g,
    )) {
      const [marker, id, status] = match;
      slots.push(id);
      const following = text.slice(match.index + marker.length);
      const nextContentLine = following
        .split(/\r?\n/)
        .find((line) => line.trim().length > 0);
      const placeholderLabel = expectedPlaceholderLabel.get(locale);
      if (
        status !== 'placeholder' ||
        !nextContentLine?.trimStart().startsWith('>') ||
        !nextContentLine.includes(placeholderLabel)
      ) {
        errors.push(`${locale}/${rel}: screenshot slot ${id} has no visible placeholder`);
      }
    }
    if (new Set(slots).size !== slots.length) {
      errors.push(`${locale}/${rel}: duplicate screenshot slot`);
    }
    localeSlotSequences.set(rel, slots);

    if (rel === 'users/customers.md') {
      const expectedWorkflow = expectedEnterpriseOnboarding.get(locale);
      const stageHeadings = [...body.matchAll(expectedWorkflow.stagePattern)].map(
        (match) => match[0],
      );
      if (!sameList(stageHeadings, expectedWorkflow.stages)) {
        errors.push(
          `${locale}/${rel}: enterprise onboarding stages are missing or out of order`,
        );
      }

      const markerCount = body.split(enterpriseBoundaryMarker).length - 1;
      const markerIndex = body.indexOf(enterpriseBoundaryMarker);
      const nextBoundaryLine =
        markerIndex >= 0
          ? body
              .slice(markerIndex + enterpriseBoundaryMarker.length)
              .split(/\r?\n/)
              .find((line) => line.trim().length > 0)
              ?.trim()
          : undefined;
      if (
        markerCount !== 1 ||
        nextBoundaryLine !== expectedWorkflow.boundaryHeading
      ) {
        errors.push(
          `${locale}/${rel}: enterprise onboarding submission boundary marker is missing or misplaced`,
        );
      }
      const finalStageSlotIndex = body.indexOf(
        '<!-- screenshot-slot: customers-enterprise-onboarding-step-5-document-signing; status: placeholder -->',
      );
      if (
        markerIndex >= 0 &&
        finalStageSlotIndex >= 0 &&
        markerIndex < finalStageSlotIndex
      ) {
        errors.push(
          `${locale}/${rel}: enterprise onboarding submission boundary must follow Step 5`,
        );
      }
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
  slotSequences.set(locale, localeSlotSequences);
  headingSequences.set(locale, localeHeadingSequences);
  admonitionSequences.set(locale, localeAdmonitionSequences);

  const assetDir = resolve(docsDir, 'assets/V102');
  const assetNames = listFiles(assetDir);
  if (!sameList(assetNames, expectedV102)) {
    errors.push(
      `${locale}: V102 inventory differs from the ${expectedV102.length} source files`,
    );
  }

  const legacyAssetNames = listFiles(resolve(docsDir, 'assets')).filter(
    (name) =>
      name === '.DS_Store' ||
      /^(?:\d{2}-.+|(?:client|admin)-permissions\.(?:png|jpe?g))$/i.test(name),
  );
  if (legacyAssetNames.length) {
    errors.push(
      `${locale}: legacy or duplicate assets remain: ${legacyAssetNames.join(', ')}`,
    );
  }

  for (const name of expectedV102) {
    const path = resolve(assetDir, name);
    if (!existsSync(path)) continue;
    const hash = sha256(path);
    if (locale === 'zh-Hans') {
      sourceHashes.set(name, hash);
    } else if (sourceHashes.get(name) !== hash) {
      errors.push(`${locale}: V102 image differs from source ${name}`);
    }
  }
}

const sourceSequences = sequences.get('zh-Hans');
const sourceSlotSequences = slotSequences.get('zh-Hans');
const sourceHeadingSequences = headingSequences.get('zh-Hans');
const sourceAdmonitionSequences = admonitionSequences.get('zh-Hans');
for (const locale of ['zh-Hant', 'en']) {
  const localeSequences = sequences.get(locale);
  const localeSlotSequences = slotSequences.get(locale);
  const localeHeadingSequences = headingSequences.get(locale);
  const localeAdmonitionSequences = admonitionSequences.get(locale);
  for (const rel of expectedDocs) {
    const source = sourceSequences?.get(rel) ?? [];
    const translated = localeSequences?.get(rel) ?? [];
    if (!sameList(source, translated)) {
      errors.push(`${locale}/${rel}: screenshot order differs from zh-Hans`);
    }
    const sourceSlots = sourceSlotSequences?.get(rel) ?? [];
    const translatedSlots = localeSlotSequences?.get(rel) ?? [];
    if (!sameList(sourceSlots, translatedSlots)) {
      errors.push(`${locale}/${rel}: screenshot slots differ from zh-Hans`);
    }
    const sourceHeadings = sourceHeadingSequences?.get(rel) ?? [];
    const translatedHeadings = localeHeadingSequences?.get(rel) ?? [];
    if (!sameList(sourceHeadings, translatedHeadings)) {
      errors.push(`${locale}/${rel}: heading structure differs from zh-Hans`);
    }
    const sourceAdmonitions = sourceAdmonitionSequences?.get(rel) ?? [];
    const translatedAdmonitions = localeAdmonitionSequences?.get(rel) ?? [];
    if (!sameList(sourceAdmonitions, translatedAdmonitions)) {
      errors.push(`${locale}/${rel}: admonition structure differs from zh-Hans`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(
  `Validated 15 documents, ${expectedV102.length} V102 assets, and screenshot placeholders in zh-Hans, zh-Hant, and en.`,
);

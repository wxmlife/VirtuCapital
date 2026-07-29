import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, resolve} from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const adminGuideDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function createFixture() {
  const fixtureDir = mkdtempSync(resolve(tmpdir(), 'admin-guide-validation-'));
  mkdirSync(resolve(fixtureDir, 'scripts'), {recursive: true});
  cpSync(
    resolve(adminGuideDir, 'scripts/validate-docs.mjs'),
    resolve(fixtureDir, 'scripts/validate-docs.mjs'),
  );
  cpSync(resolve(adminGuideDir, 'docs'), resolve(fixtureDir, 'docs'), {
    recursive: true,
  });
  cpSync(resolve(adminGuideDir, 'i18n'), resolve(fixtureDir, 'i18n'), {
    recursive: true,
  });
  cpSync(
    resolve(adminGuideDir, 'sidebars.js'),
    resolve(fixtureDir, 'sidebars.js'),
  );
  return fixtureDir;
}

function replaceRequired(path, before, after) {
  const text = readFileSync(path, 'utf8');
  assert.ok(text.includes(before), `Fixture text not found in ${path}`);
  writeFileSync(path, text.replace(before, after));
}

function runValidator(fixtureDir) {
  return spawnSync(
    process.execPath,
    [resolve(fixtureDir, 'scripts/validate-docs.mjs')],
    {cwd: fixtureDir, encoding: 'utf8'},
  );
}

function withFixture(run) {
  const fixtureDir = createFixture();
  try {
    run(fixtureDir);
  } finally {
    rmSync(fixtureDir, {recursive: true, force: true});
  }
}

test('rejects a screenshot slot without an immediately following visible placeholder', () => {
  withFixture((fixtureDir) => {
    const path = resolve(fixtureDir, 'docs/users/customers.md');
    replaceRequired(
      path,
      '<!-- screenshot-slot: customers-enterprise-onboarding-step-5-document-signing; status: placeholder -->\n> 📷 **截图待补：第 5 步「文件签署」（签署与提交前）。**',
      '<!-- screenshot-slot: customers-enterprise-onboarding-step-5-document-signing; status: placeholder -->',
    );

    const result = runValidator(fixtureDir);
    assert.notEqual(
      result.status,
      0,
      `Validator unexpectedly passed:\n${result.stdout}${result.stderr}`,
    );
    assert.match(result.stderr, /has no visible placeholder/);
  });
});

test('rejects an identically missing enterprise-onboarding stage in every locale', () => {
  withFixture((fixtureDir) => {
    const headings = [
      ['docs/users/customers.md', '### 第 5 步：文件签署'],
      [
        'i18n/zh-Hant/docusaurus-plugin-content-docs/current/users/customers.md',
        '### 第 5 步：文件簽署',
      ],
      [
        'i18n/en/docusaurus-plugin-content-docs/current/users/customers.md',
        '### Step 5: Document Signing',
      ],
    ];
    for (const [relativePath, heading] of headings) {
      replaceRequired(
        resolve(fixtureDir, relativePath),
        `${heading}\n`,
        '',
      );
    }

    const result = runValidator(fixtureDir);
    assert.notEqual(
      result.status,
      0,
      `Validator unexpectedly passed:\n${result.stdout}${result.stderr}`,
    );
    assert.match(result.stderr, /enterprise onboarding stages/);
  });
});

test('rejects a submission-boundary block placed before enterprise-onboarding Step 5', () => {
  withFixture((fixtureDir) => {
    const path = resolve(fixtureDir, 'docs/users/customers.md');
    const boundaryBlock =
      '<!-- enterprise-onboarding-submission-boundary: authorized-review-required -->\n### 草稿与提交边界';
    const text = readFileSync(path, 'utf8');
    assert.ok(text.includes(boundaryBlock));
    assert.ok(text.includes('### 第 5 步：文件签署'));
    writeFileSync(
      path,
      text
        .replace(`${boundaryBlock}\n`, '')
        .replace(
          '### 第 5 步：文件签署',
          `${boundaryBlock}\n\n### 第 5 步：文件签署`,
        ),
    );

    const result = runValidator(fixtureDir);
    assert.notEqual(
      result.status,
      0,
      `Validator unexpectedly passed:\n${result.stdout}${result.stderr}`,
    );
    assert.match(
      result.stderr,
      /enterprise onboarding submission boundary must follow Step 5/,
    );
  });
});

test('allows a legitimate Markdown horizontal rule in the document body', () => {
  withFixture((fixtureDir) => {
    const path = resolve(fixtureDir, 'docs/index.md');
    writeFileSync(path, `${readFileSync(path, 'utf8').trimEnd()}\n\n---\n`);

    const result = runValidator(fixtureDir);
    assert.equal(
      result.status,
      0,
      `Validator rejected a legal horizontal rule:\n${result.stdout}${result.stderr}`,
    );
  });
});

test('rejects a localized sidebar catalog that still uses a renamed source label', () => {
  withFixture((fixtureDir) => {
    const path = resolve(
      fixtureDir,
      'i18n/en/docusaurus-plugin-content-docs/current.json',
    );
    replaceRequired(
      path,
      'sidebar.adminSidebar.category.投资者与客户管理',
      'sidebar.adminSidebar.category.用户与客户管理',
    );

    const result = runValidator(fixtureDir);
    assert.notEqual(
      result.status,
      0,
      `Validator unexpectedly accepted a stale sidebar key:\n${result.stdout}${result.stderr}`,
    );
    assert.match(result.stderr, /localized sidebar keys differ from sidebars\.js/);
  });
});

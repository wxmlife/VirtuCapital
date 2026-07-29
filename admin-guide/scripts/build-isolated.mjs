import {cpSync, mkdirSync, mkdtempSync, rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, join, relative, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceDir = resolve(siteDir, '..');
const temporaryBuildRoot = resolve(workspaceDir, '.docusaurus-build');
mkdirSync(temporaryBuildRoot, {recursive: true});

const isolatedSiteDir = mkdtempSync(join(temporaryBuildRoot, 'admin-guide-'));
const outputDir = resolve(siteDir, 'build');
const docusaurusCli = resolve(workspaceDir, 'node_modules/.bin/docusaurus');
const excludedDirectories = new Set([
  '.docusaurus',
  '.docusaurus-build',
  '.docusaurus-preview',
  'build',
  'node_modules',
]);

try {
  cpSync(siteDir, isolatedSiteDir, {
    recursive: true,
    filter(source) {
      const pathFromSiteRoot = relative(siteDir, source);

      if (!pathFromSiteRoot) {
        return true;
      }

      return !pathFromSiteRoot
        .split(sep)
        .some((segment) => excludedDirectories.has(segment));
    },
  });

  const result = spawnSync(
    docusaurusCli,
    ['build', isolatedSiteDir, '--out-dir', outputDir],
    {
      cwd: workspaceDir,
      env: {...process.env, BROWSER: 'none'},
      stdio: 'inherit',
    },
  );

  if (result.error) {
    throw result.error;
  }

  process.exitCode = result.status ?? 1;
} finally {
  rmSync(isolatedSiteDir, {force: true, recursive: true});
}

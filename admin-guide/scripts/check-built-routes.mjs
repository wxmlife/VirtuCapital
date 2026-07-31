import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = resolve(siteDir, 'docs');
const buildDir = resolve(process.argv[2] ?? resolve(siteDir, 'build'));
const defaultLocale = 'zh-Hans';
const translatedLocales = readdirSync(resolve(siteDir, 'i18n'), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const locales = [defaultLocale, ...translatedLocales];

function walkMarkdown(directory) {
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

function routeFromDocument(path) {
  const documentPath = relative(docsDir, path).replace(/\.md$/, '');
  return documentPath === 'index' ? '' : documentPath;
}

const documentRoutes = walkMarkdown(docsDir).map(routeFromDocument);
const expectedRoutes = locales.flatMap((locale) => {
  const localePrefix = locale === defaultLocale ? '' : locale;
  return documentRoutes.map((route) =>
    [localePrefix, route, 'index.html'].filter(Boolean).join('/'),
  );
});
const missingRoutes = expectedRoutes.filter(
  (route) => !existsSync(resolve(buildDir, route)),
);
const serverRenderedPasscodeRoutes = expectedRoutes
  .filter((route) => existsSync(resolve(buildDir, route)))
  .filter((route) =>
    /class=["'][^"']*\badmin-auth-(?:page|card)\b/.test(
      readFileSync(resolve(buildDir, route), 'utf8'),
    ),
  );

if (missingRoutes.length > 0) {
  console.error(
    `Missing administrator-guide build routes:\n${missingRoutes
      .map((route) => `- ${route}`)
      .join('\n')}`,
  );
  process.exitCode = 1;
}

if (serverRenderedPasscodeRoutes.length > 0) {
  console.error(
    `Administrator-guide build contains a server-rendered passcode form:\n${serverRenderedPasscodeRoutes
      .map((route) => `- ${route}`)
      .join('\n')}`,
  );
  process.exitCode = 1;
}

if (
  missingRoutes.length === 0 &&
  serverRenderedPasscodeRoutes.length === 0
) {
  console.log(
    `Administrator-guide build verified: ${expectedRoutes.length} routes across ${locales.join(', ')}.`,
  );
}

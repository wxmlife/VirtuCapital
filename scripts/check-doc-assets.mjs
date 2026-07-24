import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {dirname, join, relative, resolve, sep} from 'node:path';

const siteRoot = process.cwd();
const docsRoot = join(siteRoot, 'docs');
const localeRoots = [
  join(siteRoot, 'i18n', 'en', 'docusaurus-plugin-content-docs', 'current'),
  join(siteRoot, 'i18n', 'zh-Hant', 'docusaurus-plugin-content-docs', 'current'),
];
const markdownRoots = [docsRoot, ...localeRoots];
const errors = [];
let checkedReferences = 0;

function walk(directory) {
  return readdirSync(directory)
    .flatMap((name) => {
      const path = join(directory, name);
      if (statSync(path).isDirectory()) {
        if (path.includes(`${sep}superpowers${sep}`)) return [];
        return walk(path);
      }
      return path.endsWith('.md') || path.endsWith('.mdx') ? [path] : [];
    });
}

function canonicalDirectory(markdownPath) {
  const localeRoot = localeRoots.find((root) => markdownPath.startsWith(`${root}${sep}`));
  if (!localeRoot) return dirname(markdownPath);
  return dirname(join(docsRoot, relative(localeRoot, markdownPath)));
}

function checkReference(markdownPath, reference) {
  if (
    reference.startsWith('http://') ||
    reference.startsWith('https://') ||
    reference.startsWith('data:') ||
    reference.startsWith('/')
  ) {
    return;
  }

  const cleanReference = reference.split('#')[0].split('?')[0];
  if (!cleanReference) return;

  checkedReferences += 1;
  if (/20\d{6}-\d{6}|Screenshot_\d+|VirtuCapital_\d{4}/i.test(cleanReference)) {
    errors.push(`${relative(siteRoot, markdownPath)}: legacy timestamp image reference ${reference}`);
  }

  const target = resolve(canonicalDirectory(markdownPath), cleanReference);
  if (!existsSync(target)) {
    errors.push(`${relative(siteRoot, markdownPath)}: missing image ${reference}`);
  }
}

for (const root of markdownRoots) {
  for (const markdownPath of walk(root)) {
    const source = readFileSync(markdownPath, 'utf8');
    const references = [
      ...source.matchAll(/!\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g),
      ...source.matchAll(/require\(\s*['"]([^'"]+)['"]\s*\)/g),
    ];
    for (const match of references) checkReference(markdownPath, match[1]);
  }
}

if (errors.length > 0) {
  console.error(`Found ${errors.length} documentation asset error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Checked ${checkedReferences} local documentation image references: all resolved.`);


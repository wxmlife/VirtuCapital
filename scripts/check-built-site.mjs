import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';

const siteRoot = process.cwd();
const buildRoot = join(siteRoot, 'build');
const basePath = '/VirtuCapital/';
const errors = [];
let checkedPages = 0;
let checkedTargets = 0;

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function targetExists(urlPath) {
  const withoutQuery = urlPath.split('#')[0].split('?')[0];
  if (!withoutQuery.startsWith(basePath)) return true;
  const relativeTarget = decodeURIComponent(withoutQuery.slice(basePath.length));
  const fileTarget = join(buildRoot, relativeTarget);
  return (
    existsSync(fileTarget) ||
    existsSync(`${fileTarget}.html`) ||
    existsSync(join(fileTarget, 'index.html'))
  );
}

for (const htmlPath of walk(buildRoot).filter((path) => path.endsWith('.html'))) {
  checkedPages += 1;
  const html = readFileSync(htmlPath, 'utf8');
  const page = relative(buildRoot, htmlPath);
  if (
    !page.endsWith('404.html') &&
    (html.includes('<title data-rh="true">Page Not Found') ||
      html.includes('<h1 class="hero__title">Page Not Found</h1>'))
  ) {
    errors.push(`${page}: rendered as Page Not Found`);
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (
      target.startsWith('http://') ||
      target.startsWith('https://') ||
      target.startsWith('mailto:') ||
      target.startsWith('tel:') ||
      target.startsWith('data:') ||
      target.startsWith('#')
    ) {
      continue;
    }
    checkedTargets += 1;
    if (!targetExists(target)) {
      errors.push(`${page}: missing generated target ${target}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Found ${errors.length} built-site error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Checked ${checkedPages} generated pages and ${checkedTargets} internal links/assets: all resolved.`,
);


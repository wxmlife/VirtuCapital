import {existsSync} from 'node:fs';
import {resolve} from 'node:path';

const buildRoot = resolve(process.argv[2] ?? 'build');
const requiredFiles = [
  'index.html',
  'app-guide/index.html',
  'en/app-guide/index.html',
  'zh-Hant/app-guide/index.html',
  'admin/index.html',
  'admin/getting-started/login/index.html',
  'admin/en/index.html',
  'admin/zh-Hant/index.html',
  '.nojekyll',
];
const missing = requiredFiles.filter(
  (path) => !existsSync(resolve(buildRoot, path)),
);

if (missing.length > 0) {
  console.error('Publish layout is incomplete:');
  for (const path of missing) {
    console.error(`- ${path}`);
  }
  process.exit(1);
}

console.log(
  `Verified ${requiredFiles.length} required publish files in ${buildRoot}.`,
);

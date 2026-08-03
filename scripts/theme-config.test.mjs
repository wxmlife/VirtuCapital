import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
import test from 'node:test';
import {pathToFileURL} from 'node:url';

test('APP guide is permanently configured for light mode', () => {
  const configUrl = pathToFileURL(resolve('docusaurus.config.js')).href;
  const result = spawnSync(
    process.execPath,
    [
      '--no-warnings',
      '--input-type=module',
      '--eval',
      `import config from ${JSON.stringify(configUrl)}; process.stdout.write(JSON.stringify(config.themeConfig.colorMode));`,
    ],
    {encoding: 'utf8'},
  );

  assert.equal(
    result.status,
    0,
    `Unable to load Docusaurus config:\n${result.stdout}${result.stderr}`,
  );
  assert.deepEqual(JSON.parse(result.stdout), {
    defaultMode: 'light',
    disableSwitch: true,
    respectPrefersColorScheme: false,
  });
});

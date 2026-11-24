import { mkdir, copyFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
const assets = [
  'index.html', 'manifest.webmanifest', 'icon.svg', 'sw.js',
  'src/app.mjs', 'src/core.mjs', 'src/library.mjs', 'src/style.css', 'src/storage.mjs'
];
await rm(output, { recursive: true, force: true });
for (const asset of assets) {
  const dest = resolve(output, asset);
  await mkdir(dirname(dest), { recursive: true });
  await copyFile(resolve(root, asset), dest);
}
console.log('Static preview prepared: ' + assets.length + ' files in dist/');

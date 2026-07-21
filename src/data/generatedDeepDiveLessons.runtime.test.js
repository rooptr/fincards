import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dataDirectory = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(resolve(dataDirectory, 'generatedDeepDiveLessons.js'), 'utf8');

if (source.includes('../../scratch/')) {
  throw new Error('Generated Deep Dive lessons must not import runtime data from scratch/.');
}

const imports = [...source.matchAll(/from ['"]\.\/generated\/([^'"]+\.json)['"]/g)];
if (imports.length !== 43) {
  throw new Error(`Expected 43 tracked generated lesson batches, found ${imports.length}.`);
}

for (const [, fileName] of imports) {
  if (!existsSync(resolve(dataDirectory, 'generated', fileName))) {
    throw new Error(`Missing tracked generated lesson batch: ${fileName}`);
  }
}

console.log('Generated Deep Dive runtime data contract passed.');

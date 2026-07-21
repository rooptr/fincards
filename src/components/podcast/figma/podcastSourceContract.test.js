import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('./podcast-fonts.css', import.meta.url), 'utf8');

assert.match(css, /font-family:\s*'PodcastFigma'/);
assert.match(css, /SF-Pro-Text-Regular\.otf/);
assert.match(css, /font-weight:\s*400/);

console.log('Figma podcast font contract passed.');

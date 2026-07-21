import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const appSource = readFileSync(new URL('../../App.jsx', import.meta.url), 'utf8');
const rootControlsStart = appSource.indexOf('{!activeCategory && (');
const rootControlsEnd = appSource.indexOf('{/* Securitization:', rootControlsStart);

assert.ok(rootControlsStart >= 0, 'App must expose its root header controls');
assert.ok(rootControlsEnd > rootControlsStart, 'Root controls must end before category-specific controls');

const rootControls = appSource.slice(rootControlsStart, rootControlsEnd);
assert.match(
  rootControls,
  /<PodcastLauncher\s*\/>[\s\S]*Cram Mode/,
  'Podcast must appear beside the root Cram Mode control',
);

console.log('Podcast placement test passed.');

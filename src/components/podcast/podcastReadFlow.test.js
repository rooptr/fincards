import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const chrome = readFileSync(new URL('./PodcastChrome.jsx', import.meta.url), 'utf8');
const reader = readFileSync(new URL('../DeepDiveReader.jsx', import.meta.url), 'utf8');

assert.match(chrome, /<DeepDiveReader initialLessonId=\{readingLessonId\} onClose=/);
assert.doesNotMatch(chrome, /window\.location\.assign\(/);
assert.match(reader, /initialLessonId/);
assert.match(reader, /onClose/);

console.log('Podcast Read flow contract passed.');

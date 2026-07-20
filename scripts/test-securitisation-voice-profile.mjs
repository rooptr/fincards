import assert from 'node:assert/strict';
import fs from 'node:fs';

const renderer = fs.readFileSync('scripts/generate-deep-dive-audio-azure.mjs', 'utf8');
const batch = fs.readFileSync('scripts/regenerate-securitisation-audio-batch.ps1', 'utf8');
const allLessons = fs.readFileSync('scripts/generate-all-lessons.js', 'utf8');
const lessonOneSource = fs.readFileSync('scripts/content/securitisation/lesson-01-documentary.txt', 'utf8');

const voice = 'en-IN-Diya:DragonHDLatestNeural';

assert.ok(renderer.includes(`|| '${voice}'`), 'The lesson renderer must default to Diya DragonHD.');
assert.ok(batch.includes(`AZURE_SPEECH_VOICE = '${voice}'`), 'The batch renderer must use Diya DragonHD.');
assert.ok(allLessons.includes(`const voice = '${voice}'`), 'The all-lessons renderer must use Diya DragonHD.');
assert.ok(allLessons.includes(`const expectedVoice = '${voice}'`), 'Manifest validation must expect Diya DragonHD.');
assert.ok(!renderer.includes('enhancePronunciation=true'), 'DragonHD must not use non-deterministic enhanced pronunciation.');
assert.ok(lessonOneSource.includes('are expected to produce'), 'Lesson one must use the clear spoken verb "produce".');
assert.ok(!lessonOneSource.includes('are expected to generate'), 'Lesson one must not retain the unstable "generate" phrase.');

console.log('Securitisation voice profile test passed.');

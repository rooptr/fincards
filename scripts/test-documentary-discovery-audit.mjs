import assert from 'node:assert/strict';
import {
  auditDocumentaryEpisode,
  auditDocumentaryLesson,
} from './lib/documentary-discovery-audit.js';

const lessonOneId = 'generated_securitisation_securitization';

const naturalLesson = [
  'The borrower has paid. The investor can still face a delay.',
  'The missing link is collection control: payment must reach the account governed by the transaction.',
].join('\n\n');

assert.deepEqual(auditDocumentaryLesson({
  lessonId: lessonOneId,
  script: naturalLesson,
}), []);

assert.ok(auditDocumentaryLesson({
  lessonId: 'generated_securitisation_cash_securitization',
  script: 'Hello Deepti. I hope you are preparing well and staying hydrated.',
}).some((error) => error.includes('greeting')));

assert.ok(auditDocumentaryLesson({
  lessonId: lessonOneId,
  script: 'Consider the implication. The payment looks ordinary.',
}).some((error) => error.includes('meta-teaching')));

assert.ok(auditDocumentaryLesson({
  lessonId: lessonOneId,
  script: 'What moves? Who pays? Who owns it? Who controls it? What fails?',
}).some((error) => error.includes('questions')));

assert.ok(auditDocumentaryLesson({
  lessonId: lessonOneId,
  script: `${'A'.repeat(1201)}.`,
  chunkLimit: 3000,
}).some((error) => error.includes('1,200')));

assert.ok(auditDocumentaryLesson({
  lessonId: lessonOneId,
  script: `${'A'.repeat(3010)}.`,
  chunkLimit: 3000,
}).some((error) => error.includes('chunk limit')));

const naturalEpisode = Array.from({ length: 10 }, (_, index) => (
  `[${index % 2 ? 'MEERA' : 'DIYA'}] The cash moves through the controlled account before the investor receives it.`
)).join('\n\n');
assert.deepEqual(auditDocumentaryEpisode({ episodeNumber: 1, script: naturalEpisode }), []);

const questionHeavyEpisode = Array.from({ length: 10 }, (_, index) => (
  `[${index % 2 ? 'MEERA' : 'DIYA'}] ${index < 2 ? 'Why does that happen?' : 'The cash moves through the controlled account.'}`
)).join('\n\n');
assert.ok(auditDocumentaryEpisode({ episodeNumber: 1, script: questionHeavyEpisode })
  .some((error) => error.includes('question-ending')));

assert.ok(auditDocumentaryEpisode({
  episodeNumber: 1,
  script: '[ARJUN] The label cannot replace the cash-flow analysis.',
}).some((error) => error.includes('unsupported speaker')));

console.log('Documentary discovery audit test passed.');

import assert from 'node:assert/strict';
import { interviewReadyCards } from './interviewReadyCards.js';

const questions = interviewReadyCards.map((card) => card.question.toLowerCase());
assert.equal(new Set(interviewReadyCards.map((card) => card.id)).size, interviewReadyCards.length, 'Interview Ready card IDs must be unique.');
const normalizeQuestion = (question) => question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
assert.equal(new Set(interviewReadyCards.map((card) => normalizeQuestion(card.question))).size, interviewReadyCards.length, 'Interview Ready questions must not be exact duplicates.');
const cardIds = new Set(interviewReadyCards.map((card) => card.id));
for (const card of interviewReadyCards) {
  for (const relatedId of card.relatedIds ?? []) {
    assert.ok(cardIds.has(relatedId), `Unknown related card ${relatedId} referenced by ${card.id}.`);
  }
}
assert.equal(interviewReadyCards.filter((card) => card.tag === 'archive').length, 190);
assert.equal(interviewReadyCards.filter((card) => card.tag === 'related').length, 30);
assert.equal(interviewReadyCards.filter((card) => card.tag === 'gen').length, 30);
assert.ok(interviewReadyCards.slice(0, 190).every((card) => card.tag === 'archive'), 'Archive cards must precede generated cards.');
assert.ok(interviewReadyCards.slice(190, 220).every((card) => card.tag === 'related'), 'Related cards must sit after archive cards.');
assert.ok(interviewReadyCards.slice(220).every((card) => card.tag === 'gen'), 'Generated variants must be the final block.');

for (const required of [
  'special mention accounts',
  'drawing power',
  'factory',
  'fcff',
  'enterprise value',
  'hindenburg report',
  'calls and puts',
  'short selling',
  'rdbms',
  'data quality',
  'advanced excel functions',
  'last-minute change',
  'significant financial-model error',
  'heavier ball',
  'unevenly burning 60-second ropes',
  'three-statement model',
  'accounts receivable increases',
  'abs, rmbs, and cmbs',
  'weighted-average life',
  '13-week cash-flow forecast',
  'quality of earnings',
  'working-capital peg',
  'tax basis step-up',
  'types of debt are included',
  'what is npv',
  'what is ebitda',
  'write sql queries involving joins',
]) {
  assert.ok(questions.some((question) => question.includes(required)), `Missing Interview Ready coverage: ${required}`);
}

console.log('Interview Ready coverage contract passed.');

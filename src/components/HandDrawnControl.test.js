import assert from 'node:assert/strict';
import { controlKindFor } from './HandDrawnControl.model.js';

assert.equal(controlKindFor('balance'), 'weight');
assert.equal(controlKindFor('time_decay'), 'timeline');
assert.equal(controlKindFor('not-real'), 'handle');

console.log('HandDrawnControl tests passed.');

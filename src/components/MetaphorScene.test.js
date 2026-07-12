import assert from 'node:assert/strict';
import { metaphorFor } from './MetaphorScene.model.js';

assert.equal(metaphorFor('time_decay'), 'time_decay');
assert.equal(metaphorFor('unknown'), 'flow');

console.log('MetaphorScene tests passed.');

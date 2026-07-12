import assert from 'node:assert/strict';
import { heroCopyFor } from './StoryHero.model.js';

const story = { narrative: { hook: 'Tension', reveal: 'Topic', definition: 'Definition' } };

assert.deepEqual(heroCopyFor(story, 'prologue'), ['Tension']);
assert.deepEqual(heroCopyFor(story, 'reveal'), ['Topic', 'Definition']);

console.log('StoryHero tests passed.');

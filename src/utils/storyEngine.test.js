import assert from 'node:assert/strict';
import { normalizeStoryEngine, validateStoryEngine } from './storyEngine.js';

const chapter = {
  canonical_concept_model: {
    topic: 'Example',
    definition: 'A definition.',
    hero: {
      hook_scenario: 'A real tension.',
      hero_visual_concept: 'timeline',
    },
  },
  scenes: [],
};

assert.equal(normalizeStoryEngine(chapter).visual.metaphor, 'time_decay');
assert.ok(normalizeStoryEngine(chapter).panels.length >= 2);
assert.deepEqual(
  validateStoryEngine({ interactions: [{ input: 'rate', drives: [], learning_effect: '' }] }),
  [
    'Interaction 0 must drive at least one visual property.',
    'Interaction 0 needs a learning effect.',
  ],
);

console.log('storyEngine tests passed.');

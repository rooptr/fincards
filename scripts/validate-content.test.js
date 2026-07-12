import assert from 'node:assert/strict';
import { validateContent } from './validate-content.js';

const chapterWithIncompleteStoryInteraction = {
  canonical_concept_model: {
    hero: {
      hook_scenario: 'At 10 percent, Priya checks the plan.',
    },
    coverage_check: { coverage_gaps: [] },
  },
  scenes: [{ refers_back_to_hook: true, introduces_formal_term: true }],
  story_engine: {
    interactions: [{ input: 'rate', drives: ['cash-flow scale'] }],
  },
};

const errors = validateContent(chapterWithIncompleteStoryInteraction);
assert.ok(errors.some((error) => error.includes('needs a learning effect')));

console.log('validate-content tests passed.');

import assert from 'node:assert/strict';
import { generateTopicStory, generateTopicLibrary, auditIllustrationUniqueness } from './topicStoryGenerator.js';

const one = generateTopicStory({ title: 'Net Present Value', short_summary: 'Compare value today with the cost of a project.', formula: 'NPV = PV - I' }, ['cash flow', 'discount rate']);
const two = generateTopicStory({ title: 'Inventory Turnover', short_summary: 'Measure how quickly stock becomes sales.', formula: 'COGS / Inventory' }, ['stock', 'sales']);
assert.notEqual(one.narrative.hook, two.narrative.hook);
assert.equal(new Set(one.subtopics.map((item) => item.visual.metaphor)).size, one.subtopics.length);
assert.ok(one.formula);
assert.ok(one.panels.length >= 2 && one.panels.length <= 4);
assert.equal(new Set(one.panels.map((panel) => panel.illustration_key)).size, one.panels.length);
assert.equal(new Set(one.panels.map((panel) => panel.visual.metaphor)).size, one.panels.length);
assert.equal(auditIllustrationUniqueness(one), true);
assert.equal(new Set(generateTopicLibrary([{
  title: 'One', short_summary: 'A', domain: 'A'
}, {
  title: 'Two', short_summary: 'B', domain: 'B'
}]).map((story) => story.visual.metaphor)).size, 2);
console.log('topic story generator tests passed.');

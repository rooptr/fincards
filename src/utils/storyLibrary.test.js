import assert from 'node:assert/strict';
import topics from '../data/extractedTopics.json' with { type: 'json' };
import { generateTopicLibrary } from './topicStoryGenerator.js';

const picked = [];
for (const topic of topics) {
  const category = topic.source_categories?.[0] ?? topic.domain;
  if (category && !picked.some((item) => (item.source_categories?.[0] ?? item.domain) === category)) picked.push(topic);
  if (picked.length === 3) break;
}
const stories = generateTopicLibrary(picked);
assert.equal(stories.length, 3);
assert.equal(new Set(stories.map((story) => story.narrative.hook)).size, 3);
assert.equal(new Set(stories.map((story) => story.visual.metaphor)).size, 3);
console.log('story library tests passed.');

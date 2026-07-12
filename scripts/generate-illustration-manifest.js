import fs from 'node:fs';
import path from 'node:path';
import topics from '../src/data/extractedTopics.json' with { type: 'json' };
import { generateTopicLibrary } from '../src/utils/topicStoryGenerator.js';

const styleLock = {
  renderer: 'svg-ink',
  lineWeight: 4,
  palette: ['#1d1d1f', '#0071e3', '#ff9f0a'],
  composition: 'single protagonist or mechanism, minimal background, one prop at display size',
  frameRate: 'low-frame',
  resolution: 'display-size',
  generation: 'pregenerated-static-content',
};

const stories = generateTopicLibrary(topics);
const manifest = {
  styleLock,
  topics: topics.map((topic, topicIndex) => {
    const story = stories[topicIndex];
    return {
      id: topic.id,
      hero: { asset: `topic-${topic.id}-hero.svg`, metaphor: story.visual.metaphor },
      subtopics: story.subtopics.map((subtopic, index) => ({ id: `${topic.id}-${index}`, asset: `topic-${topic.id}-subtopic-${index}.svg`, metaphor: subtopic.visual.metaphor })),
    };
  }),
};

const output = path.resolve('src/data/illustrationManifest.json');
fs.writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${manifest.topics.length} topic illustration records to ${output}`);

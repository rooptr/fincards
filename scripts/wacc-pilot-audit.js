import wacc from '../src/data/chapters/wacc.json' with { type: 'json' };
import { normalizeStoryEngine } from '../src/utils/storyEngine.js';
import { HERO_STAGES } from '../src/utils/lessonPresentation.js';

const story = normalizeStoryEngine(wacc);
const panels = story.panels ?? [];
const keys = panels.map((panel) => panel.illustration_key);
if (panels.length < 2 || panels.length > 4) throw new Error(`WACC panel count invalid: ${panels.length}`);
if (new Set(keys).size !== keys.length) throw new Error('WACC panel illustration collision');
if (new Set(panels.map((panel) => panel.visual?.metaphor)).size !== panels.length) throw new Error('WACC panel metaphor collision');
console.log(`WACC panels: ${panels.length}`);
panels.forEach((panel, index) => console.log(`${index + 1}. ${panel.id} -> ${panel.visual.metaphor} -> ${panel.visual.object}`));
const subtopics = story.subtopics ?? [];
if (new Set(subtopics.map((item) => item.illustration_key)).size !== subtopics.length) throw new Error('WACC subtopic key collision');
if (new Set(subtopics.map((item) => item.visual?.object)).size !== subtopics.length) throw new Error('WACC subtopic central-object collision');
console.log(`WACC subtopics: ${subtopics.length}`);
subtopics.forEach((item, index) => console.log(`${index + 1}. ${item.title} -> ${item.visual.metaphor} -> ${item.visual.object}`));
console.log(`Scroll stages: ${HERO_STAGES.join(' -> ')}`);

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildGenerationQueue } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topics = JSON.parse(fs.readFileSync(path.join(root, 'src/data/deep_dive_topics.json'), 'utf8'));
const out = process.argv[2] ?? path.join(root, 'scratch/deep_dive_generation_batches.json');
const ready = buildGenerationQueue(topics);
const limits = { standard: 8, modeling_studio: 3, securitisation_desk: 2 };

function chunk(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) result.push(items.slice(index, index + size));
  return result;
}

const lessonBatches = [];
for (const experienceType of ['standard', 'modeling_studio', 'securitisation_desk']) {
  const items = ready.filter((topic) => topic.experience_type === experienceType);
  chunk(items, limits[experienceType]).forEach((batch, index) => {
    lessonBatches.push({
      batch_id: `lessons-${experienceType}-${String(index + 1).padStart(2, '0')}`,
      kind: experienceType,
      max_size: limits[experienceType],
      topics: batch,
      source_policy: 'Each topic keeps its own locked source pack; the model may not transfer evidence or numbers between topics.',
    });
  });
}

const decisionCaseBatches = chunk(ready.filter((topic) => topic.decision_case_eligible), 4).map((batch, index) => ({
  batch_id: `case-files-${String(index + 1).padStart(2, '0')}`,
  kind: 'decision-case',
  max_size: 4,
  topics: batch,
  source_policy: 'Every Case File receives a real dated evidence record, two defensible positions, a committee mandate, and a reasoned resolution. Cases are generated separately from the core lesson.',
}));

const pilot = {
  required_before_scale: true,
  artifacts: [
    { kind: 'standard', topic_id: 'quick_ratio', purpose: 'Concept-first narrative pilot' },
    { kind: 'modeling_studio', topic_id: 'three_statement_modeling', purpose: 'Hands-on integrated model pilot' },
    { kind: 'securitisation_desk', topic_id: 'securitization', purpose: 'Pool, waterfall, trigger, and tranche pilot' },
    { kind: 'decision-case', topic_id: 'quick_ratio', purpose: 'Evidence-led committee case pilot' },
  ],
};

const payload = {
  generated_at: new Date().toISOString(),
  policy: {
    standard_batch_size: 8,
    modeling_studio_batch_size: 3,
    securitisation_desk_batch_size: 2,
    case_file_batch_size: 4,
    rationale: 'Small homogeneous batches preserve source discipline, mode-specific instructions, and editorial review capacity. Scale only after the four-artifact pilot passes.',
  },
  pilot,
  lesson_batches: lessonBatches,
  case_file_batches: decisionCaseBatches,
};

fs.writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`);
console.log(JSON.stringify({ lessons: lessonBatches.length, cases: decisionCaseBatches.length, topics: ready.length, pilot: pilot.artifacts.length }));

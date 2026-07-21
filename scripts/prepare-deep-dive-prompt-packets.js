import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildGenerationQueue } from '../src/utils/deepDiveReadiness.js';
import { createDeepDiveGenerationSpec } from '../src/utils/deepDiveGenerationContract.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topics = JSON.parse(fs.readFileSync(path.join(root, 'src/data/deep_dive_topics.json'), 'utf8'));
const queue = buildGenerationQueue(topics);

const pilots = [
  { topic_id: 'quick_ratio', kind: 'standard', label: 'Concept-first narrative pilot' },
  { topic_id: 'three_statement_modeling', kind: 'modeling-studio', label: 'Integrated model pilot' },
  { topic_id: 'securitization', kind: 'securitisation-desk', label: 'Pool and waterfall pilot' },
  { topic_id: 'quick_ratio', kind: 'decision-case', label: 'Evidence-led committee case pilot' },
];

const packets = pilots.map((pilot, index) => {
  const topic = queue.find((entry) => entry.topic_id === pilot.topic_id);
  if (!topic) throw new Error(`Pilot topic is not ready: ${pilot.topic_id}`);
  const spec = createDeepDiveGenerationSpec(pilot.kind);
  return {
    packet_id: `pilot-${String(index + 1).padStart(2, '0')}-${pilot.kind}`,
    label: pilot.label,
    topic_id: pilot.topic_id,
    canonical_name: topic.canonical_name,
    kind: pilot.kind,
    research: topic.research,
    phases: {
      research: {
        instruction: spec.researchPass.instruction,
        system_prompt: spec.researchPass.systemPrompt,
      },
      draft: {
        instruction: spec.draftPass.instruction,
        system_prompt: spec.draftPass.systemPrompt,
        approved_sections: spec.sections,
      },
      editorial: {
        instruction: spec.editorialPass.instruction,
        system_prompt: spec.editorialPass.systemPrompt,
        quality_gate: spec.qualityGate,
      },
    },
    output_contract: {
      no_invented_values: true,
      preserve_source_field_and_as_of_date: true,
      validate_before_publish: true,
      human_review_required: true,
    },
  };
});

const out = process.argv[2] ?? path.join(root, 'scratch/deep_dive_pilot_prompt_packets.json');
fs.writeFileSync(out, `${JSON.stringify({ generated_at: new Date().toISOString(), packets }, null, 2)}\n`);
console.log(`Wrote ${packets.length} pilot prompt packets.`);

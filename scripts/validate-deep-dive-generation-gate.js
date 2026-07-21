import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deepDiveLessons } from '../src/data/deepDiveLessons.js';
import { securitisationDeskPilot } from '../src/data/deepDiveAppliedPilots.js';
import {
  createDeepDiveGenerationSpec,
  validateAppliedLearningArtifact,
  validateDeepDiveContent,
} from '../src/utils/deepDiveGenerationContract.js';
import { buildGenerationQueue } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
const topics = readJson('src/data/deep_dive_topics.json');
const batches = readJson('scratch/deep_dive_generation_batches.json');
const packets = readJson('scratch/deep_dive_pilot_prompt_packets.json').packets;
const ready = buildGenerationQueue(topics);
const readyIds = new Set(ready.map((topic) => topic.topic_id));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function checkCoverage(group, expectedIds, label) {
  const records = group.flatMap((batch) => batch.topics);
  const ids = records.map((topic) => topic.topic_id);
  assert(ids.length === expectedIds.size, `${label} coverage count is ${ids.length}, expected ${expectedIds.size}.`);
  assert(new Set(ids).size === ids.length, `${label} contains duplicate topic IDs.`);
  assert(ids.every((id) => expectedIds.has(id)), `${label} contains a topic outside the ready queue.`);
}

const lessonLimits = { standard: 8, modeling_studio: 3, securitisation_desk: 2 };
for (const batch of batches.lesson_batches) {
  assert(batch.topics.length <= lessonLimits[batch.kind], `${batch.batch_id} exceeds its mode limit.`);
  assert(batch.kind in lessonLimits, `${batch.batch_id} has an unknown lesson mode.`);
}
for (const batch of batches.case_file_batches) {
  assert(batch.topics.length <= 4, `${batch.batch_id} exceeds the Case File limit.`);
  assert(batch.kind === 'decision-case', `${batch.batch_id} is not a Case File batch.`);
}
checkCoverage(batches.lesson_batches, readyIds, 'Lesson batches');
checkCoverage(batches.case_file_batches, readyIds, 'Case File batches');
assert(batches.lesson_batches.every((batch) => batch.topics.every((topic) => !topic.canonical_name.toLowerCase().includes('excel'))), 'Excel topic entered a lesson batch.');
assert(batches.case_file_batches.every((batch) => batch.topics.every((topic) => !topic.canonical_name.toLowerCase().includes('excel'))), 'Excel topic entered a Case File batch.');

const requiredPackets = new Set([
  'standard:quick_ratio',
  'modeling-studio:three_statement_modeling',
  'securitisation-desk:securitization',
  'decision-case:quick_ratio',
]);
assert(packets.length === requiredPackets.size, `Expected ${requiredPackets.size} pilot packets, found ${packets.length}.`);
for (const packet of packets) {
  const key = `${packet.kind}:${packet.topic_id}`;
  assert(requiredPackets.has(key), `Unexpected pilot packet: ${key}.`);
  assert(packet.phases?.research?.system_prompt && packet.phases?.draft?.system_prompt && packet.phases?.editorial?.system_prompt, `Incomplete prompt packet: ${packet.packet_id}.`);
  assert(packet.output_contract?.no_invented_values && packet.output_contract?.validate_before_publish, `Weak output contract: ${packet.packet_id}.`);
  requiredPackets.delete(key);
}
assert(requiredPackets.size === 0, 'A required pilot packet is missing.');

const quickRatio = deepDiveLessons.find((lesson) => lesson.id === 'quick_ratio');
const modeling = deepDiveLessons.find((lesson) => lesson.id === 'three_statement_modeling');
const caseFile = deepDiveLessons.find((lesson) => lesson.id === 'quick_ratio_decision_case');
assert(validateDeepDiveContent(quickRatio).valid, 'Quick Ratio pilot failed the standard lesson gate.');
assert(validateDeepDiveContent(modeling).valid, 'Three Statement Modeling pilot failed the modeling gate.');
assert(validateAppliedLearningArtifact(caseFile).valid, 'Quick Ratio Case File failed the applied-learning gate.');
assert(validateAppliedLearningArtifact(securitisationDeskPilot).valid, 'Securitisation Desk pilot failed the applied-learning gate.');
assert(createDeepDiveGenerationSpec('decision-case').sections.at(-1).heading === 'Reasoned Resolution', 'Case File schema is stale.');

const report = {
  generated_at: new Date().toISOString(),
  status: 'ready_for_pilot_review',
  ready_topics: ready.length,
  lesson_batches: batches.lesson_batches.length,
  case_file_batches: batches.case_file_batches.length,
  pilot_packets: packets.length,
  pilots_validated: ['quick_ratio', 'three_statement_modeling', 'securitization', 'quick_ratio_decision_case'],
  policy: {
    standard_batch_size: 8,
    modeling_studio_batch_size: 3,
    securitisation_desk_batch_size: 2,
    case_file_batch_size: 4,
    excel_topics_generated: false,
    human_review_required: true,
  },
};

const output = process.argv[2] ?? path.join(root, 'scratch/deep_dive_generation_gate.json');
fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report));

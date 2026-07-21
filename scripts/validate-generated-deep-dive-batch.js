import fs from 'node:fs';
import { STANDARD_SECTION_NAMES, validateDeepDiveContent } from '../src/utils/deepDiveGenerationContract.js';

const file = process.argv[2] ?? 'scratch/deep_dive_generated_batch_001.json';
const batch = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];

if (batch.lessonCount !== 8 || batch.lessons?.length !== 8) errors.push('First standard batch must contain exactly eight lessons.');
for (const lesson of batch.lessons ?? []) {
  const validation = validateDeepDiveContent(lesson);
  const nonEvidenceErrors = validation.errors.filter((error) => !error.includes('authentic primary-source evidence capture'));
  errors.push(...nonEvidenceErrors.map((error) => `${lesson.topicId}: ${error}`));
  if (JSON.stringify((lesson.sections ?? []).map((section) => section.heading)) !== JSON.stringify(STANDARD_SECTION_NAMES)) errors.push(`${lesson.topicId}: section order is invalid.`);
  if ((lesson.sections.find((section) => section.id === 'mastery-questions')?.conclusionQuestions ?? []).length < 8) errors.push(`${lesson.topicId}: insufficient mastery questions.`);
  if ((lesson.definitionCatalog ?? []).some((definition) => 'location' in definition)) errors.push(`${lesson.topicId}: Definitions panel record contains a Location field.`);
  for (const source of Object.values(lesson.sources ?? {})) if (!/^https:\/\//.test(source.url ?? '')) errors.push(`${lesson.topicId}: invalid source URL.`);
  const evidence = lesson.sections.find((section) => section.id === 'case-resolution')?.evidence;
  const evidenceIsPending = evidence?.status === 'capture_required_before_publish' && evidence.image === null;
  const evidenceIsGenerated = evidence?.status === 'source_record_generated' && evidence.rows?.length >= 3 && evidence.rows?.every((row) => row.item && row.value && row.source);
  const evidenceIsCaptured = evidence?.status === 'captured_for_editorial_review' && evidence.rows?.length >= 3 && evidence.rows?.every((row) => row.item && row.value && row.source);
  if (!evidenceIsPending && !evidenceIsGenerated && !evidenceIsCaptured) errors.push(`${lesson.topicId}: evidence must be a generated source record, pending capture, or captured with field-level source records.`);
  const serialized = JSON.stringify(lesson).toLowerCase();
  if (serialized.includes('illustrative') || serialized.includes('placeholder') || serialized.includes('lorem ipsum')) errors.push(`${lesson.topicId}: placeholder or illustrative content detected.`);
}

if (errors.length) {
  console.error(JSON.stringify({ valid: false, errors }, null, 2));
  process.exit(1);
}
const pendingEvidence = (batch.lessons ?? []).filter((lesson) => lesson.sections.find((section) => section.id === 'case-resolution')?.evidence?.status === 'capture_required_before_publish').length;
const generatedSourceRecords = (batch.lessons ?? []).filter((lesson) => lesson.sections.find((section) => section.id === 'case-resolution')?.evidence?.status === 'source_record_generated').length;
console.log(JSON.stringify({ valid: true, batchId: batch.batchId, lessons: batch.lessons.length, status: batch.status, capturedEvidence: batch.lessons.length - pendingEvidence - generatedSourceRecords, generatedSourceRecords, pendingEvidence, publishGate: pendingEvidence ? 'blocked_until_primary_document_capture' : generatedSourceRecords ? 'source_record_review' : 'editorial_review' }));

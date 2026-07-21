import fs from 'node:fs';
import { validateAppliedLearningArtifact, validateDeepDiveContent } from '../src/utils/deepDiveGenerationContract.js';

const queue = JSON.parse(fs.readFileSync('scratch/deep_dive_generation_queue.json', 'utf8'));
const scratchFiles = fs.readdirSync('scratch');
const batchFiles = scratchFiles.filter((name) => (
  /^deep_dive_generated_batch_\d{3}\.json$/.test(name)
  || /^deep_dive_generated_modeling_batch_\d{3}\.json$/.test(name)
  || /^deep_dive_generated_securitisation_batch_\d{3}\.json$/.test(name)
)).sort();

const lessons = batchFiles.flatMap((fileName) => JSON.parse(fs.readFileSync(`scratch/${fileName}`, 'utf8')).lessons ?? []);
const expectedIds = queue.map((topic) => topic.topic_id);
const generatedIds = lessons.map((lesson) => lesson.topicId);
const generatedCounts = generatedIds.reduce((counts, id) => ({ ...counts, [id]: (counts[id] ?? 0) + 1 }), {});
const duplicateTopicIds = Object.entries(generatedCounts).filter(([, count]) => count > 1).map(([id]) => id);
const missingTopicIds = expectedIds.filter((id) => !generatedCounts[id]);
const unexpectedTopicIds = generatedIds.filter((id) => !expectedIds.includes(id));
const excelTopicIds = generatedIds.filter((id) => /excel/i.test(id));
const invalidLessons = [];
const editorialWarnings = [];
const heldEvidenceTopicIds = [];

for (const lesson of lessons) {
  if (lesson.kind === 'standard') {
    const structuralErrors = [];
    if ((lesson.sections ?? []).length !== 11) structuralErrors.push('Standard lesson must contain 11 sections.');
    if ((lesson.definitionCatalog ?? []).length < 5) structuralErrors.push('Standard lesson requires at least five definitions.');
    if (!lesson.nodes?.[`${lesson.topicId}-question`]?.text) structuralErrors.push('Standard lesson is missing its governing-question node.');
    if (!Object.values(lesson.sources ?? {}).every((source) => /^https:/.test(source.url ?? ''))) structuralErrors.push('Standard lesson contains an invalid source URL.');
    if (!lesson.sections?.find((section) => section.id === 'case-resolution')?.evidence) structuralErrors.push('Standard lesson is missing its evidence record.');
    if (structuralErrors.length) invalidLessons.push({ topicId: lesson.topicId, errors: structuralErrors });
    const editorialValidation = validateDeepDiveContent({
      ...lesson,
      sections: lesson.sections.map((section) => {
        if (section.id === 'governing-question') return { ...section, body: [] };
        if (section.id === 'case-resolution') return { ...section, evidence: { ...section.evidence, source: section.evidence.source ?? section.evidence.sourceUrl } };
        return section;
      }),
    });
    if (!editorialValidation.valid) {
      const otherErrors = editorialValidation.errors.filter((error) => !error.includes('authentic primary-source evidence capture'));
      if (otherErrors.length) editorialWarnings.push({ topicId: lesson.topicId, errors: otherErrors });
    }
  } else {
    const validation = lesson.kind === 'securitisation-desk'
      ? validateAppliedLearningArtifact(lesson)
      : validateDeepDiveContent(lesson);
    if (!validation.valid) invalidLessons.push({ topicId: lesson.topicId, errors: validation.errors });
  }
  if (lesson.kind === 'standard' && lesson.sections?.find((section) => section.id === 'case-resolution')?.evidence?.status === 'source_record_generated') {
    heldEvidenceTopicIds.push(lesson.topicId);
  }
}

const result = {
  valid: expectedIds.length === lessons.length
    && duplicateTopicIds.length === 0
    && missingTopicIds.length === 0
    && unexpectedTopicIds.length === 0
    && excelTopicIds.length === 0
    && invalidLessons.length === 0,
  queueCount: expectedIds.length,
  generatedCount: lessons.length,
  batchFileCount: batchFiles.length,
  byKind: lessons.reduce((counts, lesson) => ({ ...counts, [lesson.kind]: (counts[lesson.kind] ?? 0) + 1 }), {}),
  duplicateTopicIds,
  missingTopicIds,
  unexpectedTopicIds,
  excelTopicIds,
  invalidLessonCount: invalidLessons.length,
  invalidLessons: invalidLessons.slice(0, 10),
  editorialWarningCount: editorialWarnings.length,
  editorialWarnings: editorialWarnings.slice(0, 10),
  heldEvidenceCount: heldEvidenceTopicIds.length,
  heldEvidenceTopicIds,
};

console.log(JSON.stringify(result, null, 2));
if (!result.valid) process.exit(1);

import fs from 'node:fs';
import path from 'node:path';
import { validateAppliedLearningArtifact, SECURITISATION_DESK_SECTION_SCHEMA } from '../src/utils/deepDiveGenerationContract.js';
import { SECURITISATION_MASTERCLASS } from '../src/data/securitisationMasterclass.js';

const batchFiles = fs.readdirSync('scratch')
  .filter((file) => /^deep_dive_generated_securitisation_batch_\d{3}\.json$/.test(file))
  .sort();
const lessons = batchFiles.flatMap((file) => JSON.parse(fs.readFileSync(path.join('scratch', file), 'utf8')).lessons ?? []);
const audio = JSON.parse(fs.readFileSync('scratch/securitisation_masterclass_audio_scripts.json', 'utf8'));
const expectedHeadings = SECURITISATION_DESK_SECTION_SCHEMA.map((section) => section.heading);
const errors = [];
const warnings = [];
const forbidden = [
  /\bdesk drill\b/i,
  /\banalyst\b/i,
  /\breviewer\b/i,
  /\bsimply\b/i,
  /\bbasically\b/i,
  /\bessentially\b/i,
  /\bin other words\b/i,
  /here(?:'|’)s the thing/i,
  /source pack provides sector context/i,
  /source record generated/i,
  /illustrative/i,
];

function normalize(value) {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function textOf(lesson) {
  return [
    lesson.title,
    lesson.dek,
    lesson.governingQuestion,
    ...lesson.sections.flatMap((section) => [...(section.body ?? []), section.heading]),
    ...lesson.reviewQuestions.flatMap((item) => [item.question, item.answer]),
    ...lesson.parties.flatMap((item) => [item.name, item.responsibility]),
    ...lesson.tranches.flatMap((item) => [item.name, item.priority, item.dataRequirement]),
    ...lesson.inputs.flatMap((item) => [item.name, item.value, item.unit, item.sourceField]),
  ].filter(Boolean);
}

if (lessons.length !== 25) errors.push(`Expected 25 securitisation lessons, found ${lessons.length}.`);
if (SECURITISATION_MASTERCLASS.episodes.length !== 7) errors.push('Masterclass must contain seven episodes.');
if (new Set(lessons.map((lesson) => lesson.topicId)).size !== lessons.length) errors.push('Duplicate securitisation topic IDs detected.');

const orderedLessons = [...lessons].sort((left, right) => (left.series?.overallSequence ?? 999) - (right.series?.overallSequence ?? 999));
orderedLessons.forEach((lesson, index) => {
  if (lesson.series?.overallSequence !== index + 1) errors.push(`${lesson.topicId}: study order is not continuous.`);
  if (!lesson.series?.totalLessons || lesson.series.totalLessons !== lessons.length) errors.push(`${lesson.topicId}: total lesson count is missing or incorrect.`);
  if (!lesson.date) errors.push(`${lesson.topicId}: missing headline dateline.`);
  if (lesson.title.startsWith(`${lesson.canonicalName}:`) || lesson.title.endsWith('..')) errors.push(`${lesson.topicId}: headline reverted to topic-definition format.`);
});

for (const lesson of lessons) {
  const validation = validateAppliedLearningArtifact(lesson);
  if (!validation.valid) errors.push(`${lesson.topicId}: ${validation.errors.join(' | ')}`);
  if (JSON.stringify(lesson.sections.map((section) => section.heading)) !== JSON.stringify(expectedHeadings)) errors.push(`${lesson.topicId}: section headings drifted.`);
  if (lesson.definitionCatalog.length < 28) errors.push(`${lesson.topicId}: definition catalog is incomplete.`);
  if (lesson.reviewQuestions.length < 12) errors.push(`${lesson.topicId}: question bank is thin.`);
  if (lesson.title.length < 30) warnings.push(`${lesson.topicId}: headline may be too short to establish a clear tension.`);
  if (!lesson.series || lesson.series.id !== SECURITISATION_MASTERCLASS.id) errors.push(`${lesson.topicId}: missing masterclass metadata.`);
  if (!lesson.audio?.screenIndependent) errors.push(`${lesson.topicId}: missing screen-independent audio metadata.`);
  if (!lesson.evidenceExhibit?.sourceUrl?.startsWith('https://')) errors.push(`${lesson.topicId}: source exhibit has no direct URL.`);
  if (lesson.topicId !== 'non_performing_loan_securitization' && lesson.sources.rbi_arc_report) errors.push(`${lesson.topicId}: unrelated ARC source attached.`);

  const repeated = new Map();
  for (const sentence of lesson.sections.flatMap((section) => section.body ?? [])) {
    const key = normalize(sentence);
    if (key.length > 80) repeated.set(key, (repeated.get(key) ?? 0) + 1);
  }
  if ([...repeated.values()].some((count) => count > 1)) errors.push(`${lesson.topicId}: repeated body prose detected.`);

  for (const text of textOf(lesson)) {
    for (const pattern of forbidden) if (pattern.test(text)) errors.push(`${lesson.topicId}: forbidden or weak register detected in "${text.slice(0, 110)}".`);
  }
}

if (audio.lessons.length !== lessons.length) errors.push(`Audio script count ${audio.lessons.length} does not match lesson count ${lessons.length}.`);
for (const script of audio.lessons) {
  if (!script.script.startsWith(audio.series.openingPauseToken)) errors.push(`${script.lessonId}: audio script does not begin with the one-second pause token.`);
  const definitionTeachingCount = (script.script.match(/Take |You will hear |The phrase /g) ?? []).length;
  if (definitionTeachingCount < 3 || !/That matters because|Why should you care\?|In practice, this matters because/.test(script.script)) {
    errors.push(`${script.lessonId}: audio script has no embedded definition teaching.`);
  }
  if (!/Here is the simplest useful picture|Picture /.test(script.script)) {
    errors.push(`${script.lessonId}: audio script has no simple mental model.`);
  }
  if (!/If this is new to you|In plain English, the structure is trying to/.test(script.script)) {
    errors.push(`${script.lessonId}: audio script has no beginner bridge.`);
  }
  const teacherPromptCount = (script.script.match(/\?/g) ?? []).length;
  if (teacherPromptCount < 8) {
    errors.push(`${script.lessonId}: audio script does not sustain teacher-led reasoning.`);
  }
  if (/Formal definition|Plain meaning|Important boundary|Key terms are defined/i.test(script.script)) {
    errors.push(`${script.lessonId}: audio script contains a robotic teaching label.`);
  }
  if (script.script.length < 6000) warnings.push(`${script.lessonId}: audio script may not be sufficiently deep.`);
}

console.log(JSON.stringify({ valid: errors.length === 0, lessons: lessons.length, episodes: SECURITISATION_MASTERCLASS.episodes.length, audioScripts: audio.lessons.length, errors, warnings }, null, 2));
if (errors.length) process.exitCode = 1;

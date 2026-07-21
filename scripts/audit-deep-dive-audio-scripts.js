import fs from 'node:fs';

const audio = JSON.parse(fs.readFileSync('scratch/deep_dive_audio_scripts.json', 'utf8'));
const errors = [];
const warnings = [];
const ids = new Set();

if (audio.schemaVersion !== 'deep-dive-audio-scripts.v1') errors.push('Unexpected audio script schema version.');
if (audio.series?.openingPauseSeconds !== 1) errors.push('Audio series must declare a one-second opening pause.');
if (!Array.isArray(audio.lessons) || audio.lessons.length === 0) errors.push('No lightweight audio scripts found.');

for (const lesson of audio.lessons ?? []) {
  if (ids.has(lesson.lessonId)) errors.push(`Duplicate audio script: ${lesson.lessonId}.`);
  ids.add(lesson.lessonId);
  if (!['standard', 'modeling'].includes(lesson.kind)) errors.push(`${lesson.lessonId}: unsupported lesson kind.`);
  if (!lesson.script?.trim()) errors.push(`${lesson.lessonId}: empty script.`);
  if ((lesson.characterCount ?? 0) < 3000) warnings.push(`${lesson.lessonId}: script may not be deep enough for the teaching contract.`);
  if (/\bDesk Drill\b|\bAnalyst Questions\b|\bReturn to Reality\b/i.test(lesson.script)) errors.push(`${lesson.lessonId}: weak or retired heading detected.`);
  if (!/(?:Before (?:moving|you|continuing|the next)|To complete this topic|Pause here|Your task before)/i.test(lesson.script)) errors.push(`${lesson.lessonId}: missing learner assignment.`);
  if ((lesson.sourceTitles?.length ?? 0) > 0 && !/real piece of evidence worth looking at/i.test(lesson.script)) errors.push(`${lesson.lessonId}: missing evidence cue.`);
  if (lesson.hasFormula && !/working relationship worth pausing|Read the expression as/i.test(lesson.script)) errors.push(`${lesson.lessonId}: formula teaching is incomplete.`);
}

console.log(JSON.stringify({ valid: errors.length === 0, lessons: audio.lessons?.length ?? 0, errors, warnings }, null, 2));
if (errors.length > 0) process.exitCode = 1;

import fs from 'node:fs';

const audio = JSON.parse(fs.readFileSync('scratch/securitisation_masterclass_audio_scripts_v7.json', 'utf8'));
const allLessons = audio.lessons ?? [];
const targetLessons = allLessons.slice(2);
const errors = [];

if (allLessons.length !== 51) errors.push(`Expected 51 scripts, found ${allLessons.length}.`);

for (const lesson of targetLessons) {
  const script = String(lesson.script ?? '');
  if (/\bDeepti\b/i.test(script)) errors.push(`${lesson.lessonId}: contains the retired Deepti cue.`);
  if (/\[[^\]]+\]/.test(script)) errors.push(`${lesson.lessonId}: contains a bracketed narration cue.`);
  if (/The useful question appears when the ordinary case stops holding\./i.test(script)) {
    errors.push(`${lesson.lessonId}: contains the abrupt hook transition.`);
  }
}

console.log(JSON.stringify({ valid: errors.length === 0, lessons: allLessons.length, checkedLessons: targetLessons.length, errors }, null, 2));
if (errors.length > 0) process.exitCode = 1;

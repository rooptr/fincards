import fs from 'node:fs';

const audio = JSON.parse(fs.readFileSync('scratch/securitisation_masterclass_audio_scripts.json', 'utf8'));
const targetLessons = (audio.lessons ?? []).slice(2);
const errors = [];

if (targetLessons.length !== 23) errors.push(`Expected lessons 3 through 25, found ${targetLessons.length} scripts.`);

for (const lesson of targetLessons) {
  const script = String(lesson.script ?? '');
  if (/\bDeepti\b/i.test(script)) errors.push(`${lesson.lessonId}: contains the retired Deepti cue.`);
  if (/\[[^\]]+\]/.test(script)) errors.push(`${lesson.lessonId}: contains a bracketed narration cue.`);
  if (/The useful question appears when the ordinary case stops holding\./i.test(script)) {
    errors.push(`${lesson.lessonId}: contains the abrupt hook transition.`);
  }
}

console.log(JSON.stringify({ valid: errors.length === 0, lessons: targetLessons.length, errors }, null, 2));
if (errors.length > 0) process.exitCode = 1;

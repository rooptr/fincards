import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const lessonSourceFile = 'scripts/content/securitisation/lesson-01-documentary.txt';
const episodeSourceFile = 'scripts/content/securitisation/episode-01-documentary.txt';
const briefFile = 'scripts/content/securitisation/documentary-briefs.json';

for (const file of [lessonSourceFile, episodeSourceFile, briefFile]) {
  assert.ok(fs.existsSync(file), `Missing tracked pilot source: ${file}`);
}

for (const script of [
  'scripts/prepare-securitisation-lesson-one-zero-to-one.js',
  'scripts/prepare-securitisation-audio-scripts.js',
  'scripts/prepare-securitisation-multivoice-episode-scripts.js',
]) {
  const result = spawnSync('node', [script], { encoding: 'utf8' });
  assert.equal(result.status, 0, `${script} failed: ${result.stderr || result.stdout}`);
}

const lessonSource = fs.readFileSync(lessonSourceFile, 'utf8').trim();
const episodeSource = fs.readFileSync(episodeSourceFile, 'utf8').trim();
const lessons = JSON.parse(fs.readFileSync('scratch/securitisation_masterclass_audio_scripts_v6.json', 'utf8'));
const episodes = JSON.parse(fs.readFileSync('scratch/securitisation_masterclass_multivoice_episode_scripts_v3.json', 'utf8'));

assert.equal(lessons.lessons.length, 25);
assert.equal(episodes.episodes.length, 7);
assert.equal(lessons.lessons[0].script, lessonSource);
assert.equal(episodes.episodes[0].script, episodeSource);
assert.equal(lessons.lessons[0].lessonId, 'generated_securitisation_securitization');
assert.equal(episodes.episodes[0].number, 1);
assert.ok(lessonSource.startsWith('Hello Deepti. I hope you are preparing well and staying hydrated.'));
assert.ok(!episodes.episodes.slice(1).some((episode) => episode.script === episodeSource));

console.log('Securitisation documentary pilot content test passed.');

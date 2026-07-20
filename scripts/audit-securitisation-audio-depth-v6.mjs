import fs from 'node:fs';
import {
  auditDocumentaryEpisode,
  auditDocumentaryLesson,
} from './lib/documentary-discovery-audit.js';

const lessonFile = process.argv[2] || 'scratch/securitisation_masterclass_audio_scripts_v6.json';
const episodeFile = process.argv[3] || 'scratch/securitisation_masterclass_multivoice_episode_scripts_v3.json';
const errors = [];
const roboticNarrationPatterns = [
  /\bthis\s+(?:structure|lesson|topic|arrangement)\b/i,
  /\bthe\s+(?:lesson|topic)\b/i,
  /\bwhat is the financial consequence if that assumption is wrong\b/i,
  /\bthe evidence boundary\b/i,
  /\bthe cited primary artifact\b/i,
  /\bthat completes\b/i,
  /\bi know the label, but i want the decision behind it\b/i,
];

function readJson(file) {
  if (!fs.existsSync(file)) {
    errors.push(`Missing generated pack: ${file}`);
    return null;
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const lessons = readJson(lessonFile);
const episodes = readJson(episodeFile);

if (lessons) {
  if (lessons.schemaVersion !== 'securitisation-masterclass-audio-scripts.v6') {
    errors.push(`Unexpected lesson schema: ${lessons.schemaVersion}`);
  }
  if (lessons.lessons?.length !== 25) errors.push(`Expected 25 lessons, found ${lessons.lessons?.length ?? 0}.`);
  for (const lesson of lessons.lessons ?? []) {
    const coverage = lesson.depthCoverage ?? {};
    const missing = ['formalDefinition', 'economicPurpose', 'mechanism', 'realEvidence', 'assumption', 'failureMode', 'applicationTask']
      .filter((field) => !coverage[field]);
    if (missing.length) errors.push(`${lesson.lessonId}: missing depth coverage: ${missing.join(', ')}.`);
    const minimumCharacters = lesson.lessonId === 'generated_securitisation_securitization' ? 16000 : 17500;
    if (lesson.script.length < minimumCharacters) errors.push(`${lesson.lessonId}: script is only ${lesson.script.length} characters; expected at least ${minimumCharacters.toLocaleString()}.`);
    const expectedOrder = ['human-scale-example', 'named-real-event', 'formal-mechanism', 'application'];
    if (JSON.stringify(lesson.teachingOrder) !== JSON.stringify(expectedOrder)) {
      errors.push(`${lesson.lessonId}: must declare the concept-first teaching order.`);
    }
    if (/\bthe local question is\b/i.test(lesson.script)) {
      errors.push(`${lesson.lessonId}: contains the classroom-template phrase "the local question is".`);
    }
    if (/\b[a-z]+-level\b/i.test(lesson.script)) {
      errors.push(`${lesson.lessonId}: contains a hyphenated level term that Azure can garble.`);
    }
    if (roboticNarrationPatterns.some((pattern) => pattern.test(lesson.script))) {
      errors.push(`${lesson.lessonId}: contains robotic meta-teaching narration.`);
    }
    if (lesson.lessonId === 'generated_securitisation_securitization') {
      for (const error of auditDocumentaryLesson({ lessonId: lesson.lessonId, script: lesson.script })) {
        errors.push(`${lesson.lessonId}: ${error}.`);
      }
    }
  }
}

if (episodes) {
  if (episodes.schemaVersion !== 'securitisation-masterclass-multivoice-dialogue-scripts.v3') {
    errors.push(`Unexpected episode schema: ${episodes.schemaVersion}`);
  }
  if (episodes.episodes?.length !== 7) errors.push(`Expected 7 episodes, found ${episodes.episodes?.length ?? 0}.`);
  for (const episode of episodes.episodes ?? []) {
    const coverage = episode.depthCoverage ?? {};
    const missing = ['standaloneOpening', 'realEventSpine', 'mappedLessons', 'mechanismWalkthrough', 'decisionChallenge', 'adversarialCorrection']
      .filter((field) => !coverage[field]);
    if (missing.length) errors.push(`Episode ${episode.number}: missing depth coverage: ${missing.join(', ')}.`);
    if (episode.script.length < 10000) errors.push(`Episode ${episode.number}: script is only ${episode.script.length} characters; expected at least 10,000.`);
    const turns = episode.script.match(/^\[(DIYA|MEERA)\]/gm) ?? [];
    if (turns.length < 40) errors.push(`Episode ${episode.number}: only ${turns.length} speaker turns; expected at least 40.`);
    const expectedOrder = ['human-scale-example', 'named-real-event', 'formal-mechanism', 'decision-challenge'];
    if (JSON.stringify(episode.teachingOrder) !== JSON.stringify(expectedOrder)) {
      errors.push(`Episode ${episode.number}: must declare the concept-first teaching order.`);
    }
    if (/\bthe local question is\b/i.test(episode.script)) {
      errors.push(`Episode ${episode.number}: contains the classroom-template phrase "the local question is".`);
    }
    if (/\b[a-z]+-level\b/i.test(episode.script)) {
      errors.push(`Episode ${episode.number}: contains a hyphenated level term that Azure can garble.`);
    }
    if (roboticNarrationPatterns.some((pattern) => pattern.test(episode.script))) {
      errors.push(`Episode ${episode.number}: contains robotic meta-teaching narration.`);
    }
    if (episode.number === 1) {
      for (const error of auditDocumentaryEpisode({ episodeNumber: episode.number, script: episode.script })) {
        errors.push(`Episode ${episode.number}: ${error}.`);
      }
    }
  }
}

console.log(JSON.stringify({ valid: errors.length === 0, lessonFile, episodeFile, errors }, null, 2));
if (errors.length) process.exitCode = 1;

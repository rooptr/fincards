import fs from 'node:fs';
import { findNarrationRisks, prepareNarrationText } from './lib/narration-surface.js';

const files = [
  'scratch/securitisation_masterclass_audio_scripts_v7.json',
  'scratch/securitisation_masterclass_multivoice_episode_scripts_v4.json',
];
const errors = [];
const compilerRepairs = [];
let narrationWords = 0;
let narrationSentences = 0;

function paragraphHasTerminalPunctuation(paragraph) {
  const narrationText = String(paragraph)
    .replace(/^\[(?:DIYA|MEERA)\]\s*/i, '')
    .trim();
  return !narrationText || /[.!?][”'\")\]]*$/.test(narrationText);
}

function collectText(file) {
  if (!fs.existsSync(file)) {
    errors.push(`Missing narration source: ${file}`);
    return [];
  }
  if (!file.endsWith('.json')) return [{ id: file, text: fs.readFileSync(file, 'utf8') }];
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  return [...(value.lessons ?? []), ...(value.episodes ?? [])]
    .map((item) => ({ id: item.lessonId ?? `episode-${item.number}`, text: item.script ?? '' }));
}

for (const file of files) {
  for (const item of collectText(file)) {
    const raw = String(item.text);
    const prepared = prepareNarrationText(raw);
    narrationWords += prepared.replace(/\[\[[^\]]+\]\]/g, '').match(/[A-Za-z]+(?:'[A-Za-z]+)?|\d+(?:\.\d+)?/g)?.length ?? 0;
    narrationSentences += prepared.match(/[.!?]+(?=\s|$)/g)?.length ?? 0;
    if (prepared !== raw) compilerRepairs.push(item.id);
    for (const risk of findNarrationRisks(prepared)) errors.push(`${item.id}: ${risk}.`);
    if (/\[\[(?!ALIAS:[A-Z]+\]\]|YEAR:\d{4}\]\]|NUMBER:[\d,.]+\]\])/.test(prepared)) errors.push(`${item.id}: contains an unsupported narration marker.`);
    if (/\[(?!DIYA\]|MEERA\])[^\]]+\]/.test(raw)) errors.push(`${item.id}: contains an unsupported spoken cue.`);
    if (/\b[A-Z]{3,}(?:\s+\d+){1,3}\b/.test(raw)) errors.push(`${item.id}: contains a raw alphanumeric transaction identifier that must be rewritten as spoken prose.`);
    const unterminatedParagraph = raw.split(/\n\s*\n/).find((paragraph) => !paragraphHasTerminalPunctuation(paragraph));
    if (unterminatedParagraph) errors.push(`${item.id}: contains a paragraph without terminal punctuation, which creates an abrupt spoken ending.`);
  }
}

console.log(JSON.stringify({ valid: errors.length === 0, checkedFiles: files, narrationWords, narrationSentences, compilerRepairs, errors }, null, 2));
if (errors.length) process.exitCode = 1;

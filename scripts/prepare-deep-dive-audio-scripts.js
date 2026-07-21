import fs from 'node:fs';
import path from 'node:path';
import { buildTeachingScript } from './lib/teaching-script-engine.js';

const root = process.cwd();
const scratchDir = path.join(root, 'scratch');
const outputFile = path.join(scratchDir, 'deep_dive_audio_scripts.json');

const MOJIBAKE_REPLACEMENTS = [
  ['\u00e2\u20ac\u2122', '’'],
  ['\u00e2\u20ac\u0099', '’'],
  ['\u00e2\u20ac\u0153', '“'],
  ['\u00e2\u20ac\u0093', '–'],
  ['\u00e2\u20ac\u0094', '—'],
  ['\u00e2\u20ac\u009d', '”'],
  ['\u00e2\u20ac\u00a6', '…'],
  ['\u00e2\u201a\u00b9', '₹'],
  ['\u00c2\u00b7', '·'],
];

function clean(value) {
  let text = String(value ?? '').replace(/\s+/g, ' ').trim();
  for (const [bad, good] of MOJIBAKE_REPLACEMENTS) text = text.split(bad).join(good);
  return text;
}

function sentence(value) {
  const text = clean(value);
  return text ? (/[.!?]$/.test(text) ? text : `${text}.`) : '';
}

function firstBody(lesson, id) {
  return lesson.sections?.find((section) => section.id === id)?.body?.[0] ?? '';
}

function bodies(lesson, id, limit = 2) {
  return (lesson.sections?.find((section) => section.id === id)?.body ?? [])
    .map(clean)
    .filter(Boolean)
    .slice(0, limit);
}

function add(lines, value) {
  const text = sentence(value);
  if (!text) return;
  const key = text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if (!lines.some((line) => line.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() === key)) lines.push(text);
}

function addMany(lines, values) {
  for (const value of values) add(lines, value);
}

function questionRecords(lesson) {
  const mastery = lesson.sections?.find((section) => section.id === 'mastery-questions');
  return mastery?.conclusionQuestions ?? lesson.questions ?? lesson.auditQuestions ?? [];
}

function sourceNames(lesson) {
  return Object.values(lesson.sources ?? {})
    .map((source) => clean(source.title ?? source.name))
    .filter(Boolean)
    .slice(0, 2);
}

function buildStandardScript(lesson) {
  const lines = [];
  const name = clean(lesson.canonicalName);
  const question = firstBody(lesson, 'governing-question');
  const map = lesson.knowledgeMap ?? {};

  add(lines, lesson.title ?? name);
  add(lines, lesson.dek);
  add(lines, `For this topic, know what ${name} isolates, why that information matters, how the result changes a finance decision, and where the inference breaks`);
  add(lines, `The governing question is: ${question}`);
  addMany(lines, bodies(lesson, 'conceptual-foundation', 2));
  addMany(lines, bodies(lesson, 'economic-logic', 2));
  addMany(lines, bodies(lesson, 'formula-construction', 2));
  add(lines, map.informationIsolated);
  addMany(lines, bodies(lesson, 'interpretation', 2));
  add(lines, map.validityAssumptions);

  const questions = questionRecords(lesson).slice(0, 3);
  if (questions.length > 0) {
    add(lines, 'The most tested distinctions are worth stating directly.');
    for (const item of questions) {
      add(lines, `Question: ${item.question} Answer: ${item.answer}`);
    }
  }

  addMany(lines, bodies(lesson, 'case-resolution', 1));
  add(lines, `The durable lesson is this: ${map.criticalQuestion || `interpret ${name} through its assumptions, decision use, and limitations`}`);
  return lines.join('\n\n');
}

function buildModelingScript(lesson) {
  const lines = [];
  const name = clean(lesson.canonicalName);
  const objective = firstBody(lesson, 'decision-objective') || lesson.objective;
  const inputs = lesson.inputs ?? [];
  const buildOrder = lesson.buildOrder ?? [];
  const checks = lesson.checks ?? [];
  const auditQuestions = lesson.auditQuestions ?? [];

  add(lines, lesson.title ?? `${name}: build the decision from the evidence`);
  add(lines, lesson.dek);
  add(lines, `This Modeling Lab teaches ${name} as a decision instrument, not as a collection of formulas`);
  add(lines, objective);
  add(lines, firstBody(lesson, 'source-inputs'));

  if (inputs.length > 0) {
    add(lines, `The source register begins with ${inputs.slice(0, 3).map((input) => `${clean(input.name)} at ${clean(input.value)} ${clean(input.unit)}`).join('; ')}`);
  }

  add(lines, 'The build sequence is the control logic.');
  for (const step of buildOrder.slice(0, 3)) add(lines, `${clean(step.title)}: ${clean(step.detail)}`);
  addMany(lines, bodies(lesson, 'dependency-architecture', 1));
  addMany(lines, bodies(lesson, 'model-integrity-checks', 1));
  addMany(lines, bodies(lesson, 'scenario-transmission', 1));
  addMany(lines, bodies(lesson, 'decision-interpretation', 1));

  if (checks.length > 0) add(lines, `The essential checks are ${checks.slice(0, 3).map((check) => `${clean(check.title)}: ${clean(check.detail)}`).join('; ')}`);

  if (auditQuestions.length > 0) {
    add(lines, 'The most useful review questions are:');
    for (const item of auditQuestions.slice(0, 3)) add(lines, `Question: ${item.question} Answer: ${item.answer}`);
  }

  add(lines, `The durable lesson is this: ${name} is only as reliable as its source definitions, dependency order, integrity checks, and assumptions`);
  return lines.join('\n\n');
}

function loadLessons() {
  const files = fs.readdirSync(scratchDir)
    .filter((file) => /^deep_dive_generated_(?:batch|modeling_batch)_\d{3}\.json$/.test(file))
    .sort();
  const lessons = files.flatMap((file) => JSON.parse(fs.readFileSync(path.join(scratchDir, file), 'utf8')).lessons ?? []);
  return lessons.filter((lesson) => lesson.kind === 'standard' || lesson.kind === 'modeling')
    .filter((lesson) => lesson.topicId !== 'quick_ratio')
    .sort((left, right) => String(left.id).localeCompare(String(right.id)));
}

const lessons = loadLessons();
function hasFormula(lesson) {
  return Boolean(
    lesson.formula
    || lesson.formulaText
    || lesson.formulaKatex
    || lesson.identity
    || lesson.formulas?.primary
    || Object.keys(lesson.formulas ?? {}).length > 0,
  );
}

const scripts = lessons.map((lesson) => {
  const script = buildTeachingScript(lesson);
  return {
    lessonId: lesson.id,
    topicId: lesson.topicId,
    canonicalName: lesson.canonicalName,
    kind: lesson.kind,
    audioTitle: `Finance Deep Dive: ${lesson.canonicalName}`,
    openingPauseSeconds: 1,
    sourceTitles: sourceNames(lesson),
    hasFormula: hasFormula(lesson),
    characterCount: script.length,
    script,
  };
});

const output = {
  schemaVersion: 'deep-dive-audio-scripts.v1',
  series: {
    id: 'finance-deep-dives',
    title: 'Finance Deep Dives',
    openingPauseSeconds: 1,
    totalLessons: scripts.length,
  },
  lessons: scripts,
};

fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile: path.relative(root, outputFile), lessons: scripts.length, standard: scripts.filter((item) => item.kind === 'standard').length, modeling: scripts.filter((item) => item.kind === 'modeling').length }));

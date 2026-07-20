import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const catalogPath = path.join(root, 'scripts', 'content', 'securitisation', 'documentary-catalog.json');
if (!fs.existsSync(catalogPath)) throw new Error('Documentary catalog is missing.');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const briefsPath = path.join(root, 'scripts', 'content', 'securitisation', 'documentary-briefs.json');
const briefs = JSON.parse(fs.readFileSync(briefsPath, 'utf8')).briefs ?? {};
if (catalog.lessons?.length !== 25) throw new Error(`Expected 25 catalog lessons, received ${catalog.lessons?.length ?? 0}.`);
if (catalog.episodes?.length !== 7) throw new Error(`Expected 7 catalog episodes, received ${catalog.episodes?.length ?? 0}.`);

function assertOrderedUnique(records, label) {
  const numbers = records.map((record) => record.number);
  const expected = records.map((_, index) => index + 1);
  if (JSON.stringify(numbers) !== JSON.stringify(expected)) throw new Error(`${label} numbers must be ordered and contiguous.`);
  const ids = records.map((record) => record.id);
  if (new Set(ids).size !== ids.length) throw new Error(`${label} ids must be unique.`);
  const sourceFiles = records.map((record) => record.sourceFile);
  if (new Set(sourceFiles).size !== sourceFiles.length) throw new Error(`${label} source files must be unique.`);
}

assertOrderedUnique(catalog.lessons, 'Lesson');
assertOrderedUnique(catalog.episodes, 'Episode');

for (const record of [...catalog.lessons, ...catalog.episodes]) {
  const brief = briefs[record.briefId];
  if (!brief) throw new Error(`Missing documentary brief: ${record.briefId}`);
  for (const field of ['humanSituation', 'openingPuzzle', 'controllingObject', 'misconception', 'definition', 'namedEvidence', 'evidenceLimit', 'complications', 'transferSituation', 'closingPrinciple', 'requiredCoverage']) {
    if (!brief[field] || (Array.isArray(brief[field]) && brief[field].length === 0)) {
      throw new Error(`Documentary brief ${record.briefId} is missing ${field}.`);
    }
  }
  const sourcePath = path.join(root, record.sourceFile);
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing authored source: ${record.sourceFile}`);
  const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r/g, '').trim();
  if (!source) throw new Error(`Authored source is empty: ${record.sourceFile}`);
}

const lessonPackPath = path.join(root, 'scratch', 'securitisation_masterclass_audio_scripts_v6.json');
const episodePackPath = path.join(root, 'scratch', 'securitisation_masterclass_multivoice_episode_scripts_v3.json');
if (!fs.existsSync(lessonPackPath) || !fs.existsSync(episodePackPath)) throw new Error('Prepared documentary packs are missing.');

const lessonPack = JSON.parse(fs.readFileSync(lessonPackPath, 'utf8'));
const episodePack = JSON.parse(fs.readFileSync(episodePackPath, 'utf8'));
for (const record of catalog.lessons) {
  const packed = lessonPack.lessons.find((lesson) => lesson.lessonId === record.id);
  if (!packed) throw new Error(`Prepared lesson is missing: ${record.id}`);
  const source = fs.readFileSync(path.join(root, record.sourceFile), 'utf8').replace(/\r/g, '').trim();
  if (packed.script.replace(/\r/g, '').trim() !== source) throw new Error(`Prepared lesson differs from authored source: ${record.id}`);
}
for (const record of catalog.episodes) {
  const packed = episodePack.episodes.find((episode) => episode.number === record.number);
  if (!packed) throw new Error(`Prepared episode is missing: ${record.number}`);
  const source = fs.readFileSync(path.join(root, record.sourceFile), 'utf8').replace(/\r/g, '').trim();
  if (packed.script.replace(/\r/g, '').trim() !== source) throw new Error(`Prepared episode differs from authored source: ${record.number}`);
}

console.log('Securitisation documentary catalog test passed.');

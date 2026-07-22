import fs from 'node:fs';
import path from 'node:path';
import { deepDiveLessons } from '../src/data/deepDiveLessons.js';

const catalogFile = 'scripts/content/securitisation/documentary-catalog.json';
const outputFile = 'scratch/securitisation_masterclass_audio_scripts_v7.json';
const textDirectory = 'scratch/securitisation_masterclass_audio_scripts_v7';
const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));
const lessonById = new Map(deepDiveLessons.map((lesson) => [lesson.id, lesson]));

function authoredScript(sourceFile) {
  if (!fs.existsSync(sourceFile)) throw new Error(`Missing authored documentary source: ${sourceFile}`);
  const script = fs.readFileSync(sourceFile, 'utf8').replace(/\r/g, '').trim();
  if (!script) throw new Error(`Authored documentary source is empty: ${sourceFile}`);
  return script;
}

const renderedLessons = catalog.lessons.map((record) => {
  const lesson = lessonById.get(record.id);
  const episode = catalog.episodes.find((candidate) => candidate.number === (lesson?.series?.episodeNumber ?? record.episodeNumber));
  const episodeNumber = lesson?.series?.episodeNumber ?? record.episodeNumber ?? 1;
  const episodeId = lesson?.series?.episodeId ?? episode?.id ?? `episode-${String(episodeNumber).padStart(2, '0')}`;
  return {
    lessonId: record.id,
    canonicalName: lesson?.canonicalName ?? record.canonicalName,
    episodeNumber,
    episodeId,
    audioTitle: lesson?.audio?.title ?? lesson?.title ?? record.canonicalName,
    teachingOrder: ['human-scale-example', 'named-real-event', 'formal-mechanism', 'application'],
    depthCoverage: {
      formalDefinition: true,
      economicPurpose: true,
      mechanism: true,
      realEvidence: true,
      assumption: true,
      failureMode: true,
      applicationTask: true,
    },
    sourceFile: record.sourceFile,
    briefId: record.briefId,
    script: authoredScript(record.sourceFile),
  };
});

const outputEpisodes = catalog.episodes.map((record) => ({
  number: record.number,
  id: record.id,
  title: catalog.episodes.find((candidate) => candidate.number === record.number)?.title ?? catalog.episodes.find((candidate) => candidate.number === record.number)?.id ?? `Episode ${record.number}`,
  lessonIds: record.lessonIds ?? renderedLessons.filter((candidate) => candidate.episodeNumber === record.number).map((candidate) => candidate.lessonId),
}));

const output = {
  schemaVersion: 'securitisation-masterclass-audio-scripts.v7',
  series: {
    id: 'securitisation-masterclass',
    title: 'Securitisation: From Receivables to Rated Risk',
    totalLessons: renderedLessons.length,
    openingPauseSeconds: 1,
    openingPauseToken: '',
    modelId: 'azure-diya-dragon-hd',
    sourceMode: 'tracked-documentary-prose',
  },
  episodes: outputEpisodes,
  lessons: renderedLessons,
};

fs.mkdirSync(textDirectory, { recursive: true });
for (const [index, lesson] of renderedLessons.entries()) {
  const slug = lesson.lessonId.replace(/^generated_securitisation_/, '');
  fs.writeFileSync(path.join(textDirectory, `lesson-${String(index + 1).padStart(2, '0')}-${slug}.txt`), `${lesson.script}\n`);
}
fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, textDirectory, lessons: renderedLessons.length, episodes: output.episodes.length }));

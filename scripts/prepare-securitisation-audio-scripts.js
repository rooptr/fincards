import fs from 'node:fs';
import path from 'node:path';
import { deepDiveLessons } from '../src/data/deepDiveLessons.js';

const catalogFile = 'scripts/content/securitisation/documentary-catalog.json';
const outputFile = 'scratch/securitisation_masterclass_audio_scripts_v6.json';
const textDirectory = 'scratch/securitisation_masterclass_audio_scripts_v6';
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
  if (!lesson) throw new Error(`Catalog lesson does not exist in Deep Dive data: ${record.id}`);
  return {
    lessonId: lesson.id,
    canonicalName: lesson.canonicalName,
    episodeNumber: lesson.series.episodeNumber,
    episodeId: lesson.series.episodeId,
    audioTitle: lesson.audio?.title ?? lesson.title,
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

const output = {
  schemaVersion: 'securitisation-masterclass-audio-scripts.v6',
  series: {
    id: 'securitisation-masterclass',
    title: 'Securitisation: From Receivables to Rated Risk',
    totalLessons: renderedLessons.length,
    openingPauseSeconds: 1,
    openingPauseToken: '',
    modelId: 'azure-diya-dragon-hd',
    sourceMode: 'tracked-documentary-prose',
  },
  episodes: [...new Map(renderedLessons.map((lesson) => [lesson.episodeNumber, {
    number: lesson.episodeNumber,
    id: lesson.episodeId,
    title: lessonById.get(lesson.lessonId).series.episodeTitle,
    lessonIds: renderedLessons.filter((candidate) => candidate.episodeNumber === lesson.episodeNumber).map((candidate) => candidate.lessonId),
  }])).values()],
  lessons: renderedLessons,
};

fs.mkdirSync(textDirectory, { recursive: true });
for (const [index, lesson] of renderedLessons.entries()) {
  const slug = lesson.lessonId.replace(/^generated_securitisation_/, '');
  fs.writeFileSync(path.join(textDirectory, `lesson-${String(index + 1).padStart(2, '0')}-${slug}.txt`), `${lesson.script}\n`);
}
fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, textDirectory, lessons: renderedLessons.length, episodes: output.episodes.length }));

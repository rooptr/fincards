import fs from 'node:fs';

const inputFile = 'scratch/securitisation_masterclass_episode_scripts.json';
const catalogFile = 'scripts/content/securitisation/documentary-catalog.json';
const outputFile = 'scratch/securitisation_masterclass_multivoice_episode_scripts_v3.json';
const textDirectory = 'scratch/securitisation_masterclass_multivoice_episode_audio_text_v3';
const source = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));

function authoredScript(sourceFile) {
  if (!fs.existsSync(sourceFile)) throw new Error(`Missing authored documentary source: ${sourceFile}`);
  const script = fs.readFileSync(sourceFile, 'utf8').replace(/\r/g, '').trim();
  if (!script) throw new Error(`Authored documentary source is empty: ${sourceFile}`);
  return script;
}

const episodes = catalog.episodes.map((record) => {
  const episode = source.episodes.find((candidate) => candidate.number === record.number);
  if (!episode) throw new Error(`Catalog episode does not exist in the masterclass source: ${record.number}`);
  const script = authoredScript(record.sourceFile);
  return {
    number: episode.number,
    id: episode.id,
    title: episode.title,
    lessonIds: episode.lessonIds,
    lessonOrder: episode.lessonOrder,
    eventTitle: episode.eventAssessment.eventTitle,
    format: 'Two-voice documentary discovery conversation',
    teachingOrder: ['human-scale-example', 'named-real-event', 'formal-mechanism', 'decision-challenge'],
    depthCoverage: {
      standaloneOpening: true,
      realEventSpine: true,
      mappedLessons: true,
      mechanismWalkthrough: true,
      decisionChallenge: true,
      adversarialCorrection: true,
    },
    voices: {
      diya: 'en-IN-Diya:DragonHDLatestNeural',
      meera: 'en-IN-Meera:DragonHDLatestNeural',
    },
    sourceFile: record.sourceFile,
    briefId: record.briefId,
    speakerMarkup: '[DIYA] and [MEERA] markers are renderer instructions and must not be spoken.',
    script,
  };
});

const output = {
  schemaVersion: 'securitisation-masterclass-multivoice-dialogue-scripts.v3',
  series: {
    title: source.series.title,
    totalEpisodes: episodes.length,
    totalLessons: source.series.totalLessons,
    sourceMode: 'tracked-documentary-prose',
    speakerProtocol: 'Each paragraph begins with [DIYA] or [MEERA]. The Azure renderer routes the paragraph to the corresponding voice and never speaks the marker.',
    openingPauseSeconds: 1,
  },
  episodes,
};

fs.mkdirSync(textDirectory, { recursive: true });
for (const episode of episodes) {
  const textFile = `${textDirectory}/episode-${String(episode.number).padStart(2, '0')}.txt`;
  fs.writeFileSync(textFile, `${episode.script}\n`);
}
fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, textDirectory, episodes: episodes.length, characters: episodes.map((episode) => episode.script.length) }, null, 2));

import fs from 'node:fs';

const catalog = JSON.parse(fs.readFileSync('scripts/content/securitisation/documentary-catalog.json', 'utf8'));
const inputFile = 'scratch/securitisation_masterclass_episode_scripts.json';
const source = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
const sourceEpisodes = new Map(source.episodes.map((episode) => [episode.number, episode]));

const episodes = catalog.episodes.map((record) => {
  const existing = sourceEpisodes.get(record.number);
  const lessons = record.lessonIds.map((lessonId) => catalog.lessons.find((lesson) => lesson.id === lessonId));
  if (lessons.some((lesson) => !lesson)) throw new Error(`Episode ${record.number} references an unknown lesson.`);
  return {
    ...existing,
    number: record.number,
    id: record.id,
    title: record.title,
    lessonIds: record.lessonIds,
    lessonOrder: lessons.map((lesson) => ({
      overallSequence: lesson.number,
      lessonId: lesson.id,
      canonicalName: lesson.canonicalName,
      headline: lesson.canonicalName,
    })),
  };
});

const output = {
  ...source,
  series: {
    ...source.series,
    totalEpisodes: catalog.episodes.length,
    totalLessons: catalog.lessons.length,
    composition: 'Each episode is a real-event assessment and transaction decision lab. The 51 lessons remain the conceptual foundation; the thirteen episodes apply them to sourced historical events and decision points.',
  },
  episodes,
};

fs.writeFileSync(inputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ inputFile, episodes: episodes.length, lessons: catalog.lessons.length }));

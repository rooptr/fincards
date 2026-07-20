import assert from 'node:assert/strict';
import {
  PODCAST_COLLECTIONS,
  PODCAST_TRACKS,
  getPodcastQueue,
} from '../data/securitisationPodcastCatalog.js';
import {
  buildTranscriptCues,
  findActiveCueIndex,
  parseTranscript,
  tokenizeGlossaryTerms,
} from './podcastTranscript.js';

assert.equal(PODCAST_COLLECTIONS.defaultKind, 'lessons');
assert.equal(PODCAST_TRACKS.lessons.length, 25);
assert.equal(PODCAST_TRACKS.episodes.length, 7);
assert.deepEqual(
  getPodcastQueue('lessons').map((track) => track.number),
  Array.from({ length: 25 }, (_, index) => index + 1),
);
assert.deepEqual(
  getPodcastQueue('episodes').map((track) => track.number),
  Array.from({ length: 7 }, (_, index) => index + 1),
);
assert.equal(
  PODCAST_TRACKS.lessons[0].manifestPath,
  'audio/deep-dive/generated_securitisation_securitization/manifest.json',
);
assert.equal(
  PODCAST_TRACKS.episodes[6].manifestPath,
  'audio/deep-dive/securitisation_masterclass/episode-07/manifest.json',
);

const lessonSegments = parseTranscript('First complete thought.\n\nSecond complete thought.', 'lesson');
assert.deepEqual(lessonSegments.map(({ text }) => text), [
  'First complete thought.',
  'Second complete thought.',
]);
assert.ok(lessonSegments.every(({ speaker }) => speaker === null));

const episodeSegments = parseTranscript(
  'Diya: Follow the payment.\n\nMeera: Then test the legal claim.',
  'episode',
);
assert.deepEqual(episodeSegments, [
  { id: 'segment-1', speaker: 'Diya', text: 'Follow the payment.' },
  { id: 'segment-2', speaker: 'Meera', text: 'Then test the legal claim.' },
]);

const estimatedCues = buildTranscriptCues(lessonSegments, 20);
assert.equal(estimatedCues[0].start, 0);
assert.equal(estimatedCues.at(-1).end, 20);
assert.equal(estimatedCues[0].end, estimatedCues[1].start);
assert.ok(estimatedCues.every((cue) => cue.end > cue.start));

const explicitCues = buildTranscriptCues(lessonSegments, 20, [
  { start: 1.25, end: 7.5 },
  { start: 7.5, end: 19.75 },
]);
assert.equal(explicitCues[0].start, 1.25);
assert.equal(explicitCues[1].end, 19.75);
assert.equal(findActiveCueIndex(explicitCues, 8), 1);
assert.equal(findActiveCueIndex(explicitCues, 0), 0);

const glossary = [
  { id: 'spv', term: 'Special purpose vehicle', aliases: ['SPV'] },
  { id: 'vehicle', term: 'Vehicle', aliases: [] },
];
const tokens = tokenizeGlossaryTerms('The special purpose vehicle holds the vehicle loans.', glossary);
assert.deepEqual(
  tokens.filter(({ type }) => type === 'term').map(({ glossaryId, text }) => [glossaryId, text]),
  [
    ['spv', 'special purpose vehicle'],
    ['vehicle', 'vehicle'],
  ],
);
assert.equal(tokens.map(({ text }) => text).join(''), 'The special purpose vehicle holds the vehicle loans.');

console.log('Podcast transcript model test passed.');

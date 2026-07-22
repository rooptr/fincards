import { deepDiveLessons } from './deepDiveLessons.js';
import { SECURITISATION_MASTERCLASS } from './securitisationMasterclass.js';
import { SECURITISATION_PODCAST_EPISODES } from './securitisationPodcastEpisodes.js';

export const PODCAST_ALBUM_ARTWORK = 'art.jpg';
export const ACCOUNTING_ALBUM_ARTWORK = 'acc.png';

const lessonTracks = deepDiveLessons
  .filter((lesson) => (
    lesson.kind === 'securitisation-desk'
    && lesson.series?.id === SECURITISATION_MASTERCLASS.id
  ))
  .sort((left, right) => left.series.overallSequence - right.series.overallSequence)
  .map((lesson) => ({
    id: lesson.id,
    topicId: lesson.topicId,
    kind: 'lesson',
    number: lesson.series.overallSequence,
    title: lesson.canonicalName,
    subtitle: lesson.title,
    episodeNumber: lesson.series.episodeNumber,
    episodeId: lesson.series.episodeId,
    episodeTitle: lesson.series.episodeTitle,
    manifestPath: 'audio/deep-dive/' + lesson.id + '/manifest.json',
    artwork: PODCAST_ALBUM_ARTWORK,
    courseId: 'securitisation',
  }));

const episodeTracks = SECURITISATION_PODCAST_EPISODES.map((episode) => {
  const episodeNumber = String(episode.number).padStart(2, '0');
  return {
    id: 'securitisation-episode-' + episodeNumber,
    kind: 'episode',
    number: episode.number,
    title: episode.title,
    subtitle: 'Diya and Meera',
    episodeNumber: episode.number,
    episodeId: episode.id,
    episodeTitle: episode.title,
    topicIds: [...(episode.topicIds ?? [])],
    manifestPath: 'audio/deep-dive/securitisation_masterclass/episode-' + episodeNumber + '/manifest.json',
    artwork: PODCAST_ALBUM_ARTWORK,
    courseId: 'securitisation',
  };
});

export const PODCAST_TRACKS = Object.freeze({
  lessons: Object.freeze(lessonTracks),
  episodes: Object.freeze(episodeTracks),
});

export const PODCAST_COLLECTIONS = Object.freeze({
  defaultKind: 'lessons',
  lessons: Object.freeze({ id: 'lessons', label: 'Lessons', count: lessonTracks.length }),
  episodes: Object.freeze({ id: 'episodes', label: 'Episodes', count: episodeTracks.length }),
});

export const PODCAST_COURSES = Object.freeze([
  Object.freeze({
    id: 'securitisation',
    title: 'Securitisation',
    subtitle: 'From Receivables to Rated Risk',
    artwork: PODCAST_ALBUM_ARTWORK,
    accentColor: '#ff2d55',
    author: 'Finance Flashcards',
    lessonCount: lessonTracks.length,
    totalDuration: 'Masterclass',
  }),
  Object.freeze({
    id: 'accounting',
    title: 'Accounting',
    subtitle: 'Financial Fundamentals',
    artwork: ACCOUNTING_ALBUM_ARTWORK,
    accentColor: '#1a4f8a',
    author: 'Finance Flashcards',
    lessonCount: 0,
    totalDuration: 'Coming soon',
  }),
]);

export function getPodcastCourse(courseId = 'securitisation') {
  return PODCAST_COURSES.find((course) => course.id === courseId) ?? PODCAST_COURSES[0];
}

export function getPodcastQueue(kind = PODCAST_COLLECTIONS.defaultKind, courseId = 'securitisation') {
  const queue = PODCAST_TRACKS[kind] ?? PODCAST_TRACKS[PODCAST_COLLECTIONS.defaultKind];
  return queue.filter((track) => track.courseId === courseId);
}

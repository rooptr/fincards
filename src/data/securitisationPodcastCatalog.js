import { deepDiveLessons } from './deepDiveLessons.js';
import { SECURITISATION_MASTERCLASS } from './securitisationMasterclass.js';

export const PODCAST_ALBUM_ARTWORK = 'podcast/securitisation-album.webp';

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
  }));

const episodeTracks = SECURITISATION_MASTERCLASS.episodes.map((episode) => {
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
    topicIds: [...episode.topicIds],
    manifestPath: 'audio/deep-dive/securitisation_masterclass/episode-' + episodeNumber + '/manifest.json',
    artwork: PODCAST_ALBUM_ARTWORK,
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

export function getPodcastQueue(kind = PODCAST_COLLECTIONS.defaultKind) {
  return [...(PODCAST_TRACKS[kind] ?? PODCAST_TRACKS[PODCAST_COLLECTIONS.defaultKind])];
}

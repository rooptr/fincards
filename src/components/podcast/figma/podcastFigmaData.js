import { getPodcastCourse, getPodcastQueue, PODCAST_COURSES } from '../../../data/podcastCatalog.js';
import { SECURITISATION_PODCAST_GLOSSARY } from '../../../data/securitisationPodcastGlossary.js';

const durationLabel = (seconds) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return '—';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
};

export function getFigmaCourse(courseId) {
  const course = getPodcastCourse(courseId);
  const isAccounting = course.id === 'accounting';
  return {
    ...course,
    artwork: isAccounting ? 'acc.png' : 'art.jpg',
    availability: isAccounting ? 'coming-soon' : 'available',
    lessonCount: isAccounting ? 0 : course.lessonCount,
    totalDuration: isAccounting ? 'Coming soon' : course.totalDuration,
  };
}

export function getFigmaCourses() {
  return PODCAST_COURSES.map(({ id }) => getFigmaCourse(id));
}

export function getFigmaLessons(courseId, kind = 'lessons') {
  return getPodcastQueue(kind, courseId).map((track) => ({
    id: track.id,
    number: track.number,
    title: track.title,
    duration: durationLabel(track.durationSeconds),
    durationSeconds: track.durationSeconds || 0,
    sourceTrack: track,
  }));
}

export function getRecentFigmaItems(recentTracks, activeTrackId) {
  return (Array.isArray(recentTracks) ? recentTracks : []).map((track) => ({
    courseId: track.courseId,
    lessonId: track.id,
    lessonTitle: track.title,
    courseName: getFigmaCourse(track.courseId).title,
    artwork: getFigmaCourse(track.courseId).artwork,
    duration: durationLabel(track.durationSeconds),
    isActive: track.id === activeTrackId,
    sourceTrack: track,
  }));
}

function phraseUsed(script, phrase) {
  return new RegExp(`\\b${String(phrase).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(script);
}

export function getVocabularyForTrack(track, manifest) {
  if (!track || track.courseId !== 'securitisation') return [];
  const script = manifest?.chapters?.map((chapter) => chapter.script || '').join('\n') || '';
  if (!script) return [];
  return SECURITISATION_PODCAST_GLOSSARY.filter((word) => (
    [word.term, ...(word.aliases || [])].some((phrase) => phraseUsed(script, phrase))
  )).map((word) => ({
    word: word.term,
    pronunciation: '',
    partOfSpeech: 'Securitisation term',
    definition: word.definition,
    example: word.example,
  }));
}

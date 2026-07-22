import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LibraryScreen } from './figma/LibraryScreen.tsx';
import { CoursePage } from './figma/CoursePage.tsx';
import { MiniPlayer } from './figma/MiniPlayer.tsx';
import { NowPlaying } from './figma/NowPlaying.tsx';
import { QueueSheet } from './figma/QueueSheet.tsx';
import { VocabularySheet } from './figma/VocabularySheet.tsx';
import { getFigmaCourse, getFigmaCourses, getFigmaLessons, getRecentFigmaItems, getVocabularyForTrack } from './figma/podcastFigmaData.js';
import { usePodcastPlayer } from './PodcastPlayerContext.jsx';
import './figma/podcast-fonts.css';

const DeepDiveReader = lazy(() => import('../DeepDiveReader.jsx'));

function toCourse(courseId, kind = 'lessons') {
  const course = getFigmaCourse(courseId);
  return {
    ...course,
    lessons: getFigmaLessons(courseId, kind),
    vocabulary: [],
    accentColor: '#ff2d55',
    gradientStart: '#f5f5f7',
    gradientEnd: '#ffffff',
  };
}

export default function PodcastChrome() {
  const player = usePodcastPlayer();
  const { nowPlayingOpen } = player;
  const [screen, setScreen] = useState('library');
  const [courseId, setCourseId] = useState('securitisation');
  const [showQueue, setShowQueue] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [readingLessonId, setReadingLessonId] = useState(null);
  const courses = useMemo(() => getFigmaCourses().map((course) => toCourse(course.id)), []);
  const course = toCourse(courseId, player.queueKind);
  const activeQueueKind = player.track?.kind === 'episode' ? 'episodes' : player.queueKind;
  const currentCourse = player.track ? toCourse(player.track.courseId, activeQueueKind) : null;
  const currentLesson = currentCourse?.lessons.find((lesson) => lesson.id === player.track?.id) || null;
  const playback = {
    isPlaying: player.isPlaying,
    currentCourse,
    currentLesson,
    currentTime: player.currentTime,
    duration: player.duration,
    speed: player.speed,
  };
  const playLesson = (lesson, kind = (lesson.sourceTrack.kind === 'episode' ? 'episodes' : 'lessons')) => player.loadTrack(lesson.sourceTrack, kind, { autoplay: true, open: true });
  const selectCourse = (nextCourse) => { setCourseId(nextCourse.id); setScreen('course'); };
  const playAll = (kind) => { const lesson = getFigmaLessons(courseId, kind)[0]; if (lesson) playLesson(lesson, kind); };
  const shuffle = (kind) => { const lessons = getFigmaLessons(courseId, kind); const lesson = lessons[Math.floor(Math.random() * lessons.length)]; if (lesson) playLesson(lesson, kind); };
  const openWrittenLesson = (lesson) => {
    if (lesson.sourceTrack?.id) setReadingLessonId(lesson.sourceTrack.id);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code !== 'Space' || !player.track || event.repeat) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName))) return;
      event.preventDefault();
      player.togglePlayback();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [player.track, player.togglePlayback]);

  useEffect(() => {
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) return undefined;
    const previousColor = themeColor.getAttribute('content');
    themeColor.setAttribute('content', nowPlayingOpen ? '#000000' : '#f5f5f7');
    return () => {
      if (previousColor) themeColor.setAttribute('content', previousColor);
    };
  }, [nowPlayingOpen]);

  return <>
    <AnimatePresence>
      {player.albumOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-white">
        <AnimatePresence mode="wait" initial={false}>
          {screen === 'library' ? <motion.div key="library" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 280 }} className="absolute inset-0"><LibraryScreen courses={courses} recentItems={getRecentFigmaItems(player.recentTracks, player.track?.id)} onClose={player.closeAlbum} onCourseSelect={selectCourse} onRecentPlay={(nextCourseId, lessonId) => { const lesson = ['episodes', 'lessons'].flatMap((kind) => getFigmaLessons(nextCourseId, kind)).find((item) => item.id === lessonId); if (lesson) playLesson(lesson, lesson.sourceTrack.kind === 'episode' ? 'episodes' : 'lessons'); }} activeLessonId={player.track?.id} /></motion.div> : <motion.div key="course" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 60, opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 280 }} className="absolute inset-0"><CoursePage course={course} playback={playback} onBack={() => setScreen('library')} onPlayLesson={(lesson) => playLesson(lesson)} onPlayAll={playAll} onShuffle={shuffle} onOpenLesson={openWrittenLesson} getLessons={(kind) => getFigmaLessons(courseId, kind)} /></motion.div>}
        </AnimatePresence>
      </motion.div>}
    </AnimatePresence>
    <AnimatePresence>{player.track && !player.nowPlayingOpen && !readingLessonId && <MiniPlayer playback={playback} onExpand={player.openNowPlaying} onTogglePlay={player.togglePlayback} onNext={player.playNext} />}</AnimatePresence>
    <AnimatePresence>{player.nowPlayingOpen && <NowPlaying playback={playback} onClose={player.closeNowPlaying} onTogglePlay={player.togglePlayback} onSeek={player.seek} onSkipBack15={() => player.seek(Math.max(0, player.currentTime - 15))} onSkipForward30={() => player.seek(Math.min(player.duration, player.currentTime + 30))} onSpeedChange={player.setSpeed} onOpenVocabulary={() => setShowVocabulary(true)} onOpenQueue={() => setShowQueue(true)} onNextLesson={player.playNext} onPrevLesson={player.playPrevious} />}</AnimatePresence>
    <VocabularySheet visible={showVocabulary} words={getVocabularyForTrack(player.track, player.manifest)} onClose={() => setShowVocabulary(false)} onSeek={player.seek} />
    <QueueSheet visible={showQueue} playback={playback} onClose={() => setShowQueue(false)} onSelectLesson={(lesson) => playLesson(lesson)} />
    <AnimatePresence>{readingLessonId && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[140] overflow-y-auto bg-[#f5f5f7]"><Suspense fallback={<div className="min-h-screen" aria-label="Loading lesson reader" />}><DeepDiveReader initialLessonId={readingLessonId} onClose={() => { setReadingLessonId(null); setScreen('course'); }} /></Suspense></motion.div>}</AnimatePresence>
  </>;
}

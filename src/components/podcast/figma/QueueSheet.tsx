import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Course, Lesson, PlaybackState } from './podcast-types';

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif';

interface QueueSheetProps {
  visible: boolean;
  playback: PlaybackState;
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}

function NowPlayingBars() {
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 12 }}>
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          style={{ width: 3, backgroundColor: '#FF2D55', borderRadius: 2 }}
          animate={{ height: [5, 12, 5] }}
          transition={{
            duration: 0.8 + i * 0.1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export function QueueSheet({ visible, playback, onClose, onSelectLesson }: QueueSheetProps) {
  const { currentCourse, currentLesson, isPlaying } = playback;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 110,
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: '85%',
              backgroundColor: '#F2F2F7',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              zIndex: 120,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: SF,
            }}
          >
            {/* Handle */}
            <div className="flex justify-center" style={{ paddingTop: 10, paddingBottom: 4 }}>
              <div style={{ width: 36, height: 5, borderRadius: 3, backgroundColor: '#D1D1D6' }} />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between"
              style={{ padding: '8px 20px 12px' }}
            >
              <span style={{ fontFamily: SF, fontSize: 18, fontWeight: 700, color: '#000000' }}>
                Up Next
              </span>
              <button
                onClick={onClose}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: '#E5E5EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <X size={16} color="#3C3C43" />
              </button>
            </div>

            {/* Now Playing row */}
            {currentCourse && currentLesson && (
              <div style={{ padding: '0 16px 8px' }}>
                <p style={{ fontFamily: SF, fontSize: 12, fontWeight: 600, color: '#8E8E93', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Now Playing
                </p>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <ImageWithFallback
                      src={currentCourse.artwork}
                      alt={currentCourse.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: SF, fontSize: 15, fontWeight: 600, color: '#FF2D55', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currentLesson.title}
                    </p>
                    <p style={{ fontFamily: SF, fontSize: 13, color: '#8E8E93' }}>
                      {currentCourse.title} · {currentLesson.duration}
                    </p>
                  </div>
                  {isPlaying && <NowPlayingBars />}
                </div>
              </div>
            )}

            {/* Queue list */}
            <div style={{ overflowY: 'auto', padding: '4px 16px 40px', flex: 1, overscrollBehavior: 'contain' }}>
              {currentCourse && (
                <>
                  <p style={{ fontFamily: SF, fontSize: 12, fontWeight: 600, color: '#8E8E93', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Next Up
                  </p>
                  {currentCourse.lessons
                    .filter((l) => {
                      if (!currentLesson) return true;
                      return l.number > currentLesson.number;
                    })
                    .map((lesson, index, arr) => (
                      <div key={lesson.id}>
                        <button
                          className="w-full text-left flex items-center"
                          style={{ padding: '12px 0', WebkitTapHighlightColor: 'transparent' }}
                          onClick={() => {
                            onSelectLesson(lesson);
                            onClose();
                          }}
                        >
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 8,
                              overflow: 'hidden',
                              flexShrink: 0,
                            }}
                          >
                            <ImageWithFallback
                              src={currentCourse.artwork}
                              alt={currentCourse.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 ml-3">
                            <p
                              style={{
                                fontFamily: SF,
                                fontSize: 15,
                                fontWeight: 400,
                                color: '#000000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {lesson.title}
                            </p>
                            <p style={{ fontFamily: SF, fontSize: 13, color: '#8E8E93' }}>
                              {currentCourse.title} · {lesson.duration}
                            </p>
                          </div>
                        </button>
                        {index < arr.length - 1 && (
                          <div style={{ height: 0.5, backgroundColor: '#E5E5EA', marginLeft: 56 }} />
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

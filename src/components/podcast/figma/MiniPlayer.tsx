import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Pause, Play, SkipForward } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { PlaybackState } from './podcast-types';

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif';

interface MiniPlayerProps {
  playback: PlaybackState;
  onExpand: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
}

/* Scrolling marquee for long titles */
function ScrollingTitle({ text, isActive }: { text: string; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    setShouldScroll(textRef.current.scrollWidth > containerRef.current.clientWidth + 4);
  }, [text]);

  return (
    <div
      ref={containerRef}
      style={{ overflow: 'hidden', maxWidth: '100%', position: 'relative' }}
    >
      {shouldScroll ? (
        <motion.span
          ref={textRef as React.Ref<HTMLSpanElement>}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            fontFamily: SF,
            fontSize: 14,
            fontWeight: 600,
            color: '#000000',
          }}
          animate={{ x: [0, -100, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 1.5,
          }}
        >
          {text}
        </motion.span>
      ) : (
        <span
          ref={textRef}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            fontFamily: SF,
            fontSize: 14,
            fontWeight: 600,
            color: '#000000',
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}

export function MiniPlayer({ playback, onExpand, onTogglePlay, onNext }: MiniPlayerProps) {
  const { currentCourse, currentLesson, isPlaying } = playback;
  if (!currentCourse || !currentLesson) return null;

  const progress = playback.duration > 0 ? playback.currentTime / playback.duration : 0;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', damping: 26, stiffness: 280 }}
      style={{
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: 12,
        zIndex: 50,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)',
      }}
    >
      {/* Blur background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(248,248,248,0.92)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      />

      {/* Progress line at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 2,
          width: `${progress * 100}%`,
          backgroundColor: '#FF2D55',
          zIndex: 1,
          borderRadius: '0 1px 1px 0',
          transition: 'width 1s linear',
        }}
      />

      {/* Content — outer div, not button, so inner buttons are valid */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '10px 14px',
          zIndex: 2,
        }}
      >
        {/* Artwork + text — tappable area that expands NowPlaying */}
        <div
          role="button"
          tabIndex={0}
          className="flex items-center flex-1 min-w-0 cursor-pointer"
          onClick={onExpand}
          onKeyDown={(e) => e.key === 'Enter' && onExpand()}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {/* Artwork */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}
          >
            <ImageWithFallback
              src={currentCourse.artwork}
              alt={currentCourse.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div
            className="flex flex-col justify-center min-w-0"
            style={{ flex: 1, marginLeft: 12, marginRight: 8 }}
          >
            <ScrollingTitle text={currentLesson.title} isActive={isPlaying} />
            <span
              style={{
                fontFamily: SF,
                fontSize: 12,
                fontWeight: 400,
                color: '#8E8E93',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '16px',
                marginTop: 1,
              }}
            >
              {currentCourse.title}
            </span>
          </div>
        </div>

        {/* Controls — valid buttons since parent is a div */}
        <div className="flex items-center gap-1 flex-shrink-0" style={{ marginLeft: 4 }}>
          <button
            onClick={onTogglePlay}
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {isPlaying ? (
              <Pause size={22} color="#000000" fill="#000000" />
            ) : (
              <Play size={22} color="#000000" fill="#000000" />
            )}
          </button>

          <button
            onClick={onNext}
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <SkipForward size={22} color="#000000" fill="#000000" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

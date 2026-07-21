import React, { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import type { PlaybackState } from "./podcast-types";
import svgPaths from './imports/IPhone14ProMax11/svg-x16efmvmiz';

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif';
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function time(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

function WhiteScrubber({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const update = useCallback((event: React.PointerEvent) => {
    if (!ref.current) return;
    const box = ref.current.getBoundingClientRect();
    onChange(Math.max(0, Math.min(1, (event.clientX - box.left) / box.width)));
  }, [onChange]);
  return (
    <div
      ref={ref}
      className="flex h-7 cursor-pointer touch-none items-center"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); update(e); }}
      onPointerMove={(e) => dragging && update(e)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div className={`relative w-full rounded-full bg-white/39 transition-all ${dragging ? "h-[9px]" : "h-[7px]"}`}>
        <div className="absolute inset-y-0 left-0 rounded-full bg-white/81" style={{ width: `${value * 100}%` }} />
        <div className={`absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.4)] ${dragging ? "block" : "hidden"}`} style={{ left: `${value * 100}%` }} />
      </div>
    </div>
  );
}

function WhiteVolumeScrubber({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const update = useCallback((event: React.PointerEvent) => {
    if (!ref.current) return;
    const box = ref.current.getBoundingClientRect();
    onChange(Math.max(0, Math.min(1, (event.clientX - box.left) / box.width)));
  }, [onChange]);
  return (
    <div
      ref={ref}
      className="flex h-7 flex-1 cursor-pointer touch-none items-center"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); update(e); }}
      onPointerMove={(e) => dragging && update(e)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div className="relative w-full h-[11px] rounded-[32px] bg-white/30">
        <div className="absolute inset-y-0 left-0 rounded-[32px] bg-white/81" style={{ width: `${value * 100}%` }} />
      </div>
    </div>
  );
}

interface NowPlayingProps {
  playback: PlaybackState;
  onClose: () => void;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onSkipBack15: () => void;
  onSkipForward30: () => void;
  onSpeedChange: (speed: number) => void;
  onOpenVocabulary: () => void;
  onOpenQueue: () => void;
  onNextLesson: () => void;
  onPrevLesson: () => void;
}

export function NowPlaying({ playback, onClose, onTogglePlay, onSeek, onSkipBack15, onSkipForward30, onSpeedChange, onOpenVocabulary, onOpenQueue }: NowPlayingProps) {
  const [volume, setVolume] = useState(0.42);
  const [showSpeeds, setShowSpeeds] = useState(false);
  const course = playback.currentCourse;
  const lesson = playback.currentLesson;
  if (!course || !lesson) return null;

  const progress = playback.duration ? playback.currentTime / playback.duration : 0;
  const remaining = playback.duration - playback.currentTime;

  const speedPicker = (
    <div className="absolute bottom-[76px] left-0 z-10 rounded-[18px] border border-white/10 bg-black/70 p-1 shadow-[0_12px_32px_rgba(0,0,0,.5)] backdrop-blur-2xl">
      {SPEEDS.map((speed) => (
        <button
          key={speed}
          onClick={() => { onSpeedChange(speed); setShowSpeeds(false); }}
          className={`block w-full rounded-xl px-5 py-2 text-left text-[15px] ${playback.speed === speed ? "bg-white/10 font-semibold text-white" : "text-white/70"}`}
        >
          {speed}×
        </button>
      ))}
    </div>
  );

  const playbackControls = (
    <div className="flex items-center justify-between px-2">
      <button onClick={onSkipBack15} className="transition active:scale-90 active:opacity-60">
        <svg width="46" height="26" viewBox="0 0 46 26" fill="none">
          <path d={svgPaths.p23a74400} fill="white" />
        </svg>
      </button>
      <button onClick={onTogglePlay} className="transition active:scale-90 active:opacity-60">
        {playback.isPlaying ? (
          <svg width="27" height="35" viewBox="0 0 27 35" fill="none">
            <path d={svgPaths.p28522380} fill="white" />
          </svg>
        ) : (
          <Play size={52} fill="white" strokeWidth={0} className="text-white ml-1" />
        )}
      </button>
      <button onClick={onSkipForward30} className="transition active:scale-90 active:opacity-60">
        <svg width="46" height="26" viewBox="0 0 46 26" fill="none">
          <path d={svgPaths.p2eba8700} fill="white" />
        </svg>
      </button>
    </div>
  );

  const volumeControl = (
    <div className="flex items-center gap-3">
      <svg width="10" height="15" viewBox="0 0 9.81951 14.3702" fill="none" className="shrink-0">
        <path d={svgPaths.p215a5b00} fill="rgba(255,255,255,0.74)" />
      </svg>
      <WhiteVolumeScrubber value={volume} onChange={setVolume} />
      <svg width="23" height="16" viewBox="0 0 22.438 16" fill="none" className="shrink-0">
        <path d={svgPaths.p2a135280} fill="rgba(255,255,255,0.74)" />
        <path d={svgPaths.p108bdb80} fill="rgba(255,255,255,0.74)" />
        <path d={svgPaths.p333da600} fill="rgba(255,255,255,0.74)" />
        <path d={svgPaths.p3ade0100} fill="rgba(255,255,255,0.74)" />
      </svg>
    </div>
  );

  const toolbar = (
    <div className="relative grid grid-cols-3">
      <button
        onClick={() => setShowSpeeds(!showSpeeds)}
        className="relative flex flex-col items-center gap-0.5 py-1"
      >
        <span className="text-[19px] tracking-[-0.38px] text-[#cbcbcb]">{playback.speed}×</span>
        <span className="text-[12px] text-white/45">Speed</span>
        {showSpeeds && speedPicker}
      </button>
      <button onClick={onOpenVocabulary} className="flex flex-col items-center gap-0.5 py-1">
        <svg width="24" height="24" viewBox="0 0 23.9869 23.9869" fill="none">
          <path d="M11.9935 6.99618V20.9885" stroke="white" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99891" />
          <path d={svgPaths.p17db000} stroke="white" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99891" />
        </svg>
        <span className="text-[12px] text-white/45">Vocabulary</span>
      </button>
      <button onClick={onOpenQueue} className="flex flex-col items-center gap-0.5 py-1">
        <svg width="26" height="26" viewBox="0 0 25.9826 25.9826" fill="none">
          <path d="M3.24782 12.9913H3.25782" stroke="white" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16522" />
          <path d="M3.24782 19.4869H3.25782" stroke="white" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16522" />
          <path d="M3.24782 6.49565H3.25782" stroke="white" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16522" />
          <path d="M8.66087 12.9913H22.7348" stroke="white" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16522" />
          <path d="M8.66087 19.4869H22.7348" stroke="white" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16522" />
          <path d="M8.66087 6.49565H22.7348" stroke="white" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16522" />
        </svg>
        <span className="text-[12px] text-white/45">Queue</span>
      </button>
    </div>
  );

  return (
    <motion.section
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.9 }}
      className="fixed inset-0 z-[100] overflow-hidden bg-black rounded-t-[10px]"
      style={{ fontFamily: SF }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Minimize player"
        className="absolute inset-x-0 top-0 z-30 h-14 cursor-pointer"
      />
      {/* Full-bleed artwork background */}
      <div className="absolute inset-0">
        <img
          src={course.artwork}
          alt=""
          className="absolute left-0 top-0 w-full h-auto pointer-events-none"
        />
        {/* Gradient: subtle at top, dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/70" />
        {/* Blurred dark overlay for bottom controls area */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "55%",
            backdropFilter: "blur(48px)",
            WebkitBackdropFilter: "blur(48px)",
            background: "rgba(0,0,0,0.28)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 22%)",
          }}
        />
      </div>

      {/* Mobile content layer */}
      <div
        className="relative flex h-full flex-col px-[33px] mx-auto max-w-[430px] md:hidden"
        style={{ paddingBottom: "max(22px, env(safe-area-inset-bottom))" }}
      >
        {/* Drag handle + close */}
        <div className="flex items-center justify-center pt-[14px] pb-2 relative">
          <div className="h-1 w-8 rounded-full bg-white/27" />
        </div>

        {/* Push controls to bottom */}
        <div className="flex-1" />

        {/* Song info row */}
        <div className="flex items-start justify-between mb-5">
          <div className="min-w-0 pr-3">
            <p className="text-[rgba(255,255,255,0.96)] text-[20px] font-semibold leading-normal truncate">{lesson.title}</p>
            <p className="text-[rgba(255,255,255,0.39)] text-[16px] leading-normal truncate">{course.title}</p>
          </div>
        </div>

        {/* Playback scrubber */}
        <WhiteScrubber value={progress} onChange={(next) => onSeek(next * playback.duration)} />

        {/* Time labels */}
        <div className="flex justify-between text-[rgba(255,255,255,0.27)] text-[12px] mt-0.5 mb-9">
          <span>{time(playback.currentTime)}</span>
          <span>-{time(remaining)}</span>
        </div>

        {/* Playback controls */}
        <div className="mb-9">{playbackControls}</div>

        {/* Volume control */}
        <div className="mb-4">{volumeControl}</div>

        {/* Bottom toolbar: Speed / Vocabulary / Queue */}
        {toolbar}
      </div>

      {/* Desktop content layer: two-column */}
      <div className="relative hidden h-full md:flex items-center justify-center gap-14 px-16 mx-auto max-w-[1100px]">
        {/* Left: large square artwork */}
        <div className="shrink-0">
          <img
            src={course.artwork}
            alt={lesson.title}
            className="w-[min(44vh,460px)] aspect-square rounded-2xl object-cover shadow-[0_24px_64px_rgba(0,0,0,.55)]"
          />
        </div>

        {/* Right: info + controls stacked */}
        <div className="flex w-full max-w-[440px] flex-col">
          {/* Song info row */}
          <div className="flex items-start justify-between mb-8">
            <div className="min-w-0 pr-3">
              <p className="text-[rgba(255,255,255,0.96)] text-[28px] font-semibold leading-tight truncate">{lesson.title}</p>
              <p className="text-[rgba(255,255,255,0.5)] text-[19px] leading-normal truncate mt-1">{course.title}</p>
            </div>
          </div>

          {/* Playback scrubber */}
          <WhiteScrubber value={progress} onChange={(next) => onSeek(next * playback.duration)} />

          {/* Time labels */}
          <div className="flex justify-between text-[rgba(255,255,255,0.35)] text-[13px] mt-1 mb-10">
            <span>{time(playback.currentTime)}</span>
            <span>-{time(remaining)}</span>
          </div>

          {/* Playback controls */}
          <div className="mb-10">{playbackControls}</div>

          {/* Volume control */}
          <div className="mb-8">{volumeControl}</div>

          {/* Bottom toolbar: Speed / Vocabulary / Queue */}
          {toolbar}
        </div>
      </div>
    </motion.section>
  );
}

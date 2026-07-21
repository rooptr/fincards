import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getPodcastQueue,
  PODCAST_ALBUM_ARTWORK,
  PODCAST_COLLECTIONS,
} from '../../data/podcastCatalog.js';
import { findAdjacentAvailableTrack, recordRecentlyPlayed } from './podcastPlayerModel.js';

const STORAGE_KEY = 'fincards_securitisation_podcast_player';
const RECENT_TRACKS_STORAGE_KEY = 'fincards_securitisation_podcast_recent';
const PodcastPlayerContext = createContext(null);

function publicUrl(path) {
  return import.meta.env.BASE_URL + String(path ?? '').replace(/^\//, '');
}

function readSavedPlayer() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

function readRecentTracks() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(RECENT_TRACKS_STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function PodcastPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const manifestCacheRef = useRef(new Map());
  const requestIdRef = useRef(0);
  const pendingSeekRef = useRef(0);
  const persistedSecondRef = useRef(-1);
  const restoredRef = useRef(false);

  const [track, setTrack] = useState(null);
  const [queueKind, setQueueKind] = useState(PODCAST_COLLECTIONS.defaultKind);
  const [manifest, setManifest] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [availability, setAvailability] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recentTracks, setRecentTracks] = useState(readRecentTracks);
  const [speed, setSpeedState] = useState(1);
  const [nowPlayingOpen, setNowPlayingOpen] = useState(false);
  const [albumOpen, setAlbumOpen] = useState(() => (
    new URLSearchParams(window.location.search).get('podcast') === 'open'
  ));

  const probeTrack = useCallback(async (candidate) => {
    if (!candidate) return false;
    const cached = manifestCacheRef.current.get(candidate.id);
    if (cached) {
      setAvailability((current) => ({ ...current, [candidate.id]: 'available' }));
      return true;
    }

    setAvailability((current) => (
      current[candidate.id] === 'available'
        ? current
        : { ...current, [candidate.id]: 'loading' }
    ));

    try {
      const response = await fetch(publicUrl(candidate.manifestPath));
      if (!response.ok) throw new Error('Audio not generated yet');
      const nextManifest = await response.json();
      const nextChapter = nextManifest.chapters?.find((item) => item.audio);
      if (!nextChapter) throw new Error('Audio not generated yet');
      const resolved = { manifest: nextManifest, chapter: nextChapter };
      manifestCacheRef.current.set(candidate.id, resolved);
      setAvailability((current) => ({ ...current, [candidate.id]: 'available' }));
      return true;
    } catch {
      setAvailability((current) => ({ ...current, [candidate.id]: 'unavailable' }));
      return false;
    }
  }, []);

  const loadTrack = useCallback(async (
    candidate,
    nextQueueKind = PODCAST_COLLECTIONS.defaultKind,
    options = {},
  ) => {
    if (!candidate) return false;
    const audio = audioRef.current;
    if (!audio) return false;

    const { autoplay = true, initialTime = 0, open = true } = options;
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setTrack(candidate);
    setQueueKind(nextQueueKind);
    setManifest(null);
    setChapter(null);
    setError('');
    setStatus('loading');
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    if (open) setNowPlayingOpen(true);

    const available = await probeTrack(candidate);
    if (requestId !== requestIdRef.current) return false;
    if (!available) {
      setStatus('unavailable');
      setError('Audio not generated yet');
      return false;
    }

    setRecentTracks((current) => recordRecentlyPlayed(current, candidate));

    const resolved = manifestCacheRef.current.get(candidate.id);
    if (!resolved) {
      setStatus('error');
      setError('The audio manifest could not be opened.');
      return false;
    }

    pendingSeekRef.current = Number.isFinite(initialTime) ? Math.max(0, initialTime) : 0;
    setManifest(resolved.manifest);
    setChapter(resolved.chapter);
    audio.pause();
    audio.src = publicUrl(resolved.chapter.audio);
    audio.load();
    setStatus('ready');

    if (autoplay) {
      try {
        await audio.play();
      } catch {
        setStatus('ready');
        setError('Tap play to start this track.');
      }
    }
    return true;
  }, [probeTrack]);

  const seek = useCallback((nextTime) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(nextTime)) return;
    const bounded = Math.min(Math.max(0, nextTime), Number.isFinite(audio.duration) ? audio.duration : nextTime);
    audio.currentTime = bounded;
    setCurrentTime(bounded);
  }, []);

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !chapter) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      setError('');
      await audio.play();
    } catch {
      setStatus('error');
      setError('Audio could not play. Check the connection and try again.');
    }
  }, [chapter]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !chapter || !audio.paused) return;
    try {
      setError('');
      await audio.play();
    } catch {
      setStatus('error');
      setError('Audio could not play. Check the connection and try again.');
    }
  }, [chapter]);

  const setSpeed = useCallback((nextSpeed) => {
    const options = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const requested = Number(nextSpeed);
    const speedValue = options.reduce((closest, option) => (
      Math.abs(option - requested) < Math.abs(closest - requested) ? option : closest
    ), 1);
    if (audioRef.current) audioRef.current.playbackRate = speedValue;
    setSpeedState(speedValue);
  }, []);

  const playAdjacent = useCallback(async (direction) => {
    const queue = getPodcastQueue(queueKind);
    const unknownTracks = queue.filter((candidate) => !availability[candidate.id]);
    const results = await Promise.all(unknownTracks.map(async (candidate) => ({
      id: candidate.id,
      available: await probeTrack(candidate),
    })));
    const resolvedAvailability = { ...availability };
    results.forEach((result) => {
      resolvedAvailability[result.id] = result.available ? 'available' : 'unavailable';
    });
    const adjacent = findAdjacentAvailableTrack(
      queue,
      track?.id ?? null,
      direction,
      resolvedAvailability,
    );
    if (adjacent) await loadTrack(adjacent, queueKind, { autoplay: true, open: nowPlayingOpen });
  }, [availability, loadTrack, nowPlayingOpen, probeTrack, queueKind, track]);

  const playPrevious = useCallback(() => playAdjacent(-1), [playAdjacent]);
  const playNext = useCallback(() => playAdjacent(1), [playAdjacent]);
  const retry = useCallback(() => (
    track ? loadTrack(track, queueKind, { autoplay: false, open: nowPlayingOpen }) : Promise.resolve(false)
  ), [loadTrack, nowPlayingOpen, queueKind, track]);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    const saved = readSavedPlayer();
    if (!saved?.trackId) return;
    const savedKind = saved.queueKind === 'episodes' ? 'episodes' : 'lessons';
    const savedTrack = getPodcastQueue(savedKind).find(({ id }) => id === saved.trackId);
    if (savedTrack) {
      loadTrack(savedTrack, savedKind, {
        autoplay: false,
        initialTime: Number(saved.position) || 0,
        open: false,
      });
    }
  }, [loadTrack]);

  useEffect(() => {
    if (!track) return;
    const roundedSecond = Math.floor(currentTime);
    if (roundedSecond === persistedSecondRef.current) return;
    persistedSecondRef.current = roundedSecond;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      trackId: track.id,
      queueKind,
      position: roundedSecond,
    }));
  }, [currentTime, queueKind, track]);

  useEffect(() => {
    window.localStorage.setItem(RECENT_TRACKS_STORAGE_KEY, JSON.stringify(recentTracks));
  }, [recentTracks]);

  useEffect(() => {
    if (!track || !('mediaSession' in navigator) || typeof window.MediaMetadata !== 'function') return;
    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: track.title,
      artist: track.kind === 'episode' ? 'Diya and Meera' : 'Diya',
      album: 'Securitisation: From Receivables to Rated Risk',
      artwork: [
        {
          src: new URL(publicUrl(PODCAST_ALBUM_ARTWORK), window.location.href).href,
          sizes: '1024x1024',
          type: 'image/webp',
        },
      ],
    });
  }, [track]);

  useEffect(() => {
    if (!('mediaSession' in navigator)) return undefined;
    const handlers = {
      play: () => play(),
      pause: () => audioRef.current?.pause(),
      previoustrack: () => playPrevious(),
      nexttrack: () => playNext(),
      seekto: (details) => seek(details.seekTime),
      seekbackward: (details) => seek((audioRef.current?.currentTime ?? 0) - (details.seekOffset || 15)),
      seekforward: (details) => seek((audioRef.current?.currentTime ?? 0) + (details.seekOffset || 30)),
      stop: () => audioRef.current?.pause(),
    };
    Object.entries(handlers).forEach(([action, handler]) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // Some browsers expose Media Session without every action.
      }
    });
    return () => {
      Object.keys(handlers).forEach((action) => {
        try {
          navigator.mediaSession.setActionHandler(action, null);
        } catch {
          // Ignore unsupported action cleanup.
        }
      });
    };
  }, [play, playNext, playPrevious, seek]);

  useEffect(() => {
    if (!('mediaSession' in navigator) || !duration || !Number.isFinite(duration)) return;
    try {
      navigator.mediaSession.setPositionState({
        duration,
        playbackRate: audioRef.current?.playbackRate || 1,
        position: Math.min(currentTime, duration),
      });
    } catch {
      // Position state is an enhancement; playback remains functional without it.
    }
  }, [currentTime, duration]);

  const value = useMemo(() => ({
    track,
    queueKind,
    manifest,
    chapter,
    availability,
    status,
    error,
    currentTime,
    duration,
    isPlaying,
    recentTracks,
    speed,
    nowPlayingOpen,
    albumOpen,
    probeTrack,
    loadTrack,
    togglePlayback,
    setSpeed,
    seek,
    playPrevious,
    playNext,
    retry,
    openNowPlaying: () => setNowPlayingOpen(true),
    closeNowPlaying: () => setNowPlayingOpen(false),
    openAlbum: () => setAlbumOpen(true),
    closeAlbum: () => setAlbumOpen(false),
  }), [
    albumOpen,
    availability,
    chapter,
    currentTime,
    duration,
    error,
    isPlaying,
    recentTracks,
    loadTrack,
    manifest,
    nowPlayingOpen,
    playNext,
    playPrevious,
    probeTrack,
    queueKind,
    retry,
    seek,
    status,
    speed,
    setSpeed,
    togglePlayback,
    track,
  ]);

  return (
    <PodcastPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
          if (pendingSeekRef.current > 0) {
            audio.currentTime = Math.min(pendingSeekRef.current, Number.isFinite(audio.duration) ? audio.duration : pendingSeekRef.current);
            setCurrentTime(audio.currentTime);
            pendingSeekRef.current = 0;
          }
        }}
        onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => {
          setIsPlaying(true);
          setStatus('playing');
          setError('');
          if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
        }}
        onPause={() => {
          setIsPlaying(false);
          setStatus((current) => current === 'unavailable' || current === 'error' ? current : 'paused');
          if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
        }}
        onEnded={() => {
          setIsPlaying(false);
          playNext();
        }}
        onError={() => {
          setIsPlaying(false);
          setStatus('error');
          setError('The audio file could not be loaded.');
        }}
      />
    </PodcastPlayerContext.Provider>
  );
}

export function usePodcastPlayer() {
  const value = useContext(PodcastPlayerContext);
  if (!value) throw new Error('usePodcastPlayer must be used inside PodcastPlayerProvider');
  return value;
}

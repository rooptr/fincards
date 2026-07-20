import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getPodcastQueue,
  PODCAST_ALBUM_ARTWORK,
  PODCAST_COLLECTIONS,
} from '../../data/securitisationPodcastCatalog.js';
import { SECURITISATION_PODCAST_GLOSSARY } from '../../data/securitisationPodcastGlossary.js';
import {
  buildTranscriptCues,
  findActiveCueIndex,
  parseTranscript,
  tokenizeGlossaryTerms,
} from '../../utils/podcastTranscript.js';
import { usePodcastPlayer } from './PodcastPlayerContext.jsx';
import './podcast.css';

const artworkUrl = `${import.meta.env.BASE_URL}${PODCAST_ALBUM_ARTWORK}`;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function PlayerControls({ compact = false }) {
  const {
    currentTime,
    duration,
    isPlaying,
    playNext,
    playPrevious,
    seek,
    togglePlayback,
  } = usePodcastPlayer();

  if (compact) {
    return (
      <div className="podcast-mini-actions">
        <button type="button" aria-label={isPlaying ? 'Pause' : 'Play'} onClick={(event) => {
          event.stopPropagation();
          togglePlayback();
        }}>
          {isPlaying ? 'Ⅱ' : '▶'}
        </button>
        <button type="button" aria-label="Next track" onClick={(event) => {
          event.stopPropagation();
          playNext();
        }}>›</button>
      </div>
    );
  }

  return (
    <div className="podcast-controls">
      <input
        aria-label="Playback position"
        className="podcast-scrubber"
        type="range"
        min="0"
        max={Math.max(duration, 1)}
        step="0.1"
        value={Math.min(currentTime, Math.max(duration, 1))}
        onChange={(event) => seek(Number(event.target.value))}
        style={{ '--podcast-progress': `${duration ? (currentTime / duration) * 100 : 0}%` }}
      />
      <div className="podcast-time-row">
        <span>{formatTime(currentTime)}</span>
        <span>−{formatTime(Math.max(0, duration - currentTime))}</span>
      </div>
      <div className="podcast-transport">
        <button type="button" aria-label="Previous track" onClick={playPrevious}>‹</button>
        <button type="button" className="podcast-play" aria-label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlayback}>
          {isPlaying ? 'Ⅱ' : '▶'}
        </button>
        <button type="button" aria-label="Next track" onClick={playNext}>›</button>
      </div>
    </div>
  );
}

function TrackStatus({ state }) {
  if (state === 'available') return <span className="podcast-track-status available">Ready</span>;
  if (state === 'unavailable') return <span className="podcast-track-status">Not generated</span>;
  return <span className="podcast-track-status checking">Checking</span>;
}

function PodcastAlbum() {
  const {
    albumOpen,
    availability,
    closeAlbum,
    loadTrack,
    probeTrack,
    track,
  } = usePodcastPlayer();
  const [activeKind, setActiveKind] = useState(PODCAST_COLLECTIONS.defaultKind);
  const queue = useMemo(() => getPodcastQueue(activeKind), [activeKind]);

  useEffect(() => {
    if (!albumOpen) return;
    queue.forEach((candidate) => probeTrack(candidate));
  }, [albumOpen, probeTrack, queue]);

  if (!albumOpen) return null;

  const playTrack = async (candidate) => {
    const loaded = await loadTrack(candidate, activeKind, { autoplay: true, open: true });
    if (loaded) closeAlbum();
  };

  const playFirst = () => {
    const candidate = queue.find((item) => availability[item.id] === 'available') ?? queue[0];
    if (candidate) playTrack(candidate);
  };

  return (
    <section className="podcast-album" role="dialog" aria-modal="true" aria-label="Securitisation podcast album">
      <div className="podcast-album-bar">
        <button type="button" className="podcast-close" onClick={closeAlbum} aria-label="Close podcast">×</button>
        <span>Podcast</span>
        <span aria-hidden="true" />
      </div>

      <div className="podcast-album-scroll">
        <div className="podcast-album-hero">
          <img src={artworkUrl} alt="Abstract streams passing through an ordered financial structure" />
          <div className="podcast-album-copy">
            <p className="podcast-eyebrow">FINCARDS ORIGINAL</p>
            <h2>Securitisation</h2>
            <p className="podcast-album-subtitle">From receivables to rated risk</p>
            <p className="podcast-album-description">
              Follow the cash, the contracts, and the people who decide where every loss lands.
            </p>
            <button type="button" className="podcast-primary-action" onClick={playFirst}>▶ Play</button>
          </div>
        </div>

        <div className="podcast-segmented" role="tablist" aria-label="Podcast collection">
          {['lessons', 'episodes'].map((kind) => (
            <button
              key={kind}
              type="button"
              role="tab"
              aria-selected={activeKind === kind}
              className={activeKind === kind ? 'active' : ''}
              onClick={() => setActiveKind(kind)}
            >
              {PODCAST_COLLECTIONS[kind].label}
              <span>{PODCAST_COLLECTIONS[kind].count}</span>
            </button>
          ))}
        </div>

        <div className="podcast-track-list">
          {queue.map((candidate) => (
            <button
              type="button"
              className={`podcast-track-row ${track?.id === candidate.id ? 'current' : ''}`}
              key={candidate.id}
              onClick={() => playTrack(candidate)}
            >
              <span className="podcast-track-number">{String(candidate.number).padStart(2, '0')}</span>
              <span className="podcast-track-copy">
                <strong>{candidate.title}</strong>
                <small>{candidate.kind === 'episode' ? candidate.subtitle : candidate.episodeTitle}</small>
              </span>
              <TrackStatus state={availability[candidate.id]} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlossaryTerm({ token, onOpen }) {
  if (token.type === 'text') return token.text;
  return (
    <button type="button" className="podcast-term" onClick={(event) => {
      event.stopPropagation();
      onOpen(token.glossaryId);
    }}>
      {token.text}
    </button>
  );
}

function Transcript({ onTermOpen }) {
  const { chapter, currentTime, duration, seek, track } = usePodcastPlayer();
  const activeElementRef = useRef(null);
  const segments = useMemo(
    () => parseTranscript(chapter?.script, track?.kind),
    [chapter?.script, track?.kind],
  );
  const cues = useMemo(
    () => buildTranscriptCues(segments, duration, chapter?.cues),
    [chapter?.cues, duration, segments],
  );
  const activeIndex = findActiveCueIndex(cues, currentTime);

  useEffect(() => {
    activeElementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeIndex]);

  if (!chapter?.script) {
    return <p className="podcast-transcript-empty">The transcript will appear when this audio is generated.</p>;
  }

  return (
    <div className="podcast-transcript" aria-label="Synchronized transcript">
      {cues.map((cue, index) => (
        <div
          role="button"
          tabIndex={0}
          key={cue.id}
          ref={index === activeIndex ? activeElementRef : null}
          className={`podcast-cue ${index === activeIndex ? 'active' : ''}`}
          onClick={() => seek(cue.start)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') seek(cue.start);
          }}
        >
          {cue.speaker && <span className="podcast-speaker">{cue.speaker}</span>}
          <span>
            {tokenizeGlossaryTerms(cue.text, SECURITISATION_PODCAST_GLOSSARY).map((token, tokenIndex) => (
              <GlossaryTerm key={`${cue.id}-${tokenIndex}`} token={token} onOpen={onTermOpen} />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function TermSheet({ glossaryId, onClose }) {
  const entry = SECURITISATION_PODCAST_GLOSSARY.find((item) => item.id === glossaryId);
  if (!entry) return null;

  return (
    <div className="podcast-term-backdrop" onClick={onClose}>
      <section className="podcast-term-sheet" role="dialog" aria-modal="true" aria-label={`${entry.term} meaning`} onClick={(event) => event.stopPropagation()}>
        <div className="podcast-sheet-handle" aria-hidden="true" />
        <button type="button" className="podcast-sheet-close" onClick={onClose} aria-label="Close meaning">×</button>
        <p className="podcast-eyebrow">TERM</p>
        <h3>{entry.term}</h3>
        <dl>
          <div>
            <dt>Definition</dt>
            <dd>{entry.definition}</dd>
          </div>
          <div>
            <dt>Example</dt>
            <dd>{entry.example}</dd>
          </div>
          <div>
            <dt>Technical meaning</dt>
            <dd>{entry.technicalMeaning}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function NowPlaying() {
  const {
    chapter,
    closeNowPlaying,
    error,
    nowPlayingOpen,
    retry,
    status,
    track,
  } = usePodcastPlayer();
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [termId, setTermId] = useState(null);

  useEffect(() => {
    setLyricsOpen(false);
    setTermId(null);
  }, [track?.id]);

  if (!nowPlayingOpen || !track) return null;

  return (
    <section className={`podcast-now-playing ${lyricsOpen ? 'lyrics-open' : ''}`} role="dialog" aria-modal="true" aria-label="Now playing">
      <div className="podcast-now-background" style={{ backgroundImage: `url(${artworkUrl})` }} />
      <div className="podcast-now-bar">
        <button type="button" onClick={closeNowPlaying} aria-label="Minimize player">⌄</button>
        <span>{lyricsOpen ? 'Lyrics' : 'Now Playing'}</span>
        <span aria-hidden="true" />
      </div>

      <div className="podcast-now-layout">
        <div className="podcast-now-visual">
          <img src={artworkUrl} alt="" />
          <div className="podcast-now-title">
            <div>
              <strong>{track.title}</strong>
              <span>{track.kind === 'episode' ? 'Diya and Meera' : 'Diya'}</span>
            </div>
            <span className="podcast-track-index">{track.number}</span>
          </div>
          {(status === 'unavailable' || status === 'error') ? (
            <div className="podcast-player-error">
              <p>{error || 'This audio is not available yet.'}</p>
              <button type="button" onClick={retry}>Try again</button>
            </div>
          ) : (
            <PlayerControls />
          )}
        </div>

        {lyricsOpen && (
          <div className="podcast-lyrics-panel">
            <Transcript onTermOpen={setTermId} />
          </div>
        )}
      </div>

      <div className="podcast-now-footer">
        <button
          type="button"
          className={lyricsOpen ? 'active' : ''}
          onClick={() => setLyricsOpen((open) => !open)}
          disabled={!chapter?.script}
          aria-pressed={lyricsOpen}
        >
          <span aria-hidden="true">≡</span>
          Lyrics
        </button>
      </div>
      <TermSheet glossaryId={termId} onClose={() => setTermId(null)} />
    </section>
  );
}

function MiniPlayer() {
  const { error, nowPlayingOpen, openNowPlaying, status, track } = usePodcastPlayer();
  if (!track || nowPlayingOpen) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      className="podcast-mini"
      onClick={openNowPlaying}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') openNowPlaying();
      }}
    >
      <img src={artworkUrl} alt="" />
      <span className="podcast-mini-copy">
        <strong>{track.title}</strong>
        <small>{status === 'unavailable' || status === 'error' ? error : 'Securitisation'}</small>
      </span>
      <PlayerControls compact />
    </div>
  );
}

export default function PodcastChrome() {
  return (
    <>
      <PodcastAlbum />
      <NowPlaying />
      <MiniPlayer />
    </>
  );
}

import { usePodcastPlayer } from './PodcastPlayerContext.jsx';

export default function PodcastLauncher({ className = '' }) {
  const { openAlbum } = usePodcastPlayer();

  return (
    <button
      type="button"
      className={`podcast-launcher ${className}`.trim()}
      onClick={openAlbum}
    >
      <span aria-hidden="true" className="podcast-launcher-mark">◉</span>
      Podcast
    </button>
  );
}

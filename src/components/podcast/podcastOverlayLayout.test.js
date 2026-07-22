import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const chrome = readFileSync(new URL('./PodcastChrome.jsx', import.meta.url), 'utf8');
const miniPlayer = readFileSync(new URL('./figma/MiniPlayer.tsx', import.meta.url), 'utf8');
const nowPlaying = readFileSync(new URL('./figma/NowPlaying.tsx', import.meta.url), 'utf8');
const library = readFileSync(new URL('./figma/LibraryScreen.tsx', import.meta.url), 'utf8');

assert.match(chrome, /player\.track && !player\.nowPlayingOpen && !readingLessonId && <MiniPlayer/, 'The mini-player must persist outside the closable Podcast overlay.');
assert.match(chrome, /sourceTrack\.kind === 'episode'/, 'Episode playback must select the episodes queue when opening a track.');
assert.match(chrome, /activeQueueKind/, 'Player surfaces must resolve the active track using its queue kind.');
assert.match(chrome, /meta\[name="theme-color"\]/, 'Player theme color must follow the full-screen surface.');
assert.match(miniPlayer, /position: 'fixed'/, 'The mini-player must be viewport-anchored, including on the flashcards home.');
assert.doesNotMatch(nowPlaying, /rounded-t-\[10px\]/, 'Now Playing must not expose white rounded corners at the top of the viewport.');
assert.match(nowPlaying, /h-\[100dvh\]/, 'Now Playing must use the dynamic viewport height.');
assert.doesNotMatch(library, /pt-14/, 'The Podcast library must not reserve a blank desktop band above its header.');

console.log('Podcast overlay layout contract passed.');

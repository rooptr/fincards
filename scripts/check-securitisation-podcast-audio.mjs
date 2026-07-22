import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PODCAST_TRACKS } from '../src/data/podcastCatalog.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(projectRoot, 'public');
const asDiskPath = (publicPath) => path.join(publicRoot, String(publicPath).replace(/^\//, ''));

function inspectTrack(track) {
  const manifestFile = asDiskPath(track.manifestPath);
  const rawAudioFile = track.kind === 'episode'
    ? asDiskPath(`audio/deep-dive/securitisation_masterclass/episode-${String(track.number).padStart(2, '0')}-multivoice.mp3`)
    : null;
  const result = {
    number: track.number,
    title: track.title,
    manifest: fs.existsSync(manifestFile),
    audio: false,
    rawAudio: rawAudioFile ? fs.existsSync(rawAudioFile) : false,
  };

  if (!result.manifest) return result;

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    const audioPaths = (manifest.chapters ?? []).map((chapter) => chapter.audio).filter(Boolean);
    result.audio = audioPaths.length > 0 && audioPaths.every((audioPath) => fs.existsSync(asDiskPath(audioPath)));
  } catch {
    result.manifest = false;
  }

  return result;
}

const report = Object.fromEntries(Object.entries(PODCAST_TRACKS).map(([kind, tracks]) => {
  const rows = tracks.map(inspectTrack);
  return [kind, {
    total: rows.length,
    complete: rows.filter((row) => row.manifest && row.audio).length,
    rawAudio: rows.filter((row) => row.rawAudio || (row.manifest && row.audio)).length,
    incomplete: rows.filter((row) => !row.manifest || !row.audio),
  }];
}));

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(report, null, 2));
} else {
  for (const [kind, result] of Object.entries(report)) {
    console.log(`${kind}: ${result.complete}/${result.total} complete`);
    console.log(`${kind}: ${result.rawAudio}/${result.total} raw audio files found`);
    if (result.incomplete.length > 0) console.table(result.incomplete);
  }
}

const allComplete = Object.values(report).every((result) => result.complete === result.total);
process.exitCode = allComplete ? 0 : 1;

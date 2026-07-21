import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PODCAST_TRACKS } from '../src/data/securitisationPodcastCatalog.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scriptRoot = path.join(projectRoot, 'scratch', 'securitisation_masterclass_multivoice_episode_audio_text_v3');
const audioRoot = path.join(projectRoot, 'public', 'audio', 'deep-dive', 'securitisation_masterclass');
const dryRun = process.argv.includes('--dry-run');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const planned = PODCAST_TRACKS.episodes.map((track) => {
  const number = String(track.number).padStart(2, '0');
  const scriptFile = path.join(scriptRoot, `episode-${number}.txt`);
  const metadataFile = path.join(audioRoot, `episode-${number}-multivoice.json`);
  const audioFile = path.join(audioRoot, `episode-${number}-multivoice.mp3`);
  const outputDirectory = path.join(audioRoot, `episode-${number}`);
  const outputFile = path.join(outputDirectory, 'manifest.json');

  for (const [label, file] of [['script', scriptFile], ['metadata', metadataFile], ['audio', audioFile]]) {
    if (!fs.existsSync(file)) throw new Error(`Missing ${label} for episode ${number}: ${file}`);
  }

  const script = fs.readFileSync(scriptFile, 'utf8').trim();
  const metadata = readJson(metadataFile);
  const manifest = {
    lessonId: `securitisation-episode-${number}`,
    episodeNumber: track.number,
    title: track.title,
    provider: metadata.provider ?? 'azure-speech',
    voices: metadata.voices,
    audioQuality: metadata.outputFormat,
    generatedAt: metadata.generatedAt,
    scriptHash: metadata.scriptHash,
    chapters: [{
      id: `episode-${number}-multivoice`,
      label: track.title,
      audio: `/audio/deep-dive/securitisation_masterclass/episode-${number}-multivoice.mp3`,
      characters: script.length,
      openingPauseSeconds: 1,
      script,
    }],
  };

  return { number, outputDirectory, outputFile, manifest };
});

if (dryRun) {
  for (const item of planned) console.log(`Would write ${item.outputFile}`);
} else {
  for (const item of planned) {
    fs.mkdirSync(item.outputDirectory, { recursive: true });
    fs.writeFileSync(item.outputFile, `${JSON.stringify(item.manifest, null, 2)}\n`, 'utf8');
    console.log(`Wrote episode-${item.number}/manifest.json`);
  }
}

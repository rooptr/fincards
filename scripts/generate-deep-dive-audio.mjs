import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const LESSON_ID = process.env.DEEP_DIVE_LESSON_ID || 'quick_ratio';
const CHAPTER_ID = process.env.DEEP_DIVE_CHAPTER_ID || 'opening';
const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;
const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_v3';

const script = process.env.DEEP_DIVE_TEXT || `Deepthi, Bed Bath and Beyond reported substantial current assets.
Five months later, it filed for Chapter Eleven.

Ab asli sawaal yeh hai: how much of that balance sheet could actually pay a bill before the next sale?

This is the tension behind the Quick Ratio.`;
const openingPauseToken = modelId === 'eleven_v3' ? '[pause]' : '<break time="1.0s" />';
const ttsScript = script.trimStart().startsWith('[pause]') || script.trimStart().startsWith('<break')
  ? script.trimStart()
  : `${openingPauseToken}\n\n${script.trimStart()}`;

function fail(message) {
  console.error(`Deep Dive audio generation failed: ${message}`);
  process.exitCode = 1;
}

if (!apiKey) fail('ELEVENLABS_API_KEY is missing. Add it to .env.local.');
if (!voiceId) fail('ELEVENLABS_VOICE_ID is missing. Add it to .env.local.');
if (process.exitCode) process.exit();

const root = process.cwd();
const outputDir = join(root, 'public', 'audio', 'deep-dive', LESSON_ID);
const audioPath = join(outputDir, `${CHAPTER_ID}.mp3`);
const manifestPath = join(outputDir, 'manifest.json');
const scriptHash = createHash('sha256').update(ttsScript).digest('hex');

const endpoint = new URL(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`);
endpoint.searchParams.set('output_format', 'mp3_22050_32');

console.log(`Generating ${LESSON_ID}/${CHAPTER_ID} with voice ${voiceId} and model ${modelId}...`);
const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'xi-api-key': apiKey,
  },
  body: JSON.stringify({
    text: ttsScript,
    model_id: modelId,
    voice_settings: {
      stability: 0.42,
      similarity_boost: 0.78,
      style: 0.35,
      use_speaker_boost: true,
      speed: 0.94,
    },
  }),
});

if (!response.ok) {
  const detail = await response.text();
  fail(`ElevenLabs returned ${response.status}: ${detail.slice(0, 500)}`);
  process.exit();
}

await mkdir(outputDir, { recursive: true });
const audioBytes = Buffer.from(await response.arrayBuffer());
await writeFile(audioPath, audioBytes);
await writeFile(manifestPath, `${JSON.stringify({
  lessonId: LESSON_ID,
  voiceId,
  modelId,
  generatedAt: new Date().toISOString(),
  scriptHash,
  chapters: [{
    id: CHAPTER_ID,
    label: 'Opening narration',
    audio: `/audio/deep-dive/${LESSON_ID}/${CHAPTER_ID}.mp3`,
    characters: ttsScript.length,
    openingPauseSeconds: 1,
    script: ttsScript,
  }],
}, null, 2)}\n`);

console.log(`Wrote ${audioPath} (${audioBytes.length} bytes).`);
console.log(`Wrote ${manifestPath} (${script.length} characters).`);

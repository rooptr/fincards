import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { prepareNarrationText, renderNarrationSsml } from './lib/narration-surface.js';

const episodeNumber = Number(process.env.SECURITISATION_EPISODE || 1);
const inputFile = process.env.MULTIVOICE_SCRIPT_FILE || 'scratch/securitisation_masterclass_multivoice_episode_scripts_v3.json';
const outputTag = String(process.env.MULTIVOICE_OUTPUT_TAG || '').trim().replace(/[^a-zA-Z0-9_-]/g, '');
// Keep as many conversational turns as possible in one request.  A request
// boundary restarts the voice performance, so boundaries belong between ideas,
// not between ordinary sentences.
const maxChunkCharacters = Number(process.env.MULTIVOICE_CHUNK_SIZE || 8000);
const maxTurnsPerChunk = Number(process.env.MULTIVOICE_MAX_TURNS_PER_CHUNK || 40);
const ssmlOnly = process.env.MULTIVOICE_SSML_ONLY === '1';
const key = process.env.AZURE_SPEECH_KEY;
const region = process.env.AZURE_SPEECH_REGION;
const diyaVoice = 'en-IN-Diya:DragonHDLatestNeural';
const meeraVoice = 'en-IN-Meera:DragonHDLatestNeural';

if (!ssmlOnly && (!key || !region)) throw new Error('AZURE_SPEECH_KEY and AZURE_SPEECH_REGION are required.');
const pack = JSON.parse(await (await import('node:fs/promises')).readFile(inputFile, 'utf8'));
const episode = pack.episodes.find((item) => item.number === episodeNumber);
if (!episode) throw new Error(`Episode ${episodeNumber} was not found in ${inputFile}.`);

function xmlEscape(value) {
  return String(value).replace(/[<&>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  }[character]));
}

function renderHdText(value) {
  const prepared = prepareNarrationText(value)
    .replace(/\bDeepti\b/gi, '[[DEEPTI]]');
  return renderNarrationSsml(prepared, xmlEscape)
    .replace(/\[\[SPV\]\]/g, '<sub alias="S P V">SPV</sub>')
    .replace(/\[\[DEEPTI\]\]/g, '<phoneme alphabet="ipa" ph="diːpti">Deepti</phoneme>');
}

function speakerTurns(script) {
  return script.split(/\r?\n\s*\r?\n/).map((paragraph) => {
    const match = paragraph.trim().match(/^\[(DIYA|MEERA)\]\s+([\s\S]+)$/i);
    if (!match) return null;
    return { speaker: match[1].toUpperCase(), text: match[2].trim() };
  }).filter(Boolean);
}

const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
function renderTurn(turn, openingBreak = '') {
  const body = `<p>${renderHdText(turn.text)}</p><break time="260ms"/>`;
  const styledBody = turn.speaker === 'DIYA'
    ? `<mstts:express-as style="calm" styledegree="0.4"><prosody rate="-1%">${body}</prosody></mstts:express-as>`
    : body;
  return `<voice name="${turn.speaker === 'DIYA' ? diyaVoice : meeraVoice}">${openingBreak}${styledBody}</voice>`;
}

function buildChunks(turns) {
  const chunks = [];
  let current = [];
  let length = 0;
  for (const turn of turns) {
    const estimate = turn.text.length + 100;
    if (current.length && (length + estimate > maxChunkCharacters || current.length >= maxTurnsPerChunk)) {
      chunks.push(current);
      current = [];
      length = 0;
    }
    current.push(turn);
    length += estimate;
  }
  if (current.length) chunks.push(current);
  return chunks;
}

const turns = speakerTurns(episode.script);
if (!turns.length) throw new Error('No [DIYA] or [MEERA] speaker turns found.');
const chunks = buildChunks(turns);
const endpoint = region ? `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1` : '';

async function synthesize(ssml, chunkNumber) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-192kbitrate-mono-mp3',
      'User-Agent': 'finance-flashcards-securitisation-multivoice',
    },
    body: ssml,
  });
  if (!response.ok) throw new Error(`Azure returned ${response.status} on chunk ${chunkNumber}: ${(await response.text()).slice(0, 800)}`);
  return Buffer.from(await response.arrayBuffer());
}

const audioParts = [];
const ssmlParts = [];
for (let index = 0; index < chunks.length; index += 1) {
  // Azure HD multi voice requires each voice to be a direct child of speak.
  const turnsForChunk = chunks[index].map((turn, turnIndex) => renderTurn(
    turn,
    turnIndex === 0 && index === 0 ? '<break time="1s"/>' : '',
  ));
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-IN">${turnsForChunk.join('')}</speak>`;
  console.log(`${ssmlOnly ? 'Rendering SSML' : 'Generating audio'} for episode ${episodeNumber}, chunk ${index + 1}/${chunks.length}...`);
  if (!ssmlOnly) audioParts.push(await synthesize(ssml, index + 1));
  ssmlParts.push(ssml);
}

const lessonId = 'securitisation_masterclass';
const outputDir = join(process.cwd(), 'public', 'audio', 'deep-dive', lessonId);
const outputStem = `episode-${String(episodeNumber).padStart(2, '0')}-multivoice${outputTag ? `-${outputTag}` : ''}`;
await mkdir(outputDir, { recursive: true });
const audioPath = join(outputDir, `${outputStem}.mp3`);
const ssmlPath = join(outputDir, `${outputStem}.ssml`);
const manifestPath = join(outputDir, `${outputStem}.json`);
if (!ssmlOnly) await writeFile(audioPath, Buffer.concat(audioParts));
await writeFile(ssmlPath, `${ssmlParts.join('\n')}\n`);
await writeFile(manifestPath, `${JSON.stringify({
  episode: episodeNumber,
  title: episode.title,
  provider: 'azure-speech',
      voices: { diya: diyaVoice, meera: meeraVoice },
  outputFormat: 'audio-48khz-192kbitrate-mono-mp3',
  chunks: chunks.length,
  scriptHash: createHash('sha256').update(episode.script).digest('hex'),
  speakerTurns: turns.length,
  audioPending: ssmlOnly,
  generatedArtifact: ssmlOnly ? 'ssml-only' : 'audio-and-ssml',
  generatedAt: new Date().toISOString(),
}, null, 2)}\n`);
if (!ssmlOnly) console.log(`Wrote ${audioPath}`);
console.log(`Wrote ${ssmlPath}`);

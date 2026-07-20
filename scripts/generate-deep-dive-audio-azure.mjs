import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { prepareNarrationText, renderNarrationSsml } from './lib/narration-surface.js';

const LESSON_ID = process.env.DEEP_DIVE_LESSON_ID || 'quick_ratio';
const CHAPTER_ID = process.env.DEEP_DIVE_CHAPTER_ID || 'lesson';
const key = process.env.AZURE_SPEECH_KEY;
const region = process.env.AZURE_SPEECH_REGION;
const voice = process.env.AZURE_SPEECH_VOICE || 'en-IN-Diya:DragonHDLatestNeural';
// A REST synthesis request can produce up to ten minutes of audio.  Prefer
// larger requests so a narrator keeps the same performance across an idea;
// the fallback chunker below only cuts at sentence boundaries.
const maxChunkCharacters = Number(process.env.DEEP_DIVE_CHUNK_SIZE || 8000);
const ssmlOnly = process.env.DEEP_DIVE_SSML_ONLY === '1';
const isHdVoice = /:DragonHD(?:LatestNeural|FlashLatestNeural)$/i.test(voice);
const supportsExpressAs = /:DragonHDOmniLatestNeural$/i.test(voice);

const sourcePack = process.env.DEEP_DIVE_SCRIPT_PACK_FILE
  ? JSON.parse(await readFile(process.env.DEEP_DIVE_SCRIPT_PACK_FILE, 'utf8'))
  : null;
const sourceLesson = sourcePack && process.env.DEEP_DIVE_SCRIPT_LESSON_ID
  ? (sourcePack.lessons ?? []).find((lesson) => lesson.lessonId === process.env.DEEP_DIVE_SCRIPT_LESSON_ID)
  : null;
if (sourcePack && !sourceLesson) {
  throw new Error(`Lesson ${process.env.DEEP_DIVE_SCRIPT_LESSON_ID ?? '(missing id)'} was not found in ${process.env.DEEP_DIVE_SCRIPT_PACK_FILE}.`);
}

const rawScript = sourceLesson?.script
  ?? (process.env.DEEP_DIVE_TEXT_FILE
    ? await readFile(process.env.DEEP_DIVE_TEXT_FILE, 'utf8')
    : process.env.DEEP_DIVE_TEXT || `In April 2023, Bed Bath and Beyond filed for Chapter Eleven. Five months earlier, it had nearly 1.9 billion dollars of current assets. That sounds reassuring, until you notice that roughly 1.4 billion dollars was inventory and current liabilities were about 2.6 billion dollars.

So how can a company look asset-rich and still run out of room? Because an asset is not always cash. Inventory has value, but it still needs a buyer, a price, and collection. The Quick Ratio is built for that distinction.

For this one, you should know what the Quick Ratio measures, the formula, why inventory is excluded, how to interpret the result, and the interview trap: a low ratio signals dependence on execution. It does not, by itself, predict bankruptcy.

The Quick Ratio asks a narrow question. If sales stopped for a moment, could the company meet its near-term obligations with assets that are already cash, easily saleable, or already owed by customers?

The formula is cash plus marketable securities plus accounts receivable, divided by current liabilities. Cash counts only when it is unrestricted. Securities count only when they can be sold without material loss. Receivables count only when collection is realistic. Old invoices, disputed balances, weak customers, and concentrated exposure all weaken that assumption.

Inventory is excluded because it is one step earlier in the cash cycle. The company must still sell it. A current asset is an accounting category. A quick asset is a liquidity judgment.

Here is the simple version. Pause the business. Cash can pay. Saleable securities can pay. Collectible invoices can pay. Stock on a shelf cannot pay until someone buys it.

The Current Ratio includes all current assets. The Quick Ratio removes the assets that need another operating step. The Cash Ratio goes further and removes receivables as well. The gap between the Current Ratio and the Quick Ratio tells you how much apparent liquidity still depends on inventory conversion.

There is no magic pass mark. A ratio above one means quick assets exceed current liabilities in aggregate. It does not guarantee that every bill is due after the cash arrives. A ratio below one means the business needs future collections, sales, or financing. That can be manageable for a stable company with reliable cash flow. It is more serious when losses deepen, suppliers tighten terms, or credit availability falls.

The ratio is also not a forecast. Restricted cash may be unusable. Receivables may not collect. A credit line may be conditional. Seasonality can distort a quarter-end snapshot. And for banks, this is usually the wrong tool; their liquidity depends on funding, deposit behavior, asset duration, and regulation.

Back to Bed Bath and Beyond. Its cash covered only about six cents of every dollar of current liabilities. That does not prove the ratio caused the bankruptcy. It reveals the vulnerability: the company needed operating execution or outside funding before most of its short-term claims could be paid.

That is the interview answer. The Quick Ratio measures liquidity that does not rely on selling inventory. Use it to ask how much room the business has if execution slips.`);
const script = rawScript.replace(/\r/g, '').trim();

function xmlEscape(value) {
  return value.replace(/[<&>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  }[character]));
}

function renderHdText(value) {
  const prepared = prepareNarrationText(value)
    // Expand hyphens in compound words to spaces — DragonHD garbles them
    // (e.g. "pool-level" → "pulavel", "tranche-level" → "datlevelool")
    .replace(/(\w)-(\w)/g, '$1 $2')
    .replace(/\bDeepti\b/gi, '[[DEEPTI_ALIAS]]');
  return renderNarrationSsml(prepared, xmlEscape)
    .replace(/\[\[SPV_ALIAS\]\]/g, '<sub alias="S P V">SPV</sub>')
    .replace(/\[\[SEC_ALIAS\]\]/g, '<sub alias="S E C">S E C</sub>')
    .replace(/\[\[DEEPTI_ALIAS\]\]/g, '<phoneme alphabet="ipa" ph="diːpti">Deepti</phoneme>');
}


function buildNaturalSsml(value, breakTime = '350ms') {
  const normalized = value.replace(/\r\n/g, '\n').trim();
  if (isHdVoice) {
    const paragraphs = normalized
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.replace(/[ \t\n]+/g, ' ').trim())
      .filter(Boolean);
    return paragraphs.map((paragraph, paragraphIndex) => {
      const renderedParagraph = renderHdText(paragraph);
      const paragraphBeat = paragraphIndex === paragraphs.length - 1 ? '' : '<break time="260ms"/>';
      return `<p>${renderedParagraph}</p>${paragraphBeat}`;
    }).join('');
  }
  const styleMap = {
    warm: 'encouraging',
    warmly: 'encouraging',
    curious: 'curious',
    thoughtful: 'reflective',
    reflective: 'reflective',
    whisper: 'whispering',
    whispers: 'whispering',
    quiet: 'quiet',
    quietly: 'quiet',
    serious: 'serious',
    emphasis: 'confident',
    playful: 'joking',
    chuckle: 'laughing',
    'small chuckle': 'laughing',
    'soft laugh': 'laughing',
    encouraging: 'encouraging',
    'firm, encouraging': 'encouraging',
    firm: 'confident',
    slowly: 'slow',
    'serious, slower': 'serious',
    'gentle emphasis': 'confident',
    'playful, brief': 'joking',
  };
  const paralinguistics = new Set(['laughter', 'coughing', 'throat_clearing', 'breathing', 'sighing', 'yawning']);
  const dragonHdStyles = new Set('amazed amused angry annoyed anxious appreciative calm cautious concerned confident confused curious defeated defensive defiant determined disappointed disgusted doubtful ecstatic encouraging excited fast fearful frustrated happy hesitant hurt impatient impressed intrigued joking laughing optimistic painful panicked panting pleading proud quiet reassuring reflective relieved remorseful resigned sad sarcastic secretive serious shocked shouting shy skeptical slow struggling surprised suspicious sympathetic terrified upset urgent whispering'.split(' '));
  const markerPattern = /\[([^\]]+)\]/g;
  const fragments = [];
  let cursor = 0;
  let activeStyle = null;
  let match;
  const appendText = (text) => {
    const content = text.trim();
    if (!content) return;
    const spoken = xmlEscape(normalizeNarrationNumbers(content));
    fragments.push(supportsExpressAs && activeStyle
      ? `<mstts:express-as style="${activeStyle}">${spoken}</mstts:express-as>`
      : spoken);
  };
  while ((match = markerPattern.exec(normalized))) {
    appendText(normalized.slice(cursor, match.index));
    const marker = match[1].trim().toLowerCase();
    const pauseMatch = marker.match(/^pause(?:\s+(\d+(?:\.\d+)?)s)?$/);
    if (pauseMatch || marker === 'brief pause' || marker === 'pause briefly') {
      const milliseconds = pauseMatch?.[1] ? Math.round(Number(pauseMatch[1]) * 1000) : 450;
      fragments.push(`<break time="${milliseconds}ms"/>`);
    } else if (paralinguistics.has(marker)) {
      // Do not emit paralinguistic markers for DragonHD. They are not supported
      // as SSML elements there and would otherwise be spoken literally.
      if (supportsExpressAs) fragments.push(`[${marker}]`);
    } else {
      activeStyle = styleMap[marker] ?? (dragonHdStyles.has(marker) ? marker : null);
    }
    cursor = match.index + match[0].length;
  }
  appendText(normalized.slice(cursor));
  return `${fragments.join(' ')}<break time="${breakTime}"/>`;
}

function fail(message) {
  console.error(`Azure Deep Dive audio generation failed: ${message}`);
  process.exitCode = 1;
}

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function synthesizeChunk(chunkSsml, chunkNumber) {
  const maxAttempts = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const requestTimeout = setTimeout(() => controller.abort(), 180000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-48khz-192kbitrate-mono-mp3',
          'User-Agent': 'finance-flashcards-deep-dive-audio',
        },
        body: chunkSsml,
        signal: controller.signal,
      });

      if (response.ok) return Buffer.from(await response.arrayBuffer());

      const detail = await response.text();
      if (response.status < 500 && response.status !== 429) {
        const error = new Error(`Azure returned ${response.status} on chunk ${chunkNumber}: ${detail.slice(0, 500)}`);
        error.retryable = false;
        throw error;
      }
      lastError = new Error(`Azure returned ${response.status} on chunk ${chunkNumber}: ${detail.slice(0, 500)}`);
    } catch (error) {
      if (error.retryable === false) throw error;
      lastError = error;
    } finally {
      clearTimeout(requestTimeout);
    }

    if (attempt < maxAttempts) {
      const delay = attempt * 1500;
      console.warn(`Chunk ${chunkNumber} did not complete on attempt ${attempt}. Retrying in ${delay} milliseconds.`);
      await wait(delay);
    }
  }

  throw lastError;
}

if (!ssmlOnly && !key) fail('AZURE_SPEECH_KEY is missing. Add it to .env.local.');
if (!ssmlOnly && !region) fail('AZURE_SPEECH_REGION is missing. Add it to .env.local.');
if (process.exitCode) process.exit();

const outputDir = join(process.cwd(), 'public', 'audio', 'deep-dive', LESSON_ID);
const audioPath = join(outputDir, `${CHAPTER_ID}.mp3`);
const manifestFileName = String(process.env.DEEP_DIVE_MANIFEST_NAME || 'manifest.json')
  .replace(/[^a-zA-Z0-9._-]/g, '') || 'manifest.json';
const manifestPath = join(outputDir, manifestFileName);
const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

const sourceParagraphs = script
  .split(/\n\s*\n/)
  .map((paragraph) => paragraph.replace(/[ \t\n]+/g, ' ').trim())
  .filter(Boolean);
const chunks = [];
let currentParagraphs = [];
let currentLength = 0;
for (const [index, paragraph] of sourceParagraphs.entries()) {
  if (paragraph.length > maxChunkCharacters) {
    throw new Error(`Source paragraph ${index + 1} is ${paragraph.length} characters; split the authored thought below ${maxChunkCharacters} before synthesis.`);
  }
  if (currentParagraphs.length && currentLength + paragraph.length + 2 > maxChunkCharacters) {
    chunks.push(currentParagraphs.join('\n\n'));
    currentParagraphs = [paragraph];
    currentLength = paragraph.length;
  } else {
    currentParagraphs.push(paragraph);
    currentLength += paragraph.length + (currentParagraphs.length > 1 ? 2 : 0);
  }
}
if (currentParagraphs.length) chunks.push(currentParagraphs.join('\n\n'));

console.log(`Generating ${LESSON_ID}/${CHAPTER_ID} with Azure voice ${voice} in ${region} in ${chunks.length} chunks of up to ${maxChunkCharacters} characters...`);

let allAudioBytes = [];
const allSsml = [];
for (let i = 0; i < chunks.length; i++) {
  console.log(`Generating chunk ${i + 1}/${chunks.length}...`);
  const isFirstChunk = i === 0;
  const voiceParameters = isHdVoice ? ' parameters="temperature=0.55"' : '';
  const body = buildNaturalSsml(chunks[i]);
  // Keep the performance natural: a subtle pace and pitch shift, then a
  // restrained calm style.  Larger slowdowns make DragonHD sound synthetic.
  const calmBody = `<prosody rate="-1%">${body}</prosody>`;
  const spokenBody = isHdVoice ? `<mstts:express-as style="calm" styledegree="0.4">${calmBody}</mstts:express-as>` : calmBody;
  const chunkSsml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-IN"><voice name="${xmlEscape(voice)}"${voiceParameters}>${isFirstChunk ? '<break time="700ms"/>' : ''}${spokenBody}</voice></speak>`;

  allSsml.push(chunkSsml);
  if (!ssmlOnly) allAudioBytes.push(await synthesizeChunk(chunkSsml, i + 1));
}

await mkdir(outputDir, { recursive: true });
const ssmlPath = join(outputDir, `${CHAPTER_ID}.ssml`);
const audioBytes = ssmlOnly ? null : Buffer.concat(allAudioBytes);
const scriptHash = createHash('sha256').update(script).digest('hex');
await writeFile(ssmlPath, `${allSsml.join('\n')}\n`);
if (!ssmlOnly) await writeFile(audioPath, audioBytes);
await writeFile(manifestPath, `${JSON.stringify({
  lessonId: LESSON_ID,
  provider: 'azure-speech',
  voice,
  region,
  modelId: 'DragonHDLatestNeural',
  audioQuality: 'Azure native 48kHz 192kbps MP3 with preserved paragraph boundaries and native punctuation flow',
  generatedAt: new Date().toISOString(),
  scriptHash,
  chapters: [{
    id: CHAPTER_ID,
    label: 'Full lesson narration',
    audio: ssmlOnly ? null : `/audio/deep-dive/${LESSON_ID}/${CHAPTER_ID}.mp3`,
    characters: script.length,
    openingPauseSeconds: 1,
    script,
  }],
}, null, 2)}\n`);

if (!ssmlOnly) console.log(`Wrote ${audioPath} (${audioBytes.length} bytes).`);
console.log(`Wrote ${ssmlPath}.`);
console.log(`Wrote ${manifestPath} (${script.length} characters).`);

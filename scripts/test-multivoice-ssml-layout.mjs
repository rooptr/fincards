import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const fixture = path.join(root, 'scratch', 'multivoice-layout-test.json');
const outputDirectory = path.join(root, 'public', 'audio', 'deep-dive', 'securitisation_masterclass');
const outputStem = 'episode-01-multivoice-layout-test';
const ssmlPath = path.join(outputDirectory, `${outputStem}.ssml`);
const manifestPath = path.join(outputDirectory, `${outputStem}.json`);

const script = [
  '[DIYA] The first turn carries one complete idea across several sentences. The borrower pays, the servicer records the collection, and the account receives it.',
  '[MEERA] The second turn changes perspective. The investor sees the same money only after legal rights and payment priority have done their work.',
  '[DIYA] The third turn forces another Azure request while remaining a complete spoken thought.',
].join('\n\n');

fs.writeFileSync(fixture, `${JSON.stringify({
  schemaVersion: 'test',
  episodes: [{ number: 1, title: 'Layout test', script }],
}, null, 2)}\n`);

const result = spawnSync('node', ['scripts/generate-securitisation-multivoice-audio-azure.mjs'], {
  cwd: root,
  encoding: 'utf8',
  env: {
    ...process.env,
    MULTIVOICE_SSML_ONLY: '1',
    MULTIVOICE_SCRIPT_FILE: fixture,
    MULTIVOICE_OUTPUT_TAG: 'layout-test',
    MULTIVOICE_CHUNK_SIZE: '230',
    MULTIVOICE_MAX_TURNS_PER_CHUNK: '1',
    SECURITISATION_EPISODE: '1',
  },
});

if (result.status !== 0) throw new Error(`Multi-voice SSML render failed: ${result.stderr || result.stdout}`);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (manifest.outputFormat !== 'audio-48khz-96kbitrate-mono-mp3') {
  throw new Error(`Expected the 96 kbps production default in the episode manifest, received: ${manifest.outputFormat}`);
}
const ssml = fs.readFileSync(ssmlPath, 'utf8');
if (ssml.includes('[DIYA]') || ssml.includes('[MEERA]')) throw new Error('Speaker labels leaked into SSML.');
if (ssml.includes('<break time="450ms"/>')) throw new Error('Later multi-voice requests must not add a transport-boundary pause.');
if ((ssml.match(/<p>/g) ?? []).length !== 3) throw new Error('Every coherent source turn must render as exactly one SSML paragraph.');

fs.rmSync(fixture, { force: true });
fs.rmSync(ssmlPath, { force: true });
fs.rmSync(manifestPath, { force: true });
console.log('Multi-voice SSML layout test passed.');

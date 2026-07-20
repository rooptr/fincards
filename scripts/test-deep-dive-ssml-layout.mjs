import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'scratch', 'ssml-layout-test.txt');
const lessonId = 'ssml_layout_test';
const chapterId = 'layout';
const outputDirectory = path.join(root, 'public', 'audio', 'deep-dive', lessonId);
const output = path.join(outputDirectory, `${chapterId}.ssml`);
const oversizedSource = path.join(root, 'scratch', 'ssml-layout-oversized-test.txt');

fs.writeFileSync(source, [[
  'First sentence sets up a realistic borrower payment and gives the listener enough context to hear a full natural thought before the next sentence arrives.',
  'The next sentence continues the same explanation without forcing a new paragraph, a new breath, or an abrupt restart in the middle of the idea.',
  'A third sentence carries the thought beyond the chunk boundary so the fixture exercises the chunking path as well.',
].join(' '), 'A new paragraph starts here. It must retain its own paragraph boundary.'].join('\n\n'));
const result = spawnSync('node', ['scripts/generate-deep-dive-audio-azure.mjs'], {
  cwd: root,
  encoding: 'utf8',
  env: {
    ...process.env,
    DEEP_DIVE_SSML_ONLY: '1',
    DEEP_DIVE_LESSON_ID: lessonId,
    DEEP_DIVE_CHAPTER_ID: chapterId,
    DEEP_DIVE_TEXT_FILE: source,
    DEEP_DIVE_CHUNK_SIZE: '500',
  },
});

if (result.status !== 0) throw new Error(`SSML-only render failed: ${result.stderr || result.stdout}`);
if (!fs.existsSync(output)) throw new Error('Expected SSML-only render to write an SSML file.');
const ssml = fs.readFileSync(output, 'utf8');
if (!ssml.includes('<p>First sentence sets up a realistic borrower payment and gives the listener enough context to hear a full natural thought before the next sentence arrives. The next sentence continues the same explanation without forcing a new paragraph, a new breath, or an abrupt restart in the middle of the idea. A third sentence carries the thought beyond the chunk boundary so the fixture exercises the chunking path as well.</p>')) {
  throw new Error(`Sentences from one source paragraph must remain in a single continuous SSML paragraph: ${ssml}`);
}
if ((ssml.match(/<p>/g) ?? []).length !== 2) throw new Error(`Expected two preserved paragraphs, received: ${ssml}`);
if (/<s>/.test(ssml)) throw new Error('Sentence tags should not be forced around natural narration.');
if (!ssml.includes('First sentence sets up a realistic borrower payment and gives the listener enough context to hear a full natural thought before the next sentence arrives. The next sentence continues the same explanation without forcing a new paragraph, a new breath, or an abrupt restart in the middle of the idea.')) throw new Error('Natural sentence punctuation was not preserved.');
if (ssml.includes('<break time="180ms"/>')) throw new Error('Later Azure requests must not add a transport-boundary pause.');

fs.writeFileSync(oversizedSource, 'This source paragraph is intentionally too long for its tiny transport limit. It contains several complete sentences, but the renderer must reject it instead of converting those sentences into independently paced paragraphs. The author must decide where the thought genuinely changes.');
const oversizedResult = spawnSync('node', ['scripts/generate-deep-dive-audio-azure.mjs'], {
  cwd: root,
  encoding: 'utf8',
  env: {
    ...process.env,
    DEEP_DIVE_SSML_ONLY: '1',
    DEEP_DIVE_LESSON_ID: 'ssml_oversized_test',
    DEEP_DIVE_CHAPTER_ID: 'oversized',
    DEEP_DIVE_TEXT_FILE: oversizedSource,
    DEEP_DIVE_CHUNK_SIZE: '120',
  },
});
if (oversizedResult.status === 0) throw new Error('Oversized source paragraphs must fail before synthesis.');
if (!`${oversizedResult.stderr}${oversizedResult.stdout}`.includes('split the authored thought')) {
  throw new Error(`Oversized paragraph failure must explain the authoring fix: ${oversizedResult.stderr || oversizedResult.stdout}`);
}

fs.rmSync(source, { force: true });
fs.rmSync(oversizedSource, { force: true });
fs.rmSync(outputDirectory, { recursive: true, force: true });
console.log('Deep Dive SSML layout test passed.');

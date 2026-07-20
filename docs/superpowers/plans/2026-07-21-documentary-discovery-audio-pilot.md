# Documentary Discovery Audio Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce gold-standard documentary-discovery scripts and paragraph-safe SSML for securitisation lesson 1 and episode 1 without changing the remaining lesson or episode prose.

**Architecture:** Tracked narrative briefs and tracked authored scripts become the source of truth for the two pilots. Existing pack generators retain their current output schemas but read the pilot overrides instead of manufacturing generic spoken framing. Shared code validates prose, questions, paragraph size, pronunciation surfaces, and greeting scope; renderers group complete source paragraphs or speaker turns into Azure transport chunks and never convert sentence boundaries into pacing boundaries.

**Tech Stack:** Node.js 22, JavaScript ES modules, PowerShell batch runner, Azure Speech REST, SSML, JSON script packs, Node `assert` tests.

## Global Constraints

- The lesson explains the concept; the case supplies evidence.
- Preserve all required technical, legal, evidence, stress, and application coverage.
- Use documentary momentum, human-scale mechanisms, causal revelation, reversals, perspective shifts, callbacks, and transfer instead of a question barrage.
- Spoken prose must not contain reusable teaching scaffolding or repeated template phrases.
- Lesson 1 alone begins with: `Hello Deepti. I hope you are preparing well and staying hydrated.`
- Single-narrator lessons use `en-IN-Diya:DragonHDLatestNeural`; episode 1 uses the approved Diya and Meera DragonHD pairing.
- `enhancePronunciation=true` remains disabled.
- A source paragraph is a coherent spoken thought. Sentence fragments must never become separate SSML paragraphs or Azure pacing units.
- A source paragraph may not exceed the configured Azure chunk limit; paragraphs above 1,200 characters fail editorial validation.
- Do not render lessons 2–25 or episodes 2–7 during this pilot.
- Preserve all unrelated dirty-worktree changes.

---

## File map

### New source-of-truth files

- `scripts/content/securitisation/documentary-briefs.json`: internal, non-spoken briefs for lesson 1 and episode 1.
- `scripts/content/securitisation/lesson-01-documentary.txt`: approved single-narrator paragraphs.
- `scripts/content/securitisation/episode-01-documentary.txt`: approved `[DIYA]` and `[MEERA]` turns.
- `scripts/lib/documentary-discovery-audit.js`: reusable prose and structure validators.
- `scripts/test-documentary-discovery-audit.mjs`: unit tests for the contract.
- `scripts/test-securitisation-pilot-content.mjs`: assertions over generated pilot packs.

### Existing files to modify

- `scripts/prepare-securitisation-lesson-one-zero-to-one.js`: copy the tracked lesson 1 source into the existing scratch compatibility artifacts and metadata.
- `scripts/prepare-securitisation-audio-scripts.js`: consume the tracked lesson 1 override while preserving paragraph boundaries.
- `scripts/prepare-securitisation-multivoice-episode-scripts.js`: consume the tracked episode 1 override; retain current generation for episodes 2–7.
- `scripts/audit-securitisation-audio-depth-v6.mjs`: call the shared documentary audit for pilot scripts.
- `scripts/generate-deep-dive-audio-azure.mjs`: group complete paragraphs only and remove later-request opening pauses.
- `scripts/generate-securitisation-multivoice-audio-azure.mjs`: remove later-request opening pauses while retaining coherent speaker turns.
- `scripts/test-deep-dive-ssml-layout.mjs`: assert transport chunking cannot split a thought into sentence paragraphs.
- `scripts/regenerate-securitisation-audio-batch.ps1`: no behavioral rewrite; verify its existing `StartLesson`, `EndLesson`, `SkipEpisodes`, and `SkipLessons` gates isolate the pilot.

### Generated files

- `scratch/securitisation_lesson_01_zero_to_one_v3.txt`
- `scratch/securitisation_lesson_01_zero_to_one_v3.json`
- `scratch/securitisation_masterclass_audio_scripts_v6.json`
- `scratch/securitisation_masterclass_audio_scripts_v6/lesson-01-securitization.txt`
- `scratch/securitisation_masterclass_multivoice_episode_scripts_v3.json`
- `scratch/securitisation_masterclass_multivoice_episode_audio_text_v3/episode-01.txt`
- pilot SSML, manifest, and MP3 outputs under `public/audio/deep-dive/`

---

### Task 1: Add the documentary-discovery audit contract

**Files:**
- Create: `scripts/lib/documentary-discovery-audit.js`
- Create: `scripts/test-documentary-discovery-audit.mjs`
- Modify: `scripts/audit-securitisation-audio-depth-v6.mjs`

**Interfaces:**
- Produces: `auditDocumentaryLesson({ lessonId, script, chunkLimit? }) -> string[]`
- Produces: `auditDocumentaryEpisode({ episodeNumber, script, chunkLimit? }) -> string[]`
- Consumes: generated lesson and episode `script` strings.

- [ ] **Step 1: Write failing contract tests**

Create fixtures that prove the audit rejects meta-teaching language, more than four lesson-facing questions, episode question density of twenty percent or more, paragraphs over 1,200 characters, a Deepti greeting outside lesson 1, and unsupported speaker labels. Include a valid fixture that uses contradiction and consequence without asking a question.

```js
import assert from 'node:assert/strict';
import {
  auditDocumentaryEpisode,
  auditDocumentaryLesson,
} from './lib/documentary-discovery-audit.js';

const natural = [
  'The borrower has paid. The investor can still face a delay.',
  'The missing link is collection control: payment must reach the account governed by the transaction.',
].join('\n\n');

assert.deepEqual(auditDocumentaryLesson({
  lessonId: 'generated_securitisation_securitization',
  script: natural,
}), []);

assert.ok(auditDocumentaryLesson({
  lessonId: 'generated_securitisation_cash_securitization',
  script: 'Hello Deepti. I hope you are preparing well and staying hydrated.',
}).some((error) => error.includes('greeting')));

assert.ok(auditDocumentaryLesson({
  lessonId: 'generated_securitisation_securitization',
  script: 'Consider the implication. What is this? Why now? Who pays? Who owns it? What fails?',
}).some((error) => error.includes('questions')));

const episode = Array.from({ length: 10 }, (_, index) =>
  `[${index % 2 ? 'MEERA' : 'DIYA'}] ${index < 2 ? 'Why?' : 'The cash moves through the controlled account.'}`
).join('\n\n');
assert.ok(auditDocumentaryEpisode({ episodeNumber: 1, script: episode })
  .some((error) => error.includes('question-ending')));
```

- [ ] **Step 2: Run the contract test and verify RED**

Run: `node scripts/test-documentary-discovery-audit.mjs`

Expected: FAIL because `scripts/lib/documentary-discovery-audit.js` does not exist.

- [ ] **Step 3: Implement the minimal shared validator**

Implement explicit prohibited patterns, paragraph extraction, question counts, speaker parsing, greeting scope, 1,200-character editorial maximum, and configured hard chunk limit.

```js
const prohibited = [
  /\bthis lesson\b/i,
  /\bthe local question\b/i,
  /\bwhen you look at the structure\b/i,
  /\bconsider the implication\b/i,
  /\bapply the mechanism to this question\b/i,
  /\bframe the answer as an investment-committee challenge\b/i,
  /\bnow reverse the assumption\b/i,
  /\bthat completes\b/i,
];

export function auditDocumentaryLesson({ lessonId, script, chunkLimit = 3000 }) {
  const errors = auditCommon(script, chunkLimit);
  const questions = script.match(/\?/g)?.length ?? 0;
  if (questions > 4) errors.push(`lesson has ${questions} listener-facing questions; maximum is 4`);
  const hasGreeting = /Hello Deepti\. I hope you are preparing well and staying hydrated\./i.test(script);
  if (lessonId !== 'generated_securitisation_securitization' && hasGreeting) {
    errors.push('Deepti greeting is allowed only in lesson 1');
  }
  return errors;
}

export function auditDocumentaryEpisode({ episodeNumber, script, chunkLimit = 8000 }) {
  const errors = auditCommon(script, chunkLimit);
  const turns = script.split(/\n\s*\n/).filter(Boolean);
  const invalid = turns.filter((turn) => !/^\[(DIYA|MEERA)\]\s+/.test(turn));
  if (invalid.length) errors.push(`episode ${episodeNumber} contains unsupported speaker turns`);
  const questionTurns = turns.filter((turn) => /\?\s*$/.test(turn)).length;
  if (turns.length && questionTurns / turns.length >= 0.2) {
    errors.push(`episode ${episodeNumber} has ${questionTurns}/${turns.length} question-ending turns; must remain below 20%`);
  }
  return errors;
}
```

- [ ] **Step 4: Run the test and verify GREEN**

Run: `node scripts/test-documentary-discovery-audit.mjs`

Expected: `Documentary discovery audit test passed.`

- [ ] **Step 5: Integrate the validator with the existing pack audit**

Import the two functions into `scripts/audit-securitisation-audio-depth-v6.mjs`. Apply the stricter contract only to lesson 1 and episode 1 during the pilot so unchanged scripts 2–25 and episodes 2–7 are not falsely represented as migrated.

- [ ] **Step 6: Verify integration**

Run: `node scripts/audit-securitisation-audio-depth-v6.mjs`

Expected before pilot content is written: FAIL with documentary-contract findings limited to lesson 1 and episode 1.

- [ ] **Step 7: Commit the audit contract**

```powershell
git add -- scripts/lib/documentary-discovery-audit.js scripts/test-documentary-discovery-audit.mjs scripts/audit-securitisation-audio-depth-v6.mjs
git commit -m "test: define documentary discovery narration contract"
```

---

### Task 2: Create tracked narrative briefs and pilot source wiring

**Files:**
- Create: `scripts/content/securitisation/documentary-briefs.json`
- Create: `scripts/content/securitisation/lesson-01-documentary.txt`
- Create: `scripts/content/securitisation/episode-01-documentary.txt`
- Modify: `scripts/prepare-securitisation-lesson-one-zero-to-one.js`
- Modify: `scripts/prepare-securitisation-audio-scripts.js`
- Modify: `scripts/prepare-securitisation-multivoice-episode-scripts.js`
- Test: `scripts/test-securitisation-pilot-content.mjs`

**Interfaces:**
- Produces: tracked UTF-8 paragraph-separated pilot scripts.
- Produces: the existing v6 lesson pack and v3 episode pack schemas unchanged.
- Consumes: `documentary-briefs.json` for editorial verification, not spoken narration.

- [ ] **Step 1: Write a failing source-wiring test**

The test must run both pack generators, read their generated JSON, and assert exact equality between the tracked pilot text and the generated pilot script. It must also assert that lessons 2–25 and episodes 2–7 retain their previous generated IDs and counts.

```js
const lessonSource = fs.readFileSync('scripts/content/securitisation/lesson-01-documentary.txt', 'utf8').trim();
const episodeSource = fs.readFileSync('scripts/content/securitisation/episode-01-documentary.txt', 'utf8').trim();
const lessons = JSON.parse(fs.readFileSync('scratch/securitisation_masterclass_audio_scripts_v6.json', 'utf8'));
const episodes = JSON.parse(fs.readFileSync('scratch/securitisation_masterclass_multivoice_episode_scripts_v3.json', 'utf8'));

assert.equal(lessons.lessons.length, 25);
assert.equal(episodes.episodes.length, 7);
assert.equal(lessons.lessons[0].script, lessonSource);
assert.equal(episodes.episodes[0].script, episodeSource);
```

- [ ] **Step 2: Run the source-wiring test and verify RED**

Run: `node scripts/test-securitisation-pilot-content.mjs`

Expected: FAIL because the tracked content files do not exist.

- [ ] **Step 3: Create the complete internal narrative briefs**

The JSON must contain these exact keys for each pilot: `humanSituation`, `openingPuzzle`, `prediction`, `controllingObject`, `misconception`, `definition`, `causalChain`, `namedEvidence`, `evidenceLimit`, `complications`, `technicalResponses`, `transferSituation`, `closingPrinciple`, `pronunciationRisks`, and `requiredCoverage`.

Lesson 1 uses the scooter-instalment model, follows one borrower instalment, introduces Kogta after the general mechanism, stresses legal transfer, servicing, borrower default, prepayment, and payment priority, transfers the reasoning to another receivable pool, and ends with the approved principle about funding, cash entitlement, and loss.

Episode 1 begins with one mortgage payment, follows the claim through originator, aggregator, SPV, servicer, trustee, and investor, uses the U.S. mortgage market as evidence, and sustains dialogue through perspective shifts and substantive corrections rather than interviewer prompts.

- [ ] **Step 4: Write the complete tracked pilot prose**

Author every paragraph and turn in full. Do not use generated placeholders, section headings, bracketed performance directions, or template transitions. Preserve every formal definition, mechanism, case fact, evidence boundary, stress path, and application requirement listed in each brief.

Lesson 1 must contain two to four direct questions. Episode 1 must keep question-ending turns below twenty percent. Every paragraph must end in punctuation and remain at or below 1,200 characters.

- [ ] **Step 5: Wire lesson 1 through the compatibility generator**

Make `prepare-securitisation-lesson-one-zero-to-one.js` read `scripts/content/securitisation/lesson-01-documentary.txt`, validate non-empty paragraphs, and write the existing scratch text and metadata paths. Keep `oldVersionsUntouched: true` and Diya voice metadata.

- [ ] **Step 6: Wire the lesson pack directly to the tracked source**

In `lessonScript()`, replace the scratch override path with the tracked content path and preserve each source paragraph. Do not pass the entire joined script through `spoken()` after paragraph assembly.

- [ ] **Step 7: Wire episode 1 while preserving episodes 2–7**

Add `episodeOneOverride = 'scripts/content/securitisation/episode-01-documentary.txt'`. In `buildEpisode(episode, number)`, return the trimmed override when `number === 1`; retain the existing `buildHumanEpisode` paths for numbers 2–7.

- [ ] **Step 8: Regenerate and verify GREEN**

Run:

```powershell
node scripts/prepare-securitisation-lesson-one-zero-to-one.js
node scripts/prepare-securitisation-audio-scripts.js
node scripts/prepare-securitisation-multivoice-episode-scripts.js
node scripts/test-securitisation-pilot-content.mjs
```

Expected: pack counts remain 25 and 7; the generated pilot scripts exactly equal their tracked sources.

- [ ] **Step 9: Commit source wiring and pilot prose**

```powershell
git add -- scripts/content/securitisation/documentary-briefs.json scripts/content/securitisation/lesson-01-documentary.txt scripts/content/securitisation/episode-01-documentary.txt scripts/prepare-securitisation-lesson-one-zero-to-one.js scripts/prepare-securitisation-audio-scripts.js scripts/prepare-securitisation-multivoice-episode-scripts.js scripts/test-securitisation-pilot-content.mjs
git commit -m "feat: author documentary discovery audio pilots"
```

---

### Task 3: Make Azure transport boundaries pacing-neutral

**Files:**
- Modify: `scripts/generate-deep-dive-audio-azure.mjs`
- Modify: `scripts/generate-securitisation-multivoice-audio-azure.mjs`
- Modify: `scripts/test-deep-dive-ssml-layout.mjs`
- Create: `scripts/test-multivoice-ssml-layout.mjs`

**Interfaces:**
- Consumes: paragraph-separated lesson script and turn-separated episode script.
- Produces: SSML in which source paragraphs and turns remain intact.
- Produces: no artificial opening pause on Azure requests after request one.

- [ ] **Step 1: Extend the lesson SSML test and verify RED**

Add assertions that a later SSML request does not begin with `<break time="180ms"/>`, that no source paragraph is split into multiple `<p>` elements, and that an oversized paragraph fails with a clear authoring error rather than being split by `Intl.Segmenter`.

- [ ] **Step 2: Add the multi-voice SSML test and verify RED**

Use a temporary two-speaker fixture with a small chunk size. Assert each source turn appears in one `<p>`, later chunks do not begin with `<break time="450ms"/>`, and no `[DIYA]` or `[MEERA]` marker leaks into SSML.

Run:

```powershell
node scripts/test-deep-dive-ssml-layout.mjs
node scripts/test-multivoice-ssml-layout.mjs
```

Expected: FAIL on later-request pauses and oversized-paragraph handling.

- [ ] **Step 3: Replace sentence fallback with explicit paragraph validation**

In the lesson renderer, remove `Intl.Segmenter` and the `continuesParagraph` path. Before chunk assembly, throw when `paragraph.length > maxChunkCharacters`:

```js
for (const [index, paragraph] of sourceParagraphs.entries()) {
  if (paragraph.length > maxChunkCharacters) {
    throw new Error(`Source paragraph ${index + 1} is ${paragraph.length} characters; split the authored thought below ${maxChunkCharacters} before synthesis.`);
  }
}
```

Pack complete paragraphs separated by `\n\n`. This makes a source edit—not a transport heuristic—the only way to create a new spoken paragraph.

- [ ] **Step 4: Remove later-request pauses**

Keep the initial lesson opening pause, but use an empty string for later requests:

```js
const requestOpening = isFirstChunk ? '<break time="700ms"/>' : '';
```

In the multi-voice renderer, retain the first episode opening pause and use an empty string for the first turn of later chunks.

- [ ] **Step 5: Verify GREEN**

Run both SSML layout tests. Expected: both print their pass message with zero leaked speaker labels, zero sentence fragmentation, and zero later-request opening pauses.

- [ ] **Step 6: Commit renderer continuity protection**

```powershell
git add -- scripts/generate-deep-dive-audio-azure.mjs scripts/generate-securitisation-multivoice-audio-azure.mjs scripts/test-deep-dive-ssml-layout.mjs scripts/test-multivoice-ssml-layout.mjs
git commit -m "fix: keep Azure transport boundaries pacing neutral"
```

---

### Task 4: Run the complete static pilot gate

**Files:**
- Verify: `scripts/audit-azure-narration-surface.mjs`
- Verify: `scripts/test-securitisation-voice-profile.mjs`
- Generated: scratch pilot packs and SSML-only artifacts.

**Interfaces:**
- Consumes: tracked pilot sources, generated packs, renderers.
- Produces: a clean static gate before paid/network synthesis.

- [ ] **Step 1: Run all preparation and contract checks**

```powershell
node scripts/prepare-securitisation-lesson-one-zero-to-one.js
node scripts/prepare-securitisation-audio-scripts.js
node scripts/prepare-securitisation-multivoice-episode-scripts.js
node scripts/test-documentary-discovery-audit.mjs
node scripts/test-securitisation-pilot-content.mjs
node scripts/audit-securitisation-audio-depth-v6.mjs
node scripts/audit-azure-narration-surface.mjs
node scripts/test-securitisation-voice-profile.mjs
node scripts/test-deep-dive-ssml-layout.mjs
node scripts/test-multivoice-ssml-layout.mjs
```

Expected: every command exits `0` and reports no errors.

- [ ] **Step 2: Generate lesson 1 SSML only**

```powershell
$env:DEEP_DIVE_SSML_ONLY = '1'
$env:DEEP_DIVE_SCRIPT_PACK_FILE = 'scratch/securitisation_masterclass_audio_scripts_v6.json'
$env:DEEP_DIVE_SCRIPT_LESSON_ID = 'generated_securitisation_securitization'
$env:DEEP_DIVE_LESSON_ID = 'generated_securitisation_securitization'
$env:DEEP_DIVE_CHAPTER_ID = 'lesson-01-human-pilot'
$env:DEEP_DIVE_CHUNK_SIZE = '3000'
$env:AZURE_SPEECH_VOICE = 'en-IN-Diya:DragonHDLatestNeural'
node --env-file=.env.local scripts/generate-deep-dive-audio-azure.mjs
```

Expected: SSML and manifest are written without contacting Azure.

- [ ] **Step 3: Generate episode 1 SSML only**

```powershell
$env:MULTIVOICE_SSML_ONLY = '1'
$env:MULTIVOICE_SCRIPT_FILE = 'scratch/securitisation_masterclass_multivoice_episode_scripts_v3.json'
$env:MULTIVOICE_OUTPUT_TAG = 'documentary-pilot'
$env:SECURITISATION_EPISODE = '1'
node --env-file=.env.local scripts/generate-securitisation-multivoice-audio-azure.mjs
```

Expected: episode SSML and manifest are written without contacting Azure.

- [ ] **Step 4: Inspect SSML invariants**

Verify no source speaker markers, unsupported cues, `enhancePronunciation=true`, raw deal identifiers, sentence-level `<p>` fragmentation, or later-chunk opening pauses appear. Verify the Deepti phoneme element and Diya/Meera voice names are present where required.

- [ ] **Step 5: Commit any audit correction only if a static gate exposed one**

Stage exact files. Do not stage generated MP3s, unrelated scratch files, or unrelated workspace changes.

---

### Task 5: Synthesize and complete-listen the two pilots

**Files:**
- Generate: `public/audio/deep-dive/generated_securitisation_securitization/lesson-01-human-pilot.mp3`
- Generate: `public/audio/deep-dive/securitisation_masterclass/episode-01-multivoice-documentary-pilot.mp3`
- Generate: matching SSML and manifest files.

**Interfaces:**
- Consumes: Azure credentials from `.env.local` and statically approved pilot scripts.
- Produces: two isolated pilot audio artifacts; existing production audio remains untouched until approval.

- [ ] **Step 1: Synthesize lesson 1 under a pilot chapter ID**

Run the lesson command from Task 4 with `DEEP_DIVE_SSML_ONLY` removed and keep `DEEP_DIVE_CHAPTER_ID=lesson-01-human-pilot`.

Expected: Azure returns every chunk and writes a complete pilot MP3, SSML, and matching script hash.

- [ ] **Step 2: Synthesize episode 1 under a pilot output tag**

Run the episode command from Task 4 with `MULTIVOICE_SSML_ONLY` removed and keep `MULTIVOICE_OUTPUT_TAG=documentary-pilot`.

Expected: Azure returns every chunk and writes a complete pilot MP3, SSML, and matching script hash.

- [ ] **Step 3: Verify artifact integrity**

Check that both MP3 files are non-empty, manifests identify the approved voices, script hashes match the current generated pack text, and no partial render replaced an existing production artifact.

- [ ] **Step 4: Complete-listen lesson 1**

Listen from the greeting through the closing. Record exact timestamps for attention drops, early definitions, unclear analogy boundaries, robotic transitions, question fatigue, unnatural breaths, request-boundary resets, shouts, and pronunciation failures.

- [ ] **Step 5: Complete-listen episode 1**

Listen from the opening payment through the closing. Record exact timestamps for excessive speaker switching, interviewer rhythm, repeated prompts, lost documentary continuity, audio joins, and pronunciation failures.

- [ ] **Step 6: Revise the tracked source—not generated output—for every accepted finding**

Regenerate packs, rerun the complete static gate, resynthesize only the affected pilot, and listen again from start to finish.

- [ ] **Step 7: Stop at the gold-standard approval gate**

Do not overwrite production lesson 1, do not render lessons 2–25, and do not render episodes 2–7 until the user explicitly approves both pilot recordings.

---

### Task 6: Prepare the full-series rollout plan after pilot approval

**Files:**
- Create after approval: `docs/superpowers/plans/2026-07-21-documentary-discovery-full-series.md`

**Interfaces:**
- Consumes: approved pilot briefs, prose patterns, audit results, and audio QA findings.
- Produces: lesson-by-lesson and episode-by-episode rollout plan for the remaining series.

- [ ] **Step 1: Extract approved principles, not repeated prose**

Record which discovery devices, paragraph lengths, question density, speaker-turn patterns, pronunciation decisions, and evidence transitions passed listening review.

- [ ] **Step 2: Create an individual brief for every remaining lesson and episode**

Each brief must specify a different human-scale situation, puzzle, controlling object, misconception, case function, complications, transfer situation, closing principle, and pronunciation-risk list.

- [ ] **Step 3: Plan staged rollout and review**

Group scripts into small editorial batches. Every batch regenerates text packs, passes all automated gates, receives complete listening review, and is approved before the next batch renders.

- [ ] **Step 4: Commit the full-series plan separately**

```powershell
git add -- docs/superpowers/plans/2026-07-21-documentary-discovery-full-series.md
git commit -m "docs: plan documentary discovery series rollout"
```

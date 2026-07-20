# Documentary Discovery Full-Series Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Securitisation Lessons 2–25 and Episodes 2–7 to the approved documentary-discovery standard, make 48 kHz/96 kbps the production default, and prepare audited text packs without synthesizing audio.

**Architecture:** Every lesson and episode is a tracked, individually authored source file selected through one documentary catalog. Preparation scripts assemble those exact sources without adding generic teaching prose. Automated audits enforce curriculum coverage, natural narration, paragraph continuity, voice rules, and complete catalog coverage before any later Azure batch render.

**Tech Stack:** Node.js ES modules and scripts, JSON content catalogs, plain-text narration sources, Azure Speech REST renderer configuration, PowerShell batch entrypoint.

## Global Constraints

- Preserve all twenty-five lessons and all seven episodes in the existing study order.
- Lesson 1 and Episode 1 remain the approved gold-standard sources unless a regression fix is necessary.
- Lessons use `en-IN-Diya:DragonHDLatestNeural`; episodes use Diya and Meera only.
- Default Azure output is `audio-48khz-96kbitrate-mono-mp3`.
- Do not call Azure or create MP3 files during this rollout.
- Each concept begins concrete-before-abstract, follows cash, rights, timing, control, or loss, and uses named evidence only after the mechanism is understandable.
- The concept is the teaching subject; a case is supporting evidence.
- No template narration, production language, section announcements, question barrage, acting cues, fake companies, or unsupported transaction conclusions.
- Source paragraphs are coherent spoken thoughts, stay below 1,200 characters, and are never divided into sentence fragments for Azure transport.
- Lesson 1 alone contains the Deepti greeting.
- Each tappable term requires only a concise definition and a concrete example; synchronized transcript timing is a later player task and is not fabricated before audio exists.

---

### Task 1: Lock the 96 kbps renderer default

**Files:**
- Modify: `scripts/generate-deep-dive-audio-azure.mjs`
- Modify: `scripts/generate-securitisation-multivoice-audio-azure.mjs`
- Modify: `scripts/test-deep-dive-ssml-layout.mjs`
- Modify: `scripts/test-multivoice-ssml-layout.mjs`

**Interfaces:**
- Consumes: `AZURE_SPEECH_OUTPUT_FORMAT` when explicitly supplied.
- Produces: manifests whose `outputFormat` matches the allow-listed Azure request format; default is `audio-48khz-96kbitrate-mono-mp3`.

- [ ] **Step 1: Add failing assertions for the 96 kbps default and explicit 192 kbps override**
- [ ] **Step 2: Run both SSML layout tests and confirm the new assertions fail for the missing default or manifest field**
- [ ] **Step 3: Use one allow-listed output-format constant for the Azure header and manifest in both renderers**
- [ ] **Step 4: Run both SSML layout tests and confirm they pass without calling Azure**
- [ ] **Step 5: Commit the renderer and test changes with `git commit -m "feat: default documentary audio to 96kbps"`**

### Task 2: Make authored documentary sources the only script input

**Files:**
- Create: `scripts/content/securitisation/documentary-catalog.json`
- Modify: `scripts/content/securitisation/documentary-briefs.json`
- Create: `scripts/test-securitisation-documentary-catalog.mjs`
- Modify: `scripts/prepare-securitisation-audio-scripts.js`
- Modify: `scripts/prepare-securitisation-multivoice-episode-scripts.js`

**Interfaces:**
- Consumes: catalog records `{ number, id, sourceFile, briefId }` for 25 lessons and `{ number, sourceFile, briefId }` for seven episodes.
- Produces: lesson and episode packs whose `script` fields exactly equal their tracked source files after newline normalization.

- [ ] **Step 1: Write a failing catalog test requiring 25 unique lessons, seven unique episodes, existing source paths, and exact source-to-pack equality**
- [ ] **Step 2: Run the test and confirm it fails because the complete catalog and sources do not exist**
- [ ] **Step 3: Add the complete ordered catalog and make both preparation scripts read it without appending generated prose**
- [ ] **Step 4: Run the catalog test and keep it failing only on the not-yet-authored source files**
- [ ] **Step 5: Commit the catalog contract and assembly changes with `git commit -m "refactor: assemble securitisation scripts from authored sources"` after all sources in Tasks 3–8 exist**

### Task 3: Author the remainder of Episode 1

**Files:**
- Create: `scripts/content/securitisation/lesson-02-cash-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-03-term-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-04-conduit-securitisation.txt`
- Modify: `scripts/content/securitisation/documentary-briefs.json`

**Interfaces:**
- Consumes: existing curriculum records and authoritative RBI/SEC evidence metadata.
- Produces: three standalone Diya scripts completing the financing-architecture album chapter.

- [ ] **Step 1: Add individual briefs covering the puzzle, controlling object, reversal, evidence boundary, complications, transfer, terminology, and required curriculum points**
- [ ] **Step 2: Author Lesson 2 around whether assets or risk actually move in a cash transaction**
- [ ] **Step 3: Author Lesson 3 around a static pool whose financing life is defined at closing**
- [ ] **Step 4: Author Lesson 4 around a funding vehicle that repeatedly purchases eligible assets without turning the explanation into a structural catalogue**
- [ ] **Step 5: Run the documentary lesson audit for Lessons 1–4 and fix every prose, question-density, paragraph, and coverage failure**

### Task 4: Author Episode 2 and Lessons 5–8

**Files:**
- Create: `scripts/content/securitisation/lesson-05-originator.txt`
- Create: `scripts/content/securitisation/lesson-06-special-purpose-vehicle.txt`
- Create: `scripts/content/securitisation/lesson-07-bankruptcy-remoteness.txt`
- Create: `scripts/content/securitisation/lesson-08-servicer.txt`
- Create: `scripts/content/securitisation/episode-02-documentary.txt`
- Modify: `scripts/content/securitisation/documentary-briefs.json`

**Interfaces:**
- Produces: four Diya lessons and one Diya/Meera episode tracing ownership, insolvency isolation, collection control, and servicing continuity.

- [ ] **Step 1: Add five individual briefs with distinct human-scale models and controlling objects**
- [ ] **Step 2: Author Lessons 5–8 with originator obligations, SPV separateness, true-sale limits, commingling, servicing replacement, and evidence limits intact**
- [ ] **Step 3: Author Episode 2 as a continuous failure-day investigation rather than an interview or recap**
- [ ] **Step 4: Run lesson and episode audits for this batch and remove repeated phrasing across all completed sources**

### Task 5: Author Episode 3 and Lessons 9–13

**Files:**
- Create: `scripts/content/securitisation/lesson-09-auto-loan-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-10-credit-card-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-11-npl-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-12-non-qualified-mortgage-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-13-whole-business-securitisation.txt`
- Create: `scripts/content/securitisation/episode-03-documentary.txt`
- Modify: `scripts/content/securitisation/documentary-briefs.json`

**Interfaces:**
- Produces: five collateral-specific lessons and one episode showing why the asset label never substitutes for cash-flow behaviour.

- [ ] **Step 1: Add six briefs that use different physical models, prediction points, evidence anchors, and transfer settings**
- [ ] **Step 2: Author Lessons 9–13 with the required distinctions among amortising loans, revolving receivables, recoveries, heterogeneous underwriting, and operating-business cash flow**
- [ ] **Step 3: Author Episode 3 by comparing five cash engines without listing them as definitions**
- [ ] **Step 4: Audit curriculum coverage, evidence boundaries, paragraph size, and cross-script phrase repetition**

### Task 6: Author Episode 4 and Lessons 14–17

**Files:**
- Create: `scripts/content/securitisation/lesson-14-pass-through-structure.txt`
- Create: `scripts/content/securitisation/lesson-15-pay-through-structure.txt`
- Create: `scripts/content/securitisation/lesson-16-payment-waterfall.txt`
- Create: `scripts/content/securitisation/lesson-17-securitisation-waterfall.txt`
- Create: `scripts/content/securitisation/episode-04-documentary.txt`
- Modify: `scripts/content/securitisation/documentary-briefs.json`

**Interfaces:**
- Produces: four lessons and one episode following one collection from collateral receipt through distribution and stress-state allocation.

- [ ] **Step 1: Add five briefs that distinguish transmission, reshaping, contractual priority, and period-by-period modeling**
- [ ] **Step 2: Author Lessons 14–17 with principal/interest separation, fees, reserves, triggers, cures, and timing consequences**
- [ ] **Step 3: Author Episode 4 as one payment-day documentary with coherent speaker handoffs**
- [ ] **Step 4: Audit against generic waterfall language and verify every step changes cash, timing, control, or loss**

### Task 7: Author Episodes 5–6 and Lessons 18–23

**Files:**
- Create: `scripts/content/securitisation/lesson-18-tranching.txt`
- Create: `scripts/content/securitisation/lesson-19-pro-rata-pay.txt`
- Create: `scripts/content/securitisation/lesson-20-re-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-21-regulatory-capital-relief.txt`
- Create: `scripts/content/securitisation/lesson-22-synthetic-securitisation.txt`
- Create: `scripts/content/securitisation/lesson-23-sts-securitisation.txt`
- Create: `scripts/content/securitisation/episode-05-documentary.txt`
- Create: `scripts/content/securitisation/episode-06-documentary.txt`
- Modify: `scripts/content/securitisation/documentary-briefs.json`

**Interfaces:**
- Produces: six lessons and two episodes separating loss order, amortisation order, second-layer structuring, capital recognition, unfunded risk transfer, and regulatory standardisation.

- [ ] **Step 1: Add eight briefs with concept-specific reversals and evidence limits**
- [ ] **Step 2: Author Lessons 18–19 and Episode 5 around finite protection and the changing thickness of subordination**
- [ ] **Step 3: Author Lessons 20–23 and Episode 6 around opacity, genuine risk transfer, counterparty exposure, and the limits of regulatory labels**
- [ ] **Step 4: Audit for false claims that structure creates quality, accounting treatment equals risk transfer, or STS means risk-free**

### Task 8: Author Episode 7 and Lessons 24–25

**Files:**
- Create: `scripts/content/securitisation/lesson-24-psa-prepayment-model.txt`
- Create: `scripts/content/securitisation/lesson-25-talf.txt`
- Create: `scripts/content/securitisation/episode-07-documentary.txt`
- Modify: `scripts/content/securitisation/documentary-briefs.json`

**Interfaces:**
- Produces: two lessons and one episode connecting borrower timing, expected life, reinvestment risk, funding liquidity, and central-bank market support.

- [ ] **Step 1: Add three briefs with separate timing and liquidity mechanisms**
- [ ] **Step 2: Author Lesson 24 so PSA is unmistakably a convention rather than a borrower forecast**
- [ ] **Step 3: Author Lesson 25 around the difference between sound collateral and a frozen funding market**
- [ ] **Step 4: Author Episode 7 as a closing arc in which time itself becomes the controlling object**
- [ ] **Step 5: Audit the batch and ensure the final episode closes the album without generic course-completion language**

### Task 9: Enforce the full-series documentary contract

**Files:**
- Modify: `scripts/lib/documentary-discovery-audit.js`
- Modify: `scripts/test-documentary-discovery-audit.mjs`
- Modify: `scripts/audit-securitisation-audio-depth-v6.mjs`
- Modify: `scripts/test-securitisation-documentary-catalog.mjs`

**Interfaces:**
- Consumes: all 25 authored lesson scripts and all seven authored episode scripts.
- Produces: a failing exit code for missing scripts, template/meta language, duplicate openings or closings, paragraph overflow, question saturation, invalid speakers, curriculum omissions, or pack/source mismatch.

- [ ] **Step 1: Add failing tests that audit every catalog entry instead of only Lesson 1 and Episode 1**
- [ ] **Step 2: Add cross-script duplicate-opening, duplicate-closing, prohibited-phrase, and required-term coverage checks**
- [ ] **Step 3: Run the full audit and edit source prose rather than weakening valid checks**
- [ ] **Step 4: Confirm the prepared packs preserve 25 lessons and seven episodes with exact source hashes**

### Task 10: Verify the text-only rollout

**Files:**
- Verify only; do not create MP3 or SSML artifacts.

**Interfaces:**
- Produces: evidence that the complete authored text collection is ready for the user's later audio generation.

- [ ] **Step 1: Run `node scripts/prepare-securitisation-audio-scripts.js` and require 25 lessons**
- [ ] **Step 2: Run `node scripts/prepare-securitisation-episode-scripts.js` followed by `node scripts/prepare-securitisation-multivoice-episode-scripts.js` and require seven episodes**
- [ ] **Step 3: Run `node scripts/test-securitisation-documentary-catalog.mjs`**
- [ ] **Step 4: Run `node scripts/test-documentary-discovery-audit.mjs`**
- [ ] **Step 5: Run `node scripts/audit-securitisation-audio-depth-v6.mjs`**
- [ ] **Step 6: Run `node scripts/audit-azure-narration-surface.mjs`**
- [ ] **Step 7: Run `node scripts/test-securitisation-voice-profile.mjs`**
- [ ] **Step 8: Run both SSML layout tests in SSML-only mode and confirm no Azure request occurs**
- [ ] **Step 9: Run scoped `git diff --check` for every file changed by this rollout**
- [ ] **Step 10: Report every rewritten lesson and episode, the exact command the user can later run, and explicitly state that no audio was synthesized**

# Documentary Discovery Teaching System

## Goal

Make the securitisation masterclass captivating from beginning to end without reducing its technical depth, turning it into a quiz, or letting a named case replace the concept being taught.

The intended experience is a documentary guided by an unusually perceptive teacher. The learner should repeatedly feel that an opaque financial mechanism has become visible. Interest comes from discovery, contradiction, consequence, perspective, and payoff rather than constant questions or artificial drama.

## Scope

This design governs:

- all twenty-five single-narrator securitisation lessons;
- all seven multi-voice securitisation episodes;
- the source-script preparation pipeline;
- narration and pronunciation cleanup;
- Azure SSML paragraphing and request chunking;
- editorial and automated acceptance checks.

The first implementation milestone is a gold-standard rewrite and render of lesson 1 and episode 1. The remaining lessons and episodes are rewritten only after those two establish the approved teaching and audio standard.

## Non-goals

- Do not shorten lessons merely to increase pace.
- Do not remove technical definitions, legal mechanics, evidence limits, calculations, stress logic, interview usefulness, or application.
- Do not imitate dialogue or scenes from *3 Idiots* or *Good Will Hunting*. Their relevant quality is the teaching posture: concrete demonstration, intellectual surprise, causal clarity, confidence, and respect for the learner.
- Do not manufacture fictional companies, fake transactions, unsupported stakes, or cinematic filler.
- Do not turn the lesson into a sequence of questions.
- Do not add giggles, breaths, acting directions, paralinguistic cues, or theatrical SSML effects.

## Governing teaching doctrine

The lesson explains the concept; the case supplies evidence.

Every concept begins with a human-scale economic situation that exposes the problem before the technical label appears. The narration then follows the relevant cash, legal right, risk, or decision through the mechanism. A named real transaction or event enters only after the learner has a usable mental model. It may validate the mechanism, reveal a complication, establish a boundary, or demonstrate a failure. It never becomes a substitute for the general explanation.

The content remains professional. “Simple” means properly sequenced and causally visible, not incomplete, childish, or imprecise.

## The invisible lesson architecture

The following architecture controls reasoning, not wording. It must never be exposed as spoken headings or repeated with identical transitions.

### 1. Enter through a puzzle

Begin inside a concrete financial condition whose result is not immediately obvious. The opening should create a real information gap, such as a profitable lender running short of deployable cash despite receiving instalments.

The puzzle must be economically legitimate. It cannot depend on withholding an obvious fact merely to create suspense.

### 2. Shrink the system

Construct a human-scale model with familiar actors, visible money, and one clear decision. For securitisation, a shop selling scooters on instalments can show the difference between earning future payments and possessing cash today.

The model must identify:

- who pays;
- who currently owns the right to payment;
- when the money arrives;
- why someone wants the timing or ownership to change.

### 3. Invite one meaningful prediction

Give the learner one decision worth attempting before the explanation. This is not a quiz and does not require an explicit answer. It creates a mental commitment that the reveal can refine.

Questions are scarce by design. A single prediction is preferable to a cluster of rhetorical questions.

### 4. Name the concept after the mechanism is visible

Introduce the technical term only after the learner understands the problem it solves. State the intuitive meaning first, then provide the precise financial definition. The definition must add legal or economic precision rather than repeat the analogy.

### 5. Follow the controlling object

Choose the object that makes the mechanism visible and follow it without skipping handoffs. Depending on the topic, that object may be one rupee, one borrower payment, one contractual right, one loss, one trigger state, or one tranche balance.

Each institutional role enters when the object encounters a need or risk. Originator, SPV, servicer, trustee, accounts, enhancement, triggers, and waterfall priorities are introduced as functional parts of the mechanism rather than a list of definitions.

### 6. Sustain discovery in waves

After the initial reveal, the lesson continues through a series of causal waves:

1. establish the learner's current understanding;
2. expose a limitation, contradiction, or changed condition;
3. reveal the deeper mechanism or protection;
4. show the consequence for cash, control, timing, or loss;
5. consolidate briefly before moving deeper.

These waves are not fixed sections and must not use repeated prose. One wave may begin with a contradiction, another with a change of perspective, another with evidence, and another with a stress event.

Every substantial technical passage must contain narrative movement. A long explanation cannot remain a static catalogue of facts.

### 7. Introduce named evidence

Bring in the named real transaction only when the learner can understand what it demonstrates. The narration must distinguish:

- what the source directly establishes;
- what can reasonably be inferred;
- what remains unavailable;
- which conclusion would require additional transaction data or contractual terms.

Figures must be spoken naturally. Deal identifiers, dates, percentages, acronyms, and units must pass pronunciation review before synthesis.

### 8. Stress the mechanism

Change one meaningful assumption at a time and trace the consequence. A borrower delay, servicer failure, invalid transfer, depleted reserve, breached trigger, accelerated prepayment, or changed waterfall should visibly alter the object being followed.

Risk is not announced as a separate checklist. It appears when something threatens a mechanism the learner already understands. Protection appears as the transaction's response, with its limits stated.

### 9. Transfer understanding

Present a different situation that preserves the same underlying mechanism. Let the narration walk far enough for the learner to recognise the pattern, then leave one small inferential step for the learner.

Transfer replaces a conventional end-of-lesson quiz. It tests whether the learner can use the concept outside the named case.

### 10. Complete the arc

Return to the opening puzzle and show what is now visible. End with one concise principle that compresses the mechanism and its most important limitation. The closing line must be specific to the concept and cannot be generated from a reusable sentence template.

## Continuous engagement devices

Interest must be renewed throughout the lesson. Writers may use the following devices, but must vary their order, frequency, scale, and phrasing.

### Contradiction

Place two true facts beside each other when their coexistence requires explanation. Example: a borrower has paid, yet an investor can still experience a payment delay.

### Reversal

Correct an intuitive but incomplete belief. Examples include early principal creating reinvestment risk, additional collateral failing to guarantee safety, or a senior rating coexisting with weak underlying loans.

### Perspective shift

Show how the same object changes meaning across parties. One instalment can be an obligation to the borrower, a receivable to the lender, collateral to the vehicle, and repayment to the investor.

### Progressive disclosure

Reveal only the next necessary layer. Each solution should expose the next legitimate problem: pooling does not establish ownership; legal transfer does not collect cash; servicing does not eliminate borrower default; enhancement absorbs only a finite amount of loss.

### Concrete demonstration

Use a physically or socially familiar model to make an abstract mechanism manipulable. A waterfall can resemble a payment queue and subordination can resemble layers absorbing impact. Immediately state the mapping and its boundary so the analogy does not become the definition.

### Consequence

Attach every technical feature to an observable change in cash amount, cash timing, legal ownership, control, information, or loss allocation.

### Callback and payoff

Return to an earlier object or image after the learner has acquired more precision. The callback should reveal how much additional structure is now visible, not merely repeat the opening.

### Pattern compression

Occasionally restate a complex chain in a shorter, more powerful form. Compression should feel like earned clarity after the explanation, not a slogan offered in place of it.

## Attention rhythm

Long lessons should breathe in alternating modes:

- scene or concrete observation;
- causal explanation;
- technical precision;
- complication or reversal;
- evidence;
- brief consolidation.

The sequence is flexible. The objective is to avoid both continuous intensity and long static exposition. A listener needs moments of resolution before the next information gap opens.

As an editorial guideline, no passage should remain in one explanatory mode for several minutes without a meaningful change in perspective, evidence, causal state, or consequence. This is reviewed by listening and editing, not enforced by inserting stock transitions at fixed word counts.

## Question discipline

Questions must cause thought, not simulate engagement.

For a single-narrator lesson:

- target two to four deliberate listener-facing questions across the full lesson;
- reserve them for prediction, a major decision pivot, or transfer;
- do not place rhetorical questions back-to-back;
- answer or advance every question before introducing another.

For a multi-voice episode:

- questions arise from genuine disagreement, clarification, or a decision;
- fewer than one fifth of speaker turns should end as questions;
- do not use repeated interviewer prompts;
- a speaker may advance the explanation through observation, correction, analogy, evidence, or consequence without forcing the other speaker to ask permission.

Automated checks may flag question density and repeated openings, but editorial review decides whether each surviving question earns its place.

## Retention design

Retention is embedded in the narrative rather than appended as a quiz block.

- **Prediction:** the learner forms an initial model before the reveal.
- **Causal tracing:** the learner follows cash, rights, timing, and losses across handoffs.
- **Elaboration:** the narration connects the mechanism to a familiar situation and then to a real transaction.
- **Contrast:** related concepts are distinguished at the moment confusion becomes likely.
- **Callback:** an earlier image is revisited with greater precision.
- **Transfer:** the learner encounters the mechanism in a different setting.
- **Compression:** the ending preserves one durable explanatory principle.

Definitions remain explicit and technically correct. Retention devices organize those definitions; they do not replace them.

## Prose contract

Every spoken paragraph must sound individually written for the idea it carries.

Prohibited spoken scaffolding includes, but is not limited to:

- “this lesson”;
- “the local question”;
- “when you look at the structure”;
- “consider the implication”;
- “apply the mechanism to this question”;
- “frame the answer as an investment-committee challenge”;
- “now reverse the assumption”;
- “that completes”;
- announcements of sections, evidence boundaries, source packs, or teaching modes.

Additional prose rules:

- Do not reuse the same opening, transition, question, stress introduction, or closing construction across lessons.
- Do not announce what will be taught before creating a reason to learn it.
- Do not use generic motivational language, fake suspense, exaggerated danger, or decorative cultural references.
- Use named cultural or historical references only when their mechanism maps precisely to the finance and adds explanatory value.
- Prefer concrete nouns and active causal verbs.
- Vary sentence length naturally. Fragments may be used only when they sound intentional in a continuous performance, never as isolated generated units.
- Avoid dense runs of definitions. Introduce a term when the mechanism requires it, define it precisely, and immediately show its consequence.
- Preserve Indian-English clarity without caricature, forced Hindi, or awkward localisation.
- The lesson 1 greeting to Deepti remains unique to lesson 1. Other lessons do not repeat it.

Generic code may normalize punctuation, pronunciation, numbers, and unsupported cues. It may validate the narrative contract. It must not manufacture shared spoken framing. Each lesson requires its own narrative brief and authored transitions.

## Narrative brief for each lesson

Before prose is written, each lesson receives a compact internal brief containing:

- the human-scale situation;
- the opening puzzle;
- the initial prediction or decision;
- the controlling object to follow;
- the central misconception or reversal;
- the precise definition;
- the causal chain;
- the named evidence and what it proves;
- the evidence limitation;
- two or more meaningful complications;
- the technical responses and their limits;
- the transfer situation;
- the closing principle;
- terminology and pronunciation risks;
- required curriculum points that cannot be omitted.

These fields are planning inputs, not spoken labels. Two lessons may share a pedagogical move but cannot share stock narration.

## Multi-voice episode design

The episodes use Diya and Meera as two intelligent perspectives, not a presenter and a question machine.

- Diya may carry documentary continuity, clarify the cash path, or compress a mechanism.
- Meera may notice a contradiction, challenge an assumption, introduce evidence, or reframe the investor consequence.
- Either speaker may be correct, incomplete, surprised, or responsible for the next reveal.
- Turns should contain coherent thoughts, normally more than one sentence when the idea needs development.
- Speaker changes occur at shifts in perspective, evidence, disagreement, correction, or consequence—not after ordinary sentences.
- Dialogue must not merely split a monologue into alternating labels.
- The episode must remain understandable if speaker labels are removed from the text.

Named cases should create documentary context, but the speakers must repeatedly return to the transferable financial mechanism.

## Evidence contract

- Every material transaction fact must be traceable to the cited primary or authoritative source.
- Real names and figures are retained when they improve understanding and can be pronounced clearly.
- Inference must be identified as inference.
- Missing pool, trigger, waterfall, servicing, or legal information remains a diligence gap.
- No transaction-level or tranche-level conclusion may be invented from framework guidance or sector averages.
- Evidence language should sound natural in narration. Internal provenance metadata and audit terminology remain outside the spoken script.

## Audio and SSML contract

The known continuity failure is a permanent regression case: sentence fragments were converted into separate SSML paragraphs and then stitched across Azure requests. This caused breath resets, abrupt endings, performance changes, and the sound of independently rendered sentences being merged.

The renderer must therefore satisfy all of the following:

- A source paragraph represents one coherent spoken thought.
- Sentences belonging to that thought remain continuous within the same SSML paragraph.
- A sentence boundary is not automatically a paragraph boundary.
- A request chunk is a transport unit, not a narrative or pacing unit.
- Chunk construction prefers complete source paragraphs.
- A source paragraph may not exceed the configured Azure chunk-character limit and should remain at or below 1,200 characters during authoring. If a paragraph exceeds that editorial target, review it and divide it only where the spoken thought genuinely changes. Arbitrary transport splitting must never determine its performance.
- Only real source paragraph boundaries receive paragraph pauses.
- Later Azure requests must not introduce a conspicuous opening pause or performance reset.
- No forced pause follows every sentence.
- No paralinguistic breath, laugh, gasp, whisper, or acting cue is synthesized.
- Natural punctuation and coherent paragraph prose control breathing.

Diya DragonHD remains the single-narrator lesson voice. The approved multi-voice episodes retain Diya and Meera. Enhanced-pronunciation mode remains disabled because it can unpredictably reinterpret ordinary words.

Pronunciation handling must cover:

- Deepti through explicit phonetic guidance;
- acronyms such as SPV and SEC through spoken aliases;
- deal identifiers through natural spoken prose;
- hyphenated compounds through safe spoken forms;
- raw dates, ratios, percentages, currency, and mixed alphanumeric text;
- words shown by sample synthesis to be unstable, using natural synonyms or deterministic SSML controls.

## Pipeline responsibilities

### Narrative briefs and authored content

Own the pedagogy, lesson-specific prose, evidence placement, complications, transfer, and closing principle.

### Script preparation

Assemble approved authored paragraphs, preserve their boundaries, normalize supported textual risks, and emit lesson and episode packs. It must not flatten paragraphs or insert reusable teaching sentences.

### Narration surface

Convert numbers, acronyms, aliases, and known pronunciation hazards into spoken-safe text while retaining meaning.

### Azure renderer

Build paragraph-aware SSML, create transport chunks without redefining pacing, synthesize complete temporary outputs, and publish only successful complete renders.

### Audits

Reject robotic scaffolding, repeated template phrases, question saturation, unsupported cues, raw identifiers, unterminated paragraphs, paragraph flattening, sentence-fragment SSML, incorrect voices, and stale script hashes.

Automated audits support rather than replace full-listen editorial QA.

## Gold-standard pilot

### Lesson 1

Lesson 1 must establish the single-narrator standard:

- unique greeting to Deepti;
- human-scale instalment model;
- one early prediction;
- precise securitisation reveal;
- one-rupee or one-instalment cash path;
- Kogta as evidence after the model;
- complications involving transfer, servicing, borrower performance, and payment priority;
- technical protections introduced as responses;
- a different transfer situation near the end;
- a concept-specific closing principle;
- natural Diya DragonHD performance with no audible sentence stitching.

### Episode 1

Episode 1 must establish the two-speaker standard:

- documentary continuity rather than an interview sequence;
- coherent speaker turns;
- disagreement and correction only when substantive;
- a human-scale mechanism before the named mortgage-market evidence;
- no question barrage;
- callbacks and consequences throughout;
- an ending that completes the financing-architecture arc.

The full set is not rewritten or rendered until both pilots pass script review, SSML inspection, pronunciation sampling, and complete listening review.

## Verification strategy

### Automated script checks

- all required curriculum and evidence coverage remains present;
- no prohibited meta-teaching patterns appear;
- no repeated stock opening or closing survives across the pack;
- lesson-facing question count remains within the intended range unless an editorial exception is documented;
- episode question-ending turn ratio stays below twenty percent;
- no paragraph lacks terminal punctuation;
- no source paragraph exceeds the configured Azure chunk-character limit, and paragraphs above the 1,200-character editorial target are flagged for review;
- no unsupported stage direction or speaker marker reaches narration;
- no raw risky identifier reaches Azure;
- lesson 1 alone contains the Deepti greeting.

### Automated SSML and render checks

- multiple sentences from one source paragraph remain in one SSML paragraph;
- separate source paragraphs remain separate;
- chunking does not insert sentence-level pauses;
- the manifest voice matches the approved voice profile;
- the manifest script hash matches the source pack;
- incomplete synthesis never replaces an existing complete MP3.

### Editorial listening checks

For the complete pilot audio, record timestamps for:

- any moment attention weakens;
- any definition that arrives before its need is understood;
- any analogy whose mapping or boundary is unclear;
- any repeated or templated phrase;
- any unnatural breath, restart, shout, pronunciation, pause, or voice change;
- any case detail that distracts from the mechanism;
- any section that sounds like a quiz or interview script;
- any closing that fails to compress the lesson.

A pilot passes only after a complete listen, not a spot check of the opening.

## Acceptance criteria

The design is successfully implemented when:

1. lesson 1 and episode 1 pass the gold-standard review;
2. all twenty-five lessons and seven episodes retain their required technical and evidence coverage;
3. every script uses a human-scale mechanism before its named evidence;
4. interest is renewed throughout through varied discovery devices rather than question volume;
5. no repeated narration template is perceptible across the series;
6. real cases remain evidence for transferable concepts;
7. single-narrator lessons use Diya DragonHD and episodes retain the approved Diya/Meera pairing;
8. the known sentence-fragment and Azure-request stitching failure is covered by regression tests;
9. pronunciation-risk surfaces pass automated checks and representative synthesis sampling;
10. every published MP3 matches its approved source script and passes complete listening QA.

## Implementation order after specification approval

1. define the narrative-brief data contract and audit rules;
2. write the lesson 1 narrative brief and final prose;
3. write the episode 1 narrative brief and final dialogue;
4. strengthen question-density, template-language, paragraph, pronunciation, and voice-profile tests;
5. update paragraph-aware rendering and chunk-boundary handling where required;
6. generate SSML-only pilot outputs and inspect them;
7. synthesize and completely review lesson 1 and episode 1;
8. revise the gold standard until approved;
9. author the remaining lesson and episode briefs and scripts;
10. regenerate, audit, listen, and publish the full series.

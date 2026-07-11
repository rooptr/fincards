# Content-Aware Story Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a topic-agnostic deep-dive lesson engine where generated content selects an explanatory visual metaphor, hand-drawn interaction, and cinematic hero story.

**Architecture:** Normalize each existing or generated chapter into a `story_engine` model. Render the hero and body from that model, selecting a focused SVG metaphor component by semantic type rather than topic name. Existing chapter fields supply a conservative fallback so incomplete generated content still renders safely.

**Tech Stack:** React 19, Motion, GSAP ScrollTrigger, SVG, Vite, Node test scripts.

## Global Constraints

- No hardcoded WACC or DCF behavior in visual selection or lesson components.
- Every interaction must map an input to visible geometry and a `learning_effect`.
- Do not render `Scene`, `Explanation`, or `ELI5` as primary lesson labels.
- Respect `prefers-reduced-motion` while preserving interactions.
- Use near-white canvas, charcoal type, and restrained concept-led accents.

---

### Task 1: Normalize chapter story data

**Files:**
- Create: `src/utils/storyEngine.js`
- Create: `src/utils/storyEngine.test.js`
- Modify: `src/schema/lesson.schema.json`

**Interfaces:**
- Consumes: a chapter object with current `canonical_concept_model`, `scenes`, and optional `story_engine`.
- Produces: `normalizeStoryEngine(chapter)` returning `{ narrative, visual, interactions, beats }` and `validateStoryEngine(model)` returning string errors.

- [ ] **Step 1: Write the failing tests**

```js
import { normalizeStoryEngine, validateStoryEngine } from './storyEngine.js';

const chapter = { canonical_concept_model: { topic: 'Example', definition: 'A definition.', hero: { hook_scenario: 'A real tension.', hero_visual_concept: 'timeline' } }, scenes: [] };
assert.equal(normalizeStoryEngine(chapter).visual.metaphor, 'time_decay');
assert.deepEqual(validateStoryEngine({ interactions: [{ input: 'rate', drives: [], learning_effect: '' }] }), ['Interaction 0 must drive at least one visual property.', 'Interaction 0 needs a learning effect.']);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/utils/storyEngine.test.js`

Expected: failure because `storyEngine.js` does not exist.

- [ ] **Step 3: Write minimal implementation**

```js
const LEGACY_METAPHORS = { timeline: 'time_decay', scale: 'balance', flow_path: 'flow', container_transfer: 'flow', note_stack: 'layers', stacked_bars: 'layers' };

export function normalizeStoryEngine(chapter) {
  const concept = chapter.canonical_concept_model ?? {};
  const hero = concept.hero ?? {};
  const firstIllustration = chapter.scenes?.find((scene) => scene.illustration_package?.primitive_type)?.illustration_package;
  return chapter.story_engine ?? {
    narrative: { hook: hero.hook_scenario ?? '', reveal: concept.topic ?? '', definition: concept.definition ?? '', misconception: '', payoff: concept.purpose ?? '' },
    visual: { metaphor: LEGACY_METAPHORS[hero.hero_visual_concept ?? firstIllustration?.primitive_type] ?? 'flow', actors: [], states: ['assumption', 'pressure', 'reveal'], hand_drawn_style: 'ink' },
    interactions: [],
    beats: chapter.scenes ?? []
  };
}

export function validateStoryEngine(model) {
  return (model.interactions ?? []).flatMap((item, index) => [
    ...(item.drives?.length ? [] : [`Interaction ${index} must drive at least one visual property.`]),
    ...(item.learning_effect?.trim() ? [] : [`Interaction ${index} needs a learning effect.`])
  ]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node src/utils/storyEngine.test.js`

Expected: exit code 0 and all assertions pass.

- [ ] **Step 5: Extend JSON schema**

Add optional `story_engine` properties with `narrative`, `visual`, and `interactions` fields. Allow `time_decay`, `balance`, `flow`, `branching`, `layers`, and `feedback_loop` in `visual.metaphor`.

- [ ] **Step 6: Commit**

```bash
git add src/utils/storyEngine.js src/utils/storyEngine.test.js src/schema/lesson.schema.json
git commit -m "feat: normalize content-aware lesson stories"
```

### Task 2: Build the hand-drawn metaphor renderer

**Files:**
- Create: `src/components/MetaphorScene.jsx`
- Create: `src/components/MetaphorScene.test.js`

**Interfaces:**
- Consumes: `{ metaphor, values, interactions, reducedMotion }`.
- Produces: SVG scene with `data-metaphor` and a geometry state derived only from `values`.

- [ ] **Step 1: Write the failing test**

```js
import { metaphorFor } from './MetaphorScene.jsx';
assert.equal(metaphorFor('time_decay'), 'time_decay');
assert.equal(metaphorFor('unknown'), 'flow');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/components/MetaphorScene.test.js`

Expected: failure because `MetaphorScene.jsx` does not exist.

- [ ] **Step 3: Implement the renderer**

Create `metaphorFor(name)` and six visual branches. Use one shared ink filter, irregular stroke width, and `motion.g` for stepped transitions. Implement actual physical changes: time changes distance/scale/colour; balance changes bar rotation; flow changes split and gate opening; branching changes branch width; layers change fill/loss order; feedback moves output back to input.

- [ ] **Step 4: Run test to verify it passes**

Run: `node src/components/MetaphorScene.test.js`

Expected: exit code 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/MetaphorScene.jsx src/components/MetaphorScene.test.js
git commit -m "feat: add hand-drawn lesson metaphors"
```

### Task 3: Replace generic controls with direct manipulation

**Files:**
- Create: `src/components/HandDrawnControl.jsx`
- Modify: `src/components/LessonView.jsx`

**Interfaces:**
- Consumes: widget inputs plus `metaphor` and `onChange(name, number)`.
- Produces: semantic range input styled as timeline handle, weight, gate, splitter, or layer marker.

- [ ] **Step 1: Write the failing test**

```js
import { controlKindFor } from './HandDrawnControl.jsx';
assert.equal(controlKindFor('balance'), 'weight');
assert.equal(controlKindFor('time_decay'), 'timeline');
assert.equal(controlKindFor('not-real'), 'handle');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/components/HandDrawnControl.test.js`

Expected: failure because the module and test do not exist.

- [ ] **Step 3: Implement control mapping and test file**

Create `HandDrawnControl` with a keyboard-accessible `<input type="range">`, visible value, and CSS class based on `controlKindFor`. Add `HandDrawnControl.test.js` with the three assertions above.

- [ ] **Step 4: Run test to verify it passes**

Run: `node src/components/HandDrawnControl.test.js`

Expected: exit code 0.

- [ ] **Step 5: Replace `DynamicWidget` slider markup**

Pass `chapterStory.visual.metaphor`, widget input, state value, and `handleInputChange` into `HandDrawnControl`. Keep formula output compact beneath the illustration.

- [ ] **Step 6: Commit**

```bash
git add src/components/HandDrawnControl.jsx src/components/HandDrawnControl.test.js src/components/LessonView.jsx
git commit -m "feat: add metaphor-aware lesson controls"
```

### Task 4: Build the story hero and content-first lesson layout

**Files:**
- Create: `src/components/StoryHero.jsx`
- Modify: `src/components/LessonView.jsx`
- Modify: `src/components/PrimitiveSvgRenderer.jsx`

**Interfaces:**
- Consumes: normalized story model, active scroller ref, and first-scene values.
- Produces: pinned prologue/reveal/immersion hero and content sections with no visible scaffold labels.

- [ ] **Step 1: Write the failing test**

```js
import { heroCopyFor } from './StoryHero.jsx';
assert.deepEqual(heroCopyFor({ narrative: { hook: 'Tension', reveal: 'Topic', definition: 'Definition' } }, 'prologue'), ['Tension']);
assert.deepEqual(heroCopyFor({ narrative: { hook: 'Tension', reveal: 'Topic', definition: 'Definition' } }, 'reveal'), ['Topic', 'Definition']);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/components/StoryHero.test.js`

Expected: failure because the module and test do not exist.

- [ ] **Step 3: Implement hero and test file**

Create `StoryHero` using a GSAP context scoped to its root. Pin for three scroll beats: prologue, reveal, immersion. Render `MetaphorScene` throughout. Set reduced-motion mode to the reveal state with no pin animation. Add `StoryHero.test.js` containing the assertions above.

- [ ] **Step 4: Replace legacy hero and scene labels**

In `LessonView`, call `normalizeStoryEngine(chapterData)`, replace the current card timeline with `StoryHero`, replace `PrimitiveSvgRenderer` usage in each lesson section with `MetaphorScene`, and delete visible Scenario/Scene/ELI5/MBA labels. Keep supplemental content in a single `details` element after the visual story.

- [ ] **Step 5: Run focused tests**

Run: `node src/components/StoryHero.test.js; node src/components/HandDrawnControl.test.js; node src/components/MetaphorScene.test.js; node src/utils/storyEngine.test.js`

Expected: all commands exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/components/StoryHero.jsx src/components/StoryHero.test.js src/components/LessonView.jsx src/components/PrimitiveSvgRenderer.jsx
git commit -m "feat: make deep dives visual stories"
```

### Task 5: Enrich content and validate it

**Files:**
- Modify: `src/data/chapters/wacc.json`
- Modify: `src/data/chapters/dcf.json`
- Modify: `scripts/validate-content.js`

**Interfaces:**
- Consumes: enriched `story_engine` chapter data.
- Produces: a non-zero process exit when an explicit interaction lacks `drives` or `learning_effect`.

- [ ] **Step 1: Write validation failure fixture**

Add a temporary fixture in `scripts/validate-content.test.js` with `story_engine.interactions[0]` missing `learning_effect`; assert that validation reports `needs a learning effect`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/validate-content.test.js`

Expected: failure because `validate-content.js` does not inspect story-engine interaction metadata.

- [ ] **Step 3: Implement validation and enrich representative chapters**

Check every explicit interaction's non-empty `input`, `drives`, and `learning_effect`. Add `story_engine` data to WACC and DCF only as fixtures: WACC uses `balance`/`flow`; DCF uses `time_decay`. Keep no renderer decision dependent on their topic names.

- [ ] **Step 4: Run validation and tests**

Run: `node scripts/validate-content.test.js; node scripts/validate-content.js wacc; node scripts/validate-content.js dcf`

Expected: all commands exit 0 and each chapter prints `Validation Passed.`

- [ ] **Step 5: Commit**

```bash
git add src/data/chapters/wacc.json src/data/chapters/dcf.json scripts/validate-content.js scripts/validate-content.test.js
git commit -m "feat: validate visual lesson content"
```

### Task 6: Verify build and visual behavior

**Files:**
- Modify: `src/index.css` only if needed for reduced-motion and hand-drawn shared styling.

**Interfaces:**
- Consumes: completed lesson engine.
- Produces: production build and a local visual QA record.

- [ ] **Step 1: Add reduced-motion styles**

Add a `@media (prefers-reduced-motion: reduce)` block that disables nonessential animation duration while leaving transform-derived visual state visible.

- [ ] **Step 2: Run the full quality gate**

Run: `node src/utils/ExpressionEngine.test.js; node src/utils/storyEngine.test.js; node src/components/MetaphorScene.test.js; node src/components/HandDrawnControl.test.js; node src/components/StoryHero.test.js; node scripts/validate-content.test.js; npm run lint; npm run build`

Expected: every command exits 0 and Vite writes `dist`.

- [ ] **Step 3: Run local visual QA**

Run: `npm run dev -- --host 127.0.0.1`

Check desktop/mobile: hero shows three beats; border opens into lesson; each topic switch resets cleanly; controls visibly change SVG geometry; no primary `Scene`, `Explanation`, or `ELI5` labels; reduced-motion hero stays readable.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "style: respect reduced motion in story lessons"
```

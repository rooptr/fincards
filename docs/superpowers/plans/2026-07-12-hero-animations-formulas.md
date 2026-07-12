# Hero Scroll Trigger, Live Math, and High-End SVG Primitives Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a scroll-pinned card morphing transition for the Hero, add live math calculations, and upgrade SVGs to be content-aware physics metaphors.

---

### Task 1: GSAP Sticky Hero Card Morphing (No Typewriter)

**Files:**
- Modify: `src/components/LessonView.jsx`

- [ ] **Step 1: Setup Layout and Pinned Card DOM**
  Configure the Hero container in `LessonView.jsx` to render the story card fully on load. No typewriter effect.
  
- [ ] **Step 2: Setup ScrollTrigger Morph Timeline**
  Setup a GSAP scrolltrigger pinned timeline:
  - Scroll 0-50%: Card's borders expand slightly, and the topic title and definition slide up and fade in above the story.
  - Scroll 50-100%: Card's border-radius goes to 0px, width goes to 100%, and the scenes below fade in.
  
- [ ] **Step 3: Verify the build and manual scroll flow**
  Run: `npm run build`

---

### Task 2: Concept-Driven Content-Aware SVGs

**Files:**
- Modify: `src/components/PrimitiveSvgRenderer.jsx`

- [ ] **Step 1: Implement Content-Aware `note_stack`**
  - Reads variables from `bound_variables`.
  - If a variable name contains `tax` or `shield`, draw the cash stack with an expanding transparent dome overlay.
  - Otherwise, scale the stack height and notes count based on the variable's value.

- [ ] **Step 2: Implement Content-Aware `scale`**
  - Pivot stand and balance beam.
  - Left Pan: Risk/Input weight box sizing matches the first bound variable.
  - Right Pan: Return/Output arrow height matches the second variable or calculated result.
  - Print the dynamic labels directly onto the weight blocks.

- [ ] **Step 3: Implement Content-Aware `timeline`**
  - Horizontal axis. Gold asset slides based on the time variable (e.g. `years`).
  - Scales down and shifts color from gold to grey as it moves further right.

- [ ] **Step 4: Implement Content-Aware `stacked_bars`**
  - Glass cylinder filled with proportions of the input variables.
  - Fluid heights transition smoothly with ripple animations.

- [ ] **Step 5: Run final validation and verify app build**
  Run: `npm run build`

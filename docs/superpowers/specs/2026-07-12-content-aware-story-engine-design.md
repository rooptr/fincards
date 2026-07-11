# Content-Aware Visual Story Engine

## Goal

Replace the current text-led lesson scenes with an extensible visual-story system. Each extracted topic must teach through a fitting physical metaphor and an interactive illustration whose geometry responds to the topic's real variables. The presentation should feel quiet and premium like an Apple product page, while the illustrations use a purposeful, low-frame hand-drawn motion language.

## Non-goals

- Do not build a topic-specific WACC or DCF experience.
- Do not use generic animated cards, decorative charts, or labels such as `Scene`, `Explanation`, and `ELI5` as primary lesson UI.
- Do not treat motion as ornament. Every motion must explain a causal relationship in the lesson.

## Lesson data contract

Add an optional `story_engine` object to a chapter. Existing chapters continue to render through a graceful default until enriched.

```json
{
  "story_engine": {
    "narrative": {
      "hook": "A concise real-world tension.",
      "reveal": "The formal topic name revealed after the hook.",
      "definition": "One-sentence definition.",
      "misconception": "The intuitive but wrong conclusion to overturn.",
      "payoff": "What the learner can now decide, calculate, or predict."
    },
    "visual": {
      "metaphor": "time_decay",
      "actors": ["cash", "future"],
      "states": ["assumption", "pressure", "reveal"],
      "hand_drawn_style": "ink"
    },
    "interactions": [{
      "input": "discount_rate",
      "drives": ["future_cash.scale", "future_cash.color", "distance"],
      "learning_effect": "A higher rate makes future cash worth less today."
    }]
  }
}
```

The topic generator must supply the misconception, the causal transformation, and the learning effect for every interaction. A chapter is incomplete for the story experience when it supplies a value without saying what that value visibly changes and why.

## Visual grammar

The renderer selects a visual scene from semantic metadata rather than topic names.

| Metaphor | Teaches | Physical behavior |
| --- | --- | --- |
| `time_decay` | delayed value, compounding, discounting | an object moves away, shrinks, cools, or fades |
| `balance` | risk/return, trade-offs, leverage | added weight tilts a scale; an opposing force restores it |
| `flow` | capital, cash conversion, securitization | value flows through gates, splits, pools, or is absorbed |
| `branching` | ownership, dependencies, allocation | a trunk divides into weighted branches; branches thicken or weaken |
| `layers` | tranches, priority, shields, stacked claims | layers build, cover, drain, or take losses in order |
| `feedback_loop` | reinforcing or balancing mechanisms | an output visibly loops back and changes the next cycle |

If a generator cannot select a reliable metaphor, the page uses the `flow` fallback with no fabricated visual claims and reports the missing visual metadata during content validation.

## Hero and scroll sequence

1. **Prologue:** A pinned, full-screen illustrated moment plays in three low-frame beats: the learner's initial assumption, the force that breaks it, and the unresolved consequence. The copy is handwritten-style and sparse.
2. **Reveal:** As the user scrolls, the single visual frame expands beyond its rounded border. The topic name and definition enter only after the tension is understood.
3. **Immersion:** The border opens into the lesson canvas. The same actors from the prologue remain present, so the story does not reset when formal explanation begins.
4. **Resolution:** The final illustration combines the mechanics introduced in prior beats and makes the payoff observable.

There are no visible numbered scenes. Supporting material such as interview answers and misconceptions is available only after the main story as discreet expandable material.

## Illustration and interaction behavior

- SVG illustrations use textured ink strokes, slight frame-to-frame variation, irregular outline offsets, and short stepped transitions. The motion should feel drawn, not machine-smooth.
- The paper/ink layer sits on a restrained Apple-like canvas: near-white background, deep charcoal type, spacious composition, and limited concept-led accents.
- Each interactive control appears as a hand-drawn object appropriate to the metaphor (a draggable weight, a timeline handle, a flow gate, or a branch splitter), not an isolated dashboard slider.
- Moving a control changes the visual first; a compact calculated value and formula update as supporting evidence.
- `prefers-reduced-motion` shows the final state with clear before/after cues and preserves all interactions.

## Components and data flow

- `LessonView` becomes the lesson orchestrator and owns topic selection, scroll state, and progressive disclosure.
- `StoryHero` renders the pinned prologue/reveal/immersion sequence from `story_engine.narrative` and `story_engine.visual`.
- `MetaphorScene` selects a visual implementation by `metaphor` and accepts a normalized value map.
- Metaphor components (`TimeDecayScene`, `BalanceScene`, `FlowScene`, `BranchingScene`, `LayersScene`, `FeedbackLoopScene`) implement physical geometry and interaction bindings.
- `HandDrawnControl` maps input semantics to an appropriate direct manipulation control.
- `content validation` checks that a visual metaphor, causal binding, learning effect, and fallback are valid before a chapter is shipped.

## Error handling

- Missing `story_engine`: derive a conservative default from current `hero`, `illustration_package`, and widgets; preserve the chapter instead of failing the view.
- Invalid metaphor or interaction binding: show the narrative and formula with a neutral illustration fallback; log validation errors in development.
- Expression failures: leave the last valid illustration state visible and show a concise inline calculation error.

## Verification

- Unit tests cover metaphor selection, chapter normalization, invalid bindings, and reduced-motion state selection.
- A content validation script rejects enriched chapters with a missing learning effect or a control that does not drive a visual property.
- Build and lint pass.
- Local visual QA checks the mobile and desktop hero sequence, interaction response, and the no-animation accessibility path.

## Initial scope

Build the reusable engine and convert the existing WACC and DCF chapters only as representative content fixtures. The architecture, renderer, validation, and UI must remain topic-agnostic so future extracted topics are driven entirely by content data.

# Spec: Content-Aware Premium Hero Morph & Concept-Driven Interactive Primitives

This document details the refined specifications for making the illustrations fully concept-relevant and content-aware, and updating the hero card transition to be instant-story and scroll-triggered.

---

## 1. Content-Aware Hero Morphing Sequence

The Hero Card will start fully visible on load without any typewriter delay, focusing purely on the story first.
- **On Selection (0% Scroll)**: A centered, modal-like glassmorphic card fills the viewport. The card displays *only* the `hook_scenario` (story) in large, readable, premium typography. The topic name and definition are hidden.
- **Scrub 0% - 50%**: As the user scrolls, the page is pinned. The card's borders expand slightly and smoothly, and the Topic Name and Definition slide and fade in above the story.
- **Scrub 50% - 100%**: The card's border radius collapses to `0px`, and its width expands to `100%`, morphing seamlessly into the top header banner of the page. The scenes container below fades in.
- **Unpin**: The page unpins and normal scrolling begins.

---

## 2. Concept-driven, Content-Aware Interactive Primitives

The SVG renderer will not contain WACC- or DCF-specific hardcoded labels. Instead, it will look at the `primitive_type` and use the variables metadata (`bound_variables`, `drives`, and values from `dynamicOutputs`) to render highly polished, concept-relevant physical metaphors:

### A. `note_stack` (Stacking and Deductions)
- Draws an isometric 3D-effect stack of items (banknotes or assets).
- If the bound variable is a "tax" or "shield" rate (e.g., name includes `tax` or `shield`):
  - Renders a glowing transparent **Shield Dome** over the stack.
  - The dome's size is driven by the tax rate, and the notes inside turn green/glowing, while notes outside are greyed out, showing the cost-absorption metaphor.
- Otherwise (e.g., opportunity cost or asset accumulation):
  - The number of banknotes or assets stacked is directly proportional to the slider value, showing physical volume scale.

### B. `scale` (Risk/Reward Balance)
- Draws a physical SVG balance scale (stand, crossbar, two hanging pans).
- Left Pan represents the input variable (e.g. Risk, Beta, Debt proportion). Its physical weight box grows in size, tilting the scale.
- Right Pan represents the target variable (e.g. Required Return, WACC, Equity cost). A glowing force arrow or weight box expands to show the balancing required return.
- Dynamically reads the variable name and formats it as a label on the weights (e.g., "BETA: 1.2").

### C. `timeline` (Time Value Decay)
- Draws a horizontal pipeline representing Time.
- A golden coin or cash bundle slides along the axis based on the time variable (e.g. `years`, `time`, `period`).
- As the position moves to the right, the item's scale shrinks, and its color interpolates from gold to slate-grey, demonstrating visual time decay.

### D. `stacked_bars` (Proportions)
- Draws a glass cylinder with wave-animated fluids inside.
- The cylinder holds liquid levels matching the relative weights of the bound variables (e.g., Equity vs Debt, or CF1 vs CF2 vs CF3).
- The liquid levels rise, fall, and ripple dynamically as inputs shift, demonstrating proportions of the total capital mix.

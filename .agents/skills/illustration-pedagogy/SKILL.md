---
name: illustration-pedagogy
description: Use when designing or writing code for interactive visualizations, illustrations, and animations to ensure they translate abstract mathematical concepts into physical, dynamic behaviors rather than static shapes.
---

# Illustration Pedagogy (Visual-Thinking Framework)

## Overview
Do not draw captions or boxes with labels. Every visual must be a physical metaphor of the mathematical concept. Moving a slider must trigger a physical, proportional reaction in the SVG.

## Core Principles

### 1. The Physical Metaphor Ladder
If a concept is abstract, map it to a physical force or visual transformation:
- **Opportunity Cost / Time Decay**: Distance + Scale + Color. (e.g., money notes moving further down a timeline shrink in size and fade from golden-yellow to cold grey).
- **Risk vs. Return**: Gravity + Balance. (e.g., a physical balance scale where adding risk/Beta adds weight, tilting the scale; the required return must grow visually to restore balance).
- **Proportional Composition**: Fluid Levels + Mixing. (e.g., cylinders filled with wave-animating liquid segments that resize proportionally as weights shift).
- **Shields & Deductions**: Enclosures + Overlays. (e.g., a stack of cash covered by a glowing semi-transparent tax-shield dome. As tax rate increases, the dome grows, shrinking the unshielded cash).

### 2. No "Text-in-a-Box" Placeholders
If the drawing relies on a label like "₹100 Note" to explain what it is because it's just a grey rectangle, it has failed. The drawing must look like a stylized stack of bills or a physical scale.

### 3. High-End Glassmorphism Aesthetics
All visuals must follow premium design patterns:
- Frosted glass backgrounds: `backdrop-filter: blur(12px)` with low-opacity white fills (`rgba(255,255,255,0.6)`).
- Double-border highlight: `border: 1px solid rgba(255,255,255,0.4)` and a soft box shadow.
- High-contrast, clean accent colors (e.g., Apple-style system blue `#0066cc`, warm amber `#ff9500`, emerald green `#34c759`).
- Smooth transitions: Use Framer Motion/GSAP to animate SVGs instead of instant redraws.

## Checklist for Designing Visuals
- [ ] What is the physical metaphor (scale, pipeline, fluid, stack)?
- [ ] How does moving the slider directly change the geometry (tilting, shrinking, filling)?
- [ ] Are we avoiding static label boxes?
- [ ] Does the visual state perfectly align with the live math formula?

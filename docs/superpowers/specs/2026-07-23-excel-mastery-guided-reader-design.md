# Excel Mastery Guided Reader Design

## Goal

Turn the dedicated Excel Mastery route into a dependable, interview-ready Excel-for-finance reader. Keep the existing route and data-driven rendering, correct misleading claims, add the missing MBA finance and accounting mechanics, and make the reading surface easier to scan without turning it into a separate product.

## Scope

In scope:

- `src/data/excelMasteryData.js`, including content corrections and curriculum expansion.
- `src/components/ExcelMasteryView.jsx`, including the formula-rendering bug and visual hierarchy.
- One focused regression script for content invariants and the component contract.
- Local verification with the focused script, Oxlint, and the Vite production build.

Out of scope:

- The separate Excel and Financial Modeling cards in `src/data/cards.json`.
- The homepage information architecture, audio generation, deployment, commits, and pushes.
- New dependencies or interactive calculators.

## Content architecture

The reader will follow a finance-modeling path with ten sections:

1. Model architecture and standards
2. Three-statement and operating model linkage
3. Working capital, debt, and cash mechanics
4. Lookup and reference functions
5. Logic, error handling, and model controls
6. Text, data cleaning, and dynamic arrays
7. Time, dates, and schedule mechanics
8. Accounting, depreciation, and roll-forwards
9. WACC, DCF, valuation, and returns
10. Sensitivities, scenarios, navigation, and auditing

Every item keeps the existing `id`, `name`, `description`, `usage`, and optional `formula` contract. New items may add a short `watchOut` field. `description` explains the function or concept, `usage` ties it to a finance model, and `watchOut` is reserved for a material assumption or failure mode. No item will use absolute wording such as “always,” “universal,” or “gold standard” unless the statement is literally a syntax rule.

The expanded curriculum will explicitly cover revenue and cost drivers, working-capital days and cash conversion, three-statement flow-through, debt schedules and revolver capacity, fixed-asset roll-forwards, deferred tax and retained earnings linkage, FCFF/FCFE, WACC, DCF and terminal value, trading and transaction multiples, scenario and sensitivity mechanics, data validation, Power Query/PivotTable concepts, and reliable Excel audit shortcuts.

## Visual direction

- Preserve the existing white editorial surface and Excel green accent.
- Replace the oversized title-and-pill treatment with a compact hero containing the course label, title, a plain-language promise, and curriculum statistics.
- Use a sticky section rail with active state and section counts, while retaining keyboard focus and mobile horizontal scrolling.
- Present each section as a distinct reading block with a small index marker, concise description, and item count.
- Present items as responsive cards: concept title and explanation on the left, model application and formula/caution on the right on wide screens, stacked on small screens.
- Use one accent color system, restrained borders, and modest shadows. Avoid gradients, fake dashboards, dense pill clusters, and excessive empty space.
- Keep all text accessible, preserve the back button, and avoid introducing additional packages.

## Technical corrections

- Make formula rendering unconditional with respect to hooks; a missing formula returns after the hook has been called.
- Normalize the existing mojibake multiplication character before KaTeX rendering.
- Render optional `watchOut` callouts only when present.
- Use `Ctrl+G` plus Go To Special for hardcoded constants instead of asserting a brittle multi-key sequence.
- Explain that old `Alt` KeyTip sequences vary by Excel version and keyboard layout.
- Use a tolerance-based balance-sheet check without rounding away the residual.

## Acceptance criteria

- The focused regression script passes and confirms the required sections, concepts, unique IDs, and corrected copy.
- No dedicated Excel Mastery item recommends blanket `IFERROR(...,0)`, calls DDB generic tax modeling, or claims that ribbon sequences are universal.
- The component contains no conditional hook invocation, no mojibake formula output, and renders `watchOut` safely.
- `npm.cmd run lint` exits successfully.
- `npm.cmd run build` exits successfully.
- Only the Excel Mastery files, focused test, and this spec/plan are part of the intended worktree diff. Nothing is committed or pushed.

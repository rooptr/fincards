# Excel Mastery Guided Reader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct and expand the dedicated Excel Mastery reader and give it a polished, responsive finance-modeling reading surface without publishing changes.

**Architecture:** Keep `excelMasteryData.js` as the single curriculum source and keep `ExcelMasteryView.jsx` as the route-level renderer. Add only an optional `watchOut` field and a focused Node regression script, so the existing App route remains unchanged and the separate cards catalog is untouched.

**Tech Stack:** React 19, Vite 8, KaTeX, plain JSX styles, Node test script, Oxlint.

## Global Constraints

- Scope is only the dedicated Excel Mastery reader.
- No new dependencies, no audio work, no deployment, no commit, and no push.
- Preserve the existing `onBack` route contract.
- Keep formulas source-authored and render them through the existing KaTeX dependency.
- Use test-first edits for behavior changes, then run focused checks, lint, and build.

### Task 1: Lock the regression contract

**Files:**
- Create: `scripts/test-excel-mastery.mjs`
- Reference: `src/data/excelMasteryData.js`
- Reference: `src/components/ExcelMasteryView.jsx`

- [ ] **Step 1: Write assertions for the desired curriculum and renderer contract.**

  The script must import `excelMasteryData`, flatten items, assert unique IDs, assert the ten planned section names, assert required IDs for three-statement linkage, working capital, WACC, DCF, terminal value, dynamic arrays, data cleaning, and audit controls, and read the view source to assert unconditional `useMemo`, `watchOut`, and the absence of the old `IFERROR(..., 0)`/`F5 + S + O + X` copy.

- [ ] **Step 2: Run `node scripts/test-excel-mastery.mjs` and confirm it fails because the current curriculum and component do not yet satisfy the new contract.**

### Task 2: Correct and expand the curriculum

**Files:**
- Modify: `src/data/excelMasteryData.js`

- [ ] **Step 1: Replace the old absolute or misleading descriptions with technically qualified copy.**

  Correct NPV/XNPV, IRR/XIRR, YEARFRAC basis, IFERROR, rounding, DDB, model color conventions, circular references, CAGR, balance-sheet checks, data tables, Goal Seek, Scenario Manager, and keyboard guidance.

- [ ] **Step 2: Add the missing finance-modeling items under the ten-section path.**

  Add three-statement flow-through, driver-based forecasting, working-capital days and cash conversion, debt/revolver/cash sweep mechanics, fixed-asset and retained-earnings roll-forwards, deferred tax, FCFF/FCFE, WACC, DCF, terminal value, valuation multiples, dynamic arrays, data validation, Power Query/PivotTables, and reliable audit shortcuts.

- [ ] **Step 3: Run the focused regression script and confirm it passes for the data contract.**

### Task 3: Redesign and harden the reader

**Files:**
- Modify: `src/components/ExcelMasteryView.jsx`

- [ ] **Step 1: Fix the formula hook path and formula normalization.**

  Call `useMemo` on every render, return `null` from the memoized calculation when no formula exists, normalize both `×` and the existing mojibake sequence, and retain safe KaTeX fallback behavior.

- [ ] **Step 2: Implement the guided-reader layout.**

  Add a compact hero, curriculum stats, sticky section navigation with counts, section index markers, responsive item cards, and optional `watchOut` callouts. Keep the back button, existing data mapping, formula display, and mobile behavior.

- [ ] **Step 3: Run the focused regression script and Oxlint.**

### Task 4: Verify the local release state

**Files:**
- Inspect: `src/data/excelMasteryData.js`
- Inspect: `src/components/ExcelMasteryView.jsx`
- Inspect: `scripts/test-excel-mastery.mjs`

- [ ] **Step 1: Run `node scripts/test-excel-mastery.mjs`.**

- [ ] **Step 2: Run `npm.cmd run lint`.**

- [ ] **Step 3: Run `npm.cmd run build`.**

- [ ] **Step 4: Run `git diff --check` and inspect `git status --short` so unrelated dirty files remain untouched.**

- [ ] **Step 5: Report the exact changed files and confirm no commit or push was performed.**

# Formula Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, accurate Formula Atlas with corrected finance formulas, clean KaTeX rendering, and an Apple-like searchable reader.

**Architecture:** Keep `formulaeData.js` as the single catalog source. Keep `FormulaeView.jsx` as the route renderer, but move formula-source cleanup into the existing shared `normalizeFormulaSource` helper so Excel Mastery and Formulae use one rendering contract. Add one Node regression script that checks both data coverage and source-level view behavior.

**Tech Stack:** React 19, KaTeX, Vite, plain JSX styles, Node assertions, Oxlint.

## Global Constraints

- Scope is only the dedicated Formulae route and its data.
- Preserve the existing `onBack` prop and route wiring.
- Do not add dependencies.
- Keep changes local with no commit or push.
- Formula strings remain authored LaTeX and must not be transformed into nested LaTeX.

### Task 1: Add the failing regression contract

**Files:**
- Create: `scripts/test-formula-atlas.mjs`
- Reference: `src/data/formulaeData.js`
- Reference: `src/components/FormulaeView.jsx`
- Reference: `src/utils/excelFormula.js`

- [ ] **Step 1: Assert the eight planned sections, unique IDs, minimum catalog size, required formula IDs, corrected wording, and renderer contract.**
- [ ] **Step 2: Run `node scripts/test-formula-atlas.mjs` and confirm it fails against the current four-section, 18-item catalog and conditional renderer.**

### Task 2: Replace and expand formula data

**Files:**
- Modify: `src/data/formulaeData.js`

- [ ] **Step 1: Rewrite the current formulas with qualified descriptions and assumptions.**

  Correct FCFF, Gordon Growth, ROIC, EBITDA, DSCR, Altman Z-Score, Sharpe, Treynor, Jensen alpha, and Black-Scholes copy.

- [ ] **Step 2: Add the eight-section catalog with corporate finance, accounting, operating metrics, credit, debt markets, portfolio risk, derivatives, transaction diligence, and model controls.**
- [ ] **Step 3: Run `node scripts/test-formula-atlas.mjs` and confirm the data contract passes or fails only on renderer assertions.**

### Task 3: Fix rendering and redesign the reader

**Files:**
- Modify: `src/components/FormulaeView.jsx`

- [ ] **Step 1: Make formula rendering hook-safe and reuse `normalizeFormulaSource`.**
- [ ] **Step 2: Add active section tracking, formula search, compact hero statistics, sticky section navigation, responsive cards, usage/caveat blocks, and accessible controls.**
- [ ] **Step 3: Run the focused regression script and focused Oxlint.**

### Task 4: Verify the local result

**Files:**
- Inspect: `src/data/formulaeData.js`
- Inspect: `src/components/FormulaeView.jsx`
- Inspect: `scripts/test-formula-atlas.mjs`

- [ ] **Step 1: Run `node scripts/test-formula-atlas.mjs`.**
- [ ] **Step 2: Run `npm.cmd exec -- oxlint src/components/FormulaeView.jsx src/data/formulaeData.js src/utils/excelFormula.js scripts/test-formula-atlas.mjs`.**
- [ ] **Step 3: Run `npm.cmd run build`.**
- [ ] **Step 4: Run `git diff --check` for intended files and inspect `git status --short`.**
- [ ] **Step 5: Report changed files, verification evidence, and the fact that nothing was committed or pushed.**

# Formula Atlas Design

## Goal

Turn the dedicated Formulae route into a complete, accurate, finance-role-ready formula reference with clean LaTeX rendering and a calm Apple-like reading surface.

## Scope

In scope:

- `src/data/formulaeData.js`: audit and expand the formula catalog.
- `src/components/FormulaeView.jsx`: fix the conditional hook and double-LaTeX transformation, then redesign the page.
- Reuse `src/utils/excelFormula.js` as the single formula-source normalizer shared with Excel Mastery.
- Add a focused regression script for formula coverage, formulas, copy quality, and view contracts.

Out of scope:

- The Excel Mastery route and its data, except for shared renderer compatibility.
- The wider `cards.json` catalog, audio, homepage IA, deployment, commits, and pushes.

## Content architecture

The catalog will use eight sections:

1. Corporate Finance, Valuation & Transactions
2. Financial Statements & Accounting
3. Profitability, Working Capital & Operating Metrics
4. Credit, Leverage & Private Capital
5. Fixed Income & Debt Markets
6. Portfolio Theory & Risk
7. Derivatives & Options
8. Consulting, Diligence & Model Controls

Each item will have `id`, `name`, `description`, `usage`, and `formula`, with optional `watchOut`. Every formula will state its key assumptions in copy or a caveat. Thresholds will not be presented as universal rules, and ratios will distinguish common variants such as EBITDA DSCR versus CFADS DSCR.

The expansion will include CAPM, WACC, cost of debt and equity, EV/equity bridges, FCFF/FCFE, DCF, NPV/IRR/XNPV/XIRR, terminal value, transaction returns, Sources & Uses, accretion/dilution, three-statement links, margins, cash conversion, ROIC/ROE/ROA, common-size analysis, debt coverage and leverage, bond math, duration, convexity, portfolio risk, VaR, Black-Scholes call and put, Greeks, put-call parity, QofE, PPA, working-capital pegs, and consulting QA controls.

## Formula rendering

Formula strings are authored as LaTeX source. `FormulaeView` will call `normalizeFormulaSource` and pass the result directly to KaTeX. It will not wrap existing commands in additional `\\text{}` calls or escape already-valid `\\&` and `\\$` sequences. Missing formulas return safely, and KaTeX fallback will display readable source text.

## Visual direction

- Use a soft neutral background, dark ink, one blue-violet accent, thin borders, and restrained shadows.
- Add a compact hero with course label, title, description, section count, and formula count.
- Add a search field that filters by formula name, description, usage, and section.
- Use a sticky horizontal section rail with active state and counts.
- Render responsive formula cards with definition, practical use, caveat, and one formula block.
- Keep the back button and existing scroll-to-section behavior.
- Avoid gradients, excessive pills, giant empty gaps, and dense all-white walls.
- Preserve keyboard focus, accessible labels, mobile horizontal scrolling, and readable KaTeX overflow.

## Acceptance criteria

- The focused regression script passes with at least 90 unique formula concepts and all eight planned sections.
- CAPM, WACC, DSCR, and EV formulas are explicit and present.
- No catalog item calls EBITDA cash flow, claims a universal DSCR threshold, or states only `g < GDP growth` for Gordon Growth.
- Formula source is not double-wrapped, and the component has no conditional hook invocation.
- Focused Oxlint passes for all touched Formulae files.
- `npm.cmd run build` exits successfully.
- No commit or push is performed.

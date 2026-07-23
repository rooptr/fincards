import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { excelMasteryData } from '../src/data/excelMasteryData.js';
import { normalizeFormulaSource } from '../src/utils/excelFormula.js';

const viewSource = await readFile(new URL('../src/components/ExcelMasteryView.jsx', import.meta.url), 'utf8');
const dataSource = await readFile(new URL('../src/data/excelMasteryData.js', import.meta.url), 'utf8');
const items = excelMasteryData.flatMap((section) => section.items);
const ids = items.map((item) => item.id);
const sectionNames = excelMasteryData.map((section) => section.section);

const requiredSections = [
  'Model Architecture & Standards',
  'Three-Statement & Operating Model',
  'Working Capital, Debt & Cash',
  'Lookup & Reference',
  'Logic, Errors & Controls',
  'Text, Data Cleaning & Dynamic Arrays',
  'Dates & Schedule Mechanics',
  'Accounting & Fixed Assets',
  'WACC, DCF & Valuation',
  'Sensitivities, Scenarios & Auditing'
];

const requiredConcepts = [
  'three-statement-linkage',
  'working-capital-cycle',
  'revolver-availability',
  'wacc',
  'dscr',
  'enterprise-value',
  'fcff-fcfe',
  'dcf',
  'terminal-value',
  'dynamic-array-spill',
  'power-query-pivottables',
  'go-to-special'
];

assert.deepEqual(sectionNames, requiredSections, 'Excel Mastery sections should follow the guided finance-modeling path');
assert.equal(new Set(ids).size, ids.length, 'Excel Mastery item IDs must be unique');
for (const id of requiredConcepts) {
  assert.ok(ids.includes(id), `Missing required Excel Mastery concept: ${id}`);
}

assert.ok(items.length >= 80, `Expected the dedicated reader to cover at least 80 concepts, got ${items.length}`);
assert.ok(items.some((item) => item.watchOut), 'At least one material caveat should be rendered as a watch-out');
assert.ok(items.every((item) => !/[âÃ�]/.test(`${item.name} ${item.description} ${item.usage} ${item.watchOut ?? ''}`)), 'Excel Mastery copy must not contain mojibake');
assert.match(items.find((item) => item.id === 'capm-cost-of-equity').formula, /Re.*Rf.*beta.*Rm/i);
assert.match(items.find((item) => item.id === 'wacc').formula, /WACC.*E.*V.*Re.*D.*V.*Rd.*T/i);
assert.match(items.find((item) => item.id === 'dscr').formula, /DSCR.*EBITDA.*Interest.*Principal/i);
assert.match(items.find((item) => item.id === 'enterprise-value').formula, /EV.*Market.*Debt.*Minority.*Excess Cash/i);
assert.doesNotMatch(dataSource, /Always use XNPV|gold standard|universal language|wrap every formula in `IFERROR/i);
assert.doesNotMatch(dataSource, /Used heavily in tax modeling to accelerate deductions/i);
assert.doesNotMatch(dataSource, /F5 \+ S \+ O \+ X/i);

const fcffSource = normalizeFormulaSource('formula: \\text{FCFF} = \\text{EBIT}(1-T) + \\text{D\\&A}');
assert.equal(fcffSource, '\\text{FCFF} = \\text{EBIT}(1-T) + \\text{D\\&A}');
assert.doesNotMatch(fcffSource, /\\text\{\\text/);
assert.equal(normalizeFormulaSource('formula: ×'), '\\times');

assert.match(viewSource, /normalizeFormulaSource/);
assert.match(viewSource, /const renderedFormula = useMemo\(\(\) => \{/);
assert.match(viewSource, /renderedFormula\.value/);
assert.match(viewSource, /item\.watchOut/);
assert.match(viewSource, /section\.items\.length/);
assert.doesNotMatch(viewSource, /if \(!formula\) return null;\s*const htmlContent = useMemo/);

console.log(`Excel Mastery regression checks passed for ${excelMasteryData.length} sections and ${items.length} concepts.`);

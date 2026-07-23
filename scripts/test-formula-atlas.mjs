import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { formulaeData } from '../src/data/formulaeData.js';

const viewSource = await readFile(new URL('../src/components/FormulaeView.jsx', import.meta.url), 'utf8');
const dataSource = await readFile(new URL('../src/data/formulaeData.js', import.meta.url), 'utf8');
const items = formulaeData.flatMap((section) => section.items);
const sectionNames = formulaeData.map((section) => section.section);
const ids = items.map((item) => item.id);

const requiredSections = [
  'Corporate Finance, Valuation & Transactions',
  'Financial Statements & Accounting',
  'Profitability, Working Capital & Operating Metrics',
  'Credit, Leverage & Private Capital',
  'Fixed Income & Debt Markets',
  'Portfolio Theory & Risk',
  'Derivatives & Options',
  'Consulting, Diligence & Model Controls'
];

const requiredConcepts = [
  'capm',
  'wacc',
  'dscr',
  'ev',
  'fcff',
  'fcfe',
  'npv',
  'irr',
  'xnpv',
  'xirr',
  'three-statement-linkage',
  'bond-duration',
  'portfolio-variance',
  'black-scholes-call',
  'black-scholes-put',
  'sources-and-uses',
  'qoe-normalization',
  'purchase-price-allocation'
];

assert.deepEqual(sectionNames, requiredSections, 'Formulae should follow the Formula Atlas structure');
assert.equal(new Set(ids).size, ids.length, 'Formula IDs must be unique');
assert.ok(items.length >= 90, `Expected at least 90 formula concepts, got ${items.length}`);
for (const id of requiredConcepts) assert.ok(ids.includes(id), `Missing required formula concept: ${id}`);

const find = (id) => items.find((item) => item.id === id);
assert.match(find('capm').formula, /Re.*Rf.*beta.*Rm/i);
assert.match(find('wacc').formula, /WACC.*E.*V.*Re.*D.*V.*Rd.*T/i);
assert.match(find('dscr').formula, /DSCR.*EBITDA.*Interest.*Principal/i);
assert.match(find('ev').formula, /EV.*Market Cap.*Debt.*Minority Interest.*Excess Cash/i);
assert.ok(items.every((item) => item.formula?.startsWith('formula:')));
assert.ok(items.every((item) => !/[âÃ�]/.test(`${item.name} ${item.description} ${item.usage} ${item.watchOut ?? ''}`)), 'Formula copy must not contain mojibake');
assert.doesNotMatch(dataSource, /proxy for core operational cash flow|g.*less than long-term GDP growth|Lenders look for a DSCR > 1\.25x|The ultimate metric/i);

assert.match(viewSource, /normalizeFormulaSource/);
assert.match(viewSource, /search/i);
assert.match(viewSource, /activeSection/);
assert.match(viewSource, /item\.watchOut/);
assert.match(viewSource, /const renderedFormula = useMemo\(\(\) => \{/);
assert.doesNotMatch(viewSource, /if \(!formula\) return null;\s*const htmlContent = useMemo/);

console.log(`Formula Atlas regression checks passed for ${formulaeData.length} sections and ${items.length} concepts.`);

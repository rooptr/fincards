import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const source = 'nifty50_whitepaper_2024';
const sourceUrl = 'https://www.niftyindices.com/docs/default-source/indices/nifty-50/nifty-50-whitepaper-2024.pdf?sfvrsn=1cd6e35_4';
const rows = [
  { item: 'Nifty 50 TR annualised return since June 30, 1999', value: '14.10%', source, sourceField: 'Nifty 50 Whitepaper 2024, Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR annualised return over 15 years', value: '15.63%', source, sourceField: 'Nifty 50 Whitepaper 2024, Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR annualised return over 5 years', value: '15.28%', source, sourceField: 'Nifty 50 Whitepaper 2024, Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR annualised return over 1 year', value: '30.08%', source, sourceField: 'Nifty 50 Whitepaper 2024, Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR annualised volatility since June 30, 1999', value: '22.25%', source, sourceField: 'Nifty 50 Whitepaper 2024, Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR three-year return to risk ratio', value: '1.19', source, sourceField: 'Nifty 50 Whitepaper 2024, Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR total-return treatment', value: 'Dividends are reinvested in the index', source, sourceField: 'Nifty 50 Whitepaper 2024, explanatory text following Exhibit 9' },
];
catalog.cagr = {
  status: 'captured_for_editorial_review',
  documentTitle: 'NSE Indices, Nifty 50 Whitepaper 2024',
  sourceUrl,
  summary: 'The official Nifty 50 Total Return whitepaper provides dated annualised return observations, volatility, and the dividend-reinvestment convention required to teach CAGR without an illustrative series.',
  rows,
  image: '/evidence/nifty-cagr-excerpt.svg',
  imageSource: sourceUrl,
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['cagr'], status: 'captured_for_editorial_review' }));

import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const sourceId = 'sebi_margin_trading_discussion';
const sourceUrl = 'https://www.sebi.gov.in/sebi_data/attachdocs/1293184262250.pdf';
const rows = [
  { item: 'Purchase value in published example', value: 'Rs 100', source: sourceId, sourceField: 'Section 1.4, mechanism of margin trading' },
  { item: 'Initial margin in published example', value: '50% or Rs 50', source: sourceId, sourceField: 'Section 1.4, mechanism of margin trading' },
  { item: 'Maintenance margin in published example', value: '25% of collateral value', source: sourceId, sourceField: 'Section 1.4, mechanism of margin trading' },
  { item: 'Collateral value after decline', value: 'Rs 60 after a 40% depreciation', source: sourceId, sourceField: 'Section 1.4, mechanism of margin trading' },
  { item: 'Current equity after decline', value: 'Rs 10, calculated as Rs 60 collateral value less Rs 50 debt', source: sourceId, sourceField: 'Section 1.4, mechanism of margin trading' },
  { item: 'Margin call in published example', value: 'Rs 5, calculated as Rs 15 required equity less Rs 10 current equity', source: sourceId, sourceField: 'Section 1.4, mechanism of margin trading' },
];
const variationMarginRows = [
  { item: 'Required report', value: 'Initial margin and mark to market settlement collection report', source: 'sebi_derivative_margin_reporting', sourceField: 'Circular dated June 20, 2000, opening instruction' },
  { item: 'Reporting deadline', value: 'The report is submitted before trading commences on the next day, latest by 10:00 a.m.', source: 'sebi_derivative_margin_reporting', sourceField: 'Circular dated June 20, 2000, reporting timetable' },
  { item: 'Contract mark inputs', value: 'Closing price of the previous day and closing price at the end of the day', source: 'sebi_derivative_margin_reporting', sourceField: 'Initial Margin and Mark to Market Settlement Collection Report, item 2' },
  { item: 'Settlement liability field', value: 'Total MTM liability for the day, reported in Rs. Cr', source: 'sebi_derivative_margin_reporting', sourceField: 'Initial Margin and Mark to Market Settlement Collection Report, item 2' },
  { item: 'Settlement collection field', value: 'Total MTM collected before the start of trading, reported in Rs. Cr', source: 'sebi_derivative_margin_reporting', sourceField: 'Initial Margin and Mark to Market Settlement Collection Report, item 2' },
  { item: 'Shortfall field', value: 'Shortages, if any, reported in Rs. Cr', source: 'sebi_derivative_margin_reporting', sourceField: 'Initial Margin and Mark to Market Settlement Collection Report, item 2' },
  { item: 'Collection rule', value: 'Mark-to-market margin is collected until the settlement date in the NSE capital-market segment', source: 'nse_margin_collection_faq', sourceField: 'FAQ 1, Capital Market Segment' },
];
for (const topicId of ['maintenance_margin', 'margin_call']) {
  catalog[topicId] = {
    status: 'captured_for_editorial_review',
    documentTitle: 'SEBI Discussion Paper on Margin Trading and Securities Lending',
    sourceUrl,
    summary: 'SEBI published a margin trading example showing how a decline in collateral value reduces equity below the maintenance requirement and creates a cash shortfall.',
    rows,
    image: '/evidence/sebi-margin-trading-excerpt.svg',
    imageSource: sourceUrl,
  };
}
catalog.variation_margin = {
  status: 'captured_for_editorial_review',
  documentTitle: 'SEBI Daily Reports for Trading and Settlement of Derivative Trades',
  sourceUrl: 'https://www.sebi.gov.in/legal/circulars/jun-2000/daily-reports-for-trading-and-settlement-of-derivative-trades_17700.html',
  summary: 'SEBI specifies the operational fields used to report daily mark-to-market settlement liability, collection, and shortages. NSE separately states the collection timing for mark-to-market margin in the capital-market segment.',
  rows: variationMarginRows,
  image: '/evidence/sebi-variation-margin-report-excerpt.svg',
  imageSource: 'https://www.sebi.gov.in/legal/circulars/jun-2000/daily-reports-for-trading-and-settlement-of-derivative-trades_17700.html',
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['maintenance_margin', 'margin_call', 'variation_margin'], status: 'captured_for_editorial_review' }));

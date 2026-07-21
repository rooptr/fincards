import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const source = 'walmart_2024_annual_report';
const sourceUrl = 'https://stock.walmart.com/_assets/_46796feebc5ddf6d2adbeabac9558ae9/walmart/db/950/9651/annual_report/Walmart_2024-AR-10K_Searchable.pdf';
const rows = [
  { item: 'Cash and cash equivalents', value: '$9,867 million as of January 31, 2024', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Receivables, net', value: '$8,796 million as of January 31, 2024', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Inventories', value: '$54,892 million as of January 31, 2024', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Prepaid expenses and other', value: '$3,322 million as of January 31, 2024', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Total current assets', value: '$76,877 million as of January 31, 2024', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Total current liabilities', value: '$92,415 million as of January 31, 2024', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Current ratio', value: '0.83x, calculated as $76,877 million / $92,415 million', source, sourceField: 'Derived from the same-date balance sheet fields' },
  { item: 'Quick ratio', value: '0.20x, calculated as ($9,867 million + $8,796 million) / $92,415 million', source, sourceField: 'Derived from the same-date balance sheet fields; inventory and prepaids excluded' },
  { item: 'Cash ratio', value: '0.11x, calculated as $9,867 million / $92,415 million', source, sourceField: 'Derived from the same-date balance sheet fields' },
];
for (const topicId of ['cash_ratio', 'current_ratio', 'quick_ratio']) {
  catalog[topicId] = {
    status: 'captured_for_editorial_review',
    documentTitle: 'Walmart Inc. Annual Report 2024, Consolidated Balance Sheets',
    sourceUrl,
    summary: 'Walmart’s January 31, 2024 balance sheet provides the same-date cash, receivables, inventory, current asset, and current liability fields needed to compare broad, quick, and cash-only liquidity.',
    rows,
    image: '/evidence/walmart-liquidity-ratio-excerpt.svg',
    imageSource: sourceUrl,
  };
}
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['cash_ratio', 'current_ratio', 'quick_ratio'], status: 'captured_for_editorial_review' }));

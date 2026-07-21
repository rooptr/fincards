import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const source = 'walmart_2024_annual_report';
const sourceUrl = 'https://stock.walmart.com/_assets/_46796feebc5ddf6d2adbeabac9558ae9/walmart/db/950/9651/annual_report/Walmart_2024-AR-10K_Searchable.pdf';
const rows = [
  { item: 'Current assets, January 31, 2024', value: '$76,877 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Current liabilities, January 31, 2024', value: '$92,415 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Working capital, January 31, 2024', value: '-$15,538 million, calculated as current assets less current liabilities', source, sourceField: 'Derived from same-date balance sheet fields' },
  { item: 'Inventory, 2024 and 2023', value: '$54,892 million and $56,576 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Receivables, 2024 and 2023', value: '$8,796 million and $7,933 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Accounts payable, 2024 and 2023', value: '$56,812 million and $53,742 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Cost of sales, 2024 and 2023', value: '$490,142 million and $463,721 million', source, sourceField: 'Consolidated Statements of Income, page 54' },
  { item: 'Net sales, 2024 and 2023', value: '$642,637 million and $605,881 million', source, sourceField: 'Consolidated Statements of Income, page 54' },
  { item: 'Days Inventory Outstanding', value: '42.7 days, calculated from average inventory / average cost of sales × 365', source, sourceField: 'Derived from same-filing fields' },
  { item: 'Days Sales Outstanding', value: '4.9 days, calculated from average receivables / average net sales × 365', source, sourceField: 'Derived from same-filing fields' },
  { item: 'Days Payables Outstanding', value: '42.3 days, calculated from average accounts payable / average cost of sales × 365', source, sourceField: 'Derived from same-filing fields' },
  { item: 'Cash Conversion Cycle', value: '5.2 days, calculated as DIO + DSO − DPO', source, sourceField: 'Derived from same-filing fields' },
];
for (const topicId of ['cash_conversion_cycle', 'net_working_capital', 'working_capital']) {
  catalog[topicId] = {
    status: 'captured_for_editorial_review',
    documentTitle: 'Walmart Inc. Annual Report 2024, statements of income, balance sheets, and cash flows',
    sourceUrl,
    summary: 'Walmart’s FY2024 filing provides the balance-sheet and income-statement fields used to teach working-capital position and operating-cycle timing. Derived measures are labelled as derived.',
    rows,
    image: '/evidence/walmart-working-capital-excerpt.svg',
    imageSource: sourceUrl,
  };
}
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['cash_conversion_cycle', 'net_working_capital', 'working_capital'], status: 'captured_for_editorial_review' }));

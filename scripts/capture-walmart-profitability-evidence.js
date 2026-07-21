import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const source = 'walmart_2024_annual_report';
const sourceUrl = 'https://stock.walmart.com/_assets/_46796feebc5ddf6d2adbeabac9558ae9/walmart/db/950/9651/annual_report/Walmart_2024-AR-10K_Searchable.pdf';
const rows = [
  { item: 'Net sales, fiscal 2024', value: '$642,637 million', source, sourceField: 'Company Performance Metrics, page 38' },
  { item: 'Gross profit rate, fiscal 2024', value: '23.7%', source, sourceField: 'Company Performance Metrics, page 38' },
  { item: 'Operating income, fiscal 2024', value: '$27,012 million', source, sourceField: 'Company Performance Metrics, page 38' },
  { item: 'Operating income as a percentage of net sales', value: '4.2%', source, sourceField: 'Company Performance Metrics, page 38' },
  { item: 'Consolidated net income, fiscal 2024', value: '$16,270 million', source, sourceField: 'Consolidated Statements of Comprehensive Income, page 55' },
  { item: 'Net income attributable to Walmart', value: '$15,511 million', source, sourceField: 'Consolidated Statements of Comprehensive Income, page 55' },
  { item: 'Average total assets', value: '$247,798 million', source, sourceField: 'ROA reconciliation, page 39' },
  { item: 'Return on assets', value: '6.6%', source, sourceField: 'ROA reconciliation, page 39' },
  { item: 'Average invested capital', value: '$277,522 million', source, sourceField: 'ROI reconciliation, page 39' },
  { item: 'Walmart reported return on investment', value: '15.0%', source, sourceField: 'ROI reconciliation, page 39' },
  { item: 'Total Walmart shareholders’ equity, January 31, 2024', value: '$83,861 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Total Walmart shareholders’ equity, January 31, 2023', value: '$76,693 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Total assets, January 31, 2024', value: '$252,399 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Total assets, January 31, 2023', value: '$243,197 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Current liabilities, January 31, 2024', value: '$92,415 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Current liabilities, January 31, 2023', value: '$92,198 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Effective income tax rate, fiscal 2024', value: '25.5%', source, sourceField: 'Management Discussion and Analysis, page 41' },
  { item: 'ROE under stated convention', value: 'Approximately 19.3%, calculated as $15,511 million / average Walmart shareholders’ equity of $80,277 million', source, sourceField: 'Derived from same-filing fields' },
  { item: 'ROCE under stated convention', value: 'Approximately 17.4%, calculated as $27,012 million / average capital employed of $155,492 million', source, sourceField: 'Derived from same-filing fields; capital employed equals total assets less current liabilities' },
  { item: 'ROIC under stated convention', value: 'Approximately 7.3%, calculated as NOPAT of approximately $20,124 million / $277,522 million average invested capital', source, sourceField: 'Derived from same-filing fields; NOPAT applies the disclosed effective tax rate to operating income' },
];
for (const topicId of ['gross_margin', 'operating_margin', 'return_on_assets', 'return_on_equity', 'return_on_invested_capital', 'return_on_capital_employed']) {
  catalog[topicId] = {
    status: 'captured_for_editorial_review',
    documentTitle: 'Walmart Inc. Annual Report 2024, financial statements and company performance metrics',
    sourceUrl,
    summary: 'Walmart’s FY2024 filing provides the reported margins, returns, balance-sheet fields, tax rate, and invested-capital reconciliation used in this profitability family. Derived returns preserve the stated formula and are not presented as Walmart reported measures.',
    rows,
    image: '/evidence/walmart-profitability-excerpt.svg',
    imageSource: sourceUrl,
  };
}
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['gross_margin', 'operating_margin', 'return_on_assets', 'return_on_equity', 'return_on_invested_capital', 'return_on_capital_employed'], status: 'captured_for_editorial_review' }));

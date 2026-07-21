import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const source = 'walmart_2024_annual_report';
const sourceUrl = 'https://stock.walmart.com/_assets/_46796feebc5ddf6d2adbeabac9558ae9/walmart/db/950/9651/annual_report/Walmart_2024-AR-10K_Searchable.pdf';
const rows = [
  { item: 'Interest-bearing debt excluding lease obligations', value: '$40,457 million, calculated as $878 million short-term borrowings + $3,447 million current debt maturity + $36,132 million long-term debt', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Cash and cash equivalents', value: '$9,867 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Operating income', value: '$27,012 million', source, sourceField: 'Consolidated Statements of Income, page 54' },
  { item: 'Depreciation and amortisation', value: '$11,853 million', source, sourceField: 'Consolidated Statements of Cash Flows, page 58' },
  { item: 'EBITDA under stated convention', value: '$38,865 million, calculated as operating income + depreciation and amortisation', source, sourceField: 'Derived from same-filing fields' },
  { item: 'Total assets and goodwill', value: '$252,399 million and $28,113 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Total equity', value: '$90,349 million', source, sourceField: 'Consolidated Balance Sheets, page 56' },
  { item: 'Cash flow from operations', value: '$35,726 million', source, sourceField: 'Consolidated Statements of Cash Flows, page 58' },
  { item: 'Cash interest paid', value: '$2,519 million', source, sourceField: 'Consolidated Statements of Cash Flows, page 58' },
  { item: 'Principal repayments', value: '$4,217 million', source, sourceField: 'Consolidated Statements of Cash Flows, page 58' },
  { item: 'Debt interest and finance-lease interest', value: '$2,259 million and $424 million', source, sourceField: 'Consolidated Statements of Income, page 54' },
  { item: 'Rent used in fixed-charge convention', value: '$2,277 million', source, sourceField: 'Return on Investment reconciliation, page 39' },
  { item: 'Asset coverage ratio', value: 'Approximately 5.5x, calculated as ($252,399m − $28,113m) / $40,457m', source, sourceField: 'Derived under stated tangible-asset convention' },
  { item: 'Debt service coverage ratio', value: 'Approximately 5.3x, calculated as $35,726m / ($2,519m + $4,217m)', source, sourceField: 'Derived under stated cash-payment convention' },
  { item: 'Debt to equity ratio', value: 'Approximately 0.45x, calculated as $40,457m / $90,349m', source, sourceField: 'Derived under stated debt-scope convention' },
  { item: 'Fixed charge coverage ratio', value: 'Approximately 5.9x, calculated as ($27,012m + $2,277m) / ($2,683m + $2,277m)', source, sourceField: 'Derived under stated rent and interest convention' },
  { item: 'FFO to debt', value: 'Approximately 83.5%, calculated as $33,783m / $40,457m; FFO is CFO less approximately $1,943m of working-capital movements under the stated convention', source, sourceField: 'Derived under stated pre-working-capital convention' },
  { item: 'Interest coverage ratio', value: 'Approximately 10.1x, calculated as $27,012m / ($2,259m + $424m)', source, sourceField: 'Derived under stated interest-scope convention' },
  { item: 'Net leverage ratio', value: 'Approximately 0.79x, calculated as ($40,457m − $9,867m) / $38,865m', source, sourceField: 'Derived under stated cash and EBITDA convention' },
  { item: 'Total leverage ratio', value: 'Approximately 1.04x, calculated as $40,457m / $38,865m', source, sourceField: 'Derived under stated debt and EBITDA convention' },
];
for (const topicId of ['asset_coverage_ratio', 'debt_service_coverage_ratio', 'debt_to_equity_ratio', 'fixed_charge_coverage_ratio', 'ffo_to_debt', 'interest_coverage_ratio', 'net_leverage_ratio', 'total_leverage_ratio']) {
  catalog[topicId] = {
    status: 'captured_for_editorial_review',
    documentTitle: 'Walmart Inc. Annual Report 2024, statements of income, balance sheets, and cash flows',
    sourceUrl,
    summary: 'Walmart’s FY2024 filing provides real debt, cash, operating earnings, asset, equity, interest, principal, and cash-flow fields. Each ratio preserves an explicit debt and support convention.',
    rows,
    image: '/evidence/walmart-leverage-excerpt.svg',
    imageSource: sourceUrl,
  };
}
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['asset_coverage_ratio', 'debt_service_coverage_ratio', 'debt_to_equity_ratio', 'fixed_charge_coverage_ratio', 'ffo_to_debt', 'interest_coverage_ratio', 'net_leverage_ratio', 'total_leverage_ratio'], status: 'captured_for_editorial_review' }));

import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const ffoUrl = 'https://www.sec.gov/Archives/edgar/data/726728/000072672825000049/realtyincomeq42024supple.htm';
const navUrl = 'https://nsearchives.nseindia.com/corporate/ixbrl/INTEGRATED_FILING_RESULTIR_125490_10112025121312_iXBRL_WEB.html';
const image = '/evidence/reit-metrics-excerpt.svg';
catalog.funds_from_operations = {
  status: 'captured_for_editorial_review', documentTitle: 'Realty Income Q4 2024 Supplemental Operating and Financial Data', sourceUrl: ffoUrl,
  summary: 'The SEC-filed supplemental data reconciles net income to Normalized FFO and AFFO and identifies the adjustments that separate a REIT operating measure from cash available after recurring capital needs.',
  rows: [
    { item: 'Net income available to common stockholders, year ended December 31, 2024', value: '$847.893 million', source: 'realty_income_ffo_2024', sourceField: 'FFO and AFFO reconciliation' },
    { item: 'Normalized FFO available to common stockholders, year ended December 31, 2024', value: '$3,563.951 million', source: 'realty_income_ffo_2024', sourceField: 'FFO and AFFO reconciliation' },
    { item: 'AFFO available to common stockholders, year ended December 31, 2024', value: '$3,621.437 million', source: 'realty_income_ffo_2024', sourceField: 'FFO and AFFO reconciliation' },
    { item: 'Distributions paid to common stockholders, year ended December 31, 2024', value: '$2,691.719 million', source: 'realty_income_ffo_2024', sourceField: 'FFO and AFFO reconciliation' },
    { item: 'Recurring capital expenditures deducted in AFFO reconciliation', value: '$0.402 million', source: 'realty_income_ffo_2024', sourceField: 'FFO and AFFO reconciliation' },
    { item: 'Metric classification', value: 'FFO and AFFO are non-GAAP financial measures', source: 'realty_income_ffo_2024', sourceField: 'FFO and AFFO reconciliation footnote' },
  ], image, imageSource: ffoUrl,
};
catalog.net_asset_value = {
  status: 'captured_for_editorial_review', documentTitle: 'NSE iXBRL financial results and NAV statement for Embassy Office Parks REIT', sourceUrl: navUrl,
  summary: 'The NSE filing reports a fair-value NAV bridge for Embassy REIT for the six months ended September 30, 2025, including assets, liabilities, net assets attributable to unitholders, units, and NAV per unit.',
  rows: [
    { item: 'Fair-value total assets', value: 'Rs 690,877.00 lakh', source: 'embassy_reit_nse_nav_2025', sourceField: 'Statement of Net Assets at Fair Value' },
    { item: 'Fair-value total liabilities', value: 'Rs 268,206.00 lakh', source: 'embassy_reit_nse_nav_2025', sourceField: 'Statement of Net Assets at Fair Value' },
    { item: 'Fair-value net assets attributable to unitholders', value: 'Rs 422,671.00 lakh', source: 'embassy_reit_nse_nav_2025', sourceField: 'Statement of Net Assets at Fair Value' },
    { item: 'Units used in NAV calculation', value: '948 lakh units', source: 'embassy_reit_nse_nav_2025', sourceField: 'Statement of Net Assets at Fair Value' },
    { item: 'Fair-value NAV per unit', value: 'Rs 445.86', source: 'embassy_reit_nse_nav_2025', sourceField: 'Statement of Net Assets at Fair Value' },
    { item: 'Reporting date', value: 'September 30, 2025; unaudited consolidated filing', source: 'embassy_reit_nse_nav_2025', sourceField: 'Statement of Net Assets at Fair Value' },
  ], image, imageSource: navUrl,
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['funds_from_operations', 'net_asset_value'], status: 'captured_for_editorial_review' }));

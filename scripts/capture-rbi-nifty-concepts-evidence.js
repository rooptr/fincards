import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
catalog.balance_of_payments = {
  status: 'captured_for_editorial_review',
  documentTitle: 'RBI developments in India’s Balance of Payments during Q4 2023-24',
  sourceUrl: 'https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=58147',
  summary: 'RBI’s official release gives the dated current-account, trade, services, portfolio, FDI, and reserve flows needed to teach the balance-of-payments reconciliation.',
  rows: [
    { item: 'Q4 2023-24 current account balance', value: 'Surplus of US$5.7 billion, 0.6% of GDP', source: 'rbi_bop_q4_2023_24', sourceField: 'RBI press release, key features' },
    { item: 'Q3 2023-24 current account balance', value: 'Deficit of US$8.7 billion, 1.0% of GDP', source: 'rbi_bop_q4_2023_24', sourceField: 'RBI press release, key features' },
    { item: 'FY2023-24 current account balance', value: 'Deficit of US$23.2 billion, 0.7% of GDP', source: 'rbi_bop_q4_2023_24', sourceField: 'RBI press release, annual summary' },
    { item: 'FY2023-24 portfolio investment', value: 'Net inflow of US$44.1 billion', source: 'rbi_bop_q4_2023_24', sourceField: 'RBI press release, annual summary' },
    { item: 'FY2023-24 reserve accretion', value: 'US$63.7 billion on a balance-of-payments basis', source: 'rbi_bop_q4_2023_24', sourceField: 'RBI press release, annual summary' },
  ],
  image: '/evidence/rbi-nifty-concepts-excerpt.svg',
  imageSource: 'https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=58147',
};
catalog.modern_portfolio_theory = {
  status: 'captured_for_editorial_review',
  documentTitle: 'NSE Indices Nifty 50 Whitepaper 2024',
  sourceUrl: 'https://www.niftyindices.com/docs/default-source/indices/nifty-50/nifty-50-whitepaper-2024.pdf',
  summary: 'The official Nifty 50 whitepaper provides a real portfolio with 50 constituents, sector weights, market representation, turnover coverage, and historical sector composition for teaching diversification and covariance intuition.',
  rows: [
    { item: 'Nifty 50 constituents', value: '50 blue-chip companies', source: 'nifty50_whitepaper_2024', sourceField: 'Whitepaper, coverage and methodology' },
    { item: 'Average full market-cap representation at March 28, 2024', value: '47.36%', source: 'nifty50_whitepaper_2024', sourceField: 'Whitepaper, Exhibit 2' },
    { item: 'Average free-float market-cap representation at March 28, 2024', value: '57.35%', source: 'nifty50_whitepaper_2024', sourceField: 'Whitepaper, Exhibit 2' },
    { item: 'Average turnover coverage at March 28, 2024', value: '28.35%', source: 'nifty50_whitepaper_2024', sourceField: 'Whitepaper, Exhibit 2' },
    { item: 'Financial Services sector weight at March 28, 2024', value: '33.53%', source: 'nifty50_whitepaper_2024', sourceField: 'Whitepaper, Exhibit 5' },
    { item: 'Information Technology sector weight at March 28, 2024', value: '13.04%', source: 'nifty50_whitepaper_2024', sourceField: 'Whitepaper, Exhibit 5' },
  ],
  image: '/evidence/rbi-nifty-concepts-excerpt.svg',
  imageSource: 'https://www.niftyindices.com/docs/default-source/indices/nifty-50/nifty-50-whitepaper-2024.pdf',
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['balance_of_payments', 'modern_portfolio_theory'], status: 'captured_for_editorial_review' }));

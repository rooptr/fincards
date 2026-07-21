import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const sebiUrl = 'https://www.sebi.gov.in/sebi_data/attachdocs/jan-2025/1737111319202.pdf';
const niftyUrl = 'https://www.niftyindices.com/docs/default-source/indices/nifty-50/nifty-50-whitepaper-2024.pdf?sfvrsn=1cd6e35_4';
const niftyRows = [
  { item: 'Nifty 50 TR annualized return since June 30, 1999', value: '14.10%', source: 'nifty50_whitepaper_2024', sourceField: 'Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR annualized volatility since June 30, 1999', value: '22.25%', source: 'nifty50_whitepaper_2024', sourceField: 'Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR CAGR over 15 years', value: '15.63%', source: 'nifty50_whitepaper_2024', sourceField: 'Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR CAGR over 5 years', value: '15.28%', source: 'nifty50_whitepaper_2024', sourceField: 'Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR return to risk over 3 years', value: '1.19', source: 'nifty50_whitepaper_2024', sourceField: 'Exhibit 9, as of March 31, 2024' },
  { item: 'Nifty 50 TR dividend convention', value: 'Dividends are reinvested', source: 'nifty50_whitepaper_2024', sourceField: 'Nifty 50 TR methodology note' },
];

catalog.calmar_ratio = {
  status: 'captured_for_editorial_review',
  documentTitle: 'NSE Indices, Nifty 50 Whitepaper 2024',
  sourceUrl: niftyUrl,
  summary: 'The official Nifty 50 Total Return whitepaper supplies a real dated return history and risk profile. Maximum drawdown is intentionally retained as an explicit required field because the source does not publish a Calmar calculation.',
  rows: [...niftyRows, { item: 'Maximum drawdown required for Calmar', value: 'Not published in the cited exhibit; source separately before computing', source: 'nifty50_whitepaper_2024', sourceField: 'Editorial field-level control' }],
  image: '/evidence/risk-adjusted-returns-excerpt.svg',
  imageSource: niftyUrl,
};

catalog.information_ratio = {
  status: 'captured_for_editorial_review',
  documentTitle: 'SEBI Circular SEBI/HO/IMD/IMD-PoD-2/P/CIR/2025/6',
  sourceUrl: sebiUrl,
  summary: 'SEBI specifies Information Ratio as excess portfolio return divided by the standard deviation of excess return, using daily returns and the Tier 1 benchmark, and requires daily disclosure for equity-oriented schemes.',
  rows: [
    { item: 'Information Ratio formula', value: '(Portfolio Rate of Return less Benchmark Rate of Return) / Standard Deviation of Excess Return', source: 'sebi_information_ratio_2025', sourceField: 'SEBI circular, paragraph 5.1.4' },
    { item: 'Excess return definition', value: 'Portfolio Rate of Return less Benchmark Rate of Return', source: 'sebi_information_ratio_2025', sourceField: 'SEBI circular, paragraph 5.1.4' },
    { item: 'Volatility observation frequency', value: 'Daily return values', source: 'sebi_information_ratio_2025', sourceField: 'SEBI circular, paragraph 5.1.4' },
    { item: 'Disclosure frequency', value: 'Daily for equity-oriented mutual-fund schemes', source: 'sebi_information_ratio_2025', sourceField: 'SEBI circular, paragraph 5.1.1 and 5.1.3' },
    { item: 'Benchmark convention', value: 'Tier 1 benchmark currently used by the scheme', source: 'sebi_information_ratio_2025', sourceField: 'SEBI circular, paragraph 5.1.4' },
  ],
  image: '/evidence/risk-adjusted-returns-excerpt.svg',
  imageSource: sebiUrl,
};

for (const topicId of ['jensens_alpha', 'sharpe_ratio', 'sortino_ratio', 'treynor_ratio']) {
  const labels = {
    jensens_alpha: 'Jensen\'s Alpha',
    sharpe_ratio: 'Sharpe Ratio',
    sortino_ratio: 'Sortino Ratio',
    treynor_ratio: 'Treynor Ratio',
  };
  catalog[topicId] = {
    status: 'captured_for_editorial_review',
    documentTitle: 'NSE Indices, Nifty 50 Whitepaper 2024',
    sourceUrl: niftyUrl,
    summary: `${labels[topicId]} is taught against a real Nifty 50 Total Return benchmark context. The cited return and risk fields are source-backed; any additional risk-free, beta, target-return, or drawdown input remains explicit rather than fabricated.`,
    rows: niftyRows,
    image: '/evidence/risk-adjusted-returns-excerpt.svg',
    imageSource: niftyUrl,
  };
}

fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['calmar_ratio', 'information_ratio', 'jensens_alpha', 'sharpe_ratio', 'sortino_ratio', 'treynor_ratio'], status: 'captured_for_editorial_review' }));

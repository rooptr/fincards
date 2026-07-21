import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const sourceUrl = 'https://www.icicilombard.com/docs/default-source/public-disclosures/2024-25/icici-lombard-press-release-q4_fy2024.pdf';
const source = 'icici_lombard_fy2024_results';
const rows = [
  { item: 'Combined Ratio, FY2024', value: '103.3%', source, sourceField: 'ICICI Lombard FY2024 results release, page 1, performance bullet' },
  { item: 'Combined Ratio, FY2023', value: '104.5%', source, sourceField: 'ICICI Lombard FY2024 results release, page 1, performance bullet' },
  { item: 'Combined Ratio, FY2024 excluding CAT losses', value: '102.5%', source, sourceField: 'ICICI Lombard FY2024 results release, page 1, performance bullet' },
  { item: 'CAT losses excluded from FY2024 ratio', value: '₹1.37 billion', source, sourceField: 'ICICI Lombard FY2024 results release, page 1, performance bullet' },
  { item: 'Gross Direct Premium Income, FY2024', value: '₹247.76 billion', source, sourceField: 'ICICI Lombard FY2024 results release, page 1, performance bullet' },
  { item: 'Combined Ratio formula', value: '(Net Incurred Claims / Net Earned Premium) + ((Management Expenses less Commission on Reinsurance) / Net Written Premium)', source, sourceField: 'ICICI Lombard FY2024 results release, page 3, notes' },
  { item: 'Solvency Ratio at March 31, 2024', value: '2.62x', source, sourceField: 'ICICI Lombard FY2024 results release, page 2, performance bullet' },
  { item: 'Minimum regulatory solvency requirement', value: '1.50x', source, sourceField: 'ICICI Lombard FY2024 results release, page 2, performance bullet' },
];
catalog.combined_ratio = {
  status: 'captured_for_editorial_review',
  documentTitle: 'ICICI Lombard General Insurance Company Limited, FY2024 results press release',
  sourceUrl,
  summary: 'The official release defines the company’s Combined Ratio and reports FY2024, FY2023, and catastrophe-loss-adjusted results. It also supplies premium scale and solvency context for interpreting underwriting performance.',
  rows,
  image: '/evidence/icici-lombard-combined-ratio-excerpt.svg',
  imageSource: sourceUrl,
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['combined_ratio'], status: 'captured_for_editorial_review' }));

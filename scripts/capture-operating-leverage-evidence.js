import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
catalog.operating_leverage = {
  status: 'captured_for_editorial_review',
  documentTitle: 'Reliance Industries Integrated Annual Report 2024-25, Retail business performance',
  sourceUrl: 'https://www.ril.com/ar2024-25/retail.html',
  summary: 'Reliance Retail reported comparable revenue and EBITDA for FY 2024-25 and FY 2023-24, allowing an observed operating sensitivity calculation with EBITDA explicitly treated as a proxy for operating profit.',
  rows: [
    { item: 'Revenue from operations, FY 2024-25', value: 'Rs 291,043 crore', source: 'ril_retail_2024_25', sourceField: 'Financial performance table' },
    { item: 'Revenue from operations, FY 2023-24', value: 'Rs 273,131 crore', source: 'ril_retail_2024_25', sourceField: 'Financial performance table' },
    { item: 'EBITDA, FY 2024-25', value: 'Rs 25,094 crore', source: 'ril_retail_2024_25', sourceField: 'Financial performance table' },
    { item: 'EBITDA, FY 2023-24', value: 'Rs 23,108 crore', source: 'ril_retail_2024_25', sourceField: 'Financial performance table' },
    { item: 'Reported growth comparison', value: 'Revenue +6.6%; EBITDA +8.6%; observed EBITDA sensitivity approximately 1.30x', source: 'ril_retail_2024_25', sourceField: 'Financial performance table and reported year on year changes' },
  ],
  image: '/evidence/ril-retail-operating-leverage-excerpt.svg',
  imageSource: 'https://www.ril.com/ar2024-25/retail.html',
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['operating_leverage'], status: 'captured_for_editorial_review' }));

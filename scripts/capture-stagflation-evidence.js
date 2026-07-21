import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
catalog.stagflation = {
  status: 'captured_for_editorial_review',
  documentTitle: 'RBI, Seven Ages of India’s Monetary Policy',
  sourceUrl: 'https://www.rbi.org.in/commonman/Upload/English/speeches/PDFs/EMC24012020.PDF',
  summary: 'RBI’s monetary policy history records average growth around 4.0% alongside WPI based inflation around 8.8%, providing a real macroeconomic illustration of the joint condition behind stagflation.',
  rows: [
    { item: 'Average growth in cited period', value: 'Around 4.0%', source: 'rbi_seven_ages_monetary_policy', sourceField: 'Monetary policy history section' },
    { item: 'WPI based inflation in cited period', value: 'Around 8.8%', source: 'rbi_seven_ages_monetary_policy', sourceField: 'Monetary policy history section' },
    { item: 'Macroeconomic condition described', value: 'High inflation coinciding with weak growth', source: 'rbi_seven_ages_monetary_policy', sourceField: 'Monetary policy history section' },
  ],
  image: '/evidence/rbi-stagflation-history-excerpt.svg',
  imageSource: 'https://www.rbi.org.in/commonman/Upload/English/speeches/PDFs/EMC24012020.PDF',
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['stagflation'], status: 'captured_for_editorial_review' }));

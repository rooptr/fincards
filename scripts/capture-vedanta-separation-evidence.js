import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const source = 'vedanta_demerger_announcement_2023';
const sourceUrl = 'https://www.vedantalimited.com/img/media_mentions/press_release/2023/vedanta-demerger-announcement.pdf';
const rows = [
  { item: 'Announcement date', value: '29 September 2023', source, sourceField: 'Vedanta demerger announcement, page 1' },
  { item: 'Resulting listed companies planned', value: 'Six separate listed companies including Vedanta Limited', source, sourceField: 'Vedanta demerger announcement, page 2' },
  { item: 'Share entitlement', value: 'One share in each of the five newly listed companies for every one Vedanta Limited share held', source, sourceField: 'Vedanta demerger announcement, page 2' },
  { item: 'Profit concentration stated by Vedanta', value: 'More than 90% of Vedanta Limited’s profits were derived in India', source, sourceField: 'Vedanta demerger announcement, page 1' },
  { item: 'Stated strategic rationale', value: 'Independent management, capital allocation, and focused strategies for each vertical', source, sourceField: 'Vedanta demerger announcement, pages 1 to 2' },
];
for (const topicId of ['demerger', 'spinoff']) {
  catalog[topicId] = {
    status: 'captured_for_editorial_review',
    documentTitle: 'Vedanta Limited announcement of demerger into independent pure-play companies',
    sourceUrl,
    summary: 'Vedanta’s official announcement provides the dated separation proposal, business perimeter, six-company structure, one-for-one share entitlement, and stated value-creation rationale used by both lessons.',
    rows,
    image: '/evidence/vedanta-separation-excerpt.svg',
    imageSource: sourceUrl,
  };
}
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['demerger', 'spinoff'], status: 'captured_for_editorial_review' }));

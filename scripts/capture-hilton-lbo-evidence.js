import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const source = 'hilton_blackstone_sec_record';
const sourceUrl = 'https://www.sec.gov/Archives/edgar/data/47580/000110465907052273/a07-18077_1ex99d1.htm';
const rows = [
  { item: 'Announcement date', value: 'July 3, 2007', source, sourceField: 'Hilton Hotels Corporation Form 8-K, Exhibit 99.1' },
  { item: 'Acquisition consideration', value: '$47.50 per share', source, sourceField: 'Hilton Hotels Corporation Form 8-K, Exhibit 99.1' },
  { item: 'Transaction value', value: 'Approximately $26 billion', source, sourceField: 'Hilton Hotels Corporation Form 8-K, Exhibit 99.1' },
  { item: 'Premium to prior closing price', value: '40%', source, sourceField: 'Hilton Hotels Corporation Form 8-K, Exhibit 99.1' },
  { item: 'Initial term loan in 2013 credit agreement', value: '$7.6 billion', source: 'hilton_2013_credit_agreement', sourceField: 'Hilton Worldwide credit agreement, preliminary statements' },
  { item: 'Revolving credit facility in 2013 credit agreement', value: '$1.0 billion', source: 'hilton_2013_credit_agreement', sourceField: 'Hilton Worldwide credit agreement, preliminary statements' },
  { item: 'IPO price per share', value: '$20.00', source: 'hilton_2013_ipo_prospectus', sourceField: 'Hilton Worldwide Form 424B4, cover page' },
  { item: 'Newly issued shares in IPO', value: '64,102,564', source: 'hilton_2013_ipo_prospectus', sourceField: 'Hilton Worldwide Form 424B4, cover page' },
  { item: 'Sponsor beneficial ownership after IPO', value: 'Approximately 76.4%', source: 'hilton_2013_10k', sourceField: 'Hilton Worldwide 2013 Form 10-K, ownership and IPO history' },
];
for (const topicId of ['leveraged_buyout', 'moic']) {
  catalog[topicId] = {
    status: 'captured_for_editorial_review',
    documentTitle: 'Hilton Hotels and Hilton Worldwide SEC filings covering the Blackstone acquisition, financing, IPO, and ownership',
    sourceUrl,
    summary: 'The SEC record supplies the dated acquisition value, per share consideration, premium, later debt facilities, IPO price, share issuance, and sponsor ownership. It also makes the missing sponsor cash flow fields explicit for MOIC.',
    rows,
    image: '/evidence/hilton-lbo-excerpt.svg',
    imageSource: sourceUrl,
  };
}
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['leveraged_buyout', 'moic'], status: 'captured_for_editorial_review' }));

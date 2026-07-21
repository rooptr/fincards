import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const janSource = 'treasury_yield_curve_jan_2022';
const decSource = 'treasury_yield_curve_dec_2023';
const rows = [
  { item: 'January 3, 2022 2-year Treasury par yield', value: '0.78%', source: janSource, sourceField: 'Daily Treasury Par Yield Curve Rates, 01/03/2022' },
  { item: 'January 3, 2022 10-year Treasury par yield', value: '1.63%', source: janSource, sourceField: 'Daily Treasury Par Yield Curve Rates, 01/03/2022' },
  { item: 'January 3, 2022 10-year minus 2-year slope', value: '+0.85 percentage points', source: janSource, sourceField: 'Derived from same-date Treasury fields' },
  { item: 'December 1, 2023 2-year Treasury par yield', value: '4.73%', source: decSource, sourceField: 'Daily Treasury Par Yield Curve Rates, 12/01/2023' },
  { item: 'December 1, 2023 10-year Treasury par yield', value: '4.22%', source: decSource, sourceField: 'Daily Treasury Par Yield Curve Rates, 12/01/2023' },
  { item: 'December 1, 2023 10-year minus 2-year slope', value: '-0.51 percentage points', source: decSource, sourceField: 'Derived from same-date Treasury fields' },
];
for (const topicId of ['yield_curve', 'normal_yield_curve', 'inverted_yield_curve']) {
  catalog[topicId] = {
    status: 'captured_for_editorial_review',
    documentTitle: 'U.S. Treasury Daily Treasury Par Yield Curve Rates, January 2022 and December 2023',
    sourceUrl: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value=202312&type=daily_treasury_yield_curve',
    summary: 'Official Treasury par-yield tables provide dated 2-year and 10-year rates for an upward-sloping curve and an inverted curve. The lesson derives the slope from same-date fields.',
    rows,
    image: '/evidence/treasury-yield-curve-excerpt.svg',
    imageSource: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value=202312&type=daily_treasury_yield_curve',
  };
}
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['yield_curve', 'normal_yield_curve', 'inverted_yield_curve'], status: 'captured_for_editorial_review' }));

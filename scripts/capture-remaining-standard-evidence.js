import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const rilUrl = 'https://www.ril.com/ar2024-25/pdf/RIL-IAR-2025.pdf';
const rilO2cUrl = 'https://www.ril.com/ar2024-25/oil-to-chemicals.html';
const zomatoUrl = 'https://www.sebi.gov.in/sebi_data/attachdocs/jul-2021/1626944616560.pdf';
const ibbiUrl = 'https://ibbi.gov.in/uploads/legalframwork/76b5b16aec39d2b0e3a20c15f907f0ac.pdf';
const footballUrl = 'https://www.sec.gov/Archives/edgar/data/1051114/000157104913001212/t1300729_ex-c2.htm';
const image = '/evidence/remaining-standard-excerpt.svg';
const rilRows = [
  { item: 'RIL consolidated revenue FY2024-25', value: 'Rs 1,071,174 crore', source: 'ril_annual_report_2024_25', sourceField: 'Financial Performance and Review' },
  { item: 'RIL consolidated EBITDA FY2024-25', value: 'Rs 183,422 crore', source: 'ril_annual_report_2024_25', sourceField: 'Financial Performance and Review' },
  { item: 'RIL consolidated cash profit FY2024-25', value: 'Rs 146,917 crore', source: 'ril_annual_report_2024_25', sourceField: 'Financial Performance and Review' },
  { item: 'RIL O2C revenue FY2024-25', value: 'Rs 626,921 crore', source: 'ril_o2c_2024_25', sourceField: 'Oil to Chemicals business performance' },
  { item: 'RIL O2C EBITDA FY2024-25', value: 'Rs 54,988 crore', source: 'ril_o2c_2024_25', sourceField: 'Oil to Chemicals business performance' },
  { item: 'RIL segment result before interest and taxes FY2024-25', value: 'Rs 91,038 crore', source: 'ril_annual_report_2024_25', sourceField: 'Consolidated financial statements, segment information' },
  { item: 'RIL finance cost FY2024-25', value: 'Rs 24,269 crore', source: 'ril_annual_report_2024_25', sourceField: 'Consolidated financial statements, segment information' },
  { item: 'Marginal cost and marginal revenue fields', value: 'Not disclosed at product-unit increment in the cited filing', source: 'ril_o2c_2024_25', sourceField: 'Editorial control: no incremental value inferred from total revenue or total cost' },
];
for (const topicId of ['marginal_cost', 'marginal_revenue', 'ebitda_margin', 'interest_coverage_test']) {
  catalog[topicId] = { status: 'captured_for_editorial_review', documentTitle: 'Reliance Industries Integrated Annual Report 2024-25', sourceUrl: topicId === 'marginal_cost' || topicId === 'marginal_revenue' ? rilO2cUrl : rilUrl, summary: 'RIL supplies the real operating, earnings, and finance-cost fields. Missing product-level marginal values are explicitly identified rather than fabricated.', rows: rilRows, image, imageSource: rilUrl };
}
catalog.insolvency_and_bankruptcy = {
  status: 'captured_for_editorial_review', documentTitle: 'Insolvency and Bankruptcy Code, 2016, IBBI official text', sourceUrl: ibbiUrl,
  summary: 'The IBBI text supplies the legal process, creditor approval mechanics, and statutory time limits used to teach Indian corporate insolvency and the resolution versus liquidation decision.',
  rows: [
    { item: 'Normal CIRP period', value: '180 days from admission', source: 'ibbi_insolvency_bankruptcy_code', sourceField: 'Section 12' },
    { item: 'One-time extension', value: 'Up to 90 days with the required creditor resolution and adjudicating-authority approval', source: 'ibbi_insolvency_bankruptcy_code', sourceField: 'Section 12' },
    { item: 'Outer time limit', value: '330 days including time in legal proceedings', source: 'ibbi_insolvency_bankruptcy_code', sourceField: 'Section 12 proviso and IBBI explanatory material' },
    { item: 'Resolution versus liquidation', value: 'If resolution is not completed within the statutory process, liquidation may be initiated under the Code', source: 'ibbi_insolvency_bankruptcy_code', sourceField: 'Sections 12 and 33' },
  ], image, imageSource: ibbiUrl,
};
catalog.precedent_transactions = {
  status: 'captured_for_editorial_review', documentTitle: 'SEC-filed Sterling Partners fairness opinion valuation analyses', sourceUrl: footballUrl,
  summary: 'The SEC exhibit presents the actual valuation ranges used in a transaction fairness analysis, including public comparables, acquisition comparables, precedent premiums, and DCF.',
  rows: [
    { item: '52-week trading range', value: '$2.05 to $8.25 per share', source: 'sec_sterling_fairness_opinion', sourceField: 'Summary valuation observations' },
    { item: 'Public comparable company analysis', value: '$6.35 to $7.15 per share', source: 'sec_sterling_fairness_opinion', sourceField: 'Summary valuation observations' },
    { item: 'Comparable merger and acquisition analysis', value: '$5.02 to $5.69 per share', source: 'sec_sterling_fairness_opinion', sourceField: 'Summary valuation observations' },
    { item: 'Precedent premium analysis', value: '$5.99 to $7.63 per share', source: 'sec_sterling_fairness_opinion', sourceField: 'Summary valuation observations' },
    { item: 'Discounted cash flow analysis', value: '$7.24 to $7.72 per share', source: 'sec_sterling_fairness_opinion', sourceField: 'Summary valuation observations' },
    { item: 'Offer share price', value: '$8.20 per share', source: 'sec_sterling_fairness_opinion', sourceField: 'Summary valuation observations' },
  ], image, imageSource: footballUrl,
};
catalog.football_field_chart = { ...catalog.precedent_transactions, documentTitle: 'SEC-filed Sterling Partners fairness opinion football-field valuation summary', summary: 'The SEC exhibit shows how distinct valuation methods become aligned ranges on one share-price scale. The exhibit is the real evidence display for the chart architecture.' };
catalog.customer_acquisition_cost = {
  status: 'captured_for_editorial_review', documentTitle: 'Zomato Limited Prospectus dated July 19, 2021', sourceUrl: zomatoUrl,
  summary: 'Zomato reports customer volume, organic acquisition, and advertising and sales-promotion intensity. It also demonstrates why a clean paid CAC requires a paid new-customer denominator that the prospectus does not disclose.',
  rows: [
    { item: 'Average monthly transacting users in FY2021', value: '6.8 million', source: 'zomato_ipo_prospectus', sourceField: 'Business overview and risk factors' },
    { item: 'New customers acquired organically in FY2021', value: '68.0%', source: 'zomato_ipo_prospectus', sourceField: 'Business overview, customer acquisition' },
    { item: 'Advertising and sales-promotion expense as percentage of total income in FY2021', value: '24.88%', source: 'zomato_ipo_prospectus', sourceField: 'Management discussion and analysis' },
    { item: 'Total income in FY2021', value: 'Rs 21,184.24 million', source: 'zomato_ipo_prospectus', sourceField: 'Management discussion and analysis' },
    { item: 'Derived advertising and sales-promotion expense under stated percentage', value: 'Approximately Rs 5,270.64 million', source: 'zomato_ipo_prospectus', sourceField: 'Derived from same prospectus fields' },
    { item: 'Paid new-customer denominator', value: 'Not disclosed in the cited prospectus', source: 'zomato_ipo_prospectus', sourceField: 'Editorial control' },
  ], image, imageSource: zomatoUrl,
};
catalog.ltv_to_cac_ratio = {
  ...catalog.customer_acquisition_cost,
  summary: 'Zomato provides real cohort, frequency, acquisition, and promotion evidence. The prospectus does not provide a complete lifetime contribution and paid CAC schedule, so no LTV to CAC output is invented.',
  rows: [
    ...catalog.customer_acquisition_cost.rows,
    { item: 'Repeat-order cohort evidence', value: 'Fiscal 2018 cohort spend reached 2.4 times its starting level over the following three years', source: 'zomato_ipo_prospectus', sourceField: 'Business overview, GOV retention by cohorts' },
    { item: 'Complete lifetime contribution and paid CAC schedule', value: 'Not disclosed in the cited prospectus', source: 'zomato_ipo_prospectus', sourceField: 'Editorial control' },
  ],
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['marginal_cost', 'marginal_revenue', 'precedent_transactions', 'ebitda_margin', 'insolvency_and_bankruptcy', 'interest_coverage_test', 'football_field_chart', 'customer_acquisition_cost', 'ltv_to_cac_ratio'], status: 'captured_for_editorial_review' }));

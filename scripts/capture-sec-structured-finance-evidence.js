import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const regulationUrl = 'https://www.sec.gov/rules-regulations/2014/09/s7-08-10';
const exemptionUrl = 'https://www.sec.gov/rules-regulations/no-action-interpretive-exemptive-letters/division-investment-management-staff-no-action-interpretive-exemptive-letters/redwood-trust-081519-3c5';
catalog.regulation_ab = {
  status: 'captured_for_editorial_review',
  documentTitle: 'SEC Asset-Backed Securities Disclosure and Registration final rule and Corporation Finance Interpretations',
  sourceUrl: regulationUrl,
  summary: 'SEC primary material defines Regulation AB’s asset-backed security disclosure and reporting architecture, including asset-level information, transaction documents, and Form 10-D distribution reporting.',
  rows: [
    { item: 'Regulation AB section range', value: '17 CFR 229.1100 through 229.1125', source: 'sec_regulation_ab_final_rule', sourceField: 'SEC final rule and ABS issuance overview' },
    { item: 'Asset-level disclosure format', value: 'Specified standards and tagged XML data for applicable pools', source: 'sec_regulation_ab_final_rule', sourceField: 'SEC final rule overview' },
    { item: 'Distribution report', value: 'Form 10-D', source: 'sec_asset_backed_securities_cfi', sourceField: 'SEC Corporation Finance Interpretations, periodic reporting guidance' },
    { item: 'Form 10-D filing timing', value: 'Within 15 days after each required distribution date', source: 'sec_asset_backed_securities_cfi', sourceField: 'SEC Form 10-D general instruction' },
  ],
  image: '/evidence/sec-structured-finance-excerpt.svg',
  imageSource: regulationUrl,
};
catalog.investment_company_act_exemption = {
  status: 'captured_for_editorial_review',
  documentTitle: 'SEC Redwood Trust response on Investment Company Act Section 3(c)(5)(C)',
  sourceUrl: exemptionUrl,
  summary: 'SEC staff material explains the mortgage and real-estate finance exclusion and the asset-composition framework used to test qualifying interests, real-estate-type interests, and miscellaneous assets.',
  rows: [
    { item: 'Statutory provision', value: 'Investment Company Act Section 3(c)(5)(C)', source: 'sec_redwood_3c5c', sourceField: 'SEC Redwood Trust response, statutory discussion' },
    { item: 'Qualifying interests threshold', value: 'At least 55% of total assets', source: 'sec_redwood_3c5c', sourceField: 'SEC Redwood Trust response, Asset Composition Test' },
    { item: 'Qualifying plus real-estate-type interests threshold', value: 'At least 80% of total assets', source: 'sec_redwood_3c5c', sourceField: 'SEC Redwood Trust response, Asset Composition Test' },
    { item: 'Miscellaneous assets ceiling', value: 'No more than 20% of total assets', source: 'sec_redwood_3c5c', sourceField: 'SEC Redwood Trust response, Asset Composition Test' },
  ],
  image: '/evidence/sec-structured-finance-excerpt.svg',
  imageSource: exemptionUrl,
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['regulation_ab', 'investment_company_act_exemption'], status: 'captured_for_editorial_review' }));

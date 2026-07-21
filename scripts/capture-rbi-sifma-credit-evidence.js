import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
catalog.provision_coverage_ratio = {
  status: 'captured_for_editorial_review',
  documentTitle: 'RBI Bulletin, November 2024 banking-sector indicators',
  sourceUrl: 'https://www.rbi.org.in/Scripts/BS_ViewBulletin.aspx?Id=22990',
  summary: 'RBI reports the September 2024 gross NPA, net NPA, and Provision Coverage Ratio, supplying a real bank-sector context for the coverage measure.',
  rows: [
    { item: 'Gross NPA ratio at end September 2024', value: '2.5%', source: 'rbi_banking_bulletin_nov_2024', sourceField: 'RBI Bulletin, banking-sector indicators' },
    { item: 'Net NPA ratio at end September 2024', value: '0.6%', source: 'rbi_banking_bulletin_nov_2024', sourceField: 'RBI Bulletin, banking-sector indicators' },
    { item: 'Provision Coverage Ratio at end September 2024', value: '76.4%, provisional', source: 'rbi_banking_bulletin_nov_2024', sourceField: 'RBI Bulletin, banking-sector indicators' },
  ],
  image: '/evidence/rbi-sifma-credit-excerpt.svg',
  imageSource: 'https://www.rbi.org.in/Scripts/BS_ViewBulletin.aspx?Id=22990',
};
catalog.loan_to_value_ratio = {
  status: 'captured_for_editorial_review',
  documentTitle: 'RBI housing-loan LTV guidance and master circular',
  sourceUrl: 'https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=4331',
  summary: 'RBI defines LTV as total outstanding exposure divided by the realizable value of the mortgaged residential property and sets product-specific prudential boundaries.',
  rows: [
    { item: 'LTV numerator', value: 'Principal plus accrued interest plus other charges, without netting', source: 'rbi_ltv_housing_guidance', sourceField: 'RBI master circular, LTV computation definition' },
    { item: 'LTV denominator', value: 'Realizable value of the residential property mortgaged to the bank', source: 'rbi_ltv_housing_guidance', sourceField: 'RBI master circular, LTV computation definition' },
    { item: 'Small-value housing loan boundary', value: 'Housing loans up to ₹20 lakh may have LTV up to 90% under the cited RBI guidance', source: 'rbi_ltv_housing_guidance', sourceField: 'RBI housing-loan guidance' },
    { item: 'Housing loans exceeding ₹20 lakh under cited mortgage-guarantee guidance', value: 'LTV not exceeding 80%', source: 'rbi_ltv_housing_guidance', sourceField: 'RBI mortgage-guarantee guidance' },
  ],
  image: '/evidence/rbi-sifma-credit-excerpt.svg',
  imageSource: 'https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=4331',
};
catalog.public_securities_association_standard = {
  status: 'captured_for_editorial_review',
  documentTitle: 'SIFMA Uniform Practices, Standard Prepayment Model',
  sourceUrl: 'https://www.sifma.org/wp-content/uploads/2017/08/ch02.pdf',
  summary: 'SIFMA defines PSA as a standard mortgage prepayment benchmark expressed as a percentage of PSA, with 100 PSA reaching 6% CPR from the thirtieth month through maturity.',
  rows: [
    { item: 'PSA benchmark expression', value: 'Percentage of PSA', source: 'sifma_uniform_practices_psa', sourceField: 'SIFMA Uniform Practices, Standard Prepayment Model' },
    { item: 'Ramp period', value: 'First 30 months', source: 'sifma_uniform_practices_psa', sourceField: 'SIFMA Uniform Practices, Standard Prepayment Model' },
    { item: '100 PSA CPR after ramp', value: '6% CPR from month 30 through maturity', source: 'sifma_uniform_practices_psa', sourceField: 'SIFMA Uniform Practices, Standard Prepayment Model' },
  ],
  image: '/evidence/rbi-sifma-credit-excerpt.svg',
  imageSource: 'https://www.sifma.org/wp-content/uploads/2017/08/ch02.pdf',
};
fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['provision_coverage_ratio', 'loan_to_value_ratio', 'public_securities_association_standard'], status: 'captured_for_editorial_review' }));

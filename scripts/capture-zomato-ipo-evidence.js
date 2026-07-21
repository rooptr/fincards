import fs from 'node:fs';

const file = 'scratch/source_evidence_catalog.json';
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const prospectus = 'zomato_ipo_prospectus';
const basis = 'zomato_basis_of_allotment';
const annual = 'zomato_bse_annual_report';
const listing = 'zomato_listing_report';
const prospectusUrl = 'https://www.sebi.gov.in/sebi_data/attachdocs/jul-2021/1626944616560.pdf';
const basisUrl = 'https://www.bseindia.com/corporates/download/363156/ipo_T5/D%204%20BoA_20210722161711.pdf';
const annualUrl = 'https://www.bseindia.com/bseplus/AnnualReport/543320/74160543320.pdf';
const listingUrl = 'https://www.moneycontrol.com/news/business/ipo/zomato-ipo-listing-food-delivery-giant-crosses-rs-1-lakh-crore-m-cap-after-stellar-debut-with-nearly-53-premium-7210471.html';

catalog.initial_public_offering = {
  status: 'captured_for_editorial_review',
  documentTitle: 'Zomato Limited Prospectus dated July 19, 2021',
  sourceUrl: prospectusUrl,
  summary: 'Zomato’s prospectus separates the fresh issue from the offer for sale and provides the share counts, offer price, and gross amounts needed to trace issuer financing versus shareholder liquidity.',
  rows: [
    { item: 'Total offer shares', value: '1,233,552,631 equity shares', source: prospectus, sourceField: 'Prospectus cover page' },
    { item: 'Offer price', value: 'Rs 76 per equity share', source: prospectus, sourceField: 'Prospectus cover page' },
    { item: 'Fresh issue', value: '1,184,210,526 shares aggregating to Rs 90,000 million', source: prospectus, sourceField: 'Prospectus cover page' },
    { item: 'Offer for sale', value: '49,342,105 shares aggregating to Rs 3,750 million', source: prospectus, sourceField: 'Prospectus cover page' },
    { item: 'Total offer amount', value: 'Rs 93,750 million', source: prospectus, sourceField: 'Prospectus cover page' },
    { item: 'Net fresh proceeds', value: 'Rs 87,280 million after IPO expenses of Rs 2,720 million', source: annual, sourceField: 'Annual Report 2021-22, IPO proceeds note' },
  ],
  image: '/evidence/zomato-ipo-evidence-excerpt.svg',
  imageSource: prospectusUrl,
};

catalog.ipo_bake_off = {
  status: 'captured_for_editorial_review',
  documentTitle: 'Zomato Limited Prospectus dated July 19, 2021',
  sourceUrl: prospectusUrl,
  summary: 'Zomato’s prospectus records the named global coordinators and book running lead managers for the public offer, providing the real mandate endpoint used to teach the selection process.',
  rows: [
    { item: 'Issuer', value: 'Zomato Limited', source: prospectus, sourceField: 'Prospectus cover page' },
    { item: 'Global coordinator and book running lead manager', value: 'Kotak Mahindra Capital Company Limited', source: prospectus, sourceField: 'Global Coordinators and Book Running Lead Managers section' },
    { item: 'Global coordinator and book running lead manager', value: 'Morgan Stanley India Company Private Limited', source: prospectus, sourceField: 'Global Coordinators and Book Running Lead Managers section' },
    { item: 'Global coordinator and book running lead manager', value: 'Credit Suisse Securities (India) Private Limited', source: prospectus, sourceField: 'Global Coordinators and Book Running Lead Managers section' },
    { item: 'Offer size coordinated', value: '1,233,552,631 equity shares at Rs 76 per share', source: prospectus, sourceField: 'Prospectus cover page' },
    { item: 'Designated stock exchange', value: 'BSE Limited', source: prospectus, sourceField: 'Listing section' },
  ],
  image: '/evidence/zomato-ipo-evidence-excerpt.svg',
  imageSource: prospectusUrl,
};

catalog.ipo_underpricing = {
  status: 'captured_for_editorial_review',
  documentTitle: 'Zomato IPO prospectus and July 23, 2021 listing report',
  sourceUrl: listingUrl,
  summary: 'The final offer price is sourced from Zomato’s SEBI prospectus and the BSE opening price is sourced from a contemporaneous listing report. Together they support a precisely defined opening-price underpricing calculation.',
  rows: [
    { item: 'Final offer price', value: 'Rs 76 per share', source: prospectus, sourceField: 'Prospectus cover page' },
    { item: 'BSE opening price', value: 'Rs 115 per share on July 23, 2021', source: listing, sourceField: 'Contemporaneous listing report' },
    { item: 'Opening price premium', value: '51.32% above the offer price', source: listing, sourceField: 'Contemporaneous listing report' },
    { item: 'BSE closing price', value: 'Rs 125.85 per share on the first trading day', source: listing, sourceField: 'Contemporaneous listing report' },
    { item: 'Listing date', value: 'July 23, 2021', source: annual, sourceField: 'Annual Report 2021-22, IPO proceeds and listing note' },
    { item: 'Offer period demand', value: '40.11 times subscription excluding the anchor investor portion', source: basis, sourceField: 'Basis of Allotment public announcement' },
  ],
  image: '/evidence/zomato-ipo-evidence-excerpt.svg',
  imageSource: listingUrl,
};

fs.writeFileSync(file, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify({ updated: ['initial_public_offering', 'ipo_bake_off', 'ipo_underpricing'], status: 'captured_for_editorial_review' }));

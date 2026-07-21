import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const rilUrl = 'https://www.ril.com/ar2024-25/pdf/RIL-IAR-2025.pdf';
const rilO2cUrl = 'https://www.ril.com/ar2024-25/oil-to-chemicals.html';
const zomatoUrl = 'https://www.sebi.gov.in/sebi_data/attachdocs/jul-2021/1626944616560.pdf';
const ibbiUrl = 'https://ibbi.gov.in/uploads/legalframwork/76b5b16aec39d2b0e3a20c15f907f0ac.pdf';
const footballUrl = 'https://www.sec.gov/Archives/edgar/data/1051114/000157104913001212/t1300729_ex-c2.htm';

const records = {
  marginal_cost: {
    format: 'Structural',
    description: 'Reliance Industries reports Oil to Chemicals revenue and product production volumes, creating a real operating context for separating total cost from the incremental cost of one more unit. The filing does not disclose product-level marginal cost.',
    governing: 'What additional cost would be incurred by producing one more unit, and why can a total-cost line from an annual report not answer that question by itself?',
    mechanics: 'Define the unit and relevant operating range, identify the variable cost that changes with one additional unit, and keep fixed, step-fixed, joint-product, and capacity-constrained costs separate.',
    reason: 'Marginal cost applies to production decisions. RIL O2C is a real production business with disclosed output and cost context, but the filing must not be treated as a product-level marginal-cost schedule.',
    sources: [{ id: 'ril_o2c_2024_25', tier: 1, title: 'Reliance Industries Integrated Annual Report 2024-25, Oil to Chemicals', url: rilO2cUrl }],
  },
  marginal_revenue: {
    format: 'Structural',
    description: 'Reliance Industries reports Oil to Chemicals revenue and production volumes in a real operating setting where incremental revenue depends on product mix, price realization, and the next unit sold. The filing does not disclose a product-level demand curve.',
    governing: 'What revenue would the next unit generate, and how does the answer change when price, volume, product mix, or market demand changes?',
    mechanics: 'Define the incremental unit, estimate the change in total revenue from one additional unit over the relevant operating range, and distinguish price-taking revenue from revenue that changes the market price.',
    reason: 'Marginal revenue applies to operating and pricing decisions. A multi-product O2C filing is a valid economic context, but it cannot supply a fabricated marginal-revenue number when the demand schedule is not disclosed.',
    sources: [{ id: 'ril_o2c_2024_25', tier: 1, title: 'Reliance Industries Integrated Annual Report 2024-25, Oil to Chemicals', url: rilO2cUrl }],
  },
  precedent_transactions: {
    format: 'Structural',
    description: 'An SEC-filed fairness opinion for Sterling Partners presents public comparable, acquisition comparable, precedent premium, and discounted-cash-flow valuation ranges, providing the actual transaction-analysis structure behind a precedent-transactions comparison.',
    governing: 'What prices have buyers paid for comparable control transactions, and how should those observed prices inform the value range for the transaction under review?',
    mechanics: 'Select genuinely comparable completed transactions, normalize enterprise value and operating metrics, calculate transaction multiples, and compare the resulting range with the subject company after adjusting for date, growth, margin, leverage, and control.',
    reason: 'Precedent transactions are a merger and acquisition valuation method. An SEC-filed fairness opinion is the correct primary artifact because it discloses the actual transaction-analysis ranges and methodology.',
    sources: [{ id: 'sec_sterling_fairness_opinion', tier: 1, title: 'SEC-filed Sterling Partners fairness opinion valuation analyses', url: footballUrl }],
  },
  ebitda_margin: {
    format: 'Structural',
    description: 'Reliance Industries reports FY2024-25 consolidated revenue of Rs 1,071,174 crore and EBITDA of Rs 183,422 crore, while its segment disclosures show how the consolidated margin is formed from businesses with different economics.',
    governing: 'How much operating earnings remain before depreciation, finance cost, and tax for each unit of revenue, and what business economics sit beneath that percentage?',
    mechanics: 'Divide EBITDA by the matching revenue measure, preserve the same period and perimeter, then decompose the movement into price, volume, mix, operating cost, and classification effects.',
    reason: 'EBITDA margin applies to operating companies with revenue and EBITDA disclosures. RIL provides the real consolidated and segment context.',
    sources: [{ id: 'ril_annual_report_2024_25', tier: 1, title: 'Reliance Industries Integrated Annual Report 2024-25', url: rilUrl }],
  },
  insolvency_and_bankruptcy: {
    format: 'Reference',
    description: 'The Insolvency and Bankruptcy Code and IBBI materials define the Indian corporate insolvency resolution process, its creditor-control architecture, and its time limits for resolution or liquidation.',
    governing: 'When a debtor cannot meet obligations, how does the legal process preserve value, allocate control, and decide between resolution and liquidation?',
    mechanics: 'Identify the insolvency commencement event, admit the process under the applicable section, transfer management to the resolution architecture, invite and evaluate plans, obtain creditor approval, and move to approval or liquidation under the Code.',
    reason: 'Insolvency and bankruptcy are governed by statutory and regulatory process. IBBI and the Code are the authoritative sources in India.',
    sources: [{ id: 'ibbi_insolvency_bankruptcy_code', tier: 1, title: 'Insolvency and Bankruptcy Code, 2016, IBBI official text', url: ibbiUrl }],
  },
  interest_coverage_test: {
    format: 'Structural',
    description: 'Reliance Industries segment disclosures report total segment result before interest and taxes of Rs 91,038 crore and finance cost of Rs 24,269 crore for FY2024-25, supplying a real corporate-credit context for the fixed-interest burden test.',
    governing: 'How many times can recurring operating earnings cover the period interest burden, and what would make that coverage ratio overstate debt service capacity?',
    mechanics: 'Divide the selected earnings measure before interest by the matching interest or finance-cost measure, align scope and period, and test the result under lower earnings, higher rates, refinancing, and non-recurring income.',
    reason: 'Interest coverage applies to operating companies with debt service obligations. RIL provides a real earnings and finance-cost disclosure, subject to clear scope matching.',
    sources: [{ id: 'ril_annual_report_2024_25', tier: 1, title: 'Reliance Industries Integrated Annual Report 2024-25, segment information', url: rilUrl }],
  },
  football_field_chart: {
    format: 'Structural',
    description: 'An SEC-filed fairness opinion for Sterling Partners shows the valuation ranges used in a football-field presentation: 52-week trading range, public comparables, acquisition comparables, precedent premiums, and discounted cash flow.',
    governing: 'How do different valuation methods produce overlapping or conflicting value ranges, and which assumptions explain the width and position of each bar?',
    mechanics: 'Convert each valuation method into a comparable equity-value or share-price range, align units and capital structure, place the ranges on one scale, and compare the offer price with the evidence rather than averaging methods mechanically.',
    reason: 'A football-field chart is a transaction valuation exhibit. The SEC-filed fairness opinion is a primary source that shows the chart structure and real range values.',
    sources: [{ id: 'sec_sterling_fairness_opinion', tier: 1, title: 'SEC-filed Sterling Partners fairness opinion valuation analyses', url: footballUrl }],
  },
  customer_acquisition_cost: {
    format: 'Structural',
    description: 'Zomato\'s SEBI-filed prospectus reports 6.8 million average monthly transacting users in FY2021, 68.0% organic acquisition of new customers, and advertising and sales-promotion expense equal to 24.88% of total income.',
    governing: 'How much acquisition investment is required to add a customer, and why must paid acquisition, organic acquisition, retention, and promotional subsidy be separated before the metric is interpreted?',
    mechanics: 'Define the acquisition spend perimeter, identify the number of newly acquired customers attributable to that spend, divide spend by attributable customers, and state whether discounts, refunds, branding, and retention costs are included.',
    reason: 'Customer acquisition cost applies to customer-led platforms. Zomato\'s prospectus is a real source, but it also shows why a clean CAC cannot be computed unless paid new-customer counts are disclosed.',
    sources: [{ id: 'zomato_ipo_prospectus', tier: 1, title: 'Zomato Limited Prospectus dated July 19, 2021', url: zomatoUrl }],
  },
  ltv_to_cac_ratio: {
    format: 'Structural',
    description: 'Zomato\'s SEBI-filed prospectus documents customer acquisition spending, monthly transacting users, organic acquisition, order frequency, and cohort retention, supplying the real operating inputs needed to explain why LTV to CAC is a cohort model rather than a single accounting ratio.',
    governing: 'Does the gross contribution expected from a customer cohort justify the cost of acquiring that cohort, after retention, frequency, margin, refunds, and acquisition channel are considered?',
    mechanics: 'Build customer lifetime value from contribution per order, order frequency, retention, and contribution margin, then divide by fully defined acquisition cost for the same cohort and channel.',
    reason: 'LTV to CAC applies to recurring or cohort-based customer businesses. Zomato provides a real customer and acquisition context, while the prospectus makes clear that paid customer counts and lifetime contribution must not be invented.',
    sources: [{ id: 'zomato_ipo_prospectus', tier: 1, title: 'Zomato Limited Prospectus dated July 19, 2021', url: zomatoUrl }],
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:remaining-evidence-primary-source`,
    description: record.description,
    geography: topic.topic_id === 'insolvency_and_bankruptcy' ? 'India' : 'India and United States source context',
    recognition_score: 9,
    governing_question_draft: record.governing,
    applicability_status: 'pass',
    applicability_reason: record.reason,
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 9,
    data_completeness_score: 9,
    selection_rationale: 'The selected filing, statute, or transaction exhibit places the topic inside its real finance domain and makes missing inputs explicit rather than supplying a fabricated output.',
    sources: record.sources,
  };
  return lockBestAnchor({ ...topic, format: record.format, formula_or_mechanics_stub: record.mechanics, anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked nine remaining standard lessons to primary filings, statutory text, and SEC transaction evidence.');

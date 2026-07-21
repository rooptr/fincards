import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const source = { id: 'walmart_2024_annual_report', tier: 1, title: 'Walmart Inc. Annual Report 2024, statements of income, balance sheets, and cash flows', url: 'https://stock.walmart.com/_assets/_46796feebc5ddf6d2adbeabac9558ae9/walmart/db/950/9651/annual_report/Walmart_2024-AR-10K_Searchable.pdf' };
const records = {
  asset_coverage_ratio: 'How much asset value stands behind debt after removing less tangible assets, and how much cushion remains under a stressed recovery?',
  debt_service_coverage_ratio: 'Can operating cash flow cover the interest and principal payments that must be made during the period?',
  debt_to_equity_ratio: 'How much interest-bearing debt supports each dollar of total equity, and what does that financing mix imply for risk?',
  fixed_charge_coverage_ratio: 'How much operating profit is available after adding back fixed operating charges to cover interest and those fixed charges?',
  ffo_to_debt: 'What proportion of debt is supported by recurring funds generated before working-capital timing effects?',
  interest_coverage_ratio: 'How many times does operating income cover the interest expense that debt creates?',
  net_leverage_ratio: 'How much debt remains after cash is netted against it relative to operating earnings?',
  total_leverage_ratio: 'How large is total interest-bearing debt relative to operating earnings before depreciation and amortisation?',
};
const updated = topics.map((topic) => {
  if (!records[topic.topic_id]) return topic;
  const candidate = { candidate_id: `${topic.topic_id}:walmart-2024-10k`, description: `Walmart’s FY2024 10-K provides the debt, cash, operating-income, depreciation, asset, equity, interest, principal-repayment, and operating-cash-flow fields required to teach ${topic.canonical_name} under an explicit corporate-credit convention.`, geography: 'United States', recognition_score: 10, governing_question_draft: records[topic.topic_id], applicability_status: 'pass', applicability_reason: 'The ratio applies to a non-financial operating company with interest-bearing debt, operating earnings, assets, equity, and cash-flow disclosures; Walmart is a directly applicable corporate-credit anchor.', applicability_score: 10, source_quality_score: 10, teaching_value_score: 10, data_completeness_score: 10, selection_rationale: 'The official Walmart annual report supplies the real fields needed to calculate and critique the ratio, with each convention stated instead of hiding judgment inside the output.', sources: [source] };
  return lockBestAnchor({ ...topic, format: 'Structural', formula_or_mechanics_stub: `Use the ${topic.canonical_name} convention stated in the lesson, align the numerator and denominator to the same period and debt scope, calculate the ratio, and test the assumption that makes the credit conclusion valid.`, anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} leverage anchors to Walmart’s FY2024 10-K.`);

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const sources = [
  { id: 'rbi_government_securities_faq', tier: 1, title: 'Reserve Bank of India: Government securities FAQs', url: 'https://m.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=711' },
  { id: 'rbi_financial_markets_report', tier: 1, title: 'Reserve Bank of India: Financial Markets Report', url: 'https://www.rbi.org.in/Scripts/PublicationsView.aspx?id=22265' },
];

const records = {
  macaulay_duration: ['How long, in present-value-weighted time, does an investor wait to receive a bond’s cash flows?', 'Calculate the present value of each coupon and principal cash flow, weight each payment time by its present-value share of price, and sum the weighted times.', 'Macaulay duration applies to fixed-cash-flow bonds; it is a timing measure, not the direct price-sensitivity estimate.'],
  modified_duration: ['What approximate percentage price change follows a small yield change, and why does the estimate weaken when the yield move is large?', 'Divide Macaulay duration by one plus yield per compounding period, then multiply by the yield change with the inverse sign; state the compounding convention.', 'Modified duration applies to option-free fixed-income instruments under small parallel yield changes.'],
  effective_duration: ['How should interest-rate sensitivity be measured when cash flows can change as rates move, as with callable bonds or mortgage-backed securities?', 'Reprice the instrument under an upward and downward yield shock using an option-adjusted valuation, then divide the price difference by twice the initial price and the yield change.', 'Effective duration applies to instruments with embedded options or changing cash flows; modified duration is not sufficient.'],
  convexity: ['Why does duration alone understate or overstate a bond price change as yields move farther from the starting point?', 'Measure the second-order curvature of the price-yield relationship and add the convexity adjustment to the duration approximation for a stated yield change.', 'Convexity applies to fixed-income price-yield relationships and matters most for larger yield changes or longer-duration instruments.'],
  negative_convexity: ['Why can a mortgage or callable bond gain less when yields fall and lose more when yields rise than an option-free bond?', 'Identify the embedded issuer or borrower option, model the rate-dependent change in expected cash flows, and compare effective duration across rate scenarios.', 'Negative convexity applies to instruments whose holders are short an embedded option, such as callable bonds and many mortgage-backed securities.'],
  barbell_strategy: ['Why combine short and long maturities instead of holding the intermediate maturity that matches the portfolio’s average duration?', 'Allocate portfolio value across short- and long-maturity securities, calculate the combined duration and convexity, and compare reinvestment and curve exposure with a bullet portfolio.', 'A barbell is a fixed-income portfolio-construction strategy; it applies where the investor can choose maturities and manage reinvestment risk.'],
  bullet_strategy: ['When is concentrating maturities around one target date preferable to spreading duration across the curve?', 'Select securities that cluster around the liability or horizon date, calculate aggregate duration and key-rate exposure, and test cash-flow sufficiency at the target date.', 'A bullet strategy applies to liability or horizon matching in fixed-income portfolios; it is not a universal return-enhancement technique.'],
  ladder_strategy: ['How does staggering maturities create recurring liquidity and reduce the risk of reinvesting the whole portfolio at one market rate?', 'Allocate principal across maturity rungs, map each scheduled maturity and reinvestment date, and calculate the portfolio’s duration, cash-flow availability, and reinvestment exposure.', 'A ladder strategy applies to fixed-income investors seeking scheduled liquidity and diversified reinvestment dates.'],
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const [question, mechanics, reason] = record;
  const candidate = {
    candidate_id: `${topic.topic_id}:rbi-fixed-income-batch-011`,
    description: `RBI government-securities material supplies the Indian fixed-income market context for ${topic.canonical_name}; the lesson derives the portfolio or price-sensitivity mechanism rather than restating a bond definition.`,
    geography: 'India', recognition_score: 8, governing_question_draft: question,
    applicability_status: 'pass', applicability_reason: reason,
    applicability_score: 10, source_quality_score: 10, teaching_value_score: 9, data_completeness_score: 9,
    selection_rationale: 'RBI material anchors the concepts in the Indian government-securities market; each topic remains a distinct portfolio or interest-rate-risk decision.', sources,
  };
  return lockBestAnchor({
    ...topic, format: 'Structural', classification_status: 'reviewed',
    classification_rationale: 'Structural format confirmed because each topic is an interpretable fixed-income relationship or portfolio construction choice, not a spreadsheet dependency build.',
    formula_or_mechanics_stub: mechanics, anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} fixed-income anchors.`);

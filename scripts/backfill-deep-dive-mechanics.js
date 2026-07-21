import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const mechanics = {
  beneish_m_score: 'Compute the eight Beneish variables from two consecutive financial statements, apply the weighted M-Score equation, and interpret the result as a screening signal rather than proof of manipulation.',
  capitalizing_vs_expensing: 'Assess whether identifiable future economic benefits and reliable measurement support asset recognition; capitalize qualifying cost and amortize or impair it thereafter, otherwise expense it when incurred.',
  revenue_recognition: 'Apply the five-step IFRS 15 model: identify the contract, performance obligations, transaction price, allocation, and timing of revenue recognition.',
  deferred_tax_asset: 'Identify deductible temporary differences, tax losses, and credits; recognize the future tax benefit only to the extent that probable taxable profit supports utilization.',
  deferred_tax_liability: 'Identify taxable temporary differences between carrying amounts and tax bases, measure the resulting future tax consequence, and trace the reversal period.',
  basel_iii: 'Translate bank exposures into risk-weighted assets, capital-quality layers, leverage exposure, and liquidity constraints; compare each output with the applicable regulatory minimum.',
  capital_adequacy_ratio: 'Divide eligible regulatory capital by risk-weighted assets after assigning exposures their prescribed risk weights.',
  common_equity_tier_1_ratio: 'Divide Common Equity Tier 1 capital, net of regulatory deductions, by risk-weighted assets.',
  cash_reserve_ratio: 'Calculate the statutory cash reserve requirement against the relevant liability base and identify the earning-asset capacity removed by the reserve.',
  statutory_liquidity_ratio: 'Calculate the required approved liquid-asset holding against the relevant liability base and distinguish it from CRR and internal liquidity buffers.',
  net_stable_funding_ratio: 'Divide available stable funding by required stable funding across asset, liability, and off-balance-sheet categories over the one-year horizon.',
  camel_rating: 'Assess the bank across capital adequacy, asset quality, management, earnings, and liquidity, then distinguish component observations from the composite supervisory judgment.',
  camels_rating_system: 'Assess capital adequacy, asset quality, management, earnings, liquidity, and systems or sensitivity factors, then explain how the supervisory framework informs intervention.',
  loan_to_deposit_ratio: 'Divide total bank credit by aggregate deposits, then interpret the result alongside funding stability, liquidity buffers, loan quality, and the credit cycle.',
  duration: 'Discount each promised cash flow at yield to maturity, weight each payment date by its present-value share, and use the resulting duration to estimate price sensitivity to yield changes.',
};

let updatedCount = 0;
const updated = topics.map((topic) => {
  if (topic.formula_or_mechanics_stub || !mechanics[topic.topic_id]) return topic;
  updatedCount += 1;
  return { ...topic, formula_or_mechanics_stub: mechanics[topic.topic_id] };
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Backfilled ${updatedCount} mechanics stubs.`);

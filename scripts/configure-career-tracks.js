import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(file, 'utf8'));

const includesAny = (id, terms) => terms.some((term) => id.includes(term));
const structuredTerms = ['securitization', 'securitisation', 'asset_backed', 'pass_through', 'pay_through', 'tranching', 'special_purpose_vehicle', 'bankruptcy_remoteness', 'payment_waterfall', 'psa_', 'regulation_ab', 'whole_business'];
const ratingsTerms = ['credit_', 'rating', 'altman_', 'five_cs', 'probability_of_default', 'loss_given_default', 'transition_matrix', 'merton_', 'texas_ratio', 'interest_coverage', 'debt_service_coverage', 'asset_coverage', 'provision_coverage', 'leverage_ratio', 'camel', 'camels'];
const privateCreditTerms = ['loan_to_value', 'loan_to_deposit', 'net_leverage', 'fixed_charge', 'debt_to_equity', 'debt_service', 'interest_coverage', 'working_capital', 'leverage', 'lbo_', 'leveraged_buyout', 'marginal_cost_of_funds'];
const marketsTerms = ['option', 'delta', 'gamma', 'theta', 'vega', 'volatility', 'straddle', 'vix_', 'duration', 'yield_curve', 'carry_trade', 'backwardation', 'contango', 'margin'];
const valuationTerms = ['valuation', 'wacc', 'discounted_cash_flow', 'gordon_growth', 'terminal_value', 'enterprise_value', 'equity_value', 'price_to_', 'trading_comps', 'comparable_company', 'precedent_', 'football_field', 'net_asset_value', 'sum_of_the_parts'];

const updated = topics.map((topic) => {
  const id = topic.topic_id;
  const tracks = new Set(topic.career_tracks ?? []);
  if (topic.experience_type === 'modeling_studio' || topic.format === 'Modeling Lab') tracks.add('modeling_studio');
  if (topic.experience_type === 'securitisation_desk' || includesAny(id, structuredTerms)) tracks.add('structured_finance');
  if (includesAny(id, ratingsTerms)) tracks.add('ratings_and_credit_judgment');
  if (includesAny(id, privateCreditTerms)) tracks.add('private_credit_practice');
  if (includesAny(id, marketsTerms)) tracks.add('markets_and_risk');
  if (includesAny(id, valuationTerms)) tracks.add('valuation_and_transactions');
  tracks.add('finance_roles_core');
  return { ...topic, career_tracks: [...tracks], decision_case_eligible: topic.eligibility === 'ready' };
});

fs.writeFileSync(file, `${JSON.stringify(updated, null, 2)}\n`);
const counts = {};
for (const topic of updated.filter((item) => item.eligibility === 'ready')) for (const track of topic.career_tracks) counts[track] = (counts[track] ?? 0) + 1;
console.log(JSON.stringify(counts));

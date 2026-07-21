import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(file, 'utf8'));

const securitisationTerms = [
  'securitization', 'securitisation', 'asset_backed', 'pass_through', 'pay_through',
  'tranching', 'special_purpose_vehicle', 'bankruptcy_remoteness', 'payment_waterfall',
  'credit_card', 'auto_loan', 'psa_prepayment', 'pro_rata_pay', 'whole_business',
];

const requirementsFor = (experienceType) => ({
  requires_real_inputs: true,
  requires_source_field: true,
  requires_as_of_date: true,
  requires_decision_output: true,
  requires_stress_trace: experienceType !== 'decision_case',
});

const updated = topics.map((topic) => {
  if (topic.eligibility !== 'ready') return topic;
  const isSecuritisation = securitisationTerms.some((term) => topic.topic_id.includes(term));
  const experienceType = isSecuritisation
    ? 'securitisation_desk'
    : topic.format === 'Modeling Lab'
      ? 'modeling_studio'
      : 'standard';
  return {
    ...topic,
    experience_type: experienceType,
    decision_case_eligible: true,
    applied_learning_requirements: requirementsFor(experienceType),
  };
});

fs.writeFileSync(file, `${JSON.stringify(updated, null, 2)}\n`);
const counts = Object.groupBy(updated.filter((topic) => topic.eligibility === 'ready'), (topic) => topic.experience_type);
console.log(JSON.stringify(Object.fromEntries(Object.entries(counts).map(([key, value]) => [key, value.length]))));

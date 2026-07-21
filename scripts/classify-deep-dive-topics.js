import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const REFERENCE_FAMILIES = new Set([
  'accounting_fundamentals', 'basel_accords', 'central_banking_monetary_policy',
  'commercial_banking_fundamentals', 'financial_regulations', 'indian_banking_regulations',
  'securities_markets_regulation', 'taxation', 'corporate_governance', 'esg_sustainable_finance',
]);
const MODELING_FAMILIES = new Set([
  'capital_budgeting', 'capital_structure_theory', 'valuation_methods', 'mergers_acquisitions',
  'private_equity', 'fixed_income_valuation', 'derivatives', 'project_finance',
]);

function inferFormat(topic) {
  if (topic.format) return topic.format;
  if (REFERENCE_FAMILIES.has(topic.mainTopic)) return 'Reference';
  if (MODELING_FAMILIES.has(topic.mainTopic) || /model|schedule|analysis|valuation|budget|forecast|sensitivity|scenario/i.test(topic.canonical_name)) return 'Modeling Lab';
  return 'Structural';
}

const classified = topics.map((topic) => ({
  ...topic,
  format: inferFormat(topic),
  classification_status: topic.format ? 'reviewed' : 'rule_based_pending_review',
  classification_rationale: topic.format
    ? topic.classification_rationale ?? 'Previously classified.'
    : 'Format inferred from topic family or mechanics vocabulary; applicability and anchor research remain pending.',
}));

fs.writeFileSync(topicsPath, `${JSON.stringify(classified, null, 2)}\n`);
console.log(`Classified ${classified.filter((topic) => topic.classification_status === 'rule_based_pending_review').length} previously unclassified topics. None were made ready.`);

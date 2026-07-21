import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readinessStatus, researchBrief } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topics = JSON.parse(fs.readFileSync(path.join(root, 'src/data/deep_dive_topics.json'), 'utf8'));
const hooks = JSON.parse(fs.readFileSync(path.join(root, 'src/data/reality_hooks.json'), 'utf8'));

function normalize(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function routeCandidates(topic) {
  if (topic.format) return [{ format: topic.format, rationale: 'Already assigned in readiness records.' }];
  const family = normalize(topic.mainTopic);
  const name = normalize(topic.canonical_name);
  const referenceFamily = /(basel|central bank|regulation|accounting standard|derivative|isda|monetary policy|banking fundamentals)/.test(`${family} ${name}`);
  const modelingFamily = /(model|dcf|lbo|schedule|sensitivity|valuation build)/.test(`${family} ${name}`);
  if (modelingFamily) return [{ format: 'Modeling Lab', rationale: 'Name or topic family suggests a repeatable analytical build; confirm it is not a single tool feature.' }, { format: 'Structural', rationale: 'Fallback if the topic teaches the mechanics but does not require a full build.' }];
  if (referenceFamily) return [{ format: 'Reference', rationale: 'A governing standard, regulatory framework, or contract is likely the primary teaching authority.' }, { format: 'Structural', rationale: 'Fallback if the document is evidence rather than the governing object.' }];
  return [{ format: 'Structural', rationale: 'Default candidate for a formula, ratio, framework, or repeatable finance concept without a confirmed event.' }, { format: 'Narrative', rationale: 'Use only if research finds a real event that created a clear need for the concept.' }, { format: 'Reference', rationale: 'Use if an authoritative document governs the concept.' }];
}

function hookCandidates(topic) {
  const topicName = normalize(topic.canonical_name);
  const topicId = normalize(topic.topic_id).replace(/ model$/, '');
  return hooks
    .filter((hook) => {
      const hookName = normalize(hook.name);
      const hookId = normalize(hook.id);
      return hookName === topicName || hookId === normalize(topic.topic_id) || hookName === topicId;
    })
    .filter((hook, index, all) => all.findIndex((candidate) => candidate.id === hook.id && candidate.anchor === hook.anchor) === index)
    .slice(0, 5)
    .map((hook) => ({ id: hook.id, anchor: hook.anchor, description: hook.description, discovery_only: true }));
}

const FAMILY_PRIORITY = new Map([
  ['income_statement_analysis', 1], ['cash_flow_statement', 1], ['working_capital_management', 1],
  ['liquidity_ratios', 1], ['leverage_solvency_ratios', 1], ['profitability_ratios', 1],
  ['credit_analysis', 1], ['cost_of_capital', 1], ['capital_asset_pricing_model', 1],
  ['discounted_cash_flow', 1], ['comparable_company_analysis', 1], ['enterprise_vs_equity_value', 1],
  ['capital_budgeting', 1], ['capital_structure_theory', 1], ['modeling_debt_schedules', 1],
  ['modeling_revenue_and_costs', 1], ['valuation_modeling', 1], ['scenario_and_sensitivity_analysis', 1],
  ['fixed_income_fundamentals', 2], ['duration_and_convexity', 2], ['yield_curve_analysis', 2],
  ['central_banking_monetary_policy', 2], ['commercial_banking_fundamentals', 2], ['basel_accords', 2],
  ['non_performing_assets', 2], ['restructuring_and_bankruptcy', 2], ['mergers_and_acquisitions', 2],
  ['leveraged_buyout_analysis', 2], ['lbo_modeling', 2], ['securitization', 2],
]);

function researchStage(topic) {
  if (topic.classification_status !== 'reviewed') return 'classify_then_research';
  if (topic.applicability_check?.status !== 'pass') return 'applicability_then_anchor';
  return 'anchor_and_sources';
}

function sourceTargets(topic) {
  if (topic.format === 'Reference') return ['India: RBI, SEBI, MCA, ICAI, NSE/BSE or the governing body', 'Global fallback: BIS, IFRS/IASB, SEC, FASB, ISDA or equivalent'];
  if (topic.format === 'Modeling Lab') return ['Company filings for historical inputs', 'Observable market inputs and an explicit assumptions register'];
  return ['Primary filing, regulator record, or issuer disclosure', 'One authoritative technical or academic source where the concept requires it'];
}

const worklist = topics
  .filter((topic) => topic.eligibility !== 'flashcards_only')
  .filter((topic) => topic.eligibility !== 'ready')
  .filter((topic) => !topic.eligibility.startsWith('duplicate_of:'))
  .map((topic) => ({
    topic_id: topic.topic_id,
    canonical_name: topic.canonical_name,
    mainTopic: topic.mainTopic,
    current_format: topic.format,
    route_candidates: routeCandidates(topic),
    family_priority: FAMILY_PRIORITY.get(topic.mainTopic) ?? 3,
    research_stage: researchStage(topic),
    domain_guardrail: topic.applicability_check?.reason ?? null,
    mechanics_stub: topic.formula_or_mechanics_stub ?? 'Research and write the formula or procedural mechanics before drafting lesson prose.',
    source_targets: sourceTargets(topic),
    anchor_policy: topic.anchor_preference ?? {
      preferred_geography: 'India',
      fallback: 'globally-recognized-case',
      rule: 'Use India when the case is famous, sourceable, and concept-correct; otherwise use the strongest global case.',
    },
    anchor_is_not_precommitted: true,
    existing_hook_candidates: hookCandidates(topic),
    readiness: researchBrief(topic),
    research_status: 'queued',
    next_action: topic.format
      ? 'Research and rank applicable anchor candidates; lock only the best source-backed candidate.'
      : 'Confirm format, then research and rank applicable anchor candidates.',
  }))
  .sort((a, b) => a.family_priority - b.family_priority
    || a.mainTopic.localeCompare(b.mainTopic)
    || a.canonical_name.localeCompare(b.canonical_name))
  .map((item, index) => ({ ...item, queue_order: index + 1 }));

const outputPath = path.join(root, 'src/data/deep_dive_research_queue.json');
fs.writeFileSync(outputPath, `${JSON.stringify(worklist, null, 2)}\n`);
const routes = worklist.reduce((counts, item) => {
  const route = item.route_candidates[0]?.format ?? 'unclassified';
  counts[route] = (counts[route] ?? 0) + 1;
  return counts;
}, {});
console.log(`Wrote ${worklist.length} research records to src/data/deep_dive_research_queue.json.`);
console.log(JSON.stringify(routes));
const summary = {
  total: worklist.length,
  by_stage: worklist.reduce((counts, item) => ({ ...counts, [item.research_stage]: (counts[item.research_stage] ?? 0) + 1 }), {}),
  by_priority: worklist.reduce((counts, item) => ({ ...counts, [`priority_${item.family_priority}`]: (counts[`priority_${item.family_priority}`] ?? 0) + 1 }), {}),
  first_batch: worklist.slice(0, 24).map(({ queue_order, topic_id, canonical_name, mainTopic, current_format, research_stage }) => ({ queue_order, topic_id, canonical_name, mainTopic, current_format, research_stage })),
};
fs.writeFileSync(path.join(root, 'scratch/deep_dive_research_worklist_summary.json'), `${JSON.stringify(summary, null, 2)}\n`);

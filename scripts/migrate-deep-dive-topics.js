import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const searchPath = path.join(root, 'src/data/search_index.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const searchIndex = JSON.parse(fs.readFileSync(searchPath, 'utf8'));

const canonicalMerges = new Map([
  ['capm', 'capital_asset_pricing_model'],
  ['price_to_earnings', 'price_to_earnings_ratio'],
  ['sum_of_the_parts', 'sum_of_the_parts_valuation'],
]);

const aliases = {
  capital_asset_pricing_model: ['CAPM'],
  price_to_earnings_ratio: ['P/E', 'Price to Earnings'],
  sum_of_the_parts_valuation: ['SOTP', 'Sum of the Parts'],
};

const modelingLabs = new Map([
  ['three_statement_modeling', 'integrated_model'],
  ['modeling_debt_schedules', 'integrated_model'],
  ['working_capital_modeling', 'integrated_model'],
  ['modeling_revenue_and_costs', 'integrated_model'],
  ['scenario_and_sensitivity_analysis', 'scenario_model'],
  ['dcf_model', 'valuation_model'],
  ['discounted_cash_flow', 'valuation_model'],
  ['unlevered_dcf', 'valuation_model'],
  ['terminal_value', 'valuation_model'],
  ['gordon_growth_model', 'valuation_model'],
  ['dividend_discount_model', 'valuation_model'],
  ['lbo_modeling', 'transaction_model'],
  ['lbo_analysis', 'transaction_model'],
  ['lbo_irr_drivers', 'transaction_model'],
  ['lbo_valuation', 'transaction_model'],
  ['sources_and_uses', 'transaction_model'],
  ['accretion_dilution_analysis', 'transaction_model'],
  ['binomial_option_pricing_model', 'pricing_model'],
  ['black_scholes_model', 'pricing_model'],
  ['psa_prepayment_model', 'cash_flow_model'],
]);

const sec10Q = {
  id: 'bbb_2022_q3_10q',
  tier: 1,
  title: 'Bed Bath & Beyond Inc. Form 10-Q for the quarter ended November 26, 2022',
  url: 'https://www.sec.gov/Archives/edgar/data/886158/000088615823000026/bbby-20221126.htm',
};
const secBankruptcy = {
  id: 'bbb_2023_chapter_11_8k',
  tier: 1,
  title: 'Bed Bath & Beyond Inc. Form 8-K, Chapter 11 filing',
  url: 'https://www.sec.gov/Archives/edgar/data/886158/000119312523111754/d465247d8k.htm',
};
const secTarget2024 = {
  id: 'target_2024_10k',
  tier: 1,
  title: 'Target Corporation 2024 Annual Report / Form 10-K',
  url: 'https://www.sec.gov/Archives/edgar/data/27419/000002741925000091/a2024_annualxreportxfinal.pdf',
};
const bisLcrStandard = {
  id: 'bis_bcbs238_lcr',
  tier: 1,
  title: 'Basel III: The Liquidity Coverage Ratio and liquidity risk monitoring tools',
  url: 'https://www.bis.org/publ/bcbs238.htm',
};

const pilotOverrides = {
  current_ratio: {
    format: 'Structural',
    anchor_description: 'Target Corporation’s 2024 Form 10-K provides a real inventory-heavy operating-company balance sheet for separating accounting working capital from near-term payment capacity.',
    sources: [secTarget2024],
    governing_question_draft: 'When all current assets are treated as equally available, what does the balance sheet conceal about the timing and certainty of short-term liquidity?',
    formula_or_mechanics_stub: 'Current Ratio = Current Assets / Current Liabilities.',
    applicability_check: {
      status: 'pass',
      reason: 'Current Ratio is designed for non-financial operating companies whose current assets include inventory and receivables; Target is a large operating retailer with that working-capital structure.',
    },
    eligibility: 'ready',
    research_status: 'reviewed',
  },
  liquidity_coverage_ratio: {
    format: 'Reference',
    anchor_description: 'The Basel Committee’s Liquidity Coverage Ratio standard defines the regulatory liquidity framework for banks under a 30-day stress scenario.',
    sources: [bisLcrStandard],
    governing_question_draft: 'How does a bank demonstrate that its stock of high-quality liquid assets can cover modeled net cash outflows during a 30-day stress scenario?',
    formula_or_mechanics_stub: 'LCR = Stock of High-Quality Liquid Assets / Total Net Cash Outflows over the next 30 calendar days.',
    applicability_check: {
      status: 'pass',
      reason: 'LCR is a bank-specific regulatory liquidity measure; the Basel Committee standard directly governs its purpose, inputs, and stress horizon.',
    },
    eligibility: 'ready',
    research_status: 'reviewed',
  },
  quick_ratio: {
    format: 'Narrative',
    anchor_description: 'Bed Bath & Beyond filed Chapter 11 on April 23, 2023 after reporting a balance sheet dominated by inventory and a thin cash position in late 2022.',
    sources: [sec10Q, secBankruptcy],
    governing_question_draft: 'When most current assets are inventory, how much of a retailer\'s near-term obligations can cash and immediately collectible assets actually cover?',
    formula_or_mechanics_stub: 'Quick Ratio = (Cash + marketable securities + accounts receivable) / current liabilities.',
    applicability_check: {
      status: 'pass',
      reason: 'Quick Ratio is designed for operating companies such as inventory-heavy retailers, where inventory can materially overstate immediately available liquidity.',
    },
    eligibility: 'ready',
    research_status: 'reviewed',
  },
  three_statement_modeling: {
    format: 'Modeling Lab',
    lab_family: 'integrated_model',
    anchor_description: 'Bed Bath & Beyond\'s November 2022 Form 10-Q supplies a real operating-company data pack for tracing income statement outputs into cash flow and the balance sheet.',
    sources: [sec10Q],
    governing_question_draft: 'How do revenue, expenses, non-cash charges, working-capital movements, and financing activity connect the three financial statements?',
    formula_or_mechanics_stub: 'Build income statement outputs first, reconcile non-cash and working-capital movements in cash flow, then prove the ending cash balance and balance sheet tie.',
    applicability_check: {
      status: 'pass',
      reason: 'Three-statement modeling is an operating-company analytical build; an inventory-holding retailer provides the required income statement, cash flow, and balance-sheet dependencies.',
    },
    eligibility: 'ready',
    research_status: 'reviewed',
  },
};

const migrated = topics
  .filter((topic) => !canonicalMerges.has(topic.topic_id ?? topic.id))
  .map((topic) => {
    const topicId = topic.topic_id ?? topic.id;
    const canonicalName = topic.canonical_name ?? topic.name;
    const mainTopic = topic.mainTopic ?? topic.main_topic ?? '';
    const pilot = pilotOverrides[topicId];
    const isExcel = /excel/i.test(`${topicId} ${canonicalName} ${mainTopic}`);
    const labFamily = modelingLabs.get(topicId) ?? topic.lab_family ?? null;
    return {
      topic_id: topicId,
      canonical_name: canonicalName,
      mainTopic,
      aliases: topic.aliases ?? aliases[topicId] ?? [],
      format: pilot?.format ?? topic.format ?? (isExcel ? 'Flashcards only' : labFamily ? 'Modeling Lab' : null),
      classification_status: topic.classification_status ?? (pilot ? 'reviewed' : 'unreviewed'),
      classification_rationale: topic.classification_rationale ?? (pilot ? 'Pilot format explicitly reviewed.' : null),
      lab_family: pilot?.lab_family ?? labFamily,
      anchor_preference: topic.anchor_preference ?? {
        preferred_geography: 'India',
        fallback: 'globally-recognized-case',
        rule: 'Use India when the case is famous, sourceable, and concept-correct; otherwise use the strongest global case.',
      },
      anchor_description: pilot?.anchor_description ?? topic.anchor_description ?? null,
      anchor_candidates: pilot
        ? [{
          candidate_id: `${topicId}:pilot`,
          description: pilot.anchor_description,
          sources: pilot.sources,
          governing_question_draft: pilot.governing_question_draft,
          applicability_status: pilot.applicability_check.status,
          applicability_reason: pilot.applicability_check.reason,
          applicability_score: 10,
          source_quality_score: 10,
          teaching_value_score: 10,
          data_completeness_score: 10,
          selection_rationale: 'Pilot anchor explicitly reviewed for applicability, source quality, and teaching value.',
        }]
        : topic.anchor_candidates ?? [],
      anchor_selection: pilot
        ? {
          status: 'locked',
          candidate_id: `${topicId}:pilot`,
          rationale: 'Pilot anchor explicitly reviewed for applicability, source quality, and teaching value.',
        }
        : topic.anchor_selection ?? { status: 'pending', candidate_id: null, rationale: null },
      sources: pilot?.sources ?? topic.sources ?? [],
      governing_question_draft: pilot?.governing_question_draft ?? topic.governing_question_draft ?? null,
      formula_or_mechanics_stub: pilot?.formula_or_mechanics_stub ?? topic.formula_or_mechanics_stub ?? null,
      applicability_check: pilot?.applicability_check ?? topic.applicability_check ?? {
        status: isExcel ? 'pass' : 'pending',
        reason: isExcel
          ? 'Excel mechanics are intentionally routed to flashcards only.'
          : 'Requires a concept-specific domain and anchor review before generation.',
      },
      eligibility: pilot?.eligibility ?? topic.eligibility ?? (isExcel ? 'flashcards_only' : 'needs_research'),
      research_status: pilot?.research_status ?? topic.research_status ?? 'unstarted',
    };
  })
  .sort((a, b) => a.mainTopic.localeCompare(b.mainTopic) || a.canonical_name.localeCompare(b.canonical_name));

const indexAliases = {
  capm: 'capital_asset_pricing_model',
  'capital asset pricing model': 'capital_asset_pricing_model',
  'p/e': 'price_to_earnings_ratio',
  'price to earnings': 'price_to_earnings_ratio',
  'price-to-earnings ratio': 'price_to_earnings_ratio',
  sotp: 'sum_of_the_parts_valuation',
  'sum of the parts': 'sum_of_the_parts_valuation',
  'sum-of-the-parts valuation': 'sum_of_the_parts_valuation',
};
Object.assign(searchIndex, indexAliases);

fs.writeFileSync(topicsPath, `${JSON.stringify(migrated, null, 2)}\n`);
fs.writeFileSync(searchPath, `${JSON.stringify(searchIndex, null, 2)}\n`);
console.log(`Migrated ${migrated.length} topic readiness records.`);

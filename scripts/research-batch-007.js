import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const relianceAnnualReport = {
  id: 'ril_annual_report_2024_25',
  tier: 1,
  title: 'Reliance Industries Integrated Annual Report 2024-25',
  url: 'https://www.ril.com/reports/RIL-Integrated-Annual-Report-2024-25.pdf',
};

const records = {
  gross_margin: {
    description: 'Reliance Industries’ segment disclosures and consolidated income statement provide a real Indian operating-company artifact for separating the economics of production or procurement from overhead, financing, and tax. Gross margin must be read through the company’s business mix and accounting classification.',
    question: 'What share of revenue remains after direct costs of goods or services sold, and what does a change in that share reveal about pricing, input costs, and mix?',
    mechanics: 'Subtract cost of revenue from revenue and divide by revenue; reconcile period changes to price, volume, input costs, product mix, and any accounting classification changes.',
    reason: 'Gross-margin analysis applies to operating companies with meaningful revenue and direct cost structures; the annual report supplies the applicable income-statement evidence.',
  },
  ebitda_margin: {
    description: 'Reliance Industries’ reported operating disclosures allow EBITDA margin to isolate earnings before capital structure, tax, depreciation, and amortisation, while preserving the caution that this is not a cash-flow measure or a universal comparison metric.',
    question: 'How much operating earnings does each unit of revenue produce before depreciation, amortisation, financing, and tax, and which business drivers explain the margin?',
    mechanics: 'Divide EBITDA by revenue using a clearly reconciled EBITDA definition, then trace changes to pricing, volume, input costs, operating leverage, and segment mix.',
    reason: 'EBITDA margin is an operating-company performance metric and should be anchored in reported income-statement and reconciliation disclosures.',
  },
  operating_margin: {
    description: 'Reliance Industries’ income statement provides a real artifact for measuring operating profit after production and operating expenses but before financing and tax, distinguishing it from both gross margin and EBITDA margin.',
    question: 'How much operating profit does the company retain from revenue after the full operating cost base, and what does that reveal that gross margin cannot?',
    mechanics: 'Divide operating income or EBIT, consistently defined from reported statements, by revenue; distinguish changes caused by gross profitability from changes in selling, administrative, and other operating costs.',
    reason: 'Operating-margin analysis applies to operating companies with income-statement revenue and operating-cost disclosures.',
  },
  return_on_assets: {
    description: 'Reliance Industries’ revenue, earnings, and consolidated asset disclosures provide a real setting for measuring the return generated from the asset base, while requiring an explicit choice between net income and operating profit depending on the question asked.',
    question: 'What return does the company earn on the assets committed to the business, and how much of the result is driven by margins, asset intensity, leverage, or accounting measurement?',
    mechanics: 'Divide the selected earnings measure by average total assets, state the earnings convention, and use a DuPont-style decomposition to distinguish margin and turnover effects.',
    reason: 'Return-on-assets analysis applies to operating companies with reported earnings and an identifiable asset base; it is not a bank-liquidity metric.',
  },
  return_on_equity: {
    description: 'Reliance Industries’ reported profit attributable to owners and equity disclosures provide a real Indian-company artifact for evaluating the return accruing to common shareholders and separating operating performance from financial leverage.',
    question: 'What return did common shareholders earn on their invested equity, and did the result arise from operating performance, asset efficiency, or leverage?',
    mechanics: 'Divide profit attributable to common equity holders by average common equity, then decompose the result into profitability, asset turnover, and financial leverage where the accounting definitions are consistent.',
    reason: 'Return-on-equity analysis applies to companies with common equity and attributable earnings; interpretation requires a non-financial operating-company context.',
  },
  return_on_invested_capital: {
    description: 'Reliance Industries’ operating-profit, debt, cash, and equity disclosures provide a real company artifact for evaluating whether operating returns exceed the opportunity cost of capital committed to the enterprise.',
    question: 'Does the business earn a return above its cost of capital on the operating capital it employs, and which operating or capital-allocation decisions explain the spread?',
    mechanics: 'Calculate NOPAT from operating profit after tax and divide by average invested capital, defined consistently as operating assets less operating liabilities or debt plus equity less non-operating cash.',
    reason: 'ROIC applies to operating companies where operating profit and invested capital can be separated from financing and non-operating balances.',
  },
  return_on_capital_employed: {
    description: 'Reliance Industries’ balance sheet and operating-profit disclosures provide a real operating-company artifact for relating EBIT to long-term capital employed, with explicit attention to the definition of capital employed and the impact of large capital projects.',
    question: 'How efficiently does the company generate operating profit from the long-term capital committed to the enterprise, and when does a declining result reflect investment timing rather than deteriorating economics?',
    mechanics: 'Divide EBIT by average capital employed, usually total assets less current liabilities or an explicitly reconciled equivalent, and interpret changes alongside capex, asset commissioning, and operating profit.',
    reason: 'ROCE is an operating-company capital-efficiency measure; it requires a business with meaningful operating assets and reported EBIT.',
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:profitability-batch-007`,
    description: record.description,
    geography: 'India',
    recognition_score: 9,
    governing_question_draft: record.question,
    applicability_status: 'pass',
    applicability_reason: record.reason,
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 9,
    data_completeness_score: 9,
    selection_rationale: 'A real Indian operating-company annual report supplies the earnings and balance-sheet evidence, while the lesson preserves the metric-specific accounting choices.',
    sources: [relianceAnnualReport],
  };
  return lockBestAnchor({
    ...topic,
    format: 'Structural',
    classification_status: 'reviewed',
    classification_rationale: 'Structural format confirmed because each topic is an interpretable financial-statement relationship rather than a standalone dependency build.',
    formula_or_mechanics_stub: record.mechanics,
    anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} profitability anchors.`);

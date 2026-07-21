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
  title: 'Reliance Industries Integrated Annual Report 2024–25',
  url: 'https://www.ril.com/reports/RIL-Integrated-Annual-Report-2024-25.pdf',
};

const records = {
  working_capital_changes_cash_flow: {
    format: 'Structural',
    description: 'Reliance Industries’ consolidated statement of cash flows provides a real Indian-company artifact for explaining why movements in operating receivables, inventories, and payables alter cash from operations even when reported profit has not changed by the same amount.',
    question: 'Why can operating profit increase while operating cash flow declines, and which balance-sheet movements explain the difference?',
    mechanics: 'Begin with profit under the indirect cash-flow method, reverse non-cash charges, then adjust for period-to-period movements in operating assets and liabilities using the cash-flow sign convention.',
    reason: 'Working-capital cash-flow adjustments apply to operating companies with receivables, inventory, and payables; a company cash-flow statement and balance sheet are the relevant source artifact.',
  },
  asset_turnover: {
    format: 'Structural',
    description: 'Reliance Industries’ reported revenue and asset base provide a real operating-company artifact for measuring how intensively invested assets generate sales, while preserving the distinction between capital intensity, accounting valuation, and operating efficiency.',
    question: 'How effectively does an operating company convert its asset base into revenue, and when does a high or low ratio reflect business model rather than execution quality?',
    mechanics: 'Divide revenue by average total assets or the explicitly chosen asset base, then compare the result across time and genuinely comparable business models while tracing changes in revenue, acquisitions, capital expenditure, and asset write-downs.',
    reason: 'Asset turnover is an operating-company efficiency measure; annual-report revenue and asset data provide a directly applicable source base.',
  },
  cash_conversion_cycle: {
    format: 'Structural',
    description: 'Reliance Industries’ inventory, receivable, payable, and operating disclosures provide an Indian-company artifact for tracing how long cash remains committed between paying suppliers and collecting from customers. The cycle is a timing mechanism, not a generic efficiency score.',
    question: 'How many days does operating cash remain committed from supplier payment through inventory conversion and customer collection?',
    mechanics: 'Calculate days inventory outstanding plus days sales outstanding minus days payable outstanding using consistently defined average balances and income-statement flows, then trace which operating movement changes the cycle.',
    reason: 'Cash conversion cycle analysis applies to operating businesses with inventory, receivables, and trade payables; the annual report provides the relevant financial-statement inputs.',
  },
  net_working_capital: {
    format: 'Structural',
    description: 'Reliance Industries’ current-asset and current-liability disclosures provide a real operating-company artifact for distinguishing a balance-sheet liquidity buffer from the operating cash investment required to sustain revenue and production.',
    question: 'What short-term resources remain after short-term obligations are considered, and how much of that balance represents an operating investment rather than free cash?',
    mechanics: 'Subtract current liabilities from current assets, identify non-operating cash and financing items separately, and reconcile changes in operating net working capital to the cash-flow statement.',
    reason: 'Net working capital applies to non-financial operating companies and is measured directly from current balance-sheet classifications.',
  },
  working_capital: {
    format: 'Structural',
    description: 'Reliance Industries’ working-capital disclosures provide an Indian-company setting for separating the accounting current-asset/current-liability classification from the operating cycle that determines cash needs, supplier financing, and liquidity resilience.',
    question: 'How does the operating cycle create a recurring investment in receivables and inventory that is partly financed by suppliers and other current liabilities?',
    mechanics: 'Classify current operating assets and operating liabilities, calculate the net operating investment, connect it to revenue growth and cash flow, and distinguish operating working capital from headline liquidity ratios.',
    reason: 'Working-capital analysis applies to operating companies whose production, purchasing, and collection cycles create current asset and liability balances.',
  },
  working_capital_modeling: {
    format: 'Modeling Lab',
    description: 'Reliance Industries’ historical operating and balance-sheet disclosures provide the source base for a working-capital schedule that converts revenue assumptions into receivables, inventory, payables, cash-flow effects, and balance-sheet balances. The lab teaches the dependency chain rather than a spreadsheet shortcut.',
    question: 'How do revenue, margin, inventory, collection, and supplier-payment assumptions flow through a model to change cash flow, financing need, and the balance sheet?',
    mechanics: 'Forecast revenue, convert operating assumptions into days or percentage-of-sales drivers, calculate receivables, inventory, and payables, derive the period change in net working capital, feed it into cash flow, and prove the ending balance-sheet tie.',
    reason: 'Working-capital modeling is a dependency-rich build linking operating drivers, the balance sheet, cash flow, and financing; it qualifies as a Modeling Lab.',
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:working-capital-batch-006`,
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
    selection_rationale: 'A real Indian operating-company filing supplies the balance-sheet and cash-flow evidence required to teach the mechanism without manufacturing inputs.',
    sources: [relianceAnnualReport],
  };
  return lockBestAnchor({
    ...topic,
    format: record.format,
    classification_status: 'reviewed',
    classification_rationale: record.format === 'Modeling Lab'
      ? 'Modeling Lab confirmed because the lesson has linked operating, balance-sheet, cash-flow, and financing dependencies.'
      : 'Structural format confirmed because the lesson teaches a financial-statement mechanism rather than a standalone build.',
    formula_or_mechanics_stub: record.mechanics,
    anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} working-capital anchors.`);

import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const source = { id: 'walmart_2024_annual_report', tier: 1, title: 'Walmart Inc. Annual Report 2024, statements of income, balance sheets, and cash flows', url: 'https://stock.walmart.com/_assets/_46796feebc5ddf6d2adbeabac9558ae9/walmart/db/950/9651/annual_report/Walmart_2024-AR-10K_Searchable.pdf' };
const records = {
  cash_conversion_cycle: ['Walmart’s FY2024 10-K provides inventory, receivables, accounts payable, cost of sales, and net sales for two periods, allowing the cash conversion cycle to be built from real balances and flows.', 'How long is cash tied up between paying suppliers and collecting from customers, and which operating process controls that interval?', 'Calculate Days Inventory Outstanding plus Days Sales Outstanding minus Days Payables Outstanding using average balances and same-period annual flows.'],
  net_working_capital: ['Walmart’s FY2024 balance sheet and cash-flow disclosures show a working-capital deficit, the operating assets and liabilities inside it, and the cash consequences of inventory, receivable, and payable movements.', 'What short-term operating capital is tied up in the business, and when does a negative balance strengthen liquidity rather than signal distress?', 'Define net working capital consistently as current operating assets minus current operating liabilities, then reconcile the balance to cash-flow movements and operating-cycle timing.'],
  working_capital: ['Walmart’s FY2024 balance sheet reports total current assets of $76,877 million and current liabilities of $92,415 million, while its filing explains why the retailer generally operates with a working-capital deficit.', 'How does the current-asset and current-liability structure fund day-to-day operations, and what would make the same balance either efficient or dangerous?', 'Subtract current liabilities from current assets and then inspect the timing, quality, and financing role of each component rather than treating the total as cash.'],
};
const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = { candidate_id: `${topic.topic_id}:walmart-2024-10k`, description: record[0], geography: 'United States', recognition_score: 10, governing_question_draft: record[1], applicability_status: 'pass', applicability_reason: 'Working-capital analysis applies to operating companies with inventory, receivables, supplier obligations, and a measurable operating cycle; Walmart is a directly applicable retailer.', applicability_score: 10, source_quality_score: 10, teaching_value_score: 10, data_completeness_score: 10, selection_rationale: 'The official Walmart annual report provides the real balance-sheet and flow fields required to calculate and critique the metric without illustrative values.', sources: [source] };
  return lockBestAnchor({ ...topic, format: 'Structural', formula_or_mechanics_stub: record[2], anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked working-capital anchors to Walmart’s FY2024 10-K.');

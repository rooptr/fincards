import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const source = {
  id: 'walmart_2024_annual_report',
  tier: 1,
  title: 'Walmart Inc. Annual Report 2024, financial statements and company performance metrics',
  url: 'https://stock.walmart.com/_assets/_46796feebc5ddf6d2adbeabac9558ae9/walmart/db/950/9651/annual_report/Walmart_2024-AR-10K_Searchable.pdf',
};
const records = {
  gross_margin: ['Walmart’s FY2024 annual report provides reported net sales, gross profit rate, operating costs, and management’s explanation of pricing, markdowns, mix, and supply-chain effects.', 'What share of net sales remains after direct costs, and what does a change in that spread reveal about pricing, input costs, markdowns, and mix?', 'Gross profit divided by net sales, with the change reconciled to price, volume, input costs, product mix, markdowns, and cost classification.'],
  operating_margin: ['Walmart’s FY2024 annual report provides reported net sales, operating income, operating margin, and the cost drivers that separated gross-profit movement from operating-expense movement.', 'How much operating profit remains after the full operating cost base, and is revenue growth reaching the operating line?', 'Operating income or EBIT divided by net sales, with changes separated into gross profit, operating expense, operating leverage, and one-off effects.'],
  return_on_assets: ['Walmart’s FY2024 annual report provides consolidated net income, average total assets, and a reported ROA reconciliation for a real operating company.', 'What return did the company generate on the assets committed to the business, and how much of that result came from margin or asset intensity?', 'Consolidated net income divided by average total assets, with the earnings convention and average balance stated explicitly.'],
  return_on_equity: ['Walmart’s FY2024 annual report provides attributable net income, common shareholders’ equity, noncontrolling interests, and the two year-end balances required for a matched ROE calculation.', 'What return accrued to common shareholders, and did it arise from operating performance, asset efficiency, or leverage?', 'Profit attributable to common shareholders divided by average common equity, with ownership claims aligned between numerator and denominator.'],
  return_on_invested_capital: ['Walmart’s FY2024 annual report provides operating income, the effective tax rate, average invested capital, and the company’s own ROI reconciliation needed to distinguish an analyst-defined ROIC from reported ROI.', 'Does the operating business earn a return above the opportunity cost of the capital committed to it?', 'NOPAT divided by average invested capital, with NOPAT, tax convention, invested-capital convention, and nonoperating adjustments stated.'],
  return_on_capital_employed: ['Walmart’s FY2024 annual report provides operating income, total assets, current liabilities, and two year-end balances from which capital employed can be constructed transparently.', 'How efficiently does the business generate operating profit from long-term capital committed to the enterprise?', 'Operating income divided by average capital employed, with capital employed defined as total assets less current liabilities for this lesson.'],
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:walmart-2024-10k`,
    description: record[0],
    geography: 'United States',
    recognition_score: 10,
    governing_question_draft: record[1],
    applicability_status: 'pass',
    applicability_reason: 'The metric applies to a non-financial operating company with reported revenue, operating profit, assets, and capital disclosures; Walmart is a directly applicable operating-company anchor.',
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 10,
    data_completeness_score: 10,
    selection_rationale: 'The official Walmart annual report provides the reported fields and the comparative disclosures needed to teach the numerator, denominator, economic mechanism, and limitation without illustrative values.',
    sources: [source],
  };
  return lockBestAnchor({
    ...topic,
    format: 'Structural',
    formula_or_mechanics_stub: record[2],
    anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} profitability anchors to Walmart’s FY2024 10-K.`);

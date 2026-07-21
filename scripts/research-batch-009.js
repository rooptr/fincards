import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const sources = [
  { id: 'ril_annual_report_2024_25', tier: 1, title: 'Reliance Industries Integrated Annual Report 2024-25', url: 'https://www.ril.com/reports/RIL-Integrated-Annual-Report-2024-25.pdf' },
  { id: 'nse_reliance_quote', tier: 1, title: 'NSE: Reliance Industries quote and corporate-security information', url: 'https://www.nseindia.com/get-quote/equity/RELIANCE/reliance-industries-ltd' },
];

const records = {
  equity_value: {
    description: 'Reliance Industries’ listed equity and NSE security information provide a real Indian market artifact for distinguishing the value of common shareholders’ residual claim from the operating enterprise that creditors and non-equity claimholders also finance.',
    question: 'What is the market value of the common equity claim, and why is that not the value of the operating enterprise available to all capital providers?',
    mechanics: 'Multiply diluted shares outstanding by the quoted share price, identify which equity classes and convertibles are included, and distinguish market equity value from book equity and enterprise value.',
    reason: 'Equity value applies to publicly traded companies with observable share prices and identifiable common-share claims.',
  },
  enterprise_value: {
    description: 'Reliance Industries’ market-equity, debt, cash, and minority-interest disclosures provide a real Indian-company artifact for valuing the operating business independently of its financing mix and explaining why cash is normally deducted while debt is added.',
    question: 'What does an acquirer effectively pay for the operating business after assuming financing claims and receiving cash, and which items belong in the bridge?',
    mechanics: 'Start with market equity value, add debt and debt-like claims plus non-controlling interests where relevant, subtract non-operating cash, and reconcile every bridge item to reported disclosures.',
    reason: 'Enterprise value applies to companies with a market-observable equity claim and identifiable financing and non-operating balances; it is a valuation bridge, not a cash-flow ratio.',
  },
  price_to_earnings_ratio: {
    description: 'Reliance Industries’ market quote and reported attributable earnings provide a real Indian-company artifact for asking how much investors pay for each unit of earnings, while recognising that the multiple capitalises expectations rather than measuring standalone quality.',
    question: 'How much market value is assigned to each unit of current or expected earnings, and which expectations about growth, risk, reinvestment, and accounting quality are embedded in that price?',
    mechanics: 'Divide share price by diluted EPS or market equity value by attributable earnings, state whether the measure is trailing or forward, and compare only companies with comparable accounting and economic profiles.',
    reason: 'P/E applies to listed operating companies with positive, attributable earnings; it becomes unstable or meaningless with losses or incomparable accounting.',
  },
  price_to_book_ratio: {
    description: 'Reliance Industries’ market quote and book-equity disclosures provide a real artifact for comparing the market value of the residual claim with the accounting capital recorded for shareholders, while avoiding the error of treating book value as economic value.',
    question: 'How does the market value the equity claim relative to its reported book equity, and when does that spread reflect economic returns, asset measurement, or business-model differences?',
    mechanics: 'Divide market equity value by common book equity, reconcile intangible assets, accumulated losses, and non-controlling interests, and interpret the result alongside ROE and expected returns.',
    reason: 'Price-to-book applies to companies with meaningful common book equity; comparison requires similar accounting regimes and business economics.',
  },
  peg_ratio: {
    description: 'Reliance Industries’ market and reported earnings disclosures offer a real setting for teaching why a P/E multiple scaled by expected earnings growth can discipline a growth comparison but cannot replace a valuation model or risk analysis.',
    question: 'Does the market multiple appear high or low after considering expected earnings growth, and which omitted assumptions prevent PEG from being a standalone valuation conclusion?',
    mechanics: 'Divide a stated P/E multiple by a consistently defined expected earnings-growth rate, identify the forecast horizon and source, then test the result against risk, return on capital, and reinvestment needs.',
    reason: 'PEG applies only to profitable companies with a defensible earnings-growth expectation; it is not a meaningful measure for volatile or loss-making businesses.',
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:market-value-batch-009`, description: record.description,
    geography: 'India', recognition_score: 9, governing_question_draft: record.question,
    applicability_status: 'pass', applicability_reason: record.reason,
    applicability_score: 10, source_quality_score: 10, teaching_value_score: 9, data_completeness_score: 9,
    selection_rationale: 'An Indian listed-company annual report and exchange source show the bridge between reported claims and market value without fabricating data.', sources,
  };
  return lockBestAnchor({
    ...topic, format: 'Structural', classification_status: 'reviewed',
    classification_rationale: 'Structural format confirmed because the lesson teaches a valuation relationship; no multi-schedule build is required.',
    formula_or_mechanics_stub: record.mechanics, anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} market-value anchors.`);

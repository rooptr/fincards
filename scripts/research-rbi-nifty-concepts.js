import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const records = {
  balance_of_payments: {
    description: 'RBI’s June 2024 release provides India’s current account, trade, services, portfolio flows, FDI, and reserve movement for Q4 2023-24 and the full year.',
    geography: 'India',
    governing: 'How do current-account and financial-account flows combine to explain a country’s external financing position and reserve movement?',
    mechanics: 'Construct the current account, capital and financial account, reserve change, and errors and omissions under the stated balance-of-payments presentation.' ,
    sources: [{ id: 'rbi_bop_q4_2023_24', tier: 1, title: 'RBI developments in India’s Balance of Payments during Q4 2023-24', url: 'https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=58147' }],
    reason: 'Balance of Payments is a macroeconomic accounting framework. RBI’s official external-sector release is the correct governing domain and supplies the real flows that the framework reconciles.',
  },
  modern_portfolio_theory: {
    description: 'NSE Indices’ Nifty 50 Whitepaper 2024 provides a real diversified portfolio artifact with sector weights, market representation, turnover, and historical composition.',
    geography: 'India',
    governing: 'How does diversification change portfolio risk, and which portfolio inputs determine whether adding an asset improves the risk and return tradeoff?',
    mechanics: 'Map expected return, variance, covariance, correlation, and portfolio weights to the portfolio risk and return tradeoff; use the Nifty 50 as an actual diversified portfolio artifact rather than a single security.',
    sources: [{ id: 'nifty50_whitepaper_2024', tier: 1, title: 'NSE Indices Nifty 50 Whitepaper 2024', url: 'https://www.niftyindices.com/docs/default-source/indices/nifty-50/nifty-50-whitepaper-2024.pdf' }],
    reason: 'Modern Portfolio Theory applies to portfolios, not a single operating company. The Nifty 50 portfolio provides an applicable diversified investment artifact with real weights and sector exposures.',
  },
};
const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:primary-portfolio-or-rbi-source`,
    description: record.description,
    geography: record.geography,
    recognition_score: 9,
    governing_question_draft: record.governing,
    applicability_status: 'pass',
    applicability_reason: record.reason,
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 10,
    data_completeness_score: 10,
    selection_rationale: 'The selected primary source supplies a real, applicable structure and dated fields that allow the lesson to teach the mechanism without a manufactured company anchor.',
    sources: record.sources,
  };
  return lockBestAnchor({ ...topic, format: 'Structural', formula_or_mechanics_stub: record.mechanics, anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked Balance of Payments to RBI and Modern Portfolio Theory to the NSE Nifty 50 portfolio artifact.');

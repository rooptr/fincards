import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const ffoUrl = 'https://www.sec.gov/Archives/edgar/data/726728/000072672825000049/realtyincomeq42024supple.htm';
const navUrl = 'https://nsearchives.nseindia.com/corporate/ixbrl/INTEGRATED_FILING_RESULTIR_125490_10112025121312_iXBRL_WEB.html';
const records = {
  funds_from_operations: {
    format: 'Reference',
    description: 'Realty Income\'s SEC supplemental filing reconciles net income to Normalized FFO and AFFO, showing how a REIT removes selected real-estate accounting effects while preserving the distinction between operating performance and cash available after recurring capital needs.',
    governing: 'What recurring real-estate operating performance remains after removing accounting effects that obscure property economics, and what further deductions are required before distributions are treated as sustainable?',
    mechanics: 'Start with net income available to common stockholders, add back depreciation and amortization of real-estate assets and other permitted adjustments, remove gains on property sales, then distinguish FFO from AFFO through recurring capital and leasing expenditures.',
    reason: 'FFO applies to REITs and real-estate companies. An SEC-filed REIT reconciliation is the correct primary source because the metric is non-GAAP and its adjustments must be read from the issuer\'s stated reconciliation.',
    sources: [{ id: 'realty_income_ffo_2024', tier: 1, title: 'Realty Income Q4 2024 Supplemental Operating and Financial Data', url: ffoUrl }],
  },
  net_asset_value: {
    format: 'Structural',
    description: 'Embassy Office Parks REIT\'s NSE iXBRL filing reports fair-value assets, fair-value liabilities, net assets attributable to unitholders, unit count, and NAV per unit for the half year ended September 30, 2025.',
    governing: 'What is the fair value of the assets attributable to each unit after liabilities and non-controlling interests are recognized, and which valuation assumptions make that figure move?',
    mechanics: 'Measure assets and liabilities at the selected fair-value basis, subtract liabilities and non-controlling interests from assets, divide net assets attributable to unitholders by units outstanding, and state the reporting date and valuation basis.',
    reason: 'NAV applies to REITs, funds, and asset-backed investment vehicles. An exchange-filed REIT fair-value statement is the correct source artifact.',
    sources: [{ id: 'embassy_reit_nse_nav_2025', tier: 1, title: 'NSE iXBRL financial results and NAV statement for Embassy Office Parks REIT', url: navUrl }],
  },
};
const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = { candidate_id: `${topic.topic_id}:reit-primary-source`, description: record.description, geography: topic.topic_id === 'funds_from_operations' ? 'United States' : 'India', recognition_score: 10, governing_question_draft: record.governing, applicability_status: 'pass', applicability_reason: record.reason, applicability_score: 10, source_quality_score: 10, teaching_value_score: 10, data_completeness_score: 10, selection_rationale: 'The selected SEC or exchange filing is a primary REIT disclosure that supplies the metric definition, reconciliation, fair-value basis, and dated fields required for an evidence-bound lesson.', sources: record.sources };
  return lockBestAnchor({ ...topic, format: record.format, formula_or_mechanics_stub: record.mechanics, anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked FFO and NAV to primary REIT filings.');

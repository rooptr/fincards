import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const sec = (id, title, url) => ({ id, tier: 1, title, url });
const rbiBasel = sec('rbi_basel_iii_2025', 'RBI Master Circular – Basel III Capital Regulations, 2025', 'https://www.rbi.org.in/Scripts/BS_ViewMasterCirculars.aspx?Id=12815');
const bisBasel = sec('bis_basel_iii_framework', 'Basel III: international regulatory framework for banks', 'https://www.bis.org/bcbs/basel3.htm');
const ifrs15 = sec('ifrs_15_standard', 'IFRS 15 Revenue from Contracts with Customers', 'https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/');
const rbiCrrSlr = sec('rbi_crr_slr_master_circular', 'RBI Master Circular – Cash Reserve Ratio and Statutory Liquidity Ratio', 'https://www.rbi.org.in/Scripts/BS_NBFCNotificationView.aspx?Id=5279');
const bisNsfr = sec('bis_nsfr_standard', 'Basel III – The Net Stable Funding Ratio', 'https://www.bis.org/bcbs/publ/d396.htm');
const rbiNsfr = sec('rbi_nsfr_final_guidelines', 'RBI Basel III Framework on Liquidity Standards – NSFR Final Guidelines', 'https://www.rbi.org.in/commonman/Upload/English/Notification/PDFs/NT843C3E37DBE1724CE9AD2CE1FBDA047D30.PDF');

const records = {
  revenue_recognition: {
    description: 'IFRS 15 Revenue from Contracts with Customers governs how an entity recognizes revenue to depict the transfer of promised goods or services and the related timing and uncertainty of cash flows.',
    sources: [ifrs15], question: 'When should reported revenue reflect economic transfer to the customer rather than billing or cash collection?',
    reason: 'Revenue recognition is governed by an authoritative accounting standard; IFRS 15 is the correct reference anchor for the concept.',
  },
  basel_iii: {
    description: 'The Basel III framework sets the post-crisis global prudential architecture for bank capital, leverage, liquidity, and resilience.',
    sources: [bisBasel, rbiBasel], question: 'How does Basel III convert bank risk into capital, leverage, and liquidity constraints?',
    reason: 'Basel III is a regulatory framework; BIS and RBI publications are the governing primary documents.',
  },
  capital_adequacy_ratio: {
    description: 'RBI’s Basel III Capital Regulations define the risk-based capital framework used to assess whether a bank has sufficient capital relative to risk-weighted assets.',
    sources: [rbiBasel, bisBasel], question: 'How much loss-absorbing capital does a bank hold relative to the risk embedded in its assets?',
    reason: 'Capital Adequacy Ratio is a bank-specific prudential measure governed by Basel III and implemented in India by RBI.',
  },
  common_equity_tier_1_ratio: {
    description: 'The Basel III and RBI capital frameworks define Common Equity Tier 1 as the highest-quality going-concern capital available to absorb losses while the bank remains operating.',
    sources: [rbiBasel, bisBasel], question: 'How much of a bank’s capital is composed of the highest-quality loss-absorbing equity?',
    reason: 'CET1 is a regulatory capital construct; the Basel framework and RBI’s master circular govern its definition and calculation.',
  },
  cash_reserve_ratio: {
    description: 'RBI’s CRR and SLR master circular defines the cash reserve requirement that scheduled commercial banks maintain with the Reserve Bank of India against specified liabilities.',
    sources: [rbiCrrSlr], question: 'How does a reserve requirement constrain the portion of bank liabilities that can be deployed into earning assets?',
    reason: 'CRR is an India-specific banking and monetary-policy instrument governed directly by RBI instructions.',
  },
  statutory_liquidity_ratio: {
    description: 'RBI’s CRR and SLR master circular defines the statutory liquidity requirement requiring scheduled commercial banks to maintain approved liquid assets against specified liabilities.',
    sources: [rbiCrrSlr], question: 'How does SLR require a bank to maintain liquid assets against its liability base?',
    reason: 'SLR is an India-specific regulatory liquidity measure governed directly by RBI instructions.',
  },
  net_stable_funding_ratio: {
    description: 'The Basel III NSFR standard and RBI’s Indian implementation connect available stable funding with the stability required by a bank’s assets and off-balance-sheet exposures over a one-year horizon.',
    sources: [bisNsfr, rbiNsfr], question: 'Is a bank funding its assets and off-balance-sheet exposures with sufficiently stable funding over the one-year horizon?',
    reason: 'NSFR is a bank-specific regulatory liquidity measure governed by Basel III and implemented in India by RBI.',
  },
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:reference-batch-001`,
    description: record.description,
    geography: record.sources.some((source) => source.url.includes('rbi.org.in')) ? 'India' : 'Global',
    recognition_score: 10,
    governing_question_draft: record.question,
    applicability_status: 'pass',
    applicability_reason: record.reason,
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 9,
    data_completeness_score: 10,
    selection_rationale: 'Primary regulatory or accounting document selected because it directly governs the concept.',
    sources: record.sources,
  };
  return lockBestAnchor({
    ...topic,
    classification_status: 'reviewed',
    classification_rationale: 'Reference format confirmed because the governing standard or regulator document is the teaching anchor.',
    anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Locked ${Object.keys(records).length} reference anchors.`);

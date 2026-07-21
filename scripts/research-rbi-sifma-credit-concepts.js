import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const records = {
  provision_coverage_ratio: {
    description: 'RBI’s November 2024 banking-sector bulletin reports the gross NPA, net NPA, and Provision Coverage Ratio for the end of September 2024.',
    geography: 'India',
    governing: 'How much of a bank’s gross non-performing asset exposure is covered by provisions, and what does that coverage fail to say about eventual recovery?',
    mechanics: 'Relate provisions available for impaired assets to gross NPA exposure, then separate coverage, collateral, recoveries, write-offs, and the timing of recognition.',
    reason: 'Provision Coverage Ratio applies to banks and credit portfolios. RBI’s official banking-sector data is the correct domain.',
    sources: [{ id: 'rbi_banking_bulletin_nov_2024', tier: 1, title: 'RBI Bulletin, November 2024 banking-sector indicators', url: 'https://www.rbi.org.in/Scripts/BS_ViewBulletin.aspx?Id=22990' }],
  },
  loan_to_value_ratio: {
    description: 'RBI housing-finance guidance defines LTV using total outstanding exposure over realizable property value and prescribes product-specific prudential limits.',
    geography: 'India',
    governing: 'How much of an asset’s realizable value is funded by debt, and how does that margin protect the lender when collateral value or recovery timing changes?',
    mechanics: 'Divide total loan exposure by realizable collateral value, state the valuation date and haircut convention, then test the result against the applicable regulatory or credit policy limit.',
    reason: 'LTV is a secured-credit measure. RBI housing-finance guidance is the correct regulatory domain and defines both numerator and denominator.',
    sources: [{ id: 'rbi_ltv_housing_guidance', tier: 1, title: 'RBI housing-loan LTV guidance and master circular', url: 'https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=4331' }],
  },
  public_securities_association_standard: {
    description: 'SIFMA’s Uniform Practices chapter defines the Standard Prepayment Model and expresses mortgage prepayment speed as a percentage of PSA, with the benchmark reaching 6% CPR from month thirty.',
    geography: 'United States',
    governing: 'How does the PSA benchmark convert an assumed mortgage prepayment path into cash-flow timing for mortgage-backed securities?',
    mechanics: 'Map PSA percentage to the benchmark CPR path, apply the ramp during the first thirty months, hold 100 PSA at 6% CPR thereafter, and trace the effect through principal cash flows and duration.',
    reason: 'PSA is a mortgage prepayment benchmark used in structured finance. SIFMA’s Uniform Practices document is the governing standard.',
    sources: [{ id: 'sifma_uniform_practices_psa', tier: 1, title: 'SIFMA Uniform Practices, Standard Prepayment Model', url: 'https://www.sifma.org/wp-content/uploads/2017/08/ch02.pdf' }],
  },
};
const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:primary-regulatory-source`,
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
    selection_rationale: 'The selected regulator or industry standard defines the concept in the domain where finance professionals actually use it and supplies the real fields or benchmark rules needed for the lesson.',
    sources: record.sources,
  };
  return lockBestAnchor({ ...topic, format: 'Reference', formula_or_mechanics_stub: record.mechanics, anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked PCR, LTV, and PSA lessons to RBI and SIFMA primary sources.');

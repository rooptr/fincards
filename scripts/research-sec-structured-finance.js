import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const sources = {
  regulation_ab: [
    { id: 'sec_regulation_ab_final_rule', tier: 1, title: 'SEC Asset-Backed Securities Disclosure and Registration final rule', url: 'https://www.sec.gov/rules-regulations/2014/09/s7-08-10' },
    { id: 'sec_asset_backed_securities_cfi', tier: 1, title: 'SEC Corporation Finance Interpretations for Asset-Backed Securities', url: 'https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations-cfis/asset-backed-securities' },
  ],
  investment_company_act_exemption: [
    { id: 'sec_redwood_3c5c', tier: 1, title: 'SEC staff response concerning Investment Company Act Section 3(c)(5)(C)', url: 'https://www.sec.gov/rules-regulations/no-action-interpretive-exemptive-letters/division-investment-management-staff-no-action-interpretive-exemptive-letters/redwood-trust-081519-3c5' },
  ],
};
const records = {
  regulation_ab: ['Regulation AB governs registered asset-backed securities disclosure, including the asset-level data, transaction documents, servicing information, and periodic reporting that let investors examine how a pool supports the securities.', 'What information must a public securitisation disclose so an investor can test the assets, parties, servicing, and cash-flow support behind the securities?', 'Map the asset-backed security definition, registration form, asset-level disclosure, transaction documents, servicing reports, and periodic forms before judging disclosure sufficiency.'],
  investment_company_act_exemption: ['The SEC’s Redwood Trust response explains the Section 3(c)(5)(C) exclusion for mortgage and real-estate finance businesses and identifies the asset composition tests that separate qualifying interests from miscellaneous assets.', 'When can a mortgage or real-estate finance business remain outside the Investment Company Act definition, and which asset-composition condition would break the exclusion?', 'Test the statutory exclusion, qualifying interests, real-estate-type interests, miscellaneous assets, and the 55%, 25%, and 20% asset-composition thresholds under the stated SEC staff framework.'],
};
const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:sec-primary-source`,
    description: record[0],
    geography: 'United States',
    recognition_score: 9,
    governing_question_draft: record[1],
    applicability_status: 'pass',
    applicability_reason: 'The concept is a U.S. securities law and structured-finance disclosure or exemption framework. SEC primary material is the governing domain.',
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 10,
    data_completeness_score: 10,
    selection_rationale: 'The SEC source directly defines the rules, forms, fields, and thresholds the lesson must teach. No company case is needed to manufacture relevance where the governing document is the concept.',
    sources: sources[topic.topic_id],
  };
  return lockBestAnchor({ ...topic, format: 'Reference', formula_or_mechanics_stub: record[2], anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked Regulation AB and Section 3(c)(5)(C) lessons to SEC primary sources.');

import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const source = {
  id: 'vedanta_demerger_announcement_2023',
  tier: 1,
  title: 'Vedanta Limited announcement of demerger into independent pure-play companies',
  url: 'https://www.vedantalimited.com/img/media_mentions/press_release/2023/vedanta-demerger-announcement.pdf',
};
const records = {
  demerger: ['Vedanta’s September 2023 announcement proposed separating its diversified businesses into six independent pure-play companies, with shareholders receiving one share in each new company for every Vedanta share held.', 'When does separating a conglomerate into focused legal entities improve capital allocation and investor choice, and when does it merely redistribute leverage and complexity?', 'Map the demerged business perimeter, ownership transfer, share entitlement, liabilities, governance, and valuation effects before comparing the combined and separated claims.'],
  spinoff: ['Vedanta’s proposed vertical split is a real separation setting for studying the economic logic of a spin-off, while preserving the distinction between the Indian demerger mechanism and the broader corporate-finance concept.', 'How can transferring a business into a separately owned entity change the claims, incentives, and valuation available to existing shareholders?', 'Trace the transfer of assets and liabilities, the resulting ownership claim, the allocation of capital and management, and the valuation comparison before and after separation.'],
};
const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:vedanta-demerger-2023`,
    description: record[0],
    geography: 'India',
    recognition_score: 9,
    governing_question_draft: record[1],
    applicability_status: 'pass',
    applicability_reason: topic.topic_id === 'demerger'
      ? 'The concept applies directly to a corporate separation implemented through a scheme of arrangement. Vedanta’s filing identifies the demerged company, resulting companies, business undertakings, share entitlement, and intended legal separation.'
      : 'Spin-off is the corporate-finance concept being examined, while the source uses India’s demerger mechanism as the legal separation structure. The lesson explicitly distinguishes the legal form from the economic logic.',
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 10,
    data_completeness_score: 9,
    selection_rationale: 'Vedanta’s official announcement supplies a dated, well-known Indian corporate separation with a defined business perimeter, ownership consequence, share entitlement, and stated value-creation rationale.',
    sources: [source],
  };
  return lockBestAnchor({ ...topic, format: 'Narrative', formula_or_mechanics_stub: record[2], anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked demerger and spin-off anchors to Vedanta’s official 2023 announcement.');

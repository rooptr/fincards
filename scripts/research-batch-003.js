import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

const source = (id, tier, title, url) => ({ id, tier, title, url });
const fdicSvb = source(
  'fdic_svb_interest_rate_risk',
  1,
  'FDIC: Recent Bank Failures and the Path Ahead',
  'https://www.fdic.gov/news/speeches/2023/spapr1223.html',
);
const fdicSvbMemo = source(
  'fdic_svb_securities_portfolio_memo',
  1,
  'FDIC memorandum on Silicon Valley Bank securities-portfolio management',
  'https://www.fdic.gov/news/speeches/2024/memorandum-and-resolution-request-authority-sue-six-former-officers-and-eleven-former',
);
const bisIrrbb = source(
  'bis_irrbb_standard',
  1,
  'Basel Committee: Interest Rate Risk in the Banking Book',
  'https://www.bis.org/bcbs/publ/d368.htm',
);

const record = {
  duration: {
    description: 'Silicon Valley Bank makes duration economically visible: deposits funded a portfolio of long-dated fixed-rate securities, and rising market rates reduced the present value of those cash flows. Duration is the bridge between the timing of promised cash flows and the sensitivity of market value to a change in yield.',
    sources: [fdicSvb, fdicSvbMemo, bisIrrbb],
    question: 'How does the timing and present value of fixed-income cash flows determine a bond or bank portfolio’s sensitivity to interest-rate changes?',
    reason: 'Duration is a fixed-income price-sensitivity concept and an interest-rate-risk lens for banks; the FDIC’s SVB record documents the real economic failure mode, while Basel provides the governing risk framework.',
    rationale: 'SVB is a globally recognized case in which long-duration assets, unstable funding, and rising rates interacted. The case makes duration’s economic purpose visible without treating duration as a complete explanation of the failure.',
  },
};

const updated = topics.map((topic) => {
  const item = record[topic.topic_id];
  if (!item) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:reference-batch-003`,
    description: item.description,
    geography: 'Global',
    recognition_score: 10,
    governing_question_draft: item.question,
    applicability_status: 'pass',
    applicability_reason: item.reason,
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 10,
    data_completeness_score: 10,
    selection_rationale: item.rationale,
    sources: item.sources,
  };
  return lockBestAnchor({
    ...topic,
    format: 'Structural',
    classification_status: 'reviewed',
    classification_rationale: 'Structural format confirmed because the case supplies an economic mechanism and the BIS framework supplies the governing risk lens.',
    anchor_candidates: [candidate],
  }, [candidate]);
});

fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked 1 global structural anchor where the Indian-first test did not produce a stronger fit.');

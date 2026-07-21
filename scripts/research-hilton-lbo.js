import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const sources = [
  { id: 'hilton_2007_lbo_8k', tier: 1, title: 'Hilton Hotels Corporation Form 8-K announcing the Blackstone acquisition', url: 'https://www.sec.gov/Archives/edgar/data/47580/000110465907052273/a07-18077_1ex99d1.htm' },
  { id: 'hilton_2013_ipo_prospectus', tier: 1, title: 'Hilton Worldwide Holdings Form 424B4 IPO prospectus', url: 'https://www.sec.gov/Archives/edgar/data/1585689/000119312513473211/d593452d424b4.htm' },
  { id: 'hilton_2013_credit_agreement', tier: 1, title: 'Hilton Worldwide 2013 credit agreement filed with the SEC', url: 'https://www.sec.gov/Archives/edgar/data/1585689/000119312516685295/d153637dex102.htm' },
  { id: 'hilton_2013_10k', tier: 1, title: 'Hilton Worldwide Holdings 2013 Form 10-K', url: 'https://www.sec.gov/Archives/edgar/data/1585689/000158568914000006/a2013hwh10-k.htm' },
];
const records = {
  leveraged_buyout: ['Hilton Hotels announced Blackstone’s approximately $26 billion all cash acquisition in 2007 and later disclosed the debt facilities and public offering that make the LBO value bridge teachable from primary filings.', 'Can a business support the debt used to acquire it while still producing an acceptable equity return under a conservative exit assumption?', 'Build entry enterprise value, sources and uses, operating cash flow, debt paydown, exit enterprise value, and exit equity value. Separate operating improvement, deleveraging, and multiple movement.'],
  moic: ['Hilton’s 2007 acquisition and 2013 IPO provide real transaction and ownership observations for teaching MOIC, while the filings also show why a complete sponsor multiple requires the original equity and distribution schedule.', 'How much value did the investor receive for each unit of capital invested, and what does that multiple conceal about time and risk?', 'MOIC equals exit proceeds plus interim distributions divided by invested capital, with the cash-flow perimeter, measurement date, and missing fields stated explicitly.'],
};
const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:hilton-blackstone`,
    description: record[0],
    geography: 'United States',
    recognition_score: 10,
    governing_question_draft: record[1],
    applicability_status: 'pass',
    applicability_reason: 'LBO and MOIC are transaction and sponsor-return concepts. Hilton’s documented acquisition, financing, and public offering provide the correct corporate-finance domain.',
    applicability_score: 10,
    source_quality_score: 10,
    teaching_value_score: 10,
    data_completeness_score: 9,
    selection_rationale: 'The SEC record gives a recognized LBO with a dated acquisition price, debt facilities, IPO, share issuance, and ownership disclosures. Missing sponsor cash flows remain explicit rather than fabricated.',
    sources,
  };
  return lockBestAnchor({ ...topic, format: 'Narrative', formula_or_mechanics_stub: record[2], anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked Leveraged Buyout and MOIC anchors to Hilton and Blackstone SEC filings.');

import fs from 'node:fs';
import { lockBestAnchor } from '../src/utils/deepDiveReadiness.js';

const topicsPath = 'src/data/deep_dive_topics.json';
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const sources = [
  { id: 'treasury_yield_curve_jan_2022', tier: 1, title: 'U.S. Treasury Daily Treasury Par Yield Curve Rates, January 2022', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202201&type=daily_treasury_yield_curve' },
  { id: 'treasury_yield_curve_dec_2023', tier: 1, title: 'U.S. Treasury Daily Treasury Par Yield Curve Rates, December 2023', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value=202312&type=daily_treasury_yield_curve' },
];
const records = {
  yield_curve: ['The U.S. Treasury’s official par-yield tables provide two dated curves that make the slope and its economic interpretation observable: a positively sloped curve on January 3, 2022 and an inverted curve on December 1, 2023.', 'What does the pattern of yields across maturities reveal about the market’s pricing of time, inflation, monetary policy, and future growth?', 'Compare yields across maturities and calculate the slope between two specified points, such as the 10-year Treasury yield minus the 2-year Treasury yield.'],
  normal_yield_curve: ['The U.S. Treasury reported a 2-year yield of 0.78% and a 10-year yield of 1.63% on January 3, 2022, a positive 85 basis-point 10-year minus 2-year slope.', 'Why can a longer maturity carry a higher yield than a shorter maturity, and what information does that upward slope contain?', 'A normal or upward-sloping curve has longer-maturity yields above shorter-maturity yields; the slope is a comparison, not a forecast by itself.'],
  inverted_yield_curve: ['The U.S. Treasury reported a 2-year yield of 4.73% and a 10-year yield of 4.22% on December 1, 2023, a negative 51 basis-point 10-year minus 2-year slope.', 'Why can short-term yields exceed long-term yields, and what does that inversion reveal about expected policy and future economic conditions?', 'An inverted curve has shorter-maturity yields above longer-maturity yields; the slope reflects market pricing and does not mechanically predict a recession or its timing.'],
};

const updated = topics.map((topic) => {
  const record = records[topic.topic_id];
  if (!record) return topic;
  const candidate = {
    candidate_id: `${topic.topic_id}:treasury-dated-curves`,
    description: record[0], geography: 'United States', recognition_score: 10,
    governing_question_draft: record[1], applicability_status: 'pass',
    applicability_reason: 'Yield-curve analysis applies to sovereign fixed-income markets and interest-rate expectations; official U.S. Treasury par-yield data is the direct market artifact.',
    applicability_score: 10, source_quality_score: 10, teaching_value_score: 10, data_completeness_score: 10,
    selection_rationale: 'Two official Treasury tables provide real dated rates for both an upward-sloping and an inverted curve, allowing the lesson to teach the mechanism without illustrative values.',
    sources,
  };
  return lockBestAnchor({ ...topic, format: 'Structural', formula_or_mechanics_stub: record[2], anchor_candidates: [candidate] }, [candidate]);
});
fs.writeFileSync(topicsPath, `${JSON.stringify(updated, null, 2)}\n`);
console.log('Locked yield-curve anchors to dated U.S. Treasury par-yield tables.');

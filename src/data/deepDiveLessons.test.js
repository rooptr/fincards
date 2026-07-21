import assert from 'node:assert/strict';
import fs from 'node:fs';
import { deepDiveLessons } from './deepDiveLessons.js';
import { createDeepDiveGenerationSpec, validateAppliedLearningArtifact, validateDeepDiveContent } from '../utils/deepDiveGenerationContract.js';
import { assertReadyForGeneration, buildGenerationQueue, rankAnchorCandidates, readinessStatus } from '../utils/deepDiveReadiness.js';
import { formulaMarkup } from '../utils/lessonPresentation.js';
import { securitisationDeskPilot } from './deepDiveAppliedPilots.js';
import { SECURITISATION_MASTERCLASS } from './securitisationMasterclass.js';

const quickRatio = deepDiveLessons.find((lesson) => lesson.id === 'quick_ratio');
const modelingLab = deepDiveLessons.find((lesson) => lesson.id === 'three_statement_modeling');
const decisionCase = deepDiveLessons.find((lesson) => lesson.id === 'quick_ratio_decision_case');
const securitisation = deepDiveLessons.find((lesson) => lesson.id === 'securitization_desk_pilot');
const generatedBatchLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_001__'));
const generatedBatchTwoLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_002__'));
const generatedBatchThreeLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_003__'));
const generatedBatchFourLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_004__'));
const generatedBatchFiveLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_005__'));
const generatedBatchSixLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_006__'));
const generatedBatchSevenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_007__'));
const generatedBatchEightLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_008__'));
const generatedBatchNineLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_009__'));
const generatedBatchTenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_010__'));
const generatedBatchElevenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_011__'));
const generatedBatchTwelveLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_012__'));
const generatedBatchThirteenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_013__'));
const generatedBatchFourteenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_014__'));
const generatedBatchFifteenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_015__'));
const generatedBatchSixteenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_016__'));
const generatedBatchSeventeenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_017__'));
const generatedBatchEighteenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_018__'));
const generatedBatchNineteenLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_019__'));
const generatedBatchTwentyLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_020__'));
const generatedBatchTwentyOneLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_021__'));
const generatedBatchTwentyTwoLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_022__'));
const generatedModelingLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_modeling_'));
const generatedSecuritisationLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_securitisation_'));

assert.equal(quickRatio.kind, 'standard');
assert.equal(modelingLab.kind, 'modeling');
assert.equal(decisionCase.kind, 'decision-case');
assert.equal(generatedBatchLessons.length, 8);
assert.equal(generatedBatchTwoLessons.length, 8);
assert.equal(generatedBatchThreeLessons.length, 8);
assert.equal(generatedBatchFourLessons.length, 8);
assert.equal(generatedBatchFiveLessons.length, 8);
assert.equal(generatedBatchSixLessons.length, 8);
assert.equal(generatedBatchSevenLessons.length, 8);
assert.equal(generatedBatchEightLessons.length, 8);
assert.equal(generatedBatchNineLessons.length, 8);
assert.equal(generatedBatchTenLessons.length, 8);
assert.equal(generatedBatchElevenLessons.length, 8);
assert.equal(generatedBatchTwelveLessons.length, 8);
assert.equal(generatedBatchThirteenLessons.length, 8);
assert.equal(generatedBatchFourteenLessons.length, 8);
assert.equal(generatedBatchFourteenLessons.find((lesson) => lesson.topicId === 'leveraged_buyout').sources.hilton_2007_lbo_8k.url.includes('sec.gov'), true);
assert.equal(generatedBatchFourteenLessons.find((lesson) => lesson.topicId === 'leveraged_buyout').formulas.primary.rhsLatex.includes('Exit Enterprise Value'), true);
assert.equal(generatedBatchFourteenLessons.find((lesson) => lesson.topicId === 'moic').formulas.primary.rhsLatex.includes('Invested Capital'), true);
assert.equal(generatedBatchFifteenLessons.length, 8);
assert.equal(generatedBatchSixteenLessons.length, 8);
assert.equal(generatedBatchSeventeenLessons.length, 8);
assert.equal(generatedBatchEighteenLessons.length, 8);
assert.equal(generatedBatchNineteenLessons.length, 8);
assert.equal(generatedBatchTwentyLessons.length, 8);
assert.equal(generatedBatchTwentyOneLessons.length, 8);
assert.equal(generatedBatchTwentyTwoLessons.length, 5);
const allGeneratedBatchLessons = deepDiveLessons.filter((lesson) => lesson.id.startsWith('generated_batch_'));
assert.equal(allGeneratedBatchLessons.length, 173);
assert.equal(allGeneratedBatchLessons.every((lesson) => !/excel/i.test(`${lesson.topicId} ${lesson.canonicalName}`)), true);
assert.equal(allGeneratedBatchLessons.every((lesson) => lesson.sections.length === 11 && lesson.definitionCatalog.length >= 5 && lesson.nodes[`${lesson.topicId}-question`]?.text?.length >= 40), true);
assert.equal(generatedModelingLessons.length, 24);
assert.equal(generatedModelingLessons.every((lesson) => lesson.kind === 'modeling' && lesson.sections.length === 8), true);
assert.equal(generatedModelingLessons.every((lesson) => validateDeepDiveContent(lesson).valid), true);
assert.equal(generatedModelingLessons.every((lesson) => lesson.definitionCatalog.length >= 6 && lesson.subtopicCoverage.length >= 5 && lesson.auditQuestions.length >= 8), true);
assert.equal(generatedSecuritisationLessons.length, 25);
assert.equal(generatedSecuritisationLessons.every((lesson) => lesson.kind === 'securitisation-desk' && lesson.sections.length === 8), true);
assert.equal(generatedSecuritisationLessons.every((lesson) => validateAppliedLearningArtifact(lesson).valid), true);
assert.equal(generatedSecuritisationLessons.every((lesson) => lesson.definitionCatalog.length >= 12 && lesson.subtopicCoverage.length >= 4 && lesson.reviewQuestions.length >= 10), true);
assert.equal(SECURITISATION_MASTERCLASS.episodes.length, 7);
assert.equal(new Set(SECURITISATION_MASTERCLASS.episodes.flatMap((episode) => episode.topicIds)).size, 25);
assert.equal(generatedSecuritisationLessons.every((lesson) => lesson.series?.id === SECURITISATION_MASTERCLASS.id && lesson.series.totalEpisodes === 7), true);
assert.equal(generatedSecuritisationLessons.every((lesson) => lesson.audio?.screenIndependent === true && lesson.audio.register === 'graduate finance casebook'), true);
assert.equal(generatedSecuritisationLessons.every((lesson) => lesson.evidenceExhibit?.status === 'source_pack_locked' && lesson.evidenceExhibit.sourceUrl?.startsWith('https://')), true);
assert.equal(generatedSecuritisationLessons.every((lesson) => lesson.definitionCatalog.length >= 25 && lesson.reviewQuestions.length >= 12), true);
assert.equal(generatedBatchTwoLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchTwoLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal(generatedBatchThreeLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchThreeLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal(generatedBatchFourLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchFourLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal(generatedBatchFiveLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchFiveLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal([...generatedBatchLessons, ...generatedBatchTwoLessons, ...generatedBatchThreeLessons, ...generatedBatchFourLessons, ...generatedBatchFiveLessons, ...generatedBatchSixLessons, ...generatedBatchSevenLessons, ...generatedBatchEightLessons, ...generatedBatchNineLessons, ...generatedBatchTenLessons, ...generatedBatchElevenLessons].every((lesson) => {
  const node = lesson.nodes[`${lesson.topicId}-question`];
  return typeof node?.text === 'string' && node.text.trim().length >= 40;
}), true);
assert.equal(generatedBatchSixLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchSixLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal(generatedBatchSevenLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchSevenLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal(generatedBatchEightLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchEightLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal(generatedBatchNineLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchNineLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal(generatedBatchTenLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchTenLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal(generatedBatchElevenLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal(generatedBatchElevenLessons.every((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review'), true);
assert.equal(generatedBatchLessons.every((lesson) => lesson.sections.length === 11 && lesson.canonicalName && lesson.definitionCatalog.length >= 5), true);
assert.equal([...generatedBatchLessons, ...generatedBatchTwoLessons, ...generatedBatchThreeLessons, ...generatedBatchFourLessons, ...generatedBatchFiveLessons, ...generatedBatchSixLessons, ...generatedBatchSevenLessons].every((lesson) => {
  const eli5 = lesson.sections.find((section) => section.id === 'eli5')?.body ?? [];
  return eli5.length >= 6 && eli5.join(' ').length >= 700;
}), true);
assert.equal(generatedBatchLessons.every((lesson) => lesson.sections.find((section) => section.id === 'formula-construction').formula === 'primary'), true);
assert.equal(generatedBatchLessons.filter((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'captured_for_editorial_review').length, 8);
assert.equal(generatedBatchLessons.filter((lesson) => lesson.sections.find((section) => section.id === 'case-resolution').evidence.status === 'capture_required_before_publish').length, 0);
assert.equal([...generatedBatchLessons, ...generatedBatchTwoLessons, ...generatedBatchThreeLessons, ...generatedBatchFourLessons, ...generatedBatchFiveLessons, ...generatedBatchSixLessons, ...generatedBatchSevenLessons, ...generatedBatchEightLessons, ...generatedBatchNineLessons, ...generatedBatchTenLessons, ...generatedBatchElevenLessons].every((lesson) => {
  const resolution = lesson.sections.find((section) => section.id === 'case-resolution');
  return resolution.evidence.rows.length >= 3 && resolution.diagram.inputs?.length && resolution.diagram.transformation && resolution.diagram.decision;
}), true);
assert.equal(generatedBatchLessons.find((lesson) => lesson.topicId === 'beneish_m_score').sections.find((section) => section.id === 'case-resolution').evidence.image, '/evidence/satyam-sebi-order-excerpt.svg');
assert.equal([quickRatio, modelingLab, decisionCase, securitisation].every((lesson) => lesson.definitionCatalog.length >= 5 && lesson.subtopicCoverage.length >= 2), true);
assert.equal([quickRatio, modelingLab, decisionCase, securitisation].every((lesson) => lesson.definitionCatalog.every((item) => !('location' in item))), true);
assert.equal(decisionCase.inputs.every((input) => input.source && input.asOfDate && input.sourceField), true);
assert.equal(decisionCase.format, 'Case File');
assert.equal(decisionCase.sections.map((section) => section.heading).at(-1), 'Reasoned Resolution');
assert.equal(decisionCase.challengeQuestions.length >= 8, true);
assert.equal(decisionCase.challengeQuestions.every((item) => item.question && item.answer), true);
assert.ok(decisionCase.answerKey.evidenceRequired);
assert.ok(decisionCase.answerKey.reversalEvidence);
assert.equal(quickRatio.sections.length, 11);
assert.equal(quickRatio.sections.find((section) => section.id === 'eli5').heading, 'ELI5: Core Intuition');
assert.equal(quickRatio.sections.find((section) => section.id === 'case-resolution').heading, 'Case Resolution');
assert.equal(quickRatio.sections.find((section) => section.id === 'case-resolution').evidence.formula, '153,521 / 2,572,239 = 0.060x');
assert.equal(quickRatio.sections.at(-1).heading, 'Questions That Test Mastery');
assert.equal(quickRatio.sections.at(-1).conclusionQuestions.length >= 8, true);
assert.match(quickRatio.dek, /Chapter 11/);
assert.deepEqual(quickRatio.dekSourceIds, ['bbbQ3']);

for (const entry of quickRatio.cram) assert.ok(quickRatio.nodes[entry.pointer], `Missing Summary pointer: ${entry.pointer}`);
for (const section of quickRatio.sections) for (const pointer of section.sentences ?? []) assert.ok(quickRatio.nodes[pointer], `Missing lesson sentence: ${pointer}`);
for (const source of Object.values(quickRatio.sources)) assert.match(source.url, /^https:\/\//, `Source URL is invalid: ${source.id}`);

assert.equal(modelingLab.inputs.length > 0, true);
assert.equal(modelingLab.buildOrder.length >= 5, true);
assert.equal(modelingLab.checks.length >= 4, true);
assert.equal(modelingLab.auditQuestions.length >= 8, true);

const topics = JSON.parse(fs.readFileSync(new URL('./deep_dive_topics.json', import.meta.url), 'utf8'));
const researchQueue = JSON.parse(fs.readFileSync(new URL('./deep_dive_research_queue.json', import.meta.url), 'utf8'));
assert.equal(topics.length, 224);
assert.equal(new Set(topics.map((topic) => topic.canonical_name)).size, topics.length);
assert.equal(topics.find((topic) => topic.topic_id === 'excel_mechanics_and_shortcuts').eligibility, 'flashcards_only');
assert.equal(topics.find((topic) => topic.topic_id === 'quick_ratio').eligibility, 'ready');
assert.equal(topics.find((topic) => topic.topic_id === 'three_statement_modeling').format, 'Modeling Lab');
assert.equal(readinessStatus(topics.find((topic) => topic.topic_id === 'quick_ratio')), 'ready');
assert.equal(assertReadyForGeneration(topics.find((topic) => topic.topic_id === 'quick_ratio')).topic_id, 'quick_ratio');
assert.equal(readinessStatus(topics.find((topic) => topic.topic_id === 'decision_tree_analysis')), 'ready');
assert.equal(assertReadyForGeneration(topics.find((topic) => topic.topic_id === 'decision_tree_analysis')).format, 'Modeling Lab');
assert.equal(readinessStatus(topics.find((topic) => topic.topic_id === 'dcf_model')), 'duplicate');
assert.equal(readinessStatus(topics.find((topic) => topic.topic_id === 'discounted_cash_flow')), 'ready');
assert.equal(buildGenerationQueue(topics).length, topics.filter((topic) => topic.eligibility === 'ready').length);
assert.equal(topics.find((topic) => topic.topic_id === 'quick_ratio').anchor_preference.preferred_geography, 'India');
const generationQueue = buildGenerationQueue(topics);
assert.equal(generationQueue.some((topic) => topic.topic_id.includes('excel')), false);
assert.equal(researchQueue.length, topics.filter((topic) => topic.eligibility !== 'ready' && topic.eligibility !== 'flashcards_only' && !topic.eligibility.startsWith('duplicate_of:')).length);
assert.equal(researchQueue.some((topic) => topic.topic_id.includes('excel')), false);
assert.deepEqual(researchQueue.map((topic) => topic.queue_order), Array.from({ length: researchQueue.length }, (_, index) => index + 1));
assert.ok(researchQueue.every((topic) => topic.anchor_is_not_precommitted));
for (const topic of generationQueue) {
  assert.equal(typeof topic.research.domain_guardrail, 'string');
  assert.equal(topic.research.selection_status, 'locked');
  assert.ok(topic.research.candidate_anchors.length > 0);
  assert.ok(topic.research.candidate_anchors.every((candidate) => candidate.sources.every((source) => /^https:\/\//.test(source.url))));
}
assert.equal(rankAnchorCandidates([
  { candidate_id: 'global', geography: 'US', recognition_score: 10, applicability_status: 'pass', sources: [{}], applicability_score: 10, source_quality_score: 10, teaching_value_score: 10, data_completeness_score: 10 },
  { candidate_id: 'india', geography: 'India', recognition_score: 8, applicability_status: 'pass', sources: [{}], applicability_score: 10, source_quality_score: 10, teaching_value_score: 10, data_completeness_score: 10 },
])[0].candidate_id, 'india');

for (const lesson of [quickRatio, modelingLab]) {
  const validation = validateDeepDiveContent(lesson);
  assert.equal(validation.valid, true, validation.errors.join('\n'));
}

const generationSpec = createDeepDiveGenerationSpec();
assert.ok(generationSpec.researchPass.systemPrompt.includes('anchor candidates'));
assert.ok(generationSpec.researchPass.systemPrompt.includes('Search India first'));
assert.ok(generationSpec.draftPass.systemPrompt.includes('MBA finance students'));
assert.ok(generationSpec.editorialPass.systemPrompt.includes('publishable MBA finance case study'));
assert.equal(createDeepDiveGenerationSpec('modeling-studio').sections[0].heading, 'Decision Mandate');
assert.equal(createDeepDiveGenerationSpec('securitisation-desk').sections[3].heading, 'Priority of Payments');
assert.equal(createDeepDiveGenerationSpec('decision-case').sections.at(-1).heading, 'Reasoned Resolution');

const decisionCaseArtifact = {
  kind: 'decision-case',
  role: 'Credit committee associate',
  decision: 'Recommend whether the proposed financing should proceed.',
  definitionCatalog: Array.from({ length: 5 }, (_, index) => ({
    id: `fixture-definition-${index + 1}`,
    term: `Fixture term ${index + 1}`,
    group: 'Fixture vocabulary',
    formalDefinition: 'A sourced finance term with a precise meaning that determines how the committee interprets the evidence and decision.',
    location: 'The relevant financial statement, schedule, or transaction document.',
    whyItMatters: 'The term identifies the mechanism that connects the evidence to the proposed financing decision.',
    commonExaminationError: 'Treating the term as interchangeable with a related concept without testing its condition and scope.',
  })),
  subtopicCoverage: [
    { subtopic: 'Core vocabulary', section: 'Verified Evidence', definitionIds: ['fixture-definition-1', 'fixture-definition-2', 'fixture-definition-3'] },
    { subtopic: 'Decision vocabulary', section: 'Reasoned Resolution', definitionIds: ['fixture-definition-4', 'fixture-definition-5'] },
  ],
  sections: createDeepDiveGenerationSpec('decision-case').sections.map((section) => ({ heading: section.heading })),
  inputs: ['Revenue', 'Net debt', 'Interest expense'].map((name) => ({
    name,
    value: 'Filed value',
    unit: '₹ crore',
    asOfDate: '2025-03-31',
    classification: 'historical_fact',
    source: 'https://www.ril.com/reports/RIL-Integrated-Annual-Report-2024-25.pdf',
    sourceField: 'Consolidated financial statements',
  })),
  options: ['Proceed subject to coverage threshold', 'Decline financing'],
  answerKey: {
    reasoning: 'The decision compares debt-service capacity with downside earnings and cash-flow resilience using only filed inputs and explicitly stated financing terms.',
    temptingWrongAnswer: 'Approving the financing solely because reported EBITDA increased ignores debt maturity, cash conversion, and the possibility that coverage falls under a downside case.',
    followUpQuestion: 'Which specific forecast line would break first if the revenue assumption misses its downside threshold?',
    evidenceRequired: 'Obtain the debt maturity schedule, committed facilities, covenant definitions, and downside cash forecast.',
    reversalEvidence: 'The conclusion changes when the downside cash forecast and committed capacity cover all dated obligations with covenant headroom.',
  },
  challengeQuestions: Array.from({ length: 8 }, (_, index) => ({
    question: `Committee examination question ${index + 1}`,
    answer: `Reasoned answer ${index + 1}`,
  })),
};
assert.equal(validateAppliedLearningArtifact(decisionCaseArtifact).valid, true);
const securitisationValidation = validateAppliedLearningArtifact(securitisationDeskPilot);
assert.equal(securitisationValidation.valid, true, securitisationValidation.errors.join('\n'));
assert.deepEqual(
  securitisationDeskPilot.sections.map((section) => section.id),
  ['transaction-mandate', 'pool-data-room', 'structure-design', 'priority-of-payments', 'credit-enhancement-triggers', 'stress-transmission', 'investment-committee-memo', 'desk-drill'],
);
assert.equal(securitisationDeskPilot.inputs.find((input) => input.name === 'Loan-level pool tape').value, 'Not publicly disclosed in the cited sector report');
assert.equal(securitisationDeskPilot.sections.every((section) => Array.isArray(section.body) && section.body.length > 0), true);
assert.equal(securitisationDeskPilot.reviewQuestions.length >= 8, true);

const formulaHtml = formulaMarkup(quickRatio.formulas.quickRatio.latex, {
  output: 'html',
});
assert.match(formulaHtml, /katex-display/);
assert.doesNotMatch(formulaHtml, /katex-mathml/);
assert.match(formulaHtml, /frac-line/);

console.log('deep dive readiness and pilot tests passed.');

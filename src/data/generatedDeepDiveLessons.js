import generatedBatch from '../../scratch/deep_dive_generated_batch_001.json' with { type: 'json' };
import generatedBatchTwo from '../../scratch/deep_dive_generated_batch_002.json' with { type: 'json' };
import generatedBatchThree from '../../scratch/deep_dive_generated_batch_003.json' with { type: 'json' };
import generatedBatchFour from '../../scratch/deep_dive_generated_batch_004.json' with { type: 'json' };
import generatedBatchFive from '../../scratch/deep_dive_generated_batch_005.json' with { type: 'json' };
import generatedBatchSix from '../../scratch/deep_dive_generated_batch_006.json' with { type: 'json' };
import generatedBatchSeven from '../../scratch/deep_dive_generated_batch_007.json' with { type: 'json' };
import generatedBatchEight from '../../scratch/deep_dive_generated_batch_008.json' with { type: 'json' };
import generatedBatchNine from '../../scratch/deep_dive_generated_batch_009.json' with { type: 'json' };
import generatedBatchTen from '../../scratch/deep_dive_generated_batch_010.json' with { type: 'json' };
import generatedBatchEleven from '../../scratch/deep_dive_generated_batch_011.json' with { type: 'json' };
import generatedBatchTwelve from '../../scratch/deep_dive_generated_batch_012.json' with { type: 'json' };
import generatedBatchThirteen from '../../scratch/deep_dive_generated_batch_013.json' with { type: 'json' };
import generatedBatchFourteen from '../../scratch/deep_dive_generated_batch_014.json' with { type: 'json' };
import generatedBatchFifteen from '../../scratch/deep_dive_generated_batch_015.json' with { type: 'json' };
import generatedBatchSixteen from '../../scratch/deep_dive_generated_batch_016.json' with { type: 'json' };
import generatedBatchSeventeen from '../../scratch/deep_dive_generated_batch_017.json' with { type: 'json' };
import generatedBatchEighteen from '../../scratch/deep_dive_generated_batch_018.json' with { type: 'json' };
import generatedBatchNineteen from '../../scratch/deep_dive_generated_batch_019.json' with { type: 'json' };
import generatedBatchTwenty from '../../scratch/deep_dive_generated_batch_020.json' with { type: 'json' };
import generatedBatchTwentyOne from '../../scratch/deep_dive_generated_batch_021.json' with { type: 'json' };
import generatedBatchTwentyTwo from '../../scratch/deep_dive_generated_batch_022.json' with { type: 'json' };
import generatedModelingBatchOne from '../../scratch/deep_dive_generated_modeling_batch_001.json' with { type: 'json' };
import generatedModelingBatchTwo from '../../scratch/deep_dive_generated_modeling_batch_002.json' with { type: 'json' };
import generatedModelingBatchThree from '../../scratch/deep_dive_generated_modeling_batch_003.json' with { type: 'json' };
import generatedModelingBatchFour from '../../scratch/deep_dive_generated_modeling_batch_004.json' with { type: 'json' };
import generatedModelingBatchFive from '../../scratch/deep_dive_generated_modeling_batch_005.json' with { type: 'json' };
import generatedModelingBatchSix from '../../scratch/deep_dive_generated_modeling_batch_006.json' with { type: 'json' };
import generatedModelingBatchSeven from '../../scratch/deep_dive_generated_modeling_batch_007.json' with { type: 'json' };
import generatedModelingBatchEight from '../../scratch/deep_dive_generated_modeling_batch_008.json' with { type: 'json' };
import generatedSecuritisationBatchOne from '../../scratch/deep_dive_generated_securitisation_batch_001.json' with { type: 'json' };
import generatedSecuritisationBatchTwo from '../../scratch/deep_dive_generated_securitisation_batch_002.json' with { type: 'json' };
import generatedSecuritisationBatchThree from '../../scratch/deep_dive_generated_securitisation_batch_003.json' with { type: 'json' };
import generatedSecuritisationBatchFour from '../../scratch/deep_dive_generated_securitisation_batch_004.json' with { type: 'json' };
import generatedSecuritisationBatchFive from '../../scratch/deep_dive_generated_securitisation_batch_005.json' with { type: 'json' };
import generatedSecuritisationBatchSix from '../../scratch/deep_dive_generated_securitisation_batch_006.json' with { type: 'json' };
import generatedSecuritisationBatchSeven from '../../scratch/deep_dive_generated_securitisation_batch_007.json' with { type: 'json' };
import generatedSecuritisationBatchEight from '../../scratch/deep_dive_generated_securitisation_batch_008.json' with { type: 'json' };
import generatedSecuritisationBatchNine from '../../scratch/deep_dive_generated_securitisation_batch_009.json' with { type: 'json' };
import generatedSecuritisationBatchTen from '../../scratch/deep_dive_generated_securitisation_batch_010.json' with { type: 'json' };
import generatedSecuritisationBatchEleven from '../../scratch/deep_dive_generated_securitisation_batch_011.json' with { type: 'json' };
import generatedSecuritisationBatchTwelve from '../../scratch/deep_dive_generated_securitisation_batch_012.json' with { type: 'json' };
import generatedSecuritisationBatchThirteen from '../../scratch/deep_dive_generated_securitisation_batch_013.json' with { type: 'json' };

function firstSentence(section) {
  return section?.body?.[0] ?? '';
}

function adaptGeneratedLesson(lesson) {
  const sections = lesson.sections.map((section) => {
    const next = { ...section };
    if (section.id === 'formula-construction') next.formula = 'primary';
    if (section.id === 'governing-question') {
      next.sentences = [`${lesson.topicId}-question`];
      delete next.body;
    }
    if (section.id === 'case-resolution' && section.evidence) {
      next.evidence = { ...section.evidence, source: lesson.sourceHierarchy[0].id };
      next.diagram = { ...section.diagram, source: lesson.sourceHierarchy[0].id };
    }
    return next;
  });

  const sources = Object.fromEntries(Object.entries(lesson.sources).map(([id, source]) => [id, {
    ...source,
    publisher: source.publisher ?? source.title,
  }]));

  // Modeling Labs have their own contract and do not contain the standard
  // Cram Strip pointers. Keep their dependency graph and review structure
  // intact instead of forcing them through the narrative adapter.
  if (lesson.kind === 'modeling' || lesson.kind === 'securitisation-desk') {
    return {
      ...lesson,
      date: lesson.date ?? '',
      sources,
      sections,
    };
  }

  const nodes = {
    [`${lesson.topicId}-question`]: {
      text: lesson.nodes[`${lesson.topicId}-question`]?.text ?? '',
      citations: [],
    },
  };
  const pointerMap = Object.fromEntries([
    ['Governing Question', `${lesson.topicId}-question`],
    ['Definition', `${lesson.topicId}-definition`],
    ['Formula', `${lesson.topicId}-formula`],
    ['Interpretation', `${lesson.topicId}-interpretation`],
    ['Limitation', `${lesson.topicId}-limitation`],
  ].map(([label, nodeId]) => [label, nodeId]));

  for (const [label, nodeId] of Object.entries(pointerMap)) {
    if (nodes[nodeId]) continue;
    const sectionId = lesson.cram.find((entry) => entry.label === label)?.pointer;
    const section = lesson.sections.find((candidate) => candidate.id === sectionId);
    nodes[nodeId] = { text: firstSentence(section), citations: section?.sourceIds ?? [] };
  }

  const cram = lesson.cram.map((entry) => ({ ...entry, pointer: pointerMap[entry.label] ?? entry.pointer }));
  return {
    ...lesson,
    date: lesson.date ?? '',
    sources,
    nodes,
    cram,
    sections,
  };
}

export const generatedDeepDiveLessons = [
  ...(generatedBatch.lessons ?? []),
  ...(generatedBatchTwo.lessons ?? []),
  ...(generatedBatchThree.lessons ?? []),
  ...(generatedBatchFour.lessons ?? []),
  ...(generatedBatchFive.lessons ?? []),
  ...(generatedBatchSix.lessons ?? []),
  ...(generatedBatchSeven.lessons ?? []),
  ...(generatedBatchEight.lessons ?? []),
  ...(generatedBatchNine.lessons ?? []),
  ...(generatedBatchTen.lessons ?? []),
  ...(generatedBatchEleven.lessons ?? []),
  ...(generatedBatchTwelve.lessons ?? []),
  ...(generatedBatchThirteen.lessons ?? []),
  ...(generatedBatchFourteen.lessons ?? []),
  ...(generatedBatchFifteen.lessons ?? []),
  ...(generatedBatchSixteen.lessons ?? []),
  ...(generatedBatchSeventeen.lessons ?? []),
  ...(generatedBatchEighteen.lessons ?? []),
  ...(generatedBatchNineteen.lessons ?? []),
  ...(generatedBatchTwenty.lessons ?? []),
  ...(generatedBatchTwentyOne.lessons ?? []),
  ...(generatedBatchTwentyTwo.lessons ?? []),
  ...(generatedModelingBatchOne.lessons ?? []),
  ...(generatedModelingBatchTwo.lessons ?? []),
  ...(generatedModelingBatchThree.lessons ?? []),
  ...(generatedModelingBatchFour.lessons ?? []),
  ...(generatedModelingBatchFive.lessons ?? []),
  ...(generatedModelingBatchSix.lessons ?? []),
  ...(generatedModelingBatchSeven.lessons ?? []),
  ...(generatedModelingBatchEight.lessons ?? []),
  ...(generatedSecuritisationBatchOne.lessons ?? []),
  ...(generatedSecuritisationBatchTwo.lessons ?? []),
  ...(generatedSecuritisationBatchThree.lessons ?? []),
  ...(generatedSecuritisationBatchFour.lessons ?? []),
  ...(generatedSecuritisationBatchFive.lessons ?? []),
  ...(generatedSecuritisationBatchSix.lessons ?? []),
  ...(generatedSecuritisationBatchSeven.lessons ?? []),
  ...(generatedSecuritisationBatchEight.lessons ?? []),
  ...(generatedSecuritisationBatchNine.lessons ?? []),
  ...(generatedSecuritisationBatchTen.lessons ?? []),
  ...(generatedSecuritisationBatchEleven.lessons ?? []),
  ...(generatedSecuritisationBatchTwelve.lessons ?? []),
  ...(generatedSecuritisationBatchThirteen.lessons ?? []),
].map(adaptGeneratedLesson);

import fs from 'node:fs';

const queue = JSON.parse(fs.readFileSync('scratch/deep_dive_generation_queue.json', 'utf8'));
const batches = JSON.parse(fs.readFileSync('scratch/deep_dive_generation_batches.json', 'utf8')).lesson_batches
  .filter((batch) => batch.batch_id.startsWith('lessons-modeling_studio-'));

const rilSource = {
  id: 'ril_annual_report_2024_25',
  title: 'Reliance Industries Integrated Annual Report 2024-25',
  url: 'https://www.ril.com/reports/RIL-Integrated-Annual-Report-2024-25.pdf',
  tier: 1,
};

const realRilInputs = [
  { name: 'FY2024-25 consolidated revenue', value: '₹10,71,174 crore', unit: 'INR crore; year ended March 31, 2025', classification: 'historical_fact', sourceField: 'Chairman and Managing Director statement, Strong and Resilient Performance' },
  { name: 'FY2024-25 consolidated EBITDA', value: '₹1,83,422 crore', unit: 'INR crore; year ended March 31, 2025', classification: 'historical_fact', sourceField: 'Chairman and Managing Director statement, Strong and Resilient Performance' },
  { name: 'FY2024-25 consolidated net profit', value: '₹81,309 crore', unit: 'INR crore; year ended March 31, 2025', classification: 'historical_fact', sourceField: 'Chairman and Managing Director statement, Strong and Resilient Performance' },
  { name: 'Gross debt at March 31, 2025', value: '₹3,47,530 crore', unit: 'INR crore; as of March 31, 2025', classification: 'historical_fact', sourceField: 'Financial Performance and Review, balance-sheet highlights' },
  { name: 'Net debt at March 31, 2025', value: '₹1,17,083 crore', unit: 'INR crore; as of March 31, 2025', classification: 'historical_fact', sourceField: 'Financial Performance and Review, balance-sheet highlights' },
];

const taskInput = (topic, source, label) => ({
  name: label,
  value: `Required source capture before publication: ${topic.canonical_name} input from the cited document or market record.`,
  unit: 'source field and as-of date required',
  classification: 'market_input',
  sourceField: 'Research task; no value fabricated',
  source: source.url,
});

const definition = (id, term, formalDefinition, whyItMatters, commonExaminationError) => ({
  id, term, group: 'Model construction', formalDefinition, whyItMatters, commonExaminationError,
});

function modelInputs(topic, sources) {
  const primary = sources[0] ?? rilSource;
  const isRil = primary.id === rilSource.id;
  const inputs = isRil ? realRilInputs.slice(0, 4).map((input) => ({ ...input, source: primary.url })) : [];
  while (inputs.length < 4) inputs.push(taskInput(topic, primary, `Required ${topic.canonical_name} input ${inputs.length + 1}`));
  return inputs;
}

function makeQuestions(topic, question, mechanics) {
  return [
    { question: `What decision does the ${topic.canonical_name} build support?`, answer: `${question} The model is useful only when the decision, horizon, currency, and output are stated before the first input is entered. A calculation without a named decision can produce a precise number that no committee can use.` },
    { question: 'Which inputs are historical facts and which are assumptions?', answer: 'Historical facts come from the cited filing, contract, regulatory record, or market observation and must retain their as-of date and unit. Assumptions are forward-looking judgments that must remain visible and changeable. Blending them makes an assumption look like evidence and prevents a reviewer from locating the model’s judgment.' },
    { question: 'What is the first dependency that should be checked?', answer: `Start with the source of truth for the build. For ${topic.canonical_name}, that means confirming the input definitions, scope, period, unit, and classification before constructing downstream outputs. A downstream formula cannot repair a wrong source field.` },
    { question: 'How does the build avoid a hardcoded output?', answer: `Every material output must trace through the construction sequence described by the mechanics: ${mechanics} If an output changes without a named input or dependency changing, the model contains a hardcode, broken link, or hidden plug.` },
    { question: 'Which integrity check would catch a broken dependency?', answer: 'Use both an accounting or mathematical identity check and a direction-of-change check. The identity catches incomplete linkage. The direction check catches a model that balances while translating an economic change in the wrong direction.' },
    { question: 'How should a scenario be transmitted through the model?', answer: 'Change one explicitly named assumption, record the before and after value, then trace every material downstream line in dependency order. The final decision output must move for a stated reason. A before-and-after headline without the transmission path is not a model explanation.' },
    { question: 'What would make the output misleading even if the checks pass?', answer: 'A model can reconcile mechanically while using an inapplicable peer set, an inconsistent accounting definition, an unrealistic financing assumption, or an unexamined forecast relationship. Integrity checks prove internal consistency; they do not prove that the economic assumptions are true.' },
    { question: 'What should a reviewer ask before relying on the result?', answer: 'The reviewer should ask which input has the greatest effect, which source field is least reliable, what assumption breaks first under stress, and what evidence would reverse the conclusion. Those questions test whether the builder understands the model rather than merely reproducing its formulas.' },
  ];
}

function sanitizeVisibleText(value) {
  if (typeof value === 'string') {
    return value
      .replace(/[—–]/g, ', ')
      .replace(/â€™/g, "'")
      .replace(/â‚¹/g, 'INR ')
      .replace(/â€œ|â€/g, '"');
  }
  if (Array.isArray(value)) return value.map(sanitizeVisibleText);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitizeVisibleText(item)]));
  }
  return value;
}

function makeLesson(topic) {
  const research = topic.research ?? topic;
  const anchor = research.candidate_anchors?.[0];
  const sources = anchor?.sources?.length ? anchor.sources.map((item) => ({ ...item })) : [rilSource];
  const mechanics = research.mechanics_stub ?? `Build ${topic.canonical_name} in dependency order, run integrity checks, and trace a scenario change to the decision output.`;
  const inputRecords = modelInputs(topic, sources);
  const sourceMap = Object.fromEntries(sources.map((item) => [item.id, item]));
  for (const input of inputRecords) {
    if (!sourceMap[input.source]) sourceMap[input.source] = { id: input.source, title: input.source, url: input.source, tier: 1 };
  }
  const primarySource = inputRecords[0].source;
  const questions = makeQuestions(topic, research.governing_question_draft ?? `What decision does ${topic.canonical_name} support?`, mechanics);
  const definitions = [
    definition('source-fact', 'Historical fact', 'A reported or observed value whose document, field, period, and unit are identified before it enters the model.', 'It separates evidence from judgment.', 'Treating a forecast or management target as if it were a historical fact.'),
    definition('explicit-assumption', 'Explicit assumption', 'A forward-looking judgment entered deliberately into the model and exposed for review or scenario change.', 'It makes uncertainty visible and testable.', 'Hiding an assumption inside a formula or hardcoding it into an output.'),
    definition('source-of-truth', 'Source of truth', 'The single defined line item, schedule, or input register from which downstream model references should flow.', 'It prevents conflicting versions of the same economic quantity.', 'Re-entering the same value in several schedules.'),
    definition('dependency', 'Dependency', 'A causal or computational relationship in which one model output supplies an input to another calculation.', 'It explains how a scenario reaches the decision output.', 'Showing formulas without identifying the order of transmission.'),
    definition('integrity-check', 'Model integrity check', 'A test of an accounting identity, roll-forward, sign convention, or scenario relationship that should hold if the build is linked correctly.', 'It distinguishes a functioning model from a formatted worksheet.', 'Using a balance check as proof that the assumptions are economically valid.'),
    definition('scenario-transmission', 'Scenario transmission', 'The traced movement of one changed assumption through every material downstream dependency to the final decision output.', 'It converts a model from a static answer into an instrument for reasoning.', 'Changing several assumptions at once and attributing the result to one driver.'),
  ];
  const sections = [
    { id: 'decision-objective', heading: 'Decision Objective', body: [`Build ${topic.canonical_name} to answer a bounded MBA finance decision: ${research.governing_question_draft ?? `what decision the build should support`}. The output must be decision-relevant, source-traceable, and sensitive to the assumptions that actually drive it.`] },
    { id: 'source-inputs', heading: 'Source Inputs', body: ['The input register separates historical facts, observable market inputs, and explicit assumptions. Any live field not present in the cited source remains a visible research task rather than an invented number.'] },
    { id: 'construction-sequence', heading: 'Construction Sequence', body: [`The build follows this mechanics stub: ${mechanics}`, 'Each step produces a named output that becomes an input to the next dependent step.'] },
    { id: 'dependency-architecture', heading: 'Dependency Architecture', body: ['The architecture identifies the source of truth, the forward links, and any feedback loop that can create circularity.'] },
    { id: 'model-integrity-checks', heading: 'Model Integrity Checks', body: ['A reviewer tests accounting identities, roll-forwards, source links, units, signs, and scenario direction before interpreting the final output.'] },
    { id: 'scenario-transmission', heading: 'Scenario Transmission', body: ['Change one material assumption, trace its effect through the dependency graph, and identify the output that changes the decision.'] },
    { id: 'decision-interpretation', heading: 'Decision Interpretation', body: [`The output answers the stated question only within the model boundary. It does not establish facts that were not sourced, nor does it remove the need to challenge the assumptions behind ${topic.canonical_name}.`] },
    { id: 'model-review-questions', heading: 'Model Review Questions', body: ['The review drill tests whether the builder understands source discipline, dependency order, integrity checks, scenario movement, and the model’s limits.'] },
  ];
  return sanitizeVisibleText({
    id: `generated_modeling_${topic.topic_id}`,
    topicId: topic.topic_id,
    canonicalName: topic.canonical_name,
    kind: 'modeling',
    format: 'Modeling Lab',
    experienceType: topic.experience_type,
    eyebrow: 'MBA Finance Modeling Lab',
    title: `${topic.canonical_name}: build the decision from the evidence`,
    dek: `A source-disciplined build that connects inputs, dependencies, controls, and a scenario to one decision output.`,
    sources: sourceMap,
    sourceHierarchy: Object.values(sourceMap).map((item) => ({ id: item.id, tier: item.tier ?? 1, title: item.title, url: item.url })),
    definitionCatalog: definitions,
    subtopicCoverage: [
      { subtopic: 'Source discipline', section: 'Source Inputs', definitionIds: ['source-fact', 'explicit-assumption', 'source-of-truth'] },
      { subtopic: 'Build mechanics', section: 'Construction Sequence', definitionIds: ['dependency'] },
      { subtopic: 'Dependency architecture', section: 'Dependency Architecture', definitionIds: ['dependency'] },
      { subtopic: 'Model controls', section: 'Model Integrity Checks', definitionIds: ['integrity-check'] },
      { subtopic: 'Scenario transmission', section: 'Scenario Transmission', definitionIds: ['scenario-transmission'] },
      { subtopic: 'Decision interpretation', section: 'Decision Interpretation', definitionIds: ['explicit-assumption'] },
      { subtopic: 'Review discipline', section: 'Model Review Questions', definitionIds: ['source-fact', 'integrity-check'] },
    ],
    nodes: { [`${topic.topic_id}-scenario`]: { text: `Scenario change for ${topic.canonical_name}: change one explicit assumption and trace the result through the dependency architecture.`, citations: [primarySource] } },
    objective: `Build ${topic.canonical_name} as a decision instrument for MBA finance work. The model must show which source inputs drive the output, how the dependencies transmit a change, which checks establish internal integrity, and which assumptions can reverse the decision.`,
    inputs: inputRecords,
    buildOrder: [
      { title: 'Define the decision and model boundary', detail: `State the output, horizon, currency, unit, and exclusions for ${topic.canonical_name} before selecting formulas.`, source: primarySource },
      { title: 'Load and classify source inputs', detail: 'Enter historical facts with document fields and dates, distinguish observable market inputs from assumptions, and establish one source of truth for each quantity.', source: primarySource },
      { title: 'Build the operating or valuation mechanics', detail: `Apply the mechanics in dependency order: ${mechanics}`, source: primarySource },
      { title: 'Link the dependency architecture', detail: 'Connect each schedule or calculation to the prior output, expose feedback loops, and keep any circularity treatment explicit.', source: primarySource },
      { title: 'Run controls and transmit a scenario', detail: 'Run identity, roll-forward, unit, sign, and direction checks, then change one assumption and trace its effect to the decision output.', source: primarySource },
    ],
    graph: [['Source inputs', 'Drivers and schedules'], ['Drivers and schedules', 'Core calculation'], ['Core calculation', 'Decision output'], ['Scenario assumption', 'Downstream outputs'], ['Integrity checks', 'Decision interpretation']],
    checks: [
      { title: 'Source and unit check', detail: 'Every input has a source, as-of date or research task, classification, and unit that matches the calculation using it.', source: primarySource },
      { title: 'Dependency check', detail: 'Every material output references a named upstream input or schedule rather than a hardcoded result.', source: primarySource },
      { title: 'Identity or roll-forward check', detail: 'The relevant accounting or mathematical identity and each schedule roll-forward reconcile in every modeled period.', source: primarySource },
      { title: 'Sign and direction check', detail: 'A favorable and adverse change move each downstream line in the economically expected direction.', source: primarySource },
      { title: 'Scenario consistency check', detail: 'The scenario changes the stated assumption only and the final output movement can be explained through the dependency graph.', source: primarySource },
    ],
    scenario: { sentence: `${topic.topic_id}-scenario`, trace: `Change one explicit assumption in ${topic.canonical_name}, follow it through the named schedules and calculations, then record the exact decision output that changes and the reason for the change.` },
    output: `Use the completed ${topic.canonical_name} build to compare the decision alternatives, identify the assumptions with the greatest effect, and state what evidence is still required before relying on the output.`,
    auditQuestions: questions,
    sections,
    generationAudit: { batchType: 'modeling_studio', sourceStatus: 'source_pack_locked', sourceInputStatus: 'real historical inputs where available; uncaptured live fields exposed as research tasks' },
  });
}

for (const [index, batch] of batches.entries()) {
  const lessons = batch.topics.map((batchTopic) => {
    const topic = queue.find((item) => item.topic_id === batchTopic.topic_id) ?? batchTopic;
    return makeLesson(topic);
  });
  const outputFile = `scratch/deep_dive_generated_modeling_batch_${String(index + 1).padStart(3, '0')}.json`;
  fs.writeFileSync(outputFile, `${JSON.stringify({ schemaVersion: 'deep-dive-generated-modeling-batch.v1', batchId: batch.batch_id, status: 'generated_for_review', lessonCount: lessons.length, lessons }, null, 2)}\n`);
  console.log(JSON.stringify({ outputFile, batchId: batch.batch_id, lessons: lessons.length }));
}

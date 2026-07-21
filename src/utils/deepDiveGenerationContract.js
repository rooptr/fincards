export const STANDARD_SECTION_SCHEMA = [
  { id: 'case-context', heading: 'Case Context', navigationLabel: 'Case' },
  { id: 'governing-question', heading: 'Governing Question', navigationLabel: 'Question' },
  { id: 'conceptual-foundation', heading: 'Conceptual Foundation', navigationLabel: 'Foundation' },
  { id: 'economic-logic', heading: 'Economic Logic', navigationLabel: 'Logic' },
  { id: 'formula-construction', heading: 'Formula Construction', navigationLabel: 'Formula' },
  { id: 'eli5', heading: 'ELI5: Core Intuition', navigationLabel: 'ELI5' },
  { id: 'comparative-framework', heading: 'Comparative Framework', navigationLabel: 'Comparison' },
  { id: 'interpretation', heading: 'Interpretation', navigationLabel: 'Interpretation' },
  { id: 'assumptions-limitations', heading: 'Assumptions and Limitations', navigationLabel: 'Limits' },
  { id: 'case-resolution', heading: 'Case Resolution', navigationLabel: 'Resolution' },
  { id: 'mastery-questions', heading: 'Questions That Test Mastery', navigationLabel: 'Mastery' },
];

export const STANDARD_SECTION_NAMES = STANDARD_SECTION_SCHEMA.map(({ heading }) => heading);

export const MODELING_LAB_SECTION_NAMES = [
  'Decision Objective',
  'Source Inputs',
  'Construction Sequence',
  'Dependency Architecture',
  'Model Integrity Checks',
  'Scenario Transmission',
  'Decision Interpretation',
  'Model Review Questions',
];

export const MODELING_STUDIO_SECTION_SCHEMA = [
  { id: 'decision-mandate', heading: 'Decision Mandate' },
  { id: 'data-room', heading: 'Data Room' },
  { id: 'build-sequence', heading: 'Build Sequence' },
  { id: 'model-architecture', heading: 'Model Architecture' },
  { id: 'control-framework', heading: 'Control Framework' },
  { id: 'stress-transmission', heading: 'Stress Transmission' },
  { id: 'decision-memo', heading: 'Decision Memo' },
  { id: 'review-drill', heading: 'Review Drill' },
];

export const SECURITISATION_DESK_SECTION_SCHEMA = [
  { id: 'transaction-mandate', heading: 'Transaction Mandate' },
  { id: 'pool-data-room', heading: 'Pool Data Room' },
  { id: 'structure-design', heading: 'Structure Design' },
  { id: 'priority-of-payments', heading: 'Priority of Payments' },
  { id: 'credit-enhancement-triggers', heading: 'Credit Enhancement and Triggers' },
  { id: 'stress-transmission', heading: 'Stress Transmission' },
  { id: 'investment-committee-memo', heading: 'Investment Committee Memo' },
  { id: 'desk-drill', heading: 'Applied Questions' },
];

export const DECISION_CASE_SECTION_SCHEMA = [
  { id: 'case-record', heading: 'Case Record' },
  { id: 'verified-evidence', heading: 'Verified Evidence' },
  { id: 'committee-mandate', heading: 'Committee Mandate' },
  { id: 'financial-assessment', heading: 'Financial Assessment' },
  { id: 'proposed-position', heading: 'Proposed Position' },
  { id: 'committee-examination', heading: 'Committee Examination' },
  { id: 'reasoned-resolution', heading: 'Reasoned Resolution' },
];

export const APPLIED_LEARNING_KINDS = new Set([
  'modeling-studio',
  'securitisation-desk',
  'decision-case',
]);

export const SUMMARY_LABELS = [
  'Governing Question',
  'Definition',
  'Formula',
  'Interpretation',
  'Limitation',
];

export const DEEP_DIVE_DRAFT_EXAMPLE = `
The ratio exists because accounting classification can overstate a company's capacity to meet a dated payment. Bed Bath & Beyond reported $1.436 billion of inventory at November 2022, yet that carrying amount could not discharge a liability until merchandise sold at a realizable price. The measure isolates the reported liquidity that remains available without a sale, a collection cycle, or a refinancing event. It changes the credit inquiry from the volume of current assets to the claims that can be met when operating execution deteriorates.
`.trim();

// Pass one deliberately privileges a concrete analytical draft over a long list of prohibitions.
export const DEEP_DIVE_DRAFT_SYSTEM_PROMPT = `
Write the requested Deep Dive section for MBA finance students. The case and filing provide evidence, but the lesson teaches the transferable concept rather than narrating the event. Write at the standard of an HBS case discussion and a serious finance publication: exact technical vocabulary, causal mechanisms, and information density in every sentence. Teach the economic logic, not the visible formula.

Before drafting, identify the section's unique intellectual burden. A section may teach one or more of: accounting origin, economic mechanism, decision consequence, validity condition, boundary condition, comparable framework, or counterargument. Do not write until that burden is clear. Do not restate an earlier burden in new words.

For a Narrative lesson, write a 35 to 60 word hero hook in three crisp beats: a dated factual event, the balance sheet or economic contradiction it exposes, and one unresolved governing tension. Use a factual tension as the headline. The headline must not contain the topic name, a rhetorical question, an imperative, a dash, or an "X or Y" construction. Keep the hook concise, source linked, and free of formula explanation or melodrama.

Quality bar:
${DEEP_DIVE_DRAFT_EXAMPLE}
`.trim();

export const DEEP_DIVE_RESEARCH_SYSTEM_PROMPT = `
Research the strongest real anchor candidates for the named MBA finance topic. Do not write lesson prose. First enforce the topic's applicability domain; reject entities or events where the concept is technically computable but professionally irrelevant. Return structured candidate records only.

For each candidate provide: candidate_id, description, geography, recognition_score from 0 to 10, governing_question_draft, applicability_status, applicability_reason, applicability_score from 0 to 10, source_quality_score from 0 to 10, teaching_value_score from 0 to 10, data_completeness_score from 0 to 10, selection_rationale, and a list of tiered primary sources. Search India first using authoritative Indian sources such as RBI, SEBI, MCA, NSE, BSE, company filings, and investor disclosures. Use an Indian case only when it is genuinely well-known, sourceable, and concept-correct. Otherwise select the strongest globally recognized case study; do not force Indian localization. A candidate cannot pass without an applicable entity, at least one authoritative source, and enough real data to teach the mechanism. Rank candidates by the combined score, using Indian geography only as a small tie-breaker when recognition is high. If no candidate passes, return needs_research rather than inventing an example.
`.trim();

// Pass two is the editor and verifier. It converts a strong draft into a complete, sourceable lesson.
export const DEEP_DIVE_EDITORIAL_SYSTEM_PROMPT = `
Edit the supplied Deep Dive draft into a publishable MBA finance case study. The reader must be able to construct, interpret, challenge, compare, and apply the concept without outside material.

For Narrative lessons, the audiobook narration must use this exact opening sequence: (1) factual thriller hook with a specific event, an apparent contradiction, and a precise unanswered question; (2) a direct reveal of the topic; (3) an interview-readiness checklist addressed to the learner, covering what the concept is, why it matters, the formula and every material variable, the core interpretation, and the most likely interview trap; (4) the lesson. Phrase the checklist naturally in the present, for example: "For this one, you should know what [concept] is, why it matters, the formula, and the interview trap." Never say "By the end, you should know." The hook creates interest; the concept supplies the explanation. Do not reveal the mechanism before the Governing Question section.

Write narration as an audiobook adaptation, not a verbatim reading of the lesson. Never reduce concept coverage for brevity: preserve every important definition, formula term, causal mechanism, assumption, limitation, accounting nuance, decision consequence, and interview distinction. Compress sentence count instead. Use short, strong sentences with precise finance vocabulary and natural narrative bridges. Speak numbers as useful comparisons or rounded quantities when precision does not change the conclusion; never read a stream of raw figures. Let ordinary punctuation set the cadence. Do not insert giggles, breath sounds, or stage directions. The renderer may add exactly one controlled opening pause token before the first spoken sentence; do not add pause tokens elsewhere. When a rendered table, formula, chart, diagram, filing image, or worksheet materially clarifies the next point, invite the learner to inspect that exact visual in natural language, such as "Take a look at the table" or "See the formula on the page." Refer only to an element that actually appears in the lesson, make the cue concise, and never narrate every visual. For the ELI5 beat, use very short sentences for an intelligent beginner without becoming childish, vague, or technically incomplete. Use one to three short Hindi bridges written in English letters in a typical three-to-five-minute narration when they improve rhythm, create a situational aside, or replace a longer English bridge. Examples include "ab dekho," "seedhi baat," and "yahi catch hai." Never use full Hindi sentences, translate whole sections into Hindi, or force a Hindi phrase where English is more natural.

Use only these Standard Deep Dive section names, in this order: ${STANDARD_SECTION_NAMES.join('; ')}.
Use only these Modeling Lab section names, in this order: ${MODELING_LAB_SECTION_NAMES.join('; ')}.
Use these Summary labels only: ${SUMMARY_LABELS.join('; ')}.

Section headings must use the approved MBA-finance vocabulary exactly. Do not invent short, cute, blog-style, or role-specific alternatives. The case may establish stakes in Case Context and resolve the framework in Case Resolution; it must not displace the concept-first curriculum in between.

Every major concept must establish five things: why the concept exists; what information it isolates; what decision that information enables; which assumptions make the inference valid; and which question a well-prepared MBA finance student should ask next. Store these as knowledgeMap.whyItExists, knowledgeMap.informationIsolated, knowledgeMap.decisionEnabled, knowledgeMap.validityAssumptions, and knowledgeMap.criticalQuestion.

Every lesson must also produce a definitionCatalog and subtopicCoverage map. The definitionCatalog contains the important academic terms required to understand the lesson. Each record contains id, term, group, formalDefinition, whyItMatters, and commonExaminationError. Do not add a location field. subtopicCoverage maps each material subtopic to the lesson section that teaches it and to the definition IDs that support it. Every definition must be assigned to at least one subtopic. The catalog is a reference layer; it does not excuse weak main prose.

Teach every material subtopic required to use the concept correctly. For a ratio this includes the accounting origin of each variable, economic rationale for inclusion or exclusion, comparable measures, interpretation across sectors and time, validity assumptions, stress cases, and decision consequences. Add a dedicated section when a material subtopic cannot be taught rigorously inside an existing approved section. The result must read as a compact, self-contained curriculum chapter, not an expanded definition.

Every sentence must introduce one precise idea. Define technical terms on first use and retain the exact term thereafter. State causal mechanisms, not bare conclusions. Explain incentives, accounting logic, creditor behavior, investor interpretation, and market consequences. Prefer professional finance vocabulary: "convertible to cash without material loss of value," "obligations due within twelve months," "realizable value," "committed financing capacity," and "working-capital cycle."

Use direct analytical construction. State the balance-sheet classification, cash-conversion condition, liability horizon, capital-allocation implication, or valuation consequence that makes a conclusion true. Do not soften a technical term after defining it. Do not restate a precise conclusion in simpler language. A paragraph must be sufficient for a reader to reconstruct the mechanism without a chart or outside explanation.

Do not describe what a formula visibly says. Explain why finance constructed the measure, why each variable belongs, what accounting line supplies it, what economic condition makes it informative, and what failure mode invalidates the result. Never write "the ratio divides," "is calculated by," or an equivalent prose transcription of notation.

Assign one intellectual responsibility to each section. Case Context establishes the facts; Governing Question defines the decision; Conceptual Foundation gives the exact definition and boundaries; Economic Logic explains why the construct exists; Formula Construction derives each term; ELI5: Core Intuition translates the mechanism without losing accuracy; Comparative Framework distinguishes adjacent concepts; Interpretation explains the output; Assumptions and Limitations identifies failure modes; Case Resolution returns to the evidence; Questions That Test Mastery tests the transferable topic. Do not repeat an idea in a later section, even with different wording. Delete any paragraph that does not add a mechanism, decision implication, assumption, edge case, accounting nuance, market implication, or exam-relevant distinction.

The ELI5 section is a short precision-preserving intuition check for an intelligent beginner. Remove jargon only after the rigorous mechanism has been taught; do not use childish language, analogies, or omit a condition that changes the conclusion.

Modeling Labs teach decision architecture, not spreadsheet navigation. Decision Objective names the business decision, the model boundary, and the output that changes the decision. Source Inputs distinguishes historical facts, externally observable market inputs, and explicit assumptions; no hardcoded number may appear without that classification and source. Construction Sequence builds operating drivers, supporting schedules, three statements, financing logic, and outputs in dependency order. Dependency Architecture identifies each source of truth, every feedback loop, and every circularity treatment. Model Integrity Checks must test accounting identities, roll-forwards, cash ties, sign conventions, and scenario consistency. Scenario Transmission traces one changed assumption through every material downstream line to the final decision. Decision Interpretation explains what a decision-maker should infer from the result and what the model cannot establish. Model Review Questions must contain at least eight answered questions that test modeling logic, not software features.

Modeling Studios are hands-on project artifacts, not longer Modeling Labs. Use exactly these sections, in order: ${MODELING_STUDIO_SECTION_SCHEMA.map(({ heading }) => heading).join('; ')}. Every source input must contain its precise document, source field or page, as-of date, unit, classification as historical fact, observable market input, or explicit assumption, and a direct URL. The learner must produce a named build output at each Build Sequence step. The Control Framework must contain balance-sheet, cash-flow, debt roll-forward, sign, and scenario-consistency checks where applicable. The Stress Transmission must change one stated real-world assumption and trace every material downstream line. Never provide an invented placeholder value; if a live input cannot be sourced, expose it as a required research task rather than filling it.

Securitisation Desks are transaction simulations. Use exactly these sections, in order: ${SECURITISATION_DESK_SECTION_SCHEMA.map(({ heading }) => heading).join('; ')}. The Pool Data Room must identify the real asset pool, reporting date, pool fields, source document, and any unavailable field. Structure Design must identify originator, SPV, note classes, reserve accounts, and risk-retention or credit-enhancement terms. Priority of Payments must present a machine-readable waterfall. Credit Enhancement and Triggers must identify attachment points, subordination, reserves, performance triggers, and the contractual consequence of a breach. Stress Transmission must vary a real input such as defaults, prepayments, recoveries, or delinquencies and trace the loss through each tranche. Applied Questions must require a transaction decision, not a definition.

Case Files are evidence-led committee exercises, not quizzes and not fictional workplace roleplay. Use exactly these sections, in order: ${DECISION_CASE_SECTION_SCHEMA.map(({ heading }) => heading).join('; ')}. Begin with a real dated record and a concrete decision that an investment, credit, treasury, valuation, or transaction committee could make. Use a bounded professional responsibility, but never invent a company, a document, a number, or a hidden fact. Verified Evidence must contain four to eight field-level sourced facts. Committee Mandate must state the decision, the time horizon, the decision standard, and at least two defensible positions. Financial Assessment must calculate the relevant measures and state what each measure cannot establish. Proposed Position must state a recommendation, the evidence supporting it, the evidence required before execution, and the fact that would reverse the recommendation. Committee Examination must contain at least eight answered questions that test the topic's core calculations, economic mechanism, accounting treatment, assumptions, limitations, counterarguments, and decision consequences. Reasoned Resolution must show the rigorous reasoning path, the tempting incorrect conclusion, and the next question a committee would ask.

For every narrative or case-file headline, write a concise factual tension from the real record. The headline must be specific, consequential, and intelligible without the topic name. It must not use an em dash, an en dash, a dash-separated construction, a rhetorical question, a generic imperative, or the pattern "X or Y." The supporting deck identifies the case date, the source-backed contradiction, and the unresolved decision without explaining the mechanism prematurely.

Do not use blog or newsletter phrasing, conversational transitions, rhetorical teasing, analogies, motivational language, or a simplified restatement after a precise statement. Never use "simply," "basically," "essentially," or "in other words." Do not use em dashes, en dashes, or dash-separated rhetorical phrasing in visible prose. Rewrite with a period, colon, comma, or a more direct sentence. Never use courseware headings or phrases such as "Reality," "Return to Reality," "Reasoning Map," "Concept Identity," "Why This Concept Exists," "Worked Example," "Interview Perspective," "Interview Notes," "Interview Definition," "The one-minute review," "What the ratio removes," "Meaning," "Boundary," "Here's the thing," "So," or "Now."

When a formula exists, provide valid KaTeX with a vertical fraction where applicable and store it as lhsLatex, relationLatex, and rhsLatex rather than one centered text block. Use explicit TeX spacing around operators such as the sequence \\;+\\; so multi-term expressions remain legible. The renderer places the left-hand side vertically centered beside the right-hand expression, which prevents an orphaned equals sign and works for every future equation. Provide a glossary record for every displayed financial-statement term. Each glossary record must contain: definition, financial-statement location, financial interpretation, and common examination trap. Formula prose must establish derivation, variable rationale, accounting origin, economic interpretation, validity assumptions, and analytical limitations. Provide at least eight answered questions in every Standard Deep Dive. Questions must test the topic's most common MBA examination and finance-interview distinctions, not merely details of the anchor case.

Every number must be real, individually sourced, and paired with an applicable entity and concept. Every Standard Deep Dive must contain both an authentic primary-source evidence excerpt with a direct source link and an original explanatory diagram that reduces cognitive effort. Evidence establishes provenance; the diagram exposes the mechanism. Decorative imagery, generic charts, and reconstructed evidence without the underlying document are prohibited.

A Standard Deep Dive must allow a reader to define, derive, justify every variable, interpret, critique, and apply the concept from the prose alone. The Summary may reference canonical stored sentences verbatim; every other sentence must be independently composed.
`.trim();

// Backward-compatible export for any caller that still asks for one editorial prompt.
export const DEEP_DIVE_GENERATION_SYSTEM_PROMPT = DEEP_DIVE_EDITORIAL_SYSTEM_PROMPT;

const DISALLOWED_LABELS = new Set([
  'Reality',
  'Return to Reality',
  'Limitations + Return to Reality',
  'The Case',
  'The Decision',
  'The Measure',
  'What It Isolates',
  'Building the Measure',
  'The Filing',
  'Reading the Result',
  'Where It Breaks',
  'The Underwriting Sequence',
  'Questions That Change the Conclusion',
  'Concept Identity',
  'Why This Concept Exists',
  'Definition + Derivation',
  'Worked Example',
  'Reasoning Map',
  'Interview Perspective',
  'Interview Application',
  'Interview Definition',
  'Interview Notes',
  'The one-minute review',
  'What the ratio removes',
  'Meaning',
  'Boundary',
  'The question',
  'Where it stops',
  'The filing, substituted',
  'Interview answer',
  'Analyst Questions',
  'Decision Case',
  'Situation Brief',
  'Data Room',
  'Required Decision',
  'Working Analysis',
  'Decision Memo',
  'Challenge Questions',
  'Answer Key',
  'Audit Questions',
]);

const CASUAL_REGISTER = [
  /\bhere(?:'|\u2019)s the thing\b/i,
  /\bwhat the ratio removes\b/i,
  /\bthe one-minute review\b/i,
  /\breturn to reality\b/i,
  /\breasoning map\b/i,
  /\bso,?\s+(?:the|this|you|it)\b/i,
  /\bnow,?\s+(?:the|this|you|it)\b/i,
  /\bsimply\b/i,
  /\bbasically\b/i,
  /\bessentially\b/i,
  /\bin other words\b/i,
  /\bthe\s+[\w -]+\s+ratio\s+divides\b/i,
  /\bis calculated by\b/i,
];

const KNOWLEDGE_MAP_FIELDS = [
  'whyItExists',
  'informationIsolated',
  'decisionEnabled',
  'validityAssumptions',
  'criticalQuestion',
];

export function createDeepDiveGenerationSpec(kind = 'standard') {
  const isModelingLab = kind === 'modeling';
  const appliedSchema = kind === 'modeling-studio'
    ? MODELING_STUDIO_SECTION_SCHEMA
    : kind === 'securitisation-desk'
      ? SECURITISATION_DESK_SECTION_SCHEMA
      : kind === 'decision-case'
        ? DECISION_CASE_SECTION_SCHEMA
        : null;
  return {
    researchPass: {
      systemPrompt: DEEP_DIVE_RESEARCH_SYSTEM_PROMPT,
      instruction: 'Find and rank applicable real anchors for [topic]. Return candidates only; do not write the lesson.',
    },
    draftPass: {
      systemPrompt: DEEP_DIVE_DRAFT_SYSTEM_PROMPT,
      instruction: 'Write [Section] for [topic], anchored on [real event/data already sourced]. State causal mechanisms, not causal claims.',
      exemplar: DEEP_DIVE_DRAFT_EXAMPLE,
    },
    editorialPass: {
      systemPrompt: DEEP_DIVE_EDITORIAL_SYSTEM_PROMPT,
      instruction: 'Edit the draft into the approved lesson schema. Preserve its strongest insight and reject generic restatement.',
    },
    systemPrompt: DEEP_DIVE_EDITORIAL_SYSTEM_PROMPT,
    sections: appliedSchema ?? (isModelingLab ? MODELING_LAB_SECTION_NAMES : STANDARD_SECTION_SCHEMA),
    summaryLabels: isModelingLab || appliedSchema ? [] : SUMMARY_LABELS,
    qualityGate: [
      'Every section heading uses the approved MBA-finance vocabulary.',
      'Every causal claim states its mechanism.',
      'The five-part knowledge map is complete and each section adds a distinct analytical contribution.',
      'Every numerical value is individually cited to a real source.',
      'Every displayed formula has a complete formula-term glossary.',
      'Every displayed formula uses structured left-hand side, relation, and right-hand-side KaTeX.',
      'Every lesson contains a complete academic definitionCatalog and subtopicCoverage map. Definition records contain no location field and every definition is assigned to a material subtopic.',
      'Every Standard Deep Dive contains authentic primary-source evidence and an original explanatory diagram.',
      'Every Standard Deep Dive contains at least eight topic-level questions that test mastery rather than recite the definition.',
      'Every Modeling Lab distinguishes facts from assumptions, traces a scenario through the model, and contains at least eight model-review questions.',
      'Every applied-learning artifact uses individually sourced real inputs; unavailable values remain explicit research tasks rather than fabricated placeholders.',
      'Every Modeling Studio, Securitisation Desk, and Case File requires a decision output and a worked professional-quality challenge.',
    ],
  };
}

const REAL_INPUT_FIELDS = ['name', 'value', 'unit', 'asOfDate', 'classification', 'source', 'sourceField'];
const DEFINITION_FIELDS = ['id', 'term', 'group', 'formalDefinition', 'whyItMatters', 'commonExaminationError'];

function hasRequiredFields(record, fields) {
  return fields.every((field) => typeof record?.[field] === 'string' && record[field].trim());
}

function validateDefinitionCoverage(lesson) {
  const errors = [];
  const definitions = lesson?.definitionCatalog ?? [];
  const definitionIds = new Set(definitions.map((item) => item?.id));
  if (definitions.length < 5) errors.push('Lesson requires at least five academic definitions.');
  if (definitionIds.size !== definitions.length) errors.push('Definition catalog contains duplicate IDs.');
  for (const item of definitions) {
    if (!hasRequiredFields(item, DEFINITION_FIELDS)) errors.push(`Academic definition is incomplete: ${item?.term ?? 'unnamed'}.`);
    if ((item?.formalDefinition?.length ?? 0) < 60) errors.push(`Academic definition is too thin: ${item?.term ?? 'unnamed'}.`);
  }

  const coverage = lesson?.subtopicCoverage ?? [];
  if (coverage.length < 2) errors.push('Lesson requires a subtopic coverage map.');
  const coveredIds = new Set();
  for (const item of coverage) {
    if (!item?.subtopic || !item?.section || !Array.isArray(item.definitionIds) || item.definitionIds.length === 0) {
      errors.push('Every subtopic coverage record requires a subtopic, section, and definition IDs.');
      continue;
    }
    for (const definitionId of item.definitionIds) {
      if (!definitionIds.has(definitionId)) errors.push(`Subtopic coverage references an unknown definition: ${definitionId}.`);
      coveredIds.add(definitionId);
    }
  }
  for (const definitionId of definitionIds) if (!coveredIds.has(definitionId)) errors.push(`Definition is not assigned to a subtopic: ${definitionId}.`);
  return errors;
}

export function validateAppliedLearningArtifact(artifact) {
  const errors = [];
  if (!APPLIED_LEARNING_KINDS.has(artifact?.kind)) {
    return { valid: false, errors: ['Unknown applied-learning artifact kind.'] };
  }

  const schema = artifact.kind === 'modeling-studio'
    ? MODELING_STUDIO_SECTION_SCHEMA
    : artifact.kind === 'securitisation-desk'
      ? SECURITISATION_DESK_SECTION_SCHEMA
      : DECISION_CASE_SECTION_SCHEMA;
  const headings = (artifact.sections ?? []).map((section) => section.heading);
  if (JSON.stringify(headings) !== JSON.stringify(schema.map(({ heading }) => heading))) {
    errors.push('Applied-learning section headings must match the approved schema and order exactly.');
  }

  if (!artifact.role?.trim() || !artifact.decision?.trim()) errors.push('Artifact requires a bounded professional role and a specific decision.');
  errors.push(...validateDefinitionCoverage(artifact));
  if ((artifact.inputs ?? []).length < 3) errors.push('Artifact requires at least three real source inputs.');
  for (const input of artifact.inputs ?? []) {
    if (!hasRequiredFields(input, REAL_INPUT_FIELDS)) errors.push(`Input is incomplete: ${input?.name ?? 'unnamed'}.`);
    if (String(input?.value ?? '').toLowerCase().includes('illustrative')) errors.push(`Invented input prohibited: ${input?.name ?? 'unnamed'}.`);
    if (!/^https:\/\//.test(input?.source ?? '')) errors.push(`Input source URL is invalid: ${input?.name ?? 'unnamed'}.`);
    if (!['historical_fact', 'market_input', 'assumption'].includes(input?.classification)) errors.push(`Input classification is invalid: ${input?.name ?? 'unnamed'}.`);
  }

  if (artifact.kind === 'modeling-studio') {
    if ((artifact.buildSteps ?? []).length < 5 || artifact.buildSteps.some((step) => !step.output || !step.dependsOn?.length)) errors.push('Modeling Studio requires five dependency-linked build steps with named outputs.');
    if ((artifact.controls ?? []).length < 5) errors.push('Modeling Studio requires five control checks.');
  }
  if (artifact.kind === 'securitisation-desk') {
    if ((artifact.tranches ?? []).length < 2) errors.push('Securitisation Desk requires at least two tranches.');
    if ((artifact.waterfall ?? []).length < 5) errors.push('Securitisation Desk requires a five-step payment waterfall.');
    if ((artifact.triggers ?? []).length < 2) errors.push('Securitisation Desk requires at least two performance triggers.');
    if ((artifact.reviewQuestions ?? []).length < 8) errors.push('Securitisation Desk requires at least eight transaction level desk questions.');
    if ((artifact.reviewQuestions ?? []).some((item) => !item?.question?.trim() || !item?.answer?.trim() || item.answer.trim().length < 100)) errors.push('Each Securitisation Desk question requires a substantive answer.');
  }
  if (artifact.kind === 'decision-case') {
    if ((artifact.options ?? []).length < 2) errors.push('Case File requires at least two defensible positions.');
    if ((artifact.challengeQuestions ?? []).length < 8) errors.push('Case File requires at least eight topic-level committee examination questions.');
    if ((artifact.challengeQuestions ?? []).some((item) => !item?.question?.trim() || !item?.answer?.trim())) errors.push('Each Case File committee examination question requires a rigorous answer.');
    if (!artifact.answerKey?.reasoning?.trim() || !artifact.answerKey?.temptingWrongAnswer?.trim() || !artifact.answerKey?.followUpQuestion?.trim() || !artifact.answerKey?.evidenceRequired?.trim() || !artifact.answerKey?.reversalEvidence?.trim()) errors.push('Case File resolution is incomplete.');
  }
  return { valid: errors.length === 0, errors };
}

function lessonText(lesson) {
  // Summary and Cram Strip nodes intentionally point back to canonical
  // section sentences. Do not treat those stable callbacks as duplicated
  // body prose during the repetition check.
  const pointerIds = new Set((lesson.cram ?? []).map((entry) => entry.pointer));
  const sectionText = (lesson.sections ?? []).flatMap((section) => [
    ...(section.body ?? []),
    section.quote ?? '',
    ...(section.conclusionQuestions ?? []).flatMap((item) => [item.question ?? '', item.answer ?? '']),
  ]);
  const canonicalSentences = new Set(sectionText.filter(Boolean).map((text) => normalizedProse(text)));
  const nodeText = Object.entries(lesson.nodes ?? {})
    .filter(([nodeId, node]) => !pointerIds.has(nodeId) && !canonicalSentences.has(normalizedProse(node.text ?? '')))
    .map(([, node]) => node.text ?? '');
  return [...nodeText, ...sectionText];
}

function normalizedProse(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function hasSlopDash(text) {
  return /[—–]|\s-\s/.test(text);
}

export function validateDeepDiveContent(lesson) {
  const errors = [];
  errors.push(...validateDefinitionCoverage(lesson));
  const sectionNames = lesson.kind === 'modeling' ? MODELING_LAB_SECTION_NAMES : STANDARD_SECTION_NAMES;
  const sectionHeadings = (lesson.sections ?? []).map((section) => section.heading);

  if (lesson.kind === 'standard') {
    if (JSON.stringify(sectionHeadings) !== JSON.stringify(STANDARD_SECTION_NAMES)) errors.push('Standard section headings must match the approved schema and order exactly.');
    for (const entry of lesson.cram ?? []) {
      if (!SUMMARY_LABELS.includes(entry.label)) errors.push(`Disallowed Summary label: ${entry.label}`);
    }

    for (const field of KNOWLEDGE_MAP_FIELDS) {
      if (typeof lesson.knowledgeMap?.[field] !== 'string' || lesson.knowledgeMap[field].trim().length < 80) {
        errors.push(`Knowledge map field is missing or analytically thin: ${field}`);
      }
    }
  }

  for (const heading of sectionHeadings) {
    if (DISALLOWED_LABELS.has(heading)) errors.push(`Courseware section label: ${heading}`);
    if (!sectionNames.includes(heading)) errors.push(`Unknown section heading: ${heading}`);
  }

  const prose = lessonText(lesson).filter(Boolean);
  const visibleText = [lesson.title ?? '', lesson.dek ?? '', ...prose];
  if (visibleText.some((text) => hasSlopDash(text))) errors.push('Visible lesson prose cannot use em dashes, en dashes, or dash-separated rhetorical phrasing.');
  if (typeof lesson.title === 'string' && (lesson.title.includes('?') || /\b\w+\s+or\s+\w+\b/i.test(lesson.title))) {
    errors.push('Headline must state a factual tension rather than ask a question or present an X or Y construction.');
  }
  for (const text of prose) {
    for (const pattern of CASUAL_REGISTER) {
      if (pattern.test(text)) errors.push(`Casual register detected: ${pattern}`);
    }
  }

  const proseCounts = new Map();
  for (const text of prose) {
    const normalized = normalizedProse(text);
    if (normalized.length < 60) continue;
    proseCounts.set(normalized, (proseCounts.get(normalized) ?? 0) + 1);
  }
  if ([...proseCounts.values()].some((count) => count > 1)) errors.push('Repeated explanatory prose detected outside the Summary pointer system.');

  const formulas = Object.values(lesson.formulas ?? {});
  if (lesson.kind === 'standard' && !formulas.some((formula) => formula?.latex)) {
    errors.push('Standard lesson is missing a structured KaTeX formula.');
  }

  for (const formula of formulas) {
    if (formula?.latex && (!formula.lhsLatex || !formula.relationLatex || !formula.rhsLatex)) {
      errors.push('A displayed formula must provide structured lhsLatex, relationLatex, and rhsLatex fields.');
    }
    if (formula?.latex && Object.keys(formula.glossary ?? {}).length === 0) {
      errors.push('A displayed formula is missing its defined-term glossary.');
    }
    for (const [term, record] of Object.entries(formula?.glossary ?? {})) {
      if (!record.definition || !record.location || !record.financialInterpretation || !record.commonExaminationTrap) {
        errors.push(`Formula glossary term is incomplete: ${term}`);
      }
    }
  }

  if (lesson.kind === 'standard') {
    const conclusionQuestions = (lesson.sections ?? []).flatMap((section) => section.conclusionQuestions ?? []);
    if (conclusionQuestions.length < 8) errors.push('Standard lesson requires at least eight questions that test topic-level mastery.');
    if (conclusionQuestions.some((item) => !item.question || !item.answer || item.answer.trim().length < 120)) errors.push('Each concluding question requires a substantive answer.');

    const evidence = (lesson.sections ?? []).map((section) => section.evidence).filter(Boolean);
    if (lesson.publishStatus !== 'draft' && !evidence.some((item) => item.source && item.documentTitle && item.image && item.rows?.length)) errors.push('Standard lesson requires an authentic primary-source evidence capture with field-level data records.');
    const diagrams = (lesson.sections ?? []).map((section) => section.diagram).filter(Boolean);
    if (!diagrams.some((item) => item.source && item.title && item.insight)) errors.push('Standard lesson requires an original sourced explanatory diagram.');
  }

  if (lesson.kind === 'modeling') {
    if (typeof lesson.objective !== 'string' || lesson.objective.trim().length < 80) errors.push('Modeling Lab requires a substantive decision objective.');
    if ((lesson.inputs ?? []).length < 3 || (lesson.inputs ?? []).some((input) => !input.name || !input.value || !input.source || !input.unit)) errors.push('Modeling Lab requires at least three fully sourced inputs.');
    if ((lesson.buildOrder ?? []).length < 5) errors.push('Modeling Lab requires a five-step construction sequence.');
    if ((lesson.graph ?? []).length < 4) errors.push('Modeling Lab requires a dependency architecture.');
    if ((lesson.checks ?? []).length < 4) errors.push('Modeling Lab requires four model-integrity checks.');
    if (!lesson.scenario?.sentence || !lesson.scenario?.trace || !lesson.nodes?.[lesson.scenario.sentence]) errors.push('Modeling Lab requires a sourced scenario transmission trace.');
    const reviewQuestions = lesson.auditQuestions ?? [];
    if (reviewQuestions.length < 8) errors.push('Modeling Lab requires at least eight model-review questions.');
    if (reviewQuestions.some((item) => !item.question || !item.answer || item.answer.trim().length < 120)) errors.push('Each model-review question requires a substantive answer.');
  }

  return { valid: errors.length === 0, errors };
}

export function assertDeepDiveContent(lesson) {
  const result = validateDeepDiveContent(lesson);
  if (!result.valid) throw new Error(result.errors.join('\n'));
  return lesson;
}

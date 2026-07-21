const OPENING_VARIANTS = [
  (name) => `The interesting thing about ${name.toLowerCase()} is that the headline number is rarely the whole story.`,
  (name) => `Start with the decision, not the definition: why would anyone need ${name.toLowerCase()} in the first place?`,
  (name) => `A useful way into ${name.toLowerCase()} is to watch what changes when one underlying assumption moves.`,
  (name) => `The cleanest way to understand ${name.toLowerCase()} is to follow the cash, value, or risk that the concept isolates.`,
  (name) => `At first glance, ${name.toLowerCase()} looks like a label. In practice, it changes what a finance decision-maker can see.`,
];

const BRIDGES = [
  'That gives us the intuition. Now make the mechanism precise.',
  'Keep that picture in mind while we add the technical detail.',
  'This is where the concept earns its place in finance.',
  'The next step is to see what has to be true for that conclusion to hold.',
  'Now follow the consequence through to the decision.',
];

const ASSIGNMENTS = [
  (name) => `Before moving on, explain ${name.toLowerCase()} aloud using one input, one decision, and one condition that would reverse your conclusion.`,
  (name) => `Your task before the next topic is to draw the mechanism behind ${name.toLowerCase()} and label where the main risk enters.`,
  (name) => `Before you continue, find one real company or transaction where ${name.toLowerCase()} would change the decision and state why.`,
  (name) => `Pause here and write the strongest objection to using ${name.toLowerCase()} on its own. Then answer that objection precisely.`,
  (name) => `To complete this topic, teach ${name.toLowerCase()} to someone else without using the formula or the headline definition first.`,
];

function clean(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\bsource pack\b/gi, 'available evidence')
    .replace(/\bdocuments?\b/gi, 'deal terms')
    .replace(/\bthis lesson\b/gi, 'this analysis')
    .trim();
}

function sentence(value) {
  const text = clean(value);
  return text ? (/[.!?]$/.test(text) ? text : `${text}.`) : '';
}

function indexFor(lesson) {
  return [...String(lesson.topicId ?? lesson.canonicalName ?? '')].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pick(values, index, offset = 0) {
  return values[(index + offset) % values.length];
}

function firstBody(lesson, ids) {
  for (const id of ids) {
    const body = lesson.sections?.find((section) => section.id === id)?.body?.[0];
    if (body) return body;
  }
  return '';
}

function add(lines, value) {
  const text = sentence(value);
  if (!text) return;
  const key = text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if (!lines.some((line) => line.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() === key)) lines.push(text);
}

function analogy(lesson, index) {
  const supplied = lesson.analogy ?? lesson.eli5 ?? lesson.simplePicture;
  if (supplied) return supplied;
  const name = String(lesson.canonicalName ?? 'the concept').toLowerCase();
  const base = pick([
    `Imagine pausing the business at one moment and asking which cash, asset, or obligation would still be available to make the decision. That is the lens this concept provides.`,
    `Imagine two companies reporting the same headline result but relying on different assumptions underneath. This concept helps separate those assumptions.`,
    `Imagine following one unit of value from its source to the final decision. The important question is where it changes, slows, or becomes uncertain.`,
  ], index + name.length);
  const information = clean(lesson.knowledgeMap?.informationIsolated ?? lesson.informationIsolated);
  const decision = clean(lesson.knowledgeMap?.decisionEnabled ?? lesson.decisionEnabled);
  const detail = information || decision
    ? `For ${name}, the specific point to watch is ${information || decision}`
    : `For ${name}, the specific point to watch is the assumption that turns the reported input into a decision signal`;
  return `${base} ${detail}.`;
}

function formulaNarration(lesson) {
  const formulaRecord = lesson.formulas?.primary ?? Object.values(lesson.formulas ?? {})[0];
  const formula = lesson.formula ?? lesson.formulaText ?? lesson.formulaKatex ?? lesson.identity ?? formulaRecord?.latex;
  if (!formula) return '';
  const variables = lesson.formulaVariables ?? lesson.variables ?? Object.values(formulaRecord?.glossary ?? {});
  const spokenFormula = clean(formula)
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\longrightarrow/g, ' leads to ')
    .replace(/\\cdot/g, ' times ')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 divided by $2')
    .replace(/[{}\\]/g, '')
    .replace(/;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const terms = variables.length
    ? variables.map((variable) => {
      const term = clean(variable.name ?? variable.term);
      const definition = clean(variable.definition ?? variable.description ?? variable.value)
        .replace(new RegExp(`^${term}\\s+is\\s+`, 'i'), '');
      return `${term} means ${definition.replace(/[.]+$/, '')}`;
    }).join('. ')
    : 'Read each term as an economic input, then ask what would make that input unreliable.';
  const label = clean(formulaRecord?.label ?? lesson.canonicalName);
  return `There is a working relationship worth pausing over: ${label}. Read the expression as ${spokenFormula}. The formula is not the explanation. ${terms}. Now ask what decision changes when each input rises or falls.`;
}

function evidenceNarration(lesson) {
  const exhibit = lesson.evidenceExhibit;
  const source = exhibit?.documentTitle ?? Object.values(lesson.sources ?? {})[0]?.title;
  if (!source) return '';
  const field = exhibit?.unavailableField ?? 'the dated inputs and assumptions used in the conclusion';
  return `There is a real piece of evidence worth looking at here: ${clean(source)}. If you have it open, focus on ${clean(field)}. It shows what the public record supports and where judgment begins.`;
}

function definitionNarration(definition, index) {
  const term = clean(definition.term ?? definition.name);
  const formal = clean(definition.formalDefinition ?? definition.definition);
  const why = clean(definition.whyItMatters ?? definition.significance);
  const trap = clean(definition.commonExaminationError ?? definition.commonMistake);
  return [
    pick([`Take ${term}. It means ${formal}`, `You will hear ${term} used here. In this context, it means ${formal}`, `The phrase ${term} sounds technical, but the idea is ${formal}`], index),
    why ? pick([`That matters because ${why}`, `Why should you care? ${why}`, `In practice, this changes the decision because ${why}`], index + 1) : '',
    trap ? pick([`The trap is ${trap}`, `Keep this distinction clear: ${trap}`, `A weak reading would be ${trap}`], index + 2) : '',
  ].filter(Boolean).join('. ');
}

function standardScript(lesson) {
  const index = indexFor(lesson);
  const name = clean(lesson.canonicalName || 'this concept');
  const lines = [];
  add(lines, lesson.title || name);
  add(lines, pick(OPENING_VARIANTS, index)(name));
  add(lines, analogy(lesson, index));
  add(lines, 'Keep the simple picture for a moment. The technical vocabulary will become useful as the mechanism unfolds.');
  add(lines, lesson.dek);
  add(lines, formulaNarration(lesson));
  add(lines, evidenceNarration(lesson));
  add(lines, `The question that matters is ${clean(lesson.governingQuestion ?? firstBody(lesson, ['governing-question', 'conceptual-foundation']))}`);

  const definitions = (lesson.definitionCatalog ?? []).slice(0, 8);
  definitions.forEach((definition, definitionIndex) => add(lines, definitionNarration(definition, definitionIndex)));

  for (const [sectionIndex, section] of (lesson.sections ?? []).entries()) {
    const body = (section.body ?? []).filter((paragraph) => !/^The evidence boundary|^The cited primary artifact|^The transaction is evaluated as a defined allocation/i.test(paragraph));
    add(lines, pick(BRIDGES, index, sectionIndex));
    body.forEach((paragraph) => add(lines, paragraph));
  }

  const questions = lesson.questions ?? lesson.reviewQuestions ?? lesson.auditQuestions ?? [];
  questions.slice(0, 8).forEach((item, questionIndex) => {
    add(lines, pick(['Try this.', 'Now turn the logic around.', 'Here is the question that tests the mechanism.', 'Suppose someone challenges you on this.'], index, questionIndex));
    add(lines, `${item.question} The strongest answer begins with this distinction: ${item.answer}`);
  });
  add(lines, pick(ASSIGNMENTS, index)(name));
  return lines.join('\n');
}

function modelingScript(lesson) {
  const index = indexFor(lesson);
  const name = clean(lesson.canonicalName || 'this model');
  const lines = [];
  add(lines, lesson.title || name);
  add(lines, pick(OPENING_VARIANTS, index)(name));
  add(lines, analogy(lesson, index));
  add(lines, `The decision this build supports is ${clean(lesson.objective ?? firstBody(lesson, ['decision-objective']))}`);
  add(lines, evidenceNarration(lesson));
  add(lines, 'Now build it in order. Every output should point back to an input or a prior calculation.');
  for (const input of lesson.inputs ?? []) add(lines, `${clean(input.name)} comes from ${clean(input.sourceField ?? input.source ?? 'the stated source')} and is measured in ${clean(input.unit)}.`);
  for (const step of lesson.buildOrder ?? []) add(lines, `${clean(step.title ?? step.name)} follows because ${clean(step.detail ?? step.description)}`);
  add(lines, firstBody(lesson, ['dependency-architecture', 'dependency-graph']));
  for (const check of lesson.checks ?? lesson.integrityChecks ?? []) add(lines, `Check ${clean(check.title ?? check.name)} by confirming ${clean(check.detail ?? check.description)}`);
  add(lines, firstBody(lesson, ['scenario-transmission', 'scenario-change']));
  add(lines, firstBody(lesson, ['decision-interpretation', 'output-interpretation']));
  for (const item of lesson.auditQuestions ?? []) add(lines, `Before you trust the output, ask yourself: ${item.question} The answer begins with ${item.answer}`);
  add(lines, pick(ASSIGNMENTS, index + 2)(name));
  return lines.join('\n');
}

export function buildTeachingScript(lesson) {
  const script = lesson.kind === 'modeling' ? modelingScript(lesson) : standardScript(lesson);
  return `[pause]\n${script}`;
}

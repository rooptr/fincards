const METAPHORS = ['time_decay', 'risk_ticker', 'flow', 'branching', 'layers', 'feedback_loop'];
const ROLES = ['a founder', 'a treasurer', 'a market maker', 'a project lead', 'an analyst', 'a lender'];
const SETTINGS = ['before sunrise', 'during a funding round', 'at the closing bell', 'in a crowded control room', 'on the day payroll is due', 'as the next decision window opens'];
const MECHANISMS = [
  { match: /time|present value|discount|cash flow|matur|duration|payback/i, name: 'time changes what a future outcome is worth', object: 'a calendar page sliding away from a sealed envelope', metaphors: ['time_decay', 'flow', 'layers'] },
  { match: /risk|beta|volatil|return|uncertain|capital cost/i, name: 'uncertainty changes the price demanded for carrying an outcome', object: 'a founder watching a flickering ticker while a claim comes due', metaphors: ['feedback_loop', 'risk_ticker', 'branching'] },
  { match: /debt|loan|interest|tax shield|leverage|credit/i, name: 'a contract fixes one claim before the next claim can collect', object: 'a signed agreement crossing a bank counter with a date stamped on it', metaphors: ['layers', 'flow', 'time_decay'] },
  { match: /ownership|equity|share|allocation|weight|structure/i, name: 'one decision splits control and consequence across different holders', object: 'a ring of keys being handed to different people at a locked door', metaphors: ['branching', 'flow', 'layers'] },
  { match: /tax|deduct|margin|profit|expense/i, name: 'a deduction removes part of a cost before the final result is seen', object: 'a receipt with a marked-out line sliding under a transparent sheet', metaphors: ['layers', 'time_decay', 'flow'] },
];
const FALLBACK_MECHANISM = { name: 'a hidden relationship changes the decision before the result appears', object: 'a control-room operator tracing one lit wire through a dark panel', metaphors: ['flow', 'feedback_loop', 'branching'] };

function hash(text = '') {
  return [...text].reduce((value, char) => ((value * 31) + char.charCodeAt(0)) >>> 0, 7);
}

function metaphorFor(text, used = []) {
  const start = hash(text) % METAPHORS.length;
  const available = METAPHORS.map((_, offset) => METAPHORS[(start + offset) % METAPHORS.length]).find((name) => !used.includes(name));
  return available ?? METAPHORS[start];
}

function mechanismFor(text) {
  return MECHANISMS.find((item) => item.match.test(text)) ?? FALLBACK_MECHANISM;
}

function shortTopic(record) {
  return String(record?.title ?? 'This decision').replace(/\s+/g, ' ').trim();
}

export function generateTopicStory(record = {}, subtopics = [], usedMetaphors = []) {
  const title = shortTopic(record);
  const summary = String(record.short_summary ?? `The decision behind ${title}.`).replace(/\s+/g, ' ').trim();
  const role = ROLES[hash(title) % ROLES.length];
  const setting = SETTINGS[hash(`${title}:setting`) % SETTINGS.length];
  const mechanism = mechanismFor(`${title} ${summary}`);
  const metaphor = metaphorFor(`${title}:${summary}`, usedMetaphors);
  const used = [metaphor];
  const panelMetaphors = mechanism.metaphors.map((candidate) => {
    const chosen = metaphorFor(`${title}:${candidate}`, used);
    used.push(chosen);
    return chosen;
  });
  const panelObjects = [mechanism.object, `${mechanism.object} interrupted at the critical moment`, `${mechanism.object} resolving into a visible consequence`];
  const panels = panelMetaphors.map((panelMetaphor, index) => ({
    id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-panel-${index + 1}`,
    narration: index === 0 ? `${role} sees the problem arrive ${setting}. ${mechanism.name[0].toUpperCase()}${mechanism.name.slice(1)}.` : index === 1 ? `The pressure moves through ${panelObjects[index]}. One wrong assumption changes who carries the consequence.` : `The mechanism becomes visible: ${summary}`,
    illustration_key: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-panel-${index + 1}-${panelMetaphor}`,
    visual: { metaphor: panelMetaphor, object: panelObjects[index], action: index === 0 ? 'arrives' : index === 1 ? 'tightens' : 'resolves', actors: [role, panelObjects[index]] },
  }));
  return {
    narrative: {
      hook: `${role} has one decision left ${setting}: ${summary} The cost of getting ${title} wrong is no longer abstract.`,
      reveal: title,
      definition: summary,
      misconception: `The visible outcome is not the whole mechanism behind ${title}.`,
      payoff: `You can now use ${title} to make the next decision with the mechanism in view.`,
    },
    visual: { metaphor, actors: [title], states: ['pressure', 'mechanism', 'consequence'], hand_drawn_style: 'locked-ink' },
    panels,
    interactions: [],
    beats: ['the pressure arrives', 'the hidden mechanism moves', 'the decision changes'],
    formula: record.formula || '',
    subtopics: subtopics.map((name, index) => {
      const subtopic = String(name?.title ?? name).trim();
      const subMetaphor = metaphorFor(`${title}:${subtopic}:${index}`, used);
      used.push(subMetaphor);
      return {
        title: subtopic,
        mechanism: mechanismFor(subtopic),
        illustration_key: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-subtopic-${index}-${subMetaphor}`,
        visual: { metaphor: subMetaphor, object: mechanismFor(subtopic).object, actors: [subtopic], states: ['question', 'movement', 'answer'], hand_drawn_style: 'locked-ink' },
      };
    }),
  };
}

export function auditIllustrationUniqueness(story = {}) {
  const keys = [...(story.panels ?? []).map((panel) => panel.illustration_key), ...(story.subtopics ?? []).map((item) => item.illustration_key)].filter(Boolean);
  return keys.length === new Set(keys).size;
}

export function generateTopicLibrary(records = []) {
  const used = [];
  return records.map((record) => {
    const story = generateTopicStory(record, record.subtopics ?? [], used);
    used.push(story.visual.metaphor);
    return story;
  });
}

export function buildTopicChapter(record = {}) {
  const story = generateTopicStory(record, record.subtopics ?? []);
  const scene = {
    scene_type: 'concept_building',
    learning_objective: story.narrative.definition,
    refers_back_to_hook: true,
    introduces_formal_term: Boolean(story.formula),
    transition_package: { title: story.narrative.reveal, story: story.narrative.definition },
    formula_package: story.formula ? { latex: story.formula, variables: [] } : {},
    illustration_package: { primitive_type: story.visual.metaphor, bound_variables: [], pedagogical_justification: `The ${story.visual.metaphor} metaphor expresses the mechanism in ${story.narrative.reveal}.` },
    diagram_package: {}, animation_package: {}, widget_package: {}, misconception_package: {}, interview_package: {}, eli5_package: {}, mba_package: {}, qa_package: {},
  };
  return {
    schema_version: '1.0', content_version: 'generated', canonical_concept_model: { domain: record.domain ?? 'Finance', topic: story.narrative.reveal, definition: story.narrative.definition, purpose: story.narrative.payoff, hero: { hook_scenario: story.narrative.hook, one_line_definition: story.narrative.definition, why_it_exists: story.narrative.payoff, hero_visual_concept: story.visual.metaphor } },
    curriculum: { prerequisites: [], learning_goals: [story.narrative.payoff] }, teaching_blueprint: { purpose: story.narrative.payoff }, dependency_package: {}, review_package: {}, visualization_hints: {}, story_engine: story, scenes: [scene],
  };
}

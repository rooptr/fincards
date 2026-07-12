const LEGACY_METAPHORS = {
  timeline: 'time_decay',
  scale: 'risk_ticker',
  flow_path: 'flow',
  container_transfer: 'flow',
  note_stack: 'layers',
  stacked_bars: 'layers',
};

export function normalizeStoryEngine(chapter) {
  const concept = chapter.canonical_concept_model ?? {};
  const hero = concept.hero ?? {};
  const firstIllustration = chapter.scenes?.find(
    (scene) => scene.illustration_package?.primitive_type,
  )?.illustration_package;

  const generated = generateTopicStory({
    title: concept.topic ?? 'This topic',
    short_summary: concept.definition ?? concept.purpose ?? '',
    formula: chapter.scenes?.find((scene) => scene.formula_package?.latex)?.formula_package?.latex ?? '',
  }, (chapter.scenes ?? []).map((scene) => scene.transition_package?.title ?? scene.learning_objective));
  const base = chapter.story_engine ?? {
    narrative: {
      hook: hero.hook_scenario ?? '',
      reveal: concept.topic ?? '',
      definition: concept.definition ?? '',
      misconception: '',
      payoff: concept.purpose ?? '',
    },
    visual: {
      metaphor:
        LEGACY_METAPHORS[hero.hero_visual_concept ?? firstIllustration?.primitive_type] ??
        'flow',
      actors: [],
      states: ['assumption', 'pressure', 'reveal'],
      hand_drawn_style: 'ink',
    },
    interactions: [],
    beats: chapter.scenes ?? [],
  };
  return {
    ...base,
    panels: base.panels?.length ? base.panels : generated.panels,
    subtopics: base.subtopics?.length ? base.subtopics : generated.subtopics,
  };
}

export function validateStoryEngine(model) {
  return (model.interactions ?? []).flatMap((item, index) => [
    ...(item.drives?.length
      ? []
      : [`Interaction ${index} must drive at least one visual property.`]),
    ...(item.learning_effect?.trim()
      ? []
      : [`Interaction ${index} needs a learning effect.`]),
  ]);
}
import { generateTopicStory } from './topicStoryGenerator.js';

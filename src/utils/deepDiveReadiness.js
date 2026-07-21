export const GENERATABLE_FORMATS = new Set(['Narrative', 'Structural', 'Reference', 'Modeling Lab']);

export function readinessStatus(topic) {
  if (topic.eligibility?.startsWith('duplicate_of:')) return 'duplicate';
  if (topic.eligibility === 'flashcards_only' || topic.format === 'Flashcards only') return 'flashcards_only';
  if (!GENERATABLE_FORMATS.has(topic.format)) return 'needs_classification';
  if (topic.classification_status && topic.classification_status !== 'reviewed') return 'needs_classification';
  if (topic.applicability_check?.status !== 'pass') return 'needs_applicability_review';
  if (topic.anchor_selection?.status !== 'locked') return 'needs_anchor_selection';
  if (!topic.anchor_description || !topic.sources?.length || !topic.governing_question_draft) return 'incomplete_readiness';
  if (!topic.formula_or_mechanics_stub?.trim()) return 'incomplete_mechanics';
  if (topic.eligibility !== 'ready') return 'not_ready';
  return 'ready';
}

export function researchBrief(topic) {
  return {
    topic_id: topic.topic_id,
    canonical_name: topic.canonical_name,
    format: topic.format,
    experience_type: topic.experience_type ?? 'standard',
    decision_case_eligible: topic.decision_case_eligible === true,
    career_tracks: topic.career_tracks ?? ['finance_roles_core'],
    lab_family: topic.lab_family ?? null,
    anchor_preference: topic.anchor_preference ?? {
      preferred_geography: 'India',
      fallback: 'globally-recognized-case',
      rule: 'Use India when the case is famous, sourceable, and concept-correct; otherwise use the strongest global case.',
    },
    domain_guardrail: topic.applicability_check?.reason ?? null,
    governing_question_draft: topic.governing_question_draft ?? null,
    mechanics_stub: topic.formula_or_mechanics_stub ?? null,
    candidate_anchors: topic.anchor_candidates ?? [],
    selection_status: topic.anchor_selection?.status ?? 'pending',
    research_status: topic.research_status ?? 'unstarted',
  };
}

export function rankAnchorCandidates(candidates = [], { preferredGeography = 'India' } = {}) {
  return [...candidates]
    .filter((candidate) => candidate.applicability_status === 'pass' && candidate.sources?.length)
    .map((candidate) => ({
      ...candidate,
      score: (candidate.applicability_score ?? 0) * 4
        + (candidate.source_quality_score ?? 0) * 3
        + (candidate.teaching_value_score ?? 0) * 2
        + (candidate.data_completeness_score ?? 0)
        + (candidate.geography === preferredGeography && (candidate.recognition_score ?? 0) >= 7 ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score);
}

export function lockBestAnchor(topic, candidates = topic.anchor_candidates ?? []) {
  const ranked = rankAnchorCandidates(candidates, {
    preferredGeography: topic.anchor_preference?.preferred_geography ?? 'India',
  });
  const selected = ranked[0];
  if (!selected) throw new Error(`No valid applicable anchor exists for ${topic.topic_id}.`);
  return {
    ...topic,
    anchor_description: selected.description,
    sources: selected.sources,
    governing_question_draft: selected.governing_question_draft ?? topic.governing_question_draft,
    applicability_check: {
      status: 'pass',
      reason: selected.applicability_reason,
    },
    eligibility: 'ready',
    research_status: 'reviewed',
    anchor_selection: {
      status: 'locked',
      candidate_id: selected.candidate_id,
      rationale: selected.selection_rationale,
    },
  };
}

export function buildGenerationQueue(topics, { includeModeling = true } = {}) {
  return topics
    .filter((topic) => includeModeling || topic.format !== 'Modeling Lab')
    .filter((topic) => readinessStatus(topic) === 'ready')
    .map((topic) => ({
      topic_id: topic.topic_id,
      canonical_name: topic.canonical_name,
      format: topic.format,
      experience_type: topic.experience_type ?? 'standard',
      decision_case_eligible: topic.decision_case_eligible === true,
      career_tracks: topic.career_tracks ?? ['finance_roles_core'],
      research: researchBrief(topic),
      generation_status: 'queued',
    }));
}

export function assertReadyForGeneration(topic) {
  const status = readinessStatus(topic);
  if (status !== 'ready') {
    throw new Error(`Topic ${topic.topic_id ?? topic.canonical_name} is blocked from generation: ${status}.`);
  }
  return topic;
}

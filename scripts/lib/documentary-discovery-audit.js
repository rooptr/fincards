const editorialParagraphLimit = 1200;

const prohibitedMetaTeachingPatterns = [
  /\bthis lesson\b/i,
  /\bthe local question\b/i,
  /\bwhen you look at the structure\b/i,
  /\bconsider the implication\b/i,
  /\bapply the mechanism to this question\b/i,
  /\bframe the answer as an investment-committee challenge\b/i,
  /\bnow reverse the assumption\b/i,
  /\bthat completes\b/i,
];

function paragraphsOf(script) {
  return String(script ?? '')
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/[ \t\n]+/g, ' ').trim())
    .filter(Boolean);
}

function auditCommon(script, chunkLimit) {
  const text = String(script ?? '');
  const errors = [];
  if (prohibitedMetaTeachingPatterns.some((pattern) => pattern.test(text))) {
    errors.push('contains prohibited meta-teaching narration');
  }
  for (const [index, paragraph] of paragraphsOf(text).entries()) {
    if (paragraph.length > chunkLimit) {
      errors.push(`paragraph ${index + 1} has ${paragraph.length.toLocaleString()} characters and exceeds the ${chunkLimit.toLocaleString()} character chunk limit`);
    } else if (paragraph.length > editorialParagraphLimit) {
      errors.push(`paragraph ${index + 1} has ${paragraph.length.toLocaleString()} characters and exceeds the 1,200 character editorial limit`);
    }
  }
  return errors;
}

export function auditDocumentaryLesson({ lessonId, script, chunkLimit = 3000 }) {
  const text = String(script ?? '');
  const errors = auditCommon(text, chunkLimit);
  const questions = text.match(/\?/g)?.length ?? 0;
  if (questions > 4) {
    errors.push(`lesson has ${questions} listener-facing questions; maximum is 4`);
  }
  const hasGreeting = /Hello Deepti\. I hope you are preparing well and staying hydrated\./i.test(text);
  if (lessonId !== 'generated_securitisation_securitization' && hasGreeting) {
    errors.push('Deepti greeting is allowed only in lesson 1');
  }
  return errors;
}

export function auditDocumentaryEpisode({ episodeNumber, script, chunkLimit = 8000 }) {
  const text = String(script ?? '');
  const errors = auditCommon(text, chunkLimit);
  const turns = paragraphsOf(text);
  const invalidTurns = turns.filter((turn) => !/^\[(DIYA|MEERA)\]\s+/.test(turn));
  if (invalidTurns.length) {
    errors.push(`episode ${episodeNumber} contains ${invalidTurns.length} unsupported speaker turn${invalidTurns.length === 1 ? '' : 's'}`);
  }
  const questionTurns = turns.filter((turn) => /\?[”'\")\]]*$/.test(turn)).length;
  if (turns.length && questionTurns / turns.length >= 0.2) {
    errors.push(`episode ${episodeNumber} has ${questionTurns}/${turns.length} question-ending turns; must remain below 20%`);
  }
  return errors;
}

function boundaryText(script, edge) {
  const paragraphs = paragraphsOf(script);
  const paragraph = edge === 'opening' ? paragraphs[0] : paragraphs.at(-1);
  return String(paragraph ?? '')
    .replace(/^\[(?:DIYA|MEERA)\]\s+/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function auditDocumentaryCollection({ lessons = [], episodes = [] }) {
  const errors = [];
  const records = [
    ...lessons.map((lesson) => ({ label: lesson.id, script: lesson.script })),
    ...episodes.map((episode) => ({ label: `episode-${episode.number}`, script: episode.script })),
  ];
  for (const edge of ['opening', 'closing']) {
    const labelsByBoundary = new Map();
    for (const record of records) {
      const boundary = boundaryText(record.script, edge);
      if (!boundary) continue;
      const labels = labelsByBoundary.get(boundary) ?? [];
      labels.push(record.label);
      labelsByBoundary.set(boundary, labels);
    }
    for (const labels of labelsByBoundary.values()) {
      if (labels.length > 1) errors.push(`duplicate ${edge} shared by ${labels.join(', ')}`);
    }
  }
  return errors;
}

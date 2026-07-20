function normalizeScript(script) {
  return String(script ?? '')
    .replace(/\r\n?/g, '\n')
    .trim();
}

function episodeSpeaker(paragraph) {
  const bracketed = paragraph.match(/^\[(DIYA|MEERA)\]\s*/i);
  if (bracketed) {
    return {
      speaker: bracketed[1].toLowerCase() === 'diya' ? 'Diya' : 'Meera',
      text: paragraph.slice(bracketed[0].length).trim(),
    };
  }

  const spoken = paragraph.match(/^(Diya|Meera)\s*(?::|[-–—])\s*/i);
  if (spoken) {
    return {
      speaker: spoken[1].toLowerCase() === 'diya' ? 'Diya' : 'Meera',
      text: paragraph.slice(spoken[0].length).trim(),
    };
  }

  return { speaker: null, text: paragraph.trim() };
}

export function parseTranscript(script, kind = 'lesson') {
  const normalized = normalizeScript(script);
  if (!normalized) return [];

  return normalized
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)
    .map((paragraph, index) => {
      const parsed = kind === 'episode'
        ? episodeSpeaker(paragraph)
        : { speaker: null, text: paragraph };
      return {
        id: 'segment-' + (index + 1),
        speaker: parsed.speaker,
        text: parsed.text,
      };
    });
}

function spokenWordCount(text) {
  return String(text ?? '').match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function hasCompleteExplicitCues(explicitCues, segmentCount) {
  return (
    Array.isArray(explicitCues)
    && explicitCues.length === segmentCount
    && explicitCues.every((cue) => (
      Number.isFinite(cue?.start)
      && Number.isFinite(cue?.end)
      && cue.end > cue.start
    ))
  );
}

export function buildTranscriptCues(segments, duration, explicitCues = null) {
  if (!Array.isArray(segments) || segments.length === 0) return [];

  if (hasCompleteExplicitCues(explicitCues, segments.length)) {
    return segments.map((segment, index) => ({
      ...segment,
      start: explicitCues[index].start,
      end: explicitCues[index].end,
      timing: 'explicit',
    }));
  }

  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : segments.length;
  const weights = segments.map((segment) => Math.max(1, spokenWordCount(segment.text)));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const preliminaryDurations = weights.map((weight) => Math.max(1, (weight / totalWeight) * safeDuration));
  const preliminaryTotal = preliminaryDurations.reduce((sum, value) => sum + value, 0);
  const scale = safeDuration / preliminaryTotal;

  let cursor = 0;
  return segments.map((segment, index) => {
    const start = cursor;
    const end = index === segments.length - 1
      ? safeDuration
      : Math.min(safeDuration, cursor + (preliminaryDurations[index] * scale));
    cursor = end;
    return {
      ...segment,
      start,
      end,
      timing: 'estimated',
    };
  });
}

export function findActiveCueIndex(cues, currentTime) {
  if (!Array.isArray(cues) || cues.length === 0) return -1;
  const safeTime = Number.isFinite(currentTime) ? currentTime : 0;
  const foundIndex = cues.findIndex((cue) => safeTime >= cue.start && safeTime < cue.end);
  if (foundIndex >= 0) return foundIndex;
  if (safeTime < cues[0].start) return 0;
  return cues.length - 1;
}

function escapePattern(value) {
  return value.replace(/[.*+?^$()|[\]\\{}]/g, '\\$&');
}

export function tokenizeGlossaryTerms(text, glossary = []) {
  const source = String(text ?? '');
  if (!source || !Array.isArray(glossary) || glossary.length === 0) {
    return source ? [{ type: 'text', text: source }] : [];
  }

  const candidates = glossary
    .flatMap((entry) => [entry.term, ...(entry.aliases ?? [])]
      .filter(Boolean)
      .map((alias) => ({ alias, glossaryId: entry.id })))
    .sort((left, right) => right.alias.length - left.alias.length);

  const matches = [];
  for (const candidate of candidates) {
    const pattern = new RegExp(
      '(?<![\\p{L}\\p{N}])' + escapePattern(candidate.alias) + '(?![\\p{L}\\p{N}])',
      'giu',
    );
    for (const match of source.matchAll(pattern)) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        glossaryId: candidate.glossaryId,
      });
    }
  }

  matches.sort((left, right) => left.start - right.start || (right.end - right.start) - (left.end - left.start));
  const selected = [];
  for (const match of matches) {
    if (selected.some((existing) => match.start < existing.end && match.end > existing.start)) continue;
    selected.push(match);
  }
  selected.sort((left, right) => left.start - right.start);

  const tokens = [];
  let cursor = 0;
  selected.forEach((match) => {
    if (match.start > cursor) tokens.push({ type: 'text', text: source.slice(cursor, match.start) });
    tokens.push({ type: 'term', text: match.text, glossaryId: match.glossaryId });
    cursor = match.end;
  });
  if (cursor < source.length) tokens.push({ type: 'text', text: source.slice(cursor) });
  return tokens;
}

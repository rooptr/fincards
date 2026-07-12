export function heroCopyFor(story, beat) {
  const narrative = story?.narrative ?? {};
  if (beat === 'prologue') return narrative.hook ? [narrative.hook] : [];
  if (beat === 'reveal') return [narrative.reveal, narrative.definition].filter(Boolean);
  return [narrative.payoff].filter(Boolean);
}

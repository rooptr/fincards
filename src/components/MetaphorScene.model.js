const METAPHORS = new Set([
  'time_decay',
  'risk_ticker',
  'flow',
  'branching',
  'layers',
  'feedback_loop',
]);

export function metaphorFor(name) {
  return METAPHORS.has(name) ? name : 'flow';
}

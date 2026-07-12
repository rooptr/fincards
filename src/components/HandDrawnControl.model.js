const CONTROL_KINDS = {
  balance: 'weight',
  time_decay: 'timeline',
  flow: 'splitter',
  branching: 'branch-marker',
  layers: 'layer-marker',
  feedback_loop: 'gate',
};

export function controlKindFor(metaphor) {
  return CONTROL_KINDS[metaphor] ?? 'handle';
}

export function controlPercent(value, min = 0, max = 100) {
  const lower = Number(min);
  const upper = Number(max);
  const current = Number(value);
  if (!Number.isFinite(current) || !Number.isFinite(lower) || !Number.isFinite(upper) || upper <= lower) return 0;
  return Math.max(0, Math.min(100, ((current - lower) / (upper - lower)) * 100));
}

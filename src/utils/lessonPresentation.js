import katex from 'katex';

export const HERO_STAGES = ['prologue', 'reveal', 'expand', 'content'];

function normalizeFormulaLatex(latex) {
  return String(latex).replace(/\s*\+\s*/g, String.raw` \;+\; `);
}

export function formulaMarkup(latex, { trustedCommands = [], output = 'htmlAndMathml', displayMode = true } = {}) {
  if (!latex) return '';
  return katex.renderToString(normalizeFormulaLatex(latex), {
    displayMode,
    throwOnError: false,
    strict: false,
    output,
    trust: (context) => trustedCommands.includes(context.command),
  });
}

export function stageAt(progress) {
  const value = Math.max(0, Math.min(1, Number(progress) || 0));
  if (value < 0.28) return HERO_STAGES[0];
  if (value < 0.52) return HERO_STAGES[1];
  if (value < 0.76) return HERO_STAGES[2];
  return HERO_STAGES[3];
}

const PRIMITIVE_METAPHORS = {
  timeline: 'time_decay',
  note_stack: 'layers',
  scale: 'risk_ticker',
  flow_path: 'flow',
  container_transfer: 'flow',
  stacked_bars: 'branching',
};
const METAPHOR_PALETTE = ['time_decay', 'risk_ticker', 'flow', 'branching', 'layers', 'feedback_loop'];

export function uniqueMetaphors(scenes = []) {
  const used = new Set();
  return scenes.map((scene, index) => {
    const preferred = PRIMITIVE_METAPHORS[scene?.illustration_package?.primitive_type];
    const candidate = [preferred, ...METAPHOR_PALETTE].find((name) => name && !used.has(name));
    const chosen = candidate ?? `custom_${index}`;
    used.add(chosen);
    return chosen;
  });
}

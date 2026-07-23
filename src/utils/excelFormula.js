export function normalizeFormulaSource(formula) {
  if (!formula) return '';

  return String(formula)
    .replace(/^formula:\s*/i, '')
    .trim()
    .replace(/[×]|Ã—/g, '\\times');
}

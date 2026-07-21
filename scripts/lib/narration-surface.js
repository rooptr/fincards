const aliasPatterns = [
  [/\bS\s*P\s*V\b/gi, 'SPV', 'S P V'],
  [/\bA\s*B\s*S\b/gi, 'ABS', 'A B S'],
  [/\bM\s*B\s*S\b/gi, 'MBS', 'M B S'],
  [/\bC\s*D\s*O\b/gi, 'CDO', 'C D O'],
  [/\bC\s*L\s*O\b/gi, 'CLO', 'C L O'],
  [/\bN\s*P\s*L\b/gi, 'NPL', 'N P L'],
  [/\bS\s*T\s*S\b/gi, 'STS', 'S T S'],
  [/\bP\s*S\s*A\b/gi, 'PSA', 'P S A'],
  [/\bT\s*A\s*L\s*F\b/gi, 'TALF', 'T A L F'],
  [/\bI\s*C\s*R\s*A\b/gi, 'ICRA', 'I C R A'],
  [/\bF\s*C\s*I\s*C\b/gi, 'FCIC', 'F C I C'],
  [/\bR\s*B\s*I\b/gi, 'RBI', 'R B I'],
  [/\bS\s*E\s*C\b/gi, 'SEC', 'S E C'],
  [/\bL\s*T\s*V\b/gi, 'LTV', 'L T V'],
  [/\bD\s*S\s*C\s*R\b/gi, 'DSCR', 'D S C R'],
];

const transactionCodeRewrites = [
  [/\bMIAMI\s+10\s+2022\b/gi, "Kogta Financial's [[YEAR:2022]] vehicle-loan securitisation"],
];

const aliases = new Map(aliasPatterns.map(([, key, spoken]) => [key, spoken]));

export function prepareNarrationText(value) {
  let text = String(value ?? '')
    .replace(/\r/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\bdoes the same\b/gi, 'also makes the scheduled payment')
    .replace(/(?:^|[.!?]\s+)It can\.(?=\s|$)/g, ' The originator can use ordinary borrowing.')
    .replace(/\bSIFMA\b/g, 'Sifma');

  for (const [pattern, replacement] of transactionCodeRewrites) text = text.replace(pattern, replacement);
  for (const [pattern, key] of aliasPatterns) text = text.replace(pattern, `[[ALIAS:${key}]]`);
  text = text.replace(/\[\[YEAR:(\d{4})\]\]/g, '__YEAR_$1__');
  text = text.replace(/\b(?:19|20)\d{2}\b/g, (year) => `[[YEAR:${year}]]`);
  text = text.replace(/\[\[YEAR:(\d{4})\]\]/g, '__YEAR_$1__');
  text = text.replace(/(?<![A-Za-z0-9_])\d{1,3}(?:,\d{3})*(?:\.\d+)?(?=%|\b)/g, (number) => `[[NUMBER:${number}]]`);
  text = text.replace(/__YEAR_(\d{4})__/g, '[[YEAR:$1]]');

  return text
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .trim();
}

export function renderNarrationSsml(value, xmlEscape) {
  return xmlEscape(value)
    .replace(/\[\[ALIAS:([A-Z]+)\]\]/g, (_, key) => `<sub alias="${aliases.get(key) ?? key.split('').join(' ')}">${key}</sub>`)
    .replace(/\[\[YEAR:(\d{4})\]\]/g, (_, year) => `<say-as interpret-as="date" format="y">${year}</say-as>`)
    .replace(/\[\[NUMBER:([\d,.]+)\]\]/g, (_, number) => `<say-as interpret-as="cardinal">${number}</say-as>`);
}

export function findNarrationRisks(value) {
  const text = String(value ?? '');
  const risks = [];
  if (/\b[A-Z]{2,}(?:\s+\d{1,4}){1,3}\b/.test(text)) risks.push('unresolved uppercase transaction code plus numeric identifier');
  if (/\bdoes the same\b/i.test(text)) risks.push('short echo phrase');
  if (/(?:^|[.!?]\s+)It can\.(?=\s|$)/.test(text)) risks.push('abrupt pronoun fragment');
  if (/\uFFFD|Ã¢|â€™|â€œ|â€/.test(text)) risks.push('garbled text encoding');
  const withoutMarkers = text
    .replace(/^\[(?:DIYA|MEERA)\]\s*/gm, '')
    .replace(/\[\[(?:ALIAS:[A-Z]+|YEAR:\d{4}|NUMBER:[\d,.]+)\]\]/g, '');
  const unknownUppercaseWords = [...new Set(withoutMarkers.match(/\b[A-Z]{2,}\b/g) ?? [])];
  if (unknownUppercaseWords.length) risks.push(`unresolved uppercase terms: ${unknownUppercaseWords.join(', ')}`);
  if (/(?<![A-Za-z0-9_])\d{1,3}(?:,\d{3})*(?:\.\d+)?(?=%|\b)/.test(withoutMarkers)) risks.push('unresolved raw numeric value');
  return risks;
}

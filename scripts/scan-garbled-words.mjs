// Find all suspicious/garbled words across all lesson scripts
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scratch/securitisation_masterclass_audio_scripts_v7.json', 'utf8'));

const allText = data.lessons.map(l => l.script).join(' ');
const words = allText.replace(/\[.*?\]/g, '').split(/[\s,;:!?()"']+/).filter(Boolean);

// Check each word
const validPattern = /^[a-zA-Z]+([-'][a-zA-Z]+)*$/;
const suspicious = new Map();

for (const w of words) {
  if (w.length < 5) continue;
  if (/^\d/.test(w) || /^https?/.test(w)) continue;

  const lower = w.toLowerCase();
  if (!validPattern.test(w)) continue;

  // Long words without hyphens (likely garbled concatenation)
  if (lower.length > 18 && !lower.includes('-')) {
    // Check if it's a known valid long word
    const knownLong = [
      'overcollateralisation', 'overcollateralised', 'undercollateralisation',
      'recharacterisation', 'recharacterised', 'mischaracterisation',
      'creditworthiness', 'interchangeable', 'rehypothecation',
      'collateralisation', 'recoverability', 'reinvestment',
      'reclassification', 'characterisation', 'discretionary',
      'indebtedness', 'enforceability', 'unenforceability',
      'counterparties', 'contractually', 'prioritisation',
    ];
    if (!knownLong.includes(lower)) {
      if (!suspicious.has(lower)) suspicious.set(lower, []);
      suspicious.get(lower).push(w);
    }
  }

  // Words that look like concatenated English words (camelCase-like in lowercase)
  // e.g. "datlevelool" or "poolstratification"
  if (lower.length > 12 && !lower.includes('-')) {
    // Check for common word fragments smashed together
    const fragments = ['pool', 'level', 'tranche', 'asset', 'cash', 'flow', 'date', 'dat', 'note', 'rate'];
    for (const frag of fragments) {
      const idx = lower.indexOf(frag);
      if (idx > 0 && idx < lower.length - frag.length) {
        // Fragment is in the middle - suspicious
        if (!suspicious.has(lower)) suspicious.set(lower, []);
        suspicious.get(lower).push(`contains "${frag}" at pos ${idx}`);
        break;
      }
    }
  }
}

console.log('=== SUSPICIOUS WORDS ===');
for (const [word, info] of suspicious) {
  // Find context
  for (const lesson of data.lessons) {
    const idx = lesson.script.toLowerCase().indexOf(word);
    if (idx >= 0) {
      const context = lesson.script.slice(Math.max(0, idx - 50), Math.min(lesson.script.length, idx + word.length + 50)).replace(/\n/g, ' ');
      console.log(`"${word}" in lesson ${data.lessons.indexOf(lesson) + 1} (${lesson.lessonId}):`);
      console.log(`  Context: ...${context}...`);
      break;
    }
  }
}

// Also scan for unusual character sequences that suggest broken text
console.log('\n=== UNUSUAL SEQUENCES ===');
for (const lesson of data.lessons) {
  const lessonIdx = data.lessons.indexOf(lesson) + 1;
  // Find any word with 4+ consecutive consonants (rare in English)
  const consonantRuns = lesson.script.match(/\b\w*[bcdfghjklmnpqrstvwxyz]{5,}\w*\b/gi);
  if (consonantRuns) {
    const unique = [...new Set(consonantRuns.map(w => w.toLowerCase()))];
    for (const w of unique) {
      if (['strengths', 'synths', 'sixths'].includes(w)) continue;
      console.log(`Lesson ${lessonIdx}: consonant run in "${w}"`);
    }
  }
}

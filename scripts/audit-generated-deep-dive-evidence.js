import fs from 'node:fs';
import path from 'node:path';

const scratchDir = path.resolve('scratch');
const batchFiles = fs.readdirSync(scratchDir)
  .filter((name) => /^deep_dive_generated_batch_\d{3}\.json$/.test(name))
  .sort();

const failures = [];
let lessonCount = 0;
let capturedCount = 0;
let heldForEvidenceCount = 0;
let legacyPendingCount = 0;
const strict = process.argv.includes('--strict');

for (const fileName of batchFiles) {
  const filePath = path.join(scratchDir, fileName);
  const batch = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const lesson of batch.lessons ?? []) {
    lessonCount += 1;
    const evidence = lesson.sections?.find((section) => section.id === 'case-resolution')?.evidence;
    const prefix = `${fileName}:${lesson.topicId}`;
    const rows = evidence?.rows ?? [];
    const rowsValid = rows.length >= 3 && rows.every((row) => row.item && row.value && row.source);
    const sourcesValid = Object.values(lesson.sources ?? {}).every((source) => /^https:\/\//.test(source.url ?? ''));

    if (evidence?.status === 'captured_for_editorial_review') {
      if (!rowsValid) failures.push(`${prefix}: captured evidence has fewer than three complete field-level evidence rows.`);
      capturedCount += 1;
    } else if (evidence?.status === 'source_record_generated') {
      heldForEvidenceCount += 1;
      if (strict) failures.push(`${prefix}: source record is generated but not evidence-captured.`);
    } else if (evidence?.status === 'capture_required_before_publish') {
      legacyPendingCount += 1;
      failures.push(`${prefix}: legacy pending evidence record remains.`);
    } else {
      failures.push(`${prefix}: evidence status is ${evidence?.status ?? 'missing'}.`);
    }
    if (!sourcesValid) failures.push(`${prefix}: one or more lesson sources do not contain an HTTPS URL.`);
  }
}

if (failures.length) {
  console.error(JSON.stringify({ valid: false, strict, batchFiles, lessonCount, capturedCount, heldForEvidenceCount, legacyPendingCount, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ valid: true, strict, batchFiles, lessonCount, capturedCount, heldForEvidenceCount, legacyPendingCount, pendingCount: legacyPendingCount, generatedSourceRecordCount: heldForEvidenceCount }));

import fs from 'node:fs';

const queue = JSON.parse(fs.readFileSync('scratch/deep_dive_generation_queue.json', 'utf8'));
const files = fs.readdirSync('scratch').filter((name) => name.startsWith('deep_dive_generated_batch_')).sort();
const topics = new Map(queue.map((topic) => [topic.topic_id, topic]));
const worklist = [];

for (const fileName of files) {
  const batch = JSON.parse(fs.readFileSync(`scratch/${fileName}`, 'utf8'));
  for (const lesson of batch.lessons ?? []) {
    const evidence = lesson.sections?.find((section) => section.id === 'case-resolution')?.evidence;
    if (evidence?.status !== 'source_record_generated') continue;
    const topic = topics.get(lesson.topicId) ?? {};
    worklist.push({
      topicId: lesson.topicId,
      canonicalName: lesson.canonicalName,
      batchId: batch.batchId,
      anchorDescription: topic.anchor_description ?? topic.research?.candidate_anchors?.[0]?.description ?? '',
      applicabilityCheck: topic.applicability_check ?? topic.research?.candidate_anchors?.[0]?.applicability_reason ?? '',
      anchorQuality: topic.research?.candidate_anchors?.[0]?.candidate_id?.endsWith(':catalog-readiness')
        ? 'needs_topic_specific_research'
        : 'topic_specific_anchor',
      governingQuestion: topic.governing_question_draft ?? topic.research?.governing_question_draft ?? '',
      source: {
        id: lesson.sourceHierarchy?.[0]?.id,
        title: lesson.sourceHierarchy?.[0]?.title,
        url: lesson.sourceHierarchy?.[0]?.url,
      },
      requiredCapture: 'Capture an exact primary document excerpt or field extract containing at least three real values used by the lesson. Record the document title, page or field, reporting date, unit, and direct source URL. Do not promote this lesson until the values are verified against the concept domain.',
      currentRecord: { status: evidence.status, rows: evidence.rows?.length ?? 0, image: evidence.image ?? null },
    });
  }
}

fs.writeFileSync('scratch/deep_dive_source_capture_worklist.json', `${JSON.stringify({ schemaVersion: 'deep-dive-source-capture-worklist.v1', lessonCount: worklist.length, lessons: worklist }, null, 2)}\n`);
console.log(JSON.stringify({ outputFile: 'scratch/deep_dive_source_capture_worklist.json', lessonCount: worklist.length }));

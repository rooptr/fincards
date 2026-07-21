import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildGenerationQueue, readinessStatus } from '../src/utils/deepDiveReadiness.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const topicsPath = path.join(root, 'src/data/deep_dive_topics.json');
const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
const includeModeling = !process.argv.includes('--standard-only');
const queue = buildGenerationQueue(topics, { includeModeling });
const statusCounts = topics.reduce((counts, topic) => {
  const status = readinessStatus(topic);
  counts[status] = (counts[status] ?? 0) + 1;
  return counts;
}, {});

const outputIndex = process.argv.indexOf('--out');
if (outputIndex !== -1 && process.argv[outputIndex + 1]) {
  const outputPath = path.resolve(root, process.argv[outputIndex + 1]);
  fs.writeFileSync(outputPath, `${JSON.stringify(queue, null, 2)}\n`);
  console.log(`Wrote ${queue.length} locked generation records to ${path.relative(root, outputPath)}.`);
} else {
  console.log(JSON.stringify(queue, null, 2));
}

console.error('Readiness:', JSON.stringify(statusCounts));
console.error('Queued:', queue.map((item) => `${item.topic_id} (${item.format})`).join(', ') || 'none');

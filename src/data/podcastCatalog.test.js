import assert from 'node:assert/strict';
import { PODCAST_COURSES, getPodcastQueue } from './podcastCatalog.js';

const securitisation = PODCAST_COURSES.find((course) => course.id === 'securitisation');
const accounting = PODCAST_COURSES.find((course) => course.id === 'accounting');

assert.ok(securitisation, 'Podcast library must include Securitisation');
assert.equal(securitisation.artwork, 'art.jpg');
assert.ok(getPodcastQueue('lessons', 'securitisation').length > 0, 'Securitisation must retain its playable lesson queue');

assert.ok(accounting, 'Podcast library must include Accounting');
assert.equal(accounting.artwork, 'acc.png');

console.log('Podcast catalog test passed.');

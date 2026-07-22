import assert from 'node:assert/strict';
import { PODCAST_COURSES, getPodcastQueue } from './podcastCatalog.js';

const securitisation = PODCAST_COURSES.find((course) => course.id === 'securitisation');
const accounting = PODCAST_COURSES.find((course) => course.id === 'accounting');

assert.ok(securitisation, 'Podcast library must include Securitisation');
assert.equal(securitisation.artwork, 'art.jpg');
assert.ok(getPodcastQueue('lessons', 'securitisation').length > 0, 'Securitisation must retain its playable lesson queue');
assert.equal(getPodcastQueue('episodes', 'securitisation').length, 13, 'Securitisation must expose all thirteen episode tracks.');
assert.equal(getPodcastQueue('episodes', 'securitisation').at(-1).manifestPath, 'audio/deep-dive/securitisation_masterclass/episode-13/manifest.json');
assert.equal(getPodcastQueue('lessons', 'securitisation').length, 51);
assert.deepEqual(getPodcastQueue('lessons', 'securitisation').map((track) => track.number), Array.from({ length: 51 }, (_, index) => index + 1));
assert.equal(getPodcastQueue('lessons', 'securitisation').at(-1).manifestPath, 'audio/deep-dive/generated_securitisation_static_managed_pools_triggers/manifest.json');

assert.ok(accounting, 'Podcast library must include Accounting');
assert.equal(accounting.artwork, 'acc.png');

console.log('Podcast catalog test passed.');

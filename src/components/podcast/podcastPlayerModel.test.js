import assert from 'node:assert/strict';
import { findAdjacentAvailableTrack, recordRecentlyPlayed } from './podcastPlayerModel.js';

const queue = [
  { id: 'one' },
  { id: 'two' },
  { id: 'three' },
  { id: 'four' },
];

const availability = {
  one: 'available',
  two: 'unavailable',
  three: 'available',
  four: 'unavailable',
};

assert.equal(findAdjacentAvailableTrack(queue, 'one', 1, availability)?.id, 'three');
assert.equal(findAdjacentAvailableTrack(queue, 'three', 1, availability)?.id, 'one');
assert.equal(findAdjacentAvailableTrack(queue, 'one', -1, availability)?.id, 'three');
assert.equal(findAdjacentAvailableTrack(queue, 'three', -1, availability)?.id, 'one');
assert.equal(findAdjacentAvailableTrack(queue, null, 1, availability)?.id, 'one');
assert.equal(findAdjacentAvailableTrack(queue, null, -1, availability)?.id, 'three');
assert.equal(findAdjacentAvailableTrack(queue, 'one', 1, { one: 'unavailable' }), null);
assert.equal(findAdjacentAvailableTrack([], 'one', 1, availability), null);
assert.deepEqual(queue.map(({ id }) => id), ['one', 'two', 'three', 'four']);

assert.deepEqual(
  recordRecentlyPlayed([{ id: 'two' }, { id: 'one' }], { id: 'one' }),
  [{ id: 'one' }, { id: 'two' }],
);
assert.deepEqual(
  recordRecentlyPlayed([{ id: 'one' }, { id: 'two' }], { id: 'three' }, 2),
  [{ id: 'three' }, { id: 'one' }],
);

console.log('Podcast player model test passed.');

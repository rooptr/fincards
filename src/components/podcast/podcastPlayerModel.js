function isAvailable(availability, trackId) {
  if (availability instanceof Map) return availability.get(trackId) === 'available';
  return availability?.[trackId] === 'available';
}

export function findAdjacentAvailableTrack(
  queue,
  currentId,
  direction = 1,
  availability = {},
) {
  if (!Array.isArray(queue) || queue.length === 0) return null;

  const stepDirection = direction < 0 ? -1 : 1;
  const currentIndex = queue.findIndex(({ id }) => id === currentId);
  const startIndex = currentIndex >= 0
    ? currentIndex
    : stepDirection > 0 ? -1 : 0;

  for (let step = 1; step <= queue.length; step += 1) {
    const index = (startIndex + (stepDirection * step) + queue.length) % queue.length;
    const candidate = queue[index];
    if (isAvailable(availability, candidate.id)) return candidate;
  }

  return null;
}

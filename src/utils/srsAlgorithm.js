/**
 * SM-2 Lite Algorithm
 * @param {string} rating - 'hard', 'good', or 'easy'
 * @param {object} previousStats - { interval, easeFactor, streak }
 * @returns {object} newStats - { interval, easeFactor, streak, nextDue }
 */
export function calculateNextReview(rating, previousStats = null) {
  // Default values for a new card
  let interval = 0; // days
  let easeFactor = 2.5;
  let streak = 0;

  if (previousStats) {
    interval = previousStats.interval || 0;
    easeFactor = previousStats.easeFactor || 2.5;
    streak = previousStats.streak || 0;
  }

  if (rating === 'hard') {
    streak = 0;
    interval = 1; // Show again tomorrow
    easeFactor = Math.max(1.3, easeFactor - 0.2); // Don't let ease go below 1.3
  } else if (rating === 'good') {
    streak += 1;
    if (streak === 1) interval = 1;
    else if (streak === 2) interval = 3;
    else interval = Math.round(interval * easeFactor);
  } else if (rating === 'easy') {
    streak += 1;
    if (streak === 1) interval = 4; // Show in 4 days if it was easy on first try
    else interval = Math.round(interval * easeFactor * 1.3); // Bonus multiplier for easy
    easeFactor += 0.15;
  }

  // Calculate next due date
  const nextDue = new Date();
  nextDue.setDate(nextDue.getDate() + interval);
  nextDue.setHours(0, 0, 0, 0); // Reset time to midnight so due cards are ready in the morning

  return {
    interval,
    easeFactor,
    streak,
    nextDue: nextDue.toISOString(),
  };
}

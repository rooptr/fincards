const DB_NAME = 'FinanceFlashcardsDB';
const STORE_NAME = 'progressStore';
const DB_VERSION = 1;

/**
 * Initializes and returns the IndexedDB instance wrapped in a Promise
 */
function getDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'cardId' });
      }
    };
  });
}

/**
 * Fetches progress data for a specific card
 * @param {string} cardId 
 * @returns {Promise<object|null>}
 */
export async function getCardProgress(cardId) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(cardId);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Fetches all progress data
 * @returns {Promise<Array>}
 */
export async function getAllProgress() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Updates or creates progress for a card
 * @param {string} cardId 
 * @param {object} stats - { interval, easeFactor, streak, nextDue }
 */
export async function saveCardProgress(cardId, stats) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ cardId, ...stats });

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves just the user note, merging with existing stats if present
 * @param {string} cardId 
 * @param {string} note 
 */
export async function saveUserNote(cardId, note) {
  const existingStats = await getCardProgress(cardId) || {};
  return saveCardProgress(cardId, { ...existingStats, note });
}

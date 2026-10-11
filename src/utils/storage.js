export function readJSON(key, fallback) {
  try {
    const item = window.localStorage.getItem(key);
    // Strict parsing fallback to prevent malformed data from crashing the app
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`[Nocturne] Error reading or parsing localStorage key "${key}":`, error);
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[Nocturne] Quota exceeded or error writing to localStorage key "${key}":`, error);
  }
}

export function removeJSON(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[Nocturne] Error removing localStorage key "${key}":`, error);
  }
}
export function readJSON(key, fallback, validator = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (validator && !validator(parsed)) {
      localStorage.removeItem(key);
      return fallback;
    }
    return parsed;
  } catch (err) {
    console.warn(`[Storage] Failed to read key "${key}":`, err);
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (err) {
    console.warn(`[Storage] Failed to write key "${key}":`, err);
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[Storage] Failed to remove key "${key}":`, err);
  }
}
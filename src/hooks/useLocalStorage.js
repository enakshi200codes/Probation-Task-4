import { useState, useEffect } from "react";
import { readJSON, writeJSON } from "../utils/storage";

export function useLocalStorage(key, defaultValue, validator = null) {
  const [value, setValue] = useState(() => {
    return readJSON(key, defaultValue, validator);
  });

  useEffect(() => {
    writeJSON(key, value);
  }, [key, value]);

  return [value, setValue];
}
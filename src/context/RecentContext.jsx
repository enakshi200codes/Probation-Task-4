import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS, RECENT_LIMIT } from "../config/constants";

const RecentContext = createContext(null);

export function RecentProvider({ children }) {
  const [recentIds, setRecentIds] = useLocalStorage(STORAGE_KEYS.RECENT, [], (val) => Array.isArray(val));

  const addRecent = useCallback((productId) => {
    if (!productId) return;
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, RECENT_LIMIT);
    });
  }, [setRecentIds]);

  return (
    <RecentContext.Provider value={{ recentIds, addRecent }}>
      {children}
    </RecentContext.Provider>
  );
}

export function useRecent() {
  const context = useContext(RecentContext);
  if (!context) {
    throw new Error("useRecent must be used within a RecentProvider");
  }
  return context;
}
import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../config/constants";
import { useToast } from "./ToastContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.WISHLIST, [], (val) => Array.isArray(val));
  const { showToast } = useToast();

  const toggleWishlist = useCallback((productId, productName) => {
    // Audit Fix: Side-effects (showToast) MUST sit outside state updaters to prevent StrictMode duplication.
    const isSaved = items.includes(productId);

    if (isSaved) {
      setItems((prev) => prev.filter((id) => id !== productId));
      showToast(`${productName} removed from wishlist`, { type: "info" });
    } else {
      setItems((prev) => {
        const filtered = prev.filter((id) => id !== productId);
        return [productId, ...filtered];
      });
      showToast(`${productName} saved to wishlist`, { type: "success" });
    }
  }, [items, setItems, showToast]);

  const isInWishlist = useCallback((productId) => {
    return items.includes(productId);
  }, [items]);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
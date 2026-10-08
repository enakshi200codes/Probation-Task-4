import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS, MAX_CART_QUANTITY } from "../config/constants";
import { isValidCartItems } from "../utils/validators";
import { clampQuantity } from "../utils/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.CART, [], isValidCartItems);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const addItem = useCallback((productId, quantity = 1) => {
    let resultStatus = "added";
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.productId === productId);
      const addQty = clampQuantity(quantity);

      if (existingIndex > -1) {
        const existing = prevItems[existingIndex];
        const newQty = existing.quantity + addQty;
        if (newQty > MAX_CART_QUANTITY) {
          resultStatus = "limit-reached";
          const updated = [...prevItems];
          updated[existingIndex] = { ...existing, quantity: MAX_CART_QUANTITY };
          return updated;
        } else {
          const updated = [...prevItems];
          updated[existingIndex] = { ...existing, quantity: newQty };
          return updated;
        }
      } else {
        const finalQty = Math.min(addQty, MAX_CART_QUANTITY);
        return [...prevItems, { productId, quantity: finalQty }];
      }
    });
    return { status: resultStatus };
  }, [setItems]);

  const removeItem = useCallback((productId) => {
    setItems((prevItems) => prevItems.filter((i) => i.productId !== productId));
  }, [setItems]);

  const increaseQuantity = useCallback((productId) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productId === productId) {
          const newQty = Math.min(item.quantity + 1, MAX_CART_QUANTITY);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  }, [setItems]);

  const decreaseQuantity = useCallback((productId) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productId === productId) {
          const newQty = Math.max(item.quantity - 1, 1);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  }, [setItems]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const value = useMemo(() => ({
    items,
    totalItems,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  }), [items, totalItems, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
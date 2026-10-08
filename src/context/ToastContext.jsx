import React, { createContext, useContext, useState, useCallback } from "react";
import { TOAST_DURATION_MS } from "../config/constants";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, { type = "success" } = {}) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      dismissToast(id);
    }, TOAST_DURATION_MS);
  }, [dismissToast]);

  const value = {
    toasts,
    showToast,
    dismissToast
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
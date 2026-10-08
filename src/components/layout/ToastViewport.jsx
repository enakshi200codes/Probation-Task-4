import React from "react";
import { useToast } from "../../context/ToastContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import styles from "./ToastViewport.module.css";

export default function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className={styles.viewport} role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = toast.type === "error" ? AlertCircle : toast.type === "info" ? Info : CheckCircle2;
        return (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
            <Icon size={18} className={styles.icon} />
            <span className={styles.message}>{toast.message}</span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className={styles.closeBtn}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
import React from "react";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";
import styles from "./ErrorState.module.css";

export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className={styles.errorState} role="alert">
      <AlertTriangle size={32} className={styles.icon} />
      <h2 className={styles.title}>{title}</h2>
      {message && <p className={styles.message}>{message}</p>}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
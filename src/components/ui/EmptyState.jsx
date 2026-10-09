import React from "react";
import Button from "./Button";
import styles from "./EmptyState.module.css";

export default function EmptyState({ eyebrow, title, message, actionLabel, actionTo, onAction, icon: Icon }) {
  return (
    <div className={styles.emptyState}>
      {Icon && <Icon size={32} className={styles.icon} />}
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {message && <p className={styles.message}>{message}</p>}
      
      {actionLabel && (
        <div className={styles.actionWrap}>
          {actionTo ? (
            <Button to={actionTo} variant="primary">{actionLabel}</Button>
          ) : (
            <Button onClick={onAction} variant="primary">{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  );
}
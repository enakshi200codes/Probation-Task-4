import React from "react";
import { Link } from "react-router-dom";
import styles from "./SectionHeading.module.css";

export default function SectionHeading({ eyebrow, title, actionLabel, actionTo }) {
  return (
    <div className={styles.header}>
      <div className={styles.titleGroup}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.title}>{title}</h2>
      </div>
      {actionLabel && actionTo && (
        <Link to={actionTo} className={styles.actionLink}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
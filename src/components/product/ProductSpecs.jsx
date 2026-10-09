import React from "react";
import styles from "./ProductSpecs.module.css";

export default function ProductSpecs({ specifications = [] }) {
  if (!specifications || specifications.length === 0) {
    return null;
  }

  return (
    <div className={styles.specsSection}>
      <h2 className={styles.title}>Specifications</h2>
      <dl className={styles.list}>
        {specifications.map((spec, index) => (
          <div key={index} className={styles.item}>
            <dt className={styles.label}>{spec.label}</dt>
            <dd className={styles.value}>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
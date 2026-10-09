import React from "react";
import styles from "./SelectField.module.css";

export default function SelectField({ id, label, value, onChange, options }) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <select id={id} value={value} onChange={onChange} className={styles.select}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
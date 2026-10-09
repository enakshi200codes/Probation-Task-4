import React from "react";
import styles from "./InputField.module.css";

export default function InputField({ 
  id, 
  label, 
  type = "text", 
  error, 
  required,
  ...props 
}) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
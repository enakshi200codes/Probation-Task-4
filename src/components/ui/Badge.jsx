import React from "react";
import styles from "./Badge.module.css";

export default function Badge({ variant = "tag", children }) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}
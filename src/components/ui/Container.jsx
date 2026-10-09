import React from "react";
import styles from "./Container.module.css";

export default function Container({ size = "content", children }) {
  return <div className={`${styles.container} ${styles[size]}`}>{children}</div>;
}
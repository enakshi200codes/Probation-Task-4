import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  to,
  children,
  className = "",
  disabled,
  ...props
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className
  ].filter(Boolean).join(" ");

  if (to && !disabled && !isLoading) {
    return (
      <Link to={to} className={classNames} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
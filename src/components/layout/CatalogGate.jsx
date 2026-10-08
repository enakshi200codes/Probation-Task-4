import React from "react";
import { useCatalog } from "../../context/CatalogContext";
import Skeleton from "../ui/Skeleton";
import ErrorState from "../ui/ErrorState";
import styles from "./CatalogGate.module.css";

export default function CatalogGate({ fallback, children }) {
  const { status, error, reload } = useCatalog();

  if (status === "loading") {
    if (fallback) return fallback;
    return (
      <div className={styles.loadingContainer}>
        <Skeleton width="100%" height="200px" radius="var(--radius-lg)" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <ErrorState
        title="Failed to load catalog"
        message={error || "An unexpected error occurred while fetching catalog data."}
        onRetry={reload}
      />
    );
  }

  return <>{children}</>;
}
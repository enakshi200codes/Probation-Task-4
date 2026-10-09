import React from "react";
import Skeleton from "../ui/Skeleton";
import styles from "./ProductCardSkeleton.module.css";

export default function ProductCardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <div className={styles.imageWrapper}>
        <Skeleton width="100%" height="100%" radius="var(--radius-md)" />
      </div>
      <div className={styles.content}>
        <Skeleton width="40%" height="12px" />
        <Skeleton width="80%" height="20px" />
        <Skeleton width="60%" height="20px" />
        <Skeleton width="50%" height="14px" />
        <div className={styles.bottom}>
          <Skeleton width="100%" height="44px" radius="var(--radius-md)" />
        </div>
      </div>
    </div>
  );
}
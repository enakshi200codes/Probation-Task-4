import React from "react";
import { Star } from "lucide-react";
import { formatRatingText } from "../../utils/format";
import styles from "./Rating.module.css";

export default function Rating({ value = 0, reviewCount = 0, size = 14 }) {
  const roundedValue = Math.round(value);
  const accessibleText = formatRatingText(value, reviewCount);

  return (
    <div className={styles.ratingContainer} aria-label={accessibleText} title={accessibleText}>
      <div className={styles.stars} aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= roundedValue ? styles.starFilled : styles.starEmpty}
            fill={star <= roundedValue ? "currentColor" : "none"}
          />
        ))}
      </div>
      <span className={styles.numericValue} aria-hidden="true">{value.toFixed(1)}</span>
      <span className={styles.reviewCount} aria-hidden="true">({reviewCount})</span>
    </div>
  );
}
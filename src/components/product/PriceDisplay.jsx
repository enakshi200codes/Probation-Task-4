import React from "react";
import { formatPrice } from "../../utils/format";
import { getDiscountPercent } from "../../utils/pricing";
import Badge from "../ui/Badge";
import styles from "./PriceDisplay.module.css";

export default function PriceDisplay({ price, originalPrice, size = "base" }) {
  const discount = originalPrice ? getDiscountPercent({ price, originalPrice }) : 0;
  const isDiscounted = discount > 0;

  return (
    <div className={`${styles.priceContainer} ${styles[size]}`}>
      <span className={styles.currentPrice}>{formatPrice(price)}</span>
      {isDiscounted && (
        <>
          <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
          <Badge variant="discount">-{discount}%</Badge>
        </>
      )}
    </div>
  );
}
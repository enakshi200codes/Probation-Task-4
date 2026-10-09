import React from "react";
import { formatPrice } from "../../utils/format";
import ProductImage from "../product/ProductImage";
import styles from "./OrderSummary.module.css";

export default function OrderSummary({ lines, totals }) {
  const { subtotal, shipping, savings, total } = totals;

  return (
    <div className={styles.summaryBox}>
      <h2 className={styles.title}>In your bag</h2>
      
      <div className={styles.lineItems}>
        {lines.map((line) => (
          <div key={line.productId} className={styles.item}>
            <div className={styles.imageWrap}>
              <ProductImage src={line.image} alt="" ratio="1/1" />
              <span className={styles.qtyBadge} aria-label={`Quantity: ${line.quantity}`}>
                {line.quantity}
              </span>
            </div>
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>{line.name}</span>
              <span className={styles.itemPrice}>{formatPrice(line.lineTotal)}</span>
            </div>
          </div>
        ))}
      </div>

      <dl className={styles.totals}>
        <div className={styles.row}>
          <dt className={styles.label}>Subtotal</dt>
          <dd className={styles.value}>{formatPrice(subtotal)}</dd>
        </div>

        {savings > 0 && (
          <div className={`${styles.row} ${styles.savingsRow}`}>
            <dt className={styles.label}>Savings</dt>
            <dd className={styles.value}>-{formatPrice(savings)}</dd>
          </div>
        )}

        <div className={styles.row}>
          <dt className={styles.label}>Shipping</dt>
          <dd className={styles.value}>
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </dd>
        </div>

        <div className={`${styles.row} ${styles.totalRow}`}>
          <dt className={styles.totalLabel}>Total</dt>
          <dd className={styles.totalValue}>{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
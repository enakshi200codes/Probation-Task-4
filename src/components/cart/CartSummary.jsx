import React from "react";
import Button from "../ui/Button";
import { formatPrice } from "../../utils/format";
import { FREE_SHIPPING_THRESHOLD } from "../../config/constants";
import styles from "./CartSummary.module.css";

export default function CartSummary({ totals }) {
  const { subtotal, shipping, savings, total } = totals;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className={styles.summaryBox}>
      <h2 className={styles.title}>Order Summary</h2>

      <div className={styles.shippingPromo}>
        {qualifiesForFreeShipping ? (
          <span className={styles.successText}>You've unlocked free shipping!</span>
        ) : (
          <span className={styles.promoText}>
            Add <strong className={styles.amountLeft}>{formatPrice(amountToFreeShipping)}</strong> more to unlock free shipping.
          </span>
        )}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
          />
        </div>
      </div>

      <dl className={styles.lineItems}>
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

      <Button to="/checkout" variant="primary" fullWidth size="lg">
        Proceed to Checkout
      </Button>
    </div>
  );
}
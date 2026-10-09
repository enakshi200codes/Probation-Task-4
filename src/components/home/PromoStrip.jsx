import React from "react";
import Button from "../ui/Button";
import styles from "./PromoStrip.module.css";

export default function PromoStrip({ promo }) {
  if (!promo) return null;

  return (
    <section className={styles.strip}>
      <div className={styles.content}>
        <div className={styles.textGroup}>
          <span className={styles.eyebrow}>{promo.eyebrow}</span>
          <h2 className={styles.title}>{promo.title}</h2>
          <p className={styles.body}>{promo.body}</p>
        </div>
        <div className={styles.actionGroup}>
          <Button to={promo.ctaTo} variant="primary">
            {promo.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import Button from "../ui/Button";
import styles from "./Hero.module.css";

export default function Hero({ promo }) {
  if (!promo) return null;

  return (
    <section className={styles.heroSection}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.glassPanel}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>{promo.eyebrow}</span>
          <h1 className={styles.title}>{promo.title}</h1>
          <p className={styles.body}>{promo.body}</p>
          <div className={styles.actions}>
            <Button to={promo.ctaTo} size="lg" variant="primary">
              {promo.ctaLabel}
            </Button>
            {promo.secondaryLabel && promo.secondaryTo && (
              <Button to={promo.secondaryTo} size="lg" variant="secondary">
                {promo.secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
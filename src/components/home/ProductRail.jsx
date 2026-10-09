import React from "react";
import SectionHeading from "../ui/SectionHeading";
import ProductGrid from "../product/ProductGrid";
import styles from "./ProductRail.module.css";

export default function ProductRail({ title, eyebrow, products = [], viewAllTo }) {
  if (!products.length) return null;

  return (
    <section className={styles.railSection}>
      <SectionHeading 
        title={title} 
        eyebrow={eyebrow} 
        actionLabel={viewAllTo ? "View all" : undefined}
        actionTo={viewAllTo} 
      />
      <ProductGrid products={products} variant="rail" />
    </section>
  );
}
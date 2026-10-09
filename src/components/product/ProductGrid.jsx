import React from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products = [], variant = "listing", isLoading = false, skeletonCount = 4 }) {
  if (isLoading) {
    return (
      <div className={`${styles.grid} ${styles[variant]}`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${styles[variant]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
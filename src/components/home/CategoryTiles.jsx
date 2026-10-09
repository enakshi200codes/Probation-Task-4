import React from "react";
import CategoryTile from "./CategoryTile";
import styles from "./CategoryTiles.module.css";

export default function CategoryTiles({ categories = [] }) {
  if (!categories.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {categories.map((category) => (
          <CategoryTile key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
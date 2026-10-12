import React from "react";
import { Link } from "react-router-dom";
import { Lamp, Speaker, Monitor, Sofa, Box } from "lucide-react";
import styles from "./CategoryRail.module.css";

const getCategoryIcon = (id) => {
  switch (id?.toLowerCase()) {
    case "lighting":
      return <Lamp size={24} strokeWidth={1.5} />;
    case "audio":
      return <Speaker size={24} strokeWidth={1.5} />;
    case "desk":
      return <Monitor size={24} strokeWidth={1.5} />;
    case "decor":
      return <Sofa size={24} strokeWidth={1.5} />;
    default:
      return <Box size={24} strokeWidth={1.5} />;
  }
};

export default function CategoryRail({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className={styles.wrapper} aria-labelledby="category-rail-title">
      <div className={styles.header}>
        <span className={styles.label}>Curated</span>
        <h2 id="category-rail-title" className={styles.title}>Shop by Category</h2>
      </div>
      
      <div className={styles.rail}>
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/products?category=${category.id}`} 
            className={styles.card}
          >
            <div className={styles.iconWrapper}>
              {getCategoryIcon(category.id)}
            </div>
            <span className={styles.name}>{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
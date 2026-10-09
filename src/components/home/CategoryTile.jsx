import React from "react";
import { Link } from "react-router-dom";
import { Lamp, Speaker, PenTool, Flame, Moon } from "lucide-react";
import styles from "./CategoryTile.module.css";

const ICON_MAP = {
  lighting: Lamp,
  audio: Speaker,
  desk: PenTool,
  fragrance: Flame,
  sleep: Moon
};

export default function CategoryTile({ category }) {
  const IconComponent = ICON_MAP[category.id] || Lamp;

  return (
    <Link to={`/products?category=${category.id}`} className={styles.tile}>
      <div className={styles.iconWrapper}>
        <IconComponent size={24} className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{category.name}</h3>
        <p className={styles.description}>{category.description}</p>
      </div>
    </Link>
  );
}
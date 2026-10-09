import React, { useState } from "react";
import ProductImage from "./ProductImage";
import styles from "./ProductGallery.module.css";

export default function ProductGallery({ images = [], altText = "Product image" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const safeImages = images && images.length > 0 ? images : [""];
  const mainImage = safeImages[selectedIndex] || safeImages[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <ProductImage src={mainImage} alt={`${altText} - Main View`} ratio="4/5" isPriority={true} />
      </div>

      {safeImages.length > 1 && (
        <div className={styles.thumbnailList} role="tablist" aria-label="Product image thumbnails">
          {safeImages.map((img, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={`${img}-${index}`}
                role="tab"
                aria-selected={isSelected}
                aria-label={`View image ${index + 1}`}
                className={`${styles.thumbnailBtn} ${isSelected ? styles.active : ""}`}
                onClick={() => setSelectedIndex(index)}
              >
                <ProductImage src={img} alt="" ratio="4/5" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
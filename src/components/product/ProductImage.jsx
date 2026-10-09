import React, { useState } from "react";
import { ImageOff } from "lucide-react";
import styles from "./ProductImage.module.css";

export default function ProductImage({ src, alt, ratio = "4/5", isPriority = false }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.imageContainer} style={{ aspectRatio: ratio }}>
      {!isLoaded && !hasError && <div className={styles.placeholder} />}
      {hasError ? (
        <div className={styles.errorFallback}>
          <ImageOff size={24} className={styles.errorIcon} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={isPriority ? "eager" : "lazy"}
          className={`${styles.image} ${isLoaded ? styles.loaded : ""}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
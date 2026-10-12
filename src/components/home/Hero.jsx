import React from "react";
import { Link } from "react-router-dom";
import { useCatalog } from "../../context/CatalogContext";
import { Plus } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const { products } = useCatalog();
  
  const primaryProduct = products.find(
    (p) => p.name.includes("Halo") || p.name.includes("Lamp") || p.name.includes("Light")
  ) || products[0];
  
  const secondaryProduct = products.find(
    (p) => p.id !== primaryProduct?.id && (p.name.includes("Bowl") || p.name.includes("Vase") || p.name.includes("Tray"))
  ) || products[1];

  return (
    <section className={styles.hero} aria-labelledby="hero-headline">
      <div className={styles.heroInner}>
        
        <div className={styles.content}>
          <h1 id="hero-headline" className={styles.headline}>
            The Metaphysics<br />of Beauty
          </h1>
          
          <div className={styles.editorialMeta}>
            <span className={styles.metaNumber}>02</span>
            <span className={styles.metaLabel}>N-LAB</span>
            <p className={styles.description}>
              We work with the expressiveness of the material in all its purity. Objects for slower evenings and softer light.
            </p>
          </div>

          <div className={styles.actions}>
            <Link to="/products" className={styles.discoverLink}>
              <Plus size={14} className={styles.plusIcon} /> discover
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.glow} aria-hidden="true"></div>
          {primaryProduct && (
            <img
              src={primaryProduct.images[0]}
              alt={primaryProduct.name}
              className={styles.primaryImage}
              loading="eager"
              fetchpriority="high"
            />
          )}
          {secondaryProduct && (
            <img
              src={secondaryProduct.images[0]}
              alt={secondaryProduct.name}
              className={styles.secondaryImage}
              loading="lazy"
            />
          )}
        </div>
        
      </div>
    </section>
  );
}
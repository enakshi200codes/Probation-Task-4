import React from "react";
import { useCatalog } from "../context/CatalogContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import CatalogGate from "../components/layout/CatalogGate";
import Container from "../components/ui/Container";
import Hero from "../components/home/Hero";
import CategoryRail from "../components/home/CategoryRail";
import ProductRail from "../components/home/ProductRail";
import styles from "./HomePage.module.css";

export default function HomePage() {
  useDocumentTitle("Nocturne — Objects for the evening");
  const { products, categories } = useCatalog();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const popularProducts = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  return (
    <CatalogGate>
      <div className={styles.pageWrapper}>
        <Hero />
        
        <Container size="wide">
          <div className={styles.page}>
            <div className={styles.section}>
              <CategoryRail categories={categories} />
            </div>

            {featuredProducts.length > 0 && (
              <div className={styles.section}>
                <ProductRail title="Featured Objects" products={featuredProducts} />
              </div>
            )}

            {popularProducts.length > 0 && (
              <div className={styles.section}>
                <ProductRail title="Popular Right Now" products={popularProducts} />
              </div>
            )}
          </div>
        </Container>
      </div>
    </CatalogGate>
  );
}
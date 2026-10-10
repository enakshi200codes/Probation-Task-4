import React from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCatalog } from "../context/CatalogContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { selectByIds } from "../utils/selectors";
import CatalogGate from "../components/layout/CatalogGate";
import Container from "../components/ui/Container";
import EmptyState from "../components/ui/EmptyState";
import ProductGrid from "../components/product/ProductGrid";
import styles from "./WishlistPage.module.css";

export default function WishlistPage() {
  useDocumentTitle("Wishlist — Nocturne");
  const { items } = useWishlist();
  const { products } = useCatalog();

  const savedProducts = selectByIds(items, products);

  return (
    <CatalogGate>
      <Container size="content">
        <div className={styles.page}>
          <div className={styles.header}>
            <h1 className={styles.title}>Your Wishlist</h1>
            <span className={styles.itemCount}>
              {savedProducts.length} {savedProducts.length === 1 ? "item" : "items"}
            </span>
          </div>

          {savedProducts.length === 0 ? (
            <div className={styles.emptyWrap}>
              <EmptyState
                icon={Heart}
                title="Your wishlist is empty"
                message="Save items you love to revisit them later."
                actionLabel="Explore the shop"
                actionTo="/products"
              />
            </div>
          ) : (
            <ProductGrid products={savedProducts} variant="listing" />
          )}
        </div>
      </Container>
    </CatalogGate>
  );
}
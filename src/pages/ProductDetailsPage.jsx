import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCatalog } from "../context/CatalogContext";
import { useRecent } from "../context/RecentContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { selectRelated, selectByIds } from "../utils/selectors";
import { RELATED_COUNT, RECENT_DISPLAY_COUNT } from "../config/constants";
import CatalogGate from "../components/layout/CatalogGate";
import Container from "../components/ui/Container";
import EmptyState from "../components/ui/EmptyState";
import ProductGallery from "../components/product/ProductGallery";
import ProductPurchasePanel from "../components/product/ProductPurchasePanel";
import ProductSpecs from "../components/product/ProductSpecs";
import ProductReviews from "../components/product/ProductReviews";
import ProductRail from "../components/home/ProductRail";
import { PackageX } from "lucide-react";
import styles from "./ProductDetailsPage.module.css";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const { getProductById, products } = useCatalog();
  const { addRecent, recentIds } = useRecent();
  
  const product = getProductById(productId);
  const relatedProducts = product ? selectRelated(product, products, RELATED_COUNT) : [];
  
  const recentProducts = selectByIds(
    recentIds.filter((id) => id !== productId), 
    products
  ).slice(0, RECENT_DISPLAY_COUNT);

  useDocumentTitle(product ? `${product.name} — Nocturne` : "Product Not Found");

  useEffect(() => {
    if (product) {
      addRecent(product.id);
    }
  }, [product, addRecent]);

  return (
    <CatalogGate>
      <Container size="content">
        {!product ? (
          <div className={styles.notFoundWrap}>
            <EmptyState
              icon={PackageX}
              eyebrow="Error 404"
              title="Object not found"
              message="The product you are looking for does not exist or has been removed from the catalog."
              actionLabel="Return to shop"
              actionTo="/products"
            />
          </div>
        ) : (
          <div className={styles.page}>
            <div className={styles.mainContent}>
              <div className={styles.galleryColumn}>
                <ProductGallery images={product.images} altText={product.name} />
              </div>
              <div className={styles.infoColumn}>
                <ProductPurchasePanel product={product} />
                <ProductSpecs specifications={product.specifications} />
                <ProductReviews productId={product.id} />
              </div>
            </div>

            {relatedProducts.length > 0 && (
              <div className={styles.relatedSection}>
                <ProductRail 
                  title="Similar Objects" 
                  products={relatedProducts} 
                  viewAllTo={`/products?category=${product.category}`} 
                />
              </div>
            )}
            
            {recentProducts.length > 0 && (
              <div className={styles.relatedSection}>
                <ProductRail 
                  title="Recently Viewed" 
                  products={recentProducts} 
                />
              </div>
            )}
          </div>
        )}
      </Container>
    </CatalogGate>
  );
}
import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useCatalog } from "../context/CatalogContext";
import CatalogGate from "../components/layout/CatalogGate";
import Hero from "../components/home/Hero";
import CategoryTiles from "../components/home/CategoryTiles";
import ProductRail from "../components/home/ProductRail";
import PromoStrip from "../components/home/PromoStrip";
import { selectFeatured, selectPopular } from "../utils/selectors";
import { HOME_RAIL_COUNT } from "../config/constants";

export default function HomePage() {
  useDocumentTitle("Objects for the evening");
  
  const { products, categories, promos } = useCatalog();

  const featuredProducts = selectFeatured(products, HOME_RAIL_COUNT);
  const featuredIds = featuredProducts.map(p => p.id);
  const popularProducts = selectPopular(products, featuredIds, HOME_RAIL_COUNT);

  return (
    <CatalogGate>
      <div className="home-container">
        <Hero promo={promos?.hero} />
        <CategoryTiles categories={categories} />
        
        <ProductRail 
          title="Featured Objects" 
          eyebrow="Curated" 
          products={featuredProducts} 
          viewAllTo="/products?sort=featured" 
        />
        
        <PromoStrip promo={promos?.strip} />
        
        <ProductRail 
          title="Popular Right Now" 
          eyebrow="Trending" 
          products={popularProducts} 
          viewAllTo="/products" 
        />
      </div>
    </CatalogGate>
  );
}
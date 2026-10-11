import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loadCatalog } from "../services/catalogService";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../config/constants";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [seedReviews, setSeedReviews] = useState([]);
  const [promos, setPromos] = useState({});
  
  const [localReviews, setLocalReviews] = useLocalStorage(STORAGE_KEYS.REVIEWS, []);

  const fetchCatalog = useCallback(() => {
    setStatus("loading");
    setError(null);
    let isCancelled = false;

    loadCatalog()
      .then((data) => {
        if (!isCancelled) {
          setProducts(data.products || []);
          setCategories(data.categories || []);
          setSeedReviews(data.reviews || []);
          setPromos(data.promos || {});
          setStatus("ready");
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err.message || "Failed to load catalog");
          setStatus("error");
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const cancel = fetchCatalog();
    return cancel;
  }, [fetchCatalog]);

  const getProductById = useCallback(
    (id) => {
      return products.find((p) => p.id === id) || null;
    },
    [products]
  );

  const getReviewsForProduct = useCallback(
    (id) => {
      const combined = [...seedReviews, ...localReviews];
      return combined
        .filter((r) => r.productId === id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    [seedReviews, localReviews]
  );

  const addReview = useCallback(
    (review) => {
      const newReview = {
        ...review,
        id: `rev-local-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setLocalReviews((prev) => [newReview, ...prev]);
    },
    [setLocalReviews]
  );

  const value = {
    status,
    error,
    products,
    categories,
    promos,
    reload: fetchCatalog,
    getProductById,
    getReviewsForProduct,
    addReview
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
}
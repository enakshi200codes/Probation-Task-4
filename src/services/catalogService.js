import { products } from "../data/products";
import { categories } from "../data/categories";
import { reviews } from "../data/reviews";
import { promos } from "../data/promos";
import { CATALOG_LATENCY_MS, SIMULATE_CATALOG_ERROR } from "../config/constants";

export async function loadCatalog() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_CATALOG_ERROR) {
        reject(new Error("Failed to load catalog data from server."));
      } else {
        resolve({
          products,
          categories,
          reviews,
          promos
        });
      }
    }, CATALOG_LATENCY_MS);
  });
}
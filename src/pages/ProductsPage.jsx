import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function ProductsPage() {
  useDocumentTitle("Shop");

  return (
    <div>
      <h1>Shop Catalog</h1>
      <p>Browse our curated evening collection.</p>
    </div>
  );
}
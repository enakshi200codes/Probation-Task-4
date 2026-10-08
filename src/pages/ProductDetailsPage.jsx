import React from "react";
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  useDocumentTitle("Product Details");

  return (
    <div>
      <h1>Product Details</h1>
      <p>Viewing product ID: {productId}</p>
    </div>
  );
}
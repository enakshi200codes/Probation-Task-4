import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function CartPage() {
  useDocumentTitle("Your Cart");

  return (
    <div>
      <h1>Your Cart</h1>
      <p>Your shopping cart is currently empty.</p>
    </div>
  );
}
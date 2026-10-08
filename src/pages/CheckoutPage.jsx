import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function CheckoutPage() {
  useDocumentTitle("Checkout");

  return (
    <div>
      <h1>Checkout</h1>
      <p>Complete your mock order.</p>
    </div>
  );
}
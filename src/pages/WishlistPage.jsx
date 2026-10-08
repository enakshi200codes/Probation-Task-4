import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function WishlistPage() {
  useDocumentTitle("Your Wishlist");

  return (
    <div>
      <h1>Your Wishlist</h1>
      <p>Saved evening items will appear here.</p>
    </div>
  );
}
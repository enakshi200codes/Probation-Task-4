import React from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import styles from "./WishlistButton.module.css";

export default function WishlistButton({ productId, productName, variant = "card" }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const saved = isInWishlist(productId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId, productName);
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${saved ? styles.saved : ""}`}
      onClick={handleClick}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      aria-pressed={saved}
    >
      <Heart size={20} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
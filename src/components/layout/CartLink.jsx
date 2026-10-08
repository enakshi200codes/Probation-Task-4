import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import styles from "./CartLink.module.css";

export default function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className={styles.cartLink} aria-label={`Cart, ${totalItems} items`}>
      <ShoppingBag size={20} />
      {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
    </Link>
  );
}
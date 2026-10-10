import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import PriceDisplay from "./PriceDisplay";
import Rating from "../ui/Rating";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import styles from "./ProductPurchasePanel.module.css";

export default function ProductPurchasePanel({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));
  const handleIncrease = () => setQuantity((prev) => Math.min(prev + 1, 10));

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.category}>{product.category}</span>
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.ratingWrap}>
          <Rating value={product.rating} reviewCount={product.reviewCount} size={16} />
        </div>
      </div>

      <div className={styles.priceWrap}>
        <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="large" />
      </div>

      <p className={styles.description}>{product.description}</p>

      <div className={styles.controls}>
        <div className={styles.quantityRow}>
          <span className={styles.qtyLabel} id="qty-label">Quantity</span>
          <div className={styles.qtyControls} aria-labelledby="qty-label">
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className={styles.qtyValue} aria-live="polite">{quantity}</span>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={handleIncrease}
              disabled={quantity >= 10}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.addBtnWrapper}>
            <AddToCartButton 
              productId={product.id} 
              productName={product.name} 
              quantity={quantity} 
              variant="primary" 
              fullWidth={true} 
            />
          </div>
          <WishlistButton productId={product.id} productName={product.name} variant="panel" />
        </div>
      </div>
    </div>
  );
}
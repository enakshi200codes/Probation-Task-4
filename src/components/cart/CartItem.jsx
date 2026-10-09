import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import ProductImage from "../product/ProductImage";
import Badge from "../ui/Badge";
import styles from "./CartItem.module.css";

export default function CartItem({ line }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const { productId, name, image, unitPrice, originalUnitPrice, quantity, lineTotal } = line;

  const isDiscounted = originalUnitPrice && originalUnitPrice > unitPrice;

  return (
    <div className={styles.cartItem}>
      <Link to={`/products/${productId}`} className={styles.imageLink} aria-hidden="true" tabIndex={-1}>
        <ProductImage src={image} alt="" ratio="1/1" />
      </Link>

      <div className={styles.details}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>
            <Link to={`/products/${productId}`} className={styles.nameLink}>
              {name}
            </Link>
          </h3>
          <button
            type="button"
            onClick={() => removeItem(productId)}
            className={styles.removeBtn}
            aria-label={`Remove ${name} from cart`}
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.unitPrice}>{formatPrice(unitPrice)}</span>
          {isDiscounted && (
            <span className={styles.originalPrice}>{formatPrice(originalUnitPrice)}</span>
          )}
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.qtyControls}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => decreaseQuantity(productId)}
              disabled={quantity <= 1}
              aria-label={`Decrease quantity of ${name}`}
            >
              <Minus size={14} />
            </button>
            <span className={styles.qtyValue} aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => increaseQuantity(productId)}
              disabled={quantity >= 10}
              aria-label={`Increase quantity of ${name}`}
            >
              <Plus size={14} />
            </button>
          </div>
          <span className={styles.lineTotal}>{formatPrice(lineTotal)}</span>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import PriceDisplay from "./PriceDisplay";
import Rating from "../ui/Rating";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { id, name, category, price, originalPrice, rating, reviewCount, images } = product;

  return (
    <article className={styles.card}>
      <WishlistButton productId={id} productName={name} variant="card" />
      
      <Link to={`/products/${id}`} className={styles.imageLink} aria-hidden="true" tabIndex={-1}>
        <ProductImage src={images[0]} alt="" ratio="4/5" />
      </Link>
      
      <div className={styles.content}>
        <div className={styles.metadata}>
          <span className={styles.categoryLabel}>{category}</span>
        </div>
        
        <h3 className={styles.name}>
          <Link to={`/products/${id}`} className={styles.nameLink}>
            {name}
          </Link>
        </h3>
        
        <div className={styles.ratingWrapper}>
          <Rating value={rating} reviewCount={reviewCount} />
        </div>
        
        <div className={styles.priceWrapper}>
          <PriceDisplay price={price} originalPrice={originalPrice} />
        </div>
        
        <div className={styles.actionWrapper}>
          <AddToCartButton productId={id} productName={name} />
        </div>
      </div>
    </article>
  );
}
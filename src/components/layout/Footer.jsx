import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <span className={styles.brand}>Nocturne<span className={styles.dot}>.</span></span>
          <p className={styles.tagline}>Objects for the evening.</p>
        </div>
        <div className={styles.col}>
          <h3 className={styles.heading}>Shop</h3>
          <ul className={styles.list}>
            <li><Link to="/products?category=lighting">Lighting</Link></li>
            <li><Link to="/products?category=audio">Audio</Link></li>
            <li><Link to="/products?category=desk">Desk</Link></li>
            <li><Link to="/products?category=fragrance">Fragrance</Link></li>
            <li><Link to="/products?category=sleep">Sleep</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h3 className={styles.heading}>Customer</h3>
          <ul className={styles.list}>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/login">Account</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Nocturne. All rights reserved.</p>
      </div>
    </footer>
  );
}
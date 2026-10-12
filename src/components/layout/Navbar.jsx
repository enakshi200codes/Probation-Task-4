import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, User, ShoppingBag, Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import { useCart } from "../../context/CartContext";
import styles from "./Navbar.module.css";
import icon from "../../assets/icon.png";

export default function Navbar() {
  const { itemCount } = useCart();
  
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        
        <div className={styles.leftGroup}>
          <Link to="/" className={styles.logo}>
            <img src={icon} alt="Nocturne" className={styles.logoIcon} />
            Nocturne<span className={styles.logoDot}>.</span>
          </Link>
        </div>

        <nav className={styles.centerGroup}>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Shop
          </NavLink>
        </nav>

        <div className={styles.rightGroup}>
          <div className={styles.searchWrapper}>
            <SearchBar />
          </div>
          <Link to="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/account" className={styles.iconBtn} aria-label="Account">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </Link>
          
          <button className={styles.mobileMenuBtn} aria-label="Menu">
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
        
      </div>
    </header>
  );
}
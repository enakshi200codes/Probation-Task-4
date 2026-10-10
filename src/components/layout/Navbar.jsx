import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Menu, Heart, User, ShoppingBag } from "lucide-react";
import SearchBar from "./SearchBar";
import CartLink from "./CartLink";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header className={styles.header}>
      <div className={styles.navInner}>
        <div className={styles.leftGroup}>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className={styles.brand}>
            Nocturne<span className={styles.brandDot}>.</span>
          </Link>
        </div>

        <nav className={styles.desktopNav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Shop
          </NavLink>
        </nav>

        <div className={styles.rightGroup}>
          <div className={styles.desktopSearch}>
            <SearchBar />
          </div>
          <button
            type="button"
            className={styles.searchToggle}
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>
          <Link to="/wishlist" className={styles.iconLink} aria-label="Wishlist">
            <Heart size={20} />
          </Link>
          <Link to={isAuthenticated ? "/account" : "/login"} className={styles.iconLink} aria-label="Account">
            <User size={20} />
          </Link>
          <CartLink />
        </div>
      </div>

      {isSearchOpen && (
        <div className={styles.mobileSearchRow}>
          <SearchBar onSearched={() => setIsSearchOpen(false)} />
        </div>
      )}

      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </header>
  );
}
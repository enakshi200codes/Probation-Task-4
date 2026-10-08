import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import styles from "./MobileMenu.module.css";

export default function MobileMenu({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Automatically close menu if resized to desktop viewport (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={styles.drawer}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Menu</h2>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>
      <nav className={styles.nav}>
        <Link to="/" onClick={onClose} className={styles.link}>
          Home
        </Link>
        <Link to="/products" onClick={onClose} className={styles.link}>
          Shop
        </Link>
        <Link to="/wishlist" onClick={onClose} className={styles.link}>
          Wishlist
        </Link>
        <Link to="/login" onClick={onClose} className={styles.link}>
          Log In / Account
        </Link>
      </nav>
    </dialog>
  );
}
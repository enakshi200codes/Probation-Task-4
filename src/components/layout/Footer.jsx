import React from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container size="wide">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              Nocturne<span className={styles.logoDot}>.</span>
            </Link>
            <p className={styles.tagline}>
              Objects for the evening. <br />
              Slower evenings, softer light.
            </p>
          </div>
          
          <div className={styles.linkGroup}>
            <h3 className={styles.heading}>Shop</h3>
            <Link to="/products?category=lighting" className={styles.link}>Lighting</Link>
            <Link to="/products?category=audio" className={styles.link}>Audio</Link>
            <Link to="/products?category=desk" className={styles.link}>Desk</Link>
            <Link to="/products" className={styles.link}>All Objects</Link>
          </div>

          <div className={styles.linkGroup}>
            <h3 className={styles.heading}>Support</h3>
            <Link to="#" className={styles.link}>Shipping & Returns</Link>
            <Link to="#" className={styles.link}>Care Guide</Link>
            <Link to="#" className={styles.link}>FAQ</Link>
            <Link to="#" className={styles.link}>Contact</Link>
          </div>

          <div className={styles.linkGroup}>
            <h3 className={styles.heading}>Legal</h3>
            <Link to="#" className={styles.link}>Privacy Policy</Link>
            <Link to="#" className={styles.link}>Terms of Service</Link>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Nocturne Design. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
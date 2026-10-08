import React from "react";
import { Outlet } from "react-router-dom";
import SkipLink from "./SkipLink";
import ScrollToTop from "./ScrollToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ToastViewport from "./ToastViewport";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <SkipLink />
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ToastViewport />
    </div>
  );
}
import React, { useMemo } from "react";
import { Navigate, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useCatalog } from "../context/CatalogContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { buildCartLines } from "../utils/cart";
import { calculateTotals } from "../utils/pricing";
import CatalogGate from "../components/layout/CatalogGate";
import Container from "../components/ui/Container";
import OrderSummary from "../components/checkout/OrderSummary";
import CheckoutForm from "../components/checkout/CheckoutForm";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  useDocumentTitle("Checkout — Nocturne");
  const { items, totalItems } = useCart();
  const { products } = useCatalog();

  const cartLines = useMemo(() => buildCartLines(items, products), [items, products]);
  const totals = useMemo(() => calculateTotals(cartLines), [cartLines]);

  // Barricade: Prevent users from checking out with an empty cart
  if (totalItems === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <CatalogGate>
      <Container size="content">
        <div className={styles.page}>
          <div className={styles.header}>
            <Link to="/cart" className={styles.backLink} aria-label="Return to cart">
              <ChevronLeft size={20} />
              Return to cart
            </Link>
            <h1 className={styles.title}>Checkout</h1>
          </div>

          <div className={styles.layout}>
            <div className={styles.formColumn}>
              <CheckoutForm />
            </div>
            <div className={styles.summaryColumn}>
              <OrderSummary lines={cartLines} totals={totals} />
            </div>
          </div>
        </div>
      </Container>
    </CatalogGate>
  );
}
import React, { useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useCatalog } from "../context/CatalogContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { buildCartLines } from "../utils/cart";
import { calculateTotals } from "../utils/pricing";
import CatalogGate from "../components/layout/CatalogGate";
import Container from "../components/ui/Container";
import EmptyState from "../components/ui/EmptyState";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import styles from "./CartPage.module.css";

export default function CartPage() {
  useDocumentTitle("Your Cart — Nocturne");
  const { items, totalItems } = useCart();
  const { products } = useCatalog();

  const cartLines = useMemo(() => buildCartLines(items, products), [items, products]);
  const totals = useMemo(() => calculateTotals(cartLines), [cartLines]);

  return (
    <CatalogGate>
      <Container size="content">
        <div className={styles.page}>
          <div className={styles.header}>
            <h1 className={styles.title}>Your Cart</h1>
            <span className={styles.itemCount}>
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>

          {cartLines.length === 0 ? (
            <div className={styles.emptyWrap}>
              <EmptyState
                icon={ShoppingBag}
                title="Your cart is empty"
                message="Discover objects designed to transition your space from day to night."
                actionLabel="Explore the shop"
                actionTo="/products"
              />
            </div>
          ) : (
            <div className={styles.layout}>
              <div className={styles.itemsColumn}>
                <div className={styles.itemsList}>
                  {cartLines.map((line) => (
                    <CartItem key={line.productId} line={line} />
                  ))}
                </div>
              </div>
              <div className={styles.summaryColumn}>
                <CartSummary totals={totals} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </CatalogGate>
  );
}
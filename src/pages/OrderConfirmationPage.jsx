import React, { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { CheckCircle2, Package } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { readJSON } from "../utils/storage";
import { STORAGE_KEYS } from "../config/constants";
import { formatPrice, formatDate } from "../utils/format";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import ProductImage from "../components/product/ProductImage";
import styles from "./OrderConfirmationPage.module.css";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  
  const order = useMemo(() => {
    const orders = readJSON(STORAGE_KEYS.ORDERS, []);
    return orders.find((o) => o.id === orderId);
  }, [orderId]);

  useDocumentTitle(order ? `Order ${order.id} Confirmed` : "Order Not Found");

  // Ruthless barricade: If they try to hit this route without a valid order ID, boot them.
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const { customer, lines, totals, createdAt } = order;

  return (
    <Container size="narrow">
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <CheckCircle2 size={48} className={styles.successIcon} />
          </div>
          <h1 className={styles.title}>Order Confirmed</h1>
          <p className={styles.subtitle}>
            Thank you, {customer.firstName}. Your order has been placed.
          </p>
        </div>

        <div className={styles.orderCard}>
          <div className={styles.cardHeader}>
            <div className={styles.metaGroup}>
              <span className={styles.metaLabel}>Order Number</span>
              <span className={styles.metaValue}>{order.id}</span>
            </div>
            <div className={styles.metaGroup}>
              <span className={styles.metaLabel}>Date</span>
              <span className={styles.metaValue}>{formatDate(createdAt)}</span>
            </div>
          </div>

          <div className={styles.cardSection}>
            <h3 className={styles.sectionTitle}>Items</h3>
            <div className={styles.lineItems}>
              {lines.map((line) => (
                <div key={line.productId} className={styles.item}>
                  <div className={styles.imageWrap}>
                    <ProductImage src={line.image} alt="" ratio="1/1" />
                    <span className={styles.qtyBadge} aria-label={`Quantity: ${line.quantity}`}>
                      {line.quantity}
                    </span>
                  </div>
                  <div className={styles.itemDetails}>
                    <Link to={`/products/${line.productId}`} className={styles.itemName}>
                      {line.name}
                    </Link>
                    <span className={styles.itemPrice}>{formatPrice(line.lineTotal)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cardSection}>
            <div className={styles.splitGrid}>
              <div>
                <h3 className={styles.sectionTitle}>Delivery</h3>
                <address className={styles.address}>
                  {customer.firstName} {customer.lastName}<br />
                  {customer.address}<br />
                  {customer.city}, {customer.zipCode}<br />
                  {customer.email}
                </address>
              </div>
              
              <div>
                <h3 className={styles.sectionTitle}>Summary</h3>
                <dl className={styles.totals}>
                  <div className={styles.row}>
                    <dt className={styles.label}>Subtotal</dt>
                    <dd className={styles.value}>{formatPrice(totals.subtotal)}</dd>
                  </div>
                  {totals.savings > 0 && (
                    <div className={`${styles.row} ${styles.savingsRow}`}>
                      <dt className={styles.label}>Savings</dt>
                      <dd className={styles.value}>-{formatPrice(totals.savings)}</dd>
                    </div>
                  )}
                  <div className={styles.row}>
                    <dt className={styles.label}>Shipping</dt>
                    <dd className={styles.value}>
                      {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
                    </dd>
                  </div>
                  <div className={`${styles.row} ${styles.totalRow}`}>
                    <dt className={styles.totalLabel}>Total</dt>
                    <dd className={styles.totalValue}>{formatPrice(totals.total)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button to="/products" variant="primary" size="lg" fullWidth>
            Continue Shopping
          </Button>
        </div>
      </div>
    </Container>
  );
}
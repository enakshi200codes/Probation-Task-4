import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { LogOut, User, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../config/constants";
import { formatDate, formatPrice } from "../utils/format";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import styles from "./AccountPage.module.css";

export default function AccountPage() {
  useDocumentTitle("Account — Nocturne");
  const { user, isAuthenticated, logout } = useAuth();

  const [allOrders] = useLocalStorage(STORAGE_KEYS.ORDERS, []);

  const userOrders = useMemo(() => {
    if (!user) return [];
    return allOrders.filter(
      (order) => 
        order.userId === user.id || 
        (order.customer && order.customer.email.toLowerCase() === user.email.toLowerCase())
    );
  }, [allOrders, user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container size="content">
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Account Overview</h1>
          <Button variant="ghost" onClick={logout} className={styles.logoutBtn}>
            <LogOut size={18} />
            Log Out
          </Button>
        </div>

        <div className={styles.layout}>
          <div className={styles.profileCard}>
            <div className={styles.avatar}>
              <User size={32} />
            </div>
            <div className={styles.details}>
              <h2 className={styles.name}>{user.firstName} {user.lastName}</h2>
              <span className={styles.email}>{user.email}</span>
            </div>
          </div>

          <div className={styles.content}>
            <h3 className={styles.sectionTitle}>Order History</h3>
            
            {userOrders.length === 0 ? (
              <EmptyState
                icon={Package}
                eyebrow="Order History"
                title="No recent orders"
                message="When you place orders, they will appear here."
                actionLabel="Return to shop"
                actionTo="/products"
              />
            ) : (
              <div className={styles.orderList}>
                {userOrders.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderMeta}>
                        <span className={styles.orderId}>{order.id}</span>
                        <span className={styles.orderDate}>{formatDate(order.createdAt)}</span>
                      </div>
                      <span className={styles.orderStatus}>Processing</span>
                    </div>
                    
                    <div className={styles.orderItems}>
                      {order.lines.map((line) => (
                        <div key={line.productId} className={styles.itemRow}>
                          <span className={styles.itemName}>{line.name}</span>
                          <span className={styles.itemQty}>x{line.quantity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={styles.orderFooter}>
                      <span className={styles.orderTotalLabel}>Total:</span>
                      <span className={styles.orderTotalValue}>{formatPrice(order.totals.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
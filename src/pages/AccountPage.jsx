import React from "react";
import { Navigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import styles from "./AccountPage.module.css";

export default function AccountPage() {
  useDocumentTitle("Account — Nocturne");
  const { user, isAuthenticated, logout } = useAuth();

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
            <EmptyState
              eyebrow="Order History"
              title="No recent orders"
              message="Your mock order history will appear here in future updates."
              actionLabel="Return to shop"
              actionTo="/products"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
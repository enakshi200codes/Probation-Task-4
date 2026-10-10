import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Container from "../components/ui/Container";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import styles from "./Auth.module.css";

export default function RegisterPage() {
  useDocumentTitle("Register — Nocturne");
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required.";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      const success = register(formData.firstName, formData.lastName, formData.email, formData.password);
      if (success) navigate("/account");
    }, 400);
  };

  return (
    <Container size="narrow">
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join Nocturne to track orders and save your wishlist.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.grid}>
            <InputField
              id="firstName"
              name="firstName"
              label="First name"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            <InputField
              id="lastName"
              name="lastName"
              label="Last name"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
          </div>
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <div className={styles.actions}>
            <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
              Create Account
            </Button>
          </div>
        </form>

        <div className={styles.footer}>
          <span className={styles.footerText}>Already have an account?</span>
          <Link to="/login" className={styles.footerLink}>Log in</Link>
        </div>
      </div>
    </Container>
  );
}
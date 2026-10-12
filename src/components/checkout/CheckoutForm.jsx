import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { PLACE_ORDER_DELAY_MS, STORAGE_KEYS } from "../../config/constants";
import { writeJSON, readJSON } from "../../utils/storage";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import styles from "./CheckoutForm.module.css";

export default function CheckoutForm({ cartLines, totals, onOrderSuccess }) {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { showToast } = useToast();
  const { user } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "expiry" && value.length === 2 && formData.expiry.length === 1 && !value.includes("/")) {
      value = value + "/";
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email address.";
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    
    const zipClean = formData.zipCode.trim();
    if (!/^\d{6}$/.test(zipClean)) {
      newErrors.zipCode = "Enter exactly a 6-digit PIN code.";
    }

    const cleanCard = formData.cardNumber.replace(/\s/g, "");
    if (!/^\d{15,19}$/.test(cleanCard)) {
      newErrors.cardNumber = "Enter a valid 15-19 digit card number.";
    }

    const expiryClean = formData.expiry.trim();
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryClean)) {
      newErrors.expiry = "Use MM/YY format (e.g., 12/26).";
    } else {
      const [mm, yy] = expiryClean.split("/");
      const month = parseInt(mm, 10);
      const year = parseInt(`20${yy}`, 10);
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = "This card has expired.";
      }
    }
    if (!/^\d{3,4}$/.test(formData.cvc.trim())) {
      newErrors.cvc = "Enter a valid 3 or 4-digit CVC.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the errors in the form.", { type: "error" });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      const newOrder = {
        id: orderId,
        userId: user ? user.id : null,
        createdAt: new Date().toISOString(),
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        },
        lines: cartLines,
        totals: totals
      };

      const existingOrders = readJSON(STORAGE_KEYS.ORDERS, []);
      writeJSON(STORAGE_KEYS.ORDERS, [newOrder, ...existingOrders]);

      if (onOrderSuccess) onOrderSuccess();

      setIsSubmitting(false);
      clearCart();
      
      showToast("Order placed successfully!", { type: "success" });
      navigate(`/order-confirmation/${orderId}`);
    }, PLACE_ORDER_DELAY_MS);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact</h2>
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
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Delivery</h2>
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
          id="address"
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          required
        />
        <div className={styles.grid}>
          <InputField
            id="city"
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            required
          />
          <InputField
            id="zipCode"
            name="zipCode"
            label="ZIP / PIN code"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            maxLength={6}
            required
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Payment (Simulated)</h2>
        <InputField
          id="cardNumber"
          name="cardNumber"
          label="Card number"
          placeholder="0000 0000 0000 0000"
          value={formData.cardNumber}
          onChange={handleChange}
          error={errors.cardNumber}
          maxLength={23}
          required
        />
        <div className={styles.grid}>
          <InputField
            id="expiry"
            name="expiry"
            label="Expiration date"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={handleChange}
            error={errors.expiry}
            maxLength={5}
            required
          />
          <InputField
            id="cvc"
            name="cvc"
            label="Security code"
            placeholder="CVC"
            type="password"
            value={formData.cvc}
            onChange={handleChange}
            error={errors.cvc}
            maxLength={4}
            required
          />
        </div>
      </section>

      <div className={styles.actions}>
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          fullWidth 
          isLoading={isSubmitting}
        >
          Pay now
        </Button>
      </div>
    </form>
  );
}
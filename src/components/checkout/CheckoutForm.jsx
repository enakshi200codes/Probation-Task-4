import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { PLACE_ORDER_DELAY_MS } from "../../config/constants";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import styles from "./CheckoutForm.module.css";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP Code is required.";
    
    // Naive mock validation for visual feedback
    if (formData.cardNumber.replace(/\D/g, "").length < 15) newErrors.cardNumber = "Enter a valid card number.";
    if (!formData.expiry.trim()) newErrors.expiry = "Required.";
    if (!formData.cvc.trim()) newErrors.cvc = "Required.";

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
    
    // Simulated network delay for placing the order
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      showToast("Order placed successfully! (Simulated)", { type: "success" });
      // Bounding Phase 7: Punting back to home since Phase 8 (Order Confirmation) isn't built yet
      navigate("/");
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
            label="ZIP code"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
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
          maxLength={19}
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
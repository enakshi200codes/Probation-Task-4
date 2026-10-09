import React from "react";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

export default function AddToCartButton({ productId, productName, quantity = 1, variant = "secondary", fullWidth = true }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAdd = () => {
    const { status } = addItem(productId, quantity);
    if (status === "limit-reached") {
      showToast(`Limit of 10 per item reached for ${productName}`, { type: "error" });
    } else {
      showToast(`${productName} added to cart`, { type: "success" });
    }
  };

  return (
    <Button variant={variant} fullWidth={fullWidth} onClick={handleAdd}>
      Add to cart
    </Button>
  );
}
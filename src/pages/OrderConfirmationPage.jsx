import React from "react";
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  useDocumentTitle("Order Confirmed");

  return (
    <div>
      <h1>Order Confirmed</h1>
      <p>Order ID: {orderId}</p>
    </div>
  );
}
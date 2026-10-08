import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext";
import { CatalogProvider } from "./context/CatalogContext";
import { CartProvider } from "./context/CartContext";
import "./styles/tokens.css";
import "./styles/base.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <CatalogProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </CatalogProvider>
    </ToastProvider>
  </React.StrictMode>
);
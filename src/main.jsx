import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { CatalogProvider } from "./context/CatalogContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { RecentProvider } from "./context/RecentContext";
import "./styles/tokens.css";
import "./styles/base.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Clean provider tree prevents duplicated state or viewports */}
    <ToastProvider>
      <AuthProvider>
        <CatalogProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </RecentProvider>
            </WishlistProvider>
          </CartProvider>
        </CatalogProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
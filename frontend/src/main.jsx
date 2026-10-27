import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import "./styles/home.css";
import "./styles/products.css";
import "./styles/auth.css";
import "./styles/cart.css";
 import "./styles/categories.css";
import "./styles/orders.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
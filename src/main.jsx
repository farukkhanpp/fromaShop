import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./styles.css";

function Toasts() {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={1800}
      limit={3}
      newestOnTop
      closeOnClick
      pauseOnHover={false}
      theme={theme}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <App />
          <Toasts />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

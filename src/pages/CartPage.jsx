import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import EmptyCart from "../components/EmptyCart";
import CheckoutModal from "../components/CheckoutModal";
import { getShipping } from "../data/products";



export default function CartPage() {
  const {
    cart,
    increase,
    decrease,
    remove,
    clear,
    clearSilently,
    totalItems,
    subtotal,
  } = useCart();
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  return (
    <main className="cart-page section-shell">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> Back to shopping
      </Link>
      <div className="cart-page-heading">
        <div>
          <span className="eyebrow">YOUR SELECTION</span>
          <h1>
            Your shopping <em>bag.</em>
          </h1>
        </div>
        <span>
          {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}
        </span>
      </div>
      {!cart.length ? (
        <EmptyCart />
      ) : (
        <div className="cart-layout">
          <section className="cart-list">
            <div className="cart-list-top">
              <span>PRODUCT DETAILS</span>
              <span>ITEM TOTAL</span>
            </div>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increase={() => increase(item.id)}
                decrease={() => decrease(item.id)}
                remove={() => remove(item.id)}
              />
            ))}
          </section>
          <CartSummary
            totalItems={totalItems}
            subtotal={subtotal}
            onClear={clear}
            onContinue={() => navigate("/")}
            onCheckout={() => setCheckoutOpen(true)}
          />
        </div>
      )}
      {checkoutOpen && (
        <CheckoutModal
          total={subtotal + getShipping(subtotal)}
          onClose={() => setCheckoutOpen(false)}
          onPaid={clearSilently}
          onDone={() => {
            setCheckoutOpen(false);
            navigate("/");
          }}
        />
      )}
    </main>
  );
}

import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { formatPrice, getShipping, FREE_SHIPPING_MIN } from "../data/products";
export default function CartSummary({
  totalItems,
  subtotal,
  onClear,
  onContinue,
  onCheckout,
}) {
  const shipping = getShipping(subtotal);
  return (
    <aside className="summary-card">
      <div className="summary-title">
        <span className="eyebrow">Your order</span>
        <h2>Order summary</h2>
      </div>
      <div className="summary-line">
        <span>Items ({totalItems})</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="summary-line">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
      </div>
      {subtotal > 0 && subtotal < FREE_SHIPPING_MIN && (
        <p className="shipping-note">
          Add {formatPrice(FREE_SHIPPING_MIN - subtotal)} more for free
          shipping.
        </p>
      )}
      <div className="summary-line total">
        <span>Total</span>
        <strong>{formatPrice(subtotal + shipping)}</strong>
      </div>
      <p className="tax-note">Inclusive of applicable taxes.</p>
      <button
        className="checkout-button"
        onClick={onCheckout}
        disabled={!totalItems}
      >
        Continue to checkout <ArrowRight size={17} />
      </button>
      <button className="text-button" onClick={onContinue}>
        Continue shopping
      </button>
      <button className="clear-button" onClick={onClear} disabled={!totalItems}>
        Clear cart
      </button>
      <div className="trust-row">
        <span>
          <Truck size={15} /> Free shipping over ₹1,999
        </span>
        <span>
          <ShieldCheck size={15} /> Secure shopping
        </span>
      </div>
    </aside>
  );
}

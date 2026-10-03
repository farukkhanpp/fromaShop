import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Lock, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { formatPrice } from "../data/products";

const formatCard = (v) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Enter the name on the card";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
  if (f.card.replace(/\s/g, "").length !== 16)
    e.card = "Card number must be 16 digits";
  const m = f.expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!m || +m[1] < 1 || +m[1] > 12) e.expiry = "Use MM/YY";
  if (!/^\d{3,4}$/.test(f.cvv)) e.cvv = "3 or 4 digits";
  return e;
}

export default function CheckoutModal({ total, onPaid, onClose, onDone }) {
  const [step, setStep] = useState("form"); // form | processing | success
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState("");
  const [paid, setPaid] = useState(0);
  const timer = useRef();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && step !== "processing")
        step === "success" ? onDone() : onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(timer.current);
    };
  }, [step, onClose, onDone]);

  const set =
    (k, fmt = (v) => v) =>
    (e) => {
      setForm((f) => ({ ...f, [k]: fmt(e.target.value) }));
      setErrors((er) => ({ ...er, [k]: undefined }));
    };

  function submit(e) {
    e.preventDefault();
    const er = validate(form);
    setErrors(er);
    if (Object.keys(er).length) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    setStep("processing");
    timer.current = setTimeout(() => {
      setOrderId("FRM-" + Math.random().toString(36).slice(2, 8).toUpperCase());
      setPaid(total);
      onPaid();
      setStep("success");
      toast.success("Payment successful (demo)");
    }, 2200);
  }

  const field = (k, label, props = {}) => (
    <label className={errors[k] ? "co-field has-error" : "co-field"}>
      <span>{label}</span>
      <input
        value={form[k]}
        onChange={props.onChange || set(k)}
        disabled={step === "processing"}
        {...props.attrs}
      />
      {errors[k] && <small>{errors[k]}</small>}
    </label>
  );

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && step === "form") onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
      >
        {step !== "processing" && (
          <button
            className="modal-close"
            onClick={step === "success" ? onDone : onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}

        {step === "success" ? (
          <div className="co-center">
            <CheckCircle2 size={54} className="co-ok" />
            <span className="eyebrow">Order confirmed</span>
            <h2>Thank you!</h2>
            <p>
              Your demo payment of <b>{formatPrice(paid)}</b> went through.
              <br />
              Order ID: <b>{orderId}</b>
            </p>
            <button className="checkout-button" onClick={onDone}>
              Continue shopping
            </button>
          </div>
        ) : step === "processing" ? (
          <div className="co-center">
            <Loader2 size={44} className="spin" />
            <h2>Processing payment…</h2>
            <p>Please don't close this window.</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <span className="eyebrow">Secure checkout</span>
            <h2>Payment details</h2>
            <p className="demo-note">
              Demo only. No real payment is taken. Enter any values, for example
              card 4242 4242 4242 4242.
            </p>
            {field("name", "Name on card", {
              attrs: { autoComplete: "cc-name", placeholder: "Your name" },
            })}
            {field("email", "Email", {
              attrs: {
                type: "email",
                autoComplete: "email",
                placeholder: "you@example.com",
              },
            })}
            {field("card", "Card number", {
              onChange: set("card", formatCard),
              attrs: {
                inputMode: "numeric",
                autoComplete: "cc-number",
                placeholder: "4242 4242 4242 4242",
              },
            })}
            <div className="co-row">
              {field("expiry", "Expiry", {
                onChange: set("expiry", formatExpiry),
                attrs: { inputMode: "numeric", placeholder: "MM/YY" },
              })}
              {field("cvv", "CVV", {
                onChange: set("cvv", (v) => v.replace(/\D/g, "").slice(0, 4)),
                attrs: {
                  inputMode: "numeric",
                  placeholder: "123",
                  type: "password",
                },
              })}
            </div>
            <button className="checkout-button" type="submit">
              <Lock size={15} /> Pay {formatPrice(total)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { toast } from "react-toastify";

const CartContext = createContext(null);
const STORAGE_KEY = "forma-shopping-cart-v1";
function readCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}
function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const found = state.find((item) => item.id === action.product.id);
      return found
        ? state.map((item) =>
            item.id === found.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state, { ...action.product, quantity: 1 }];
    }
    case "INCREASE":
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    case "DECREASE":
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, undefined, readCart);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);
  const value = useMemo(() => {
    const find = (id) => cart.find((item) => item.id === id);
    return {
      cart,
      addToCart: (product) => {
        dispatch({ type: "ADD", product });
        toast.success(`${product.title} added to bag`);
      },
      increase: (id) => {
        const item = find(id);
        dispatch({ type: "INCREASE", id });
        if (item) toast.success(`Quantity increased to ${item.quantity + 1}`);
      },
      decrease: (id) => {
        const item = find(id);
        dispatch({ type: "DECREASE", id });
        if (!item) return;
        if (item.quantity <= 1) toast.info(`${item.title} removed from bag`);
        else toast.info(`Quantity decreased to ${item.quantity - 1}`);
      },
      remove: (id) => {
        const item = find(id);
        dispatch({ type: "REMOVE", id });
        if (item) toast.error(`${item.title} removed`);
      },
      clear: () => {
        dispatch({ type: "CLEAR" });
        toast.info("Bag cleared");
      },
      clearSilently: () => dispatch({ type: "CLEAR" }),
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  }, [cart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

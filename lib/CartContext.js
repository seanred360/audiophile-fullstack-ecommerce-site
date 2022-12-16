import { createContext, useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const CartContext = createContext();

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const createCheckOutSession = async () => {
  const stripe = await stripePromise;
  const checkoutSession = await axios.post("/api/create-stripe-session", {
    item: item,
  });
  const result = await stripe.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });
  if (result.error) {
    alert(result.error.message);
  }
};

export function useCart() {
  return useContext(CartContext);
}

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toggle, setToggle] = useState(false);

  const getProductQuantity = (itemId) => {
    const quantity = cart.find((item) => item.product._id === itemId)?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };

  const getCartTotal = () => {
    let totalPrice = 0;
    cart.forEach((item) => (totalPrice += item.product.price * item.quantity));
    console.log(totalPrice);
    return totalPrice;
  };

  const handleDeleteCart = () => {
    setCart([]);
  };

  const handleAddToCart = (product, desiredQuantity) => {
    const currentQuantity = getProductQuantity(product._id);

    if (currentQuantity === 0) {
      setCart([...cart, { product, quantity: desiredQuantity }]);
    } else {
      setCart(
        cart.map(
          (item) =>
            item.product._id === product._id // if condition
              ? {
                  product: item.product,
                  quantity: (item.quantity = desiredQuantity),
                } // if statement is true
              : item // if statement is false
        )
      );
    }

    if (!toggle) {
      window.scrollTo(0, 0);
      handleToggleModal();
    }
  };

  const handleToggleModal = () => {
    setToggle(!toggle);
    document.body.classList.toggle("no-scroll");
  };

  const value = {
    cart,
    toggle,
    getCartTotal,
    handleDeleteCart,
    handleAddToCart,
    handleToggleModal,
    createCheckOutSession,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

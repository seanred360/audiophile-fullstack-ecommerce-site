import { useState } from "react";
import { useCart } from "../lib/CartContext";

const ModalCartQuantityButton = ({ product, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { handleAddToCart } = useCart();

  const handleDecrimentQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(--quantity);
    handleAddToCart(product, quantity);
  };

  const handleAddQuantity = () => {
    setQuantity(++quantity);
    handleAddToCart(product, quantity);
  };

  return (
    <div className="w-[96px] h-[32px] flex justify-center items-center">
      <button
        className="h-full px-[12px] py-[4px] text-[13px] bg-[#f1f1f1]"
        onClick={handleDecrimentQuantity}
        disabled={quantity <= 1}
      >
        -
      </button>
      <p className="w-[76px] h-full py-[4px] text-[13px] bg-[#f1f1f1]">
        {quantity}
      </p>
      <button
        className="h-full px-[12px] py-[4px] text-[13px] bg-[#f1f1f1]"
        onClick={handleAddQuantity}
      >
        +
      </button>
    </div>
  );
};

export default ModalCartQuantityButton;

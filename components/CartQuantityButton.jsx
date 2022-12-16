const CartQuantityButton = ({ quantity, setQuantity }) => {
  const handleDecrimentQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(--quantity);
  };

  const handleAddQuantity = () => {
    setQuantity(++quantity);
  };

  return (
    <div className="w-[120px] h-[48px] flex justify-center items-center">
      <button
        className="w-[48px] h-full bg-[#f1f1f1]"
        onClick={handleDecrimentQuantity}
        disabled={quantity <= 1}
      >
        -
      </button>
      <p className="w-[48px] h-full py-[14px] bg-[#f1f1f1]">{quantity}</p>
      <button
        className="w-[48px] h-full bg-[#f1f1f1]"
        onClick={handleAddQuantity}
      >
        +
      </button>
    </div>
  );
};

export default CartQuantityButton;

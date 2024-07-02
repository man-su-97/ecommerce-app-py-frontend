import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { FaTrash } from "react-icons/fa";
import { transformImage } from "../utils/features";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItemCard = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="flex items-center justify-start gap-12 py-4">
      <img
        src={transformImage(photo, 400)}
        alt={name}
        className="w-40 h-40 object-contain"
      />
      <article className="flex flex-col justify-start gap-2">
        <Link
          to={`/product/${productId}`}
          className="text-lg font-semibold text-gray-800 hover:text-blue-500"
        >
          {name}
        </Link>
        <span className="text-xl font-bold text-gray-700">₹{price}</span>
      </article>

      <div className="flex items-center justify-start gap-4 ml-auto">
        <button
          onClick={() => decrementHandler(cartItem)}
          className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          -
        </button>
        <p className="text-xl font-bold">{quantity}</p>
        <button
          onClick={() => incrementHandler(cartItem)}
          className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeHandler(productId)}
        className="text-red-500 hover:text-red-600"
      >
        <FaTrash className="text-xl" />
      </button>
    </div>
  );
};

export default CartItemCard;

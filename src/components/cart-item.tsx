import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { PiMinusThin } from "react-icons/pi";

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
    <div className="flex items-start justify-start gap-5 py-4 border-b">
      <img
        src={transformImage(photo, 400)}
        alt={name}
        className="w-24 md:w-28 h-24 md:h-28 object-contain"
      />
      <div className="flex flex-col md:flex-row gap-2 ">
        <article className="flex flex-col justify-start gap-2">
          <Link
            to={`/product/${productId}`}
            className="text-xs font-normal text-black hover:text-blue-500"
          >
            {name}
          </Link>
          <span className="text-sm font-normal text-black">₹{price}</span>
        </article>

        <div className="block sm:hideen flex ml-0 md:ml-2 w-16 h-8 items-center gap-3  ml-left border">
          <button
            onClick={() => decrementHandler(cartItem)}
            className="text-black hover:bg-gray-300"
          >
            <PiMinusThin />
          </button>
          <p className="text-xs font-normal">{quantity}</p>
          <button
            onClick={() => incrementHandler(cartItem)}
            className=" text-black hover:bg-gray-300"
          >
            <BsPlus />
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <span>₹{price}</span>
      </div>

      <button
        onClick={() => removeHandler(productId)}
        className="text-gray-700 hover:text-red-600"
      >
        <RiDeleteBinLine size={18} />
      </button>
    </div>
  );
};

export default CartItemCard;

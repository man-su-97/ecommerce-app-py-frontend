import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducers/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";
import CartItemCard from "../components/cart-item";

export const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    if (!couponCode) {
      setIsValidCouponCode(false);
      dispatch(discountApplied(0));
      dispatch(calculatePrice());
      return;
    }

    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{cartItems.length > 0 ? shippingCharges : 0}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;

// export default Cart;

// import productImg from "../assets/demo-product.jpeg";
// import DeleteIcon from "../components/DeleteIcon";

// function Cart() {
//   const price = 15;
//   const quantity = 2;
//   const total = price * quantity;
//   const address = "West Bengal";
//   return (
//     <div className="px-40 flex">
//       <main className="w-1/2 flex flex-col">
//         <h1>My Cart</h1>
//         <hr className="border-t-2 border-black-300 my-4" />

//         <div className="flex items-center justify-around">
//           <div>
//             <img src={productImg} alt="product" />
//           </div>
//           <div>
//             <h2>Product Name</h2>
//             <p>{`₹${price}`}</p>
//           </div>
//           <div>
//             <div className="flex border-black border">
//               <button className="px-1" onClick={() => quantity}>
//                 -
//               </button>
//               <p className="px-3">{quantity}</p>
//               <button className="px-1" onClick={() => quantity}>
//                 +
//               </button>
//             </div>
//             <p>{quantity}</p>
//           </div>
//           <div>
//             <button>
//               <DeleteIcon />
//             </button>
//           </div>
//         </div>
//         <hr className="border-t-2 border-black-300 my-4" />
//       </main>
//       <aside className="w-1/2 flex flex-col">
//         <h2>Order Summary</h2>
//         <div className="my-10">
//           <hr className="border-t-2 border-black-300 my-4" />
//           <p>Subtotal: ₹{price * quantity}</p>
//           <p>Delivery: ₹50</p>
//           <p>{address}</p>
//           <hr className="border-t-2 border-black-300 my-4" />
//         </div>
//         <div className="flex flex-col justify-between items-start">
//           <p>Total ₹{total}</p>
//           <button className="text-white bg-[#5E5E4A] px-10">Checkout</button>
//         </div>
//       </aside>
//     </div>
//   );
// }

// export default Cart;

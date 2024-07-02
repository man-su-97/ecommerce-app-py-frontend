import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RootState, server } from "../redux/store";
import toast from "react-hot-toast";
import axios from "axios";
import { responseToast } from "../utils/features";
import { resetCart } from "../redux/reducers/cartReducer";
import { RazorpayOptions } from "razorpay";

const CheckOutForm = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // const [newOrder] = useNewOrderMutation();
  const dispatch = useDispatch();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/order/newRazorpayOrder`,
        { amount: total },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const razorpayKey = data?.razorpayKey;
      const orderId = data?.razorpayOrderId;

      if (!razorpayKey) {
        throw new Error("Razorpay key not found in backend response");
      }

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: total * 100, // amount in paise
        currency: "INR",
        name: "Pleasure Yourself",
        description: "Test Transaction",
        image: "",
        order_id: orderId,
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const paymentData = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            orderData: {
              shippingInfo,
              orderItems: cartItems,
              subtotal,
              tax,
              discount,
              shippingCharges,
              total,
              user: user?._id!,
            },
          };

          try {
            const verificationRes = await axios.post(
              `${server}/api/v1/order/paymentVerifiedOrder`,
              paymentData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            const verificationResult = verificationRes.data;
            console.log("verifc-", verificationRes);

            if (verificationResult.success) {
              dispatch(resetCart());
              responseToast(verificationResult, navigate, "/orders");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (verificationError) {
            console.error("Error in payment verification:", verificationError);
            toast.error("Error verifying payment. Please try again later.");
          }

          setIsProcessing(false);
        },
        prefill: {
          name: user?.name ?? "",
          email: user?.email ?? "",
          contact: shippingInfo.contactNumber,
        },
        notes: {
          address: "Dubai,U.A.E",
        },
        theme: {
          color: "#DCB4BC",
        },
      };

      const loadRazorpay = await loadRazorpayScript();

      if (!loadRazorpay) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        setIsProcessing(false);
        return;
      }

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setIsProcessing(false);
    } catch (error) {
      console.error("Error in Axios request:", error);
      toast.error("Error initiating payment. Please try again later.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ${total}`}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <div>
      <CheckOutForm />
      <div>Checkout</div>
    </div>
  );
};

export default Checkout;

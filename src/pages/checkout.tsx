import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RootState, server } from "../redux/store";
import toast from "react-hot-toast";
import axios from "axios";
import { responseToast, ResType } from "../utils/features";
import { resetCart } from "../redux/reducers/cartReducer";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Cards from "react-credit-cards-2";
import "./checkoutstyles.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";

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
  const [paymentMethod, setPaymentMethod] = useState<string>("Online");

  const totalBeforePayment = paymentMethod === "COD" ? total + 29 : total;

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
    const deliveryCharge = paymentMethod === "COD" ? 29 : 0;

    if (paymentMethod === "COD") {
      // Handle COD order creation
      try {
        const { data } = await axios.post(
          `${server}/api/v1/order/newWithCOD`,
          {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges: shippingCharges + deliveryCharge,
            total: totalBeforePayment,
            user: user?._id,
            paymentMethod,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        dispatch(resetCart());

        const adaptedResponse: ResType = {
          data: {
            success: true,
            message: "Order Placed Successfully!",
          },
        };

        responseToast(adaptedResponse, navigate, "/orders");
      } catch (error) {
        console.error("Error creating COD order:", error);
        toast.error("Error creating order. Please try again later.");
      } finally {
        setIsProcessing(false);
      }
    } else {
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
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

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
                user: user?._id,
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
              // console.log("Verification Response: ", verificationRes);

              if (verificationResult && verificationResult.success) {
                dispatch(resetCart());

                const adaptedResponse: ResType = {
                  data: {
                    success: verificationResult.success,
                    message:
                      verificationResult.message ||
                      "Payment verified successfully!",
                  },
                };

                responseToast(adaptedResponse, navigate, "/orders");
              } else {
                const adaptedError: ResType = {
                  error: {
                    status: 400,
                    data: {
                      success: false,
                      message:
                        verificationResult.message ||
                        "Payment verification failed",
                    },
                  } as FetchBaseQueryError,
                };
                responseToast(adaptedError, null, "");
              }
            } catch (verificationError) {
              console.error(
                "Error in payment verification:",
                verificationError
              );
              const adaptedError: ResType = {
                error: {
                  status: 500,
                  data: {
                    success: false,
                    message: "Error verifying payment. Please try again later.",
                  },
                } as FetchBaseQueryError,
              };

              responseToast(adaptedError, null, "");
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
    }
  };

  return (
    <div className="checkout-container min-h-[20rem]">
      <form onSubmit={submitHandler}>
        <div className="min-h-[20rem] shadow-md shadow-[#5E5E4A]">
          <div className="App-cards">
            <label className="border block p-1">
              <input
                type="radio"
                name="paymentMethod"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() => setPaymentMethod("Online")}
              />
              <span className="font-avenirCF px-2 text-sm">
                Razorpay Secure (UPI,Cards,Wallets,Netbanking)
              </span>
            </label>
            <div className="App-cards-list">
              <Cards
                name="John Smith"
                number="5555 4444 3333 1111"
                expiry="10/20"
                cvc="737"
              />
            </div>
          </div>
          <div className="">
            <label className="border block p-2">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <span className="font-avenirCF px-2 text-sm">
                Cash on Delivery (COD)
              </span>
            </label>
          </div>
        </div>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ${totalBeforePayment}`}
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
      <div className="mt-10 w-[20rem] h-auto shadow-md border shadow-gray-200 mx-auto rounded mb-10">
        <p className="font-avenirCF p-4">
          {" "}
          Due to handiling costs, a nominal fee of ₹29 will be charged for
          orders placed using COD.Avoid this fee by paying online now
        </p>
      </div>
    </div>
  );
};

export default Checkout;

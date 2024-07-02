// src/global.d.ts
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare interface Window {
  Razorpay: {
    new (options: RazorpayOptions): {
      open: () => void;
    };
  };
}

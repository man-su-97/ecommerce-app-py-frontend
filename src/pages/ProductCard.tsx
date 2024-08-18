import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";

type ProductsProps = {
  productId: string;
  photos: {
    url: string;
    public_id: string;
  }[];
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

export const ProductCard = ({
  productId,
  price,
  name,
  photos,
  stock,
  handler,
}: ProductsProps) => {
  console.log("pp-", productId, price, name, photos, stock, handler);
  if (
    !productId ||
    !price ||
    !name ||
    !photos ||
    !photos.length ||
    !stock ||
    !handler
  ) {
    return <div>Invalid product data</div>;
  }

  const handleClick = () => {
    console.log("Button clicked!");
    const cartItem: CartItem = {
      productId,
      price,
      name,
      photo: photos[0].url,
      stock,
      quantity: 1,
    };
    const result = handler(cartItem);
    console.log("Handler result: ", result);
  };

  return (
    <div key={productId} className="w-full">
      <div className="min-w-[280px] min-h-[373px] lg:min-h-[422px] lg:max-w-[320px]">
        <Link to={`/product/${productId}`}>
          <img
            src={transformImage(photos?.[0]?.url, 400)}
            alt={name}
            className="w-full h-[473px] lg:w-full lg:h-[422px]"
          />
        </Link>
      </div>
      <div className="px-6">
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-[] text-black max-h-10 min-h-11 overflow-hidden">
              <Link to={`/product/${productId}`}>
                <span className="inset-0 text-[16px] font-[398]">{name}</span>
              </Link>
            </h3>
            <p className="text-[16px] font-[350] py-2 text-black">
              <span>&#8377;</span>
              {price}
            </p>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="mt-6 flex w-full items-center justify-center border border-black bg-transparent hover:bg-[#5E5E4A] px-8 py-3 text-black hover:text-white  focus:ring-2 focus:ring-indigo-500 "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

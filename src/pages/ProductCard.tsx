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
    console.log("Adding item to cart: ", cartItem);
    const result = handler(cartItem);
    console.log("Handler result: ", result);
  };

  return (
    <div key={productId} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Link to={`/product/${productId}`}>
          <img
            src={transformImage(photos?.[0]?.url, 400)}
            alt={name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/product/${productId}`}>
              <span aria-hidden="true" className=" inset-0">
                {name}
              </span>
            </Link>
          </h3>
          <p className="text-sm font-medium text-gray-900">
            <span>&#8377;</span>
            {price}
          </p>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-[#DCB4BC] px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to bag
      </button>
    </div>
  );
};

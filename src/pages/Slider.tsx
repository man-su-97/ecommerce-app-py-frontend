import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import SwiperCore from "swiper";
import { transformImage } from "../utils/features";
import { addToCart } from "../redux/reducers/cartReducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CartItem } from "../types/types";
import { Skeleton } from "../components/Loader";
import { Link } from "react-router-dom";

const ProductSlider = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const { data: latestProducts, isLoading, error } = useLatestProductsQuery("");

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const quantity = 1;
  // Handle loading state
  if (isLoading)
    return (
      <div>
        <Skeleton />
      </div>
    );

  // Handle error state
  if (error) return <div>Error: {"Error from Slider file line 50"}</div>;

  console.log("slider- ", latestProducts);

  return (
    <div className="text-center relative">
      <h1 className="text-5xl font-light mb-36">MOST POPULAR</h1>
      <div className="relative px-20">
        {latestProducts && latestProducts.products && (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="mySwiper"
          >
            {latestProducts.products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={transformImage(product.photos[0]?.url, 400)}
                      alt={product.name}
                      className="object-cover object-center"
                    />
                  </Link>
                </div>
                <h3 className="mt-2 text-sm text-gray-700">
                  <Link to={`/product/${product._id}`}>
                    <span aria-hidden="true" className=" inset-0">
                      {product.name}
                    </span>
                  </Link>
                </h3>
                <p className="mt-1 text-md font-medium text-gray-900">
                  <span>&#8377;</span>
                  {product.price}
                </p>
                <button
                  onClick={() =>
                    addToCartHandler({
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                      stock: product.stock,
                      quantity,
                      photo: product.photos[0]?.url || "",
                    })
                  }
                  className="bg-[#5E5E4A] w-full text-white rounded-sm h-10"
                >
                  Add to Cart
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-4 z-50">
          <button
            onClick={slidePrev}
            className="bg-gray-800 text-white p-2 rounded-full focus:outline-none "
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-4 z-50">
          <button
            onClick={slideNext}
            className="bg-gray-800 text-white p-2 rounded-full focus:outline-none"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;

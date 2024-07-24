import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import SwiperCore from "swiper";
import { addToCart } from "../redux/reducers/cartReducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CartItem } from "../types/types";
import { Skeleton } from "../components/Loader";
import { ProductCard } from "./ProductCard";

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
    <div className="text-center ">
      <h1 className="text-5xl font-light pb-16 md:pb-36">MOST POPULAR</h1>
      <div className="relative px-20 h-76">
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
                spaceBetween: 60,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 60,
              },
            }}
            className="mySwiper"
          >
            {latestProducts.products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="max-w-[357px] ">
                  <ProductCard
                    key={product._id}
                    productId={product._id}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    handler={addToCartHandler}
                    photos={product.photos}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="absolute top-[220px] transform -translate-y-1/2 left-4 z-50">
          <button
            onClick={slidePrev}
            className=" text-black p-5 focus:outline-none "
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-[220px] transform -translate-y-1/2 right-4 z-50">
          <button
            onClick={slideNext}
            className=" text-black p-5 focus:outline-none"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;

import { CarouselButtonType, MyntraCarousel, Slider, useRating } from "6pp";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaRegStar,
  FaStar,
} from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import RatingsComponent from "../components/ratings";
import {
  useAllReviewsOfProductsQuery,
  useDeleteReviewMutation,
  useNewReviewMutation,
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { addToCart } from "../redux/reducers/cartReducer";
import { RootState } from "../redux/store";
import { CartItem } from "../types/types";
import { responseToast } from "../utils/features";
import * as React from "react";
import ReviewCard from "./ReviewCard";
import { ProductpageAccordion } from "./ProductpageAccordion";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, isError, data } = useProductDetailsQuery(params.id!);
  const reviewsResponse = useAllReviewsOfProductsQuery(params.id!);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [reviewComment, setReviewComment] = useState("");
  const reviewDialogRef = useRef<HTMLDialogElement>(null);
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

  const [createReview] = useNewReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const decrement = () => setQuantity((prev) => prev - 1);
  const increment = () => {
    if (data?.product?.stock === quantity)
      return toast.error(`${data?.product?.stock} available only`);
    setQuantity((prev) => prev + 1);
  };

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) return <Navigate to="/404" />;

  const showDialog = () => {
    reviewDialogRef.current?.showModal();
  };

  const {
    Ratings: RatingsEditable,
    rating,
    setRating,
  } = useRating({
    IconFilled: <FaStar />,
    IconOutline: <FaRegStar />,
    value: 0,
    selectable: true,
    styles: {
      fontSize: "1.2rem",
      color: "coral",
      justifyContent: "flex-start",
    },
  });

  const reviewCloseHandler = () => {
    reviewDialogRef.current?.close();
    setRating(0);
    setReviewComment("");
  };

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviewSubmitLoading(true);
    reviewCloseHandler();

    const res = await createReview({
      comment: reviewComment,
      rating,
      userId: user?._id,
      productId: params.id!,
    });

    setReviewSubmitLoading(false);

    responseToast(res, null, "");

    // API call to submit review
  };

  const handleDeleteReview = async (reviewId: string) => {
    const res = await deleteReview({ reviewId, userId: user?._id });
    responseToast(res, null, "");
  };

  return (
    <div className=" relative">
      {isLoading ? (
        <ProductLoader />
      ) : (
        <>
          <main className="flex flex-col mx-5 md:mx-60 justify-between gap-16 ">
            <div className="mt-16 hidden md:block">
              <span className="text-base font-light">Home</span>
              <span> / </span>
              <span className="text-base font-light">
                {data?.product?.category}
              </span>
              <span> / </span>
              <span className="text-base font-light">
                {data?.product?.name}
              </span>
            </div>
            <div className="md:hidden flex items-center justify-start mt-5">
              <Link to={"/product-listing"}>
                <ArrowBackIosIcon fontSize="small" />
                <span>Back to All Products</span>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row  md:gap-10">
              <section className="mb-10">
                <div className="">
                  <Slider
                    showThumbnails
                    showNav={false}
                    onClick={() => setCarouselOpen(true)}
                    images={data?.product?.photos.map((i) => i.url) || []}
                  />
                </div>

                {carouselOpen && (
                  <MyntraCarousel
                    NextButton={NextButton}
                    PrevButton={PrevButton}
                    setIsOpen={setCarouselOpen}
                    images={data?.product?.photos.map((i) => i.url) || []}
                  />
                )}
              </section>
              <section className="flex flex-col">
                <h1 className="text-gray-700 font-normal text-2xl">
                  {data?.product?.name}
                </h1>
                <div className="">
                  <em
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      fontSize: "small",
                      padding: "4px 0px",
                    }}
                  >
                    <RatingsComponent value={data?.product?.ratings || 0} />(
                    {data?.product?.numOfReviews} reviews)
                  </em>
                </div>

                <h3 className="my-5 text-gray-700 font-light text-2xl ">
                  ₹{data?.product?.price}
                </h3>
                <article>
                  <div className="flex flex-col my-5">
                    <p className="text-sm font-light">Quantity</p>
                    <div className="py-2">
                      <div className="border border-black flex justify-evenly w-16">
                        <button onClick={decrement}>-</button>
                        <p>{quantity}</p>
                        <button onClick={increment}>+</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 my-10">
                    <button
                      className="bg-[#5E5E4A] text-white p-3 w-full"
                      onClick={() =>
                        addToCartHandler({
                          productId: data?.product?._id!,
                          name: data?.product?.name!,
                          price: data?.product?.price!,
                          stock: data?.product?.stock!,
                          quantity,
                          photo: data?.product?.photos[0].url || "",
                        })
                      }
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() =>
                        addToCartHandler({
                          productId: data?.product?._id!,
                          name: data?.product?.name!,
                          price: data?.product?.price!,
                          stock: data?.product?.stock!,
                          quantity,
                          photo: data?.product?.photos[0].url || "",
                        })
                      }
                      className="bg-transparent border text-black p-3 w-full"
                    >
                      <Link to="/cart">Buy Now</Link>
                    </button>
                  </div>
                </article>
                <ProductpageAccordion product={data?.product} />
              </section>
            </div>
          </main>
        </>
      )}

      <dialog
        ref={reviewDialogRef}
        className="absolute mx-auto my-auto min-w-[270px] min-h-[400px] p-3 "
      >
        <button onClick={reviewCloseHandler}>
          X <span>close</span>
        </button>
        <h2 className="text-base my-2">Write a Review</h2>
        <form onSubmit={submitReview}>
          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Review..."
          ></textarea>
          <RatingsEditable />
          <button
            className="bg-[#5E5E4A] px-3 py-1 mt-5 text-white text-sm"
            disabled={reviewSubmitLoading}
            type="submit"
          >
            Submit
          </button>
        </form>
      </dialog>

      <section className="mx-5 md:mx-60 mt-10">
        {/* <p>{data?.product?.description}</p> */}

        <article>
          <h2 className="text-sm">Write Review</h2>

          {reviewsResponse.isLoading
            ? null
            : user && (
                <button onClick={showDialog}>
                  <FiEdit />
                </button>
              )}
        </article>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            overflowX: "auto",
            padding: "2rem",
          }}
        >
          {reviewsResponse.isLoading ? (
            <>
              <Skeleton width="45rem" length={5} />
              <Skeleton width="45rem" length={5} />
              <Skeleton width="45rem" length={5} />
            </>
          ) : (
            reviewsResponse.data?.reviews.map((review) => (
              <ReviewCard
                handleDeleteReview={handleDeleteReview}
                userId={user?._id}
                key={review._id}
                review={review}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const ProductLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        border: "1px solid #f1f1f1",
        height: "80vh",
      }}
    >
      <section style={{ width: "100%", height: "100%" }}>
        <Skeleton
          width="100%"
          containerHeight="100%"
          height="100%"
          length={1}
        />
      </section>
      <section
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          padding: "2rem",
        }}
      >
        <Skeleton width="40%" length={3} />
        <Skeleton width="50%" length={4} />
        <Skeleton width="100%" length={2} />
        <Skeleton width="100%" length={10} />
      </section>
    </div>
  );
};

const NextButton: CarouselButtonType = ({ onClick }) => (
  <button onClick={onClick} className="carousel-btn">
    <FaArrowRightLong />
  </button>
);
const PrevButton: CarouselButtonType = ({ onClick }) => (
  <button onClick={onClick} className="carousel-btn">
    <FaArrowLeftLong />
  </button>
);

export default ProductDetails;

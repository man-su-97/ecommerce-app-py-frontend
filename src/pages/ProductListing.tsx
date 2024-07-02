import toast from "react-hot-toast";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CartItem } from "../types/types";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { CustomError } from "../types/api-types";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";

function ProductListing() {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const dispatch = useDispatch();

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  return (
    <div className="flex flex-row items-start justify-stretch p-8 min-h-[calc(100vh-6.5vh)]">
      <aside className="min-w-[20rem] min-h-screen shadow-md shadow-[#0000003f] p-8 flex flex-col items-start justify-stretch space-y-2">
        <h2 className="text-xl font-bold">Filters</h2>
        <div>
          <h4 className="font-semibold">Sort</h4>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 bg-white border border-gray-300 rounded-lg mt-2"
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4 className="font-semibold">Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <h4 className="font-semibold">Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 bg-white border border-gray-300 rounded-lg mt-2"
          >
            <option value="">All</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main className="flex-1 px-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-2 mt-4 mb-4 border border-gray-300 rounded-lg"
        />

        {productLoading ? (
          <Loader />
        ) : (
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {searchedData?.products.map((product) => (
                  <ProductCard
                    key={product._id}
                    productId={product._id}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    handler={addToCartHandler}
                    photos={product.photos}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {searchedData && searchedData.totalPage >= 1 && (
          <article className="flex justify-center items-center space-x-4 mt-8">
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 "
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-orange-300  text-gray-700 rounded-lg disabled:opacity-50 "
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
}

export default ProductListing;

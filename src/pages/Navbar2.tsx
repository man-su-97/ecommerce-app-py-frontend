import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/py.png";
import { GiShoppingBag } from "react-icons/gi";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/reducers/cartReducer";
import { FaUserCircle } from "react-icons/fa";
import "../styles/navbar.css";
import { useSearchProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

interface PropsType {
  user: User | null;
}

const Navbar2 = ({ user }: PropsType) => {
  const [search, setSearch] = useState("");
  const sort = "";
  const maxPrice = 100000;
  const category = "";
  const page = 1;

  const { cartItems } = useSelector((state: RootState) => state.cartReducer);

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

  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      dispatch(resetCart());
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    console.log("button clicked ---");
    setNavOpen(false);
    setIsOpen(false);
  };

  const MenuLinks = () => (
    <div className="flex flex-col items-start md:flex-row relative gap-5 md:gap-1 md:space-x-8 md:ml-8 ">
      <Link to="/" onClick={handleLinkClick}>
        HOME
      </Link>
      <Link to="/product-listing" onClick={handleLinkClick}>
        SHOP
      </Link>
      <Link to="/blog-listing" onClick={handleLinkClick}>
        BLOG
      </Link>
      <Link to="/contact-listing" onClick={handleLinkClick}>
        CONTACT
      </Link>
    </div>
  );

  const SearchBar = () => (
    <div className="border-b-2 hover:border-2 border-black flex items-center px-2 w-[200px] sm:w-[200px] lg:w-[200px]">
      <IoSearchOutline size={25} />
      <input
        className="bg-transparent p-2 w-full border-none focus:ring-0"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );

  const productCount = useCallback(() => {
    return cartItems.reduce((total, product) => total + product.quantity, 0);
  }, [cartItems]);

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-1 md:p-4 shadow-sm">
      <div className="hidden md:flex md:relative space-x-8">
        <MenuLinks />
      </div>
      <div className="ml-36 md:ml-0 size-28 md:size-36">
        <Link to="/">
          <img src={logo} alt="logo" className="" />
        </Link>
      </div>
      <div className="hidden md:flex md:items-center md:space-x-8 md:relative">
        <SearchBar />
        {user?._id ? (
          <nav className="header">
            <button onClick={() => setIsOpen((prev: boolean) => !prev)}>
              <FaUserCircle size={25} />
            </button>
            <dialog ref={dialogRef} open={isOpen} className="dialog">
              <div>
                {user.role === "admin" && (
                  <Link to="/admin/dashboard" onClick={handleLinkClick}>
                    Admin
                  </Link>
                )}
                <Link to="/orders" onClick={handleLinkClick}>
                  Orders
                </Link>
                <button
                  onClick={logoutHandler}
                  className="bg-red-600 text-white p-1 rounded"
                >
                  Sign Out
                </button>
              </div>
            </dialog>
          </nav>
        ) : (
          <Link to="/login" onClick={handleLinkClick}>
            <div className="flex items-center justify-center gap-2">
              <FaUserCircle size={25} /> Login
            </div>
          </Link>
        )}
        <Link to="/cart">
          <button className="text-[#5E5E4A] md:flex items-center py-2 px-5 relative">
            <GiShoppingBag size={32} className="mr-2" />
            <span className="absolute text-white text-xs top-5 left-8">
              {productCount()}
            </span>
          </button>
        </Link>
      </div>
      <div className="flex items-center md:hidden">
        <Link to="/cart">
          <button className="text-[#5E5E4A] md:flex items-center py-2 px-5 relative">
            <GiShoppingBag size={30} className="mr-2" />
            <span className="absolute text-white text-xs top-5 left-8">
              {productCount()}
            </span>
          </button>
        </Link>
        <div
          onClick={() => setNavOpen(!navOpen)}
          className="cursor-pointer sm:hidden"
        >
          <AiOutlineMenu size={30} />
        </div>
      </div>

      {navOpen && (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0" />
      )}

      <div
        className={
          navOpen
            ? "fixed top-0 left-0 w-full h-screen bg-[#D7D7CB] z-10 duration-500"
            : "fixed top-[-100%] left-0 w-full h-[100px] bg-white z-10 duration-500"
        }
      >
        <AiOutlineClose
          onClick={() => setNavOpen(!navOpen)}
          size={30}
          className="absolute right-5 top-16 cursor-pointer"
        />
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl flex flex-col items-start mt-12 space-y-5 cursor-pointer w-[50%] rounded-full mx-auto p-2 hover:text-white">
              {user?._id ? (
                <nav className="header">
                  <button onClick={() => setIsOpen((prev: boolean) => !prev)}>
                    <FaUserCircle size={35} />
                  </button>
                  <dialog ref={dialogRef} open={isOpen} className="dialog">
                    <div>
                      {user.role === "admin" && (
                        <Link to="/admin/dashboard" onClick={handleLinkClick}>
                          Admin
                        </Link>
                      )}
                      <Link to="/orders" onClick={handleLinkClick}>
                        Orders
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="bg-red-600 text-white p-1 rounded"
                      >
                        Sign Out
                      </button>
                    </div>
                  </dialog>
                </nav>
              ) : (
                <Link to="/login" onClick={handleLinkClick}>
                  <div className="flex items-center justify-center gap-2">
                    <FaUserCircle size={25} /> Login
                  </div>
                </Link>
              )}
              <SearchBar />
              <MenuLinks />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar2;

// {
//   user?._id ? (
//     <nav className="header">
//       <button onClick={() => setIsOpen((prev: boolean) => !prev)}>
//         <FaUserCircle size={25} />
//       </button>
//       <dialog ref={dialogRef} open={isOpen} className="dialog">
//         <div>
//           {user.role === "admin" && (
//             <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
//               Admin
//             </Link>
//           )}
//           <Link onClick={() => setIsOpen(false)} to="/orders">
//             Orders
//           </Link>
//           <button
//             onClick={logoutHandler}
//             className="bg-red-600 text-white p-1 rounded"
//           >
//             Sign Out
//           </button>
//         </div>
//       </dialog>
//     </nav>
//   ) : (
//     <Link to={"/login"}>
//       <div className="flex items-center justify-center gap-2">
//         <FaUserCircle size={25} /> Login
//       </div>
//     </Link>
//   );
// }

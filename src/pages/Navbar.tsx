import logo from "../assets/py.png";
import { GiShoppingBag } from "react-icons/gi";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useState } from "react";
import "../styles/navbar.css";

interface PropsType {
  user: User | null;
}

function Navbar({ user }: PropsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };
  return (
    <div className="flex items-center justify-around h-38 relatve max-w-full ">
      <div className="flex relative space-x-8">
        <Link to={"/"}>
          <button className=""> HOME</button>
        </Link>
        <Link to={"/product-listing"}>
          <button className=""> SHOP</button>
        </Link>
        <Link to={"/blog-listing"}>
          <button className=""> BLOG</button>
        </Link>
        <Link to={"/contact-listing"}>
          <button className=""> CONTACT</button>
        </Link>
      </div>
      <div className="size-36">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className=" flex space-x-8 relative">
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        {user?._id ? (
          <nav className="header">
            <button onClick={() => setIsOpen((prev: any) => !prev)}>
              <FaUser />
            </button>
            <dialog open={isOpen} className="dialog">
              <div>
                {user.role === "admin" && (
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                    Admin
                  </Link>
                )}
                <Link onClick={() => setIsOpen(false)} to="/orders">
                  Orders
                </Link>
                <button onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </nav>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )}
        <Link to={"/cart"}>
          <button>
            <GiShoppingBag size={35} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

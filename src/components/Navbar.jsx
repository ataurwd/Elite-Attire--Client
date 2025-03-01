import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FormContext } from "../context/AuthContext";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import useLoginUser from "../hooks/useLoginUser";
import useAllProduct from "./../hooks/useAllProduct";
import useUserProduct from "../hooks/useUserProduct";
import useAllWishlist from "../hooks/useAllWishlist";

const NavBer = () => {
  const { user, logoutUser } = useContext(FormContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [loginUser] = useLoginUser();
  const [product] = useAllProduct();

  // login user product
  const [userProduct, wishlistData] = useUserProduct();

  const signOut = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="navbar sticky top-0 left-0 w-full z-50 bg-gray-800 shadow-md text-gray-400 md:px-20">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="btn btn-ghost lg:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-8 6h8"
            />
          </svg>
        </button>
        {/* Logo and Website Name */}
        <Link
          to="/"
          className="font-semibold text-xl flex items-center text-white"
        >
          Elite Attire
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5 text-[17px] font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-white"
            }
          >
            Product
          </NavLink>
          <Link
            to={`${
              loginUser.role === "admin"
                ? "/dashboard/manage-order"
                : loginUser.role === "user"
                ? "/dashboard/manage-profile"
                : ""
            }`}
            className={"text-white"}
          >
            Dashboard
          </Link>
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <>
            {" "}
            <Link to="/cart">
              <div className=" relative">
                <IoCartOutline className="border rounded-full text-4xl p-2 " />
                {userProduct.length > 0 && (
                  <p className="absolute -top-[6px] -right-[7px] p-1 text-white flex items-center justify-center text-sm rounded-full h-5 w-5 bg-primary">
                    {userProduct.length}
                  </p>
                )}
              </div>
            </Link>
            {/* wishlist  */}
            <Link to="/wishlist" className=" relative">
              <CiHeart className="border rounded-full text-4xl p-2" />
              {wishlistData.length > 0 && (
                <p className=" absolute -top-[6px] -right-[7px] p-1 text-white flex items-center justify-center text-sm rounded-full h-5 w-5 bg-primary">
                  {wishlistData.length}
                </p>
              )}
            </Link>
          </>
        ) : (
          <></>
        )}

        {user ? (
          <div className="relative group">

              <button
                onClick={signOut}
                className="text-sm text-white bg-primary px-5 py-2 rounded-sm hover:bg-danger"
              >
                Logout
              </button>
            </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-5 font-bold text-white py-1 rounded-md bg-primary">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-5 font-bold text-white py-1 rounded-md bg-primary hidden md:block">
                Register
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 -md:right-16 w-full bg-white shadow-lg lg:hidden">
          <ul className="menu menu-vertical px-5 py-3 space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-black"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-black"
              }
            >
              Product
            </NavLink>
            {user && (
              <>
              <Link
                  to={`${
                    loginUser.role === "admin"
                      ? "/dashboard/manage-order"
                      : loginUser.role === "user"
                      ? "/dashboard/manage-profile" : ""
                  }`}
                  className={ "text-black"
                  }
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="text-red-500 text-left text-sm hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBer;

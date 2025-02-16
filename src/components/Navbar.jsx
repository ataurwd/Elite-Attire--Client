import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FormContext } from "../context/AuthContext";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

const NavBer = () => {
  const { user, logoutUser } = useContext(FormContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  //   const [loginUser] = useUser();

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
        </ul>
      </div>

      {/* Navbar End */}
      {/* <div className="navbar-end space-x-2 ">
        <Link to="/dashboard">
          <div className=" relative">
            <IoCartOutline className="border rounded-full text-4xl p-2 " />
            {10 > 0 && (
              <p className="absolute -top-[6px] -right-[7px] p-1 text-white flex items-center justify-center rounded-full h-5 w-5 bg-green-500 ">
                {10}
              </p>
            )}
          </div>
        </Link>

        <div className=" relative">
          <CiHeart className="border rounded-full text-4xl p-2" />
          {10 > 0 && (
            <p className=" absolute -top-[6px] -right-[7px] p-1 text-white flex items-center justify-center  rounded-full h-5 w-5 bg-green-500 ">
              {10}
            </p>
          )}
        </div>
      </div> */}
      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <>
            {" "}
            <Link to="/dashboard">
              <div className=" relative">
                <IoCartOutline className="border rounded-full text-4xl p-2 " />
                {10 > 0 && (
                  <p className="absolute -top-[6px] -right-[7px] p-1 text-white flex items-center justify-center text-sm rounded-full h-5 w-5 bg-primary">
                    {10}
                  </p>
                )}
              </div>
            </Link>
            {/* wishlist  */}
            <div className=" relative">
              <CiHeart className="border rounded-full text-4xl p-2" />
              {10 > 0 && (
                <p className=" absolute -top-[6px] -right-[7px] p-1 text-white flex items-center justify-center text-sm rounded-full h-5 w-5 bg-primary">
                  {10}
                </p>
              )}
            </div>
          </>
        ) : (
          <></>
        )}

        {user ? (
          <div className="relative group">
            <img
              src={user?.photoURL || "/default-profile.png"}
              className="rounded-full w-10 h-10 cursor-pointer object-cover"
              alt="User"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-12 right-0 md:-left-20 flex flex-col gap-2 w-48 bg-white p-3 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <h3 className="text-sm font-semibold">{user?.displayName}</h3>
              <p className="text-xs text-gray-600">{user?.email}</p>
              {/* <Link
                  to={`${
                    loginUser.role === "admin"
                      ? "/dashboard/admin-profile"
                      : loginUser.role === "guide"
                      ? "/dashboard/guide-profile"
                      : "/dashboard/tourist-profile"
                  }`}
                  className={ "text-black"
                  }
                >
                  Dashboard
                </Link> */}
              <Link
                to="/offer-announcements"
                className="text-sm text-black hover:text-gray-700"
              >
                Offer Announcements
              </Link>
              <button
                onClick={signOut}
                className="text-sm text-white bg-primary py-1 rounded-sm hover:bg-danger"
              >
                Logout
              </button>
            </div>
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
            {user && (
              <>
                {/* <Link
                  to={`${
                    loginUser.role === "admin"
                      ? "/dashboard/admin-profile"
                      : loginUser.role === "guide"
                      ? "/dashboard/guide-profile"
                      : "/dashboard/tourist-profile"
                  }`}
                  className={ "text-gray-400"
                  }
                >
                  Dashboard
                </Link> */}
                <NavLink
                  to="/offer-announcements"
                  className={({ isActive }) =>
                    isActive ? "text-gray-400" : "text-black"
                  }
                >
                  Offer Announcements
                </NavLink>
                <button
                  onClick={signOut}
                  className="text-red-500 text-sm hover:underline"
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

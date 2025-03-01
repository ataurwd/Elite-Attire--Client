import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import { CgHome, CgProfile } from "react-icons/cg";
import useLoginUser from "../hooks/useLoginUser";
import Loading from "./../components/Loading";
import { FaOpencart } from "react-icons/fa";
import { IoBagAddOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineManageHistory } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";


const Dashoboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loginUser, refetch, isLoading] = useLoginUser();
  if (isLoading) {
    <Loading />;
    return;
  }
  return (
    <div className="flex">
      <div
        className={`${
          isCollapsed ? "md:w-16 w-10" : "md:w-72 w-20 px-3"
        } bg-primary min-h-screen transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          className={`${
            isCollapsed ? "justify-center" : "justify-end"
          } grid grid-cols-2 w-full p-4 text-white hidden md:block`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <FiChevronRight size={24} />
          ) : (
            <FiChevronLeft size={24} />
          )}
        </button>

        {/* menu item  */}
        {/* admin route */}
        {loginUser.role === "admin" ? (
          <>
            <NavLink
              to={"manage-product"}
              className={({ isActive }) =>
                `flex bg-white my-2 p-3 rounded-md items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "md:ml-5"}`
              }
            >
              <AiOutlineProduct
                className={`${isCollapsed ? "" : "md:mr-3"}`}
                size={24}
              />
              <span className="hidden sm:inline">
                {!isCollapsed && "Manage Product"}
              </span>
            </NavLink>
            <NavLink
              to={"add-product"}
              className={({ isActive }) =>
                `flex bg-white my-2 p-3 rounded-md items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "md:ml-5"}`
              }
            >
              <IoBagAddOutline
                className={`${isCollapsed ? "" : "md:mr-3"}`}
                size={24}
              />
              <span className="hidden sm:inline">
                {!isCollapsed && "Add Product"}
              </span>
            </NavLink>
            <NavLink
              to={"manage-order"}
              className={({ isActive }) =>
                `flex bg-white my-2 p-3 rounded-md items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "md:ml-5"}`
              }
            >
              <MdOutlineManageHistory
                className={`${isCollapsed ? "" : "md:mr-3"}`}
                size={24}
              />
              <span className="hidden sm:inline">
                {!isCollapsed && "Manage Order"}
              </span>
            </NavLink>
            <NavLink
              to={"view-customer"}
              className={({ isActive }) =>
                `flex bg-white my-2 p-3 rounded-md items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "md:ml-5"}`
              }
            >
              <LuUsersRound 
                className={`${isCollapsed ? "" : "md:mr-3"}`}
                size={24}
              />
              <span className="hidden sm:inline">
                {!isCollapsed && "View Customer"}
              </span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to={"manage-profile"}
              className={({ isActive }) =>
                `flex bg-white my-2 p-3 rounded-md items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "md:ml-5"}`
              }
            >
              <CgProfile
                className={`${isCollapsed ? "" : "md:mr-3"}`}
                size={24}
              />
              <span className="hidden sm:inline">
                {!isCollapsed && "Manage Profile"}
              </span>
            </NavLink>{" "}
            <NavLink
              to={"order-hoistory"}
              className={({ isActive }) =>
                `flex bg-white my-2 p-3 rounded-md items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "md:ml-5"}`
              }
            >
              <FaOpencart 
                className={`${isCollapsed ? "" : "md:mr-3"}`}
                size={24}
              />
              <span className="hidden sm:inline">
                {!isCollapsed && "Order History"}
              </span>
            </NavLink>
          </>
        )}

        {/* back home  */}
        <NavLink
              to={"/"}
              className={({ isActive }) =>
                `flex bg-white my-2 p-3 rounded-md items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "md:ml-5"}`
              }
            >
              <IoHomeOutline
                className={`${isCollapsed ? "" : "md:mr-3"}`}
                size={24}
              />
              <span className="hidden sm:inline">
                {!isCollapsed && "Back Home"}
              </span>
            </NavLink>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashoboard;

import React from "react";
import NavBer from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <NavBer />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../components/ErrorPage";
import Login from "../users/Login";
import Register from "../users/Register";
import Home from "../pages/home/Home";
import Products from "../pages/product/Products";
import Cart from "../pages/Cart";

const Routes = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        }, {
          path: "/",
          element: <Home />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/cart',
          element: <Cart />,
        }
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default Routes;

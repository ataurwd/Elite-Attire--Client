import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../components/ErrorPage";
import Login from "../users/Login";
import Register from "../users/Register";
import Home from "../pages/home/Home";
import Products from "../pages/product/Products";
import Cart from "../pages/Cart";
import Dashoboard from "../layout/Dashoboard";
import ManageOrder from "../dashboard/admin/ManageOrder";
import ManageProduct from './../dashboard/admin/ManageProduct';
import ViewCustomer from './../dashboard/admin/ViewCustomer';
import ManageProfile from './../dashboard/user/ManageProfile';
import OrderHistory from './../dashboard/user/OrderHistory';

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
    {
      path: 'dashboard',
      element: <Dashoboard />,
      children: [
        {
          path: 'mange-order',
          element: <ManageOrder/>,
        },
        {
          path: 'manage-product',
          element: <ManageProduct/>,
        },
        {
          path: 'view-customer',
          element: <ViewCustomer/>,
        },
        {
          path: 'manage-profile',
          element: <ManageProfile/>,
        },
        {
          path: 'order-hoistory',
          element: <OrderHistory/>,
        },
      ]
    }
  ]);
  return <RouterProvider router={route} />;
};

export default Routes;

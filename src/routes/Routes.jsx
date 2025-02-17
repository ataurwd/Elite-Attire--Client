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
import Payment from "../payment/Payment";
import StripePayment from "../payment/StripePayment";
import Wishlist from "../pages/Wishlist";
import AddProduct from "../dashboard/admin/AddProduct";
import UpdateProduct from './../dashboard/admin/UpdateProduct';

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
          path: '/wishlist',
          element: <Wishlist />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/payment',
          element: <StripePayment />,
        }
      ],
    },
    {
      path: 'dashboard',
      element: <Dashoboard />,
      children: [
        {
          path: 'manage-order',
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
        {
          path: 'add-product',
          element: <AddProduct/>,
        },
        {
          path: 'manage-product/update/:id',
          element: <UpdateProduct />,
          loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/products/${params.id}`)
        },
      ]
    }
  ]);
  return <RouterProvider router={route} />;
};

export default Routes;

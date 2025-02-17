import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAllProduct from "../../hooks/useAllProduct";
import Loading from './../../components/Loading';
import useAllWishlist from "../../hooks/useAllWishlist";
const Products = () => {
  const { user } = useContext(FormContext);
  const [product, refetch] = useAllProduct()
  const [wishlist, reload] = useAllWishlist()

  const navigate = useNavigate();
  // Fetch data from API using the "products" queryKey and the queryFn function
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_URL}/products`);
      return response.data;
    },
  });

  // if loading
  if (isLoading) {
    return <Loading/>;
  }
  // add to cart list

  const handleCart = (item) => {
    if (!user) {
      navigate("/login", { state: { from: "/products" } });
      return;
    }

    const data = { item, userEmail: user?.email };

    // sent the product to the databse
    axios
      .post(`${import.meta.env.VITE_URL}/order`, data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Product Added Sucessfully!",
            icon: "success",
          });
          refetch();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  // add to wishlist collection
  const handelWishlist = (item) => {
    if (!user) {
      navigate("/login", { state: { from: "/products" } });
      return;
    }
    const data = { item, email: user?.email };
    axios
    .post(`${import.meta.env.VITE_URL}/wishlist`, data)
    .then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Added to Wishlist!",
          icon: "success",
        });
        reload()
      }
    })
    .catch((error) => {
      console.error(error);
    });

  }
  return (
    <div>
      <h1 className="text-center md:mt-10 mt-3 text-3xl font-bold text-text underline">
        Products
      </h1>
      <div className="px-4 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-5">
        {data?.map((item) => (
          <div
            key={item.id}
            className="w-full space-y-3 rounded-xl bg-white p-4 shadow-lg dark:bg-[#18181B]"
          >
            <div className="relative flex w-full justify-center">
              <img
                width={400}
                height={500}
                className="rounded-lg bg-black/40 object-center h-80"
                src={item.image_url || item.image}
                alt="card navigate ui"
              />
            </div>
            <div className="space-y-2 font-semibold">
              <h6 className="text-sm md:text-base lg:text-lg">
                {item.product_name}
              </h6>
              <p className="text-xs font-semibold text-gray-400 md:text-sm">
                {item.description}
              </p>
              <p className="mt-2 text-sm text-gray-500">
              Category: {item.category}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Material: {item.material}
            </p>
              <p>${item.price}</p>
              <div className="badge badge-outline">{`${
                item.quantity > 0 ? "In Stock" : "Out Of Stock"
              }`}</div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
              <button
                onClick={() => handleCart(item)}
                disabled={item.quantity <= 0}
                className={`rounded-lg bg-primary px-4 py-2  text-white duration-300 hover:scale-95 
                ${item.quantity <= 0 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                Add to Cart
              </button>
              <button onClick={() => handelWishlist(item)} className="rounded-lg bg-text px-4 py-2 text-white duration-300 hover:scale-95">Add To Wishlist</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

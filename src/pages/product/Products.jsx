import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAllProduct from "../../hooks/useAllProduct";
import Loading from './../../components/Loading';
const Products = () => {
  const { user } = useContext(FormContext);
  const [product, refetch] = useAllProduct()

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
            <div className="relative flex h-48 w-full justify-center lg:h-[260px]">
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                {/* love  */}
                <div className="flex items-center">
                  <svg
                    width={30}
                    className="cursor-pointer fill-transparent stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                  </svg>
                </div>
              </div>
              <img
                width={400}
                height={400}
                className="rounded-lg bg-black/40 object-center"
                src={item.image_url}
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
              <p>${item.price}</p>
              <div className="badge badge-outline">{`${
                item.quantity > 0 ? "In Stock" : "Out Of Stock"
              }`}</div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-6 text-sm md:text-base">
              <button
                onClick={() => handleCart(item)}
                disabled={item.quantity <= 0}
                className={`rounded-lg bg-primary px-4 py-2 font-semibold text-white duration-300 hover:scale-95 
                ${item.quantity <= 0 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

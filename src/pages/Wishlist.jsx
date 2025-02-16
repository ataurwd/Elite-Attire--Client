import React from "react";
import useUserProduct from "../hooks/useUserProduct";

const Wishlist = () => {
  const [userProduct, wishlistData] = useUserProduct();
  return (
    <div className="px-4 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-5">
      {wishlistData.map((data) => (
        <div
          key={data._id}
          className=" rounded overflow-hidden shadow-lg border border-gray-300"
        >
          <img
            className="w-full h-80"
            src={data.item.image_url}
            alt={data.item.product_name}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {data.item.product_name}
            </h2>
            <p className="text-sm text-gray-600">{data.item.description}</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              ${data.item.price}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Category: {data.item.category}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Material: {data.item.material}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Available Colors: {data.item.color_options.join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;

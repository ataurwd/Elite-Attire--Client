import React from "react";
import useUserProduct from "./../hooks/useUserProduct";

const Cart = () => {
  const [userProduct] = useUserProduct();
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 px-20 mt-10">
      <div className="min-h-screen col-span-2">
        <h2 className="text-3xl text-left">Cart</h2>
        {userProduct.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg shadow-lg bg-white grid grid-cols-3 gap-4 items-center my-3"
          >
            {/* Image Section */}
            <div className="flex justify-center">
              <img
                src={product.item.image_url}
                alt={product.item.product_name}
                className="h-32 w-32 object-cover rounded-md"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.item.product_name}
              </h3>
              <p className="text-gray-600 text-sm">
                Price:{" "}
                <span className="font-medium text-gray-900">
                  ${product.item.price}
                </span>
              </p>
            </div>

            {/* Delete Button */}
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
          <div>
              
      </div>
    </div>
  );
};

export default Cart;

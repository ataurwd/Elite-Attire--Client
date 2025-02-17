import React from "react";
import useUserProduct from "./../hooks/useUserProduct";
import Payment from "../payment/Payment";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Cart = () => {
  const [userProduct, wishlistData, refetch] = useUserProduct();
  const totalPayment = userProduct.reduce(
    (sum, product) => sum + (product.item.price || 0),
    0
  );


  // to delete card item

  const handleDeleteProduct = async(id) => { 
    const response = await axios.delete(`${import.meta.env.VITE_URL}/allProduct/${id}`)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if(response.data.deletedCount === 1){
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          refetch();
        }
      }
    });
 
  }
  return (
    <div className="px-20 my-10">
      <h2 className="text-3xl text-left mb-6">Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Product List */}
        {userProduct.length > 0 ? (
          <>
            {" "}
            <div className="space-y-6">
              {userProduct.map((product) => (
                <div
                  key={product._id}
                  className="border p-4 rounded-lg shadow-lg bg-white grid grid-cols-3 gap-4 items-center"
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
                    <button onClick={() => handleDeleteProduct(product._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow-md">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>No Item Here..</h1>
          </>
        )}

        {userProduct.length > 0 ? (
          <>
            {" "}
            {/* Right Column: Cart Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Order Summary
                </h3>
                <div className="my-4">
                  <p className="text-lg text-gray-700">
                    Total Payment:{" "}
                    <span className="font-bold text-gray-900">
                      ${totalPayment.toFixed(2)}
                    </span>
                  </p>

                  <div className="flex">
                    <Link
                      to="/payment"
                      className="btn bg-primary text-white mt-6 py-2 rounded-md transition duration-300"
                    >
                      Pay Now
                    </Link>
                    <button className="btn bg-text text-white mt-6 py-2 rounded-md transition duration-300">
                      Cash on delivery
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cart;

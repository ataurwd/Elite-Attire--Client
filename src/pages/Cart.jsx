import React, { useContext, useState } from "react";
import useUserProduct from "./../hooks/useUserProduct";
import Payment from "../payment/Payment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FormContext } from "../context/AuthContext";
import useAllPayment from "../hooks/useAllPayment";

const Cart = () => {
  const { user } = useContext(FormContext);
  const [openModal, setOpenModal] = useState(false);
  const [userProduct, wishlistData, refetch] = useUserProduct();
  const navigate = useNavigate()
  const [payment, reFetch, isLoading] = useAllPayment()



  const totalPayment = userProduct.reduce(
    (sum, product) => sum + (product.item.price || 0),
    0
  );

  const payAmmount = totalPayment?.toFixed(2) 
  // to delete card item

  const handleDeleteProduct = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_URL}/allProduct/${id}`
    );
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (response.data.deletedCount === 1) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };


  // to handel cash of delevery database
  const handelCashOnDevelery = async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const address = form.address.value;
    const status = "pending";
    const formdata = {name, email, address, amount: totalPayment, status};
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/payment`,
        formdata
      );

      if (res.data.insertedId) {
        // If payment is successfully inserted, delete all orders for the user
        await axios.delete(
          `${import.meta.env.VITE_URL}/allProduct/email/${user?.email}`
        );
        refetch()
        reFetch();
        navigate("/dashboard/order-hoistory");
        console.log("Orders deleted successfully");
      }
    } catch (error) {
      console.error("Error processing payment or deleting orders:", error);
    }
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
                      src={product.item.image_url || product.item.image}
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
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow-md"
                    >
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
                      ${payAmmount}
                    </span>
                  </p>

                  <div className="flex">
                    <Link
                      to="/payment"
                      className="btn bg-primary text-white mt-6 py-2 rounded-md transition duration-300"
                    >
                      Pay Now
                    </Link>
                    <button
                      onClick={() => setOpenModal(true)}
                      className="btn bg-text text-white mt-6 py-2 rounded-md transition duration-300"
                    >
                      Cash on delivery
                    </button>

                    {/* modal  */}
                    <div className="mx-auto w-fit">
                      <div
                        onClick={() => setOpenModal(false)}
                        className={`fixed z-[100] w-screen ${
                          openModal
                            ? "visible opacity-100"
                            : "invisible opacity-0"
                        } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
                      >
                        <div
                          onClick={(e_) => e_.stopPropagation()}
                          className={`absolute max-w-xl rounded-lg bg-white p-6 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${
                            openModal
                              ? "opacity-1 duration-300"
                              : "scale-110 opacity-0 duration-150"
                          }`}
                        >
                          <svg
                            onClick={() => setOpenModal(false)}
                            className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                          </svg>
                          <h1 className="mb-2 text-2xl font-semibold">
                            Welcome to NavigateUI!
                          </h1>
                          <form onSubmit={handelCashOnDevelery} className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Name
                              </label>
                              <input
                                value={user?.displayName}
                                name="name"
                                className="bg-transparent flex h-10 w-full rounded-md border px-3"
                                placeholder="Enter your name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Email
                              </label>
                              <input
                                name="email"
                                className="bg-transparent flex h-10 w-full rounded-md border px-3"
                                placeholder=""
                                value={user.email}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Address
                              </label>
                              <input
                                name="address"
                                className="bg-transparent flex h-10 w-full rounded-md border px-3"
                                placeholder="Enter your address"
                              />
                            </div>

                          
                            <button
                              onClick={() => setOpenModal(false)}
                              className="rounded-md bg-primary px-6 py-[6px] text-white hover:bg-emerald-700"
                            >
                              Order
                            </button>
                          </form>
                          <div className="flex justify-end gap-2 mt-4">
  
                          </div>
                        </div>
                      </div>
                    </div>
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

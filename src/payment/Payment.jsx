import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FormContext } from "../context/AuthContext";
import useUserProduct from "../hooks/useUserProduct";

const Payment = () => {
  const [clientSecrate, setClientSecrate] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(FormContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [userProduct] = useUserProduct();
  const totalPayment = userProduct.reduce(
    (sum, product) => sum + (product.item.price || 0),
    0
  );
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_URL}/stripe-payment-add`, {
        price: totalPayment,
      })
      .then((res) => {
        setClientSecrate(res.data.clientSecret);
      });
  }, [totalPayment]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    // Start loading when payment processing begins
    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: card,
      });

      if (error) {
        console.error("Error creating payment method:", error);
        setLoading(false);
        return;
      }

      const { paymentIntent, error: cardErrr } =
        await stripe.confirmCardPayment(clientSecrate, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "default@example.com",
              name: user?.displayName || "Anonymous",
            },
          },
        });

      if (cardErrr) {
        setLoading(false);
        return;
      }
      // console.log("Payment sucessfull", paymentIntent.created, paymentIntent.amount)
      if (paymentIntent.status === "succeeded") {
        Swal.fire({
          title: "Payment Successful",
          icon: "success",
          draggable: false,
        });
        const address = e.target.address.value;
        const paymentInfor = {
          paymentMethodId: paymentMethod.created,
          amount: paymentIntent.amount,
          userEmail: user?.email,
          userName: user?.displayName,
          address,
        };
        // To save payment information
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_URL}/payment`,
            paymentInfor
          );

          if (res.data.insertedId) {
            // If payment is successfully inserted, delete all orders for the user
            await axios.delete(
              `${import.meta.env.VITE_URL}/allProduct/${user?.email}`
            );
            console.log("Orders deleted successfully");
          }
        } catch (error) {
          console.error("Error processing payment or deleting orders:", error);
        }

        // Navigate to order history page
        navigate("/dashboard/order-hoistory");
      }
    } catch (err) {
      console.error("Payment processing error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Payment Information
      </h2>
      <form onSubmit={handleFormSubmit}>
        {/* Card Details */}
        <div className="mb-6">
          <label
            htmlFor="card"
            className="block text-gray-700 font-medium mb-2"
          >
            Credit Card Information
          </label>
          <div className="p-3 border rounded-md shadow-sm bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <CardElement
              id="card"
              iconStyle="solid"
              style={{
                base: {
                  iconColor: "#c4f0ff",
                  color: "#000",
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  fontSmoothing: "antialiased",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  iconColor: "#FFC7EE",
                  color: "#FFC7EE",
                },
              }}
            />
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Shipping Address
          </label>
          <input
            type="text"
            name="address"
            className="w-full p-3 border rounded-md shadow-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=" shipping address"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-primary text-white hover:bg-green-400"
            }`}
            disabled={!stripe || !clientSecrate || loading}
          >
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;

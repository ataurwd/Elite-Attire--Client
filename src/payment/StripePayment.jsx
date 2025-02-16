import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from "react";
import Payment from "./Payment";

// Load Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRITEKEY);

const StripePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default StripePayment;

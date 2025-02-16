import React from "react";

const Hero = () => {
  return (
    <div className="hero min-h-screen px-4 md:px-8 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-text">
            Elevate Your Style with Premium Mens Fashion
          </h1>
          <p className="py-4 md:py-6 text-gray-700">
            Discover the latest trends in men’s fashion. From casual wear to
            formal outfits, we have everything you need to look your best. Shop
            now and redefine your wardrobe with top-quality styles!
          </p>
          <button className="btn bg-primary text-white">Shop Now</button>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src="https://img.freepik.com/premium-vector/estore-ecommerce-entrepreneur-selling-goods-gaining-profit-digital-platform-brand-development-online-promotion-dropshipping-business-model-flat-vector-illustration_277904-23784.jpg"
            className="max-w-xs md:max-w-sm lg:max-w-md w-full rounded-lg"
            alt="Men's Fashion"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import { FormContext } from "../context/AuthContext";

const Login = () => {
  const { googleLogin, loginUser, user, setUser } = useContext(FormContext);
  const [password, setPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const signInUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((res) => {
        const user = res.user;
        navigate(location?.state ? location.state : "/");
      })
      .catch((er) => {
        toast.error(er.message);
      });
  };

  const googleSignInUser = () => {
    googleLogin()
      .then((res) => {
        Swal.fire({
          title: "sucessfully login",
          icon: "success"
        });
        navigate(location?.state ? location.state : "/");
        const userInfo = {
          email: res.user.email,
          name: res.user.displayName,
          role: "tourist",
          photo: res.user.photoURL,
        };
        // to post user data
        axios
          .post(`${import.meta.env.VITE_URL}/user`, userInfo)
      })
      .catch((er) => {
        toast.error(er.message);
      });
  };

  return (
    <div className="flex mt-[7vh] items-center justify-center dark:bg-gray-900">
      <div className="w-full max-w-lg mx-auto rounded-xl shadow-lg bg-white p-8 mb-[10vh] dark:bg-zinc-800">
        <h2 className="pb-6 text-center text-3xl font-semibold text-primary dark:text-secondary">
          Login Now
        </h2>
        <form className="flex flex-col gap-4" onSubmit={signInUser}>
          {/* Email Input */}
          <input
            className="w-full rounded-lg border border-primary bg-transparent py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-300"
            type="email"
            placeholder="Email"
            name="email"
            required
          />

          {/* Password Input */}
          <div className="relative w-full">
            <input
              className="w-full rounded-lg border border-primary bg-transparent py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-300"
              id="password"
              placeholder="Enter password"
              name="password"
              type={password ? "text" : "password"}
              required
            />
            <div
              className="absolute top-2.5 right-4 cursor-pointer"
              onClick={() => setPassword(!password)}
            >
              {password ? (
                <FaEye size={18} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <FaEyeSlash
                  size={18}
                  className="text-gray-600 dark:text-gray-400"
                />
              )}
            </div>
          </div>

          {/* Create Account Link */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Create one
            </Link>
          </p>

          {/* Login Button */}
          <button
            className="w-full rounded-lg  py-3 bg-primary font-medium"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center">
          <hr className="w-full border-gray-300 dark:border-gray-700" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-4 text-sm text-gray-500 dark:bg-zinc-800 dark:text-gray-400">
            OR
          </span>
        </div>

        {/* Google Login Button */}
        <button
          onClick={googleSignInUser}
          className="mx-auto flex items-center justify-center w-full rounded-lg border border-primary py-3 text-primary hover: dark:text-secondary dark:hover:bg-secondary dark:hover:text-black"
        >
          <span className="pr-2 text-lg">Sign in with</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-6 h-6 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Login;

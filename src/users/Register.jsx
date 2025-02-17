import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { FormContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

const Register = () => {
  const [password, setPassword] = useState(false);

  const { handelRegisterUser, setUser } = useContext(FormContext);
  const navigate = useNavigate();

  const handelRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    // const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Password validation
    if (password.length < 6) {
      Swal.fire({
        title: "Password should be at least 6 characters long.",
        icon: "error",
      });
      return;
    }

    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (!upperCase.test(password)) {
      Swal.fire({
        title: "Password must contain at least one uppercase letter.",
        icon: "error",
      });
      return;
    }
    if (!lowerCase.test(password)) {
      Swal.fire({
        title: "Password must contain at least one lowercase letter.",
        icon: "error",
      });
      return;
    }

    handelRegisterUser(email, password)
      .then((res) => {
        // Post user information to the server
        const userDetails = {
          email: res?.user?.email, // Use the email from the registered user
          name: name,
          role: "user",
          // photo: photoURL,
        };

        // Post user data
        axios
          .post(`${import.meta.env.VITE_URL}/user`, userDetails)
          .then((response) => {
            console.log(response.data); // Handle the server response here
          })
          .catch((error) => {
            console.error("Error posting user data: ", error);
          });

        Swal.fire({
          title: "Successfully Registered",
          icon: "success",
        });
        navigate("/");

        // Update user profile in Firebase
        const profile = {
          displayName: name,
          // photoURL: photoURL,
        };
        updateProfile(auth.currentUser, profile).then(() => {
          setUser((prev) => {
            return { ...prev, displayName: name };
          });
        });
        setUser(res.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${errorMessage} ${errorCode}`);
      });
  };

  return (
    <div className="mx-4 mb-5">
      <div className="max-w-md mx-auto mb-10 mt-[5vh] space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-col space-y-1">
          <h3 className="text-3xl font-bold tracking-tight text-MainBg">
            Register your account
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Please fill in the form to create an account.
          </p>
        </div>
        <div>
          <form onSubmit={handelRegister} className="space-y-6">
            <div className="space-y-2 text-sm">
              <label
                className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                id="name"
                placeholder="Your Name"
                name="name"
                type="text"
                required
              />
            </div>
            <div className="space-y-2 text-sm">
              <label
                className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                htmlFor="photo"
              >
                Phone Number
              </label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                id="photo"
                placeholder="Phone Number"
                name="photo"
                type="text"
                required
              />
            </div>
            <div className="space-y-2 text-sm">
              <label
                className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                htmlFor="email"
              >
                Email
              </label>
              <input
                autoComplete=""
                className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                id="email"
                placeholder="Enter your email"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="space-y-2 text-sm relative">
              <label
                className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                id="password"
                placeholder="Enter password"
                name="password"
                type={password ? "text" : "password"}
                required
              />
              <div onClick={() => setPassword(!password)}>
                {password ? (
                  <p className="absolute top-10 right-5">
                    <FaEye size={18} />
                  </p>
                ) : (
                  <p className="absolute top-10 right-5">
                    <FaEyeSlash size={18} />
                  </p>
                )}
              </div>
            </div>
            <button className="rounded-md w-full px-4 py-2 text-black transition-colors bg-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

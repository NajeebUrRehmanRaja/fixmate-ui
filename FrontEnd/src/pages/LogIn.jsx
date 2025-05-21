import React, { useState } from "react";
import Button from "../components/ButtonComponents";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Eye, EyeClosed } from "lucide-react";
import { GoArrowRight } from "react-icons/go";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is Required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Invalid Email!";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is Required!";
    } else if (formData.password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters long!";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Login Successful!");
    }
  };
  return (
    <div className="flex justify-center bg-gradient-to-r from-blue-600 to-purple-600 h-screen items-center">
      <div className="inline-flex items-center md:gap-10 shadow-2xl p-5 max-h-110 rounded-md bg-gradient-to-r from-blue-700 to-purple-700">
        <div>
          <h1 className="text-2xl">Login/Signup</h1>
          <div className="flex flex-row justify-center items-center space-x-4 md:gap-10 mt-5 mb-5 bg-gradient-to-r">
            <Button className="hover:border flex flex-row justify-center items-center gap-2">
              <FcGoogle className="text-2xl" />
              Login with Google
            </Button>
            <Button className="hover:border flex flex-row justify-center items-center gap-2">
              <FaGithub className="text-2xl" />
              Login with Github
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none focus:border-b-2 focus:bg-blue-600 "
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
                <span className="text-red-400 text-[12px]">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="password">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                className="border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none focus:border-b-2 focus:bg-blue-600 "
                onChange={handleChange}
                value={formData.password}
              />
              {errors.password && (
                <span className="text-red-400 text-[12px]">
                  {errors.password}
                </span>
              )}
              <div
                className="absolute right-3 top-10 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
              </div>
            </div>
            <div className="inline-flex">
              <NavLink to="/ForgetPassword" className="text-[12px]">
                {" "}
                Forgot Password?
              </NavLink>
            </div>
            <div className="flex flex-col justify-center items-end gap-2 ">
              <Button type="submit" className=" border flex items-center hover:border-l-2 hover:border-pink-600">
                Login
                <GoArrowRight className="text-xl pt-1" />
              </Button>
            </div>
            <div className="text-[12px]">
              <p>
                Create new account.
                <NavLink to="/Signup" className="hover:underline pl-1">
                  Signup
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogIn;

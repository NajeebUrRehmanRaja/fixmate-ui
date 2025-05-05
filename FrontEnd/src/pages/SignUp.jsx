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
    firstName: "",
    lastName: "",
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

    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First Name is Required!";
    }
    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last Name is Required!";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is Required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Email is not Valid!";
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
    <div className="flex justify-center items-center h-screen">
      <div className="inline-flex items-center border-2 border-blue-500 rounded-2xl p-3 md:p-5 md:gap-10">
        <div>
          <h1 className="text-2xl">Login/Signup</h1>
          <div className="flex flex-row justify-center items-center space-x-4 md:gap-10 mt-5 mb-5">
            <Button className="hover:shadow-none hover:bg-gray-800 flex flex-row justify-center items-center gap-2">
              <FcGoogle className="text-2xl" />
              Login with Google
            </Button>
            <Button className="hover:shadow-none hover:bg-gray-800 flex flex-row justify-center items-center gap-2">
              <FaGithub className="text-2xl" />
              Login with Github
            </Button>
          </div>

          {/* Only One Form Here */}
          <form
            onSubmit={handleSubmit}
            className="md:flex md:flex-col md:space-y-2"
          >
            <div className="md:flex md:flex-row md:gap-10">
              {/* First Name */}
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  className="bg-gray-700 focus:bg-transparent border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none"
                  onChange={handleChange}
                  value={formData.firstName}
                />
                {errors.firstName && (
                  <span className="text-red-500">{errors.firstName}</span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  className="bg-gray-700 focus:bg-transparent border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none"
                  onChange={handleChange}
                  value={formData.lastName}
                />
                {errors.lastName && (
                  <span className="text-red-500">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="md:flex md:flex-row md:gap-10">
              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="bg-gray-700 focus:bg-transparent border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col relative">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  className="bg-gray-700 focus:bg-transparent border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none"
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
                <div
                  className="absolute right-3 top-10 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col justify-center items-end gap-2 py-5">
              <Button
                type="submit"
                className="hover:bg-gray-800 hover:shadow-none flex items-center gap-2"
              >
                Signup
                <GoArrowRight className="text-xl" />
              </Button>
            </div>
          </form>

          {/* Link to Login */}
          <div className="flex gap-1">
            <p>Already have an account?</p>
            <NavLink to="/Login" className="hover:underline">
              Login
            </NavLink>
          </div>
        </div>

        {/* Image Section */}
        <div>
          <img
            src="../../public/assets/login-pic.png"
            alt="Pic"
            className="md:w-120 h-100 md:rounded-2xl hidden md:block"
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;

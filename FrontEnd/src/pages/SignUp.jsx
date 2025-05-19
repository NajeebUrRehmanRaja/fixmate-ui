import React, { useState } from "react";
import Button from "../components/ButtonComponents";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Eye, EyeClosed } from "lucide-react";
import { GoArrowRight } from "react-icons/go";

const Signup = () => {
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
      alert("Signup Successful!");
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-r from-blue-600 to-purple-600 h-screen items-center">
      <div className="p-4 rounded-md bg-gradient-to-r from-blue-700 to-purple-700">
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

          <form onSubmit={handleSubmit}>
            <div className="">
              {/* First Name */}
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  className="border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none focus:border-b-2 focus:bg-blue-600 "
                  onChange={handleChange}
                  value={formData.firstName}
                />
                {errors.firstName && (
                  <span className="text-red-400 text-[12px]">
                    {errors.firstName}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  className="border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none focus:border-b-2 focus:bg-blue-600 "
                  onChange={handleChange}
                  value={formData.lastName}
                />
                {errors.lastName && (
                  <span className="text-red-400 text-[12px]">
                    {errors.lastName}
                  </span>
                )}
              </div>
              {/* Email */}
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
                  <span className="text-red-400 text-[12px]">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password */}
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
            </div>
            {/* Submit Button */}
            <div className="flex flex-col justify-center items-end gap-2 p-2">
              <Button type="submit" className="border-none flex items-center">
                Signup
                <GoArrowRight className="text-xl pt-1" />
              </Button>
            </div>
            <div className="flex -mt-3 gap-1 text-[12px]">
              <p>Already have an account?</p>{" "}
              <NavLink to="/Login" className="hover:underline">
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

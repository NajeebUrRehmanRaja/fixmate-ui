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

  return (
    <div className="flex justify-center bg-gradient-to-r from-blue-600 to-purple-600 h-screen items-center">
      <div className="inline-flex items-center md:gap-10 shadow-2xl p-5 max-h-110 rounded-md bg-gradient-to-r from-blue-700 to-purple-700">
        <div>
          <h1 className="text-2xl">Login/Signup</h1>
          <div className="flex flex-row justify-center items-center space-x-4 md:gap-10 mt-5 mb-5 bg-gradient-to-r">
            <Button className="border-none shadow-blue-300  flex flex-row justify-center items-center gap-2">
              <FcGoogle className="text-2xl" />
              Login with Google
            </Button>
            <Button className="shadow-blue-300 border-none flex flex-row justify-center items-center gap-2">
              <FaGithub className="text-2xl" />
              Login with Github
            </Button>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none focus:border-b-2 focus:bg-blue-600 "
              />
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="password">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none focus:border-b-2 focus:bg-blue-600 "
              />

              <div
                className="absolute right-3 top-10 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
              </div>
            </div>
          </div>
          <div className="inline-flex">
            <NavLink to="/ForgetPassword" className="text-[12px]">
              {" "}
              Forgot Password?
            </NavLink>
          </div>
          <div className="flex flex-col justify-center items-end gap-2 ">
            <Button className="border-none flex items-center">
              Login
              <GoArrowRight className="text-xl pt-1" />
            </Button>
          </div>
          <div className="text-[12px]">
            <p>
              Create new account.
              <NavLink to="/SignUp" className="hover:underline pl-1">
                Signup
              </NavLink>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LogIn;

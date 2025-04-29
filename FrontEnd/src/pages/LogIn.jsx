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
    <div className="flex justify-center mt-16">
      <div className="inline-flex items-center border-2 border-blue-500 rounded-2xl p-5 md:gap-10">
        <div>
          <h1 className="text-2xl">Login/Signup</h1>
          <div className="flex flex-row justify-center items-center space-x-4 md:gap-10 mt-5 mb-5">
            <Button className="hover:shadow-none hover:bg-gray-700 flex flex-row justify-center items-center gap-2">
              <FcGoogle className="text-2xl" />
              Login with Google
            </Button>
            <Button className="hover:shadow-none hover:bg-gray-700 flex flex-row justify-center items-center gap-2">
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
                className="bg-gray-700 focus:bg-transparent border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none  "
              />
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="password">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="bg-gray-700 focus:bg-transparent border-b border-b-blue-500 p-2 rounded-md min-h-13 focus:outline-none  "
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
            <NavLink to="/ForgetPassword" className="text-[12px]"> Forgot Password?</NavLink>
          </div>
          <div className="flex flex-col justify-center items-end gap-2 py-5">
            <Button className="hover:bg-gray-700 hover:shadow-none flex items-center gap-2">
              Login
              <GoArrowRight className="text-xl" />
            </Button>
          </div>
          <div>
            <p>
              Create new account.
              <NavLink to="/SignUp" className="hover:underline pl-1">
                Signup
              </NavLink>
            </p>
          </div>
        </div>

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

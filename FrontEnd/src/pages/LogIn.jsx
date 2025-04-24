import React from "react";
import Button from "../components/ButtonComponents";
// import Link from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";

const LogIn = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="inline-flex items-center border-2 border-blue-500 rounded-2xl p-5 gap-10">
        <div className="">
          <h1 className="text-2xl">Login/Signup</h1>
          <div className=" flex flex-row justify-center items-center space-x-4 gap-10 mt-5 mb-5">
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              onFocus=""
              className="bg-gray-500 p-2 rounded-md min-h-13
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-500 p-2 rounded-md min-h-13  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col justify-center items-end gap-2 py-5">
            <Button className="hover:bg-gray-700 hover:shadow-none flex items-center gap-2 ">
              Login
              <GoArrowRight className="text-xl" />
            </Button>
          </div>
          <p>Create Account?</p>
        </div>
        <div>
          <img
            src="../../public/assets/login-pic.png"
            alt="PIc"
            className="md:w-120 h-100 md:rounded-2xl hidden md:block"
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;

import React from "react";
import Button from "../components/ButtonComponents";
import { FcGoogle } from "react-icons/fc";

const LogIn = () => {
  return (
    <div className="flex flex-col pt-25 justify-center items-center">
      <div>
        <h1 className="text-2xl">Login/Signup</h1>
        <div className=" flex flex-row justify-center items-center space-x-4 gap-10 mt-5 mb-5">
          {<FcGoogle />}
          <Button className="hover:shadow-none hover:bg-gray-700">
            Login with Google
          </Button>
          <Button className="hover:shadow-none hover:bg-gray-700">
            Login with Github
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            onFocus=""
            className="bg-gray-500 p-2 "
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-500 p-2 "
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;

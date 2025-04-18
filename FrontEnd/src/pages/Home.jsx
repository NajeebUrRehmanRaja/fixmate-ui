import React from "react";
import { Link } from "react-router-dom";
import Handlebutton from "../components/ButtonComponents";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-50">
      <div className="flex flex-col items-center justify-center space-y-2 ">
        <h6 className="px-3 py-1 border rounded-full" >
          New Feature: Multi-language Support
        </h6>
        <h1 className="text-3xl flex flex-col justify-center items-center font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          AI-Powered Code Review <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent h-20">
            Detect Bugs Before They Ship
          </span>
        </h1>
      </div>
       <p className="mx-auto flex flex-col justify-center items-center max-w-[700px] text-muted-foreground md:text-xl text-gray-400">
          CodeScribe helps developers write better code with instant automated <span></span>
          code reviews, bug detection, and smart suggestions.
        </p>
        <Link to={"/getstarted"}>
          <button 
          children="Get Started"
          className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 ease-in-out"
          icon="arrow-right cursor-pointer"
           />
        </Link>
    </div>
  );
};

export default Home;

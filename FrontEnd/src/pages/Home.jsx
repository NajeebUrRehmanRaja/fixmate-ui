import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ButtonComponents";
import { GoArrowRight } from "react-icons/go";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-50">
      <div className="flex flex-col items-center justify-center space-y-2 ">
        <h6 className="px-3 py-1 border rounded-full">
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
        CodeScribe helps developers write better code with instant automated{" "}
        <span></span>
        code reviews, bug detection, and smart suggestions.
      </p>
      <Link to={"/getstarted"}>
        <Button variant="primary" className="mt-4 flex flex-row items-center gap-2 hover:gap-3">
          Get started
          <GoArrowRight className="text-2xl " />
        </Button>
      </Link>
    </div>
  );
};

export default Home;

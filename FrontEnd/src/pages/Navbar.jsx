import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import HandleButton from "../components/ButtonComponents";
import { MdMenu, MdClose } from "react-icons/md"; // Import icons

// Utility function to handle active/inactive link styles
const getNavLinkClass = ({ isActive }) =>
  isActive
    ? "text-blue-700 underline underline-offset-5 transition duration-300 "
    : "text-gray-500 hover:text-blue-700";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu

  return (
    <nav className="flex justify-between items-center bg-white p-4 fixed w-full shadow-md z-10">
      {/* Logo */}
      <div>
        <NavLink to="/" className="text-3xl font-bold text-blue-600">
          FixMate
        </NavLink>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex space-x-4 text-gray-800 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}
      >
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={getNavLinkClass}>
          About
        </NavLink>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
        <Link to="/login">
          <HandleButton
            children={"Login"}
            color="blue"
            // onClick={() => {
            //   path = "/login";
            // }}
          />
        </Link>
        <Link to="/getstarted">
          <HandleButton
            children={"Get Started"}
            color="green"
            // onClick={() => {
            //   path = "/getstarted";
            // }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

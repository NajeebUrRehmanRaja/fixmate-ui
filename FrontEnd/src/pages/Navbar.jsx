import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import HandleButton from "../components/ButtonComponents";
import { MdMenu, MdClose } from "react-icons/md"; // Import icons

// Utility function to handle active/inactive link styles
const getNavLinkClass = ({ isActive }) =>
  isActive
    ? "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent underline underline-offset-5 transition duration-300 "
    : "text-white hover:text-gray-300 transition duration-300";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav className="flex justify-between px-24 items-center bg-gradient-to-r from-blue-500 to-purple-500 p-4 fixed w-full shadow-md z-10">
      {/* Logo */}
      <div>
        <NavLink to="/" className="text-3xl font-bold text-white">
          FixMate
        </NavLink>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex space-x-5 text-lg absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}
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
          <HandleButton variant="secondary">Log In</HandleButton>
        </Link>
        <Link to="/getstarted">
          <HandleButton variant="secondary">Log In</HandleButton>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

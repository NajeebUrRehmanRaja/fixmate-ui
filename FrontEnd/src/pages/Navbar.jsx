import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "../components/ButtonComponents";
import { MdMenu, MdClose } from "react-icons/md"; // Import icons
import { GoArrowRight } from "react-icons/go";
import Container from "../components/Container";

// Utility function to handle active/inactive link styles
const getNavLinkClass = ({ isActive }) =>
  isActive
    ? " font-bold underline underline-offset-5 transition duration-300 "
    : "text-white hover:text-gray-300 transition duration-300";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav>
      <Container className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 p-4 fixed h-15 w-full shadow-md z-10">
        {/* Logo */}
        <div>
          <NavLink to="/" className="text-2xl font-bold text-white">
            FixMate
          </NavLink>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white flex  focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex space-x-5 text-lg absolute md:static top-15 p-3 left-0 w-full md:w-auto bg-purple-500 md:bg-transparent shadow-md md:shadow-none`}
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
            <Button
              variant="primary"
              className="border border-gray-300 hover:shadow-none hover:bg-purple-500 "
            >
              Login
            </Button>
          </Link>
          <Link to="/getstarted">
            <Button
              variant="primary"
              className="flex items-center border border-gray-300 gap-2 hover:shadow-none hover:bg-purple-500"
            >
              Get started <GoArrowRight className="text-2xl" />
            </Button>
          </Link>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

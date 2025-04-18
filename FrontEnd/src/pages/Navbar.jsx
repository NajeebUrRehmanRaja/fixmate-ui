import React from "react";
import { NavLink, Link } from "react-router-dom";
import HandleButton from "../components/ButtonComponents";
import { MdOutlineMenuOpen, MdMenu, MdClose } from "react-icons/md"; // Import icons
import { useState } from "react";

// Utility function to handle active/inactive link styles
const getNavLinkClass = ({ isActive }) =>
  isActive
    ? "text-blue-700 underline underline-offset-5 transition duration-300 "
    : "text-gray-500 hover:text-blue-700";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-white p-4 fixed w-full shadow-md z-10">
      <div>
        <NavLink to="/" className="text-3xl font-bold text-blue-600">
          FixMate
        </NavLink>
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} md:flex space-x-4`}>
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={getNavLinkClass}>
          About
        </NavLink>
        <NavLink to="/report" className={getNavLinkClass}>
          Reports
        </NavLink>
      </div>
      <div className="flex space-x-4">
        <Link to="/login">
          <HandleButton
            childern={"Login"}
            color="blue"
            onClick={() => {
              path = "/login";
            }}
          />
        </Link>
        <Link to="/getstarted">
          <HandleButton
            childern={"Get Started"}
            color="red"
            onClick={() => {
              path = "/getstarted";
            }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

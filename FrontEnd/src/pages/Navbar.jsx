import React from "react";
import { Link, NavLink } from "react-router-dom";
import HandleButton from "../components/ButtonComponents";

const Navbar = () => {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-700 font-semibold border-b-2 border-blue-600"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md px-25 py-3 flex justify-between items-center fixed w-full z-10">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        FixMate
      </Link>
      <div className="space-x-6">
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" className={navLinkStyle}>
          About
        </NavLink>
        <NavLink to="/report" className={navLinkStyle}>
          Reports
        </NavLink>
      </div>
      <div className="space-x-4">
        <Link to="/login">
          <HandleButton
            className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            childern="Login"
          />
        </Link>
        <Link to="/getstarted">
          <HandleButton
            className="bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            childern="Get Started"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "../components/ButtonComponents";
import { MdMenu, MdClose } from "react-icons/md";
import Container from "../components/Container";
import { useAuth } from "../hooks/useAuth";
import Avatar from "react-avatar";

// Utility function to handle active/inactive link styles
const getNavLinkClass = ({ isActive }) =>
  isActive
    ? "font-bold underline underline-offset-5 transition duration-300"
    : "text-white hover:text-gray-300 transition duration-300";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();

  return (
    <nav>
      <Container className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 p-4 fixed h-15 w-full shadow-md z-10">
        {/* Logo */}
        <div className="flex justify-center items-center gap-1">
          <NavLink to="/" className="flex gap-1 text-2xl font-bold text-white">
            <img src="../../public/assets/Logo.png" alt="logo" width={30} />
            FixMate
          </NavLink>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/faqs" className={getNavLinkClass}>
            FaQs
          </NavLink>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white flex focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          {!isLoggedIn ? (
            <Link to="/login">
              <Button
                variant="primary"
                className="border hover:border-l-transparent hover:border-r-transparent hover:border-t-transparent hover:shadow-xl hover:border-pink-600 py-2 px-10"
              >
                Login
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/getstarted">
                <Button
                  variant="primary"
                  className="border hover:border-l-transparent hover:border-r-transparent hover:border-t-transparent hover:shadow-xl hover:border-pink-600 py-2 px-10"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/userprofile">
                <Avatar
                  name={user.name || user.email}
                  email={user.email}
                  round={true}
                  className="size-10!"
                />
              </Link>
            </>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

// components/LogoutButton.jsx
import React from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import {
  FiLogOut,
} from "react-icons/fi";
const LogoutButton = () => {
  const { setUser } = useAuth(); // Clear user state after logout

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true } // sends cookies
      );
      setUser(null); // clear logged-in user
      window.location.href = "/"; // redirect to login
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition mt-4"
    >
      <FiLogOut className="mr-3" />
      Logout
    </button>
  );
};

export default LogoutButton;

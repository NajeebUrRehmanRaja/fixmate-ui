// components/LogoutButton.jsx
import React from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

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
      className="mt-4 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer "
    >
      Logout
    </button>
  );
};

export default LogoutButton;

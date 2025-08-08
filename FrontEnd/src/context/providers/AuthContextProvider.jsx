import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { AuthContext } from "../stores/AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCurrentUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/current-user");
      const { user } = res.data;
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Something went wrong while getting current user", error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isCheckingAuth,
    setIsCheckingAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

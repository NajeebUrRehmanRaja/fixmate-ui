import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const AlreadyAuthProvider = ({ children }) => {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  if (isCheckingAuth) return null;

  return !isCheckingAuth && isLoggedIn ? <Navigate to="/" /> : <>{children}</>;
};

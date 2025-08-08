import { useContext } from "react";
import { AuthContext } from "../context/stores/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};

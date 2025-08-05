import axios from "axios";
import { VITE_API_BASE_URL } from "../constants";

const axiosInstance = axios.create({
  baseURL: `${VITE_API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

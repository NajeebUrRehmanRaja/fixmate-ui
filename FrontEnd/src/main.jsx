import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
// import App from './App.jsx'
import AppRoutes from "./routes/AppRoutes.jsx";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
      {/* Sonner toast container */}
      <Toaster richColors position="bottom-left" />
    </BrowserRouter>
  </React.StrictMode>
);

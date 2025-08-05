// import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors closeButton duration={2000} />
    </>
  );
}

export default App;

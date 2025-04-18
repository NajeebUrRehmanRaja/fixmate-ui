import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import Report from "../pages/Report";
import NotFound from "../pages/NotFound";
import GetStarted from "../pages/GetStarted";
import NavbarLayout from "../Layouts/NavbarLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* All routes with navbar */}
      <Route path="/" element={<NavbarLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="report" element={<Report />} />
        <Route path="getstarted" element={<GetStarted />} />
      </Route>

      {/* Route without navbar */}
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

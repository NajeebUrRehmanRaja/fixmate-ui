import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import Report from "../pages/Report";
import NotFound from "../pages/NotFound";
import GetStarted from "../pages/GetStarted";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/report" element={<Report />} />
      <Route path="/getstarted" element={<GetStarted />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default AppRoutes;

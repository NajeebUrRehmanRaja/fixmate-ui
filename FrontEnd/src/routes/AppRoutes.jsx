import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
    <BrowserRouter>
      <Routes>
        <Route path="/" router={<NavbarLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<About />} /> */}
          <Route path="report" element={<Report />} />
          <Route path="getstarted" element={<GetStarted />} />
        </Route>
      </Routes>

      {/* <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />

        <Route path="about" element={<AboutPage />} />
      </Route>

      <Route path="*" element={<NotFound />} /> */}
    </BrowserRouter>
  );
};

export default AppRoutes;

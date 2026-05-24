import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Report from "../pages/Report";
import ForgetPassword from "../pages/ForgetPassword";
import NotFound from "../pages/NotFound";
import GetStarted from "../pages/GetStarted";
import NavbarLayout from "../Layouts/NavbarLayout";
import { AlreadyAuthProvider } from "../components/providers/AlreadyAuthProvider";
import { WithAuthProvider } from "../components/providers/WithAuthProvider";
import UserProfile from "../pages/UserProfile";
import Features from "../pages/Features";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes with navbar */}
        <Route path="/" element={<NavbarLayout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="report" element={<Report />} />
          <Route
            path="userprofile"
            element={
              <WithAuthProvider>
                <UserProfile />
              </WithAuthProvider>
            }
          />
          <Route
            path="getstarted"
            element={
              <WithAuthProvider>
                <GetStarted />
              </WithAuthProvider>
            }
          />
        </Route>

        {/* Route without navbar */}
        <Route
          path="login"
          element={
            <AlreadyAuthProvider>
              <LogIn />
            </AlreadyAuthProvider>
          }
        />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route
          path="signup"
          element={
            <AlreadyAuthProvider>
              <SignUp />
            </AlreadyAuthProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

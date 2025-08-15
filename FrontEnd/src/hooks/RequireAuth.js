import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

const hasAuthCookie = (
  cookieNames = ["auth_token", "token", "accessToken", "jwt"]
) => {
  // ... (keep your existing cookie check logic)
};

export default function RequireAuth({ requiredRole }) {
  const auth = useAuth();
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    // ... (keep your existing auth verification logic)
  }, [auth]);

  const hasRequiredRole =
    !requiredRole || auth?.user?.roles?.includes(requiredRole);

  switch (authStatus) {
    case "checking":
      return <div className="auth-loader">Verifying session...</div>;

    case "authenticated":
      return hasRequiredRole ? (
        <Outlet />
      ) : (
        <Navigate
          to="/unauthorized"
          replace
          state={{ from: location }} // Fixed: Proper object syntax
        />
      );

    default:
      return (
        <Navigate
          to="/login"
          replace
          state={{
            from: location,
            message: "Please login to access this page",
          }}
        />
      );
  }
}

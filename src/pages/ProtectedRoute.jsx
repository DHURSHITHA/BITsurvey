// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = () => {
//   const { currentUser } = useContext(AuthContext);

//   if (currentUser === null) {
//     return <Navigate to="/login" replace />; // Redirect to login if no user
//   }

//   return <Outlet />; // Render protected page if authenticated
// };

// export default ProtectedRoute;
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

export default function ProtectedRoute() {
  const { isAuthenticated, isNavigationValid } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated || !isNavigationValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
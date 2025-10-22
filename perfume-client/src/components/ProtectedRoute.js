import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("auth") === "true";

  return isAuth ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;

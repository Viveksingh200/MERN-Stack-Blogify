import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { userToken } = useAuth();

  return userToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

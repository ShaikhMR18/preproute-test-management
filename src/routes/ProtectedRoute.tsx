import { Navigate, Outlet } from "react-router-dom";
import { STORAGE_KEYS } from "../constants";

const ProtectedRoute = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

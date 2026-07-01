import { Navigate, Outlet } from "react-router-dom";
import { STORAGE_KEYS } from "../constants";

const PublicRoute = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
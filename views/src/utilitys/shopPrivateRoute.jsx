import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

export default function ShopPrivateRoute() {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

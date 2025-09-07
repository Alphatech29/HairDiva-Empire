import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext";

export default function ShopPrivateRoute() {
  const { token } = useContext(AuthContext);

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

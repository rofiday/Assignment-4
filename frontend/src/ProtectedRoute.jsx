/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuthStore from "./stores/useAuthStore";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, roleName } = useAuthStore();
  console.log(roleName);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (allowedRole.length > 0 && !allowedRole.includes(roleName)) {
    return (
      <Navigate to={roleName === "Admin" ? "/admin/dashboard" : "/dashboard"} />
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;

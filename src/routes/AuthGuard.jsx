import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.common.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
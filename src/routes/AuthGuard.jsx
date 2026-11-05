import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.common.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles) {
    return <Outlet />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
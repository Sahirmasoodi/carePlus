import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PatientLayout = () => {
  const { user } = useSelector((state) => state.common.auth);
  if (!user) return <Navigate to="/login" />;

  if (user?.role !== "patient") {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PatientLayout;

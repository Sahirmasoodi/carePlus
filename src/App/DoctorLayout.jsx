import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorLayout = () => {
  const { user } = useSelector((state) => state.common.auth);
  if (!user) return <Navigate to="/login" />;

  if (user?.role !== "doctor") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default DoctorLayout;

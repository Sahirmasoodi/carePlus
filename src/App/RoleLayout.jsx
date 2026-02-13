import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
const RoleLayout = () => {
  const { user } = useSelector((state) => state.common.auth);

  return (
    <>
      <Navbar role={user?.role} />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RoleLayout;

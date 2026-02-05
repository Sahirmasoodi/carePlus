import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const PublicLayout = () => {
  return (
    <>
     <Navbar role="public"/>
      <Outlet />
    </>
  );
};

export default PublicLayout;

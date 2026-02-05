import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";

const RoleLayout = () => {
  const { user } = useSelector((state) => state?.common?.auth);

  if (!user) return <Navigate to="/login" />;

  if (user) {
    return (
      <>
        <Navbar role={user?.role} />
        <Outlet />
        <Footer/>
      </>
    );
  }

  return <Navigate to="/login" />;
};

export default RoleLayout;

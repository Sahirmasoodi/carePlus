import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    <>
      <Navbar role="admin" />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
import { Routes, Route, Navigate } from "react-router-dom";

import AuthGuard from "./AuthGuard";

import PublicLayout from "../layouts/PublicLayout";
import PatientLayout from "../layouts/PatientLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/public/Login";
import AboutUs from "../pages/public/AboutUs";
import ContactUs from "../pages/public/ContactUs";

import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import MyProfile from "../pages/MyProfile";
import MyAppointments from "../pages/MyAppoinments";

import DoctorHome from "../pages/doctor/DoctorHome";

import ErrorPage from "../pages/ErrorPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PatientHome from "../pages/patient/PatientHome";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Route>

      {/* Patient Routes */}
      <Route element={<AuthGuard allowedRoles={["patient"]} />}>
        <Route element={<PatientLayout />}>
          <Route path="/patient/home" element={<PatientHome />} />
          <Route path="/doctors/:speciality?" element={<Doctors />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Route>
      </Route>

      {/* Doctor Routes */}
      <Route element={<AuthGuard allowedRoles={["doctor"]} />}>
        <Route element={<DoctorLayout />}>
          <Route path="/doctor/dashboard" element={<DoctorHome />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<AuthGuard allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Error */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;

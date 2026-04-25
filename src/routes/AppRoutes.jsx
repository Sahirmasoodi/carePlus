import { Routes, Route } from "react-router-dom";
import AuthGuard from "./AuthGuard";

/* Layouts */
import PublicLayout from "../layouts/PublicLayout";
import PatientLayout from "../layouts/PatientLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";

/* Public Pages */
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import AboutUs from "../pages/public/AboutUs";
import ContactUs from "../pages/public/ContactUs";

/* Shared Pages */
import MyProfile from "../pages/common/MyProfile";
import SocketChat from "../pages/common/SocketChat";

/* Patient Pages */
import PatientHome from "../pages/patient/PatientHome";
import Doctors from "../pages/patient/Doctors";
import MyAppointments from "../pages/patient/MyAppoinments";
import CreateAppointment from "../pages/patient/CreateAppointment";

/* Doctor Pages */
import DoctorHome from "../pages/doctor/DoctorHome";
import DocAppointment from "../pages/doctor/Appointment";

/* Admin */
import AdminDashboard from "../pages/admin/AdminDashboard";

/* Error */
import ErrorPage from "../pages/ErrorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Route>

      {/* ───── SHARED (PATIENT + DOCTOR) ───── */}
      <Route element={<AuthGuard allowedRoles={["patient", "doctor"]} />}>
        <Route path="/chat/:toUserId" element={<SocketChat />} />
      </Route>

      {/* ───── SHARED (ALL LOGGED IN USERS) ───── */}
      <Route element={<AuthGuard />}>
        <Route path="/profile" element={<MyProfile />} />
      </Route>

      <Route element={<AuthGuard allowedRoles={["patient"]} />}>
        <Route element={<PatientLayout />}>
          <Route path="/patient/home" element={<PatientHome />} />
          <Route path="/doctors/:speciality?" element={<Doctors />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route
            path="/create_appointment/:doctorId"
            element={<CreateAppointment />}
          />
        </Route>
      </Route>

      {/* ───── DOCTOR ───── */}
      <Route element={<AuthGuard allowedRoles={["doctor"]} />}>
        <Route element={<DoctorLayout />}>
          <Route path="/doc/dashboard" element={<DoctorHome />} />
          <Route path="/doc/appointments" element={<DocAppointment />} />
        </Route>
      </Route>

      {/* ───── ADMIN ───── */}
      <Route element={<AuthGuard allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* ───── FALLBACK ───── */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;

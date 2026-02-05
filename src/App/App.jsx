import { Route, Routes } from "react-router-dom";
import AboutUs from "../pages/public/AboutUs";
import Home from "../pages/Home";
import ContactUs from "../pages/public/ContactUs";
import Login from "../pages/public/Login";
import MyProfile from "../pages/MyProfile";
import MyAppoinments from "../pages/MyAppoinments";
import Doctors from "../pages/Doctors";
import Appointment from "../pages/doctor/Appointment";
import PublicLayout from "./PublicLayout";
import DoctorLayout from "./DoctorLayout";
import ErrorPage from "../pages/ErrorPage";
import PatientLayout from "./PatientLayout";
import { Navigate } from "react-router-dom";
import RoleLayout from "./RoleLayout";
import DoctorHome from "../pages/doctor/DoctorHome";

function App() {
  return (
    <div className="mx-10 sm:mx-20">
      {/* <Navbar role={user?.role} /> */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>

        <Route element={<RoleLayout />}>
          <Route element={<PatientLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/doctors/:speciality?" element={<Doctors />} />
          </Route>

          <Route element={<DoctorLayout />}>
            {/* <Route path="/my-appointments/:docId" element={<Appointment />} /> */}
            <Route path="/doc-home" element={<DoctorHome />} />
          </Route>

          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppoinments />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

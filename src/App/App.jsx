import { Route, Routes, Navigate } from "react-router-dom";

import AboutUs from "../pages/public/AboutUs";
import Home from "../pages/Home";
import ContactUs from "../pages/public/ContactUs";
import Login from "../pages/public/Login";
import MyProfile from "../pages/MyProfile";
import MyAppoinments from "../pages/MyAppoinments";
import Doctors from "../pages/Doctors";
import DoctorHome from "../pages/doctor/DoctorHome";
import ErrorPage from "../pages/ErrorPage";
import PublicLayout from "./PublicLayout";
import DoctorLayout from "./DoctorLayout";
import PatientLayout from "./PatientLayout";
import RoleLayout from "./RoleLayout";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="mx-10 sm:mx-20">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={["patient", "doctor"]} />} >
          <Route element={<RoleLayout />}>
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-appointments" element={<MyAppoinments />} />

            <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
              <Route element={<PatientLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/doctors/:speciality?" element={<Doctors />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
              <Route element={<DoctorLayout />}>
                <Route path="/doc-home" element={<DoctorHome />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

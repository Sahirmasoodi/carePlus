import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoute";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import PublicHome from "./pages/PublicHome";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import HospitalsPage from "./pages/HospitalsPage";
import PeoplePage from "./pages/PeoplePage";
import AppointmentsPage from "./pages/AppointmentsPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import MessagesPage from "./pages/MessagesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicHome />} />
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <WorkspaceLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route
          path="hospitals"
          element={
            <ProtectedRoute roles={["superadmin"]}>
              <HospitalsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="people"
          element={
            <ProtectedRoute roles={["admin"]}>
              <PeoplePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointments"
          element={
            <ProtectedRoute roles={["admin", "doctor", "patient"]}>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="prescriptions"
          element={
            <ProtectedRoute roles={["doctor", "patient"]}>
              <PrescriptionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="messages"
          element={
            <ProtectedRoute roles={["doctor", "patient"]}>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

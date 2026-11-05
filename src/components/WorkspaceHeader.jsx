import { ShieldCheck } from "lucide-react";
import NotificationCenter from "./NotificationCenter";
import { useLocation } from "react-router-dom";
const names = {
  "/workspace": "Overview",
  "/workspace/hospitals": "Hospital network",
  "/workspace/people": "People directory",
  "/workspace/appointments": "Appointments",
  "/workspace/prescriptions": "Prescriptions",
  "/workspace/messages": "Care messages",
};
export default function WorkspaceHeader() {
  const location = useLocation();
  return (
    <header className="workspace-header">
      <div>
        <span className="header-date">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>
        <h1>{names[location.pathname] || "Workspace"}</h1>
      </div>
      <div className="header-tools">
        <span className="secure-label">
          <ShieldCheck size={15} /> Secure workspace
        </span>
        <NotificationCenter />
      </div>
    </header>
  );
}

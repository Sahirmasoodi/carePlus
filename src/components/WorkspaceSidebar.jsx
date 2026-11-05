import {
  Activity,
  CalendarDays,
  ClipboardList,
  FileText,
  Hospital,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Stethoscope,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Brand from "./Brand";
import { useAuth } from "../context/AuthContext";
import { initials, roleLabel } from "../utils/format";
const navByRole = {
  superadmin: [
    ["/workspace", "Overview", LayoutDashboard],
    ["/workspace/hospitals", "Hospitals", Hospital],
  ],
  admin: [
    ["/workspace", "Overview", LayoutDashboard],
    ["/workspace/people", "People", Users],
    ["/workspace/appointments", "Appointments", CalendarDays],
  ],
  doctor: [
    ["/workspace", "Overview", LayoutDashboard],
    ["/workspace/appointments", "Appointments", CalendarDays],
    ["/workspace/prescriptions", "Prescriptions", FileText],
    ["/workspace/messages", "Messages", MessageCircle],
  ],
  patient: [
    ["/workspace", "Overview", LayoutDashboard],
    ["/workspace/appointments", "Appointments", CalendarDays],
    ["/workspace/prescriptions", "Prescriptions", FileText],
    ["/workspace/messages", "Messages", MessageCircle],
  ],
};
export default function WorkspaceSidebar() {
  const { user, hospital, logout } = useAuth();
  return (
    <aside className="workspace-sidebar">
      <Brand />
      <div className="sidebar-label">WORKSPACE</div>
      <div className="tenant-switch">
        <span className="tenant-icon">
          <Hospital size={17} />
        </span>
        <span>
          <b>
            {user.role === "superadmin" ? "CarePlus Network" : hospital?.name}
          </b>
          <small>
            {user.role === "superadmin"
              ? "Platform management"
              : hospital?.city || "Hospital workspace"}
          </small>
        </span>
      </div>
      <div className="sidebar-label nav-label">MENU</div>
      <nav className="sidebar-nav">
        {(navByRole[user.role] || []).map(([to, label, Icon]) => (
          <NavLink key={to} to={to} end={to === "/workspace"}>
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="privacy-note">
          <Activity size={17} />
          <span>
            <b>Private care space</b>
            <small>Your organisation's data stays separate.</small>
          </span>
        </div>
        <button className="account-button">
          <span className="avatar">{initials(user)}</span>
          <span>
            <b>
              {user.firstName} {user.lastName}
            </b>
            <small>{roleLabel(user.role)}</small>
          </span>
          <LogOut size={16} onClick={logout} />
        </button>
      </div>
    </aside>
  );
}

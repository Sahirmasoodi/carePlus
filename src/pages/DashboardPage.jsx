import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Hospital,
  Users,
  UserRound,
  ArrowUpRight,
} from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import AppointmentTable from "../components/AppointmentTable";
import Loading from "../components/Loading";
export default function DashboardPage() {
  const { user, hospital } = useAuth();
  const [data, setData] = useState(null),
    [error, setError] = useState("");
  useEffect(() => {
    api
      .get(
        user.role === "superadmin" ? "/platform/overview" : "/clinic/dashboard",
      )
      .then(setData)
      .catch((e) => setError(e.message));
  }, [user.role]);
  if (error) return <div className="inline-error">{error}</div>;
  if (!data) return <Loading />;
  const d = data;
  if (user.role === "superadmin")
    return (
      <>
        <div className="welcome-panel welcome-platform">
          <div>
            <span className="overline">PLATFORM OVERVIEW</span>
            <h2>Good to see you, {user.firstName}.</h2>
            <p>Here is the pulse of the CarePlus hospital network.</p>
          </div>
          <div className="welcome-orbit">
            <Hospital size={42} />
          </div>
        </div>
        <div className="stats-grid">
          <StatCard
            label="Total hospitals"
            value={d.hospitals}
            note="Across the network"
            icon={Hospital}
          />
          <StatCard
            label="Active workspaces"
            value={d.active}
            note="Operating normally"
            icon={Activity}
            tone="green"
          />
          <StatCard
            label="Suspended"
            value={d.suspended}
            note="Require review"
            icon={Clock3}
            tone="coral"
          />
          <StatCard
            label="Platform users"
            value={d.users}
            note="Doctors, admins and patients"
            icon={Users}
            tone="violet"
          />
        </div>
        <section className="dashboard-feature">
          <div>
            <span className="overline">NETWORK MANAGEMENT</span>
            <h3>Every hospital, one clear view.</h3>
            <p>
              Onboard new hospital partners, manage their subscriptions and
              suspend access when required.
            </p>
          </div>
          <a href="/workspace/hospitals">
            Manage hospital network <ArrowUpRight size={16} />
          </a>
        </section>
      </>
    );
  const title =
    user.role === "admin"
      ? "Your hospital, at a glance"
      : user.role === "doctor"
        ? "Your clinical day, organised"
        : "Your care, all in one place";
  const sub =
    user.role === "admin"
      ? "Manage the people and appointments that keep your hospital moving."
      : user.role === "doctor"
        ? "A clear view of your schedule, patients and treatment records."
        : "Keep track of visits, prescriptions and conversations with your care team.";
  const stats =
    user.role === "admin"
      ? [
          [
            "Appointments",
            d.appointments,
            "In this hospital",
            CalendarDays,
            "blue",
          ],
          ["Awaiting action", d.pending, "Need attention", Clock3, "coral"],
          ["Doctors", d.doctors, "Active care providers", UserRound, "violet"],
          ["Patients", d.patients, "Registered patients", Users, "green"],
        ]
      : user.role === "doctor"
        ? [
            [
              "My appointments",
              d.appointments,
              "Assigned to you",
              CalendarDays,
              "blue",
            ],
            ["Awaiting action", d.pending, "Pending requests", Clock3, "coral"],
            [
              "Completed visits",
              d.completed,
              "Care delivered",
              CheckCircle2,
              "green",
            ],
            [
              "Prescriptions",
              d.prescriptions,
              "Published records",
              FileText,
              "violet",
            ],
          ]
        : [
            [
              "My appointments",
              d.appointments,
              "Your scheduled visits",
              CalendarDays,
              "blue",
            ],
            ["Awaiting action", d.pending, "Pending requests", Clock3, "coral"],
            [
              "Completed visits",
              d.completed,
              "Your care history",
              CheckCircle2,
              "green",
            ],
            [
              "Prescriptions",
              d.prescriptions,
              "Shared by your doctors",
              FileText,
              "violet",
            ],
          ];
  return (
    <>
      <div className="welcome-panel">
        <div>
          <span className="overline">
            {hospital?.name?.toUpperCase() || "CAREPLUS WORKSPACE"}
          </span>
          <h2>
            {title}, {user.firstName}.
          </h2>
          <p>{sub}</p>
        </div>
        <div className="welcome-orbit">
          <span>✚</span>
        </div>
      </div>
      <div className="stats-grid">
        {stats.map(([label, value, note, Icon, tone]) => (
          <StatCard
            key={label}
            label={label}
            value={value}
            note={note}
            icon={Icon}
            tone={tone}
          />
        ))}
      </div>
      <div className="dashboard-columns">
        <section className="content-card">
          <div className="card-heading">
            <div>
              <span className="overline">LATEST UPDATES</span>
              <h3>Recent appointments</h3>
            </div>
            <a href="/workspace/appointments">
              View all <ArrowUpRight size={14} />
            </a>
          </div>
          <AppointmentTable rows={d.recent || []} personRole={user.role} />
        </section>
        <aside className="care-reminder">
          <span className="overline">CAREPLUS NOTE</span>
          <div className="reminder-icon">
            <Activity size={23} />
          </div>
          <h3>
            {user.role === "patient"
              ? "Your health journey deserves clarity."
              : user.role === "doctor"
                ? "Every detail helps deliver better care."
                : "A connected team makes a stronger hospital."}
          </h3>
          <p>
            {user.role === "patient"
              ? "Your appointments and prescriptions are stored in your hospital workspace. Return here whenever you need them."
              : user.role === "doctor"
                ? "Keep your appointment notes and prescriptions up to date so patients can access their next steps."
                : "Keep your staff details and appointment workflows up to date for a smoother patient experience."}
          </p>
        </aside>
      </div>
    </>
  );
}

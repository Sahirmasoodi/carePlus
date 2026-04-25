import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCalendar2Check, BsClockHistory } from "react-icons/bs";
import {
  MdOutlineVideoCall,
  MdOutlineLocationOn,
  MdOutlineMedicalServices,
} from "react-icons/md";
import { HiOutlineUser, HiOutlineChevronRight } from "react-icons/hi";

/* ─── Dummy Data ───────────────────────────────────────── */
const STATS = [
  { label: "Upcoming Appointments", value: "2", color: "indigo" },
  { label: "Total Doctors", value: "3", color: "violet" },
  { label: "Completed Visits", value: "8", color: "emerald" },
  { label: "Pending Reports", value: "1", color: "amber" },
];

const UPCOMING = [
  {
    id: 1,
    doctor: "Dr. Sharma",
    time: "10:00 AM",
    type: "online",
    reason: "General Consultation",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Khan",
    time: "02:30 PM",
    type: "offline",
    reason: "Dental Checkup",
    status: "pending",
  },
];

const DOCTORS = [
  { id: 1, name: "Dr. Sharma", specialization: "Cardiologist" },
  { id: 2, name: "Dr. Khan", specialization: "Dentist" },
];

/* ─── Color Config ─────────────────────────────────────── */
const STAT_COLORS = {
  indigo: "text-indigo-600",
  violet: "text-violet-600",
  emerald: "text-emerald-600",
  amber: "text-amber-600",
};

/* ─── Components ───────────────────────────────────────── */
const StatCard = ({ label, value, color }) => (
  <div className="bg-white rounded-2xl border p-5 shadow-sm">
    <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
    <p className={`text-xl font-bold mt-1 ${STAT_COLORS[color]}`}>{value}</p>
  </div>
);

const AppointmentRow = ({ apt }) => {
  const isOnline = apt.type === "online";

  return (
    <div className="flex items-center gap-4 py-3 border-b last:border-0">
      <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 font-bold">
        {apt.doctor.charAt(0)}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">{apt.doctor}</p>
        <p className="text-xs text-gray-400">{apt.reason}</p>
      </div>

      <div className="text-right text-xs">
        <p className="font-semibold">{apt.time}</p>
        <span className="flex items-center gap-1 text-gray-400 justify-end">
          {isOnline ? <MdOutlineVideoCall /> : <MdOutlineLocationOn />}
          {isOnline ? "Online" : "Clinic"}
        </span>
      </div>
    </div>
  );
};

const DoctorRow = ({ doc }) => (
  <div className="flex items-center gap-4 py-3 border-b last:border-0">
    <div className="w-9 h-9 bg-violet-50 text-violet-500 rounded-xl flex items-center justify-center font-bold">
      {doc.name.charAt(0)}
    </div>

    <div>
      <p className="text-sm font-semibold">{doc.name}</p>
      <p className="text-xs text-gray-400">{doc.specialization}</p>
    </div>
  </div>
);

const QuickAction = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition"
  >
    <span className="text-xl">{icon}</span>
    <span className="text-xs font-semibold">{label}</span>
  </button>
);

/* ─── Main Component ───────────────────────────────────── */
const PatientHome = () => {
  const navigate = useNavigate();
  const profile = useSelector((s) => s.common.profile?.profile);

  const firstName = profile?.firstName || "Patient";

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen py-4">
      <div className="space-y-6">
        {/* ── Welcome Banner ── */}
        <div className="bg-[#606FFD] rounded-3xl p-6 text-white">
          <p className="text-sm opacity-80">{greeting},</p>
          <h1 className="text-2xl font-bold capitalize">{firstName}</h1>
          <p className="text-xs opacity-80 mt-1">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* ── Quick Actions ── */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <p className="text-xs text-gray-400 mb-4 uppercase font-bold">
            Quick Actions
          </p>

          <div className="grid grid-cols-4 gap-3">
            <QuickAction
              icon={<BsCalendar2Check />}
              label="Appointments"
              onClick={() => navigate("/appointments")}
            />
            <QuickAction
              icon={<MdOutlineMedicalServices />}
              label="Doctors"
              onClick={() => navigate("/doctors")}
            />
            <QuickAction
              icon={<BsClockHistory />}
              label="History"
              onClick={() => navigate("/history")}
            />
            <QuickAction
              icon={<HiOutlineUser />}
              label="Profile"
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Appointments */}
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <div className="flex justify-between mb-4">
              <p className="text-xs uppercase text-gray-400 font-bold">
                Upcoming Appointments
              </p>
              <button
                onClick={() => navigate("/appointments")}
                className="text-xs text-indigo-500 flex items-center"
              >
                View all <HiOutlineChevronRight />
              </button>
            </div>

            {UPCOMING.map((apt) => (
              <AppointmentRow key={apt.id} apt={apt} />
            ))}
          </div>

          {/* Doctors */}
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <div className="flex justify-between mb-4">
              <p className="text-xs uppercase text-gray-400 font-bold">
                My Doctors
              </p>
              <button
                onClick={() => navigate("/doctors")}
                className="text-xs text-indigo-500 flex items-center"
              >
                View all <HiOutlineChevronRight />
              </button>
            </div>

            {DOCTORS.map((doc) => (
              <DoctorRow key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;

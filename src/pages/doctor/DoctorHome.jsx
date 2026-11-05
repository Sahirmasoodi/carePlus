import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BsCalendar2Check, BsPatchCheckFill, BsClockHistory,
} from "react-icons/bs";
import {
  MdOutlinePersonSearch, MdOutlineVideoCall,
  MdOutlineLocationOn, MdOutlinePendingActions,
} from "react-icons/md";
import {
  HiOutlineUsers, HiOutlineCurrencyRupee, HiOutlineStar,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { RiStethoscopeLine } from "react-icons/ri";

/* ─── Dummy data ─────────────────────────────────────────────── */
const STATS = [
  { label: "Today's Appointments", value: "8",   icon: <BsCalendar2Check />, color: "indigo" },
  { label: "Total Patients",        value: "124", icon: <HiOutlineUsers />,   color: "violet" },
  { label: "Pending Reviews",       value: "3",   icon: <MdOutlinePendingActions />, color: "amber" },
  { label: "This Month Earnings",   value: "₹42,000", icon: <HiOutlineCurrencyRupee />, color: "emerald" },
];

const UPCOMING = [
  { id: 1, name: "Rahul Sharma",  time: "09:00 AM", type: "online",  reason: "Follow-up checkup",  status: "confirmed" },
  { id: 2, name: "Priya Bhat",   time: "10:30 AM", type: "offline", reason: "Back pain",           status: "confirmed" },
  { id: 3, name: "Arjun Mehta",  time: "12:00 PM", type: "online",  reason: "Fever & cold",        status: "pending"   },
  { id: 4, name: "Sara Khan",    time: "02:00 PM", type: "offline", reason: "Routine checkup",     status: "confirmed" },
  { id: 5, name: "Vikram Nair",  time: "04:30 PM", type: "online",  reason: "Prescription renewal",status: "pending"   },
];

const RECENT_PATIENTS = [
  { id: 1, name: "Aisha Malik",   gender: "female", age: 29, last: "3 days ago",  condition: "Hypertension"   },
  { id: 2, name: "Dev Kapoor",    gender: "male",   age: 45, last: "1 week ago",  condition: "Diabetes Type 2" },
  { id: 3, name: "Meena Reddy",   gender: "female", age: 34, last: "2 weeks ago", condition: "Migraine"        },
];

/* ─── Color maps ─────────────────────────────────────────────── */
const STAT_COLORS = {
  indigo:  { bg: "bg-indigo-50",  text: "text-indigo-500",  icon: "text-indigo-400"  },
  violet:  { bg: "bg-violet-50",  text: "text-violet-600",  icon: "text-violet-400"  },
  amber:   { bg: "bg-amber-50",   text: "text-amber-600",   icon: "text-amber-500"   },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", icon: "text-emerald-500" },
};

const STATUS_MAP = {
  confirmed: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-400 animate-pulse", label: "Confirmed" },
  pending:   { bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-200",   dot: "bg-amber-400",                 label: "Pending"   },
};

/* ─── Sub-components ─────────────────────────────────────────── */
const StatCard = ({ label, value, icon, color }) => {
  const c = STAT_COLORS[color];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
      <div className={`w-11 h-11 rounded-2xl ${c.bg} flex items-center justify-center text-xl ${c.icon} flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className={`text-xl font-extrabold ${c.text} leading-tight`}>{value}</p>
      </div>
    </div>
  );
};

const AppointmentRow = ({ apt }) => {
  const s = STATUS_MAP[apt.status] ?? STATUS_MAP.pending;
  const isOnline = apt.type === "online";
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold text-sm">
        {apt.name.charAt(0)}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{apt.name}</p>
        <p className="text-xs text-gray-400 truncate">{apt.reason}</p>
      </div>
      {/* Time + type */}
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-semibold text-gray-700">{apt.time}</p>
        <span className={`inline-flex items-center gap-1 text-[10px] font-medium
          ${isOnline ? "text-violet-500" : "text-teal-500"}`}>
          {isOnline ? <MdOutlineVideoCall /> : <MdOutlineLocationOn />}
          {isOnline ? "Online" : "In-person"}
        </span>
      </div>
      {/* Status */}
      <span className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full border flex-shrink-0
        ${s.bg} ${s.text} ${s.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        {s.label}
      </span>
    </div>
  );
};

const PatientRow = ({ p }) => (
  <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
      ${p.gender === "female" ? "bg-rose-50 text-rose-400" : "bg-sky-50 text-sky-400"}`}>
      {p.name.charAt(0)}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
      <p className="text-xs text-gray-400">{p.condition}</p>
    </div>
    <div className="text-right flex-shrink-0">
      <p className="text-xs text-gray-400">{p.last}</p>
      <p className="text-xs font-medium text-gray-500">{p.age} yrs</p>
    </div>
  </div>
);

/* ─── Quick action button ────────────────────────────────────── */
const QuickAction = ({ icon, label, onClick, color = "indigo" }) => {
  const colors = {
    indigo:  "bg-indigo-50 text-indigo-500 hover:bg-indigo-100 border-indigo-100",
    violet:  "bg-violet-50 text-violet-500 hover:bg-violet-100 border-violet-100",
    emerald: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-100",
    amber:   "bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-100",
  };
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all active:scale-95 ${colors[color]}`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-semibold leading-tight">{label}</span>
    </button>
  );
};

/* ─── Main ───────────────────────────────────────────────────── */
const DoctorHome = () => {
  const navigate = useNavigate();
  const profile = useSelector((s) => s.common.profile?.profile);

  const firstName = profile?.firstName ?? "Doctor";
  const isVerified = profile?.isVerified ?? false;

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div
      className="min-h-screen py-4"
      
    >
      <div className=" mx-auto space-y-6">

        {/* ── Welcome banner ─────────────────────────── */}
        <div className="bg-[#606FFD] rounded-3xl p-6 flex items-center justify-between overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-white/5 -translate-y-12 translate-x-12" />
          <div className="absolute right-16 bottom-0 w-32 h-32 rounded-full bg-white/5 translate-y-8" />

          <div className="relative z-10">
            <p className="text-indigo-200 text-sm font-medium mb-1">{greeting},</p>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-extrabold text-white capitalize">Dr. {firstName}</h1>
              {isVerified && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full">
                  <BsPatchCheckFill className="text-emerald-300" /> Verified
                </span>
              )}
            </div>
            <p className="text-indigo-200 text-xs mt-1">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl text-white">
              <RiStethoscopeLine />
            </div>
          </div>
        </div>

        {/* ── Stat cards ─────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── Quick actions ──────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Actions</p>
          <div className="grid grid-cols-4 gap-3">
            <QuickAction icon={<BsCalendar2Check />}      label="My Appointments" onClick={() => navigate("/appointments")} color="indigo" />
            <QuickAction icon={<MdOutlinePersonSearch />} label="View Patients"   onClick={() => navigate("/patients")}     color="violet" />
            <QuickAction icon={<BsClockHistory />}        label="History"         onClick={() => navigate("/history")}      color="emerald" />
            <QuickAction icon={<HiOutlineStar />}         label="Reviews"         onClick={() => navigate("/reviews")}      color="amber" />
          </div>
        </div>

        {/* ── Today's schedule + Recent patients ──────── */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* Today's appointments */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Today's Schedule</p>
              <button
                onClick={() => navigate("/appointments")}
                className="inline-flex items-center gap-0.5 text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition"
              >
                View all <HiOutlineChevronRight />
              </button>
            </div>
            <div>
              {UPCOMING.map((apt) => <AppointmentRow key={apt.id} apt={apt} />)}
            </div>
          </div>

          {/* Recent patients + availability */}
          <div className="flex flex-col gap-5">

            {/* Recent patients */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Recent Patients</p>
                <button
                  onClick={() => navigate("/patients")}
                  className="inline-flex items-center gap-0.5 text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition"
                >
                  View all <HiOutlineChevronRight />
                </button>
              </div>
              {RECENT_PATIENTS.map((p) => <PatientRow key={p.id} p={p} />)}
            </div>

            {/* Availability status */}
            <div className={`rounded-3xl border p-5 flex items-center gap-4
              ${profile?.isAvailable
                ? "bg-emerald-50 border-emerald-200"
                : "bg-red-50 border-red-200"}`}>
              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${profile?.isAvailable ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
              <div className="flex-1">
                <p className={`text-sm font-bold ${profile?.isAvailable ? "text-emerald-700" : "text-red-600"}`}>
                  {profile?.isAvailable ? "You are available" : "You are unavailable"}
                </p>
                <p className={`text-xs ${profile?.isAvailable ? "text-emerald-500" : "text-red-400"}`}>
                  {profile?.isAvailable
                    ? "Patients can book appointments"
                    : "Update your profile to accept bookings"}
                </p>
              </div>
              <button
                onClick={() => navigate("/profile")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition
                  ${profile?.isAvailable
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "bg-red-100 text-red-600 hover:bg-red-200"}`}
              >
                Edit
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorHome;
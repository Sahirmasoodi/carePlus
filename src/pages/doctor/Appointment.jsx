import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointmentsThunk } from "../../store/slices/appointments/appointment.thunk";
import MedLoader from "../../components/Loader";
import { BsCalendar2Check } from "react-icons/bs";
import { MdOutlineVideocam } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const formatDay = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const getDuration = (start, end) => {
  const diff = Math.round((new Date(end) - new Date(start)) / 60000);
  return diff >= 60 ? `${Math.floor(diff / 60)}h ${diff % 60}m` : `${diff}m`;
};

const STATUS = {
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    dot: "bg-amber-400",
    label: "Pending",
  },
  confirmed: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    dot: "bg-emerald-400 animate-pulse",
    label: "Confirmed",
  },
  completed: {
    bg: "bg-sky-50",
    text: "text-sky-600",
    border: "border-sky-200",
    dot: "bg-sky-400",
    label: "Completed",
  },
  cancelled: {
    bg: "bg-red-50",
    text: "text-red-500",
    border: "border-red-200",
    dot: "bg-red-400",
    label: "Cancelled",
  },
};

const getStatus = (s) => STATUS[s] || STATUS.pending;

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-4">
    <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
      <BsCalendar2Check className="text-4xl text-indigo-200" />
    </div>
    <div className="text-center">
      <p className="text-gray-700 font-semibold">No patient appointments</p>
      <p className="text-gray-400 text-sm mt-1">
        Your scheduled consultations will appear here
      </p>
    </div>
  </div>
);

const AppointmentCard = ({ apt }) => {
  const navigate = useNavigate();
  const s = getStatus(apt.status);
  const isOnline = apt.consultationType === "online";
  const isCancelled = apt.status === "cancelled";

  return (
    <div
      className={`relative bg-white rounded-3xl border border-gray-100 overflow-hidden
      shadow-sm hover:shadow-xl transition-all duration-300
      ${isCancelled ? "opacity-60" : ""}`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          s.label === "Confirmed"
            ? "bg-emerald-400"
            : s.label === "Pending"
              ? "bg-amber-400"
              : s.label === "Completed"
                ? "bg-sky-400"
                : "bg-red-400"
        }`}
      />

      <div className="pl-6 pr-5 pt-5 pb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="capitalize w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#606FFD] font-bold">
              {apt.patient?.firstName?.charAt(0) || "P"}
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-sm capitalize">
                {apt.patient?.firstName} {apt.patient?.lastName}
              </h3>
              <p className="text-xs text-gray-400">Patient</p>
            </div>
          </div>

          <span
            className={`text-[11px] px-2 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}
          >
            {s.label}
          </span>
        </div>

        <div className="bg-gray-50 rounded-2xl p-3 mb-4 flex justify-between text-center">
          <div>
            <p className="text-xs text-gray-400">Start</p>
            <p className="font-bold text-sm">
              {formatTime(apt.appointmentStartTime)}
            </p>
            <p className="text-xs text-gray-400">
              {formatDay(apt.appointmentStartTime)}
            </p>
          </div>

          <div className="text-xs text-[#606FFD] font-semibold">
            {getDuration(apt.appointmentStartTime, apt.appointmentEndTime)}
          </div>

          <div>
            <p className="text-xs text-gray-400">End</p>
            <p className="font-bold text-sm">
              {formatTime(apt.appointmentEndTime)}
            </p>
            <p className="text-xs text-gray-400">
              {formatDay(apt.appointmentEndTime)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {isOnline ? "Online" : "In Person"}
          </span>

          {apt.reason && (
            <span className="text-xs text-gray-500">{apt.reason}</span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          {apt.status !== "cancelled" && (
            <button
              onClick={() => navigate(`/chat/${apt.doctor?._id}`)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold
                                    text-indigo-600 bg-indigo-50 border border-indigo-100
                                    hover:bg-indigo-100 px-3 py-1.5 rounded-xl
                                    transition-all active:scale-95"
            >
              <IoChatbubbleEllipsesOutline className="text-sm" />
              Chat
            </button>
          )}

          {isOnline && apt.meetingLink && (
            <a
              href={apt.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="bg-[#606FFD] text-white px-3 py-1.5 rounded-xl text-xs"
            >
              <MdOutlineVideocam />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const DoctorAppointments = () => {
  const { appointments, loading } = useSelector(
    (state) => state.common.appointment,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyAppointmentsThunk());
  }, [dispatch]);

  if (loading) return <MedLoader />;

  const statusOrder = ["confirmed", "pending", "completed", "cancelled"];
  const sorted = [...(appointments || [])].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
  );

  return (
    <div className="min-h-screen py-4">
      <div className="mx-auto">
        <div className="mb-8 heading-style">
          <h1 className="text-4xl font-extrabold text-gray-900">
           Patient Appointments
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            View and manage appointments scheduled with your patients
          </p>
        </div>

        {sorted.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {sorted.map((apt) => (
              <AppointmentCard key={apt._id} apt={apt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;

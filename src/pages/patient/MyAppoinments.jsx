import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointmentsThunk } from "../../store/slices/appointments/appointment.thunk";
import MedLoader from "../../components/Loader";
import { BsCalendar2Check } from "react-icons/bs";
import {
  MdOutlineMonitor,
  MdOutlineLocationOn,
  MdOutlineDescription,
  MdOutlineVideocam,
} from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

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

const getStatus = (s) =>
  STATUS[s] ?? {
    bg: "bg-gray-50",
    text: "text-gray-500",
    border: "border-gray-200",
    dot: "bg-gray-400",
    label: s,
  };

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-4">
    <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
      <BsCalendar2Check className="text-4xl text-indigo-200" />
    </div>
    <div className="text-center">
      <p className="text-gray-700 font-semibold text-base">
        No appointments yet
      </p>
      <p className="text-gray-400 text-sm mt-1">
        Your upcoming consultations will appear here
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
                  shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300
                  ${isCancelled ? "opacity-60" : ""}`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          apt.status === "confirmed"
            ? "bg-emerald-400"
            : apt.status === "pending"
              ? "bg-amber-400"
              : apt.status === "completed"
                ? "bg-sky-400"
                : "bg-red-400"
        }`}
      />

      <div className="pl-6 pr-5 pt-5 pb-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-indigo-400">
                {apt.doctor?.firstName?.charAt(0)?.toUpperCase() ?? "D"}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">
                Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}
              </h3>
              {apt.doctor?.speciality && (
                <p className="text-xs text-indigo-500 font-medium capitalize">
                  {apt.doctor.speciality}
                </p>
              )}
              <p className="text-[11px] text-gray-400 mt-0.5">
                Patient: {apt.patient?.firstName} {apt.patient?.lastName}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${s.bg} ${s.text} ${s.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </span>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          {apt.appointmentTime.map((slot, index) => (
            <div
              key={slot._id ?? index}
              className="bg-gray-50 rounded-2xl p-3.5"
            >
              {apt.appointmentTime.length > 1 && (
                <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mb-2">
                  Slot {index + 1}
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                    Start
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {formatTime(slot.appointmentStartTime)}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {formatDay(slot.appointmentStartTime)}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <div className="w-8 h-px bg-gray-200" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                    <div className="w-8 h-px bg-gray-200" />
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {getDuration(
                      slot.appointmentStartTime,
                      slot.appointmentEndTime,
                    )}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                    End
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {formatTime(slot.appointmentEndTime)}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {formatDay(slot.appointmentEndTime)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-xl
            ${isOnline ? "bg-violet-50 text-violet-600 border border-violet-100" : "bg-teal-50 text-teal-600 border border-teal-100"}`}
          >
            {isOnline ? (
              <MdOutlineMonitor className="text-xs" />
            ) : (
              <MdOutlineLocationOn className="text-xs" />
            )}
            {isOnline ? "Online" : "In Person"}
          </span>

          {apt.reason && (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-xl max-w-[200px] truncate">
              <MdOutlineDescription className="text-xs flex-shrink-0" />
              {apt.reason}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[10px] text-gray-300">
            Booked {formatDate(apt.createdAt)}
          </p>

          <div className="flex items-center gap-2">
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

            {isOnline && apt.meetingLink && apt.status !== "cancelled" && (
              <a
                href={apt.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white
                            bg-[#606FFD] hover:opacity-80
           
                           px-3 py-1.5 rounded-xl shadow-sm shadow-indigo-200
                           transition-all active:scale-95"
              >
                <MdOutlineVideocam className="text-sm" />
                Join Meeting
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyAppointments = () => {
  const { appointments, loading } = useSelector(
    (state) => state?.common?.appointment,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyAppointmentsThunk());
  }, [dispatch]);

  if (loading) return <MedLoader />;

  const statusOrder = ["confirmed", "pending", "completed", "cancelled"];
  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  const sorted = [...safeAppointments].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
  );

  const counts = safeAppointments.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen py-4">
      <div className=" mx-auto">
        <div className="mb-8 heading-style">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                My Appointments
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Track and manage your consultations
              </p>
            </div>

            {sorted.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {["confirmed", "pending", "completed", "cancelled"].map((s) =>
                  counts[s] ? (
                    <div key={s} className="text-center">
                      <p className={`text-xl font-bold ${getStatus(s).text}`}>
                        {counts[s]}
                      </p>
                      <p className="text-[11px] text-gray-400 capitalize">
                        {s}
                      </p>
                    </div>
                  ) : null,
                )}
              </div>
            )}
          </div>
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

export default MyAppointments;

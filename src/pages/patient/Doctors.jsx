import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsThunk } from "../../store/slices/patient/patient.thunk";
import { useNavigate } from "react-router-dom";

/* ─── Skeleton card ─────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="rounded-3xl overflow-hidden border border-gray-100 bg-white animate-pulse">
    <div className="h-52 bg-gray-100" />
    <div className="p-5 space-y-3">
      <div className="h-3 w-20 bg-gray-100 rounded-full" />
      <div className="h-4 w-32 bg-gray-200 rounded-full" />
      <div className="h-3 w-24 bg-gray-100 rounded-full" />
      <div className="h-10 bg-gray-100 rounded-2xl mt-4" />
    </div>
  </div>
);

/* ─── Gender avatar fallback ─────────────────────────────────────────── */
const AvatarFallback = ({ gender, name }) => {
  const isFemale = gender === "female";
  return (
    <div
      className={`w-full h-52 flex flex-col items-center justify-center gap-3
        ${isFemale ? "bg-rose-50" : "bg-sky-50"}`}
    >
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold
          ${isFemale ? "bg-rose-100 text-rose-400" : "bg-sky-100 text-sky-400"}`}
      >
        {name?.charAt(0)?.toUpperCase() ?? "D"}
      </div>
      <span
        className={`text-xs font-medium tracking-widest uppercase ${isFemale ? "text-rose-300" : "text-sky-300"}`}
      >
        {isFemale ? "Female" : "Male"} · Doctor
      </span>
    </div>
  );
};

/* ─── Single doctor card ─────────────────────────────────────────────── */
const DoctorCard = ({ doc, onBook }) => {
  const {
    _id,
    firstName = "",
    lastName = "",
    speciality,
    image,
    gender = "male",
    age,
    isAvailable = true,
    isVerified = false,
    qualification = [],
    availableDays = [],
  } = doc;

  const fullName = `Dr. ${firstName} ${lastName}`.trim();
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden
                 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Verified badge */}
      {isVerified && (
        <span
          className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm
                         text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200 shadow-sm"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Verified
        </span>
      )}

      {/* Image / Avatar */}
      <div className="overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={fullName}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <AvatarFallback gender={gender} name={firstName} />
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Availability pill */}
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3
            ${
              isAvailable
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-red-50 text-red-500 border border-red-100"
            }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500 animate-pulse" : "bg-red-400"}`}
          />
          {isAvailable ? "Available Now" : "Unavailable"}
        </span>

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-base capitalize leading-tight truncate">
          {fullName}
        </h3>

        {/* Speciality */}
        {speciality && (
          <p className="text-xs text-indigo-500 font-medium capitalize mt-0.5">
            {speciality}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-3">
          {age && (
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokeLinecap="round"
                />
              </svg>
              {age} yrs
            </span>
          )}
          {gender && (
            <span className="flex items-center gap-1 text-[11px] text-gray-400 capitalize">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M12 12v8M8 16h8" strokeLinecap="round" />
              </svg>
              {gender}
            </span>
          )}
          {qualification.length > 0 && (
            <span className="text-[11px] text-gray-400 truncate">
              {qualification.join(", ")}
            </span>
          )}
        </div>

        {/* Available days */}
        {availableDays.length > 0 && (
          <div className="flex gap-1 mt-3 flex-wrap">
            {dayLabels.map((day, i) => (
              <span
                key={day}
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md
                  ${
                    availableDays.includes(i) || availableDays.includes(day)
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-300"
                  }`}
              >
                {day}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => onBook(_id)}
          disabled={!isAvailable}
          className={`mt-4 w-full py-2.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2
            transition-all duration-200 active:scale-[0.98]
            ${
              isAvailable
                ? "bg-[#5F6FFF] hover:opacity-80 text-white shadow-md shadow-indigo-200"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
        >
          {isAvailable ? "Book Appointment" : "Not Available"}
        </button>
      </div>
    </div>
  );
};

/* ─── Main page ──────────────────────────────────────────────────────── */
const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    doctors = [],
    loading,
    error,
  } = useSelector((store) => store.patient.patient);

  useEffect(() => {
    dispatch(fetchDoctorsThunk());
  }, [dispatch]);

  const available = doctors.filter((d) => d.isAvailable !== false);
  const unavailable = doctors.filter((d) => d.isAvailable === false);

  return (
    <div className="min-h-screen py-4">
      <div className=" mx-auto">
        <div className="mb-10 heading-style">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Find Your Doctor
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Browse verified specialists and book a consultation instantly
              </p>
            </div>
            {!loading && !error && (
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#5F6FFF]">
                    {available.length}
                  </p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                    Available
                  </p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-700">
                    {doctors.length}
                  </p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                    Total
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Loading skeletons ────────────────────── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Error ───────────────────────────────── */}
        {error && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}
        {!loading && !error && doctors.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.2}
              >
                <path
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-gray-400 font-medium">No doctors found</p>
          </div>
        )}

        {!loading && !error && doctors.length > 0 && (
          <>
            {available.length > 0 && (
              <section className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {available.map((doc) => (
                    <DoctorCard
                      key={doc._id}
                      doc={doc}
                      onBook={(id) => navigate(`/create_appointment/${id}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {unavailable.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                  ○ Unavailable · {unavailable.length}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-60">
                  {unavailable.map((doc) => (
                    <DoctorCard
                      key={doc._id}
                      doc={doc}
                      onBook={(id) => navigate(`/create_appointment/${id}`)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Doctors;

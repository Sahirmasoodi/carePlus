import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myAppointments } from "../store/slices/appointments/appointment.thunk";
import MedLoader from "../components/Loader";

const formatDate = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "completed":
      return "bg-blue-100 text-blue-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const MyAppoinments = () => {
  const { appointments, loading } = useSelector(
    (state) => state?.common?.appointment,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myAppointments());
  }, [dispatch]);

  if (loading) {
    return (
      <MedLoader/>
    );
  }

  return (
    <div className="min-h-[80vh] py-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        My Appointments
      </h2>

      {!appointments || appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
          <p className="text-lg">No appointments found</p>
          <p className="text-sm mt-2">
            Your upcoming appointments will appear here
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {appointments.map((apt) => (
            <div
              key={apt._id}
              className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Patient: {apt.patient?.firstName} {apt.patient?.lastName}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(
                    apt.status,
                  )}`}
                >
                  {apt.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Start:</span>{" "}
                  {formatDate(apt.appointmentStartTime)}
                </p>

                <p>
                  <span className="font-medium">End:</span>{" "}
                  {formatDate(apt.appointmentEndTime)}
                </p>

                <p>
                  <span className="font-medium">Type:</span>{" "}
                  <span className="capitalize">{apt.consultationType}</span>
                </p>

                <p>
                  <span className="font-medium">Reason:</span> {apt.reason}
                </p>
              </div>

              {apt.consultationType === "online" && apt.meetingLink && (
                <div className="mt-4">
                  <a
                    href={apt.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    Join Meeting
                  </a>
                </div>
              )}

              <div className="mt-4 text-xs text-gray-400">
                Created: {formatDate(apt.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppoinments;

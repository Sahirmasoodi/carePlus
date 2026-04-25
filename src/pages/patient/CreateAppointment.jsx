import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createAppointmentThunk } from "../../store/slices/appointments/appointment.thunk";

import {
  FiAlertCircle,
  FiMonitor,
  FiMapPin,
  FiLink,
  FiArrowRight,
} from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

const CreateAppointment = () => {
  const { doctorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.common.auth);

  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      consultationType: "online",
    },
  });

  const consultationType = watch("consultationType");
  const reasonValue = watch("reason") || "";

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      doctor: doctorId,
      patient: user?._id,
      status: "pending",
      appointmentStartTime: new Date(data.appointmentStartTime).toISOString(),
      appointmentEndTime: new Date(data.appointmentEndTime).toISOString(),
    };

    const res = await dispatch(
      createAppointmentThunk({ data: payload, token }),
    );

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/my-appointments");
    }
  };

  const now = new Date().toISOString().slice(0, 16);

  return (
    <div className="min-h-screen py-4 ">
      <div className=" mx-auto">
        <div className="mb-8 heading-style">
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-sm text-gray-500 mt-1">
            Schedule your consultation easily
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  {...register("appointmentStartTime", {
                    required: "Start time is required",
                    validate: (value) =>
                      new Date(value) >= new Date() ||
                      "Cannot select past time",
                  })}
                  min={now}
                  className={`w-full px-3 py-2 rounded-xl border text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none transition ${
                    errors.appointmentStartTime
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
                {errors.appointmentStartTime && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle /> {errors.appointmentStartTime.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  {...register("appointmentEndTime", {
                    required: "End time is required",
                    validate: (value, formValues) =>
                      new Date(value) >
                        new Date(formValues.appointmentStartTime) ||
                      "Must be after start time",
                  })}
                  className={`w-full px-3 py-2 rounded-xl border text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none transition ${
                    errors.appointmentEndTime
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
                {errors.appointmentEndTime && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle /> {errors.appointmentEndTime.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block">
                Consultation Type
              </label>

              <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1 gap-1">
                {["online", "offline"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium cursor-pointer transition ${
                      consultationType === type
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      value={type}
                      {...register("consultationType")}
                      className="hidden"
                    />
                    {type === "online" ? <FiMonitor /> : <FiMapPin />}
                    {type === "online" ? "Online" : "In Person"}
                  </label>
                ))}
              </div>
            </div>

            {consultationType === "online" && (
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Meeting Link
                </label>

                <div className="relative">
                  <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    {...register("meetingLink", {
                      required: "Meeting link required",
                    })}
                    placeholder="https://meet.google.com/..."
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none ${
                      errors.meetingLink
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                  />
                </div>

                {errors.meetingLink && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle /> {errors.meetingLink.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-500">
                  Reason
                </label>
                <span className="text-xs text-gray-400">
                  {reasonValue.length}/50
                </span>
              </div>

              <textarea
                rows={3}
                {...register("reason", {
                  maxLength: {
                    value: 50,
                    message: "Max 50 characters allowed",
                  },
                })}
                placeholder="Describe your issue..."
                className={`w-full px-3 py-2 rounded-xl border text-sm bg-gray-50 resize-none focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.reason ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              />

              {errors.reason && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <FiAlertCircle /> {errors.reason.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition ${
                isSubmitting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#5F6FFF] hover:opacity-80 shadow-md"
              }`}
            >
              {isSubmitting ? (
                <>
                  <ImSpinner2 className="animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  Confirm Appointment
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchProfile,
  updateProfileThunk,
  changePasswordThunk,
} from "../../store/slices/profile/profile.thunk";
import {
  resetUpdateStatus,
  resetPasswordStatus,
} from "../../store/slices/profile/profile.slice";
import MedLoader from "../../components/Loader";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineCalendar,
  HiOutlinePencil,
  HiOutlineX,
} from "react-icons/hi";
import { MdOutlineCancel, MdOutlineLock } from "react-icons/md";
import {
  BsGenderMale,
  BsGenderFemale,
  BsPatchCheckFill,
  BsEye,
  BsEyeSlash,
} from "react-icons/bs";
import { RiMedalLine } from "react-icons/ri";

/* ─── Helpers ──────────────────────────────────────────────── */
const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const GenderIcon = ({ gender }) =>
  gender === "female" ? (
    <BsGenderFemale className="text-rose-400" />
  ) : (
    <BsGenderMale className="text-sky-400" />
  );

/* ─── Info row ─────────────────────────────────────────────── */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 py-3.5 border-b border-gray-50 last:border-0">
    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-400 text-base">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 capitalize truncate">
        {value}
      </p>
    </div>
  </div>
);

/* ─── Form field wrapper ───────────────────────────────────── */
const Field = ({ label, error, children }) => (
  <div>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <MdOutlineCancel />
        {error}
      </p>
    )}
  </div>
);

const inputCls = (err) =>
  `w-full text-sm bg-gray-50 border rounded-xl px-3 py-2.5 outline-none transition-all
   focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
   ${err ? "border-red-300 bg-red-50" : "border-gray-200"}`;

/* ─── Modal wrapper ────────────────────────────────────────── */
const Modal = ({ title, onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center px-4"
    style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
  >
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-50">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
        >
          <HiOutlineX className="text-gray-500" />
        </button>
      </div>
      <div className="px-6 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
);

/* ─── Select styling ───────────────────────────────────────── */
const selectStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "32px",
  appearance: "none",
};

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/* ─── Section heading inside modal ─────────────────────────── */
const ModalSection = ({ title }) => (
  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 pt-2 border-t border-gray-100">
    {title}
  </p>
);

/* ─── Edit Profile Modal ────────────────────────────────────── */
const EditProfileModal = ({ profile, onClose }) => {
  const dispatch = useDispatch();
  const { updateLoading, updateError, updateSuccess } = useSelector(
    (s) => s.common.profile,
  );
  const isDoctor = profile?.role === "doctor";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      gender: profile?.gender ?? "male",
      age: profile?.age ?? "",
      phone: profile?.phone ?? "",
      // doctor-only
      specialization: profile?.specialization ?? "",
      department: profile?.department ?? "",
      experience: profile?.experience ?? "",
      licenseNumber: profile?.licenseNumber ?? "",
      isAvailable: profile?.isAvailable ?? false,
      availableDays: profile?.availableDays ?? [],
      availableTime: {
        from: profile?.availableTime?.from ?? "",
        to: profile?.availableTime?.to ?? "",
      },
    },
  });

  const selectedDays = watch("availableDays") ?? [];

  const toggleDay = (day) => {
    const current = watch("availableDays") ?? [];
    setValue(
      "availableDays",
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day],
    );
  };

  useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        onClose();
        dispatch(resetUpdateStatus());
      }, 1000);
    }
  }, [updateSuccess]);

  useEffect(() => () => dispatch(resetUpdateStatus()), []);

  const onSubmit = (data) => {
    // strip doctor-only fields for non-doctors
    const allowed = ["firstName", "lastName", "gender", "age", "phone"];
    const doctorFields = [
      "specialization",
      "department",
      "experience",
      "licenseNumber",
      "isAvailable",
      "availableDays",
      "availableTime",
    ];
    const payload = Object.fromEntries(
      Object.entries(data).filter(
        ([k]) => allowed.includes(k) || (isDoctor && doctorFields.includes(k)),
      ),
    );
    dispatch(updateProfileThunk(payload));
  };

  return (
    <Modal title="Edit Profile" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ── Basic ── */}
        <ModalSection title="Basic Info" />

        <div className="grid grid-cols-2 gap-3">
          <Field label="First Name" error={errors.firstName?.message}>
            <input
              {...register("firstName", { required: "Required" })}
              className={inputCls(errors.firstName)}
            />
          </Field>
          <Field label="Last Name" error={errors.lastName?.message}>
            <input
              {...register("lastName", { required: "Required" })}
              className={inputCls(errors.lastName)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Gender" error={errors.gender?.message}>
            <select
              {...register("gender")}
              style={selectStyle}
              className={inputCls(errors.gender)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </Field>
          <Field label="Age" error={errors.age?.message}>
            <input
              type="number"
              {...register("age", {
                min: { value: 1, message: "Invalid age" },
                max: { value: 120, message: "Invalid age" },
              })}
              className={inputCls(errors.age)}
              placeholder="e.g. 30"
            />
          </Field>
        </div>

        <Field label="Phone" error={errors.phone?.message}>
          <input
            type="tel"
            {...register("phone", {
              pattern: {
                value: /^[0-9+\-\s]{7,15}$/,
                message: "Invalid phone",
              },
            })}
            className={inputCls(errors.phone)}
            placeholder="+91 9876543210"
          />
        </Field>

        {/* ── Doctor-only fields ── */}
        {isDoctor && (
          <>
            <ModalSection title="Professional" />

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Specialization"
                error={errors.specialization?.message}
              >
                <input
                  {...register("specialization")}
                  className={inputCls(errors.specialization)}
                  placeholder="e.g. Cardiology"
                />
              </Field>
              <Field label="Department" error={errors.department?.message}>
                <input
                  {...register("department")}
                  className={inputCls(errors.department)}
                  placeholder="e.g. ICU"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Experience (yrs)"
                error={errors.experience?.message}
              >
                <input
                  type="number"
                  {...register("experience", {
                    min: { value: 0, message: "Invalid" },
                  })}
                  className={inputCls(errors.experience)}
                  placeholder="e.g. 5"
                />
              </Field>
              <Field label="License No." error={errors.licenseNumber?.message}>
                <input
                  {...register("licenseNumber")}
                  className={inputCls(errors.licenseNumber)}
                  placeholder="MCI-XXXXX"
                />
              </Field>
            </div>

            <ModalSection title="Availability" />

            {/* isAvailable toggle */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Available for appointments
                </p>
                <p className="text-xs text-gray-400">
                  Patients can book when enabled
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isAvailable")}
                  className="sr-only peer"
                />
                <div
                  className="w-10 h-6 bg-gray-200 peer-checked:bg-indigo-500 rounded-full transition-all
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                                peer-checked:after:translate-x-4"
                />
              </label>
            </div>

            {/* Available days */}
            <Field label="Available Days">
              <div className="flex flex-wrap gap-2 mt-1">
                {DAYS.map((day) => {
                  const short = day.slice(0, 3);
                  const active = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all
                        ${
                          active
                            ? "bg-indigo-500 text-white border-indigo-500"
                            : "bg-gray-50 text-gray-400 border-gray-200 hover:border-indigo-300 hover:text-indigo-500"
                        }`}
                    >
                      {short}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* Available time */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="From" error={errors.availableTime?.from?.message}>
                <input
                  type="time"
                  {...register("availableTime.from")}
                  className={inputCls(errors.availableTime?.from)}
                />
              </Field>
              <Field label="To" error={errors.availableTime?.to?.message}>
                <input
                  type="time"
                  {...register("availableTime.to")}
                  className={inputCls(errors.availableTime?.to)}
                />
              </Field>
            </div>
          </>
        )}

        {/* Status messages */}
        {updateError && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {updateError}
          </p>
        )}
        {updateSuccess && (
          <p className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 flex items-center gap-1.5">
            <BsPatchCheckFill /> Profile updated successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={updateLoading}
          className="w-full py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all
                     bg-[#606FFD] hover:opacity-80
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
        >
          {updateLoading ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
};

/* ─── Change Password Modal ─────────────────────────────────── */
const ChangePasswordModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { passwordLoading, passwordError, passwordSuccess } = useSelector(
    (s) => s.common.profile,
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (passwordSuccess) {
      reset();
      setTimeout(() => {
        onClose();
        dispatch(resetPasswordStatus());
      }, 1200);
    }
  }, [passwordSuccess]);

  useEffect(() => () => dispatch(resetPasswordStatus()), []);

  const onSubmit = (data) =>
    dispatch(
      changePasswordThunk({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }),
    );

  const PwField = ({ label, show, toggle, reg, err }) => (
    <Field label={label} error={err?.message}>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...reg}
          className={inputCls(err) + " pr-10"}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <BsEyeSlash /> : <BsEye />}
        </button>
      </div>
    </Field>
  );

  return (
    <Modal title="Change Password" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PwField
          label="Current Password"
          show={showOld}
          toggle={() => setShowOld(!showOld)}
          reg={register("oldPassword", { required: "Required" })}
          err={errors.oldPassword}
        />
        <PwField
          label="New Password"
          show={showNew}
          toggle={() => setShowNew(!showNew)}
          reg={register("newPassword", {
            required: "Required",
            minLength: { value: 8, message: "Min 8 characters" },
            validate: (v) =>
              v !== watch("oldPassword") || "Cannot reuse old password",
          })}
          err={errors.newPassword}
        />
        <PwField
          label="Confirm New Password"
          show={showConfirm}
          toggle={() => setShowConfirm(!showConfirm)}
          reg={register("confirmPassword", {
            required: "Required",
            validate: (v) =>
              v === watch("newPassword") || "Passwords don't match",
          })}
          err={errors.confirmPassword}
        />

        {passwordError && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {passwordError}
          </p>
        )}
        {passwordSuccess && (
          <p className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 flex items-center gap-1.5">
            <BsPatchCheckFill /> Password changed successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={passwordLoading}
          className="w-full py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all
                      bg-[#606FFD] hover:opacity-80
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
        >
          {passwordLoading ? "Updating…" : "Update Password"}
        </button>
      </form>
    </Modal>
  );
};

/* ─── No profile ────────────────────────────────────────────── */
const NoProfile = () => (
  <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
      <HiOutlineUser className="text-3xl text-gray-300" />
    </div>
    <p className="text-gray-500 font-medium">No profile data found</p>
  </div>
);

/* ─── Main ──────────────────────────────────────────────────── */
const MyProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((store) => store.common.profile);
  const [showEdit, setShowEdit] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <MedLoader />;
  if (!profile) return <NoProfile />;

  const {
    firstName = "",
    lastName = "",
    email,
    gender,
    role,
    isAvailable,
    isVerified,
    availableDays = [],
    qualification = [],
    createdAt,
    updatedAt,
    phone,
    age,
    department,
    specialization,
    experience,
    licenseNumber,
    availableTime,
    profileImage,
  } = profile;

  const fullName = `${firstName} ${lastName}`.trim();
  const initials = firstName?.charAt(0)?.toUpperCase() ?? "?";
  const isFemale = gender === "female";

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto space-y-5">
        {/* ── Hero card ─────────────────────────────── */}
        <div className="relative bg-white rounded-3xl border border-gray-100 shadow-sm shadow-indigo-100/60 overflow-hidden">
          <div className="h-28 bg-[#606FFD]" />
          <div className="px-6 pb-4">
            <div className="flex items-end justify-between -mt-14 mb-4">
              <div
                className={`w-24 h-24 rounded-3xl border-4 border-white shadow-lg overflow-hidden flex items-center justify-center flex-shrink-0
                ${isFemale ? "bg-rose-100" : "bg-sky-100"}`}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span
                    className={`text-4xl font-extrabold ${isFemale ? "text-rose-400" : "text-indigo-400"}`}
                  >
                    {initials}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 capitalize leading-tight">
                  {fullName}
                </h1>
                <p className="text-sm text-indigo-500 font-medium capitalize mt-0.5">
                  {role}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border
                ${isAvailable ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-500 border-red-100"}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${isAvailable ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
                />
                {isAvailable ? "Available" : "Not Available"}
              </span>
            </div>

            <div className="flex gap-3 pb-2">
              <button
                onClick={() => setShowEdit(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold
                            bg-[#606FFD] hover:opacity-80 text-white
                            shadow-md shadow-indigo-200 transition-all active:scale-[0.98]"
              >
                <HiOutlinePencil /> Edit Profile
              </button>
              <button
                onClick={() => setShowPw(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold
                           bg-gray-50 text-gray-700 border border-gray-200
                           hover:bg-gray-100 transition-all active:scale-[0.98]"
              >
                <MdOutlineLock /> Change Password
              </button>
            </div>
          </div>
        </div>

        {/* ── Personal info ──────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm shadow-indigo-100/40 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Personal Info
          </p>
          <InfoRow
            icon={<HiOutlineMail />}
            label="Email"
            value={email || "—"}
          />
          <InfoRow
            icon={<GenderIcon gender={gender} />}
            label="Gender"
            value={gender || "Not provided"}
          />
          {age && (
            <InfoRow
              icon={<HiOutlineUser />}
              label="Age"
              value={`${age} years`}
            />
          )}
          {phone && (
            <InfoRow icon={<HiOutlineUser />} label="Phone" value={phone} />
          )}
        </div>

        {/* ── Professional ───────────────────────────── */}
        {(department || specialization || experience || licenseNumber) && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm shadow-indigo-100/40 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Professional
            </p>
            {department && (
              <InfoRow
                icon={<HiOutlineShieldCheck />}
                label="Department"
                value={department}
              />
            )}
            {specialization && (
              <InfoRow
                icon={<RiMedalLine />}
                label="Specialization"
                value={specialization}
              />
            )}
            {experience && (
              <InfoRow
                icon={<HiOutlineCalendar />}
                label="Experience"
                value={`${experience} Years`}
              />
            )}
            {licenseNumber && (
              <InfoRow
                icon={<HiOutlineShieldCheck />}
                label="License No."
                value={licenseNumber}
              />
            )}
          </div>
        )}

        {/* ── Qualifications ─────────────────────────── */}
        {qualification.length > 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm shadow-indigo-100/40 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Qualifications
            </p>
            <div className="flex flex-wrap gap-2">
              {qualification.map((q, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-xs font-semibold"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Available days ─────────────────────────── */}
        {availableDays.length > 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm shadow-indigo-100/40 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Available Days
            </p>
            <div className="flex flex-wrap gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                const active = availableDays.some((d) =>
                  d.toLowerCase().startsWith(day.toLowerCase()),
                );
                return (
                  <span
                    key={day}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border
                    ${active ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-gray-50 text-gray-300 border-gray-100"}`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
            {availableTime && (
              <p className="text-xs text-gray-400 mt-3">
                <span className="font-semibold text-gray-600">
                  {availableTime.from}
                </span>
                {" — "}
                <span className="font-semibold text-gray-600">
                  {availableTime.to}
                </span>
              </p>
            )}
          </div>
        )}

        {/* ── Account ────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm shadow-indigo-100/40 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Account
          </p>
          {createdAt && (
            <InfoRow
              icon={<HiOutlineCalendar />}
              label="Member since"
              value={formatDate(createdAt)}
            />
          )}
          {updatedAt && (
            <InfoRow
              icon={<HiOutlineCalendar />}
              label="Last updated"
              value={formatDate(updatedAt)}
            />
          )}
        </div>
      </div>
      {showEdit && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEdit(false)}
        />
      )}
      {showPw && <ChangePasswordModal onClose={() => setShowPw(false)} />}
    </div>
  );
};

export default MyProfile;

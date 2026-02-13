import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../store/slices/profile/profile.thunk";
import MedLoader from "../components/Loader";

const MyProfile = () => {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((store) => store.common.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) {
    return <MedLoader />;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500 text-lg">No profile data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] pt-6">
      <div className=" mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#5F6FFF] to-indigo-600 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-blue-600 uppercase">
                  {profile.firstName?.charAt(0)}
                </span>
              )}
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold capitalize">
                {profile.firstName} {profile.lastName}
              </h2>

              <span className="inline-block mt-2 px-4 py-1 bg-white text-blue-700 text-sm font-semibold rounded-full capitalize">
                {profile.role}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Email" value={profile.email} />
            <InfoCard label="Phone" value={profile.phone || "Not Provided"} />
            <InfoCard label="Gender" value={profile.gender || "Not Provided"} />
            <InfoCard label="Age" value={profile.age || "Not Provided"} />

            {profile.department && (
              <InfoCard label="Department" value={profile.department} />
            )}

            {profile.specialization && (
              <InfoCard label="Specialization" value={profile.specialization} />
            )}

            {profile.experience && (
              <InfoCard
                label="Experience"
                value={`${profile.experience} Years`}
              />
            )}

            {profile.licenseNumber && (
              <InfoCard label="License Number" value={profile.licenseNumber} />
            )}

            <InfoCard
              label="Availability"
              value={profile.isAvailable ? "Available" : "Not Available"}
            />
          </div>

          {profile.availableDays?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Available Days
              </h3>

              <div className="flex flex-wrap gap-2">
                {profile.availableDays.map((day) => (
                  <span
                    key={day}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.availableTime && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Available Time
              </h3>

              <p className="text-gray-600">
                {profile.availableTime.from} - {profile.availableTime.to}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800 capitalize">
        {value}
      </p>
    </div>
  );
};

export default MyProfile;

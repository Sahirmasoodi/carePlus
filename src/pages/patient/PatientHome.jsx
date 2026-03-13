import React from "react";

const PatientHome = () => {
  return (
    <div className="p-6">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>

      {/* Welcome */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <h2 className="text-xl font-semibold text-blue-700">
          Welcome to your health portal
        </h2>
        <p className="text-gray-600 mt-2">
          Here you can manage your appointments, view doctors, and update your profile.
        </p>
      </div>

      {/* Dummy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">Upcoming Appointment</h3>
          <p className="text-gray-500">No upcoming appointments</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">My Doctors</h3>
          <p className="text-gray-500">You have 0 doctors assigned</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">Health Records</h3>
          <p className="text-gray-500">No records uploaded</p>
        </div>

      </div>

    </div>
  );
};

export default PatientHome;
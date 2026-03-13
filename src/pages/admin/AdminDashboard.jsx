import React from "react";
import { FaUserMd, FaUsers, FaCalendarCheck, FaChartLine } from "react-icons/fa";

const stats = [
  {
    title: "Total Doctors",
    value: 24,
    icon: <FaUserMd size={28} />,
    color: "bg-blue-500",
  },
  {
    title: "Total Patients",
    value: 120,
    icon: <FaUsers size={28} />,
    color: "bg-green-500",
  },
  {
    title: "Appointments",
    value: 87,
    icon: <FaCalendarCheck size={28} />,
    color: "bg-purple-500",
  },
  {
    title: "Revenue",
    value: "$12,430",
    icon: <FaChartLine size={28} />,
    color: "bg-orange-500",
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
            </div>

            <div
              className={`${stat.color} text-white p-3 rounded-lg`}
            >
              {stat.icon}
            </div>
          </div>
        ))}

      </div>

      {/* Recent Activity Section */}
      <div className="mt-10 bg-white rounded-xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        <ul className="space-y-3 text-gray-600">
          <li>New patient registered</li>
          <li>Doctor appointment booked</li>
          <li>Doctor profile updated</li>
          <li>Payment received</li>
        </ul>

      </div>
    </div>
  );
};

export default AdminDashboard;
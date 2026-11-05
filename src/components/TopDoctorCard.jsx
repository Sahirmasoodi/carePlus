import React from "react";
import { useNavigate } from "react-router-dom";

const TopDoctorCard = ({ name, image, speciality, id, isAvailable }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden
                 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      <div
        className={`relative overflow-hidden ${isAvailable ? "bg-sky-50" : "bg-gray-50"}`}
      >
        <img
          src={image || "/doc.png"}
          alt={name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-semibold
                      px-2.5 py-1 rounded-full border backdrop-blur-sm
                      ${
                        isAvailable
                          ? "bg-emerald-50/90 text-emerald-600 border-emerald-200"
                          : "bg-red-50/90 text-red-500 border-red-200"
                      }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
          />
          {isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-gray-900 capitalize leading-tight truncate">
          {name}
        </h3>
        {speciality && (
          <p className="text-xs text-indigo-500 font-medium capitalize mt-0.5 truncate">
            {speciality}
          </p>
        )}
      </div>
    </div>
  );
};

export default TopDoctorCard;

import React, { useEffect } from "react";
import TopDoctorCard from "./TopDoctorCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsForHomeThunk } from "../store/slices/public/public.thunk";

const TopDoctors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { doctors, loading, error } = useSelector(
    (store) => store.common.public,
  );

  useEffect(() => {
    dispatch(fetchDoctorsForHomeThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-[#5F6FFF]"></div>
          <p className="text-sm text-gray-500">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="bg-white border border-red-100 shadow-sm rounded-2xl p-6 max-w-md w-full text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-24 flex flex-col items-center gap-5">
      <div>
        <h1 className="text-2xl text-center">Top Doctors to Book</h1>
        <p className="text-sm text-center text-gray-400">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <div className="flex gap-5 flex-wrap justify-evenly md:mx-16">
        {doctors.map((doctor) => {
          const fullName = `${doctor.firstName} ${doctor.lastName}`;

          return (
            <TopDoctorCard
              key={doctor._id}
              id={doctor._id}
              name={fullName}
              image={doctor.image}
              speciality={doctor.specialization || "Not Provided"}
              isAvailable={doctor.isAvailable}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopDoctors;

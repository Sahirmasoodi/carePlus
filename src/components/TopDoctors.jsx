import React, { useEffect } from "react";
import TopDoctorCard from "./TopDoctorCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsThunk } from "../store/slices/public/public.thunk";

const TopDoctors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { doctors, loading, error } = useSelector(
    (store) => store.common.public,
  );

  useEffect(() => {
    dispatch(fetchDoctorsThunk());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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

import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
const SpecialityMenu = () => {
  return (
    <div id="specality" className="mt-24 flex flex-col items-center gap-5">
      <div>
        <h1 className="text-2xl text-center">Find by Speciality</h1>
        <p className="text-sm text-center text-gray-500">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </div>

      <div className=" flex flex-wrap justify-center gap-4">
        {specialityData.map((item) => (
          <div
            key={item.speciality}
            className="hover:-translate-y-3 transition-all duration-500"
          >
            <img className="rounded-full size-20" src={item.image} />
            <p className="text-[10px] text-gray-500">{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;

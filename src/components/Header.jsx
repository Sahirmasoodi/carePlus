import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-primary rounded-lg mt-2 px-5 md:px-16 pt-5">
      {/* Text Section */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center gap-3 py-10 m-auto md:py-[10vw] md:mb-[-30px] text-center md:text-left">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment
          <span className="block">With Trusted Doctors</span>
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white">
          <img
            className="w-18 h-12 rounded-full"
            src={assets.group_profiles}
            alt="Profiles"
          />
          <p className="text-[10px] md:text-sm w-[55%] md:w-[60%]">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
        <div className="bg-white rounded-full px-6 py-3 text-sm text-gray-700 ">
          Book Appointment
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 relative mt-4 md:mt-0">
        <img
          className="w-full h-auto rounded-lg"
          src={assets.header_img}
          alt="Header Image"
        />
      </div>
    </div>
  );
};

export default Header;

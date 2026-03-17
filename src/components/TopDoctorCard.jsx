import React from "react";

const TopDoctorCard = ({ name, image, speciality, id, isAvailable }) => {
  console.log(image);
  
  return (
    <div className="border rounded-lg hover:-translate-y-3 transition-all duration-500 cursor-pointer">
      <div className="bg-blue-100 rounded-t-lg flex justify-center">
        <img className="w-52 min-w-40 h-52 rounded-t-lg" src={image || "/doc.png"}  />
      </div>

      <div className="ps-3 py-4">
        <div
          className={`text-[11px] flex items-center gap-1 ${
            isAvailable ? "text-green-500" : "text-red-500"
          }`}
        >
          <p
            className={`size-1.5 rounded-full ${
              isAvailable ? "bg-green-500" : "bg-red-500"
            }`}
          ></p>
          {isAvailable ? "Available" : "Not Available"}
        </div>

        <h3 className="text-sm text-gray-800 capitalize">{name}</h3>
        <p className="text-[11px] text-gray-400 capitalize">{speciality}</p>
      </div>
    </div>
  );
};

export default TopDoctorCard;

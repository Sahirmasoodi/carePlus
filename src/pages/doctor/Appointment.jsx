// import React, { useEffect, useState } from "react";
// import {
//   assets,
//   doctors,
//   slotDays,
//   timeSlots,
// } from "../../assets/assets_frontend/assets";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addBooking } from "../../store/slices/userSlice";
// import RelatedDoctors from "../../components/RelatedDoctors";

// const Appointment = () => {
//   let { docId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [dayIndex, setDayIndex] = useState();
//   const [timeIndex, setTimeIndex] = useState();
//   const [day, setDay] = useState();
//   const [time, setTime] = useState();
//   const [appointedDoctor] = useState(
//     doctors.filter((doctor) => doctor._id == docId),
//   );
//   const loggedIn = useSelector((state) => state.user.loggedIn);
//   const { name, image, about, fees, speciality, experience, degree } =
//     appointedDoctor[0];

//   function handleSubmit() {
//     if (loggedIn) {
//       dispatch(
//         addBooking({ doctor: appointedDoctor[0], day: day, time: time }),
//       );
//       if (day && time) {
//         alert("Booking successful");
//         navigate("/my-appointments");
//       } else {
//         setError("please select an option");
//       }
//     } else {
//       alert("Signup to book an appointment");
//     }
//   }

//   return (
//     <div>
//       <div className="mt-5 flex flex-col sm:flex-row items-center gap-5 border border-black sm:border-none rounded-lg min-w-80">
//         <div className="bg-primary  sm:min-w-60  rounded-t-lg md:rounded-lg  ">
//           <img className="" src={image} />
//         </div>
//         <div className="md:border border-black md:px-10 md:py-3 p-3 rounded-lg shadow-sm shadow-gray-400 md:min-h-60 ">
//           <div className="flex items-center gap-3">
//             <p className="text-2xl">{name}</p>
//             <img className="size-4" src={assets.verified_icon} />
//           </div>
//           <div className="text-gray-600 flex items-center gap-2">
//             <p>{degree}</p>-<p className="text-sm">{speciality}</p>
//             <p className="border border-black rounded-full px-2 py-1 text-[10px]">
//               {experience}
//             </p>
//           </div>
//           <div>
//             <div className="flex gap-2">
//               About <img src={assets.info_icon} />
//             </div>
//             <p className="text-justify text-gray-600 lg:max-w-[70%] text-sm">
//               {about}
//             </p>
//           </div>
//           <div className="flex gap-1 mt-2">
//             <p className="text-gray-600">Appointment fee:</p>
//             <p>${fees}</p>
//           </div>
//         </div>
//       </div>

//       <p className="text-start mt-10 text-xl"> Booking Slots</p>
//       <div className="flex flex-col  overflow-x-scroll  md:py-5  ">
//         <div className="flex gap-4  sm:ms-0">
//           {slotDays.map((data, index) => (
//             <div
//               onClick={(e) => {
//                 setDay(e.target.innerText);
//                 setDayIndex(index);
//               }}
//               key={index}
//               className={`py-4 border border-black min-w-14 text-center rounded-full ${dayIndex == index && "bg-primary border-none"}`}
//             >
//               {data.day} <br />
//               {data.date}
//             </div>
//           ))}
//         </div>
//         <div className="mt-5 flex gap-2">
//           {timeSlots.map((data, index) => (
//             <div
//               key={index}
//               onClick={(e) => {
//                 setTime(e.target.innerText);
//                 setTimeIndex(index);
//               }}
//               className=""
//             >
//               <p
//                 className={` py-1 border border-black rounded-full min-w-24 text-center ${timeIndex == index && "bg-primary border-none "}`}
//               >
//                 {data}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button
//         onClick={handleSubmit}
//         className="bg-primary text-white px-4 py-2 rounded-full mt-5 w-52 min-w-52"
//       >
//         Book an appointment
//       </button>
//       <p className="text-red-600 text-sm h-3 ms-3">{error}</p>

//       <div>
//         <RelatedDoctors speciality={speciality} doctors={doctors} />
//       </div>
//     </div>
//   );
// };

// export default Appointment;

import React from 'react'

const Appointment = () => {
  return (
    <div className='h-[90vh]'>
      docotr appointedDoctor
    </div>
  )
}

export default Appointment


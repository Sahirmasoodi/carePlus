// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addBooking , removeBooking } from "../store/slices/userSlice";
// import { Link, useNavigate } from "react-router-dom";

// const MyAppoinments = () => {
//   const bookings = useSelector((state) => state.user.booking);
//   const loggedIn = useSelector((state) => state.user.loggedIn);
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   useEffect(()=>{
//     !loggedIn &&
//     navigate('/')
//   },[loggedIn])

//   return (
//     <div className="mt-5 md:mb-[30vh]">
//       <p className="text-xl ">My appointments</p>
//       {bookings  &&
//         bookings.map((booking,index)=>(
//          <div key={booking?.doctor._id+index} className="flex flex-col md:flex-row items-center md:items-end justify-between mt-5 md:mt-10  border rounded-lg p-3 md:p-6 shadow-lg">
//           <div className="flex  flex-col md:flex-row gap-4">
//             <div className="bg-blue-100 rounded-lg">
//               <img className="w-36" src={booking?.doctor.image} />
//             </div>
//             <div>
//               <h3 className="text-md font-semibold text-gray-800">{booking?.doctor?.name}</h3>
//               <p className=" text-gray-500">{booking?.doctor?.speciality}</p>
//              <div className="text-gray-500">
//                 <p className="mt-3">Address:</p>
//                 <p>{booking?.doctor?.address?.line1}</p>
//                 <p>{booking?.doctor?.address?.line2}</p>
//              </div>
//               <div className="mt-3">
//                 <span className="font-semibold me-2">Date & Time:</span>
//                 <span className="text-gray-500 me-1">{booking.day}</span>
//                 <span className="font-bold">|</span>
//                 <span className="text-gray-500 ms-1">{booking.time}</span>
//               </div>
//             </div>
//           </div>
//           <button onClick={()=>dispatch(removeBooking(index))}
//             className="px-4  py-2 h-10 bg-gray-200 hover:bg-gray-400 hover:text-white rounded-sm">Cancel appointment</button>
//         </div>
//         ))

//       }

//       {   bookings.length ==0 && <div className="flex flex-col md:flex-row justify-center items-center md:gap-2 mt-10">
//       <span className=" text-gray-500 text-center">You don't have any appointments at the moment</span>
//       <Link className="font-bold" to={'/doctors'}>Book an appointment?</Link>
//       </div>

//       }

//     </div>
//   );
// };

// export default MyAppoinments;

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myAppointments } from "../store/slices/appointments/appointment.thunk";
const MyAppoinments = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myAppointments());
  }, []);

  return <div className="h-[80vh]">MyAppoinments MyAppoinments</div>;
};

export default MyAppoinments;

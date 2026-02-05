// import React, { useEffect, useState } from "react";
// import { assets } from "../assets/assets_frontend/assets";
// import { useDispatch, useSelector } from "react-redux";
// import { editEmail, editName, editPhone } from "../store/slices/userSlice";
// import { useNavigate } from "react-router-dom";
// const MyProfile = () => {
//   const selector = useSelector((state) => state.user.userData);
//   const loggedIn = useSelector((state) => state.user.loggedIn);
//   const [edit, setEdit] = useState();
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
  
//   // useEffect(()=>{
//   //   !loggedIn && navigate('/home')
//   //  },[selector,loggedIn])
//   return (
//     <div className="flex justify-center">
//       <div className="flex flex-col items-center md:items-start my-10">
//         <img className="w-60 rounded-lg" src={assets.profile_pic} />
//         <div className="w-1/2 min-w-60 mt-5 md:mt-10 flex flex-col gap-4">
//           <div >
//             {edit ? <input className="bg-gray-200 text-2xl h-10" value={selector && selector.fullName} onChange={(e)=>dispatch(editName({fullName:e.target.value}))}/>
//              : <p className="text-2xl underline">{selector.fullName.toUpperCase()}</p>}
//           </div>
//           <div className="text-gray-600">
//             <p className="mb-1 underline t">CONTACT INFORMATION</p>
//             <div className=" flex gap-5 ">
//             <label className="w-12">Email:</label>
//             {edit ? <input className="bg-gray-200" value={ selector && selector.email} onChange={(e)=>dispatch(editEmail({email:e.target.value}))}/>
//              : <p className="">{selector.email}</p>}
//           </div>
//             <div className="w-1/5 flex gap-5">
//             <label className="w-12">Contact:</label>
//             {edit ? <input className="bg-gray-200" value={selector && selector.phone} onChange={(e)=>dispatch(editPhone({phone:e.target.value}))}/>
//              : <p className="">{selector.phone}</p>}
//           </div>
//           </div>
//         </div>
//         <div className="flex gap-4 mt-5">
//           <button className="px-4 py-2 bg-gray-200 hover:bg-gray-400 rounded-sm" onClick={()=>setEdit(true)}>Edit</button>
//           <button className="px-4 py-2 bg-gray-200 hover:bg-gray-400 rounded-sm" onClick={()=>setEdit(false)}>Save Changes</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

import React from 'react'

const MyProfile = () => {
  return (
    <div className='h-[80vh]'>
      MyProfile
MyProfile
    </div>
  )
}

export default MyProfile


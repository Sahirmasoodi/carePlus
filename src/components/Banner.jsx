import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row items-center md:items-end bg-primary rounded-lg px-5 md:px-16  mt-24">
    <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center gap-3  m-auto md:py-[10vw] md:mb-[-30px] text-center md:text-left">
      <div className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
        Book Appointment 
        <span className="block">With 100+ Trusted Doctors</span>
      </div>
      <button onClick={()=>navigate('/login')} className='bg-white px-4 py-2 rounded-full'>Create account</button>
      
    </div>
    <div className="md:w-1/2 relative mt-4 md:mt-0">
      <img className="max-w-96 w-72 md:w-96 rounded-lg md:-mt-4" src={assets.appointment_img} alt="Header Image" />
    </div>
  </div>
  )
}

export default Banner

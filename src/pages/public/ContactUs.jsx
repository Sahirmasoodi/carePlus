import React from "react";
import { assets } from "../../assets/assets_frontend/assets";

const ContactUs = () => {
  return (
    <div className="py-5 min-h-[84vh] md:mt-20">
      <div className="text-2xl text-center mb-5 md:mb-10">
        CONTACT <span className="font-bold">US</span>
      </div>
      <div className="flex gap-7 flex-col md:flex-row justify-center">
        <div>
          <img className="w-80" src={assets.contact_image} />
        </div>
        <div className=" text-gray-500 flex flex-col gap-4">
          <p className="text-black text-lg">Our OFFICE</p>
          <div>
            <p>190001 Lal Chowk</p>
            <p>Suite 350, Srinagar, J&K</p>
          </div>
          <div>
            <p>Tel: 0194-2472365</p>
            <p>Email: prescripto@yahoo.com</p>
          </div>
          <div>
            <p className="text-black text-lg">Careers at PRESCRIPTO</p>
            <p>Learn more about our teams and job openings.</p>
          </div>
          <button className="p-1 md:p-2 border border-black min-w-32 w-36 hover:bg-black hover:text-white">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

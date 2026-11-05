import React from "react";
import { assets } from "../../assets/assets_frontend/assets";

const AboutUs = () => {
  return (
    <div className=" h-[90vh] ">
      <div className="text-2xl text-center my-5">
        ABOUT <span className="font-bold">US</span>
      </div>
      <div className="flex gap-6 flex-col md:flex-row ">
        <div>
          <img className="md:min-w-72" src={assets.about_image} />
        </div>
        <div className="flex flex-col gap-4 md:gap-8 py-7 text-justify text-gray-500 md:overflow-hidden overflow-y-scroll md:max-h-72 text-sm">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <p className="font-bold">Our Vision</p>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="mt-10 md:mt-20">
        <div className="text-xl mb-5">
          Why <span className="font-bold">Choose Us</span>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="p-20 border border-black">
            <p>Efficiency:</p>
            <p className="text-sm text-gray-500 mt-3">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="p-20 border border-black">
            <p>Convenience:</p>
            <p className="text-sm text-gray-500 mt-3">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="p-20 border border-black">
            <p>Personalization:</p>
            <p className="text-sm text-gray-500 mt-3">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 border-t">
      <div className=" mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <img className="w-44 mb-4" src={assets.logo} alt="Prescripto" />
          <p className="text-gray-600 text-sm leading-relaxed">
            Convenient online doctor consultations and prescriptions at your
            fingertips. Book appointments, consult doctors, and manage your
            health records — all from the comfort of your home.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="/home" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="hover:text-primary transition">
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-primary transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-primary transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>+91 7051747966</li>
            <li>prescripto@yahoo.com</li>
            <li>Srinagar, Jammu & Kashmir</li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center text-gray-500 text-sm py-4">
        © {new Date().getFullYear()} Prescripto — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
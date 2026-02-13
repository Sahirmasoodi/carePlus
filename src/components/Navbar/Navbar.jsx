import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { navConfig } from "./navConfig";
import { useDispatch, useSelector } from "react-redux";
import LogoutPopup from "../LogoutPopup";
import { logoutUser } from "../../store/slices/auth/auth.thunk";
import { resetAuthState } from "../../store/slices/auth/auth.slice";

const Navbar = ({ role = "public" }) => {
  const navData = navConfig[role];
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const { user } = useSelector((state) => state?.common?.auth);
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(resetAuthState());
      setShowLogout(false);
      popMessage("Logged out successfully");
    } catch (error) {
      popMessage("Something went wrong");
    }
  };
  return (
    <div className="flex justify-between items-center pt-5 pb-2 border-b border-gray-300 -mx-10 sm:mx-0 ">
      <Link to={"/"}>
        <img className="min-w-40 w-44 mx-2" src={assets.logo} />
      </Link>
      <div className="  hidden  md:flex justify-end gap-x-5 w-1/2">
        {navData?.map((nav, i) => (
          <NavLink key={i} to={nav.path}>
            {nav.label}
          </NavLink>
        ))}
        {user && <button onClick={() => setShowLogout(true)}>Logout</button>}
        {showLogout && (
          <LogoutPopup
            onCancel={() => setShowLogout(false)}
            onConfirm={handleLogout}
          />
        )}
      </div>

      <img
        onClick={() => setShowNav(true)}
        className="w-6 md:hidden absolute right-5 sm:right-20"
        src={assets.menu_icon}
      />
      {/* mobile  */}
      <div
        className={`${showNav ? "fixed w-full" : "h-0 w-0"} md:hidden top-0 bottom-0 right-0 overflow-hidden z-20 transition-all duration-300 bg-background`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Link onClick={() => setShowNav(false)} to={"/"}>
            {" "}
            <img className="w-36" src={assets.logo} />
          </Link>
          <img
            className="w-7"
            onClick={() => setShowNav(false)}
            src={assets.cross_icon}
          />
        </div>
        <ul className="flex flex-col justify-center items-center text-2xl gap-7 mt-5">
          {navData?.map((nav, i) => (
            <NavLink key={i} onClick={() => setShowNav(false)} to={nav.path}>
              {nav.label}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

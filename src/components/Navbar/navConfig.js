export const navConfig = {
  patient: [
    { label: "Home", path: "/patient/home" },
    { label: "Doctors", path: "/doctors" },
    { label: "Appointments", path: "/my-appointments" },
    { label: "Profile", path: "/profile" },
  ],

  doctor: [

    { label: "Dashboard", path: "/doc/dashboard" },
    { label: "Profile", path: "/profile" },
    { label: "Appointments", path: "/doc/appointments" },
  ],

  public: [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "About Us", path: "/about-us" },
    { label: "Contact Us", path: "/contact-us" },
  ],

  admin: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Doctors", path: "/admin/doctors" },
    { label: "Paients", path: "/admin/users" },
    { label: "My Profile", path: "/profile" },
  ],
};

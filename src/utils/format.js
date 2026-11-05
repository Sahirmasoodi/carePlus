export const initials = (person) =>
  `${person?.firstName?.[0] || ""}${person?.lastName?.[0] || ""}`.toUpperCase() ||
  "CP";
export const fullName = (person) =>
  [person?.firstName, person?.lastName].filter(Boolean).join(" ") ||
  "Care team";
export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";
export const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString(undefined, {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      })
    : "—";
export const roleLabel = (role) =>
  ({
    superadmin: "Platform owner",
    admin: "Hospital administrator",
    doctor: "Doctor",
    patient: "Patient",
  })[role] || "Member";

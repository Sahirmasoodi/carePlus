export default function StatusPill({ status }) {
  return (
    <span
      className={`status-pill status-${String(status || "pending")
        .toLowerCase()
        .replaceAll("_", "-")}`}
    >
      {String(status || "pending").replaceAll("_", " ")}
    </span>
  );
}

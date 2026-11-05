import StatusPill from "./StatusPill";
import { formatDateTime, fullName } from "../utils/format";
export default function AppointmentTable({
  rows = [],
  personRole = "patient",
}) {
  if (!rows.length)
    return <div className="table-empty">No appointments to display yet.</div>;
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>{personRole === "patient" ? "DOCTOR" : "PATIENT"}</th>
            <th>DATE & TIME</th>
            <th>REASON</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              <td>
                <b>
                  {fullName(
                    personRole === "patient" ? row.doctor : row.patient,
                  )}
                </b>
                <small>
                  {personRole === "patient"
                    ? row.doctor?.specialization || "Consultation"
                    : "Patient"}
                </small>
              </td>
              <td>{formatDateTime(row.startAt)}</td>
              <td>{row.reason || "General consultation"}</td>
              <td>
                <StatusPill status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

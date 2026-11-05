import { useEffect, useState } from "react";
import { CalendarDays, Plus, Clock3, UserRound } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import StatusPill from "../components/StatusPill";
import { formatDateTime, fullName } from "../utils/format";
import EmptyState from "../components/EmptyState";
export default function AppointmentsPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]),
    [doctors, setDoctors] = useState([]),
    [show, setShow] = useState(false),
    [error, setError] = useState(""),
    [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    doctor: "",
    startAt: "",
    endAt: "",
    reason: "",
    consultationType: "offline",
  });
  const load = () =>
    api
      .get("/clinic/appointments")
      .then(setRows)
      .catch((e) => setError(e.message));
  useEffect(() => {
    load();
    if (user.role === "patient")
      api
        .get("/clinic/doctors")
        .then(setDoctors)
        .catch((e) => setError(e.message));
  }, []);
  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clinic/appointments", {
        ...form,
        startAt: new Date(form.startAt).toISOString(),
        endAt: new Date(form.endAt).toISOString(),
      });
      setShow(false);
      setForm({
        doctor: "",
        startAt: "",
        endAt: "",
        reason: "",
        consultationType: "offline",
      });
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const update = async (row, status) => {
    try {
      await api.patch(`/clinic/appointments/${row._id}`, { status });
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const visible = rows.filter((r) => filter === "all" || r.status === filter);
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="overline">APPOINTMENT MANAGEMENT</span>
          <h2>
            {user.role === "patient"
              ? "Your appointments"
              : "Appointment schedule"}
          </h2>
          <p>
            {user.role === "patient"
              ? "Book a visit at your hospital and follow its progress."
              : "Coordinate appointment requests and patient visits."}
          </p>
        </div>
        {user.role === "patient" && (
          <button
            className="button button-primary"
            onClick={() => setShow(true)}
          >
            <Plus size={16} /> Book appointment
          </button>
        )}
      </div>
      {error && <div className="inline-error">{error}</div>}
      <div className="toolbar-card">
        <div className="filter-tabs">
          {["all", "pending", "confirmed", "completed", "cancelled"].map(
            (s) => (
              <button
                className={filter === s ? "selected" : ""}
                key={s}
                onClick={() => setFilter(s)}
              >
                {s === "all" ? "All" : s.replace("_", " ")}
              </button>
            ),
          )}
        </div>
        <span>{visible.length} appointments</span>
      </div>
      <div className="appointment-cards">
        {visible.map((row) => (
          <article className="appointment-item" key={row._id}>
            <div className="appointment-date-tile">
              <b>{new Date(row.startAt).getDate()}</b>
              <span>
                {new Date(row.startAt).toLocaleDateString(undefined, {
                  month: "short",
                })}
              </span>
            </div>
            <div className="appointment-person">
              <b>
                {user.role === "patient"
                  ? `Dr. ${fullName(row.doctor)}`
                  : fullName(row.patient)}
              </b>
              <span>
                {user.role === "patient"
                  ? row.doctor?.specialization || "Consultation"
                  : "Patient appointment"}
              </span>
              <small>
                <Clock3 size={12} />
                {formatDateTime(row.startAt)} —{" "}
                {new Date(row.endAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
            <div className="appointment-reason">
              <span>VISIT REASON</span>
              <b>{row.reason || "General consultation"}</b>
              <small>
                {row.consultationType === "online"
                  ? "Online consultation"
                  : "In-person visit"}
              </small>
            </div>
            <StatusPill status={row.status} />
            <div className="appointment-buttons">
              {user.role === "doctor" && row.status === "pending" && (
                <button
                  className="table-action"
                  onClick={() => update(row, "confirmed")}
                >
                  Confirm
                </button>
              )}
              {user.role === "doctor" && row.status === "confirmed" && (
                <button
                  className="table-action"
                  onClick={() => update(row, "completed")}
                >
                  Complete
                </button>
              )}
              {(user.role === "patient" ||
                user.role === "doctor" ||
                user.role === "admin") &&
                ["pending", "confirmed"].includes(row.status) && (
                  <button
                    className="table-action table-action-danger"
                    onClick={() => update(row, "cancelled")}
                  >
                    Cancel
                  </button>
                )}
            </div>
          </article>
        ))}
        {!visible.length && (
          <EmptyState
            icon={CalendarDays}
            title="No appointments here"
            description="Appointments that match this filter will appear here."
          />
        )}
      </div>
      {show && (
        <Modal title="Request an appointment" onClose={() => setShow(false)}>
          <form className="modal-form" onSubmit={create}>
            <label>
              Select a doctor
              <select
                required
                value={form.doctor}
                onChange={(e) =>
                  setForm((f) => ({ ...f, doctor: e.target.value }))
                }
              >
                <option value="">Choose from your hospital</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    Dr. {fullName(d)} — {d.specialization || "General"}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label>
                Start time
                <input
                  type="datetime-local"
                  required
                  value={form.startAt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, startAt: e.target.value }))
                  }
                />
              </label>
              <label>
                End time
                <input
                  type="datetime-local"
                  required
                  value={form.endAt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, endAt: e.target.value }))
                  }
                />
              </label>
            </div>
            <label>
              Visit type
              <select
                value={form.consultationType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, consultationType: e.target.value }))
                }
              >
                <option value="offline">In person</option>
                <option value="online">Online</option>
              </select>
            </label>
            <label>
              Reason for visit
              <textarea
                rows="3"
                value={form.reason}
                onChange={(e) =>
                  setForm((f) => ({ ...f, reason: e.target.value }))
                }
                placeholder="Briefly describe what you need help with"
              />
            </label>
            {error && <div className="inline-error">{error}</div>}
            <div className="modal-actions">
              <button
                type="button"
                className="button button-quiet"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button className="button button-primary">
                Send appointment request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

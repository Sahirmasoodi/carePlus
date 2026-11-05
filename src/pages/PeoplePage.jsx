import { useEffect, useState } from "react";
import { Plus, Search, UserRound, UserRoundCheck } from "lucide-react";
import api from "../services/api";
import Modal from "../components/Modal";
import StatusPill from "../components/StatusPill";
import { initials } from "../utils/format";
export default function PeoplePage() {
  const [role, setRole] = useState("doctor"),
    [rows, setRows] = useState([]),
    [search, setSearch] = useState(""),
    [show, setShow] = useState(false),
    [error, setError] = useState(""),
    [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      specialization: "",
      department: "",
      qualification: "",
    });
  const load = () =>
    api
      .get(`/clinic/people?role=${role}&search=${encodeURIComponent(search)}`)
      .then(setRows)
      .catch((e) => setError(e.message));
  useEffect(() => {
    const t = setTimeout(load, 200);
    return () => clearTimeout(t);
  }, [role, search]);
  const change = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const create = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/clinic/people", { ...form, role });
      setShow(false);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        specialization: "",
        department: "",
        qualification: "",
      });
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const toggle = async (p) => {
    try {
      await api.patch(`/clinic/people/${p._id}/status`, {
        isActive: !p.isActive,
      });
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="overline">HOSPITAL DIRECTORY</span>
          <h2>People & care teams</h2>
          <p>Manage the doctors and patients belonging to your hospital.</p>
        </div>
        <button className="button button-primary" onClick={() => setShow(true)}>
          <Plus size={16} /> Add {role}
        </button>
      </div>
      <div className="toolbar-card">
        <div className="segmented-control">
          <button
            className={role === "doctor" ? "selected" : ""}
            onClick={() => setRole("doctor")}
          >
            <UserRoundCheck size={15} /> Doctors
          </button>
          <button
            className={role === "patient" ? "selected" : ""}
            onClick={() => setRole("patient")}
          >
            <UserRound size={15} /> Patients
          </button>
        </div>
        <div className="search-field">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
          />
        </div>
        <span>{rows.length} records</span>
      </div>
      {error && <div className="inline-error">{error}</div>}
      <div className="people-table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead className="">
              <tr className="pt-3">
                <th>PERSON</th>
                <th>EMAIL / PHONE</th>
                <th>{role === "doctor" ? "SPECIALITY" : "ACCOUNT TYPE"}</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="person-name">
                      <span className="avatar">{initials(p)}</span>
                      <b>
                        {p.firstName} {p.lastName}
                      </b>
                    </div>
                  </td>
                  <td>
                    {p.email}
                    <small>{p.phone || "No phone number"}</small>
                  </td>
                  <td>{p.specialization || p.department || "Patient"}</td>
                  <td>
                    <StatusPill status={p.isActive ? "active" : "suspended"} />
                  </td>
                  <td>
                    <button className="table-action" onClick={() => toggle(p)}>
                      {p.isActive ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rows.length && (
          <div className="table-empty">
            No {role}s found. Add the first {role} to your hospital.
          </div>
        )}
      </div>
      {show && (
        <Modal title={`Add a ${role}`} onClose={() => setShow(false)}>
          <form className="modal-form" onSubmit={create}>
            <div className="form-row">
              <label>
                First name
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => change("firstName", e.target.value)}
                />
              </label>
              <label>
                Last name
                <input
                  value={form.lastName}
                  onChange={(e) => change("lastName", e.target.value)}
                />
              </label>
            </div>
            <label>
              Email address
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => change("email", e.target.value)}
              />
            </label>
            <label>
              Temporary password
              <input
                required
                minLength="10"
                type="password"
                value={form.password}
                onChange={(e) => change("password", e.target.value)}
              />
            </label>
            <label>
              Phone number
              <input
                value={form.phone}
                onChange={(e) => change("phone", e.target.value)}
              />
            </label>
            {role === "doctor" && (
              <>
                <label>
                  Specialization
                  <input
                    value={form.specialization}
                    onChange={(e) => change("specialization", e.target.value)}
                    placeholder="e.g. Cardiologist"
                  />
                </label>
                <div className="form-row">
                  <label>
                    Department
                    <input
                      value={form.department}
                      onChange={(e) => change("department", e.target.value)}
                    />
                  </label>
                  <label>
                    Qualification
                    <input
                      value={form.qualification}
                      onChange={(e) => change("qualification", e.target.value)}
                    />
                  </label>
                </div>
              </>
            )}
            {error && <div className="inline-error">{error}</div>}
            <div className="modal-actions">
              <button
                type="button"
                className="button button-quiet"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button className="button button-primary">Add {role}</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

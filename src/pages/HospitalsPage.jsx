import { useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Search,
  MapPin,
  Mail,
  PauseCircle,
  PlayCircle,
  CalendarClock,
} from "lucide-react";
import api from "../services/api";
import Modal from "../components/Modal";
import StatusPill from "../components/StatusPill";
import Loading from "../components/Loading";
export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState([]),
    [loading, setLoading] = useState(true),
    [search, setSearch] = useState(""),
    [show, setShow] = useState(false),
    [error, setError] = useState(""),
    [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
    phone: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPassword: "",
    plan: "trial",
  });
  const load = () => {
    setLoading(true);
    api
      .get(`/platform/hospitals?search=${encodeURIComponent(search)}`)
      .then(setHospitals)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    const timer = setTimeout(load, 250);
    return () => clearTimeout(timer);
  }, [search]);
  const change = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const create = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const result = await api.post("/platform/hospitals", form);
      setSuccess(
        `${result.hospital.name} is ready. Workspace: ${result.hospital.slug}`,
      );
      setShow(false);
      setForm({
        name: "",
        email: "",
        city: "",
        address: "",
        phone: "",
        adminFirstName: "",
        adminLastName: "",
        adminEmail: "",
        adminPassword: "",
        plan: "trial",
      });
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const toggle = async (hospital) => {
    const status = hospital.status === "active" ? "suspended" : "active";
    try {
      await api.patch(`/platform/hospitals/${hospital._id}/status`, { status });
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  const updateSubscription = async (hospital, status) => {
    try {
      const payload =
        status === "active"
          ? {
              status,
              expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
            }
          : { status };
      await api.patch(
        `/platform/hospitals/${hospital._id}/subscription`,
        payload,
      );
      load();
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="overline">CAREPLUS NETWORK</span>
          <h2>Hospital directory</h2>
          <p>Onboard hospital partners and control workspace access.</p>
        </div>
        <button className="button button-primary" onClick={() => setShow(true)}>
          <Plus size={16} /> Add hospital
        </button>
      </div>
      {success && <div className="success-banner">{success}</div>}
      {error && <div className="inline-error">{error}</div>}
      <div className="toolbar-card">
        <div className="search-field">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by hospital, email or city"
          />
        </div>
        <span>{hospitals.length} hospitals</span>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="hospital-grid">
          {hospitals.map((h) => (
            <article className="hospital-tile" key={h._id}>
              <div className="hospital-tile-head">
                <span className="hospital-monogram">
                  <Building2 size={20} />
                </span>
                <StatusPill status={h.status} />
              </div>
              <h3>{h.name}</h3>
              <div className="hospital-detail">
                <Mail size={13} />
                {h.email}
              </div>
              <div className="hospital-detail">
                <MapPin size={13} />
                {h.city || h.address || "Location not provided"}
              </div>
              <div className="hospital-workspace-code">
                <span>WORKSPACE SLUG</span>
                <b>{h.slug}</b>
              </div>
              <div className="subscription-details">
                <div>
                  <span>PLAN</span>
                  <b>{h.subscription?.plan || "trial"}</b>
                </div>
                <div>
                  <span>SUBSCRIPTION</span>
                  <b>{h.subscription?.status || "trial"}</b>
                </div>
                <div>
                  <span>EXPIRES</span>
                  <b>
                    {h.subscription?.expiresAt
                      ? new Date(h.subscription.expiresAt).toLocaleDateString()
                      : "—"}
                  </b>
                </div>
              </div>
              <div className="hospital-actions">
                <button
                  className={
                    h.status === "active"
                      ? "button button-outline-danger"
                      : "button button-outline"
                  }
                  onClick={() => toggle(h)}
                >
                  {h.status === "active" ? (
                    <>
                      <PauseCircle size={14} /> Suspend
                    </>
                  ) : (
                    <>
                      <PlayCircle size={14} /> Reactivate
                    </>
                  )}
                </button>
                <button
                  className="button button-soft"
                  onClick={() =>
                    updateSubscription(
                      h,
                      h.subscription?.status === "expired"
                        ? "active"
                        : "expired",
                    )
                  }
                >
                  <CalendarClock size={14} />{" "}
                  {h.subscription?.status === "expired"
                    ? "Restore plan"
                    : "Expire plan"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {show && (
        <Modal title="Register a hospital" onClose={() => setShow(false)} wide>
          <form className="modal-form" onSubmit={create}>
            <p className="form-section-title">HOSPITAL INFORMATION</p>
            <div className="form-grid gap-x-4 gap-y-4">
              <label>
                Hospital name
                <input
                  required
                  value={form.name}
                  onChange={(e) => change("name", e.target.value)}
                />
              </label>
              <label>
                Official email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => change("email", e.target.value)}
                />
              </label>
              <label>
                City
                <input
                  value={form.city}
                  onChange={(e) => change("city", e.target.value)}
                />
              </label>
              <label>
                Phone
                <input
                  value={form.phone}
                  onChange={(e) => change("phone", e.target.value)}
                />
              </label>
            </div>
            <label>
              Address
              <input
                value={form.address}
                onChange={(e) => change("address", e.target.value)}
              />
            </label>
            <p className="form-section-title">FIRST HOSPITAL ADMINISTRATOR</p>
            <div className="form-grid gap-x-4 gap-y-4">
              <label>
                First name
                <input
                  required
                  value={form.adminFirstName}
                  onChange={(e) => change("adminFirstName", e.target.value)}
                />
              </label>
              <label>
                Last name
                <input
                  value={form.adminLastName}
                  onChange={(e) => change("adminLastName", e.target.value)}
                />
              </label>
              <label>
                Administrator email
                <input
                  required
                  type="email"
                  value={form.adminEmail}
                  onChange={(e) => change("adminEmail", e.target.value)}
                />
              </label>
              <label>
                Temporary password
                <input
                  required
                  minLength="10"
                  type="password"
                  value={form.adminPassword}
                  onChange={(e) => change("adminPassword", e.target.value)}
                />
              </label>
            </div>
            <label>
              Subscription plan
              <select
                value={form.plan}
                onChange={(e) => change("plan", e.target.value)}
              >
                <option value="trial">14-day trial</option>
                <option value="basic">Basic</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>
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
                Create hospital workspace
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Brand from "../components/Brand";
export default function AuthPage() {
  const { login, signupPatient } = useAuth(),
    navigate = useNavigate();
  const [params] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const [mode, setMode] = useState("login");
  const [accountType, setAccountType] = useState("hospital");
  const [form, setForm] = useState({
    hospitalId: "",
    hospitalSlug: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    api
      .get("/public/hospitals")
      .then((list) => {
        setHospitals(list);
        const slug = params.get("hospital");
        const selected = list.find((h) => h.slug === slug);
        if (selected)
          setForm((f) => ({
            ...f,
            hospitalId: selected._id,
            hospitalSlug: selected.slug,
          }));
      })
      .catch((e) => setError(e.message));
  }, []);
  const change = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const onHospitalChange = (id) => {
    const h = hospitals.find((x) => x._id === id);
    setForm((f) => ({ ...f, hospitalId: id, hospitalSlug: h?.slug || "" }));
  };
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") {
        await signupPatient(form);
      } else {
        await login({
          email: form.email,
          password: form.password,
          ...(accountType === "hospital"
            ? { hospitalSlug: form.hospitalSlug }
            : {}),
        });
      }
      navigate("/workspace");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="auth-page">
      <aside className="auth-story">
        <Brand light />
        <div className="auth-story-copy">
          <span className="overline">YOUR CARE, IN ONE PLACE</span>
          <h1>
            Better care is
            <br />
            <em>closer than</em>
            <br />
            you think.
          </h1>
          <p>
            Appointments, treatment plans and your trusted care team — connected
            through CarePlus.
          </p>
          <div className="auth-story-foot">
            <ShieldCheck />
            <span>Private by hospital. Designed around people.</span>
          </div>
        </div>
        <div className="auth-pattern">
          CAREPLUS <b>✚</b> HEALTH NETWORK
        </div>
      </aside>
      <section className="auth-content">
        <div className="auth-box">
          <Link className="back-home me-10" to="/" >
            <ArrowLeft size={14} /> Back
          </Link>
          <div className="auth-mobile-brand">
            <Brand />
          </div>
          <span className="overline">
            {mode === "signup"
              ? "PATIENT REGISTRATION"
              : "SECURE WORKSPACE ACCESS"}
          </span>
          <h2>
            {mode === "signup"
              ? "Create your patient account"
              : "Welcome back."}
          </h2>
          <p className="auth-subtitle">
            {mode === "signup"
              ? "Choose the hospital where you receive care."
              : "Sign in to the right CarePlus workspace."}
          </p>
          {mode === "login" && (
            <div className="account-switch">
              <button
                className={accountType === "hospital" ? "active" : ""}
                onClick={() => setAccountType("hospital")}
              >
                <Building2 size={15} /> Hospital account
              </button>
              <button
                className={accountType === "platform" ? "active" : ""}
                onClick={() => setAccountType("platform")}
              >
                <ShieldCheck size={15} /> Super admin
              </button>
            </div>
          )}
          <form className="auth-form" onSubmit={submit}>
            {mode === "signup" && (
              <div className="form-row">
                <label>
                  First name
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => change("firstName", e.target.value)}
                    placeholder="First name"
                  />
                </label>
                <label>
                  Last name
                  <input
                    value={form.lastName}
                    onChange={(e) => change("lastName", e.target.value)}
                    placeholder="Last name"
                  />
                </label>
              </div>
            )}
            {(mode === "signup" || accountType === "hospital") && (
              <label>
                {mode === "signup" ? "Choose your hospital" : "Hospital"}
                <select
                  required
                  value={form.hospitalId}
                  onChange={(e) => onHospitalChange(e.target.value)}
                >
                  <option value="">Select a hospital</option>
                  {hospitals.map((h) => (
                    <option value={h._id} key={h._id}>
                      {h.name}
                      {h.city ? ` — ${h.city}` : ""}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label>
              Email address
              <input
                required
                type="email"
                autoComplete="username"
                value={form.email}
                onChange={(e) => change("email", e.target.value)}
                placeholder="name@example.com"
              />
            </label>
            <label>
              Password
              <input
                required
                type="password"
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                value={form.password}
                onChange={(e) => change("password", e.target.value)}
                placeholder="Enter your password"
              />
            </label>
            {mode === "signup" && (
              <label>
                Phone number <span className="optional-label">Optional</span>
                <input
                  value={form.phone}
                  onChange={(e) => change("phone", e.target.value)}
                  placeholder="+91"
                />
              </label>
            )}
            {error && <div className="form-error">{error}</div>}
            <button
              className="button button-primary auth-submit"
              disabled={busy}
            >
              {busy
                ? "Please wait…"
                : mode === "signup"
                  ? "Create patient account"
                  : "Sign in securely"}
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="auth-toggle">
            {mode === "login" ? "New to CarePlus?" : "Already registered?"}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
            >
              {mode === "login" ? "Create a patient account" : "Sign in"}
            </button>
          </div>
          <div className="auth-security">
            <LockKeyhole size={14} /> Your information is protected within your
            hospital workspace.
          </div>
        </div>
      </section>
    </main>
  );
}

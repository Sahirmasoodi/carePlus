import { useEffect, useState } from "react";
import { FileText, Plus, Pill, Printer } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import { formatDate, fullName } from "../utils/format";
export default function PrescriptionsPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]),
    [appointments, setAppointments] = useState([]),
    [show, setShow] = useState(false),
    [error, setError] = useState("");
  const [form, setForm] = useState({
    appointmentId: "",
    diagnosis: "",
    clinicalNotes: "",
    advice: "",
    followUpDate: "",
    medicines: [
      { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
    ],
  });
  const load = () =>
    api
      .get("/clinic/prescriptions")
      .then(setRows)
      .catch((e) => setError(e.message));
  useEffect(() => {
    load();
    if (user.role === "doctor")
      api
        .get("/clinic/appointments")
        .then((list) =>
          setAppointments(
            list.filter((a) => ["confirmed", "completed"].includes(a.status)),
          ),
        )
        .catch((e) => setError(e.message));
  }, []);
  const updateMedicine = (i, key, value) =>
    setForm((f) => ({
      ...f,
      medicines: f.medicines.map((m, j) =>
        j === i ? { ...m, [key]: value } : m,
      ),
    }));
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clinic/prescriptions", form);
      setShow(false);
      load();
      setForm({
        appointmentId: "",
        diagnosis: "",
        clinicalNotes: "",
        advice: "",
        followUpDate: "",
        medicines: [
          {
            name: "",
            dosage: "",
            frequency: "",
            duration: "",
            instructions: "",
          },
        ],
      });
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <div className="page-intro">
        <div>
          <span className="overline">TREATMENT RECORDS</span>
          <h2>
            {user.role === "doctor"
              ? "Prescription workspace"
              : "Your prescriptions"}
          </h2>
          <p>
            {user.role === "doctor"
              ? "Create and securely publish prescriptions for your patients."
              : "Prescriptions shared by your doctor, saved in your care record."}
          </p>
        </div>
        {user.role === "doctor" && (
          <button
            className="button button-primary"
            onClick={() => setShow(true)}
          >
            <Plus size={16} /> Write prescription
          </button>
        )}
      </div>
      {error && <div className="inline-error">{error}</div>}
      <div className="prescription-grid">
        {rows.map((p) => (
          <article className="prescription-card" key={p._id}>
            <div className="prescription-top">
              <span className="rx-symbol">Rx</span>
              <span className="prescription-date">
                ISSUED {formatDate(p.publishedAt)}
              </span>
            </div>
            <h3>{p.diagnosis}</h3>
            <p className="prescription-doctor">
              {user.role === "patient"
                ? `Dr. ${fullName(p.doctor)}`
                : `For ${fullName(p.patient)}`}
            </p>
            <div className="prescription-medicines">
              <span className="list-heading">
                <Pill size={13} /> MEDICATION
              </span>
              {p.medicines?.map((m, i) => (
                <div className="medicine-row" key={i}>
                  <b>{m.name}</b>
                  <span>
                    {m.dosage} · {m.frequency} · {m.duration}
                  </span>
                  {m.instructions && <small>{m.instructions}</small>}
                </div>
              ))}
            </div>
            {p.clinicalNotes && (
              <div className="prescription-note">
                <span>CLINICAL NOTES</span>
                <p>{p.clinicalNotes}</p>
              </div>
            )}
            {p.advice && (
              <div className="prescription-note">
                <span>ADVICE</span>
                <p>{p.advice}</p>
              </div>
            )}
            {p.followUpDate && (
              <div className="followup-date">
                Follow-up suggested · {formatDate(p.followUpDate)}
              </div>
            )}
            <button className="print-link" onClick={() => window.print()}>
              <Printer size={14} /> Print prescription
            </button>
          </article>
        ))}
        {!rows.length && (
          <EmptyState
            icon={FileText}
            title="No prescriptions yet"
            description="Prescriptions will appear here once your doctor publishes them."
          />
        )}
      </div>
      {show && (
        <Modal
          title="Create a prescription"
          onClose={() => setShow(false)}
          wide
        >
          <form className="modal-form" onSubmit={submit}>
            <label>
              Appointment
              <select
                required
                value={form.appointmentId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, appointmentId: e.target.value }))
                }
              >
                <option value="">
                  Select a completed or confirmed appointment
                </option>
                {appointments.map((a) => (
                  <option key={a._id} value={a._id}>
                    {fullName(a.patient)} · {formatDate(a.startAt)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Diagnosis
              <input
                required
                value={form.diagnosis}
                onChange={(e) =>
                  setForm((f) => ({ ...f, diagnosis: e.target.value }))
                }
              />
            </label>
            <div className="medicine-title">
              <b>Medication details</b>
              <button
                type="button"
                className="text-button"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    medicines: [
                      ...f.medicines,
                      {
                        name: "",
                        dosage: "",
                        frequency: "",
                        duration: "",
                        instructions: "",
                      },
                    ],
                  }))
                }
              >
                ＋ Add another medicine
              </button>
            </div>
            {form.medicines.map((m, i) => (
              <div className="medicine-editor" key={i}>
                <div className="form-row">
                  <label>
                    Medicine
                    <input
                      required
                      value={m.name}
                      onChange={(e) =>
                        updateMedicine(i, "name", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Dosage
                    <input
                      required
                      placeholder="e.g. 500 mg"
                      value={m.dosage}
                      onChange={(e) =>
                        updateMedicine(i, "dosage", e.target.value)
                      }
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Frequency
                    <input
                      required
                      placeholder="Twice daily"
                      value={m.frequency}
                      onChange={(e) =>
                        updateMedicine(i, "frequency", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Duration
                    <input
                      required
                      placeholder="5 days"
                      value={m.duration}
                      onChange={(e) =>
                        updateMedicine(i, "duration", e.target.value)
                      }
                    />
                  </label>
                </div>
                <label>
                  Instructions
                  <input
                    value={m.instructions}
                    onChange={(e) =>
                      updateMedicine(i, "instructions", e.target.value)
                    }
                  />
                </label>
              </div>
            ))}
            <label>
              Clinical notes
              <textarea
                rows="2"
                value={form.clinicalNotes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, clinicalNotes: e.target.value }))
                }
              />
            </label>
            <label>
              Advice for patient
              <textarea
                rows="2"
                value={form.advice}
                onChange={(e) =>
                  setForm((f) => ({ ...f, advice: e.target.value }))
                }
              />
            </label>
            <label>
              Follow-up date
              <input
                type="date"
                value={form.followUpDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, followUpDate: e.target.value }))
                }
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
                Publish to patient
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

import {
  ArrowRight,
  CalendarCheck,
  FileHeart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Brand from "../components/Brand";
export default function PublicHome() {
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    api
      .get("/public/hospitals")
      .then(setHospitals)
      .catch(() => setHospitals([]));
  }, []);
  return (
    <div className="public-site">
      <header className="public-header page-width">
        <Brand />
        <nav>
          <a href="#experience">Experience</a>
          <a href="#hospitals">Hospitals</a>
          <a href="#how">How it works</a>
        </nav>
        <Link className="button button-dark" to="/login">
          Sign in <ArrowRight size={15} />
        </Link>
      </header>
      <section className="landing-hero page-width">
        <div className="landing-copy">
          <span className="overline">
            <i /> CARE THAT STAYS CONNECTED
          </span>
          <h1>
            Healthcare,
            <br />
            <em>without the</em>
            <br />
            loose ends.
          </h1>
          <p>
            From the first appointment to the prescription in your pocket,
            CarePlus brings your care team and your next steps together.
          </p>
          <div className="landing-actions">
            <Link className="button button-primary" to="/login">
              Enter your care space <ArrowRight size={16} />
            </Link>
            <a href="#how" className="under-link">
              See how it works
            </a>
          </div>
          <div className="landing-proof">
            <ShieldCheck size={17} />
            <span>
              Private hospital workspaces <b>·</b> Patient-first by design
            </span>
          </div>
        </div>
        <div className="landing-art">
          <div className="art-circle circle-back" />
          <div className="art-circle circle-front">
            <div className="cross-art">+</div>
          </div>
          <div className="floating-panel appointment-float">
            <div className="float-icon">
              <CalendarCheck size={17} />
            </div>
            <div>
              <small>NEXT APPOINTMENT</small>
              <b>Your care, on schedule</b>
              <span>One place for every visit</span>
            </div>
            <i>↗</i>
          </div>
          <div className="floating-panel rx-float">
            <div className="rx-icon">Rx</div>
            <div>
              <b>Prescription shared</b>
              <span>Available in your patient account</span>
            </div>
            <span className="float-check">✓</span>
          </div>
          <div className="art-caption">CAREPLUS / 01 — CONNECTED CARE</div>
        </div>
      </section>
      <section className="feature-band" id="experience">
        <div className="page-width feature-grid">
          <article>
            <span>01 / BOOK</span>
            <CalendarCheck />
            <h3>Appointments that work around you</h3>
            <p>
              Discover doctors at your chosen hospital and request a time that
              suits your day.
            </p>
          </article>
          <article>
            <span>02 / RECEIVE</span>
            <FileHeart />
            <h3>Your prescription, right where you need it</h3>
            <p>
              Doctors publish prescriptions securely. Patients can revisit them
              whenever needed.
            </p>
          </article>
          <article>
            <span>03 / CONNECT</span>
            <MessageCircle />
            <h3>Care doesn't stop at the consultation</h3>
            <p>
              Keep in touch with your doctor through private, appointment-linked
              messaging.
            </p>
          </article>
        </div>
      </section>
      <section className="hospital-section page-width" id="hospitals">
        <div className="section-heading">
          <div>
            <span className="overline">THE CAREPLUS NETWORK</span>
            <h2>
              Choose the hospital
              <br />
              <em>you call home.</em>
            </h2>
          </div>
          <p>
            CarePlus brings independent hospitals into one connected experience.
            Your records stay within the hospital you choose.
          </p>
        </div>
        <div className="public-hospital-grid">
          {hospitals.map((h, i) => (
            <article key={h._id}>
              <span className="hospital-number">0{i + 1}</span>
              <span className="hospital-icon">
                <span>✚</span>
              </span>
              <h3>{h.name}</h3>
              <p>
                {[h.city, h.address].filter(Boolean).join(" · ") ||
                  "CarePlus network hospital"}
              </p>
              <Link to={`/login?hospital=${h.slug}`}>
                Continue to hospital <ArrowRight size={14} />
              </Link>
            </article>
          ))}
          {!hospitals.length && (
            <div className="hospital-empty">
              New CarePlus hospital partners will appear here.
            </div>
          )}
        </div>
      </section>
      <section className="how-section" id="how">
        <div className="page-width how-inner">
          <div>
            <span className="overline">SIMPLE BY DESIGN</span>
            <h2>
              Your care journey,
              <br />
              <em>in three steps.</em>
            </h2>
          </div>
          <div className="how-steps">
            <div>
              <b>01</b>
              <span>
                <strong>Choose your hospital</strong>
                <small>
                  Select the hospital where you receive care. No workspace code
                  needed.
                </small>
              </span>
            </div>
            <div>
              <b>02</b>
              <span>
                <strong>Book and meet your doctor</strong>
                <small>
                  Manage appointments and stay connected with your care team.
                </small>
              </span>
            </div>
            <div>
              <b>03</b>
              <span>
                <strong>Keep your treatment close</strong>
                <small>
                  View prescriptions and follow-up information from your
                  account.
                </small>
              </span>
            </div>
          </div>
        </div>
      </section>
      <footer className="public-footer page-width">
        <Brand />
        <span>CarePlus — Connected healthcare, thoughtfully delivered.</span>
        <Link to="/login">
          Workspace sign in <ArrowRight size={14} />
        </Link>
      </footer>
    </div>
  );
}

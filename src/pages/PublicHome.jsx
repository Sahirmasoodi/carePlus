import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileHeart,
  HeartPulse,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Brand from "../components/Brand";

const features = [
  {
    number: "01",
    label: "BOOK APPOINTMENTS",
    icon: CalendarCheck,
    title: "Healthcare on your schedule.",
    description:
      "Find the right doctor, choose a convenient time, and manage every appointment from one place.",
  },
  {
    number: "02",
    label: "DIGITAL PRESCRIPTIONS",
    icon: FileHeart,
    title: "Your treatment, always within reach.",
    description:
      "Access prescriptions shared by your doctor whenever you need them. No more misplaced papers.",
  },
  {
    number: "03",
    label: "STAY CONNECTED",
    icon: MessageCircle,
    title: "A connection beyond the clinic.",
    description:
      "Continue conversations with your doctor through secure, appointment-linked messaging.",
  },
];

const steps = [
  {
    number: "01",
    title: "Find your hospital",
    description:
      "Explore the CarePlus network and select the hospital where you receive care.",
  },
  {
    number: "02",
    title: "Meet your doctor",
    description:
      "Book appointments and keep track of your upcoming consultations.",
  },
  {
    number: "03",
    title: "Stay in control",
    description:
      "View your prescriptions and stay connected with your healthcare team.",
  },
];

export default function PublicHome() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api
      .get("/public/hospitals")
      .then((response) => {
        const result = Array.isArray(response)
          ? response
          : response?.hospitals ||
            response?.data?.hospitals ||
            response?.data ||
            [];

        if (active) {
          setHospitals(Array.isArray(result) ? result : []);
        }
      })
      .catch(() => {
        if (active) setHospitals([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf9] text-[#152e35]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Brand />

          <nav className="hidden items-center gap-9 md:flex">
            <a
              href="#experience"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              Experience
            </a>
            <a
              href="#hospitals"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              Hospitals
            </a>
            <a
              href="#how"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              How it works
            </a>
          </nav>

          <Link
            to="/login"
            className="group inline-flex items-center gap-2 rounded-full bg-[#173b42] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#173b42]/10 transition hover:-translate-y-0.5 hover:bg-teal-800"
          >
            Sign in
            <ArrowUpRight
              size={16}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-32">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-[0.13em] text-teal-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              CARE THAT STAYS CONNECTED
              <Sparkles size={14} />
            </div>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-[#17353c] sm:text-6xl lg:text-[76px]">
              Better care.
              <br />
              <span className="font-serif font-normal italic text-teal-700">
                Closer connections.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Your healthcare journey deserves more than disconnected
              experiences. Find hospitals, book appointments, receive
              prescriptions, and stay connected with your care team.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-teal-700 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-teal-800/20 transition hover:-translate-y-1 hover:bg-teal-800"
              >
                Get started
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#hospitals"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800"
              >
                Explore hospitals
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-slate-200 pt-7 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={17} className="text-teal-700" />
                Private hospital workspaces
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-700" />
                Patient-first experience
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute inset-5 rounded-[3rem] bg-teal-200/40 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-[#d9f1ec] via-[#e8f5f2] to-[#c8e7e4] p-6 shadow-2xl shadow-teal-900/10 sm:p-9">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[35px] border-white/30" />
              <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-white/20 blur-2xl" />

              <div className="relative flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold tracking-[0.16em] text-teal-800/70">
                    YOUR HEALTH SPACE
                  </span>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#173b42]">
                    Care, connected.
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                  <HeartPulse size={25} />
                </div>
              </div>

              <div className="relative mt-9 rounded-3xl border border-white/80 bg-white/85 p-5 shadow-xl shadow-teal-900/5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                      <CalendarCheck size={21} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        APPOINTMENTS
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        Your next visit
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Organized
                  </span>
                </div>
                <div className="mt-5 rounded-2xl bg-[#f3f8f7] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-teal-700">
                      <Stethoscope size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Your healthcare team
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Connected in one place
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-lg shadow-teal-900/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <FileHeart size={20} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-800">
                    Digital prescriptions
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your treatment, always accessible
                  </p>
                </div>

                <div className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-lg shadow-teal-900/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MessageCircle size={20} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-800">
                    Private messaging
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Stay in touch with your doctor
                  </p>
                </div>
              </div>

              <div className="relative mt-7 flex items-center justify-between border-t border-teal-900/10 pt-5 text-[10px] font-bold tracking-[0.18em] text-teal-900/50">
                <span>CAREPLUS / CONNECTED HEALTHCARE</span>
                <span>01 — 03</span>
              </div>
            </div>

            <div className="absolute -left-5 top-1/2 hidden -translate-y-1/2 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:block lg:-left-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <ShieldCheck size={19} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Your care, protected
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Hospital-specific access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section
        id="experience"
        className="border-y border-slate-200/70 bg-white"
      >
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-100 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="px-5 py-10 sm:px-8 lg:py-14"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.15em] text-teal-700">
                    {feature.number} / {feature.label}
                  </span>
                  <Icon size={22} className="text-teal-700" />
                </div>
                <h3 className="mt-7 max-w-xs text-xl font-semibold leading-snug tracking-tight text-[#193a40]">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Hospitals */}
      <section
        id="hospitals"
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
      >
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-teal-700">
              <span className="h-2 w-2 rounded-full bg-teal-600" />
              THE CAREPLUS NETWORK
            </span>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#17353c] sm:text-5xl">
              Find care that feels
              <br />
              <span className="font-serif font-normal italic text-teal-700">
                closer to home.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            Explore participating hospitals and choose where you would like to
            receive care. Your hospital workspace keeps your healthcare
            experience connected.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Building2 size={18} className="text-teal-700" />
            Available hospitals
            <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">
              {loading ? "..." : hospitals.length}
            </span>
          </div>
          <span className="hidden text-xs text-slate-400 sm:block">
            Select a hospital to continue
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-slate-200 bg-white p-7"
              >
                <div className="h-12 w-12 rounded-2xl bg-slate-100" />
                <div className="mt-6 h-5 w-3/4 rounded bg-slate-100" />
                <div className="mt-3 h-4 w-1/2 rounded bg-slate-100" />
                <div className="mt-8 h-4 w-2/3 rounded bg-slate-100" />
              </div>
            ))
          ) : hospitals.length ? (
            hospitals.map((hospital, index) => (
              <article
                key={hospital._id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5"
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-teal-50 transition duration-300 group-hover:scale-125" />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
                    <Building2 size={25} />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-7">
                  <h3 className="text-xl font-semibold tracking-tight text-[#193a40]">
                    {hospital.name}
                  </h3>

                  <p className="mt-3 flex min-h-10 items-start gap-2 text-sm leading-6 text-slate-500">
                    <MapPin size={16} className="mt-1 shrink-0 text-teal-700" />
                    {[hospital.city, hospital.address]
                      .filter(Boolean)
                      .join(" · ") || "CarePlus network hospital"}
                  </p>

                  <Link
                    to={`/login?hospital=${hospital.slug}`}
                    className="mt-7 inline-flex w-full items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold text-teal-800 transition group-hover:text-teal-600"
                  >
                    Continue to hospital
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 transition group-hover:translate-x-1 group-hover:bg-teal-700 group-hover:text-white">
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Building2 size={25} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-800">
                More hospitals are on the way
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                New CarePlus hospital partners will appear here as they join the
                network.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-[#173b42] text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <span className="text-xs font-bold tracking-[0.17em] text-teal-300">
              SIMPLE BY DESIGN
            </span>
            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
              A better healthcare
              <br />
              <span className="font-serif font-normal italic text-teal-300">
                experience starts here.
              </span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300">
              Less time navigating systems. More time focusing on what matters —
              your health.
            </p>

            <Link
              to="/login"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#173b42] transition hover:-translate-y-1 hover:bg-teal-50"
            >
              Enter CarePlus
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-white/10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-6 py-7 first:pt-0 last:pb-0 sm:gap-9"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/10 text-sm font-bold text-teal-300">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-7 text-slate-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-teal-100 bg-gradient-to-br from-white to-[#eaf6f3] p-8 sm:p-10 lg:flex-row lg:items-center">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#173b42]">
                Your care stays within your hospital.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
                CarePlus provides separate hospital workspaces, helping keep
                each hospital's patient and clinical information within its own
                environment.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-teal-800 shadow-sm">
            <Clock3 size={16} />
            Care, made more connected
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <Brand />
          <p className="text-center text-xs leading-6 text-slate-400">
            © {new Date().getFullYear()} CarePlus. Connected healthcare,
            thoughtfully delivered.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-teal-800 transition hover:text-teal-600"
          >
            Workspace sign in
            <ArrowRight size={15} />
          </Link>
        </div>
      </footer>
    </main>
  );
}

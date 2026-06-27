import { useEffect, useRef, useState } from "react";
import { services, serviceRoutes } from "../data/services";
export default function Quote() {
  const [scope, setScope] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const resetTimer = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const locked = !scope;
  const resetQuoteForm = () => {
    formRef.current?.reset();
    setScope("");
    setSubmitted(false);
    setSubmitError("");
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = null;
  };
  const fieldClass = `w-full min-w-0 rounded-xl border border-[#E0DBD7] p-4 text-base ${locked ? "bg-[#E0DBD7]/50 text-[#40190E]/55" : "bg-white text-[#40190E]"}`;
  const handleActivity = () => {
    if (submitted) resetQuoteForm();
    if (submitError) setSubmitError("");
  };
  const handleSubmit = async (form: HTMLFormElement) => {
    if (locked) return;
    const values = Object.fromEntries(new FormData(form).entries());
    const firstName = String(values.firstName || "").trim();
    const lastName = String(values.lastName || "").trim();
    const payload = {
      type: "quote",
      sourceUrl: window.location.href,
      form: {
        ...values,
        name: `${firstName} ${lastName}`.trim(),
        fullName: `${firstName} ${lastName}`.trim(),
        serviceScope: scope,
        submittedAt: new Date().toISOString(),
      },
    };
    const intakeEnabled = import.meta.env.VITE_ENABLE_INTAKE === "true";
    if (intakeEnabled) {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response
        .json()
        .catch(() => ({ ok: false, error: "Unable to read intake response." }));
      if (!response.ok || !result.ok) {
        setSubmitError(result.error || "Unable to submit quote request.");
        return;
      }
    }
    setSubmitted(true);
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(resetQuoteForm, 5000);
  };
  const handleScope = (value: string, form: HTMLFormElement | null) => {
    if (submitted) resetQuoteForm();
    if (submitError) setSubmitError("");
    if (value === "septic-services") {
      form?.reset();
      setScope("");
      window.setTimeout(() => {
        if (window.__ozzysNavigate) {
          window.__ozzysNavigate("/septic-assessment-form");
        } else {
          window.location.href = "/septic-assessment-form";
        }
      }, 0);
      return;
    }
    setScope(value);
  };
  useEffect(() => {
    const requestedService =
      new URLSearchParams(window.location.search).get("service") || "";
    if (requestedService === "septic-services") {
      if (window.__ozzysNavigate) {
        window.__ozzysNavigate("/septic-assessment-form");
      } else {
        window.location.replace("/septic-assessment-form");
      }
      return;
    }
    if (serviceRoutes[requestedService])
      requestAnimationFrame(() => setScope(requestedService));
  }, []);
  return (
    <section id="quote" className="bg-[#40190E] px-5 py-24 text-white">
      <div className="mx-auto grid max-w-7xl min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0">
          <p className="font-black uppercase tracking-[0.2em] text-[#D5560B]">
            Request a Quote
          </p>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Let’s get your project moving.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/90">
            Whether you're reshaping your lot, prepping for new construction,
            repairing a septic issue, or planning custom excavation work, start
            by selecting the service scope. Septic requests transfer to the
            dedicated septic assessment form.
          </p>
          <div className="mt-8 space-y-3 text-white/90">
            <a className="block text-xl font-black" href="tel:+17782091414">
              778-209-1414
            </a>
            <a
              className="block text-xl font-black"
              href="mailto:admin@ozzysexcavation.ca"
            >
              admin@ozzysexcavation.ca
            </a>
          </div>
        </div>
        <form
          ref={formRef}
          className="grid min-w-0 gap-4 rounded-[2rem] bg-white p-4 text-[#40190E] sm:p-6"
          onInput={handleActivity}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e.currentTarget);
          }}
        >
          <label className="grid gap-2">
            <span className="font-black text-[#40190E]">
              Scope of services and project outcome required
              <span className="text-[#D5560B]"> *</span>
            </span>
            <select
              required
              name="scope"
              value={scope}
              onChange={(e) =>
                handleScope(e.target.value, e.currentTarget.form)
              }
              className="w-full min-w-0 rounded-xl border border-[#E0DBD7] p-4 text-base"
            >
              <option value="">Select service scope</option>
              {services.map((s) => (
                <option key={s.title} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>
          {locked && (
            <p className="rounded-xl bg-[#E0DBD7]/60 px-4 py-3 text-sm font-bold text-[#40190E]/75">
              Select a service scope first to unlock the quote fields.
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-black text-[#40190E]">
                First name<span className="text-[#D5560B]"> *</span>
              </span>
              <input
                required
                name="firstName"
                readOnly={locked}
                aria-disabled={locked}
                className={fieldClass}
                placeholder="First name"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-black text-[#40190E]">
                Last name<span className="text-[#D5560B]"> *</span>
              </span>
              <input
                required
                name="lastName"
                readOnly={locked}
                aria-disabled={locked}
                className={fieldClass}
                placeholder="Last name"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-black text-[#40190E]">
                Email<span className="text-[#D5560B]"> *</span>
              </span>
              <input
                required
                name="email"
                readOnly={locked}
                aria-disabled={locked}
                type="email"
                className={fieldClass}
                placeholder="Email"
              />
            </label>
            <input
              name="phone"
              readOnly={locked}
              aria-disabled={locked}
              type="tel"
              className={fieldClass}
              placeholder="Phone"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="areaDimensions"
              readOnly={locked}
              aria-disabled={locked}
              className={fieldClass}
              placeholder="Area dimensions (D x W x L or sq ft)"
            />
            <input
              name="timeFrame"
              readOnly={locked}
              aria-disabled={locked}
              className={fieldClass}
              placeholder="Time frame"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="budget"
              readOnly={locked}
              aria-disabled={locked}
              className={fieldClass}
              placeholder="Budget"
            />
            <input
              name="siteAddress"
              readOnly={locked}
              aria-disabled={locked}
              className={fieldClass}
              placeholder="Site address / location"
            />
          </div>
          <textarea
            name="message"
            readOnly={locked}
            aria-disabled={locked}
            className={`min-h-32 ${fieldClass}`}
            placeholder="Tell us about access, drainage, soil, schedule, photos available, or any compliance concerns."
          />
          <button
            disabled={locked}
            className="w-full rounded-full bg-[#D5560B] px-6 py-4 font-black text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Submit Quote Request
          </button>
          {submitError && (
            <p
              role="alert"
              className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-800"
            >
              {submitError}
            </p>
          )}
          {submitted && (
            <p
              role="status"
              className="rounded-2xl border border-[#D5560B]/25 bg-[#D5560B]/10 px-4 py-3 text-sm font-bold leading-6 text-[#40190E]"
            >
              Thanks — your quote request has been received. We’ll review the
              details and follow up shortly. This form will reset automatically
              in a few seconds.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

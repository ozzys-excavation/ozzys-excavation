import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { IntakeData } from "../types";
import { intakeInitial, intakeSteps } from "../data/intake";
import Field from "./Field";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import { scrollTo } from "../utils/navigation";
export default function SepticAssessmentPage() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [data, setData] = useState<IntakeData>(intakeInitial);
  const update = (key: string, value: string) => {
    setSubmitError("");
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const input = "rounded-xl border border-[#E0DBD7] p-4 text-base";
  const requiredByStep: Record<number, (keyof IntakeData)[]> = {
    0: ["firstName", "lastName", "email", "phone", "address", "requirements"],
    1: ["houseSize", "bedrooms", "bathrooms", "occupants"],
    2: ["waterSource"],
    3: ["covenants", "otherBuildings", "homeBusiness"],
    5: ["acknowledgement"],
  };
  const canContinue =
    (requiredByStep[step] || []).every((key) => data[key].trim()) &&
    (step !== 1 ||
      (/^\d+$/.test(data.occupants) &&
        Number(data.occupants) >= 1 &&
        Number(data.occupants) <= 30));
  useEffect(() => {
    if (sent)
      window.requestAnimationFrame(() => scrollTo("septic-assessment-form"));
  }, [sent]);
  const next = () => {
    if (!canContinue) return;
    setStep((s) => Math.min(s + 1, intakeSteps.length - 1));
    window.requestAnimationFrame(() => scrollTo("septic-assessment-form"));
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.requestAnimationFrame(() => scrollTo("septic-assessment-form"));
  };
  const submit = async () => {
    const payload = {
      type: "septic-assessment",
      sourceUrl: window.location.href,
      form: {
        name: `${data.firstName} ${data.lastName}`.trim(),
        fullName: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        phone: data.phone,
        doctype: "Septic Assessment",
        prospect: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          serviceInterest: "Septic Services",
          source: "ozzysexcavation.ca/septic-assessment-form",
        },
        assessment: data,
        submittedAt: new Date().toISOString(),
        source: "septic-assessment-form",
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
        setSubmitError(result.error || "Unable to submit septic assessment.");
        return;
      }
    }
    setSent(true);
  };
  return (
    <>
      <SeoJsonLd />
      <Navbar />
      <main>
        <section
          id="septic-assessment-top"
          className="bg-[#40190E] px-5 py-20 text-white"
        >
          <div className="mx-auto max-w-5xl">
            <p className="font-black uppercase tracking-[0.2em] text-[#D5560B]">
              Required Before Septic Assessment
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">
              Septic System Assessment Form
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
              Septic installation inquiries require this intake form before
              assessment. The questions help Ozzy's Excavation Services
              understand your property, household use, water systems, site
              constraints, and Alberta septic compliance needs before scheduling
              next steps.
            </p>
          </div>
        </section>
        <section id="septic-assessment-form" className="bg-white px-5 py-16">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#E0DBD7] bg-[#E0DBD7]/40 p-4 shadow-xl md:p-8">
            <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {intakeSteps.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  disabled={i > step && !canContinue}
                  onClick={() => {
                    if (i <= step || canContinue) setStep(i);
                  }}
                  className={`rounded-full px-4 py-3 text-sm font-black disabled:cursor-not-allowed disabled:opacity-40 ${i === step ? "bg-[#D5560B] text-white" : "bg-white text-[#40190E]"}`}
                >
                  {i + 1}. {name}
                </button>
              ))}
            </div>
            {sent ? (
              <div className="rounded-3xl bg-white p-8 text-[#40190E]">
                <h2 className="text-3xl font-black">
                  Thanks — your septic assessment information is ready.
                </h2>
                <p className="mt-4 leading-7">
                  Your intake has been received and saved for Ozzy's Excavation
                  Services to review during follow-up about assessment,
                  permitting, soil testing, site requirements, and
                  installation/repair next steps.
                </p>
                <Link
                  to="/services/septic-services"
                  className="mt-6 inline-block rounded-full bg-[#D5560B] px-6 py-3 font-black text-white"
                >
                  Back to Septic Services
                </Link>
              </div>
            ) : (
              <div className="rounded-3xl bg-white p-6 md:p-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (step < intakeSteps.length - 1) next();
                    else submit();
                  }}
                  className="grid gap-5"
                >
                  {step === 0 && (
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="First Name" required>
                        <input
                          required
                          className={input}
                          value={data.firstName}
                          onChange={(e) => update("firstName", e.target.value)}
                        />
                      </Field>
                      <Field label="Last Name" required>
                        <input
                          required
                          className={input}
                          value={data.lastName}
                          onChange={(e) => update("lastName", e.target.value)}
                        />
                      </Field>
                      <Field label="Email" required>
                        <input
                          required
                          type="email"
                          className={input}
                          value={data.email}
                          onChange={(e) => update("email", e.target.value)}
                        />
                      </Field>
                      <Field label="Phone" required>
                        <input
                          required
                          type="tel"
                          className={input}
                          value={data.phone}
                          onChange={(e) => update("phone", e.target.value)}
                        />
                      </Field>
                      <Field
                        label="Property Address"
                        help="Civic address, rural address, or legal land description if known."
                        required
                      >
                        <input
                          required
                          className={input}
                          value={data.address}
                          onChange={(e) => update("address", e.target.value)}
                        />
                      </Field>
                      <Field label="Septic Requirement" required>
                        <select
                          required
                          className={input}
                          value={data.requirements}
                          onChange={(e) =>
                            update("requirements", e.target.value)
                          }
                        >
                          <option value="">Select one</option>
                          <option>New septic installation</option>
                          <option>Septic replacement</option>
                          <option>Septic repair</option>
                          <option>Inspection / compliance review</option>
                          <option>Site assessment / soil testing</option>
                          <option>Not sure yet</option>
                        </select>
                      </Field>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="House Size" required>
                        <select
                          required
                          className={input}
                          value={data.houseSize}
                          onChange={(e) => update("houseSize", e.target.value)}
                        >
                          <option value="">
                            Select approximate square footage
                          </option>
                          {[
                            "Under 1,000 sq ft",
                            "1,000 - 1,500 sq ft",
                            "1,501 - 2,000 sq ft",
                            "2,001 - 2,500 sq ft",
                            "2,501 - 3,500 sq ft",
                            "Over 3,500 sq ft",
                          ].map((x) => (
                            <option key={x}>{x}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Bedrooms" required>
                        <select
                          required
                          className={input}
                          value={data.bedrooms}
                          onChange={(e) => update("bedrooms", e.target.value)}
                        >
                          <option value="">Select</option>
                          {["1", "2", "3", "4", "5", "6+"].map((x) => (
                            <option key={x}>{x}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Bathrooms" required>
                        <select
                          required
                          className={input}
                          value={data.bathrooms}
                          onChange={(e) => update("bathrooms", e.target.value)}
                        >
                          <option value="">Select</option>
                          {["1", "2", "3", "4", "5+"].map((x) => (
                            <option key={x}>{x}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Occupants" required>
                        <input
                          required
                          type="number"
                          min="1"
                          max="30"
                          step="1"
                          className={input}
                          value={data.occupants}
                          onChange={(e) => update("occupants", e.target.value)}
                          placeholder="Current or planned number of occupants"
                        />
                      </Field>
                      <Field
                        label="Occupant Notes"
                        help="Seasonal use, guests, rental use, suites, or planned growth."
                      >
                        <textarea
                          className={input}
                          value={data.occupantNotes}
                          onChange={(e) =>
                            update("occupantNotes", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="grid gap-5">
                      <Field label="Products / Water Treatment">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            "Garburator",
                            "Reverse Osmosis",
                            "Iron Filter",
                            "Water Softener",
                          ].map((x) => (
                            <label
                              key={x}
                              className="rounded-xl border border-[#E0DBD7] p-4"
                            >
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={data.products.includes(x)}
                                onChange={(e) =>
                                  update(
                                    "products",
                                    e.target.checked
                                      ? [data.products, x]
                                          .filter(Boolean)
                                          .join(",")
                                      : data.products
                                          .split(",")
                                          .filter((v) => v !== x)
                                          .join(","),
                                  )
                                }
                              />
                              {x}
                            </label>
                          ))}
                        </div>
                      </Field>
                      <Field label="Additional high water use fixtures?">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            "Tub/s",
                            "Steam Shower / Multi Head Shower",
                            "Large laundry use",
                            "Hot tub / spa",
                            "Other high-use fixture",
                          ].map((x) => (
                            <label
                              key={x}
                              className="rounded-xl border border-[#E0DBD7] p-4"
                            >
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={data.waterFixtures.includes(x)}
                                onChange={(e) =>
                                  update(
                                    "waterFixtures",
                                    e.target.checked
                                      ? [data.waterFixtures, x]
                                          .filter(Boolean)
                                          .join(",")
                                      : data.waterFixtures
                                          .split(",")
                                          .filter((v) => v !== x)
                                          .join(","),
                                  )
                                }
                              />
                              {x}
                            </label>
                          ))}
                        </div>
                      </Field>
                      <Field label="Water Source" required>
                        <select
                          required
                          className={input}
                          value={data.waterSource}
                          onChange={(e) =>
                            update("waterSource", e.target.value)
                          }
                        >
                          <option value="">Select Water Source</option>
                          <option>Drilled well</option>
                          <option>Dug well</option>
                          <option>Cistern</option>
                          <option>Municipal / treated supply</option>
                          <option>Other / not sure</option>
                        </select>
                      </Field>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field
                        label="Location of neighbouring wells"
                        help="Approximate distance and direction if known."
                      >
                        <textarea
                          className={input}
                          value={data.neighbouringWells}
                          onChange={(e) =>
                            update("neighbouringWells", e.target.value)
                          }
                        />
                      </Field>
                      <Field label="Any covenants or easements?" required>
                        <select
                          required
                          className={input}
                          value={data.covenants}
                          onChange={(e) => update("covenants", e.target.value)}
                        >
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>Not sure</option>
                        </select>
                      </Field>
                      <Field
                        label="Are there other buildings on site?"
                        required
                      >
                        <select
                          required
                          className={input}
                          value={data.otherBuildings}
                          onChange={(e) =>
                            update("otherBuildings", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>Planned future buildings</option>
                        </select>
                      </Field>
                      <Field
                        label="Do you have/will have a home based business?"
                        required
                      >
                        <select
                          required
                          className={input}
                          value={data.homeBusiness}
                          onChange={(e) =>
                            update("homeBusiness", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>Possibly in future</option>
                        </select>
                      </Field>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="grid gap-5">
                      <Field
                        label="Hobbies"
                        help="Examples: gardening, livestock, workshop, home salon, food prep, equipment washing."
                      >
                        <textarea
                          className={input}
                          value={data.hobbies}
                          onChange={(e) => update("hobbies", e.target.value)}
                        />
                      </Field>
                      <Field
                        label="Lifestyle"
                        help="Anything that may affect water use or septic loading."
                      >
                        <textarea
                          className={input}
                          value={data.lifestyle}
                          onChange={(e) => update("lifestyle", e.target.value)}
                        />
                      </Field>
                      <Field label="Comments or Questions?">
                        <textarea
                          className={`${input} min-h-32`}
                          value={data.comments}
                          onChange={(e) => update("comments", e.target.value)}
                        />
                      </Field>
                    </div>
                  )}
                  {step === 5 && (
                    <div>
                      <h2 className="text-3xl font-black text-[#40190E]">
                        Review before submitting
                      </h2>
                      <p className="mt-3 text-[#40190E]/75">
                        Use Back or click any step above to edit. When
                        submitted, this will show a completed message only.
                        Email sending is temporarily disabled.
                      </p>
                      <dl className="mt-6 grid gap-3">
                        {Object.entries(data).map(([k, v]) => (
                          <div key={k} className="rounded-xl bg-[#E0DBD7] p-4">
                            <dt className="font-black text-[#40190E]">{k}</dt>
                            <dd className="text-[#40190E]/80">{v || "—"}</dd>
                          </div>
                        ))}
                      </dl>
                      <label className="mt-6 flex gap-3 rounded-2xl border border-[#D5560B]/40 bg-[#D5560B]/10 p-4 text-[#40190E]">
                        <input
                          required
                          type="checkbox"
                          className="mt-1 h-5 w-5 shrink-0"
                          checked={data.acknowledgement === "yes"}
                          onChange={(e) =>
                            update(
                              "acknowledgement",
                              e.target.checked ? "yes" : "",
                            )
                          }
                        />
                        <span className="font-bold leading-7">
                          By checking this ticbox, you acknowledge that the
                          information supplied on this form is correct to the
                          best of your knowledge. You further acknowledge and
                          understand that your system design will be based on
                          the information supplied.
                        </span>
                      </label>
                    </div>
                  )}
                  {submitError && (
                    <p
                      role="alert"
                      className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-800"
                    >
                      {submitError}
                    </p>
                  )}
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={back}
                      disabled={step === 0}
                      className="w-full rounded-full border-2 border-[#B5553A] px-6 py-3 font-black text-[#B5553A] disabled:opacity-40 sm:w-auto"
                    >
                      Back
                    </button>
                    <button
                      disabled={!canContinue}
                      className="w-full rounded-full bg-[#D5560B] px-6 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                    >
                      {step < intakeSteps.length - 1
                        ? "Continue"
                        : "Verify & Submit"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

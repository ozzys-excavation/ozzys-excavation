import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";
import Navbar from "./Navbar";
import Quote from "./Quote";
import ServiceAreas from "./ServiceAreas";
import Footer from "./Footer";
import PageMetadata from "./PageMetadata";
import { scrollTo } from "../utils/navigation";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#40190E] mb-4">
            Service Not Found
          </h1>
          <Link
            to="/"
            className="bg-[#D5560B] text-white px-6 py-3 rounded-full font-black"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMetadata
        title={`${service.title} Alberta | Ozzy's Excavation`}
        description={service.summary}
        keywords={service.seoKeywords}
        url={`https://ozzysexcavation.ca/services/${service.slug}`}
      />
      <Navbar />
      <main>
        <section className="relative isolate min-h-[520px] overflow-hidden bg-[#40190E]">
          <img
            src={service.image}
            alt={`${service.title} in Alberta`}
            className={
              service.pageImageClassName ??
              "absolute inset-0 -z-20 h-full w-full object-cover"
            }
            style={{
              objectPosition: service.pageImagePosition ?? "center center",
            }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#40190E]/95 via-[#40190E]/75 to-[#40190E]/35" />
          <div className="mx-auto flex max-w-7xl flex-col justify-center px-5 py-24 text-white lg:min-h-[520px]">
            <Link
              to="/#services"
              className="mb-6 font-black text-white/80 hover:text-white"
            >
              ← All Services
            </Link>
            <p className="mb-4 max-w-max rounded-full bg-[#D5560B] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white">
              Alberta Service Page
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-white/90">
              {service.summary}
            </p>
            <div className="mt-10">
              {service.slug === "septic-services" ? (
                <Link
                  to="/septic-assessment-form"
                  className="rounded-full bg-[#D5560B] px-7 py-4 font-black text-white shadow-xl shadow-black/30"
                >
                  Complete Septic Assessment Form
                </Link>
              ) : (
                <button
                  onClick={() => scrollTo("quote")}
                  className="rounded-full bg-[#D5560B] px-7 py-4 font-black text-white shadow-xl shadow-black/30"
                >
                  Request a Quote
                </button>
              )}
            </div>
          </div>
        </section>
        <section className="bg-white px-5 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-black uppercase tracking-[0.2em] text-[#B5553A]">
                What We Do
              </p>
              <h2 className="mt-4 text-4xl font-black text-[#40190E]">
                Professional {service.title} across Alberta.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#40190E]">
                {service.detail}
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#E0DBD7] p-7">
              <h3 className="text-2xl font-black text-[#40190E]">
                Service Includes
              </h3>
              <ul className="mt-6 grid gap-4 text-[#40190E] sm:grid-cols-2">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 rounded-2xl bg-white p-4 leading-6"
                  >
                    <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#D5560B]" />{" "}
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <Quote />
        <ServiceAreas />
      </main>
      <Footer />
    </>
  );
}

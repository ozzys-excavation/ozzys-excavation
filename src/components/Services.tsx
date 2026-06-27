import { Link } from "react-router-dom";
import type { Service } from "../types";
import { services } from "../data/services";
import { scrollTo } from "../utils/navigation";
function ServiceCard({ service }: { service: Service }) {
  const isSeptic = service.slug === "septic-services";
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#E0DBD7] bg-white shadow-xl shadow-[#40190E]/10 transition hover:-translate-y-1 hover:shadow-2xl">
      <img
        src={service.image}
        alt={`${service.title} by Ozzy's Excavation in Alberta`}
        className="h-56 w-full object-cover"
        style={{ objectPosition: service.cardImagePosition ?? "center center" }}
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl font-black text-[#40190E]">{service.title}</h3>
        <p className="mt-4 flex-1 leading-7 text-[#40190E]">
          {service.summary}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to={`/services/${service.slug}`}
            className="rounded-full border-2 border-[#B5553A] px-5 py-3 font-black text-[#B5553A] transition hover:bg-[#B5553A] hover:text-white"
          >
            Learn More
          </Link>
          {isSeptic ? (
            <Link
              to="/septic-assessment-form"
              className="rounded-full bg-[#D5560B] px-5 py-3 font-black text-white transition hover:bg-[#B5553A]"
            >
              Complete Septic Assessment Form
            </Link>
          ) : (
            <button
              onClick={() => scrollTo("quote")}
              className="rounded-full bg-[#D5560B] px-5 py-3 font-black text-white transition hover:bg-[#B5553A]"
            >
              Request a Quote
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-[#E0DBD7] px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-black uppercase tracking-[0.2em] text-[#B5553A]">
            Our Services
          </p>
          <h2 className="mt-4 text-4xl font-black text-[#40190E] md:text-5xl">
            Septic, earthwork and excavation services built for Alberta
            conditions.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

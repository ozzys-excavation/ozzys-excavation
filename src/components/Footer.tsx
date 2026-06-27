import { Link } from "react-router-dom";
import { services, associationLogos } from "../data/services";
export default function Footer() {
  return (
    <footer className="bg-[#260f08] px-5 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-black">Ozzy's Excavation</h2>
            <p className="mt-4 text-white/80">
              Professional septic, earthwork, excavation, water transfer, land
              clearing, demolition, screw pile, seasonal, and landscape services
              across Alberta.
            </p>
            <div className="mt-5 space-y-2">
              <a className="block font-bold" href="tel:+17782091414">
                778-209-1414
              </a>
              <a
                className="block font-bold"
                href="mailto:admin@ozzysexcavation.ca"
              >
                admin@ozzysexcavation.ca
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black">Compliance Notes</h3>
            <p className="mt-4 text-white/80">
              AOWMA-certified septic support. PSDS-compliant site assessments
              and soil testing. Fully insured, code-compliant operations with
              transparent communication from initial assessment to final
              inspection.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-black">Service Links</h3>
            <div className="mt-4 grid gap-2 text-white/80">
              {services.map((s) => (
                <Link
                  key={s.title}
                  to={`/services/${s.slug}`}
                  className="text-left hover:text-white"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black">Legal</h3>
            <div className="mt-4 grid gap-2 text-white/80">
              <Link
                to="/blog/winter-reclamation-story"
                className="font-bold hover:text-white"
              >
                Blog
              </Link>
              <Link
                to="/terms-of-service"
                className="font-bold hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy-compliance"
                className="font-bold hover:text-white"
              >
                Privacy Compliance
              </Link>
            </div>
            <p className="mt-4 text-white/80">
              © {new Date().getFullYear()} Ozzy's Excavation Services All rights
              reserved. Website optimized for Alberta excavation, septic,
              earthwork, and rural site development inquiries.
            </p>
          </div>
        </div>
        <div className="mt-12 rounded-[2rem] border border-white/15 bg-white/5 p-6">
          <h3 className="text-xl font-black">
            Industry Associations & Compliance
          </h3>
          <p className="mt-3 max-w-3xl text-white/80">
            Ozzy’s Excavation operates with recognized industry, safety, and
            regulatory standards for Alberta septic, excavation, and site
            development work.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {associationLogos.map((logo) => (
              <div
                key={logo.src}
                className="flex min-h-28 items-center justify-center rounded-2xl bg-white p-4"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-20 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

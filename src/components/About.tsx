import { aboutOperator } from "../data/images";
export default function About() {
  return (
    <section id="about" className="bg-white px-5 py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <img
          src={aboutOperator}
          alt="Ty Osborne, President and Founder of Ozzy's Excavation"
          className="h-72 w-full rounded-[2rem] object-cover object-top shadow-2xl sm:h-96 lg:h-[560px]"
          loading="lazy"
        />
        <div>
          <p className="font-black uppercase tracking-[0.2em] text-[#B5553A]">
            About Ozzy's Excavation Services
          </p>
          <h2 className="mt-4 text-4xl font-black text-[#40190E] md:text-5xl">
            Your land. Your vision.
            <br />
            Our expertise.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#40190E]">
            At Ozzy's Excavation Services, we provide end-to-end private septic
            system solutions for acreages, rural homes, and new builds across
            Alberta. As AOWMA-certified professionals, we are qualified to
            assess, design, install, repair, and upgrade septic systems that
            meet provincial standards and perform reliably for years to come.
          </p>
          <p className="mt-5 text-lg leading-8 text-[#40190E]">
            Ty Osborne grew up obsessed with machines, and that passion shaped a
            career across major heavy-civil and inner-city construction
            projects. After nearly a decade in the industry, Ozzy’s Excavation &
            Earthworks was built to turn acreages, backyards, and client visions
            into reality while delivering honest, high-quality work every time.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Certified & AOWMA-Approved",
              "Fully Insured & Code-Compliant",
              "Modern Equipment, Skilled Operators",
              "Transparent Pricing, No Hidden Fees",
              "Reliable workmanship built for Alberta conditions",
              "Regulatory compliance and reliability guarantee",
            ].map((x) => (
              <div
                key={x}
                className="rounded-2xl bg-[#E0DBD7] px-4 py-3 font-bold text-[#40190E]"
              >
                ✓ {x}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

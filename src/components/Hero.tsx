import { heroBg, heroLogo } from "../data/images";
import { scrollTo } from "../utils/navigation";
function DesktopHero() {
  return (
    <section className="relative isolate hidden min-h-[760px] overflow-hidden bg-[#40190E] md:block">
      <img
        src={heroBg}
        alt="Excavator preparing an Alberta site"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#40190E]/95 via-[#40190E]/78 to-[#40190E]/35" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-28 text-white lg:min-h-[760px] lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 max-w-max rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white/90">
            AOWMA Certified & Insured
          </p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">
            Ozzy's Excavation
            <br />
            <span className="block whitespace-nowrap text-xl leading-tight md:text-3xl lg:text-[2.05rem] xl:text-[2.25rem]">
              Professional Septic Installation
            </span>
            <span className="block whitespace-nowrap text-xl leading-tight md:text-3xl lg:text-[2.05rem] xl:text-[2.25rem]">
              Earthwork &amp; Excavation Services
            </span>
            <span className="block whitespace-nowrap text-xl leading-tight md:text-3xl lg:text-[2.05rem] xl:text-[2.25rem]">
              Across Alberta
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-white/90">
            Comprehensive mechanical and site development operations for
            acreages, rural homes, commercial properties, construction sites,
            water transfer, land clearing, demolition, screw piles, grading, and
            private septic systems.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("services")}
              className="rounded-full border-2 border-white bg-white px-7 py-4 font-black text-[#40190E]"
            >
              Our Services
            </button>
            <button
              onClick={() => scrollTo("quote")}
              className="rounded-full bg-[#D5560B] px-7 py-4 font-black text-white shadow-xl shadow-black/30"
            >
              Request a Quote
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="rounded-[2rem] border border-white/20 bg-white/90 p-2 shadow-2xl shadow-black/40 backdrop-blur">
            <img
              src={heroLogo}
              alt="Ozzy's Excavation hero logo"
              className="max-h-[400px] w-full max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#40190E] px-4 py-12 text-white md:hidden">
      <img
        src={heroBg}
        alt="Excavator preparing an Alberta site"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[#40190E]/88" />
      <div className="mx-auto max-w-xl">
        <p className="mb-3 max-w-max rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white/90">
          AOWMA Certified & Insured
        </p>
        <h1 className="text-3xl font-black leading-tight">Ozzy's Excavation</h1>
        <div className="mt-3 space-y-1 text-xl font-black leading-tight text-rust-light">
          <p>Septic Installation</p>
          <p>Earthwork & Excavation</p>
          <p>Across Alberta</p>
        </div>
        <p className="mt-6 text-base leading-7 text-white/90">
          Certified septic, earthwork, site development, land clearing,
          demolition, screw pile, grading, and rural excavation services built
          for Alberta conditions.
        </p>
        <div className="mt-8 grid gap-3">
          <button
            onClick={() => scrollTo("services")}
            className="w-full rounded-full border-2 border-white bg-white px-6 py-4 font-black text-[#40190E]"
          >
            Our Services
          </button>
          <button
            onClick={() => scrollTo("quote")}
            className="w-full rounded-full bg-[#D5560B] px-6 py-4 font-black text-white shadow-xl shadow-black/30"
          >
            Request a Quote
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <div id="home">
      <DesktopHero />
      <MobileHero />
    </div>
  );
}

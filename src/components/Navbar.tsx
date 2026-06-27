import { Link } from "react-router-dom";
import { footerLogo } from "../data/images";
import { scrollTo } from "../utils/navigation";
function DesktopNavbar() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-[#E0DBD7] bg-white/95 backdrop-blur md:block">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-3 text-left"
        >
          <img
            src={footerLogo}
            alt="Ozzy's Excavation logo"
            className="h-12 w-auto"
          />
          <span>
            <span className="block text-xl font-black tracking-tight text-[#40190E]">
              Ozzy's Excavation Services
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B5553A]">
              Septic and Earthworks - Alberta
            </span>
          </span>
        </button>
        <div className="hidden items-center gap-6 text-sm font-bold text-[#40190E] md:flex">
          <Link to="/#about">About</Link>
          <Link to="/#services">Services</Link>
          <Link to="/blog/winter-reclamation-story">Blog</Link>
          <Link to="/#coverage">Service Areas</Link>
          <a href="tel:+17782091414">778-209-1414</a>
          <Link
            to="/#quote"
            className="rounded-full bg-[#D5560B] px-5 py-3 text-white shadow-lg shadow-orange-900/20"
          >
            Request a Quote
          </Link>
        </div>
        <Link
            to="/#quote"
            className="rounded-full bg-[#D5560B] px-4 py-2 text-sm font-black text-white md:hidden"
          >
            Quote
          </Link>
      </nav>
    </header>
  );
}

function MobileNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E0DBD7] bg-white/95 backdrop-blur md:hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <button
          onClick={() => scrollTo("home")}
          className="flex min-w-0 items-center gap-2 text-left"
        >
          <img
            src={footerLogo}
            alt="Ozzy's Excavation logo"
            className="h-10 w-auto shrink-0"
          />
          <span className="min-w-0">
            <span className="block truncate text-base font-black tracking-tight text-[#40190E]">
              Ozzy's Excavation
            </span>
            <span className="block truncate text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#B5553A]">
              Septic & Earthworks
            </span>
          </span>
        </button>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="tel:+17782091414"
            className="rounded-full border-2 border-[#B5553A] px-4 py-3 text-sm font-black text-[#B5553A]"
          >
            Call
          </a>
          <Link
            to="/#quote"
            className="rounded-full bg-[#D5560B] px-4 py-3 text-sm font-black text-white"
          >
            Quote
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

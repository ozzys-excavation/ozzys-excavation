import { blogReclamationImages } from "../data/images";
import { scrollTo } from "../utils/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function BlogImageBlock({
  src,
  alt,
  reverse = false,
}: {
  src: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <figure
      className={`my-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center ${reverse ? "lg:grid-flow-col-dense" : ""}`}
    >
      <div className={reverse ? "lg:col-start-2" : ""}>
        <img
          src={src}
          alt={alt}
          className="h-48 w-full rounded-[2rem] object-cover shadow-2xl shadow-[#40190E]/20 sm:h-64 lg:h-[360px]"
          loading="lazy"
        />
      </div>
      <figcaption
        className={`rounded-[2rem] bg-[#E0DBD7] p-6 text-lg font-bold leading-8 text-[#40190E] ${reverse ? "lg:col-start-1" : ""}`}
      >
        Winter reclamation work in northern Alberta: remote access, frozen
        ground, heavy equipment, and a triple-cell wetland system built to
        restore long-term habitat value.
      </figcaption>
    </figure>
  );
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-[#40190E]">
        <section className="relative isolate overflow-hidden bg-[#40190E] px-5 py-24 text-white">
          <img
            src={blogReclamationImages[0]}
            alt="Winter reclamation project in northern Alberta"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#40190E]/95 via-[#40190E]/82 to-[#40190E]/45" />
          <div className="mx-auto max-w-5xl">
            <p className="font-black uppercase tracking-[0.2em] text-[#D5560B]">
              Reclamation Case Study
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              From Environmental Hazard to Thriving Wetland: A Winter
              Reclamation Story
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-white/90">
              When most contractors shut down for the winter, Ozzy’s Excavation
              was just getting started.
            </p>
          </div>
        </section>
        <article className="mx-auto max-w-5xl px-5 py-16">
          <div className="prose prose-lg max-w-none text-[#40190E]">
            <p className="text-xl leading-9">
              This past winter, Ozzy’s Excavation took on one of the most
              challenging and rewarding projects we’ve ever completed — a
              full-scale environmental reclamation job in the heart of northern
              Alberta. No mild weather, no easy access, no shortcuts. Just raw
              land, heavy iron, and a job that needed to get done right.
            </p>
            <h2 className="mt-12 text-3xl font-black text-[#40190E]">
              The Problem: 7,300 m³ of Environmental Liability
            </h2>
            <p>
              When we first arrived on site, what we were looking at wasn’t just
              a mess — it was an active environmental hazard. A massive 7,300
              cubic metre excavation had been left open, filled with water, and
              sitting in the middle of remote boreal forest. The surrounding
              land had been cleared and disturbed, leaving the ecosystem
              completely disrupted with no natural drainage, no vegetation, and
              no habitat value whatsoever.
            </p>
            <p>
              The kind of site that gets flagged by regulators and costs
              landowners serious money the longer it sits untouched.
            </p>
            <p>
              Our job: take it from a liability to a fully reclaimed,
              functioning natural area — in the middle of a northern Alberta
              winter.
            </p>
          </div>
          <BlogImageBlock
            src={blogReclamationImages[0]}
            alt="Open winter reclamation site with heavy equipment access"
          />
          <div className="prose prose-lg max-w-none text-[#40190E]">
            <h2 className="text-3xl font-black text-[#40190E]">
              The Challenge: Working in the North, in January
            </h2>
            <p>
              If you’ve never worked in the northern boreal in the dead of
              winter, it’s hard to explain what that actually means
              operationally. We’re talking about ground frozen solid, limited
              daylight, remote access roads, and conditions that most equipment
              operators won’t touch.
            </p>
            <p>
              The drone footage tells part of the story — snow-covered treelines
              stretching as far as you can see in every direction, a single
              access road carved through the bush, and our crew out there
              pushing dirt and reclaiming land while the rest of the industry
              was sitting on the sidelines.
            </p>
            <p>
              We mobilized heavy equipment including a CAT dozer and John Deere
              excavator, worked the frozen ground strategically, and executed a
              precise earthworks plan that had to account for drainage,
              compaction, and long-term ecological function — not just
              aesthetics.
            </p>
          </div>
          <BlogImageBlock
            src={blogReclamationImages[1]}
            alt="Heavy equipment working through snow on a reclamation site"
            reverse
          />
          <div className="prose prose-lg max-w-none text-[#40190E]">
            <h2 className="text-3xl font-black text-[#40190E]">
              The Work: Precision Earthworks in Extreme Conditions
            </h2>
            <p>
              Reclamation isn’t just filling a hole. Done properly, it requires
              engineering the land to function naturally once you walk away from
              it.
            </p>
            <p>On this project that meant:</p>
            <ul>
              <li>
                Bulk earthworks moving thousands of cubic metres of material to
                achieve the correct grades and contours
              </li>
              <li>
                Designing and constructing a triple-cell wetland system — three
                distinct wetland areas engineered to hold water at the right
                depths and flow into each other naturally
              </li>
              <li>
                Establishing proper siltation controls and erosion protection
                throughout the site perimeter
              </li>
              <li>
                Grading the surrounding disturbed areas to promote natural
                revegetation
              </li>
              <li>
                Building it all during freeze-up, so it would be ready to come
                alive the moment spring hit
              </li>
            </ul>
            <p>
              The triple wetland design was deliberate. Rather than simply
              backfilling the hazard and walking away, we created something with
              genuine ecological value — shallow zones for waterfowl, deeper
              cells for aquatic species, and transitional edges that provide
              cover and nesting habitat.
            </p>
          </div>
          <BlogImageBlock
            src={blogReclamationImages[2]}
            alt="Triple-cell wetland reclamation grading in winter"
          />
          <div className="prose prose-lg max-w-none text-[#40190E]">
            <h2 className="text-3xl font-black text-[#40190E]">
              The Result: Wildlife Ready on Day One of Spring
            </h2>
            <p>
              When the snow melts, this site won’t look like a construction
              zone. It’ll look like it was always meant to be there.
            </p>
            <p>
              The three wetland cells are now fully graded and ready to fill
              naturally with snowmelt and rainfall. The surrounding land has
              been contoured back to a natural profile. The silt fencing and
              erosion controls are in place. And the boreal forest that was once
              encroached upon by an open hazard now has a functioning wetland
              system sitting at its edge — exactly the kind of habitat that
              ducks, shorebirds, and other northern wildlife thrive in.
            </p>
            <p>
              From a 7,300 m³ water-filled pit to a triple wetland reclamation
              area. In winter. In the north.
            </p>
          </div>
          <BlogImageBlock
            src={blogReclamationImages[3]}
            alt="Completed winter wetland reclamation contours in northern Alberta"
            reverse
          />
          <div className="rounded-[2rem] bg-[#40190E] p-8 text-white md:p-10">
            <h2 className="text-3xl font-black">Why It Matters</h2>
            <p className="mt-5 text-lg leading-8 text-white/90">
              Projects like this are a reminder of what excavation and
              earthworks can actually accomplish when they’re done with
              intention. We’re not just moving dirt — we’re restoring land,
              fixing problems other people left behind, and building things that
              last.
            </p>
            <p className="mt-5 text-lg leading-8 text-white/90">
              If you’ve got a reclamation project, a disturbed site, or an
              environmental liability sitting on your property anywhere in
              Alberta, this is exactly the kind of work we do.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("quote")}
                className="rounded-full bg-[#D5560B] px-7 py-4 font-black text-white shadow-xl shadow-black/30"
              >
                Request a Quote
              </button>
            </div>
            <p className="mt-8 font-black text-white">
              Ozzy’s Excavation — Septic, Earthworks, Reclamation & Excavation
              Services Across Alberta
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

import { primaryCities, towns, counties } from "../data/services";
function LocationColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-black text-[#40190E]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[#E0DBD7] px-3 py-2 text-sm font-bold text-[#40190E]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ServiceAreas() {
  return (
    <section id="coverage" className="bg-white px-5 py-20 text-[#40190E]">
      <div className="mx-auto max-w-7xl">
        <p className="font-black uppercase tracking-[0.2em] text-[#D5560B]">
          Service Areas
        </p>
        <h2 className="mt-4 text-4xl font-black md:text-5xl">
          Serving Communities Across Alberta
        </h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#40190E]/80">
          Location optimization matrix for rural septic, acreage excavation,
          construction dewatering, land clearing, and site development searches
          across Alberta.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <LocationColumn title="Primary Cities" items={primaryCities} />
          <LocationColumn
            title="Fast-Growing Towns & Core Commuter Belts"
            items={towns}
          />
          <LocationColumn
            title="Surrounding Regional Counties"
            items={counties}
          />
        </div>
      </div>
    </section>
  );
}

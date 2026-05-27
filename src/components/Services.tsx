import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ServiceCategory {
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  items: string[]
}

const serviceCategories: ServiceCategory[] = [
  {
    slug: 'septic-systems',
    title: 'Septic Systems',
    subtitle: 'AOWMA-Certified',
    description: 'End-to-end private septic system solutions for acreages, rural homes, and new builds across Alberta — from soil evaluation to final commissioning.',
    image: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=800&q=80',
    items: [
      'AOWMA-Certified System Design',
      'Septic System Installation',
      'System Repair & Emergency Services',
      'Septic System Maintenance',
      'Site Assessments & Soil Testing (PSDS)',
      'Real Estate & Compliance Inspections',
      'Advanced Treatment Solutions',
      'Homeowner Septic Education',
    ],
  },
  {
    slug: 'land-clearing',
    title: 'Land Clearing & Mulching',
    subtitle: 'Forestry Services',
    description: 'Professional forestry mulching and land clearing services that leave your site clean, accessible, and ready for the next phase.',
    image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800&q=80',
    items: [
      'Forestry Mulching (Brush & Tree Clearing)',
      'Overgrowth Control & Site Reclamation',
      'Fire Guard & Line Clearing',
      'Pipeline & Lease Clearing',
      'Right-of-Way Clearing',
    ],
  },
  {
    slug: 'excavation-earthworks',
    title: 'Excavation & Earthworks',
    subtitle: 'Site Development',
    description: 'From basement digs to acreage site prep — we handle every cubic yard with precision, the right equipment, and an eye on the finish grade.',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&q=80',
    items: [
      'Basement Excavation (New & Existing)',
      'Foundation Excavation & Backfill',
      'Trenching & Utility Excavation',
      'Garage Pads, Shop Pads & Building Pads',
      'Acreage Site Prep & Lot Development',
      'Road Building, Ditching, Culvert Install',
      'Rough Grade & Final Grade',
      'Driveway Building & Repair',
    ],
  },
  {
    slug: 'dewatering',
    title: 'Dewatering & Water Transfer',
    subtitle: 'Pump Solutions',
    description: 'High-volume dewatering and water transfer services for construction sites, mines, and emergency flood response.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    items: [
      'Construction & Mine Dewatering',
      'High Volume Water Transfer',
      'Pump Rentals & Custom Packages',
      'Emergency Flood Response & Site Drainage',
    ],
  },
  {
    slug: 'screw-piles',
    title: 'Screw Pile Installation',
    subtitle: 'Precision Augering',
    description: 'Precise auguring and screw-pile installation for fences, decks, signage, and foundation footings — completed with accuracy and efficiency.',
    image: 'https://images.unsplash.com/photo-1574359411659-155f81e15893?w=800&q=80',
    items: [
      'Fence & Deck Post Hole Auguring',
      'Screw Pile Holes with Depth-Specific Options',
      'Weight-Rated & Engineered Designs',
      'Signage Installations',
      'Foundation Footing Augering',
    ],
  },
  {
    slug: 'additional-services',
    title: 'Additional Services',
    subtitle: 'More Ways We Help',
    description: 'Beyond earthworks — demolition, snow removal, landscaping, and seasonal services to keep your property in top shape year-round.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    items: [
      'Residential & Commercial Demolition',
      'Concrete & Asphalt Removal',
      'Snow Removal & Hauling',
      'Topsoil Spreading & Final Grading',
      'Sod Prep & Install',
      'Retaining Wall Design & Install',
      'Pressure Washing Services',
    ],
  },
]

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(0)

  const current = serviceCategories[activeCategory]

  return (
    <section id="services" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rust font-semibold text-sm tracking-widest uppercase">Our Services</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-earth">
            Septic, Earthwork <span className="text-rust">&</span> Excavation
          </h2>
          <p className="mt-4 text-lg text-gray-800">
            Everything from initial site assessment to final grade — we're your single source for land development in Alberta.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {serviceCategories.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-3 rounded-full font-medium text-sm transition-all ${
                activeCategory === i
                  ? 'bg-rust text-white shadow-lg shadow-rust/25'
                  : 'bg-warm-cream text-earth hover:bg-rust/10'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Category Detail */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative animate-slide-in-left" key={`img-${activeCategory}`}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 bg-rust text-white px-6 py-3 rounded-xl shadow-lg">
              <span className="text-sm font-semibold">{current.subtitle}</span>
            </div>
          </div>

          {/* Content */}
          <div className="animate-slide-in-right" key={`content-${activeCategory}`}>
            <span className="text-rust font-semibold text-sm tracking-widest uppercase">{current.subtitle}</span>
            <h3 className="mt-2 text-3xl font-display font-bold text-earth mb-4">{current.title}</h3>
            <p className="text-gray-800 leading-relaxed mb-8 text-lg">{current.description}</p>

            {/* Service list */}
            <div className="grid sm:grid-cols-2 gap-3">
              {current.items.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-rust mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-rust hover:bg-rust-dark text-white px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-rust/25"
              >
                Request This Service
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                to={`/services/${current.slug}`}
                className="inline-flex items-center gap-2 border-2 border-rust text-rust hover:bg-rust hover:text-white px-6 py-3 rounded-full font-medium transition-all"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

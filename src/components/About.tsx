export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-earth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/ozzy.jpg"
                alt="Ozzy — Owner of Ozzy's Excavation & Earthworks"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl hidden lg:block">
              <div className="text-rust text-4xl font-display font-bold">10+</div>
              <div className="text-earth/60 text-sm mt-1">Years in the<br />Industry</div>
            </div>
            <div className="absolute -top-8 -right-8 bg-rust rounded-2xl p-6 shadow-xl hidden lg:block">
              <div className="text-white text-4xl font-display font-bold">500+</div>
              <div className="text-white/70 text-sm mt-1">Projects<br />Completed</div>
            </div>
          </div>

          {/* Content */}
          <div className="text-white">
            <span className="text-rust-light font-semibold text-sm tracking-widest uppercase">About Oz</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
              A Lifetime of Passion for <span className="text-rust-light">Heavy Equipment</span>
            </h2>

            <div className="mt-8 space-y-5 text-white/90 leading-relaxed text-lg">
              <p>
                I grew up obsessed with machines, and that childhood passion shaped a career across major heavy-civil
                and inner-city construction projects. After nearly a decade in the industry, I built Ozzy's Excavation
                & Earthworks to turn acreages, backyards, and rural properties into functional, beautiful spaces.
              </p>
              <p>
                At Ozzy's Excavation Services, we provide end-to-end private septic system solutions for acreages,
                rural homes, and new builds across Alberta. As AOWMA-certified professionals, we are qualified to
                assess, design, install, repair, and upgrade septic systems of any size or complexity.
              </p>
              <p>
                Whether you're building a new home, replacing a failed system, expanding your property, or correcting
                drainage issues — we take care of everything from initial soil evaluation and permitting to final
                inspection and commissioning.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-8">
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '500+', label: 'Projects Done' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-rust-light">{stat.value}</div>
                  <div className="text-white/75 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <span className="text-white/60 italic text-lg">— Your land. Your vision. Our expertise.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

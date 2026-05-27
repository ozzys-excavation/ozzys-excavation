const links = {
  Services: [
    'Septic Systems',
    'Land Clearing & Mulching',
    'Excavation & Earthworks',
    'Dewatering & Water Transfer',
    'Screw Pile Installation',
    'Demolition',
    'Snow Removal',
  ],
  Company: [
    'About Oz',
    'Our Equipment',
    'Service Areas',
    'Careers',
  ],
  Resources: [
    'Septic System Guide',
    'Alberta Regulations',
    'FAQ',
    'Blog',
  ],
}

export default function Footer() {
  return (
    <footer className="bg-earth text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rust rounded-lg flex items-center justify-center text-white font-display font-bold text-lg">
                O
              </div>
              <div>
                <div className="font-display font-bold text-xl">Ozzy's Excavation</div>
                <div className="text-white/50 text-sm">Earthworks & Septic</div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-8 max-w-sm">
              Expert Excavation & Site Solutions, Certified Septic Installer. Proudly serving Alberta with reliable
              workmanship since day one.
            </p>
            {/* Certifications */}
            <div className="flex items-center gap-4">
              <div className="bg-white/10 rounded-lg px-4 py-2 text-sm text-white/85">
                AOWMA Certified
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2 text-sm text-white/85">
                Fully Insured
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white/50 mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/80 hover:text-rust-light transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Ozzy's Energy Services Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/50 hover:text-white/80 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white/80 transition-colors text-sm">Terms of Service</a>
            <a
              href="https://www.ozzysexcavation.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-rust-light transition-colors text-sm flex items-center gap-1"
            >
              ozzysexcavation.ca
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

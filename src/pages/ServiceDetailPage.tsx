import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { getServiceBySlug, services } from '../data/services'
import FadeInSection from '../components/FadeInSection'

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceBySlug(slug ?? '')
  const [selectedImage, setSelectedImage] = useState(0)

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-cream">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-earth mb-4">Service Not Found</h1>
          <p className="text-gray-800 mb-8">The service you're looking for doesn't exist.</p>
          <Link to="/" className="bg-rust text-white px-6 py-3 rounded-full font-medium hover:bg-rust-dark transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={service.hero}
          alt={service.heroAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <Link to="/#services" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Services
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-3">
              {service.title}
            </h1>
            <p className="text-xl text-rust-light font-medium">{service.subtitle}</p>
          </div>
        </div>
      </section>

      <FadeInSection>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Description */}
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl font-display font-bold text-earth mb-6">Overview</h2>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">{service.description}</p>
              {service.overview.map((p, i) => (
                <p key={i} className="text-gray-800 leading-relaxed mb-4">{p}</p>
              ))}
            </div>

            {/* Service Items Grid */}
            <div className="mb-20">
              <h2 className="text-3xl font-display font-bold text-earth mb-8">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.items.map((item) => (
                  <div key={item.name} className="bg-warm-cream rounded-2xl p-6 hover:shadow-lg hover:bg-white transition-all border border-transparent hover:border-rust/10 group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-rust/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-rust/20 transition-colors">
                        <svg className="w-5 h-5 text-rust" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-earth text-lg mb-1">{item.name}</h3>
                        <p className="text-gray-800 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Process */}
      {service.process.length > 0 && (
        <FadeInSection delay={100}>
          <section className="py-16 bg-warm-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-display font-bold text-earth mb-4 text-center">Our Process</h2>
              <p className="text-gray-800 text-center max-w-2xl mx-auto mb-12">
                How we take your {service.title.toLowerCase()} project from concept to completion
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.process.map((step, i) => (
                  <div key={step.title} className="relative">
                    <div className="bg-white rounded-2xl p-6 h-full shadow-sm">
                      <div className="w-12 h-12 bg-rust text-white rounded-full flex items-center justify-center font-bold text-xl font-display mb-4">
                        {i + 1}
                      </div>
                      <h3 className="font-bold text-earth text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-800 leading-relaxed">{step.description}</p>
                    </div>
                    {i < service.process.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-rust/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      {/* Equipment */}
      {service.equipment.length > 0 && (
        <FadeInSection delay={150}>
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-display font-bold text-earth mb-8 text-center">Equipment We Use</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {service.equipment.map((eq) => (
                  <span key={eq} className="px-5 py-2.5 bg-warm-cream text-earth font-medium rounded-full text-sm hover:bg-rust/10 transition-colors">
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      {/* Gallery */}
      <FadeInSection delay={200}>
        <section className="py-16 bg-warm-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-earth mb-8 text-center">Project Gallery</h2>
            {/* Main image */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xl mb-4">
              <img
                src={service.gallery[selectedImage]?.src ?? service.gallery[0].src}
                alt={service.gallery[selectedImage]?.alt ?? service.gallery[0].alt}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {service.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden transition-all ${
                    i === selectedImage ? 'ring-2 ring-rust ring-offset-2 ring-offset-warm-cream scale-95' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* FAQ */}
      {service.faq.length > 0 && (
        <FadeInSection delay={250}>
          <section className="py-16 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-display font-bold text-earth mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {service.faq.map((item) => (
                  <FAQItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-earth text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Ready to Start Your {service.title} Project?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Get in touch for a free estimate. We'll assess your site, answer your questions, and provide a detailed quote with no obligation.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-rust hover:bg-rust-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-rust/25"
          >
            Get a Free Estimate
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-display font-bold text-earth mb-8 text-center">Explore Other Services</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.filter(s => s.slug !== service.slug).map(s => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="bg-white rounded-xl p-5 hover:shadow-md transition-all group"
              >
                <h4 className="font-bold text-earth group-hover:text-rust transition-colors">{s.title}</h4>
                <p className="text-sm text-gray-800 mt-1">{s.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-warm-cream/50 transition-colors"
      >
        <span className="font-semibold text-earth">{question}</span>
        <svg
          className={`w-5 h-5 text-rust flex-shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-800 leading-relaxed">{answer}</div>
      )}
    </div>
  )
}

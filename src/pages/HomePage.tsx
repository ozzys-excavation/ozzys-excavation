import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import About from '../components/About'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import FadeInSection from '../components/FadeInSection'

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    // Wait for React to commit DOM, then scroll to the anchor
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      // Small delay to let layout settle (especially after route change)
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [hash])

  return (
    <>
      <Hero />
      <FadeInSection>
        <WhyChooseUs />
      </FadeInSection>
      <FadeInSection delay={100}>
        <Services />
      </FadeInSection>
      <FadeInSection delay={150}>
        <About />
      </FadeInSection>
      <FadeInSection delay={200}>
        <CTA />
      </FadeInSection>
      <Footer />
    </>
  )
}

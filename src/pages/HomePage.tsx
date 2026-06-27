import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Quote from "../components/Quote";
import ServiceAreas from "../components/ServiceAreas";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import { scrollTo } from "../utils/navigation";

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    const id = hash.replace("#", "");
    if (id) {
      window.requestAnimationFrame(() => scrollTo(id));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return (
    <>
      <SeoJsonLd />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Quote />
        <ServiceAreas />
      </main>
      <Footer />
    </>
  );
}

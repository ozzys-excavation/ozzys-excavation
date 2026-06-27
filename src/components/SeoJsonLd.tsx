import { useMemo } from "react";
import { primaryCities, towns, counties } from "../data/services";

export default function SeoJsonLd() {
  const data = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Ozzy's Excavation",
      url: "https://ozzysexcavation.ca",
      email: "admin@ozzysexcavation.ca",
      telephone: "+1-778-209-1414",
      areaServed: [...primaryCities, ...towns, ...counties, "Alberta"],
      description:
        "Professional septic, earthwork, excavation, dewatering, land clearing, screw pile, demolition, seasonal, and landscape services across Alberta.",
    }),
    [],
  );
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

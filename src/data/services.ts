import type { Service } from "../types";

// Image paths used for service cards
const septicImg = "/images/Services/septic.webp";
const landClearingImg = "/images/Services/land_clearing.webp";
const excavationImg = "/images/Services/excavation_earthworks.webp";
const dewateringImg = "/images/Services/dewatering.webp";
const screwPileImg = "/images/Services/screw_pile.webp";
const demolitionImg = "/images/Services/demo_decomm_optimized.webp";
const seasonalImg = "/images/Services/seasonal.webp";
const landscapeImg = "/images/Services/landscaping.webp";

export const services: Service[] = [
  {
    title: "Septic Services",
    slug: "septic-services",
    image: septicImg,
    summary:
      "AOWMA-certified private septic system design, PSDS-compliant soil testing, installation, emergency repair, maintenance, advanced treatment, and real estate septic inspections across Alberta.",
    features: [
      "AOWMA-Certified Septic System Design",
      "Private Septic System Installation",
      "System Repair & Emergency Services",
      "Septic System Maintenance",
      "PSDS-Compliant Site Assessments & Soil Testing",
      "Real Estate & Compliance Inspection",
      "Advanced Treatment Solutions",
      "Homeowner Septic Education",
    ],
    detail:
      "Reliable waste management starts below the surface. We provide end-to-end, AOWMA-certified private septic system solutions custom-tailored for rural homes, new acreage builds, and property expansions across Alberta. From initial PSDS-compliant site assessments and soil testing to provincial permitting, engineered design, and final system installation, we ensure your setup is code-compliant and built to last. Whether you need emergency septic repair, an advanced treatment solution, or a comprehensive real estate compliance inspection, our certified team handles the dirty work with absolute precision.",
    seoKeywords: [
      "AOWMA certified septic installers",
      "private septic system design Alberta",
      "septic installation near me",
      "PSDS compliant soil testing",
      "acreage septic system repair",
      "real estate septic inspection",
    ],
  },
  {
    title: "Land Clearing & Mulching",
    slug: "land-clearing-mulching",
    image: landClearingImg,
    cardImagePosition: "center bottom",
    pageImagePosition: "center center",
    summary:
      "Forestry mulching, acreage land clearing, brush and tree clearing, fire guards, site reclamation, pipeline/lease clearing, and right-of-way maintenance.",
    features: [
      "Forestry Mulching Alberta",
      "Acreage Land Clearing",
      "Brush & Tree Clearing",
      "Overgrowth Control & Site Reclamation",
      "Fire Guard Clearing",
      "Pipeline & Lease Clearing",
      "Right-of-Way Maintenance",
    ],
    detail:
      "Transform overgrown, dense brush into usable, valuable acreage. Our high-efficiency forestry mulching and land clearing services quickly remove unwanted trees, thick overgrowth, and stumps without damaging the surrounding topsoil or root systems. We provide comprehensive site reclamation, right-of-way maintenance, pipeline and lease clearing, and wildfire-preventative fire guards. Whether you are prepping a lot for development or restoring an overgrown property line, our mulching equipment leaves behind a clean, nutrient-rich layer that prevents erosion and clears the path for your project.",
    seoKeywords: [
      "forestry mulching Alberta",
      "acreage land clearing",
      "brush and tree clearing",
      "site reclamation contractors",
      "fire guard clearing",
      "right-of-way maintenance",
    ],
  },
  {
    title: "Excavation & Earthworks",
    slug: "excavation-earthworks",
    image: excavationImg,
    cardImagePosition: "center center",
    pageImagePosition: "center center",
    summary:
      "Basement excavation contractors for acreage site preparation, foundation backfilling, utility trenching, driveway building, culverts, and final grading services.",
    features: [
      "Basement Excavation Contractors",
      "Foundation Excavation & Backfill",
      "Trenching & Utility Excavation",
      "Garage Pads, Shop Pads & Building Pads",
      "Acreage Site Preparation",
      "Road Building, Ditching & Culvert Installation",
      "Rough Grade & Final Grade",
      "Driveway Building Alberta",
      "Bulk Earth Moving",
    ],
    detail:
      "From breaking ground on a new build to shaping your final landscape, our heavy civil and residential excavation services lay a flawless foundation for your project. We specialize in precision basement and foundation excavation, safe utility trenching for water, sewer, gas, and electrical, and commercial-grade shop or garage pad preparation. Developing a new lot? We build durable rural roads, install drainage culverts, and handle bulk earthmoving. With our advanced fleet and skilled operators, we deliver exact rough and final grading to ensure proper water drainage away from your structures.",
    seoKeywords: [
      "basement excavation contractors",
      "acreage site preparation",
      "driveway building Alberta",
      "foundation backfilling",
      "trenching and utility excavation",
      "final grading services",
    ],
  },
  {
    title: "Dewatering & Water Transfer Services",
    slug: "dewatering-water-transfer",
    image: dewateringImg,
    summary:
      "Construction site dewatering, high-volume water transfer, emergency flood pumping, jobsite drainage solutions, commercial pump rentals, and custom pumping packages.",
    features: [
      "Construction Site Dewatering",
      "High Volume Water Transfer",
      "Commercial Pump Rentals",
      "Emergency Flood Pumping",
      "Jobsite Drainage Solutions",
      "Custom Pumping Packages",
    ],
    detail:
      "Do not let standing water derail your construction schedule or threaten asset integrity. We deliver high-volume water transfer and active dewatering solutions for construction sites, civil projects, and industrial environments. Featuring custom pumping packages and heavy-duty equipment, we rapidly manage water table levels, control jobsite flooding, and implement reliable drainage diversions. From scheduled site dry-outs to rapid-response emergency flood pumping, we keep your ground workable and your project moving forward safely.",
    seoKeywords: [
      "construction site dewatering",
      "high volume water transfer",
      "emergency flood pumping",
      "jobsite drainage solutions",
      "commercial pump rentals",
    ],
  },
  {
    title: "Screw Pile Installation",
    slug: "screw-pile-installation",
    image: screwPileImg,
    summary:
      "Engineered screw piles, post hole augering, deck and fence foundations, industrial foundation footings, signage supports, and torque-monitored pile installation.",
    features: [
      "Engineered Screw Piles Alberta",
      "Post Hole Augering",
      "Deck and Fence Foundation",
      "Depth-Specific Weight-Rated Screw Piles",
      "Industrial Foundation Footings",
      "Signage Installations",
      "Foundation Footing Augering",
    ],
    detail:
      "Avoid the shifting, settling, and cracking associated with traditional concrete footings. Our precision screw pile installation offers a fast, weather-resistant, engineered foundation solution designed to withstand harsh Alberta frost cycles. We offer depth-specific, weight-rated screw piles perfectly suited for decks, fences, grade beams, and heavy signage. Utilizing accurate torque monitoring equipment, we ensure every pile meets structural engineering requirements, allowing you to build immediately with zero downtime for concrete curing.",
    seoKeywords: [
      "engineered screw piles Alberta",
      "post hole augering",
      "deck and fence foundation",
      "screw pile installation near me",
      "industrial foundation footings",
    ],
  },
  {
    title: "Demolition & Decommission",
    slug: "demolition-decommission",
    image: demolitionImg,
    summary:
      "Residential demolition contractors for structure decommissioning, garage and shed demolition, concrete and asphalt removal, foundation breaking, and site cleanup.",
    features: [
      "Residential & Commercial Demolition",
      "Concrete and Asphalt Removal",
      "Garage and Shed Demolition",
      "Structure Decommissioning",
      "Foundation Breaking",
      "Site Clean Up Services",
      "Responsible Material Disposal",
    ],
    detail:
      "Safely clearing the way for something new requires the right equipment and structural expertise. We offer full-service residential and commercial demolition, specializing in dismantling houses, detached garages, barns, and outbuildings safely and efficiently. Our team handles everything from initial structural knockdown to heavy concrete and asphalt removal, foundation breaking, and complete site cleanup. We prioritize safety, environmental regulations, and responsible material disposal, leaving you with a clean slate for your next development.",
    seoKeywords: [
      "residential demolition contractors",
      "concrete and asphalt removal",
      "garage and shed demolition",
      "structure decommissioning",
      "site clean up services",
    ],
  },
  {
    title: "Seasonal Services",
    slug: "seasonal-services",
    image: seasonalImg,
    cardImagePosition: "center top",
    pageImagePosition: "center top",
    summary:
      "Reliable snow removal, snow hauling, ice control, sanding, and seasonal commercial or residential contracts for Alberta winter conditions.",
    features: [
      "Snow Removal & Hauling",
      "Ice Control & Sanding",
      "Commercial & Residential Snow Contracts",
    ],
    detail:
      "Reliable winter support for residential and commercial clients who need access maintained, liability reduced, and snow managed through Alberta conditions.",
  },
  {
    title: "Landscape",
    slug: "landscape-services",
    image: landscapeImg,
    cardImagePosition: "center top",
    pageImagePosition: "center center",
    pageImageClassName: "absolute inset-0 -z-20 h-full w-full object-cover",
    summary:
      "Retaining wall contractors for final grade topsoil, residential sod installation, concrete prep work, pressure washing, and exterior grading projects.",
    features: [
      "Retaining Wall Design & Installation",
      "Final Grade Topsoil Spreading",
      "Residential Sod Installation",
      "Concrete Prep Work",
      "Pressure Washing Services",
      "Exterior Grading & Landscaping",
    ],
    detail:
      "Maximize your property’s curb appeal and functionality with professional exterior grading and landscaping installations. We specialize in structural retaining wall design and installation, heavy concrete preparation for walkways or patios, and precision final topsoil spreading. Once your grade is perfectly set for proper water runoff, our team handles professional sod installation for an instantly finished lawn. We also offer commercial-grade exterior pressure washing for driveways and buildings to keep your completed property looking pristine year-round.",
    seoKeywords: [
      "retaining wall contractors",
      "final grade topsoil",
      "residential sod installation",
      "concrete prep work",
      "pressure washing services",
    ],
  },
];

export const primaryCities = [
  "Calgary",
  "Edmonton",
  "Red Deer",
  "Lethbridge",
  "Airdrie",
  "Grande Prairie",
  "Medicine Hat",
  "St. Albert",
  "Spruce Grove",
  "Leduc",
  "Fort McMurray",
];
export const towns = [
  "Cochrane",
  "Okotoks",
  "Chestermere",
  "Stony Plain",
  "Sylvan Lake",
  "Canmore",
  "Strathmore",
  "High River",
  "Fort Saskatchewan",
  "Beaumont",
  "Morinville",
];
export const counties = [
  "Rocky View County",
  "Foothills County",
  "Parkland County",
  "Strathcona County",
  "Wheatland County",
  "Mountain View County",
  "Sturgeon County",
];
export const associationLogos = [
  { src: "/images/Footer/aowma.webp", alt: "AOWMA industry association logo" },
  { src: "/images/Footer/acsa.webp", alt: "ACSA safety association logo" },
  { src: "/images/Footer/esc.webp", alt: "ESC safety certification logo" },
  {
    src: "/images/Footer/cor.webp",
    alt: "Certificate of Recognition COR logo",
  },
];

export const serviceRoutes = Object.fromEntries(
  services.map((service) => [service.slug, `/services/${service.slug}`]),
) as Record<string, string>;
export const allowedStandaloneRoutes = new Set([
  "/septic-assessment-form",
  "/terms-of-service",
  "/privacy-compliance",
  "/blog/winter-reclamation-story",
  "/blog",
]);

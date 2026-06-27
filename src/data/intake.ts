import type { IntakeData } from "../types";

export const intakeInitial: IntakeData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  requirements: "",
  houseSize: "",
  occupants: "",
  occupantNotes: "",
  bedrooms: "",
  bathrooms: "",
  products: "",
  waterFixtures: "",
  waterSource: "",
  neighbouringWells: "",
  covenants: "",
  hobbies: "",
  lifestyle: "",
  otherBuildings: "",
  homeBusiness: "",
  comments: "",
  acknowledgement: "",
};

export const intakeSteps = [
  "Contact",
  "Property",
  "Household",
  "Water Use",
  "Site Details",
  "Review",
];

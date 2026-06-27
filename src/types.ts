export type Service = {
  title: string;
  slug: string;
  image: string;
  cardImagePosition?: string;
  pageImagePosition?: string;
  pageImageClassName?: string;
  summary: string;
  features: string[];
  detail: string;
  seoKeywords?: string[];
};

export type IntakeData = Record<string, string>;

declare global {
  interface Window {
    __ozzysNavigate?: (path: string) => void;
    OzzysChatNavigation?: {
      goToService: (serviceSlug: string) => string;
      startQuote: (serviceSlug?: string) => string;
      startSepticAssessment: () => string;
      scrollToSection: (sectionId: string) => string;
      navigateToAllowedPath: (path: string) => string;
    };
  }
}

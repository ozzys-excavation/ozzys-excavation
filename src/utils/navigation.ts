import { serviceRoutes, allowedStandaloneRoutes } from "../data/services";

export function normalizeInternalPath(path: string) {
  if (!path) return "";
  try {
    const url = new URL(path, window.location.origin);
    if (url.origin !== window.location.origin) return "";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "";
  }
}

export function chatNavigateTo(path: string) {
  const normalized = normalizeInternalPath(path);
  if (!normalized)
    return "Navigation blocked: only internal Ozzy's Excavation pages are allowed.";
  const [pathnameWithSearch] = normalized.split("#");
  const [pathname] = pathnameWithSearch.split("?");
  const isAllowed =
    pathname === "/" ||
    allowedStandaloneRoutes.has(pathname) ||
    Object.values(serviceRoutes).includes(pathname);
  if (!isAllowed)
    return "Navigation blocked: page is not on the approved navigation list.";
  window.history.pushState({}, "", normalized);
  window.dispatchEvent(new Event("ozzys:navigation"));
  // React Router — use global navigate if available, otherwise hard navigate
  if (window.__ozzysNavigate) {
    window.__ozzysNavigate(normalized);
  } else {
    window.location.href = normalized;
  }
  return `Opened ${normalized}.`;
}
export function setupChatNavigationHelpers() {
  window.OzzysChatNavigation = {
    goToService: (serviceSlug: string) => {
      const route = serviceRoutes[serviceSlug];
      if (!route) return "Unknown service. Navigation blocked.";
      return chatNavigateTo(route);
    },
    startQuote: (serviceSlug = "") => {
      if (serviceSlug === "septic-services")
        return chatNavigateTo("/septic-assessment-form");
      const query =
        serviceSlug && serviceRoutes[serviceSlug]
          ? `?service=${encodeURIComponent(serviceSlug)}`
          : "";
      return chatNavigateTo(`/${query}#quote`);
    },
    startSepticAssessment: () => chatNavigateTo("/septic-assessment-form"),
    scrollToSection: (sectionId: string) => {
      const allowedSections = new Set([
        "home",
        "about",
        "services",
        "quote",
        "coverage",
        "septic-assessment-form",
        "septic-assessment-top",
      ]);
      if (!allowedSections.has(sectionId))
        return "Unknown section. Navigation blocked.";
      scrollTo(sectionId);
      return `Moved to ${sectionId}.`;
    },
    navigateToAllowedPath: chatNavigateTo,
  };
}
export function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) {
    if (window.location.pathname !== "/") {
      // Use React Router navigate if available, otherwise hard reload
      if (window.__ozzysNavigate) {
        window.__ozzysNavigate(`/#${id}`);
      } else {
        window.location.href = `/#${id}`;
      }
    }
    return;
  }
  const navHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

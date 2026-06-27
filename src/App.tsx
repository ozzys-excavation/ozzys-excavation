import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import ElevenLabsChatBubble from "./components/ElevenLabsChatBubble";
import SepticAssessmentPage from "./components/SepticAssessmentPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyCompliancePage from "./pages/PrivacyCompliancePage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ServicePage from "./components/ServicePage";

const BlogPage = lazy(() => import("./pages/BlogPage"));

function NavBridge() {
  const navigate = useNavigate();
  useEffect(() => {
    window.__ozzysNavigate = (path: string) => navigate(path);
    return () => {
      delete window.__ozzysNavigate;
    };
  }, [navigate]);
  return null;
}

export default function App() {
  const chatEnabled = import.meta.env.VITE_ENABLE_CHAT === "true";

  return (
    <>
      <NavBridge />
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/septic-assessment-form"
            element={<SepticAssessmentPage />}
          />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route
            path="/privacy-compliance"
            element={<PrivacyCompliancePage />}
          />
          <Route
            path="/blog/winter-reclamation-story"
            element={
              <Suspense
                fallback={<div className="min-h-screen bg-[#40190E]" />}
              >
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense
                fallback={<div className="min-h-screen bg-[#40190E]" />}
              >
                <BlogPage />
              </Suspense>
            }
          />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      {chatEnabled && <ElevenLabsChatBubble />}
    </>
  );
}

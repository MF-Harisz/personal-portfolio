import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import PageLoader from "./components/PageLoader";
import TransitionEffect from "./components/TransitionEffect";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import AboutDetail from "./pages/AboutDetail";
import ProjectDetail from "./pages/ProjectDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {initialLoading ? (
          <PageLoader key="loader" />
        ) : (
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <TransitionEffect>
                  <Home />
                </TransitionEffect>
              }
            />
            <Route
              path="/about-detail"
              element={
                <TransitionEffect>
                  <AboutDetail />
                </TransitionEffect>
              }
            />
            <Route
              path="/project/:slug"
              element={
                <TransitionEffect>
                  <ProjectDetail />
                </TransitionEffect>
              }
            />
            <Route
              path="/privacy"
              element={
                <TransitionEffect>
                  <PrivacyPolicy />
                </TransitionEffect>
              }
            />
            <Route
              path="/terms"
              element={
                <TransitionEffect>
                  <TermsConditions />
                </TransitionEffect>
              }
            />
            <Route
              path="*"
              element={
                <TransitionEffect>
                  <NotFound />
                </TransitionEffect>
              }
            />
          </Routes>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
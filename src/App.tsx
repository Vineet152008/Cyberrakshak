import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/layout/Navbar';
import { EmergencyBanner } from './components/layout/EmergencyBanner';
import { Footer } from './components/layout/Footer';
import { SpotlightCanvas } from './components/pointer/SpotlightCanvas';
import { SkipLink } from './components/common/SkipLink';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { CalmModeProvider } from './context/CalmModeContext';
import { LanguageRouteSync } from './components/layout/LanguageRouteSync';

// Route-level code splitting for performance on low-end devices
import { HomePage } from './pages/HomePage';
const ScamLabPage = lazy(() => import('./pages/ScamLabPage').then((m) => ({ default: m.ScamLabPage })));
const EmergencyAssistPage = lazy(() => import('./pages/EmergencyAssistPage').then((m) => ({ default: m.EmergencyAssistPage })));
const MessageCheckerPage = lazy(() => import('./pages/MessageCheckerPage').then((m) => ({ default: m.MessageCheckerPage })));
const AcademyPage = lazy(() => import('./pages/AcademyPage').then((m) => ({ default: m.AcademyPage })));
const SafetyToolkitPage = lazy(() => import('./pages/SafetyToolkitPage').then((m) => ({ default: m.SafetyToolkitPage })));

function RouteTree() {
  const { t } = useTranslation();

  const appRoutes = (
    <>
      <Route index element={<HomePage />} />
      <Route path="scam-lab" element={<ScamLabPage />} />
      <Route path="emergency-assist" element={<EmergencyAssistPage />} />
      <Route path="message-checker" element={<MessageCheckerPage />} />
      <Route path="academy" element={<AcademyPage />} />
      <Route path="toolkit" element={<SafetyToolkitPage />} />
    </>
  );

  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-sm font-mono text-[#94A3B8]">
          {t('common.loading')}
        </div>
      }
    >
      <Routes>
        {/* Language-prefixed routes (/en, /hi, /mr) */}
        <Route path="/:lang" element={<LanguageRouteSync />}>
          {appRoutes}
        </Route>

        {/* Clean root routes (fallback with detected or saved locale) */}
        <Route path="/" element={<LanguageRouteSync />}>
          {appRoutes}
        </Route>

        {/* Fallback to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <CalmModeProvider>
        <BrowserRouter>
          <SkipLink />
          <SpotlightCanvas>
            <div className="min-h-screen flex flex-col bg-[#070B14] text-[#F8FAFC]">
              <EmergencyBanner />
              <Navbar />

              <div className="flex-1">
                <RouteTree />
              </div>

              <Footer />
            </div>
          </SpotlightCanvas>
        </BrowserRouter>
      </CalmModeProvider>
    </ErrorBoundary>
  );
}

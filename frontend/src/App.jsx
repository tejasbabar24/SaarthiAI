import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ToastContainer from './components/ui/Toast';
import LoadingState from './components/ui/LoadingState';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Schemes = lazy(() => import('./pages/Schemes'));
const SchemeDetail = lazy(() => import('./pages/SchemeDetail'));
const ForCitizens = lazy(() => import('./pages/ForCitizens'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const Documents = lazy(() => import('./pages/Documents'));
const ApplicationForm = lazy(() => import('./pages/ApplicationForm'));
const BrowserExtension = lazy(() => import('./pages/BrowserExtension'));
const ForAgents = lazy(() => import('./pages/ForAgents'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const GetStarted = lazy(() => import('./pages/GetStarted'));

// Pages that use the sidebar layout (no standard footer)
const sidebarRoutes = ['/for-citizens', '/ai-assistant', '/documents', '/apply', '/for-agents'];

function Layout({ children, pathname }) {
  const isSidebarPage = sidebarRoutes.some(r => pathname.startsWith(r));
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<LoadingState />}>
          {children}
        </Suspense>
      </main>
      {!isSidebarPage && <Footer />}
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/schemes" element={<Schemes />} />
      <Route path="/schemes/:id" element={<SchemeDetail />} />
      <Route path="/for-citizens" element={<ForCitizens />} />
      <Route path="/for-citizens/:tab" element={<ForCitizens />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/apply" element={<ApplicationForm />} />
      <Route path="/apply/:schemeId" element={<ApplicationForm />} />
      <Route path="/browser-extension" element={<BrowserExtension />} />
      <Route path="/for-agents" element={<ForAgents />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/get-started" element={<GetStarted />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-bg">
          <Navbar />
          <main>
            <Suspense fallback={<LoadingState />}>
              <AppRoutes />
            </Suspense>
          </main>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

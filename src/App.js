import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import NRCA from './components/NRCA';
import About from './components/About';

import Features from './components/Features';

import Pricing from './components/Pricing';
import AboutCompany from './components/AboutCompany';

import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import HowItWorks from './components/HowItWorks';
import BuiltForRoofersStrip from './components/BuiltForRoofersStrip';
import RevealOnScroll from './components/RevealOnScroll';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import Signup from './components/Signup';
// import EventPopupModal from './components/EventPopupModal'; // Temporarily disabled popup
import EstimateTeam from './components/EstimateTeam';
import EstimateTeamPreview from './components/EstimateTeamPreview';
import PrivacyPolicy from './components/PrivacyPolicy';
import RefundReturns from './components/RefundReturns';

// Main Landing Page Component
const LandingPage = ({ onStartChat }) => {
  return (
    <>
      <Header />
      <RevealOnScroll triggerOnce={false}>
        <Hero onStartChat={onStartChat} />
      </RevealOnScroll>
      <RevealOnScroll triggerOnce={false}>
       
        <About />
      </RevealOnScroll>
    
      <Features />
      <EstimateTeamPreview />
      <RevealOnScroll triggerOnce={false}>
        <Pricing />
      </RevealOnScroll>
      <RevealOnScroll triggerOnce={false}>
        <HowItWorks />
      </RevealOnScroll>
      
      <RevealOnScroll triggerOnce={false}>
        <BuiltForRoofersStrip />
      </RevealOnScroll>
      <RevealOnScroll triggerOnce={false}>
        <AboutCompany />
      </RevealOnScroll>
      {/* <RevealOnScroll triggerOnce={false}>
        <NRCA />
      </RevealOnScroll> */}

      <RevealOnScroll triggerOnce={false}>
        <Contact />
      </RevealOnScroll>
      <RevealOnScroll triggerOnce={false}>
        <Footer />
      </RevealOnScroll>
    </>
  );
};

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  // const [isEventPopupOpen, setIsEventPopupOpen] = useState(false); // Temporarily disabled popup
  const location = useLocation();

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  // // Show event popup on page load, but NOT on signup page (temporarily disabled)
  // useEffect(() => {
  //   // Don't show popup on signup page or estimate-team page
  //   if (location.pathname === '/signup' || location.pathname === '/estimate-team') {
  //     setIsEventPopupOpen(false);
  //     return;
  //   }
  //
  //   // Small delay to ensure page is loaded
  //   const timer = setTimeout(() => {
  //     setIsEventPopupOpen(true);
  //   }, 500);
  //   
  //   return () => clearTimeout(timer);
  // }, [location.pathname]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Handle hash navigation after route change
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage onStartChat={openChat} />} 
        />
        <Route 
          path="/payment-success" 
          element={<PaymentSuccess />} 
        />
        <Route 
          path="/payment-cancel" 
          element={<PaymentCancel />} 
        />
        <Route 
          path="/signup" 
          element={<Signup />} 
        />
        <Route 
          path="/estimate-team" 
          element={<EstimateTeam />} 
        />
        <Route 
          path="/privacy-policy" 
          element={<PrivacyPolicy />} 
        />
        <Route 
          path="/refund-returns" 
          element={<RefundReturns />} 
        />
      </Routes>
      <ChatWidget isOpen={isChatOpen} onClose={closeChat} />
      {/* <EventPopupModal 
        isOpen={isEventPopupOpen} 
        onClose={() => setIsEventPopupOpen(false)} 
      /> */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

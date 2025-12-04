import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
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

      <RevealOnScroll triggerOnce={false}>
        <Contact />
      </RevealOnScroll>
      <RevealOnScroll triggerOnce={false}>
        <Footer />
      </RevealOnScroll>
    </>
  );
};

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
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
        </Routes>
        <ChatWidget isOpen={isChatOpen} onClose={closeChat} />
      </div>
    </Router>
  );
}

export default App;

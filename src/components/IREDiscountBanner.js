import React, { useState } from 'react';
import DemoModal from './DemoModal';

const IREDiscountBanner = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleScheduleDemo = () => {
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <section className="py-8 bg-gradient-to-br from-[#042D43] via-[#0A3D5A] to-[#042D43] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#A83119] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D1452A] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-[#A83119]/30 relative overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#A83119] to-[#D1452A] opacity-10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-[#A83119] to-[#D1452A] opacity-10 rounded-tr-full"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 relative z-10">
              {/* Left side - Message */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block mb-3 px-3 py-1.5 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-full shadow-sm">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                    IRE Exclusive
                  </span>
                </div>
                
                <p className="text-lg md:text-xl lg:text-2xl text-[#042D43] mb-0 leading-relaxed font-semibold">
                  Did we miss you at{' '}
                  <span className="text-[#A83119] font-bold">IRE</span>? Book your demo today and unlock your exclusive{' '}
                  <span className="text-[#A83119] font-bold">IRE discount</span>.
                </p>
              </div>
              
              {/* Right side - CTA Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={handleScheduleDemo}
                  className="group relative inline-flex items-center justify-center px-7 py-3.5 bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white font-bold text-base rounded-full shadow-[0_6px_20px_rgba(168,49,25,0.4)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(168,49,25,0.5)] hover:-translate-y-0.5 hover:scale-105 transform overflow-hidden"
                >
                  {/* Button shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  
                  <span className="relative flex items-center gap-2">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Schedule Demo
                  </span>
                </button>
              </div>
            </div>
            
            {/* Bottom decorative line */}
            <div className="mt-5 pt-4 border-t border-[#A83119]/15">
              <div className="flex items-center justify-center gap-2 text-[#4C6371] text-xs font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span>Limited time offer • Exclusive to IRE attendees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={closeDemoModal}
        heading="Book a demo - IRE Special"
      />
    </section>
  );
};

export default IREDiscountBanner;


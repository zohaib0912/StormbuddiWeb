import React, { useState, useEffect } from 'react';
import DemoModal from './DemoModal';

const IREDiscountBanner = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const handleScheduleDemo = () => {
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <section className="py-8 bg-gradient-to-br from-[#042D43] via-[#0A3D5A] to-[#042D43] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-[#A83119] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-[#D1452A] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A83119] rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#A83119]/10 to-transparent animate-shimmer"></div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`bg-white rounded-2xl shadow-2xl p-5 md:p-6 lg:p-8 border-2 border-[#A83119]/40 relative overflow-hidden transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
            }`}
            style={{
              boxShadow: '0 20px 60px rgba(168, 49, 25, 0.3), 0 0 40px rgba(168, 49, 25, 0.2)',
              animation: 'glow 3s ease-in-out infinite'
            }}
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[#A83119] opacity-50 animate-pulse"></div>
            
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer-slow"></div>
            
            {/* Decorative corner accents with animation */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#A83119] to-[#D1452A] opacity-20 rounded-bl-full animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-[#A83119] to-[#D1452A] opacity-20 rounded-tr-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-6 relative z-10">
              {/* Left side - Message */}
              <div className="flex-1 w-full md:w-auto text-center md:text-left">
                <div 
                  className="inline-block mb-3 px-3 py-1.5 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-full shadow-lg relative overflow-hidden animate-bounce-subtle"
                  style={{
                    boxShadow: '0 4px 15px rgba(168, 49, 25, 0.5)',
                    animation: 'pulse-glow 2s ease-in-out infinite'
                  }}
                >
                  {/* Badge shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer-fast"></div>
                  <span className="relative text-white text-xs font-bold uppercase tracking-wider">
                    IRE Exclusive
                  </span>
                </div>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#042D43] mb-0 leading-relaxed font-semibold">
                  Did we miss you at{' '}
                  <span 
                    className="text-[#A83119] font-bold relative inline-block"
                    style={{
                      textShadow: '0 0 10px rgba(168, 49, 25, 0.3)',
                      animation: 'text-glow 2s ease-in-out infinite'
                    }}
                  >
                    IRE
                  </span>? Book your demo today and unlock your exclusive{' '}
                  <span 
                    className="text-[#A83119] font-bold relative inline-block"
                    style={{
                      textShadow: '0 0 10px rgba(168, 49, 25, 0.3)',
                      animation: 'text-glow 2s ease-in-out infinite',
                      animationDelay: '0.5s'
                    }}
                  >
                    IRE discount
                  </span>.
                </p>
              </div>
              
              {/* Right side - CTA Button */}
              <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
                <button
                  onClick={handleScheduleDemo}
                  className="group relative w-auto inline-flex items-center justify-center px-6 md:px-7 py-3 md:py-3.5 bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white font-bold text-sm md:text-base rounded-full shadow-[0_6px_20px_rgba(168,49,25,0.6)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(168,49,25,0.8)] hover:-translate-y-1 hover:scale-110 transform overflow-hidden animate-pulse-button"
                  style={{
                    boxShadow: '0 6px 20px rgba(168, 49, 25, 0.6), 0 0 30px rgba(168, 49, 25, 0.4)',
                    animation: 'button-glow 2s ease-in-out infinite'
                  }}
                >
                  {/* Button shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  
                  {/* Pulsing glow ring */}
                  <span className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" style={{ animationDuration: '2s' }}></span>
                  
                  <span className="relative flex items-center gap-2 z-10">
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="w-[18px] h-[18px] md:w-5 md:h-5 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300"
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
            <div className="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-[#A83119]/20">
              <div className="flex items-center justify-center gap-2 text-[#4C6371] text-xs font-medium">
                <svg 
                  width="14" 
                  height="14" 
                  className="w-[14px] h-[14px] md:w-4 md:h-4 animate-spin-slow"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="text-xs">Limited time offer • Exclusive to IRE attendees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%) translateY(0); }
          100% { transform: translateX(100%) translateY(0); }
        }
        
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 20px 60px rgba(168, 49, 25, 0.3), 0 0 40px rgba(168, 49, 25, 0.2);
          }
          50% { 
            box-shadow: 0 20px 80px rgba(168, 49, 25, 0.5), 0 0 60px rgba(168, 49, 25, 0.4);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 4px 15px rgba(168, 49, 25, 0.5);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(168, 49, 25, 0.7);
          }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(168, 49, 25, 0.3);
          }
          50% { 
            text-shadow: 0 0 20px rgba(168, 49, 25, 0.6), 0 0 30px rgba(168, 49, 25, 0.4);
          }
        }
        
        @keyframes button-glow {
          0%, 100% { 
            box-shadow: 0 6px 20px rgba(168, 49, 25, 0.6), 0 0 30px rgba(168, 49, 25, 0.4);
          }
          50% { 
            box-shadow: 0 8px 30px rgba(168, 49, 25, 0.8), 0 0 50px rgba(168, 49, 25, 0.6);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-3px);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-shimmer-slow {
          animation: shimmer-slow 4s ease-in-out infinite;
        }
        
        .animate-shimmer-fast {
          animation: shimmer-fast 1.5s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-pulse-button {
          animation: button-glow 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-pulse-button {
            animation: button-glow 2s ease-in-out infinite;
          }
          
          .animate-bounce-subtle {
            animation: bounce-subtle 2s ease-in-out infinite;
          }
        }
      `}</style>
      
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={closeDemoModal}
        heading="Book a demo - IRE Special"
      />
    </section>
  );
};

export default IREDiscountBanner;


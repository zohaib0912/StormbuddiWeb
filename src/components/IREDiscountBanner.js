import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DemoModal from './DemoModal';

const IREDiscountBanner = () => {
  const location = useLocation();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);
  const storedHeightRef = useRef(null);

  // Hide banner on estimate-team route
  const shouldHide = location.pathname === '/estimate-team';

  // Use useLayoutEffect to synchronously set spacing before browser paints
  useLayoutEffect(() => {
    if (shouldHide) {
      // Immediately reset all spacing before paint
      document.body.style.paddingTop = '';
      document.documentElement.style.setProperty('--announcement-bar-height', '0px');
      setIsVisible(false);
    } else {
      // When navigating away from estimate-team, ensure we're ready to show banner
      setIsVisible(true);
    }
  }, [shouldHide]);

  useEffect(() => {
    // Don't show banner on estimate-team route
    if (shouldHide) {
      return;
    }

    // Trigger animation on mount
    setIsVisible(true);
    
    // Calculate and set padding to body and CSS variable for header based on actual banner height
    const updateBannerHeight = () => {
      if (bannerRef.current && !shouldHide) {
        const height = bannerRef.current.offsetHeight;
        document.body.style.paddingTop = `${height}px`;
        document.documentElement.style.setProperty('--announcement-bar-height', `${height}px`);
      }
    };
    
    // Initial update with slight delay to ensure DOM is ready
    const timeoutId = setTimeout(updateBannerHeight, 100);
    
    // Update on resize
    window.addEventListener('resize', updateBannerHeight);
    
    return () => {
      clearTimeout(timeoutId);
      // Only cleanup if we're not hiding (to avoid conflicts with the hide effect)
      if (!shouldHide) {
        document.body.style.paddingTop = '';
        document.documentElement.style.removeProperty('--announcement-bar-height');
      }
      window.removeEventListener('resize', updateBannerHeight);
    };
  }, [shouldHide]);

  const handleScheduleDemo = () => {
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  // Hide banner when mobile menu is open (only if banner should be visible)
  useEffect(() => {
    // Don't run this effect if banner is hidden
    if (shouldHide) {
      return;
    }

    const checkMobileMenu = () => {
      if (bannerRef.current) {
        if (document.body.classList.contains('mobile-menu-open')) {
          // Store height before hiding (only if not already stored)
          if (storedHeightRef.current === null) {
            storedHeightRef.current = bannerRef.current.offsetHeight;
          }
          // Hide banner
          bannerRef.current.style.display = 'none';
          // Update height to 0 when hidden
          document.documentElement.style.setProperty('--announcement-bar-height', '0px');
        } else {
          // Show banner
          bannerRef.current.style.display = '';
          // Restore height when visible - use stored height or recalculate
          setTimeout(() => {
            if (bannerRef.current) {
              const height = bannerRef.current.offsetHeight || storedHeightRef.current;
              if (height) {
                document.documentElement.style.setProperty('--announcement-bar-height', `${height}px`);
              }
            }
            storedHeightRef.current = null;
          }, 10); // Small delay to ensure display is restored before measuring
        }
      }
    };

    // Check initially
    checkMobileMenu();

    // Watch for changes to body class
    const observer = new MutationObserver(checkMobileMenu);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
    };
  }, [shouldHide]);

  // Don't render banner on estimate-team route
  if (shouldHide) {
    return null;
  }

  return (
    <section 
      ref={bannerRef}
      className="fixed top-0 left-0 right-0 z-[1100] bg-gradient-to-br from-[#042D43] via-[#0A3D5A] to-[#042D43] border-b-2 border-[#A83119]/40 shadow-lg transition-opacity duration-300"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#A83119] rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#D1452A] rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#A83119]/10 to-transparent animate-shimmer"></div>
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div 
          className={`flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 sm:gap-3 md:gap-4 py-2 sm:py-2.5 md:py-3 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          {/* Left side - Message */}
          <div className="flex-1 w-full md:w-auto text-center md:text-left flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-3">
            <div 
              className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-full shadow-md relative overflow-hidden shrink-0"
              style={{
                boxShadow: '0 2px 10px rgba(168, 49, 25, 0.4)',
                animation: 'pulse-glow 2s ease-in-out infinite'
              }}
            >
              {/* Badge shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer-fast"></div>
              <span className="relative text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                IRE Exclusive
              </span>
            </div>
            
            <p className="text-[10px] sm:text-sm md:text-base text-white mb-0 leading-snug sm:leading-tight font-semibold max-w-full">
              <span className="hidden min-[375px]:inline">Did we miss you at </span>
              <span className="min-[375px]:hidden">Missed </span>
              <span 
                className="text-[#FFD700] font-bold relative inline-block"
                style={{
                  textShadow: '0 0 8px rgba(255, 215, 0, 0.4)',
                  animation: 'text-glow 2s ease-in-out infinite'
                }}
              >
                IRE
              </span>
              <span className="hidden min-[375px]:inline">? </span>
              <span className="min-[375px]:hidden">? </span>
              <span className="hidden sm:inline">Book your demo and unlock your exclusive </span>
              <span className="sm:hidden min-[375px]:inline">Book demo & unlock </span>
              <span className="min-[375px]:hidden">Unlock </span>
              <span 
                className="text-[#FFD700] font-bold relative inline-block"
                style={{
                  textShadow: '0 0 8px rgba(255, 215, 0, 0.4)',
                  animation: 'text-glow 2s ease-in-out infinite',
                  animationDelay: '0.5s'
                }}
              >
                IRE discount
              </span>
              <span className="hidden min-[375px]:inline">.</span>
            </p>
          </div>
          
          {/* Right side - CTA Button */}
          <div className="flex-shrink-0 w-full sm:w-auto flex justify-center md:justify-start">
            <button
              onClick={handleScheduleDemo}
              className="group relative w-auto inline-flex items-center justify-center px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white font-bold text-[10px] sm:text-sm rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 transform overflow-hidden touch-manipulation"
              style={{
                boxShadow: '0 4px 15px rgba(168, 49, 25, 0.5)',
                animation: 'button-glow 2s ease-in-out infinite',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {/* Button shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              
              <span className="relative flex items-center gap-1 sm:gap-1.5 md:gap-2 z-10">
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-3 h-3 min-[375px]:w-3.5 min-[375px]:h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:rotate-12 transition-all duration-300 shrink-0"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="whitespace-nowrap">Schedule Demo</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom CSS animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 2px 10px rgba(168, 49, 25, 0.4);
          }
          50% { 
            transform: scale(1.02);
            box-shadow: 0 3px 15px rgba(168, 49, 25, 0.6);
          }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
          }
          50% { 
            text-shadow: 0 0 12px rgba(255, 215, 0, 0.7), 0 0 18px rgba(255, 215, 0, 0.5);
          }
        }
        
        @keyframes button-glow {
          0%, 100% { 
            box-shadow: 0 4px 15px rgba(168, 49, 25, 0.5);
          }
          50% { 
            box-shadow: 0 6px 20px rgba(168, 49, 25, 0.7);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-shimmer-fast {
          animation: shimmer-fast 1.5s ease-in-out infinite;
        }
        
        /* Mobile touch optimizations */
        @media (max-width: 640px) {
          button {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
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


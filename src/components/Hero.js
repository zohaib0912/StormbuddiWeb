import React, { useState, useEffect } from 'react';
import DemoModal from './DemoModal';

const Hero = ({ onStartChat }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const slides = [
    {
      id: 'rs-21',
      subtitle: 'Roofing CRM Platform',
      title: 'Your Partners in Roofing Success.',
      description: 'Storm Buddi is an all-in-one roofing CRM and storm intelligence platform built to help roofers find more jobs, close more deals, and manage every project in one place.',
      buttonText: 'Book a Demo',
      buttonLink: '#contact-us',
      imageRight: 'onlyscreen.png'
    },
    {
      id: 'rs-47',
      subtitle: 'Roofing CRM Platform',
      title: 'Your Partner in Roofing Success',
      description: 'Storm Buddi is an all-in-one roofing CRM and storm intelligence platform built to help roofers find more jobs, close more deals, and manage every project in one place.',
      buttonText: 'Book a Demo',
      buttonLink: '#contact-us',
      imageRight: 'onlyman.png'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8500); // Auto-rotate every 8.5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  // Reset image error when slide changes
  useEffect(() => {
    setImageError(false);
  }, [currentSlide]);

  const currentSlideData = slides[currentSlide];

  const toggleChat = () => {
    if (typeof onStartChat === 'function') {
      onStartChat();
    } else {
      console.log('Toggle chat');
    }
  };

  const openDemoModal = () => {
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <section 
      id="home" 
      className="beruco-slider-wrapper relative w-full overflow-hidden"
      style={{ 
        height: '760px',
        minHeight: '600px',
        position: 'relative',
        background: 'transparent',
        zIndex: isDemoModalOpen ? 2000 : 'auto'
      }}
    >
      {/* Background Image */}
      <div 
        className="rev-slidebg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/b2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      ></div>

      {/* Main Slide Container */}
      <div 
        className="rev-slider relative w-full h-full"
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          zIndex: 2
        }}
      >
        {/* Slide Content */}
        <div className="rs-slide relative w-full h-full" style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Decorative Background Elements */}
          
          {/* Roof Transparent Image - Right side background */}
          <img
            src="/images/roof-tranparent-img.png"
            alt=""
            className="absolute opacity-40"
            style={{
              right: '-358px',
              top: '239px',
              width: '1200px',
              height: '744px',
              zIndex: 3,
              pointerEvents: 'none'
            }}
            onError={(e) => e.target.style.display = 'none'}
          />

          {/* Cross Shape 1 - Left side background (opacity 0.6) */}
          <img
            src="/images/cross-shape.png"
            alt=""
            className="absolute opacity-60"
            style={{
              left: '-643px',
              top: '398px',
              width: '359px',
              height: '590px',
              zIndex: 3,
              pointerEvents: 'none'
            }}
            onError={(e) => e.target.style.display = 'none'}
          />

          {/* Cross Shape 2 - Left side background (opacity 0.3) */}
          <img
            src="/images/cross-shape.png"
            alt=""
            className="absolute opacity-30"
            style={{
              left: '-576px',
              top: '526px',
              width: '359px',
              height: '590px',
              zIndex: 3,
              pointerEvents: 'none'
            }}
            onError={(e) => e.target.style.display = 'none'}
          />

          {/* Cross Shape 3 - Left side background (opacity 0.2) */}
          <img
            src="/images/cross-shape.png"
            alt=""
            className="absolute opacity-20"
            style={{
              left: '-513px',
              top: '669px',
              width: '359px',
              height: '590px',
              zIndex: 3,
              pointerEvents: 'none'
            }}
            onError={(e) => e.target.style.display = 'none'}
          />

          {/* Shape 2 - Animated decorative element */}
          <img
            src="/images/shape-2.png"
            alt=""
            className="absolute animate-float"
            style={{
              left: '265px',
              bottom: '26px',
              width: '167px',
              height: '115px',
              zIndex: 18,
              pointerEvents: 'none'
            }}
            onError={(e) => e.target.style.display = 'none'}
          />

          {/* Sub Title Touch - Small decorative image */}
          <img
            src="/images/sub-title-touch.png"
            alt=""
            className="absolute"
            style={{
              left: '22px',
              top: '289px',
              width: '31px',
              height: '16px',
              zIndex: 6,
              pointerEvents: 'none'
            }}
            onError={(e) => e.target.style.display = 'none'}
          />

          {/* Content Container */}
          <div className="container mx-auto px-4 max-w-7xl relative h-full flex items-center" style={{ zIndex: 10, position: 'relative' }}>
            <div className="flex flex-col md:flex-row items-center w-full gap-8 lg:gap-12 hero-mobile-wrapper pt-32 md:pt-0">
              {/* Left Column - Text Content */}
              <div className="w-full md:w-1/2 mb-5 md:mb-0 relative z-20 md:pl-8 hero-mobile-text">
                {/* Subtitle with decorative icon */}
                <div className="flex items-center gap-2 mb-4 relative">
                  <img
                    src="/images/sub-title-touch.png"
                    alt=""
                    className="absolute"
                    style={{
                      left: '-42px',
                      top: '0',
                      width: '31px',
                      height: '16px',
                      zIndex: 6
                    }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <span 
                    className="text-[#A83119] text-lg font-bold uppercase tracking-wider"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {currentSlideData.subtitle}
                  </span>
                </div>

                {/* Main Title */}
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-[50px] font-bold leading-tight mb-6 text-[#282828] hero-mobile-title"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {currentSlideData.title}
                </h1>

                {/* Description */}
                <p 
                  className="text-base md:text-lg text-[#4C6371] mb-8 leading-relaxed hero-mobile-desc"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '20px' }}
                >
                  {currentSlideData.description}
                </p>

                {/* CTA Button */}
                <div className="hero-mobile-cta">
                  <button
                    type="button"
                    onClick={openDemoModal}
                    className="inline-flex items-center gap-2 bg-[#A83119] text-white border-2 border-[#A83119] rounded-lg px-[35px] py-[18px] text-[15px] font-semibold uppercase tracking-[1px] transition-all duration-300 ease-linear shadow-[0_4px_15px_rgba(168,49,25,0.3)] hover:bg-[#C4452A]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span>{currentSlideData.buttonText}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M5 11L11 5M11 5H5M11 5V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Slider Dots */}
                <div className="flex gap-2 mt-12 hero-mobile-dots">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? 'bg-[#A83119] w-8 border-2 border-[#A83119]' 
                          : 'bg-pink-200 w-3'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column - Main Image */}
              <div className="w-full md:w-1/2 mb-5 md:mb-0 relative z-10 flex justify-end items-end md:pr-8 h-full pt-20 hero-mobile-hide">
                <div className="relative inline-block flex-shrink-0 h-full flex items-end">
                  {!imageError ? (
                    <img
                      src={`/images/${currentSlideData.imageRight}`}
                      alt="Hero Image"
                      className="w-full max-w-[456px] h-full object-contain"
                      style={{
                        width: '456px',
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'transparent'
                      }}
                      onError={() => setImageError(true)}
                      onLoad={() => setImageError(false)}
                    />
                  ) : (
                    <div 
                      className="w-[456px] h-[699px] mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-[70px] flex items-center justify-center relative overflow-hidden shadow-2xl"
                    >
                      <div className="text-center text-[#4C6371] text-lg z-10">
                        <div className="text-6xl mb-2">👷🏠</div>
                        <div className="text-xl font-semibold">Hero Image</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ask Professional Box - Centered Bottom */}
          <div 
            className="sl-featurebox absolute left-1/2 transform -translate-x-1/2 bottom-16 md:bottom-10 z-30 hero-mobile-hide"
            style={{
              width: 'auto',
              maxWidth: '350px',
              minWidth: '280px'
            }}
          >
            <div className=" p-6">
              {/* Header with Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0">
                  <div 
                    className="w-[40px] h-[40px] bg-[#A83119] rounded-full flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                    </svg>
                  </div>
                </div>
                <h4 
                  className="text-[#042D43] font-bold text-lg m-0"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Ask A Professional
                </h4>
              </div>
              
              {/* Contact Options */}
              <div className="space-y-3">
                {/* Phone Option - Light pink/beige button */}
                <button
                  onClick={() => window.location.href = 'tel:+18009887435'}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-[rgba(168,49,25,0.3)] bg-[#FFE5E5] hover:bg-[#FFD5D5] transition-colors duration-300 cursor-pointer"
                  style={{
                    backgroundColor: '#FFE5E5',
                    border: '1px solid rgba(168, 49, 25, 0.3)'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#A83119" strokeWidth="2" className="flex-shrink-0">
                    <path d="M3 4C3 3.44772 3.44772 3 4 3H6.15287C6.64171 3 7.0589 3.35341 7.13927 3.8356L7.87858 8.27147C7.95075 8.70451 7.73206 9.13397 7.3394 9.3303L5.79126 10.1043C6.90756 12.4063 8.59368 14.0924 10.8957 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3C2 2.44772 2.44772 2 3 2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[#A83119] text-sm font-semibold">
                    Call Us: <span className="font-bold">+1 800-988-7435</span>
                  </span>
                </button>
                
                {/* Chat Option - Reddish-brown button */}
                <div className="flex w-full justify-center">
                  <button
                    onClick={toggleChat}
                    className="w-full md:w-auto min-w-[160px] flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-br from-[#C54E2D] to-[#A83119] text-white border-none cursor-pointer transition-all duration-300 shadow-[0_6px_18px_rgba(168,49,25,0.35)] hover:-translate-y-0.5"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span className="text-sm font-semibold">Start Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={closeDemoModal}
        heading="Book a demo"
      />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateX(-10px);
          }
          50% {
            transform: translateX(10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @media (max-width: 1240px) {
          .beruco-slider-wrapper {
            height: 550px !important;
          }
        }

        @media (max-width: 1024px) {
          .beruco-slider-wrapper {
            height: 500px !important;
          }
        }

        @media (max-width: 768px) {
          .beruco-slider-wrapper {
            height: 580px !important;
            min-height: 580px !important;
          }

          .hero-mobile-wrapper {
            text-align: center;
          }

          .hero-mobile-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .hero-mobile-title {
            font-size: clamp(32px, 8vw, 42px);
          }

          .hero-mobile-desc {
            font-size: clamp(15px, 4vw, 18px) !important;
          }

          .hero-mobile-cta {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .hero-mobile-dots {
            justify-content: center;
          }

          .hero-mobile-hide {
            display: none !important;
          }

          .sl-featurebox {
            right: 20px !important;
            bottom: 20px !important;
            max-width: 250px !important;
          }
        }

        /* Responsive adjustments for decorative images */
        @media (max-width: 1024px) {
          .beruco-slider-wrapper img[src*="cross-shape"],
          .beruco-slider-wrapper img[src*="roof-tranparent"] {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

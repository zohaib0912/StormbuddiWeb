import React from 'react';

const AboutCompany = () => {
  return (
    <section id="about-company" className="py-20 bg-white relative z-[2]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20">
            {/* Left Column - Content */}
            <div className="w-full md:w-1/2 mb-5 md:mb-0 pr-0 lg:pr-12">
            <div className="section-header text-center lg:text-left mb-6">
              <h6 className="text-[#A83119] text-sm font-semibold uppercase tracking-[0.35em] mb-3">
                About Us
              </h6>
              <h2 className="text-[#042D43] text-3xl md:text-4xl font-bold leading-tight mb-4">
              The All-In-One Roofing CRM & Storm Intelligence Platform
              </h2>
              <p className="text-[#4C6371] text-base leading-relaxed mb-10 max-w-[520px] mx-auto lg:mx-0">
              StormBuddi is more than just a CRM—we’re the engine behind smarter, faster, more profitable roofing companies.
Our platform combines real-time storm intelligence, powerful CRM tools, and streamlined job workflows to help roofing teams identify new opportunities, close more deals, and manage every project from one place.

From canvassing to production, proposals to material ordering, StormBuddi gives roofers a complete system that eliminates guesswork, reduces manual work, and accelerates business growth.
              </p>
            </div>
            
            {/* Features List */}
            <div className="features-list mb-10">
              {/* Feature 1 */}
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-[#A83119] rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18M7 16l4-4 4 4 6-6"/>
                    <path d="M7 16h10"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#042D43] text-lg font-semibold mb-1">Real-Time Insights</h4>
                  <p className="text-[#4C6371] text-sm leading-relaxed m-0">Use real-time storm data, neighborhood impact reports, and property insights to target the right areas and drive more closed roofs.</p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-[#A83119] rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#042D43] text-lg font-semibold mb-1">Operational Efficiency</h4>
                  <p className="text-[#4C6371] text-sm leading-relaxed m-0">AAutomated processes for leads, appointments, proposals, and jobs—saving time and eliminating costly mistakes across your team.</p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#A83119] rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                    <path d="M8 6h8M8 12h8M8 18h8"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#042D43] text-lg font-semibold mb-1">End-to-End Management</h4>
                  <p className="text-[#4C6371] text-sm leading-relaxed m-0">A centralized system to capture leads, track projects, manage customers, send proposals, collect e-signatures, and oversee every stage of the roofing workflow.</p>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#contact-us" 
                className="inline-block w-full max-w-[230px] sm:w-auto bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white py-3.5 px-10 rounded-full no-underline font-semibold text-base text-center transition-all duration-300 border-none shadow-[0_6px_20px_rgba(168,49,25,0.3)] tracking-wide relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(168,49,25,0.4)] mx-auto sm:mx-0"
              >
                Learn More
              </a>
              <a 
                href="#pricing" 
                className="inline-block w-full max-w-[230px] sm:w-auto bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white py-3.5 px-10 rounded-full no-underline font-semibold text-base text-center transition-all duration-300 border-none shadow-[0_6px_20px_rgba(168,49,25,0.3)] tracking-wide relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(168,49,25,0.4)] mx-auto sm:mx-0"
              >
                Get Started
              </a>
            </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="w-full md:w-1/2">
              <div className="about-image-wrapper w-full flex justify-center md:justify-start">
                <img 
                  src="/images/aboutus.jpg" 
                  alt="StormBuddi Admin Portal" 
                  className="w-full max-w-[520px] h-[360px] md:h-[520px] object-cover rounded-[32px] shadow-[0_25px_60px_rgba(4,45,67,0.12)]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full max-w-[520px] h-[520px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-[32px] flex items-center justify-center relative overflow-hidden">
                        <div class="text-center text-[#4C6371] text-lg z-10">
                          <div class="text-5xl mb-2">💻📊</div>
                          <div>Admin Portal Image</div>
                        </div>
                      </div>
                    `;
                  }}
                />        
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;


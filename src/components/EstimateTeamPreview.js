import React from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';

const EstimateTeamPreview = () => {
  return (
    <RevealOnScroll triggerOnce={false}>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20">
              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 flex-shrink-0 min-h-[500px] flex items-center justify-center">
                <div 
                  className="w-full h-full min-h-[500px] rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: 'url(/images/Supplement-team.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(168,49,25,0.1)] to-transparent"></div>
                        <div class="text-center text-[#4C6371] text-lg font-['DM_Sans',sans-serif] z-10">
                          <div class="text-5xl mb-2">⛈️🏠</div>
                          <div>Estimate Team</div>
                        </div>
                      </div>
                    `;
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#A83119]/20 to-transparent"></div>
                </div>
              </div>

              {/* Right Side: Text Content */}
              <div className="w-full md:w-1/2 flex-shrink-0 md:pl-5 max-w-[520px] mx-auto md:mx-0">
                {/* Small red triangle icon + Heading */}
                <div className="flex items-center gap-2 mb-5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="flex-shrink-0 rotate-[-90deg]"
                  >
                    <path
                      d="M6 0L12 12H0L6 0Z"
                      fill="#A83119"
                    />
                  </svg>
                  <span className="font-['DM_Sans',sans-serif] text-sm font-bold text-[#A83119] uppercase tracking-wider">
                    Professional Services
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl md:text-5xl lg:text-[48px] font-bold leading-tight text-[#042D43] mb-6 mt-0">
                  Professional Estimate & Supplement Team
                </h2>

                {/* Subheading */}
                <h3 className="font-['DM_Sans',sans-serif] text-xl md:text-2xl font-semibold text-[#A83119] mb-4">
                  Get Expert Estimates Without the Markup
                </h3>

                {/* Body Paragraph */}
                <p className="font-['DM_Sans',sans-serif] text-base md:text-lg leading-relaxed text-[#4C6371] mb-6 mt-0">
                  Your roofing business deserves professional estimates and supplements without the industry's typical percentage fees or $300+ per-job costs. Our in-house team of estimators works directly in your Storm Buddi CRM to deliver accurate, ready-to-use estimates—at a simple, fixed cost.
                </p>
                
                {/* Features List */}
                <div className="flex flex-wrap gap-3 mb-9">
                  <div className="flex items-center gap-2 text-sm text-[#4C6371]">
                    <svg
                      className="w-5 h-5 text-[#A83119] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Xactimate & Symbility</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4C6371]">
                    <svg
                      className="w-5 h-5 text-[#A83119] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Fixed Cost Pricing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4C6371]">
                    <svg
                      className="w-5 h-5 text-[#A83119] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>24-48 Hour Turnaround</span>
                  </div>
                </div>

                {/* LEARN MORE Button */}
                <Link
                  to="/estimate-team"
                  className="inline-flex items-center gap-2.5 bg-[#A83119] text-white no-underline border-2 border-[#A83119] rounded-lg px-[35px] py-[18px] text-[15px] font-semibold uppercase tracking-[1px] font-['DM_Sans',sans-serif] transition-all duration-300 ease-linear shadow-[0_4px_15px_rgba(168,49,25,0.3)] cursor-pointer"
                >
                  <span>MORE DETAILS</span>
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
};

export default EstimateTeamPreview;


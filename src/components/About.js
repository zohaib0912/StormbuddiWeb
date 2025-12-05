import React from 'react';

const About = () => {
  return (
    <>
      

      {/* About Our CRM - Exact Design Match */}
      <section id="about-us" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20">
              {/* Left Side: Illustration */}
              <div className="w-full md:w-1/2 flex-shrink-0 min-h-[500px] flex items-center justify-center">
                <img
                  src="/images/Event.jpeg"
                  alt="CRM Illustration - Storm scene with character on roof"
                  className="w-full h-auto max-w-[600px] object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(168,49,25,0.1)] to-transparent"></div>
                        <div class="text-center text-[#4C6371] text-lg font-['DM_Sans',sans-serif] z-10">
                          <div class="text-5xl mb-2">⛈️🏠</div>
                          <div>CRM Illustration</div>
                        </div>
                      </div>
                    `;
                  }}
                />
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
                    ABOUT OUR CRM
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl md:text-5xl lg:text-[48px] font-bold leading-tight text-[#042D43] mb-6 mt-0">
                  Close more roofing <br/> deals with our <br/> complete CRM.
                </h2>

                {/* Body Paragraph with Red Underline on First Sentence */}
                <p className="font-['DM_Sans',sans-serif] text-base md:text-lg leading-relaxed text-[#4C6371] mb-9 mt-0">
                  <span>Take control of every roofing project with our powerful CRM.</span>{' '}
                  From real-time storm reports and neighborhood walk-throughs to project tracking and proposals, everything you need is in one place. Create material orders in minutes, manage invoices, and keep crews on track. With our mobile app, you can upload photos, documents, and updates from the field—making your roofing business faster, smarter, and more profitable.
                </p>

                {/* LEARN MORE Button */}
                <a
                  href="#features"
                  className="inline-flex items-center gap-2.5 bg-[#A83119] text-white no-underline border-2 border-[#A83119] rounded-lg px-[35px] py-[18px] text-[15px] font-semibold uppercase tracking-[1px] font-['DM_Sans',sans-serif] transition-all duration-300 ease-linear shadow-[0_4px_15px_rgba(168,49,25,0.3)] cursor-pointer"
                >
                  <span>LEARN MORE</span>
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
                </a>
              </div>
            </div>

           
           
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

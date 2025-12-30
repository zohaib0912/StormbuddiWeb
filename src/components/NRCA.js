import React from 'react';

const NRCA = () => {
  return (
    <section id="nrca-membership" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            {/* Left Side: NRCA Logo */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="nrca-logo-wrapper flex items-center justify-center">
                <img
                  src="/images/NRCA.jpeg"
                  alt="NRCA Membership Logo"
                  className="w-full max-w-[200px] md:max-w-[280px] h-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full max-w-[280px] h-[200px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                        <div class="text-center text-[#4C6371] text-lg font-['DM_Sans',sans-serif]">
                          <div class="text-4xl mb-2">🏆</div>
                          <div>NRCA Logo</div>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              {/* Main Heading */}
              <h2 
                className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#042D43] mb-6 mt-0"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Technology for Roofing Contractors, Backed by NRCA Membership
              </h2>

              {/* Extended Descriptive Paragraph */}
              <p 
                className="text-base md:text-lg leading-relaxed text-[#4C6371] mb-0 mt-0"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Our NRCA membership reflects our commitment to quality, innovation, and industry best practices. As a trusted partner to roofing contractors nationwide, we understand the unique challenges of the roofing industry and provide technology solutions aligned with industry standards. By choosing our platform, you’re partnering with a company that values craftsmanship, customer satisfaction, and forward-thinking growth. Our NRCA affiliation keeps us closely connected to the industry, ensuring our platform continues to evolve to meet real-world contractor needs with high standards of service and support.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .nrca-logo-wrapper {
          min-height: 150px;
        }

        @media (max-width: 768px) {
          .nrca-logo-wrapper {
            min-height: 120px;
            margin-bottom: 2rem;
          }
          
          #nrca-membership h2 {
            font-size: clamp(24px, 6vw, 32px);
            text-align: center;
          }
          
          #nrca-membership p {
            text-align: center;
            font-size: clamp(15px, 4vw, 18px);
          }
        }

        @media (min-width: 769px) {
          .nrca-logo-wrapper {
            min-height: 220px;
          }
        }
      `}</style>
    </section>
  );
};

export default NRCA;


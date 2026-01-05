import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FreeTrialModal from './FreeTrialModal';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isFreeTrialModalOpen, setIsFreeTrialModalOpen] = useState(false);

  const openFreeTrialModal = () => setIsFreeTrialModalOpen(true);
  const closeFreeTrialModal = () => setIsFreeTrialModalOpen(false);

  const quickLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy', isRoute: true },
    { name: 'Refund & Returns', href: '/refund-returns', isRoute: true },
    { name: 'About Us', href: '#about-us', isRoute: false },
    { name: 'Contact Us', href: '#contact-us', isRoute: false }
  ];

  return (
    <footer 
      id="site-footer" 
      className="site-footer bg-gradient-to-br from-[#042D43] to-[#1a4a6b] text-white py-12 px-0"
    >
      <div className="site-footer-wrap container-fluid p-0">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
          {/* Single Row: All Three Cards Side by Side */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Card 1: Let's Get Started */}
            <div className="w-full md:w-1/3 mb-3 md:mb-0">
              <div 
                className="widget beruco_mailchimp_widget h-[500px] p-6 rounded-2xl backdrop-blur-[15px] border-2 border-[rgba(168,49,25,0.2)] shadow-[0_8px_25px_rgba(168,49,25,0.1)] transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(248,249,250,0.08) 100%)'
                }}
              >
                <div className="widget-content h-full flex flex-col justify-between">
                  <div>
                    <h3 className="widget-title text-white text-[22px] mb-5 font-bold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      Let's Get Started
                    </h3>
                    <div className="mailchimp-wrapper">
                      <p className="text-[#E8F4FD] text-[15px] leading-relaxed mb-6 text-center opacity-90">
                        Unlock the complete roofing CRM. Sign up today and grow your roofing business smarter. Great CRM that's actually built for roofing! The system is extremely robust and beneficial to our company in a variety of ways.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="input-group flex justify-center">
                      <button
                        type="button"
                        name="Signup"
                        onClick={openFreeTrialModal}
                        className="bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white border-none py-4 px-8 rounded-[25px] text-[15px] font-bold cursor-pointer transition-all duration-300 shadow-[0_6px_20px_rgba(168,49,25,0.4)] tracking-wide relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(168,49,25,0.5)]"
                      >
                        Sign Up Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 2: Quick Links */}
            <div className="w-full md:w-1/3 mb-3 md:mb-0">
              <div 
                className="widget widget_nav_menu h-[500px] p-6 rounded-2xl backdrop-blur-[15px] border-2 border-[rgba(168,49,25,0.2)] shadow-[0_8px_25px_rgba(168,49,25,0.1)] transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(248,249,250,0.08) 100%)'
                }}
              >
                <h2 className="widgettitle text-white text-[20px] mb-5 font-bold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  Quick Links
                </h2>
                <div className="menu-quicklinks-container">
                  <ul className="menu list-none p-0 m-0">
                    {quickLinks.map((link, index) => {
                      const linkClassName = `text-white no-underline text-[15px] transition-all duration-300 flex items-center py-2.5 px-4 rounded-lg ${
                        hoveredLink === index
                          ? 'translate-x-2 scale-[1.02] shadow-[0_4px_15px_rgba(168,49,25,0.2)] border-[rgba(168,49,25,0.4)]'
                          : ''
                      }`;
                      const linkStyle = {
                        background: hoveredLink === index
                          ? 'linear-gradient(135deg, rgba(168, 49, 25, 0.3) 0%, rgba(209, 69, 42, 0.25) 100%)'
                          : 'linear-gradient(135deg, rgba(168, 49, 25, 0.15) 0%, rgba(209, 69, 42, 0.1) 100%)',
                        border: hoveredLink === index
                          ? '1px solid rgba(168, 49, 25, 0.4)'
                          : '1px solid rgba(168, 49, 25, 0.2)'
                      };

                      return (
                        <li key={index} className="menu-item mb-3">
                          {link.isRoute ? (
                            <Link
                              to={link.href}
                              onMouseEnter={() => setHoveredLink(index)}
                              onMouseLeave={() => setHoveredLink(null)}
                              className={linkClassName}
                              style={linkStyle}
                            >
                              <span className="mr-2.5 text-[#A83119] font-bold text-base">→</span>
                              {link.name}
                            </Link>
                          ) : (
                            <a
                              href={link.href}
                              onMouseEnter={() => setHoveredLink(index)}
                              onMouseLeave={() => setHoveredLink(null)}
                              className={linkClassName}
                              style={linkStyle}
                            >
                              <span className="mr-2.5 text-[#A83119] font-bold text-base">→</span>
                              {link.name}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Card 3: Get In Touch */}
            <div className="w-full md:w-1/3 mb-3 md:mb-0">
              <div className="widget widget_block">
                <div className="widget-content">
                  <div 
                    className="footer-contact-section h-[500px] p-6 rounded-2xl backdrop-blur-[15px] border-2 border-[rgba(168,49,25,0.2)] shadow-[0_8px_25px_rgba(168,49,25,0.1)] transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(248,249,250,0.08) 100%)'
                    }}
                  >
                    <h3 className="widget-title text-white text-[22px] mb-5 font-bold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      Get In Touch
                    </h3>
                    <div className="contact-content flex flex-col items-center gap-4">
                      {/* Contact Image */}
                      <div className="contact-image text-center">
                        <img 
                          src="/images/contact.png" 
                          alt="Contact Us" 
                          className="w-[130px] h-auto rounded-2xl shadow-[0_8px_25px_rgba(168,49,25,0.2)] transition-transform duration-300 hover:scale-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `
                              <div class="w-[130px] h-[130px] mx-auto bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-2xl flex items-center justify-center text-white text-4xl">
                                📞
                              </div>
                            `;
                          }}
                        />
                      </div>
                      
                      {/* Contact Details */}
                      <div className="contact-details text-center">
                        <p className="text-white text-[13px] leading-snug mb-4">
                          Ready to get started with your roofing project? Our team of experts is here to help you every step of the way.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="contact-info mb-4 space-y-2">
                          {/* Phone */}
                          <a 
                            href="tel:+14693069209"
                            className="flex items-center justify-start bg-[rgba(255,255,255,0.1)] py-1.5 px-3 rounded-md transition-all duration-300 hover:bg-[rgba(233,189,128,0.2)] no-underline"
                          >
                            <div className="bg-[#A83119] w-[25px] h-[25px] rounded-full flex items-center justify-center mr-2 shadow-[0_2px_6px_rgba(233,189,128,0.3)]">
                              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#042D43" strokeWidth="2">
                                <path d="M3 4C3 3.44772 3.44772 3 4 3H6.15287C6.64171 3 7.0589 3.35341 7.13927 3.8356L7.87858 8.27147C7.95075 8.70451 7.73206 9.13397 7.3394 9.3303L5.79126 10.1043C6.90756 12.4063 8.59368 14.0924 10.8957 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3C2 2.44772 2.44772 2 3 2" strokeLinecap="round"/>
                              </svg>
                            </div>
                            <span className="text-white text-xs font-medium">+1 469 306 9209</span>
                          </a>
                          
                          {/* Email */}
                          <div 
                            className="flex items-center justify-start bg-[rgba(255,255,255,0.1)] py-1.5 px-3 rounded-md transition-all duration-300 hover:bg-[rgba(233,189,128,0.2)]"
                          >
                            <div className="bg-[#A83119] w-[25px] h-[25px] rounded-full flex items-center justify-center mr-2 shadow-[0_2px_6px_rgba(233,189,128,0.3)]">
                              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#042D43" strokeWidth="2">
                                <path d="M3 4L10 9L17 4M3 4H17M3 4V16H17V4" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <a 
                              href="mailto:info@stormbuddi.com" 
                              className="text-white text-xs font-medium no-underline transition-colors duration-300 hover:text-[#E9BD80]"
                            >
                              info@stormbuddi.com
                            </a>
                          </div>
                          
                          {/* Address */}
                          <div 
                            className="flex items-center justify-start bg-[rgba(255,255,255,0.1)] py-1.5 px-3 rounded-md transition-all duration-300 hover:bg-[rgba(233,189,128,0.2)]"
                          >
                            <div className="bg-[#A83119] w-[25px] h-[25px] rounded-full flex items-center justify-center mr-2 shadow-[0_2px_6px_rgba(233,189,128,0.3)]">
                              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#042D43" strokeWidth="2">
                                <path d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z" strokeLinecap="round"/>
                                <path d="M10 17.5C12.5 14.5 17.5 10.1667 17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5C6.5 10.1667 11.5 14.5 14 17.5" strokeLinecap="round"/>
                              </svg>
                            </div>
                            <span className="text-white text-xs font-medium">2785 Rockbrook Dr Suite 104 Lewisville, Texas</span>
                          </div>
                        </div>
                        
                        {/* Get In Touch Button */}
                        <div className="text-center">
                          <a 
                            href="#contact-us" 
                            className="inline-block bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white border-none py-3 px-6 rounded-[20px] text-[13px] font-bold cursor-pointer transition-all duration-300 no-underline shadow-[0_6px_20px_rgba(168,49,25,0.4)] tracking-wide hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(168,49,25,0.5)]"
                          >
                            Get In Touch
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        {/* Row 2: NRCA Membership */}
        <div className="row">
          <div className="w-full mb-3">
              <div className="widget widget_block mb-3">
                <div className="widget-content">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
                    {/* NRCA Logo - Left */}
                    <div className="flex items-center justify-center">
                      <img
                        src="/images/LOGO2.png"
                        alt="NRCA Logo"
                        className="w-[80px] md:w-[100px] h-auto object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-[80px] md:w-[100px] h-[60px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                              <div class="text-center text-[#4C6371] text-sm">
                                <div class="text-2xl mb-1">🏆</div>
                                <div class="text-xs">NRCA</div>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    </div>

                    {/* NRCA Text - Right */}
                    <div className="flex items-center justify-center">
                      <div className="footer-content">
                        <p className="text-white text-sm md:text-base m-0 text-center md:text-left">
                          Proud Member of NRCA (National Roofing Contractors Association)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom-wrap mt-4">
          <div className="container mx-auto px-4">
          <div className="row">
            <div className="w-full">
              <div className="text-center">
                <p className="footer-copyright text-white m-0 text-sm">
                    © Copyright 2025. All rights reserved.{' '}
                    <a 
                      href="/" 
                      className="text-[#A83119] no-underline font-semibold transition-colors duration-300 hover:text-[#f4d4a3]"
                    >
                      StormBuddi
                    </a>
                    . Designed by{' '}
                    <a 
                      href="/" 
                      className="text-[#A83119] no-underline font-semibold transition-colors duration-300 hover:text-[#f4d4a3]"
                    >
                      MitieSoft
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <FreeTrialModal 
        isOpen={isFreeTrialModalOpen} 
        onClose={closeFreeTrialModal}
      />
    </footer>
  );
};

export default Footer;

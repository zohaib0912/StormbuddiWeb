import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#about-us', label: 'About Us' },
    { href: '#contact-us', label: 'Contact Us' },
    { href: 'https://app.stormbuddi.com/login', label: 'Login', external: true },
  ];

  // Handle navigation for hash links
  const handleNavClick = (e, href) => {
    // Only handle non-external links
    if (!href.startsWith('http')) {
      e.preventDefault();
      
      // If we're not on the home page, navigate to home with hash
      if (location.pathname !== '/') {
        navigate(`/${href}`);
      } else {
        // If we're already on home, just scroll to the section
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden', 'mobile-menu-open');
    } else {
      document.body.classList.remove('overflow-hidden', 'mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('overflow-hidden', 'mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      id="site-header" 
      className="site-header header-absolute absolute left-0 right-0 z-[1000] w-full"
      style={{ top: 'var(--announcement-bar-height, 60px)' }}
    >
      {/* Header Topbar */}
      <div className="header-topbar navbar elements-2 h-0 md:h-[6px] w-full bg-transparent"></div>

      {/* Sticky Outer */}
      <div className="sticky-outer" data-stickyup="0">
        <div
          className={`sticky-head transition-all duration-300 w-full ${
            isSticky
              ? 'fixed left-0 right-0 bg-white/95 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.08)] z-[999]'
              : 'bg-transparent'
          }`}
          style={isSticky ? { top: 'var(--announcement-bar-height, 60px)' } : {}}
        >
          <div className="header-navbar navbar elements-3 bg-white md:bg-transparent">
            <div className="container-fluid max-w-full px-4 md:px-10 mx-auto">
              <div className="flex items-center justify-between min-h-[110px] md:min-h-[110px] relative gap-2 md:gap-4">
                {/* Mobile Menu Toggle - Far Left on Mobile */}
                <div className="md:hidden flex items-center justify-start order-1 md:order-none flex-shrink-0">
                  <button
                    type="button"
                    aria-label="Open navigation menu"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#d9d9d9] bg-white text-[#042D43] shadow-sm"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="15" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Center: Logo - Centered on Mobile */}
                <ul className="nav navbar-ul element-left right-element-exist flex items-center justify-center md:justify-start flex-1 md:flex-none md:shrink-0 m-0 p-0 list-none order-2 md:order-none absolute md:relative left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0">
                  <li className="header-titles-wrapper">
                    <div className="header-titles">
                      <a className="site-link" href="/">
                        <img
                          width="420"
                          height="110"
                          className={`img-fluid site-logo max-h-[80px] md:max-h-[110px] h-auto w-auto object-contain ${isSticky ? 'hidden' : 'block'}`}
                          src="/images/logo.png"
                          alt="StormBuddi Logo"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentElement) {
                              e.target.parentElement.innerHTML = '<span style="font-size: 24px; font-weight: bold; color: #042D43;">STORM BUDDI</span>';
                            }
                          }}
                        />
                      </a>
                      <a className="site-link sticky-logo-link" href="/">
                        <img
                          width="420"
                          height="110"
                          className={`img-fluid sticky-logo max-h-[80px] md:max-h-[110px] h-auto w-auto object-contain ${!isSticky ? 'hidden' : 'block'}`}
                          src="/images/logo.png"
                          alt="StormBuddi Logo"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentElement) {
                              e.target.parentElement.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: #042D43;">STORM BUDDI</span>';
                            }
                          }}
                        />
                      </a>
                    </div>
                  </li>
                </ul>

                {/* Center: Navigation - Desktop Only */}
                <ul className="nav navbar-ul pull-center justify-content-center right-element-exist hidden md:flex items-center flex-1 justify-center gap-8 list-none m-0 p-0">
                  <li className="header-navigation-wrapper">
                    <nav className="primary-menu-wrapper" aria-label="Horizontal">
                      <ul className="nav wp-menu primary-menu flex items-center gap-8 list-none m-0 p-0 relative">
                        {navLinks.map(({ href, label, external }) => (
                          <li key={label} className="menu-item menu-item-type-custom menu-item-object-custom">
                            <a
                              href={href}
                              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              onClick={(e) => !external && handleNavClick(e, href)}
                              className="text-[#042D43] no-underline text-[14px] font-semibold uppercase tracking-[0.5px] transition-colors duration-300 inline-block hover:text-[#A83119]"
                            >
                              {label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </li>
                </ul>

                {/* Right: NRCA and WHOV Logos - Far Right on Mobile */}
                <ul className="nav navbar-ul pull-right justify-content-end right-element-exist flex items-center shrink-0 m-0 p-0 list-none order-3 md:order-none">
                  <li>
                    <div className="flex items-center gap-2 md:gap-4">
                      {/* NRCA Logo */}
                      <a 
                        href="https://www.nrca.net/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block transition-opacity duration-300 hover:opacity-80"
                      >
                        <img
                          src="/images/LOGO2.png"
                          alt="NRCA Logo"
                          className="h-[40px] md:h-[80px] w-auto object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentElement) {
                              e.target.parentElement.innerHTML = `
                                <div class="h-[40px] md:h-[80px] w-[60px] md:w-[100px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                                  <div class="text-xl md:text-3xl">🏆</div>
                                </div>
                              `;
                            }
                          }}
                        />
                      </a>
                      {/* WHOV Logo */}
                      <button 
                        type="button"
                        className="inline-block transition-opacity duration-300 hover:opacity-80 bg-transparent border-none p-0 cursor-pointer"
                        aria-label="WHOV Logo"
                      >
                        <img
                          src="/images/WHOV.png"
                          alt="WHOV Logo"
                          className="h-[40px] md:h-[80px] w-auto object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentElement) {
                              e.target.parentElement.innerHTML = `
                                <div class="h-[40px] md:h-[80px] w-[60px] md:w-[100px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                                  <div class="text-xl md:text-3xl">🏅</div>
                                </div>
                              `;
                            }
                          }}
                        />
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[1200] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-white shadow-2xl p-6 flex flex-col gap-6 transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="inline-flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src="/images/logo.png"
                alt="StormBuddi Logo"
                className="h-60 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span style="font-size:18px;font-weight:700;color:#042D43;">StormBuddi</span>';
                }}
              />
            </a>
            <button
              type="button"
              aria-label="Close navigation menu"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#d9d9d9] text-[#042D43]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {navLinks.map(({ href, label, external }) => (
              <li key={`mobile-${label}`}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={(e) => {
                    if (!external) {
                      handleNavClick(e, href);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[#042D43] no-underline text-lg font-semibold uppercase tracking-[1px] inline-block"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {/* Mobile: NRCA and WHOV Logos */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://www.nrca.net/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block transition-opacity duration-300 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src="/images/LOGO2.png"
                  alt="NRCA Logo"
                  className="h-[60px] w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.parentElement) {
                      e.target.parentElement.innerHTML = `
                        <div class="h-[60px] w-[90px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                          <div class="text-2xl">🏆</div>
                        </div>
                      `;
                    }
                  }}
                />
              </a>
              <button 
                type="button"
                className="inline-block transition-opacity duration-300 hover:opacity-80 bg-transparent border-none p-0 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="WHOV Logo"
              >
                <img
                  src="/images/WHOV.png"
                  alt="WHOV Logo"
                  className="h-[60px] w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.parentElement) {
                      e.target.parentElement.innerHTML = `
                        <div class="h-[60px] w-[90px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                          <div class="text-2xl">🏅</div>
                        </div>
                      `;
                    }
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

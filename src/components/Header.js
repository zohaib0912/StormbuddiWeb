import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/** Same destination as AI Agents section (Marbilism login). */
const MARBLISM_URL = 'https://ai.marblism.com/login';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#ai-agents', label: 'AI Agent' },
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


  // No IRE banner: header always at top on all pages; clear any leftover banner space
  useEffect(() => {
    document.documentElement.style.setProperty('--announcement-bar-height', '0px');
    document.body.style.paddingTop = '';
  }, []);

  const headerTop = '0px';

  const openDownloadModal = () => setIsDownloadModalOpen(true);
  const closeDownloadModal = () => setIsDownloadModalOpen(false);
  const handleConfirmDownload = () => {
    const link = document.createElement('a');
    link.href = '/apk/app-release.apk';
    link.download = 'StormBuddi-app.apk';
    link.click();
    closeDownloadModal();
  };

  // Ensure CSS variable is set to 0 on routes that don't show the IRE banner (same as estimate-team)
  const noBannerRoutes = ['/estimate-team', '/privacy-policy', '/refund-returns'];
  const shouldHideBannerSpace = noBannerRoutes.includes(location.pathname);

  useEffect(() => {
    if (shouldHideBannerSpace) {
      document.documentElement.style.setProperty('--announcement-bar-height', '0px');
      document.body.style.paddingTop = '';
    }
  }, [location.pathname, shouldHideBannerSpace]);

  // Calculate top position - use 0px when no banner, otherwise use CSS variable



  return (
    <header 
      id="site-header" 
      className="site-header header-absolute absolute left-0 right-0 z-[1000] w-full"
      style={{ top: headerTop }}
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
          style={isSticky ? { top: headerTop } : {}}
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
                        <li className="menu-item">
                          <button
                            type="button"
                            onClick={openDownloadModal}
                            className="text-[#042D43] no-underline text-[14px] font-semibold uppercase tracking-[0.5px] transition-colors duration-300 inline-block hover:text-[#A83119] bg-transparent border-none cursor-pointer p-0"
                          >
                            Download Mobile App
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </li>
                </ul>

                {/* Right: NRCA, WHOV, Marbilism — desktop only; all three live in hamburger drawer on mobile */}
                <ul className="nav navbar-ul pull-right justify-content-end right-element-exist hidden md:flex items-center shrink-0 m-0 p-0 list-none md:order-none">
                  <li>
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-end">
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
                          className="h-[44px] md:h-[88px] w-auto object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentElement) {
                              e.target.parentElement.innerHTML = `
                                <div class="h-[44px] md:h-[88px] w-[60px] md:w-[100px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
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
                          className="h-[44px] md:h-[88px] w-auto object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentElement) {
                              e.target.parentElement.innerHTML = `
                                <div class="h-[44px] md:h-[88px] w-[60px] md:w-[100px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                                  <div class="text-xl md:text-3xl">🏅</div>
                                </div>
                              `;
                            }
                          }}
                        />
                      </button>
                      {/* Marbilism */}
                      <a
                        href={MARBLISM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A83119] focus-visible:ring-offset-2 rounded-md"
                        aria-label="Marbilism — opens in new tab"
                      >
                        <img
                          src="/images/Marbilism.jpeg"
                          alt="Marbilism"
                          className="h-[48px] md:h-[92px] w-auto max-w-[160px] md:max-w-[220px] object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </a>
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
            <li>
              <button
                type="button"
                onClick={() => {
                  openDownloadModal();
                  setIsMobileMenuOpen(false);
                }}
                className="text-[#042D43] no-underline text-lg font-semibold uppercase tracking-[1px] inline-block bg-transparent border-none cursor-pointer p-0 text-left"
              >
                Download Mobile App
              </button>
            </li>
          </ul>
          {/* Mobile: NRCA, WHOV, Marbilism */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
                  className="h-[56px] w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.parentElement) {
                      e.target.parentElement.innerHTML = `
                        <div class="h-[56px] w-[90px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
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
                  className="h-[56px] w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.parentElement) {
                      e.target.parentElement.innerHTML = `
                        <div class="h-[56px] w-[90px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                          <div class="text-2xl">🏅</div>
                        </div>
                      `;
                    }
                  }}
                />
              </button>
              <a
                href={MARBLISM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-full justify-center sm:w-auto transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A83119] rounded-md"
                aria-label="Marbilism — opens in new tab"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src="/images/Marbilism.jpeg"
                  alt="Marbilism"
                  className="h-[58px] w-auto max-w-[min(100%,220px)] object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Download app confirmation modal */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeDownloadModal}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#042D43] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Download StormBuddi App
            </h3>
            <p className="text-[#4C6371] mb-6">
              Are you sure you want to download the StormBuddi app?
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                type="button"
                onClick={closeDownloadModal}
                className="px-5 py-2.5 rounded-lg border-2 border-[#d9d9d9] text-[#042D43] font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDownload}
                className="px-5 py-2.5 rounded-lg bg-[#A83119] text-white font-semibold hover:bg-[#C4452A] transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

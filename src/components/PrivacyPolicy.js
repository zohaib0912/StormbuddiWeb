import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 pt-32 pb-12 md:pt-32 md:pb-14">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-2xl mb-4 sm:mb-6 shadow-lg">
                <svg width="32" height="32" className="sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#042D43] mb-3 sm:mb-4">
                Privacy Policy
              </h1>
              <p className="text-[#4C6371] text-base sm:text-lg">
                Last Updated: January 2025
              </p>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="space-y-8 sm:space-y-10 md:space-y-12">
              
              {/* Introduction */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Introduction</h2>
                    <p className="text-[#4C6371] leading-relaxed mb-4">
                      Welcome to StormBuddi ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our products and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our roofing CRM platform, or interact with our services.
                    </p>
                    <p className="text-[#4C6371] leading-relaxed">
                      By using StormBuddi, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information We Collect */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8.5" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 8v6M23 11h-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-4 sm:mb-6">Information We Collect</h2>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#042D43] mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#A83119] rounded-full"></span>
                        Personal Information
                      </h3>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                        We may collect personal information that you voluntarily provide to us when you:
                      </p>
                      <ul className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                        {[
                          'Register for an account or subscribe to our services',
                          'Contact us through our website, email, or phone',
                          'Use our CRM platform to manage your roofing business',
                          'Participate in surveys, promotions, or events',
                          'Request customer support or technical assistance'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-[#4C6371]">
                            <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#A83119] rounded-full flex items-center justify-center mt-0.5">
                              <svg width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4 font-semibold">
                        This information may include:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {[
                          'Name, email address, phone number, and mailing address',
                          'Company name, business information, and job title',
                          'Payment information (processed securely)',
                          'Account credentials and authentication information',
                          'Customer data you input into our CRM system'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm sm:text-base text-[#4C6371]">
                            <span className="text-[#A83119] mt-1">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#042D43] mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#A83119] rounded-full"></span>
                        Automatically Collected Information
                      </h3>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                        When you visit our website or use our services, we may automatically collect certain information about your device and usage patterns, including:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {[
                          'IP address, browser type, and operating system',
                          'Pages visited, time spent on pages, and navigation patterns',
                          'Device identifiers and mobile network information',
                          'Cookies and similar tracking technologies',
                          'Log files and analytics data'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm sm:text-base text-[#4C6371]">
                            <span className="text-[#A83119] mt-1">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-4 sm:mb-6">How We Use Your Information</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-4 sm:mb-6">
                      We use the information we collect for various purposes, including:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        { title: 'Service Delivery', desc: 'To provide, maintain, and improve our roofing CRM platform and services' },
                        { title: 'Account Management', desc: 'To create and manage your account, process payments, and send service-related communications' },
                        { title: 'Customer Support', desc: 'To respond to your inquiries, provide technical support, and address your concerns' },
                        { title: 'Business Operations', desc: 'To analyze usage patterns, improve our services, and develop new features' },
                        { title: 'Marketing', desc: 'To send you promotional materials, newsletters, and updates about our services' },
                        { title: 'Legal Compliance', desc: 'To comply with applicable laws, regulations, and legal processes' },
                        { title: 'Security', desc: 'To protect against fraud, unauthorized access, and other security threats' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:border-[#A83119] transition-colors">
                          <h4 className="text-sm sm:text-base font-semibold text-[#042D43] mb-1 sm:mb-2">{item.title}</h4>
                          <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Information Sharing and Disclosure */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Information Sharing and Disclosure</h2>
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border-l-4 border-[#A83119]">
                      <p className="text-base sm:text-lg text-[#042D43] font-semibold mb-3 sm:mb-4">
                        🔒 We do not sell your personal information.
                      </p>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                        We may share your information in the following circumstances:
                      </p>
                    </div>
                    <ul className="space-y-3 sm:space-y-4">
                      {[
                        { title: 'Service Providers', desc: 'With third-party vendors who perform services on our behalf (e.g., payment processing, cloud hosting, analytics)' },
                        { title: 'Business Transfers', desc: 'In connection with a merger, acquisition, or sale of assets' },
                        { title: 'Legal Requirements', desc: 'When required by law, court order, or government regulation' },
                        { title: 'Protection of Rights', desc: 'To protect our rights, property, or safety, or that of our users' },
                        { title: 'With Your Consent', desc: 'When you have given us explicit permission to share your information' }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-[#A83119] rounded-lg flex items-center justify-center text-white text-sm sm:text-base font-bold">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm sm:text-base font-semibold text-[#042D43] mb-1">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Data Security</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-4 sm:mb-6">
                      We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {[
                        'Encryption of data in transit and at rest',
                        'Regular security assessments and updates',
                        'Access controls and authentication mechanisms',
                        'Secure data centers and infrastructure',
                        'Employee training on data protection practices'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                          <svg width="18" height="18" className="sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">
                        <strong className="text-[#042D43]">Note:</strong> However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Your Rights and Choices */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Your Rights and Choices</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-4 sm:mb-6">
                      Depending on your location, you may have certain rights regarding your personal information, including:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {[
                        { title: 'Access', desc: 'Request access to the personal information we hold about you' },
                        { title: 'Correction', desc: 'Request correction of inaccurate or incomplete information' },
                        { title: 'Deletion', desc: 'Request deletion of your personal information (subject to legal obligations)' },
                        { title: 'Portability', desc: 'Request a copy of your data in a portable format' },
                        { title: 'Opt-Out', desc: 'Unsubscribe from marketing communications at any time' },
                        { title: 'Cookies', desc: 'Manage cookie preferences through your browser settings' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-200 hover:border-[#A83119] transition-colors">
                          <h4 className="text-sm sm:text-base font-semibold text-[#042D43] mb-1 sm:mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#A83119] rounded-full"></span>
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg p-3 sm:p-4 text-white">
                      <p className="text-xs sm:text-sm leading-relaxed">
                        <strong>To exercise these rights,</strong> please contact us using the information provided in the "Contact Us" section below.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cookies and Tracking Technologies */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Cookies and Tracking Technologies</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                      We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are small data files stored on your device that help us improve your experience, analyze usage, and personalize content.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">
                        <strong className="text-[#042D43]">Important:</strong> You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website or services.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Third-Party Links */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3h6v6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Third-Party Links</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed">
                      Our website may contain links to third-party websites or services that are not owned or controlled by StormBuddi. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
                    </p>
                  </div>
                </div>
              </section>

              {/* Children's Privacy */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Children's Privacy</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed">
                      Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Changes to This Privacy Policy */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Changes to This Privacy Policy</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Us */}
              <section className="bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-xl shadow-xl p-6 sm:p-8 md:p-10 text-white">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Contact Us</h2>
                    <p className="text-sm sm:text-base mb-4 sm:mb-6 opacity-90">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#A83119] rounded-lg flex items-center justify-center">
                          <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm sm:text-base font-semibold mb-1">StormBuddi</p>
                          <p className="text-xs sm:text-sm opacity-90">2785 Rockbrook Dr Suite 104</p>
                          <p className="text-xs sm:text-sm opacity-90">Lewisville, Texas, United States of America</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#A83119] rounded-lg flex items-center justify-center">
                          <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <a href="tel:+14693069209" className="text-sm sm:text-base text-[#E9BD80] hover:text-[#f4d4a3] transition-colors font-medium break-all">
                          +1 469 306 9209
                        </a>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#A83119] rounded-lg flex items-center justify-center">
                          <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <a href="mailto:info@stormbuddi.com" className="text-sm sm:text-base text-[#E9BD80] hover:text-[#f4d4a3] transition-colors font-medium break-all">
                          info@stormbuddi.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

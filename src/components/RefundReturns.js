import React from 'react';
import Header from './Header';
import Footer from './Footer';

const RefundReturns = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 pt-32 pb-12 md:pt-32 md:pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-2xl mb-4 sm:mb-6 shadow-lg">
                <svg width="32" height="32" className="sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#042D43] mb-3 sm:mb-4">
                Refund & Returns Policy
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
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Introduction</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                      At StormBuddi, we are committed to providing exceptional roofing CRM software and services. We understand that circumstances may arise where you need to request a refund or cancel your subscription. This Refund & Returns Policy outlines our policies and procedures regarding refunds, cancellations, and returns for our software subscription services.
                    </p>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed">
                      Please read this policy carefully before making a purchase or subscription. By subscribing to StormBuddi, you agree to the terms outlined in this policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Subscription Services */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Subscription Services</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                      StormBuddi operates on a subscription-based model. Our services are provided on a monthly or annual basis, and access to the platform is granted immediately upon successful payment and account activation.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">
                        <strong className="text-[#042D43]">Note:</strong> Since our services are digital and provided immediately upon subscription, traditional "returns" do not apply. However, we offer refund policies as outlined below.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Refund Policy */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-4 sm:mb-6">Refund Policy</h2>
                    
                    {/* 30-Day Money-Back Guarantee */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border-l-4 border-green-500">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#042D43] mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold">✓</span>
                        <span className="flex-1">30-Day Money-Back Guarantee</span>
                      </h3>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                        We offer a <strong className="text-[#042D43]">30-day money-back guarantee</strong> for new subscribers. If you are not satisfied with StormBuddi within the first 30 days of your initial subscription, you may request a full refund of your subscription fee.
                      </p>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4 font-semibold">
                        To be eligible for a refund under this guarantee:
                      </p>
                      <ul className="space-y-2 sm:space-y-3">
                        {[
                          'You must request the refund within 30 days of your initial subscription date',
                          'The refund request must be made through our official support channels',
                          'This guarantee applies only to your first subscription payment (monthly or annual)',
                          'Subsequent renewals are not eligible for the 30-day guarantee'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-[#4C6371]">
                            <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                              <svg width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Refund Eligibility */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#042D43] mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#A83119] rounded-full"></span>
                        Refund Eligibility
                      </h3>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                        Refunds may be considered in the following circumstances:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {[
                          { title: 'Service Issues', desc: 'If we are unable to provide the service as described due to technical issues on our end' },
                          { title: 'Billing Errors', desc: 'If you were charged incorrectly or charged multiple times for the same service' },
                          { title: 'Unauthorized Charges', desc: 'If your account was charged without your authorization' },
                          { title: 'Service Discontinuation', desc: 'If we discontinue a service you have paid for and cannot provide an equivalent alternative' }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:border-[#A83119] transition-colors">
                            <h4 className="text-sm sm:text-base font-semibold text-[#042D43] mb-1 sm:mb-2">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Non-Refundable Items */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 sm:p-6 border-l-4 border-red-400">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#042D43] mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#A83119] rounded-full"></span>
                        Non-Refundable Items
                      </h3>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                        The following are not eligible for refunds:
                      </p>
                      <ul className="space-y-2">
                        {[
                          'Subscription fees after the 30-day guarantee period has expired',
                          'Renewal payments for existing subscriptions',
                          'Add-on services or premium features purchased separately',
                          'Fees for services that have been fully utilized or consumed',
                          'Third-party payment processing fees (if applicable)'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-[#4C6371]">
                            <span className="text-red-500 mt-1">×</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cancellation Policy */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-4 sm:mb-6">Cancellation Policy</h2>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#042D43] mb-3 sm:mb-4">How to Cancel</h3>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                        You may cancel your subscription at any time through:
                      </p>
                      <ul className="space-y-2 sm:space-y-3">
                        {[
                          'Your account dashboard on the StormBuddi platform',
                          'Contacting our support team at info@stormbuddi.com',
                          'Calling our support line at +1 469 306 9209'
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
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border-l-4 border-blue-400">
                        <h3 className="text-base sm:text-lg font-semibold text-[#042D43] mb-1 sm:mb-2">Monthly Subscriptions</h3>
                        <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">
                          Cancellations take effect at the end of your current billing cycle. You will continue to have access to the service until the end of the period you have already paid for.
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 sm:p-4 border-l-4 border-green-400">
                        <h3 className="text-base sm:text-lg font-semibold text-[#042D43] mb-1 sm:mb-2">Annual Subscriptions</h3>
                        <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">
                          Cancellations take effect at the end of your current annual billing period. You will continue to have access to the service until the end of the period you have already paid for. Annual subscriptions are not eligible for partial refunds for unused months.
                        </p>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border-l-4 border-yellow-400">
                        <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">
                          <strong className="text-[#042D43]">Important:</strong> Canceling your subscription will stop future charges, but it does not automatically entitle you to a refund for the current billing period unless you are within the 30-day guarantee period.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Refund Process */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-4 sm:mb-6">Refund Process</h2>
                    
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#042D43] mb-3 sm:mb-4">How to Request a Refund</h3>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                        To request a refund, please follow these steps:
                      </p>
                      <ol className="space-y-3 sm:space-y-4">
                        {[
                          { step: 'Contact our support team', detail: 'via email at info@stormbuddi.com or call us at +1 469 306 9209' },
                          { step: 'Provide your account information', detail: 'email address or account ID' },
                          { step: 'Explain the reason', detail: 'for your refund request' },
                          { step: 'Include any relevant documentation', detail: 'or details' }
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 sm:gap-4">
                            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-[#A83119] rounded-lg flex items-center justify-center text-white text-sm sm:text-base font-bold">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm sm:text-base font-semibold text-[#042D43] mb-1">{item.step}</h4>
                              <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">{item.detail}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#042D43] mb-3 sm:mb-4">Refund Processing Time</h3>
                      <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                        Once your refund request is approved:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {[
                          'Refunds are typically processed within 5-10 business days',
                          'Refunds will be issued to the original payment method used for the purchase',
                          'You will receive a confirmation email once the refund has been processed',
                          'The time it takes for the refund to appear in your account depends on your payment provider'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg">
                            <svg width="18" height="18" className="sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Account Access After Refund */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v8H2z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 8v8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Account Access After Refund</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed mb-3 sm:mb-4">
                      If your refund is approved:
                    </p>
                    <ul className="space-y-2 sm:space-y-3">
                      {[
                        'Your account access will be terminated immediately upon refund processing',
                        'You will no longer be able to access the StormBuddi platform or your data',
                        'We recommend exporting any important data before requesting a refund',
                        'Your account data will be retained for a limited period as required by law, then securely deleted'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#A83119] rounded-full flex items-center justify-center mt-0.5">
                            <svg width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Chargebacks */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Chargebacks</h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm text-[#4C6371] leading-relaxed">
                        We strongly encourage you to contact us directly to resolve any billing issues before initiating a chargeback with your bank or credit card company. Chargebacks can result in additional fees and may affect your ability to use our services in the future.
                      </p>
                    </div>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed">
                      If you have concerns about a charge, please reach out to our support team first. We are committed to resolving issues fairly and promptly.
                    </p>
                  </div>
                </div>
              </section>

              {/* Changes to This Policy */}
              <section>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#042D43] to-[#1a4a6b] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#042D43] mb-3 sm:mb-4">Changes to This Policy</h2>
                    <p className="text-sm sm:text-base text-[#4C6371] leading-relaxed">
                      We reserve the right to modify this Refund & Returns Policy at any time. Changes will be effective immediately upon posting to this page. We will notify existing subscribers of any material changes via email. Your continued use of our services after such changes constitutes acceptance of the updated policy.
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
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Questions About Refunds?</h2>
                    <p className="text-sm sm:text-base mb-4 sm:mb-6 opacity-90">
                      If you have any questions about our refund and returns policy, or if you need assistance with a refund request, please don't hesitate to contact us:
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
                          <p className="text-sm sm:text-base font-semibold mb-1">StormBuddi Support</p>
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
                      <div className="pt-3 sm:pt-4 border-t border-white/20">
                        <p className="text-xs sm:text-sm opacity-90">Business Hours: Monday - Friday, 9:00 AM - 6:00 PM CST</p>
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

export default RefundReturns;

import React, { useState, useMemo, useEffect } from 'react';
import EmailModal from './EmailModal';
import DemoModal from './DemoModal';
import FreeTrialModal from './FreeTrialModal';

const getDefaultEndpoint = () => {
  if (process.env.REACT_APP_PRICING_API) {
    return process.env.REACT_APP_PRICING_API;
  }

  // Always use direct API URL to avoid proxy issues
  // The proxy should handle CORS, but if it's causing 401, use direct connection
  return 'https://app.stormbuddi.com/api/pricing';
};

const API_ENDPOINT = getDefaultEndpoint();

const normalizePlanName = (name = '') => name.toLowerCase().replace(/\s+plan$/, '').trim();

const normalizePlans = (plans = []) => {
  if (!Array.isArray(plans) || plans.length === 0) {
    return null;
  }

  const monthlyPlans = plans
    .filter((plan) => plan.billing_cycle === 'monthly')
    .map((plan) => {
      const finalPrice = Number(plan.price) || 0;
      const discPrice = plan.disc_price ? Number(plan.disc_price) : 0;
      const originalPrice = discPrice > 0 ? finalPrice + discPrice : finalPrice;
      const normalizedName = normalizePlanName(plan.name);
      const isEnterprise = /enterprise/i.test(plan.name);
      
      return {
        id: String(plan.slug || plan.id || normalizePlanName(plan.name)),
        dbId: plan.id, // Preserve database ID for checkout
        name: plan.name,
        displayName: plan.name,
        price: finalPrice, // Final price after discount
        originalPrice: discPrice > 0 ? originalPrice : null, // Original price before discount
        billingSuffix: '/Month',
        features: plan.services && plan.services.length ? plan.services : [],
        checkmarkColor: '#0E7490',
        badgeText: null,
        popular: /professional/i.test(plan.name),
        validUntil: isEnterprise ? '7th January 2026' : null
      };
    });

  const monthlyLookup = new Map(
    monthlyPlans.map((plan) => [normalizePlanName(plan.name), plan])
  );

  const annualPlans = plans
    .filter((plan) => plan.billing_cycle === 'annual')
    .map((plan) => {
      const normalizedName = normalizePlanName(plan.name);
      const matchingMonthly = monthlyLookup.get(normalizedName);
      const finalPrice = Number(plan.price) || 0;
      const discPrice = plan.disc_price ? Number(plan.disc_price) : 0;
      const originalPrice = discPrice > 0 ? finalPrice + discPrice : finalPrice;
      const isEnterprise = /enterprise/i.test(plan.name);
      let badgeText = null;

      if (matchingMonthly && matchingMonthly.price > 0) {
        const monthlyAnnualCost = matchingMonthly.price * 12;
        const discount = ((monthlyAnnualCost - finalPrice) / monthlyAnnualCost) * 100;
        if (discount > 0) {
          badgeText = `Save ${discount.toFixed(1)}%`;
        }
      }

      return {
        id: String(plan.slug || plan.id || `${normalizedName}-annual`),
        dbId: plan.id, // Preserve database ID for checkout
        name: plan.name,
        displayName: plan.name,
        price: finalPrice, // Final price after discount
        originalPrice: discPrice > 0 ? originalPrice : null, // Original price before discount
        billingSuffix: '/Year',
        features:
          plan.services && plan.services.length
            ? plan.services
            : matchingMonthly?.features || [],
        checkmarkColor: '#0E7490',
        badgeText,
        popular: /professional/i.test(plan.name),
        validUntil: isEnterprise ? '7th January 2026' : null
      };
    });

  return { monthly: monthlyPlans, annual: annualPlans };
};

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [isAnnual, setIsAnnual] = useState(false);
  const [remotePlans, setRemotePlans] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState(null);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [isFreeTrialModalOpen, setIsFreeTrialModalOpen] = useState(false);
  const modalPlanId = useMemo(() => {
    if (!modalPlan?.dbId) return null;
    const parsedId =
      typeof modalPlan.dbId === 'number'
        ? modalPlan.dbId
        : parseInt(modalPlan.dbId, 10);
    return Number.isNaN(parsedId) ? null : parsedId;
  }, [modalPlan]);

  const basePlans = useMemo(
    () => ([
    {
      id: 'starter',
      dbId: 1,
      name: 'Starter',
      annualLabel: 'Starter',
      monthlyPrice: 69,
      features: [
        'Real-time hail & storm alerts',
        'NOAA-integrated weather data',
        'Roof monitoring & homeowner notifications'
      ],
      popular: false,
      checkmarkColor: '#0E7490'
    },
    {
      id: 'professional',
      dbId: 2,
      name: 'Professional',
      annualLabel: 'Professional Plan',
      monthlyPrice: 95,
      features: [
        'Full project tracking & client portal',
        'Estimates, supplements, and communication tools',
        'White-label branding for your company'
      ],
      popular: true,
      checkmarkColor: '#0E7490'
    },
    {
      id: 'enterprise',
      dbId: 3,
      name: 'Enterprise',
      annualLabel: 'Enterprise Plan',
      monthlyPrice: 350,
      features: [
        'Includes HAIL App + CRM together',
        'Best value - saves nearly $20/month',
        'Full weather alerts, CRM, homeowner portal, and automation in one'
      ],
      popular: false,
      checkmarkColor: '#0E7490'
    }
  ]),
    []
  );

  useEffect(() => {
    let isMounted = true;

    const fetchPricing = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        // Build the full URL
        const url = `${API_ENDPOINT}/all`;
        console.log('🔍 [Pricing] Fetching from database:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors', // Enable CORS
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'omit', // Don't send cookies or credentials
          // Explicitly do NOT include Authorization header
        });

        if (!response.ok) {
          console.error('❌ [Pricing] HTTP error', {
            endpoint: `${API_ENDPOINT}/all`,
            status: response.status,
            statusText: response.statusText,
          });
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log('📦 [Pricing] Raw API response from database:', payload);

        // Handle Laravel API response format
        // Laravel may return { data: {...} } or direct response
        const plans = payload.data?.plans || payload.plans || payload.data || [];
        console.log('📋 [Pricing] Extracted plans from database:', plans);
        console.log('📊 [Pricing] Number of plans fetched:', plans.length);
        
        if (!Array.isArray(plans) || plans.length === 0) {
          console.warn('⚠️ [Pricing] No plans found in response', { payload });
          throw new Error('No pricing plans available');
        }

        if (isMounted) {
          const normalized = normalizePlans(plans);
          console.log('✅ [Pricing] Normalized plans (monthly):', normalized?.monthly);
          console.log('✅ [Pricing] Normalized plans (annual):', normalized?.annual);
          setRemotePlans(normalized);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Pricing fetch error:', {
            endpoint: `${API_ENDPOINT}/all`,
            message: error?.message,
            stack: error?.stack,
          });
          setFetchError(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPricing();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!remotePlans?.monthly?.length || !selectedPlan) return;
    const hasSelected = remotePlans.monthly.some((plan) => plan.id === selectedPlan);
    if (!hasSelected) {
      setSelectedPlan(remotePlans.monthly[0].id);
    }
  }, [remotePlans, selectedPlan]);

  const monthlyPlans = useMemo(
    () =>
      basePlans.map((plan) => ({
        ...plan,
        id: plan.id,
        displayName: plan.name,
        price: plan.monthlyPrice,
        billingSuffix: '/Month',
        badgeText: null,
        validUntil: plan.id === 'enterprise' ? '7th January 2026' : null
      })),
    [basePlans]
  );

  const annualPlans = useMemo(
    () =>
      basePlans.map((plan) => {
        const discountRate = 0.0833; // 8.33% savings
        const annualPrice = plan.monthlyPrice * 12 * (1 - discountRate);
        return {
          ...plan,
          id: `${plan.id}-annual`,
          displayName: plan.annualLabel || `${plan.name} Plan`,
          price: annualPrice,
          billingSuffix: '/Year',
          badgeText: 'Save 8.33%',
          validUntil: plan.id === 'enterprise' ? '7th January 2026' : null
        };
      }),
    [basePlans]
  );

  const activeMonthlyPlans =
    remotePlans?.monthly?.length ? remotePlans.monthly : monthlyPlans;
  const activeAnnualPlans =
    remotePlans?.annual?.length ? remotePlans.annual : annualPlans;

  const plans = isAnnual ? activeAnnualPlans : activeMonthlyPlans;

  const handleGetStarted = (plan) => {
    if (!plan?.dbId) {
      setCheckoutError('Plan data not ready yet. Please refresh and try again.');
      return;
    }

    setCheckoutError(null);
    setModalPlan(plan);
    setIsModalOpen(true);
  };

  const openTalkModal = () => setIsTalkModalOpen(true);
  const closeTalkModal = () => setIsTalkModalOpen(false);
  const openFreeTrialModal = () => setIsFreeTrialModalOpen(true);
  const closeFreeTrialModal = () => setIsFreeTrialModalOpen(false);

  return (
    <section id="pricing" className="pricing-section pb-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[#042D43] text-[42px] font-bold">
          Built for Roofing Companies, Trusted by Contractors
          </h2>
          <h3 className="mb-8 text-[#A83119] text-[36px] font-bold">
            Simple, Affordable Pricing
          </h3>
          {isLoading && (
            <p className="text-sm text-slate-500">Loading live pricing…</p>
          )}
          {!isLoading && fetchError && (
            <p className="text-sm text-[#A83119]">
              Showing fallback pricing (live data unavailable).
            </p>
          )}
          {checkoutError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                {checkoutError}
              </p>
            </div>
          )}
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 rounded-full border border-[rgba(168,49,25,0.2)] bg-white shadow-[0_8px_20px_rgba(168,49,25,0.08)]">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                !isAnnual
                  ? 'bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white shadow-[0_4px_15px_rgba(168,49,25,0.3)]'
                  : 'text-[#A83119]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                isAnnual
                  ? 'bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white shadow-[0_4px_15px_rgba(168,49,25,0.3)]'
                  : 'text-[#A83119]'
              }`}
            >
              Annually
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((plan, index) => {
            const planId = plan.id || `${plan.name}-${plan.billingSuffix}`;
            const isSelected = selectedPlan === planId;

            return (
            <div
              key={planId || index}
              className={`relative flex flex-col items-center text-center bg-white rounded-[28px] shadow-[0_20px_60px_rgba(4,45,67,0.08)] p-8 w-full max-w-[360px] border transition-all duration-300 ${
                isSelected 
                  ? 'border-2 border-[#A83119] scale-105'
                  : 'border border-transparent'
              }`}
              onClick={() => setSelectedPlan(planId)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPlan(planId);
                }
              }}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#A83119] text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_8px_20px_rgba(168,49,25,0.3)]">
                  Most Popular
                </div>
              )}

              {/* Plan Title */}
              <h3 className={`mb-4 text-[#042D43] text-[28px] font-bold ${plan.popular ? 'mt-6' : 'mt-0'}`}>
                {plan.displayName}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-0.5 mt-2">
                  {plan.originalPrice ? (
                    <>
                      {/* Price container with original and final */}
                      <div className="flex items-start gap-0.5">
                        {/* Original price with strikethrough */}
                        <div className="text-gray-400 text-[20px] font-bold leading-none line-through">
                          ${plan.originalPrice.toFixed(2)}
                        </div>
                        {/* Final price after discount */}
                        <div className="text-[#A83119] text-[38px] font-bold leading-none">
                          ${plan.price.toFixed(2)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-[#A83119] text-[38px] font-bold leading-none">
                      ${plan.price.toFixed(2)}
                    </div>
                  )}
                  <div className="text-[#0F172A] text-lg font-semibold">
                    {plan.billingSuffix}
                  </div>
                  {plan.badgeText && (
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-[0_5px_15px_rgba(16,185,129,0.4)]">
                      {plan.badgeText}
                    </span>
                  )}
                </div>
                {plan.validUntil && (
                  <div className="mt-2 text-sm text-[#A83119] font-semibold">
                    Valid until {plan.validUntil}
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10 list-none p-0 m-0 text-left w-full">
                {(plan.features && plan.features.length ? plan.features : ['Contact us to learn more']).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke={plan.checkmarkColor}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[#0F172A] text-[15px] leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                className="w-full py-3.5 px-8 rounded-full font-semibold text-base border-2 transition-all duration-300 shadow-[0_10px_25px_rgba(168,49,25,0.25)] bg-[#A83119] text-white border-[#A83119] hover:bg-[#D1452A] hover:-translate-y-0.5 disabled:opacity-80"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetStarted(plan);
                }}
                disabled={!plan?.dbId}
              >
                Get Started
              </button>
            </div>
          )})}
        </div>

        {/* Call-to-Action Buttons */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button 
              onClick={openFreeTrialModal}
              className="bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white border-none py-4 px-9 rounded-xl text-base font-bold cursor-pointer shadow-[0_6px_20px_rgba(168,49,25,0.3)] tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(168,49,25,0.4)] relative overflow-hidden"
            >
              Start Free Trial
            </button>
            <span className="text-[#A83119] text-lg font-bold">
              OR
            </span>
            <button 
              className="bg-transparent text-[#A83119] border-[3px] border-[#A83119] py-4 px-9 rounded-xl text-base font-bold cursor-pointer shadow-[0_4px_15px_rgba(168,49,25,0.1)] tracking-wider transition-all duration-300 hover:bg-[#A83119] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(168,49,25,0.3)] relative overflow-hidden"
              onClick={openTalkModal}
            >
              Talk To Sales
            </button>
          </div>
        </div>
      </div>
      <EmailModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalPlan(null);
        }}
        planId={modalPlanId}
        planName={modalPlan?.displayName || modalPlan?.name}
      />

      <DemoModal 
        isOpen={isTalkModalOpen} 
        onClose={closeTalkModal}
        heading="Talk to sales"
      />

      <FreeTrialModal 
        isOpen={isFreeTrialModalOpen} 
        onClose={closeFreeTrialModal}
      />
    </section>
  );
};

export default Pricing;

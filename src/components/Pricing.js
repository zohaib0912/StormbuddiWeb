import React, { useState, useMemo, useEffect } from 'react';
import EmailModal from './EmailModal';
import DemoModal from './DemoModal';
import FreeTrialModal from './FreeTrialModal';

const getDefaultEndpoint = () => {
  if (process.env.REACT_APP_PRICING_API) {
    return process.env.REACT_APP_PRICING_API;
  }
  return 'https://app.stormbuddi.com/api/pricing';
};

const API_ENDPOINT = getDefaultEndpoint();

const normalizePlanName = (name = '') => name.toLowerCase().replace(/\s+plan$/, '').trim();

// Build monthly, quarterly (computed) and annual sets from API data
const normalizePlans = (plans = []) => {
  if (!Array.isArray(plans) || plans.length === 0) return null;

  const monthlyPlans = plans
    .filter((p) => p.billing_cycle === 'monthly')
    .map((p) => {
      const price = Number(p.price) || 0;
      const discPrice = p.disc_price ? Number(p.disc_price) : 0;
      const originalPrice = discPrice > 0 ? price + discPrice : null;
      // Always use normalized name as base id so getBaseId() works consistently
      const baseId = normalizePlanName(p.name);
      return {
        id: baseId,
        dbId: p.id,
        name: p.name,
        displayName: p.name,
        price,
        originalPrice,
        billingSuffix: '/Month',
        billingNote: null,
        features: p.services?.length ? p.services : [],
        checkmarkColor: '#0E7490',
        badgeText: null,
        popular: /crm|professional/i.test(p.name),
      };
    });

  const monthlyLookup = new Map(
    monthlyPlans.map((p) => [normalizePlanName(p.name), p])
  );

  // Quarterly — total for 3 months with 7.5% discount
  const quarterlyPlans = monthlyPlans.map((p) => ({
    ...p,
    id: `${p.id}-quarterly`,
    price: parseFloat((p.price * 3 * QUARTERLY_DISCOUNT).toFixed(2)),
    originalPrice: parseFloat((p.price * 3).toFixed(2)),
    billingSuffix: '/Quarter',
    billingNote: 'Billed every 3 months',
    badgeText: 'Save 7.5%',
  }));

  const annualPlans = plans
    .filter((p) => p.billing_cycle === 'annual')
    .map((p) => {
      const normalizedName = normalizePlanName(p.name);
      const matchingMonthly = monthlyLookup.get(normalizedName);
      const price = Number(p.price) || 0;
      const discPrice = p.disc_price ? Number(p.disc_price) : 0;
      const originalPrice = discPrice > 0 ? price + discPrice : null;
      let badgeText = null;
      if (matchingMonthly && matchingMonthly.price > 0) {
        const discount = ((matchingMonthly.price * 12 - price) / (matchingMonthly.price * 12)) * 100;
        if (discount > 0) badgeText = `Save ${discount.toFixed(1)}%`;
      }
      // API returns annual plan price as the TOTAL yearly amount
      const originalAnnual = matchingMonthly ? parseFloat((matchingMonthly.price * 12).toFixed(2)) : null;
      return {
        // Always use `${normalizedName}-annual` so getBaseId() can strip it reliably
        id: `${normalizedName}-annual`,
        dbId: p.id,
        name: p.name,
        displayName: p.name,
        price,                          // yearly total from API
        originalPrice: originalAnnual,  // full 12-month undiscounted amount
        billingSuffix: '/Year',
        billingNote: 'Billed once per year',
        features: p.services?.length ? p.services : matchingMonthly?.features || [],
        checkmarkColor: '#0E7490',
        badgeText: badgeText || 'Save 17.5%',
        popular: /crm|professional/i.test(p.name),
      };
    });

  // If API doesn't return annual plans, compute them from monthly × 12 with discount
  const finalAnnualPlans = annualPlans.length > 0
    ? annualPlans
    : monthlyPlans.map((p) => ({
        ...p,
        id: `${p.id}-annual`,
        price: parseFloat((p.price * 12 * ANNUAL_DISCOUNT).toFixed(2)),
        originalPrice: parseFloat((p.price * 12).toFixed(2)),
        billingSuffix: '/Year',
        billingNote: 'Billed once per year',
        badgeText: 'Save 17.5%',
      }));

  return { monthly: monthlyPlans, quarterly: quarterlyPlans, annual: finalAnnualPlans };
};

const BILLING_CYCLES = [
  { id: 'monthly',   label: 'Monthly',   savingsBadge: null },
  { id: 'quarterly', label: 'Quarterly', savingsBadge: 'Save 7.5%' },
  { id: 'annual',    label: 'Annually',  savingsBadge: 'Save 17.5%' },
];

// Fallback plans — updated to reflect new pricing from customer brief
const FALLBACK_BASE = [
  {
    id: 'weather-app',
    dbId: 1,
    name: 'Weather App',
    monthlyPrice: 165,
    features: [
      'Real-time hail & storm alerts',
      'NOAA-integrated weather data',
      'Roof monitoring & homeowner notifications',
      'Storm history lookup by address',
    ],
    popular: false,
    checkmarkColor: '#0E7490',
  },
  {
    id: 'crm',
    dbId: 2,
    name: 'CRM',
    monthlyPrice: 200,
    features: [
      'Full CRM & lead management',
      'Weather mapping & storm tracking',
      'Canvassing tools for neighborhoods',
      'Proposal & documentation storage',
      'AI Field Agents (Linda, Ava, Stan, Sonny)',
      'White-label branding for your company',
    ],
    popular: true,
    checkmarkColor: '#0E7490',
  },
  {
    id: 'founders-plan',
    dbId: 3,
    name: "Founder's Plan",
    monthlyPrice: 200,
    features: [
      'Includes Weather App + CRM together',
      'Supplement Requests',
      'Canvassing tools',
      'Harbor Shield 360',
      'AI Field Agents included',
      'Best value for complete teams',
    ],
    popular: false,
    checkmarkColor: '#0E7490',
  },
];

const QUARTERLY_DISCOUNT  = 0.925;  // 7.5% off
const ANNUAL_DISCOUNT     = 0.825;  // 17.5% off

// ─────────────────────────────────────────────────────────────────────────────
// QUARTERLY PRICING — OPTION A (backend config required)
//
// There are no quarterly plan records in the database. The frontend passes
// the MONTHLY plan_id plus billing_cycle:"quarterly" so the backend can
// look up the correct pre-configured Stripe quarterly Price ID.
//
// Backend Laravel config required (config/stripe.php):
//
//   'quarterly_prices' => [
//       2 => 'price_XXXX',   // Weather App  — $208.13/quarter ($75 × 3 × 0.925)
//       3 => 'price_XXXX',   // CRM          — $277.50/quarter ($100 × 3 × 0.925)
//       8 => 'price_XXXX',   // Founder's Plan — $249.75/quarter ($90 × 3 × 0.925)
//   ],
//
// Rachel quarterly add-on (config/stripe.php):
//   'rachel_quarterly_price' => 'price_XXXX',  // $138.75/quarter ($50 × 3 × 0.925)
//
// In the checkout controller:
//   if ($request->billing_cycle === 'quarterly') {
//       $stripePriceId = config("stripe.quarterly_prices.{$request->plan_id}");
//   } else {
//       $plan = Plan::find($request->plan_id);
//       $stripePriceId = $plan->stripe_price_id;
//   }
// ─────────────────────────────────────────────────────────────────────────────

// Strip billing-cycle suffix so selection persists across toggle changes
const getBaseId = (id = '') => id.replace(/-(quarterly|annual)$/, '');

const Pricing = () => {
  const [billingCycle, setBillingCycle]           = useState('monthly');
  const [selectedPlanId, setSelectedPlanId]       = useState('crm');
  const [withReceptionist, setWithReceptionist]   = useState(false);
  const [remotePlans, setRemotePlans]             = useState(null);
  const [isLoading, setIsLoading]                 = useState(false);
  const [fetchError, setFetchError]               = useState(null);
  const [checkoutError, setCheckoutError]         = useState(null);
  const [isModalOpen, setIsModalOpen]             = useState(false);
  const [modalPlan, setModalPlan]                 = useState(null);
  const [isTalkModalOpen, setIsTalkModalOpen]     = useState(false);
  const [isFreeTrialModalOpen, setIsFreeTrialModalOpen] = useState(false);

  const modalPlanId = useMemo(() => {
    if (!modalPlan?.dbId) return null;
    const parsed = typeof modalPlan.dbId === 'number' ? modalPlan.dbId : parseInt(modalPlan.dbId, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }, [modalPlan]);

  // Fetch live pricing from API
  useEffect(() => {
    let isMounted = true;
    const fetchPricing = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(`${API_ENDPOINT}/all`, {
          method: 'GET',
          mode: 'cors',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          credentials: 'omit',
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        const payload = await response.json();
        const plans = payload.data?.plans || payload.plans || payload.data || [];
        if (!Array.isArray(plans) || plans.length === 0) throw new Error('No pricing plans available');
        if (isMounted) setRemotePlans(normalizePlans(plans));
      } catch (error) {
        if (isMounted) setFetchError(error.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchPricing();
    return () => { isMounted = false; };
  }, []);

  // Build fallback plan sets for all 3 billing cycles
  const fallbackPlans = useMemo(() => ({
    monthly: FALLBACK_BASE.map((p) => ({
      ...p,
      price: p.monthlyPrice,
      originalPrice: null,
      billingSuffix: '/Month',
      billingNote: null,
      badgeText: null,
    })),
    quarterly: FALLBACK_BASE.map((p) => ({
      ...p,
      id: `${p.id}-quarterly`,
      price: parseFloat((p.monthlyPrice * 3 * QUARTERLY_DISCOUNT).toFixed(2)),
      originalPrice: parseFloat((p.monthlyPrice * 3).toFixed(2)),
      billingSuffix: '/Quarter',
      billingNote: 'Billed every 3 months',
      badgeText: 'Save 7.5%',
    })),
    annual: FALLBACK_BASE.map((p) => ({
      ...p,
      id: `${p.id}-annual`,
      price: parseFloat((p.monthlyPrice * 12 * ANNUAL_DISCOUNT).toFixed(2)),
      originalPrice: parseFloat((p.monthlyPrice * 12).toFixed(2)),
      billingSuffix: '/Year',
      billingNote: 'Billed once per year',
      badgeText: 'Save 17.5%',
    })),
  }), []);

  // Active plans: prefer live API data, fall back to static
  const activePlans = useMemo(() => {
    const src = remotePlans || fallbackPlans;
    return src[billingCycle] || src.monthly || [];
  }, [remotePlans, fallbackPlans, billingCycle]);

  // Only reset selection when the plan list itself changes (e.g. API load),
  // NOT when billing cycle changes — matching by base id keeps the user's choice.
  useEffect(() => {
    if (activePlans.length && !activePlans.some((p) => getBaseId(p.id) === selectedPlanId)) {
      const popular = activePlans.find((p) => p.popular);
      setSelectedPlanId(popular ? getBaseId(popular.id) : getBaseId(activePlans[0].id));
    }
  }, [activePlans, selectedPlanId]);

  // Find the active plan whose base id matches the stored selection
  const selectedPlan = activePlans.find((p) => getBaseId(p.id) === selectedPlanId) || activePlans[0];

  // Rachel price = period total (matches the same billing period as plan cards)
  const rachelBasePrice = 50;
  const rachelPrice = useMemo(() => {
    if (billingCycle === 'quarterly') return parseFloat((rachelBasePrice * 3 * QUARTERLY_DISCOUNT).toFixed(2));
    if (billingCycle === 'annual')    return parseFloat((rachelBasePrice * 12 * ANNUAL_DISCOUNT).toFixed(2));
    return rachelBasePrice;
  }, [billingCycle]);

  const rachelOriginalPrice = useMemo(() => {
    if (billingCycle === 'quarterly') return rachelBasePrice * 3;
    if (billingCycle === 'annual')    return rachelBasePrice * 12;
    return null;
  }, [billingCycle]);

  // Labels for the current billing period
  const cycleBilledLabel = billingCycle === 'quarterly' ? 'per quarter' : billingCycle === 'annual' ? 'per year' : 'per month';
  const cycleSuffix      = billingCycle === 'quarterly' ? '/Quarter'    : billingCycle === 'annual' ? '/Year'     : '/Month';

  // Total = plan period price + Rachel period price (both are already period totals)
  const billingTotal = selectedPlan
    ? parseFloat((selectedPlan.price + (withReceptionist ? rachelPrice : 0)).toFixed(2))
    : 0;

  const handleGetStarted = (plan) => {
    if (!plan?.dbId) {
      setCheckoutError('Plan data not ready yet. Please refresh and try again.');
      return;
    }
    setCheckoutError(null);
    setModalPlan(plan);
    setIsModalOpen(true);
  };

  const openTalkModal    = () => setIsTalkModalOpen(true);
  const closeTalkModal   = () => setIsTalkModalOpen(false);
  const openFreeTrialModal  = () => setIsFreeTrialModalOpen(true);
  const closeFreeTrialModal = () => setIsFreeTrialModalOpen(false);

  return (
    <section id="pricing" className="pricing-section pb-16 bg-white">
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[#042D43] text-[42px] font-bold">
            Built for Roofing Companies, Trusted by Contractors
          </h2>
          <h3 className="mb-8 text-[#A83119] text-[36px] font-bold">
            Simple, Affordable Pricing
          </h3>
          {isLoading && <p className="text-sm text-slate-500">Loading live pricing…</p>}
          {!isLoading && fetchError && (
            <p className="text-sm text-[#A83119]">Showing fallback pricing (live data unavailable).</p>
          )}
          {checkoutError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{checkoutError}</p>
            </div>
          )}
        </div>

        {/* ── Billing Cycle Toggle ── */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 rounded-full border border-[rgba(168,49,25,0.2)] bg-white shadow-[0_8px_20px_rgba(168,49,25,0.08)]">
            {BILLING_CYCLES.map((cycle) => (
              <button
                key={cycle.id}
                onClick={() => setBillingCycle(cycle.id)}
                className={`relative px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  billingCycle === cycle.id
                    ? 'bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white shadow-[0_4px_15px_rgba(168,49,25,0.3)]'
                    : 'text-[#A83119] hover:text-[#D1452A]'
                }`}
              >
                {cycle.label}
                {cycle.savingsBadge && billingCycle !== cycle.id && (
                  <span className="absolute -top-3 -right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap">
                    {cycle.savingsBadge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── 3 Plan Cards ── */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {activePlans.map((plan, index) => {
            const isSelected = selectedPlanId === getBaseId(plan.id);
            return (
              <div
                key={plan.id || index}
                className={`relative flex flex-col items-center text-center bg-white rounded-[28px] shadow-[0_20px_60px_rgba(4,45,67,0.08)] p-8 w-full max-w-[360px] border-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#A83119] scale-105 shadow-[0_24px_70px_rgba(168,49,25,0.15)]'
                    : 'border-transparent hover:border-[rgba(168,49,25,0.3)]'
                }`}
                onClick={() => setSelectedPlanId(getBaseId(plan.id))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPlanId(getBaseId(plan.id));
                  }
                }}
              >
                {/* Most Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#A83119] text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_8px_20px_rgba(168,49,25,0.3)]">
                    Most Popular
                  </div>
                )}

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#A83119] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}

                {/* Plan title */}
                <h3 className={`mb-4 text-[#042D43] text-[28px] font-bold ${plan.popular ? 'mt-6' : 'mt-0'}`}>
                  {plan.displayName || plan.name}
                </h3>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-start justify-center gap-0.5">
                    {plan.originalPrice && (
                      <div className="text-gray-400 text-[20px] font-bold leading-none line-through mr-1 mt-2">
                        ${plan.originalPrice.toFixed(2)}
                      </div>
                    )}
                    <span className="text-[#A83119] text-xl font-bold mt-2">$</span>
                    <span className="text-[#A83119] text-[42px] font-bold leading-none">
                      {Number.isInteger(plan.price) ? plan.price : plan.price.toFixed(2)}
                    </span>
                    <span className="text-[#0F172A] text-base font-semibold mt-4">
                      {plan.billingSuffix}
                    </span>
                  </div>
                  {plan.billingNote && (
                    <p className="text-xs text-[#4C6371] mt-1 mb-0">{plan.billingNote}</p>
                  )}
                  {plan.badgeText && (
                    <span className="inline-block mt-2 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-[0_5px_15px_rgba(16,185,129,0.4)]">
                      {plan.badgeText}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 my-6 list-none p-0 text-left w-full">
                  {(plan.features?.length ? plan.features : ['Contact us to learn more']).map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                        <path d="M20 6L9 17L4 12" stroke={plan.checkmarkColor || '#0E7490'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#0F172A] text-[14px] leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Select prompt — replaces individual Get Started buttons */}
                <div className={`mt-auto w-full py-3 rounded-full text-sm font-semibold text-center transition-all duration-300 border-2 ${
                  isSelected
                    ? 'bg-[#A83119] text-white border-[#A83119]'
                    : 'bg-transparent text-[#A83119] border-[rgba(168,49,25,0.3)]'
                }`}>
                  {isSelected ? '✓ Selected' : 'Select Plan'}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Rachel Add-On + Order Summary Row ── */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 mb-16">

          {/* Rachel toggle card */}
          <div
            className={`flex-1 rounded-[24px] p-7 border-2 cursor-pointer transition-all duration-300 ${
              withReceptionist
                ? 'border-[#042D43] shadow-[0_16px_50px_rgba(4,45,67,0.18)]'
                : 'border-[rgba(4,45,67,0.12)] shadow-[0_6px_24px_rgba(4,45,67,0.06)] hover:border-[rgba(4,45,67,0.25)]'
            }`}
            style={{
              background: withReceptionist
                ? 'linear-gradient(135deg, #042D43 0%, #064E6B 100%)'
                : '#fff',
            }}
            onClick={() => setWithReceptionist(!withReceptionist)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setWithReceptionist(!withReceptionist); }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                  withReceptionist ? 'bg-[rgba(255,255,255,0.1)]' : 'bg-[rgba(168,49,25,0.08)]'
                }`}>
                  📞
                </div>
                <div>
                  <div className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-1.5 ${
                    withReceptionist ? 'bg-[rgba(168,49,25,0.3)] text-[#F87171]' : 'bg-[rgba(168,49,25,0.1)] text-[#A83119]'
                  }`}>
                    Optional Add-On
                  </div>
                  <h3 className={`text-[20px] font-bold mb-0 mt-0 leading-tight ${withReceptionist ? 'text-white' : 'text-[#042D43]'}`}>
                    Rachel — AI Receptionist
                  </h3>
                  <p className={`text-xs font-semibold mb-0 ${withReceptionist ? 'text-[#94A3B8]' : 'text-[#A83119]'}`}>
                    Never miss a call again · Up to 1,000 calls/month
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <div
                className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 mt-1 ${
                  withReceptionist ? 'bg-[#A83119]' : 'bg-gray-200'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                  withReceptionist ? 'left-6' : 'left-0.5'
                }`} />
              </div>
            </div>

            <div className={`mt-5 flex flex-wrap gap-x-6 gap-y-2 ${withReceptionist ? 'text-[#CBD5E1]' : 'text-[#4C6371]'}`}>
              {['Answers customer calls', 'Schedules inspections', 'Captures leads automatically', 'Handles basic customer questions'].map((cap, i) => (
                <span key={i} className="flex items-center gap-1.5 text-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#A83119" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {cap}
                </span>
              ))}
            </div>

            <div className={`mt-5 pt-4 border-t flex items-center justify-between ${withReceptionist ? 'border-[rgba(255,255,255,0.1)]' : 'border-gray-100'}`}>
              <div>
                <span className={`text-sm ${withReceptionist ? 'text-[#94A3B8]' : 'text-[#4C6371]'}`}>Add to your plan</span>
                {billingCycle !== 'monthly' && (
                  <p className={`text-[11px] mt-0.5 mb-0 ${withReceptionist ? 'text-[#94A3B8]' : 'text-[#4C6371]'}`}>
                    {billingCycle === 'quarterly' ? 'Billed quarterly · Save 7.5%' : 'Billed annually · Save 17.5%'}
                  </p>
                )}
              </div>
              <div className="text-right">
                {billingCycle !== 'monthly' && rachelOriginalPrice && (
                  <span className={`text-sm line-through mr-1 ${withReceptionist ? 'text-[#94A3B8]' : 'text-gray-400'}`}>
                    ${rachelOriginalPrice}
                  </span>
                )}
                <span className={`text-[22px] font-bold ${withReceptionist ? 'text-white' : 'text-[#042D43]'}`}>
                  +${rachelPrice.toFixed(2)}
                </span>
                <span className={`text-sm font-semibold ${withReceptionist ? 'text-[#94A3B8]' : 'text-[#4C6371]'}`}>
                  {cycleSuffix}
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div
            className="flex-shrink-0 w-full lg:w-[280px] rounded-[24px] p-7 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(135deg, #042D43 0%, #073F5C 100%)',
              boxShadow: '0 16px 50px rgba(4,45,67,0.2)',
            }}
          >
            <div>
              <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-widest mb-5 mt-0">
                Your Selection
              </p>

              {selectedPlan && (
                <div className="mb-4">
                  {/* Plan line */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#CBD5E1] text-sm">{selectedPlan.displayName || selectedPlan.name}</span>
                    <span className="text-white text-sm font-semibold">
                      ${selectedPlan.price.toFixed(2)}{cycleSuffix}
                    </span>
                  </div>

                  {/* Billing period */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#CBD5E1] text-sm">Billing Period</span>
                    <span className="text-white text-sm font-semibold capitalize">{billingCycle}</span>
                  </div>

                  {/* Rachel add-on line */}
                  {withReceptionist && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#CBD5E1] text-sm">Rachel Add-On</span>
                      <span className="text-white text-sm font-semibold">
                        +${rachelPrice.toFixed(2)}{cycleSuffix}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="h-px bg-[rgba(255,255,255,0.1)] mb-4" />

              <div className="flex items-end justify-between mb-5">
                <span className="text-[#94A3B8] text-sm font-bold uppercase tracking-wider">Total</span>
                <div className="text-right">
                  <div className="flex items-start gap-0.5 justify-end">
                    <span className="text-white text-base font-bold mt-1">$</span>
                    <span className="text-white text-[36px] font-bold leading-none">{billingTotal.toFixed(2)}</span>
                  </div>
                  <span className="text-[#94A3B8] text-xs">{cycleBilledLabel}</span>
                </div>
              </div>
            </div>

            <button
              className="w-full py-3.5 px-6 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 bg-[#A83119] text-white border-2 border-[#A83119] hover:bg-[#D1452A] hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(168,49,25,0.4)] disabled:opacity-60"
              onClick={() => selectedPlan && handleGetStarted(selectedPlan)}
              disabled={!selectedPlan?.dbId}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* ── Call-to-Action Buttons ── */}
        <div className="text-center mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openFreeTrialModal}
              className="bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white border-none py-4 px-9 rounded-xl text-base font-bold cursor-pointer shadow-[0_6px_20px_rgba(168,49,25,0.3)] tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(168,49,25,0.4)]"
            >
              Start Free Trial
            </button>
            <span className="text-[#A83119] text-lg font-bold">OR</span>
            <button
              className="bg-transparent text-[#A83119] border-[3px] border-[#A83119] py-4 px-9 rounded-xl text-base font-bold cursor-pointer shadow-[0_4px_15px_rgba(168,49,25,0.1)] tracking-wider transition-all duration-300 hover:bg-[#A83119] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(168,49,25,0.3)]"
              onClick={openTalkModal}
            >
              Talk To Sales
            </button>
          </div>
        </div>
      </div>

      <EmailModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setModalPlan(null); }}
        planId={modalPlanId}
        planName={modalPlan?.displayName || modalPlan?.name}
        billingCycle={billingCycle}
        billingTotal={billingTotal}
        withReceptionist={withReceptionist}
        rachelAmount={withReceptionist ? rachelPrice : 0}
        planAmount={selectedPlan ? selectedPlan.price : 0}
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

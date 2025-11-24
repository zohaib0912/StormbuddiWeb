import React from 'react';

const steps = [
  {
    title: 'Identify storm-impacted neighborhoods',
    description: 'Use real-time storm and map intelligence to instantly see which areas need attention so your teams focus on the right blocks.'
  },
  {
    title: 'Canvass & capture leads',
    description: 'Track doors knocked, conversations, and leads in the CRM so every touchpoint stays organized and actionable.'
  },
  {
    title: 'Send proposals & get e-signatures',
    description: 'Generate professional proposals branded for your company and collect signatures digitally without leaving the platform.'
  },
  {
    title: 'Order materials & manage crews',
    description: 'Order directly through SRS, assign crews, and monitor progress across every job from one command center.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gradient-to-b from-white via-slate-50 to-white pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">How Storm Buddi Works</h2>
          <p className="mt-4 text-lg text-slate-600">
            A proven four-step workflow built specifically for roofing contractors responding to storm events.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-[#A9321A]/30"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#FDF4F2] to-transparent pointer-events-none" />
              <div className="relative flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A9321A] to-[#C4452A] text-white text-2xl font-semibold shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              </div>
              <p className="relative text-base text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


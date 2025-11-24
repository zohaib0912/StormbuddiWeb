import React from 'react';

const bullets = [
  'All-in-one roofing CRM',
  'No more juggling multiple tools',
  'Storm data, leads, jobs, and materials in one place',
  'Built for roofing contractors and SRS partners'
];

const BuiltForRoofersStrip = () => {
  return (
    <section className="py-10 bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/70">Built for roofers</p>
            <h3 className="mt-3 text-2xl md:text-3xl font-semibold">Purpose-built for the crews who live on roofs.</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 w-full md:w-auto">
            {bullets.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm md:text-base"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#A9321A] to-[#C4452A] text-white text-sm font-semibold aspect-square">
                  ✓
                </span>
                <span className="text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForRoofersStrip;


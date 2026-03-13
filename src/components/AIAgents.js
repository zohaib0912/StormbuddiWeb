import React, { useState } from 'react';

const agents = [
  {
    id: 'linda',
    name: 'Linda',
    role: 'Legal & Policy Assistant',
    tagline: 'Your insurance expert in your pocket',
    emoji: '⚖️',
    image: '/images/agents/linda.png',
    color: '#0E7490',
    bgLight: 'rgba(14,116,144,0.07)',
    borderColor: 'rgba(14,116,144,0.25)',
    capabilities: [
      'Breaks down insurance policies for homeowners',
      'Explains what the policy covers',
      'Generates contingency agreements',
      'Sends agreements for e-signature',
      'Creates invoices',
      'Answers technical insurance questions',
    ],
    example: '"Linda, what storm hit this address?" — Linda instantly pulls the storm data.',
  },
  {
    id: 'ava',
    name: 'Ava',
    role: 'Executive Assistant',
    tagline: 'Keeps your roofing business organized',
    emoji: '📋',
    image: '/images/agents/ava.png',
    color: '#7C3AED',
    bgLight: 'rgba(124,58,237,0.07)',
    borderColor: 'rgba(124,58,237,0.25)',
    capabilities: [
      'Follow-up reminders',
      'Task coordination',
      'Email drafting',
      'Customer communication',
      'Scheduling help',
      'Pipeline reminders',
    ],
    example: '"Ava, remind me to follow up with the Johnson claim tomorrow."',
  },
  {
    id: 'stan',
    name: 'Stan',
    role: 'Sales Associate',
    tagline: 'Helps close more roofing jobs',
    emoji: '💼',
    image: '/images/agents/stan.png',
    color: '#A83119',
    bgLight: 'rgba(168,49,25,0.07)',
    borderColor: 'rgba(168,49,25,0.25)',
    capabilities: [
      'Lead follow-ups',
      'Customer messaging',
      'Appointment scheduling',
      'Proposal reminders',
      'Sales pipeline updates',
    ],
    example: '"Stan, send a follow-up message to everyone I met today."',
  },
  {
    id: 'sonny',
    name: 'Sonny',
    role: 'Social Media Manager',
    tagline: 'Promotes your roofing company automatically',
    emoji: '📱',
    image: '/images/agents/sonny.png',
    color: '#0F766E',
    bgLight: 'rgba(15,118,110,0.07)',
    borderColor: 'rgba(15,118,110,0.25)',
    capabilities: [
      'Posts to Facebook',
      'Generates marketing posts',
      'Promotes completed jobs',
      'Creates storm-related content',
      'Keeps your business active online',
    ],
    example: '"Sonny, post about the job we completed on Oak Street today."',
  },
];

const AgentCard = ({ agent, isActive, onClick }) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    className="relative flex flex-col rounded-[22px] p-6 cursor-pointer transition-all duration-300 border-2"
    style={{
      background: isActive ? agent.bgLight : '#fff',
      borderColor: isActive ? agent.color : 'rgba(226,232,240,0.8)',
      boxShadow: isActive
        ? `0 12px 40px ${agent.bgLight}`
        : '0 4px 20px rgba(4,45,67,0.05)',
      transform: isActive ? 'translateY(-4px)' : 'none',
    }}
  >
    {/* Agent photo */}
    <div className="relative w-full mb-4 rounded-xl overflow-hidden flex-shrink-0" style={{ height: '200px' }}>
      <img
        src={agent.image}
        alt={agent.name}
        className="w-full h-full object-cover object-top"
        style={{ display: 'block' }}
      />
      {/* Colour tint bar at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: agent.color }}
      />
    </div>

    <h3 className="text-[22px] font-bold mb-0.5" style={{ color: '#042D43' }}>
      {agent.name}
    </h3>
    <p className="text-sm font-semibold mb-2" style={{ color: agent.color }}>
      {agent.role}
    </p>
    <p className="text-sm text-[#4C6371] mb-4 leading-relaxed">{agent.tagline}</p>

    <ul className="space-y-2 mb-5 list-none p-0 m-0">
      {agent.capabilities.map((cap, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-[#4C6371]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="flex-shrink-0 mt-0.5"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke={agent.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{cap}</span>
        </li>
      ))}
    </ul>

    {/* Example bubble */}
    <div
      className="mt-auto rounded-xl px-4 py-3 text-xs leading-relaxed italic"
      style={{ background: agent.bgLight, color: '#4C6371', borderLeft: `3px solid ${agent.color}` }}
    >
      {agent.example}
    </div>

    {/* Active indicator dot */}
    {isActive && (
      <span
        className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full"
        style={{ background: agent.color }}
      />
    )}
  </div>
);

const advantageItems = [
  { label: 'CRM Software', icon: '🗂️' },
  { label: 'Weather Tracking Tools', icon: '🌩️' },
  { label: 'Canvassing Systems', icon: '🗺️' },
  { label: 'Call Answering Services', icon: '📞' },
  { label: 'Marketing Tools', icon: '📣' },
];

const AIAgents = () => {
  const [activeAgent, setActiveAgent] = useState('linda');

  return (
    <section id="ai-agents" className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(168,49,25,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(14,116,144,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 rotate-[-90deg]">
              <path d="M6 0L12 12H0L6 0Z" fill="#A83119" />
            </svg>
            <span className="text-sm font-bold text-[#A83119] uppercase tracking-wider font-['DM_Sans',sans-serif]">
              AI Field Agents
            </span>
          </div>
          <h2
            className="text-[42px] md:text-[52px] font-bold leading-tight mb-5 mt-0"
            style={{ color: '#042D43', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Meet Your AI Field Agents
          </h2>
          <p
            className="text-lg md:text-xl text-[#4C6371] max-w-2xl mx-auto leading-relaxed mb-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Every Storm Buddi account comes with a team of AI-powered agents working beside you in the field — so you can close more jobs, stay organized, and never miss a lead.
          </p>
        </div>

        {/* ── Agent cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isActive={activeAgent === agent.id}
              onClick={() => setActiveAgent(agent.id)}
            />
          ))}
        </div>

        {/* ── Rachel — AI Receptionist Add-On ── */}
        <div
          className="rounded-[28px] p-8 md:p-12 mb-20 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #042D43 0%, #064E6B 100%)',
            boxShadow: '0 20px 60px rgba(4,45,67,0.2)',
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(168,49,25,0.2) 0%, transparent 70%)',
              transform: 'translate(30%, -30%)',
            }}
          />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
            {/* Left */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[rgba(168,49,25,0.25)] text-[#F87171] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                Optional Add-On
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  📞
                </div>
                <div>
                  <h3 className="text-white text-[28px] font-bold mb-0 mt-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Rachel</h3>
                  <p className="text-[#94A3B8] text-sm font-semibold mb-0">AI Receptionist</p>
                </div>
              </div>
              <p className="text-[#CBD5E1] text-base leading-relaxed mb-6 mt-0">
                Never miss a call again. Rachel answers inbound calls for your roofing company, schedules inspections, captures leads, and handles basic customer questions — 24/7.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
                {[
                  'Answers customer calls',
                  'Schedules inspections',
                  'Captures leads',
                  'Handles basic customer questions',
                  'Up to 1,000 calls per month',
                ].map((cap, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#CBD5E1]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                      <path d="M20 6L9 17L4 12" stroke="#A83119" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — pricing callout */}
            <div
              className="flex-shrink-0 rounded-2xl p-8 text-center min-w-[220px]"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <p className="text-[#94A3B8] text-sm font-semibold uppercase tracking-wider mb-2 mt-0">Add-On Price</p>
              <div className="flex items-start justify-center gap-0.5 mb-1">
                <span className="text-white text-lg font-bold mt-2">+$</span>
                <span className="text-white text-[52px] font-bold leading-none">50</span>
              </div>
              <p className="text-[#94A3B8] text-sm mb-4 mt-0">/month</p>
              <div className="h-px bg-[rgba(255,255,255,0.1)] mb-4" />
              <p className="text-[#CBD5E1] text-xs leading-relaxed mb-0">
                Perfect for roofing companies that want every call answered professionally.
              </p>
            </div>
          </div>
        </div>

        {/* ── Storm Buddi Advantage ── */}
        <div className="text-center mb-12">
          <h2
            className="text-[36px] md:text-[42px] font-bold mb-4 mt-0"
            style={{ color: '#042D43', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            The Storm Buddi Advantage
          </h2>
          <p className="text-[#4C6371] text-lg max-w-xl mx-auto mb-10 mt-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Most roofing companies pay separately for these tools. Storm Buddi combines everything into one platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {advantageItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-[#042D43]"
                style={{
                  background: '#fff',
                  border: '1.5px solid rgba(168,49,25,0.18)',
                  boxShadow: '0 4px 16px rgba(4,45,67,0.06)',
                }}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="#A83119" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>

          {/* Arrow pointing down to unified platform */}
          <div className="flex flex-col items-center gap-1 mb-8">
            <div className="w-px h-10 bg-gradient-to-b from-[#A83119] to-transparent" />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v14M4 11l6 6 6-6" stroke="#A83119" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Unified platform badge */}
          <div
            className="inline-flex items-center gap-3 rounded-2xl px-8 py-5 mb-4"
            style={{
              background: 'linear-gradient(135deg, #A83119 0%, #D1452A 100%)',
              boxShadow: '0 12px 40px rgba(168,49,25,0.3)',
            }}
          >
            <span className="text-2xl">⚡</span>
            <span className="text-white text-lg font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Storm Buddi — One Platform. Everything Included.
            </span>
          </div>
        </div>

        {/* ── Killer closing line ── */}
        <div
          className="rounded-[28px] px-8 py-14 text-center"
          style={{
            background: 'linear-gradient(135deg, #042D43 0%, #073F5C 100%)',
            boxShadow: '0 20px 60px rgba(4,45,67,0.15)',
          }}
        >
          <p className="text-[#94A3B8] text-sm font-bold uppercase tracking-widest mb-4 mt-0">
            The Big Picture
          </p>
          <h2
            className="text-white text-[32px] md:text-[42px] font-bold leading-tight mb-4 mt-0"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Storm Buddi isn't just software.
          </h2>
          <h2
            className="text-[28px] md:text-[38px] font-bold leading-tight mb-6 mt-0"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: 'linear-gradient(90deg, #A83119, #F87171)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            It's an entire AI-powered roofing team.
          </h2>
          <p className="text-[#94A3B8] text-lg mb-8 mt-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            CRM + Weather Intelligence + AI Field Agents
          </p>
          <p className="text-[#CBD5E1] text-base max-w-lg mx-auto leading-relaxed mb-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Every roofer on your team now has AI working beside them.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AIAgents;

import React, { useEffect, useMemo, useRef, useState } from 'react';

const botGreetings = [
  "Thanks for your message! Our team will get back to you within 24 hours.",
  "That's a great question! Let me connect you with one of our storm damage experts.",
  'I understand your concern. Our professionals are here to help you with storm damage assessment.',
  "Thank you for reaching out! We'll provide you with detailed information about our services."
];

const quickReplyDictionary = {
  'How do I assess storm damage?':
    'Our platform provides automated damage assessment tools with AI-powered analysis. You can upload photos and get instant reports.',
  'Tell me about pricing':
    'We offer flexible pricing plans starting at $99/month. Contact our sales team for a custom quote based on your needs.',
  'How to get started?':
    'Getting started is easy! Sign up for an account, complete your profile, and start using our storm damage assessment tools immediately.'
};

const ChatWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 'intro-message',
      sender: 'bot',
      text: "👋 Hi! I'm your Storm Buddi assistant. How can I help you today?",
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const containerClasses = useMemo(
    () =>
      [
        'fixed bottom-5 right-5',
        'w-[calc(100vw-40px)] max-w-[360px] h-[65vh]',
        'md:w-[350px] md:h-[500px]',
        'bg-white/95 backdrop-blur-lg border border-white/60',
        'rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)]',
        'flex flex-col z-[10000] transition-all duration-300',
        'overflow-hidden'
      ].join(' '),
    []
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const addMessage = (text, sender) => {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { id: `${sender}-${now.getTime()}`, sender, text, time: timeLabel }
    ]);
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    addMessage(trimmed, 'user');
    setInputValue('');

    setTimeout(() => {
      const response = botGreetings[Math.floor(Math.random() * botGreetings.length)];
      addMessage(response, 'bot');
    }, 900);
  };

  const handleQuickReply = (text) => {
    addMessage(text, 'user');
    const reply = quickReplyDictionary[text] ?? quickReplyDictionary['How to get started?'];
    setTimeout(() => addMessage(reply, 'bot'), 600);
  };

  const handleScrollToPricing = () => {
    onClose?.();
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`${containerClasses} ${
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Storm Buddi Support Chat"
    >
      <div className="bg-gradient-to-r from-[#A9321A] to-[#C4452A] text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">💬</span>
          <div className="flex flex-col">
            <span className="text-sm uppercase tracking-wide text-white/80">Support</span>
            <span className="text-base font-semibold">Storm Buddi</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-8 w-8 rounded-full text-xl leading-none transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      <div className="flex-1 bg-slate-50/80 px-5 py-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col text-sm ${
              message.sender === 'bot' ? 'items-start' : 'items-end'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                message.sender === 'bot'
                  ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                  : 'bg-gradient-to-r from-[#A9321A] to-[#C4452A] text-white rounded-tr-sm'
              }`}
            >
              <p className="m-0">{message.text}</p>
            </div>
            <span
              className={`mt-1 text-[11px] tracking-wide ${
                message.sender === 'bot' ? 'text-slate-500 pl-2' : 'text-white/80 pr-2'
              }`}
            >
              {message.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white/90 px-4 py-3 border-t border-slate-100 flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
          maxLength={200}
          className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-[#A9321A] focus:ring-1 focus:ring-[#A9321A]"
        />
        <button
          type="button"
          onClick={handleSend}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#A9321A] to-[#C4452A] text-white transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4452A]/60"
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-5 w-5"
          >
            <path d="M5 12l14-8-4 8 4 8-14-8z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="bg-slate-50/80 px-4 py-4 border-t border-slate-100 space-y-3">
        <button
          type="button"
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#A9321A] hover:text-[#A9321A]"
          onClick={() => handleQuickReply('How do I assess storm damage?')}
        >
          Storm Damage Assessment
        </button>
        <button
          type="button"
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#A9321A] hover:text-[#A9321A]"
          onClick={() => handleQuickReply('Tell me about pricing')}
        >
          Pricing Information
        </button>
        <button
          type="button"
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#A9321A] hover:text-[#A9321A]"
          onClick={handleScrollToPricing}
        >
          Getting Started
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;


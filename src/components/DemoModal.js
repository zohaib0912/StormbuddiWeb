import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const DemoModal = ({ isOpen, onClose, heading = 'Book a demo' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    source: '',
    description: '',
    email: '',
  });

  // Lower header z-index when demo modal is open so it appears behind the overlay
  // Also lock body scroll on mobile
  useEffect(() => {
    const header = document.getElementById('site-header');
    const isMobile = window.innerWidth <= 768;
    
    if (header) {
      if (isOpen) {
        header.style.zIndex = '100';
        header.style.pointerEvents = 'none';
      } else {
        header.style.zIndex = '';
        header.style.pointerEvents = '';
      }
    }

    // Lock body scroll when modal is open (especially important on mobile)
    if (isOpen) {
      if (isMobile) {
        // On mobile, just prevent body scroll
        document.body.style.overflow = 'hidden';
      } else {
        // On desktop, use full scroll lock
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
      }
    } else {
      // Restore body scroll when modal closes
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      if (header) {
        header.style.zIndex = '';
        header.style.pointerEvents = '';
      }
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const closeModal = () => {
    if (isSubmitting) return;
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError || submitSuccess) {
      setSubmitError('');
      setSubmitSuccess('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.source.trim() || !formData.description.trim() || !formData.email.trim()) {
      setSubmitError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Email validation (required)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://app.stormbuddi.com/api/stormbuddi-website/demo/submit', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit demo request.');
      }

      setSubmitSuccess('Thank you! We received your demo request and will contact you within 24 hours.');
      setFormData({
        name: '',
        phone: '',
        address: '',
        source: '',
        description: '',
        email: '',
      });
      setTimeout(() => {
        setSubmitSuccess('');
        onClose();
      }, 1200);
    } catch (err) {
      console.error('Demo request error:', err);
      setSubmitError(err.message || 'Failed to submit demo request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="demo-modal-overlay fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 px-4 overflow-y-auto">
      <div className="demo-modal-content relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl my-auto">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
          aria-label="Close demo form"
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

        <div className="mb-6 pr-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#A83119]">{heading}</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">Tell us about your roofing team</h3>
          <p className="mt-1 text-sm text-slate-500">We'll connect you with an advisor to tailor Storm Buddi to your workflows.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
              Full Name
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
                placeholder="Sarah Roofing"
              />
            </label>
            <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
              Phone
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
                placeholder="(555) 123-4567"
              />
            </label>
          </div>

          <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
            Address
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
              placeholder="123 Main St, Dallas TX"
            />
          </label>

          <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
            Lead Source
            <select
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              required
              className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40 bg-white"
            >
              <option value="" disabled>
                Select source
              </option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="event">Tradeshow / Event</option>
              <option value="social">Social Media</option>
            </select>
          </label>

          <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
            Project Details
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
              placeholder="Tell us about your roofing projects, crews, or storms you're chasing."
            />
          </label>

          <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
            Email
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
              placeholder="you@example.com"
            />
            <span className="text-xs font-normal text-slate-500">We'll send a confirmation to this email.</span>
          </label>

          {submitSuccess && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {submitSuccess}
            </div>
          )}
          {submitError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-gradient-to-r from-[#A83119] to-[#C4452A] py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl disabled:opacity-70"
          >
            {isSubmitting ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </div>
      <style>{`
        /* Mobile-specific styles for DemoModal */
        @media (max-width: 768px) {
          .demo-modal-overlay {
            align-items: center !important;
            justify-content: center !important;
            padding: 20px !important;
            -webkit-overflow-scrolling: touch !important;
            overflow-y: auto !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            min-height: -webkit-fill-available !important;
            display: flex !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }

          .demo-modal-content {
            margin: auto !important;
            max-width: calc(100% - 40px) !important;
            padding: 24px !important;
            position: relative !important;
            flex-shrink: 0 !important;
            width: 100% !important;
            transform: none !important;
            align-self: center !important;
            min-height: auto !important;
          }

          /* Ensure overlay can scroll when content is taller than viewport */
          .demo-modal-overlay::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }

          /* Ensure close button stays visible and accessible */
          .demo-modal-content button[aria-label="Close demo form"] {
            position: absolute !important;
            top: 16px !important;
            right: 16px !important;
            z-index: 20 !important;
          }
        }

        /* Very small screens */
        @media (max-width: 480px) {
          .demo-modal-content {
            padding: 20px !important;
            max-width: calc(100% - 32px) !important;
          }

          .demo-modal-overlay {
            padding: 16px !important;
          }
        }

        /* Extra small screens */
        @media (max-width: 360px) {
          .demo-modal-content {
            padding: 16px !important;
            max-width: calc(100% - 24px) !important;
          }

          .demo-modal-overlay {
            padding: 12px !important;
          }
        }

        /* Handle landscape orientation on mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .demo-modal-overlay {
            align-items: flex-start !important;
            padding-top: 10px !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default DemoModal;


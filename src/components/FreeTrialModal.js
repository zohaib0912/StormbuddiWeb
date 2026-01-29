import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const FreeTrialModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  // Lower header z-index when modal is open so it appears behind the overlay
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
    // Reset password visibility when closing
    setShowPassword(false);
    setShowConfirmPassword(false);
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
    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password.trim() || !formData.confirm_password.trim()) {
      setSubmitError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setSubmitError('Password must be at least 6 characters long.');
      setIsSubmitting(false);
      return;
    }

    // Confirm password validation
    if (formData.password !== formData.confirm_password) {
      setSubmitError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for API (exclude confirm_password)
      const apiData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        plan_id: 1,
      };

      // Use the same endpoint pattern as Pricing component
      const apiEndpoint = process.env.REACT_APP_PRICING_API 
        ? `${process.env.REACT_APP_PRICING_API}/free-trial`
        : 'https://app.stormbuddi.com/api/pricing/free-trial';

      console.log('Sending payload:', apiData); // Debug: verify plan_id is included

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      // Try to parse JSON response, but handle cases where response might not be JSON
      let data = {};
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        // If JSON parsing fails, check status code
        if (response.status === 409) {
          throw new Error('Email already in use');
        }
        throw new Error('Failed to create free trial account. Please try again.');
      }

      if (!response.ok) {
        // Check for email already exists error (409 Conflict or specific error messages)
        const errorMessage = data.error || data.message || data.errors?.email?.[0] || '';
        const lowerErrorMessage = errorMessage.toLowerCase();
        
        const isEmailExists = 
          response.status === 409 || 
          (lowerErrorMessage.includes('email') && 
           (lowerErrorMessage.includes('already') || 
            lowerErrorMessage.includes('exists') ||
            lowerErrorMessage.includes('taken') ||
            lowerErrorMessage.includes('duplicate')));
        
        if (isEmailExists) {
          throw new Error('Email already in use');
        }
        
        throw new Error(errorMessage || 'Failed to create free trial account.');
      }

      setSubmitSuccess('Free trial account created successfully! Redirecting to login...');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
      });
      setShowPassword(false);
      setShowConfirmPassword(false);
      // Redirect to login page after successful signup
      setTimeout(() => {
        window.location.href = 'https://app.stormbuddi.com/login';
      }, 2000);
    } catch (err) {
      console.error('Free trial signup error:', err);
      
      // If error message is already user-friendly (like "Email already in use"), use it
      if (err.message === 'Email already in use') {
        setSubmitError(err.message);
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        // CORS or network error - provide helpful message
        setSubmitError('Email already exists. Please use a different email address.');
      } else {
        // Use the error message from the API or a generic fallback
        setSubmitError(err.message || 'Failed to create free trial account. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="freetrial-modal-overlay fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 px-4 overflow-y-auto">
      <div className="freetrial-modal-content relative w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl my-auto">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
          aria-label="Close free trial form"
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
          <p className="text-sm uppercase tracking-[0.3em] text-[#A83119]">Start Free Trial</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">Create Your Account</h3>
          <p className="mt-1 text-sm text-slate-500">Get started with StormBuddi today. No credit card required.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
              First Name
              <input
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
                placeholder="John"
              />
            </label>
            <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
              Last Name
              <input
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
                placeholder="Doe"
              />
            </label>
          </div>

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
          </label>

          <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
            Phone
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
              placeholder="(555) 123-4567"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
              Password
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="rounded-xl border border-slate-200 px-4 py-3 pr-12 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40 w-full"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
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
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
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
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <span className="text-xs font-normal text-slate-500">Minimum 8 characters</span>
            </label>
            <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
              Confirm Password
              <div className="relative">
                <input
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="rounded-xl border border-slate-200 px-4 py-3 pr-12 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40 w-full"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
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
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
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
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>
          </div>

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
            className="w-full rounded-2xl bg-gradient-to-r from-[#A83119] to-[#C4452A] py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Account...' : 'Start Free Trial'}
          </button>
        </form>
      </div>
      <style>{`
        /* Mobile-specific styles for FreeTrialModal */
        @media (max-width: 768px) {
          .freetrial-modal-overlay {
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

          .freetrial-modal-content {
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
          .freetrial-modal-overlay::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }

          /* Ensure close button stays visible and accessible */
          .freetrial-modal-content button[aria-label="Close free trial form"] {
            position: absolute !important;
            top: 16px !important;
            right: 16px !important;
            z-index: 20 !important;
          }
        }

        /* Very small screens */
        @media (max-width: 480px) {
          .freetrial-modal-content {
            padding: 20px !important;
            max-width: calc(100% - 32px) !important;
          }

          .freetrial-modal-overlay {
            padding: 16px !important;
          }
        }

        /* Extra small screens */
        @media (max-width: 360px) {
          .freetrial-modal-content {
            padding: 16px !important;
            max-width: calc(100% - 24px) !important;
          }

          .freetrial-modal-overlay {
            padding: 12px !important;
          }
        }

        /* Handle landscape orientation on mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .freetrial-modal-overlay {
            align-items: flex-start !important;
            padding-top: 10px !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default FreeTrialModal;


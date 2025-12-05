import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const FreeTrialModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  // Lower header z-index when modal is open so it appears behind the overlay
  useEffect(() => {
    const header = document.getElementById('site-header');
    if (header) {
      if (isOpen) {
        header.style.zIndex = '100';
        header.style.pointerEvents = 'none';
      } else {
        header.style.zIndex = '';
        header.style.pointerEvents = '';
      }
    }
    return () => {
      if (header) {
        header.style.zIndex = '';
        header.style.pointerEvents = '';
      }
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to create free trial account.');
      }

      setSubmitSuccess('Free trial account created successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
      });
      setTimeout(() => {
        setSubmitSuccess('');
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Free trial signup error:', err);
      setSubmitError(err.message || 'Failed to create free trial account. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
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

        <div className="mb-6">
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
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
                placeholder="••••••••"
              />
              <span className="text-xs font-normal text-slate-500">Minimum 6 characters</span>
            </label>
            <label className="flex flex-col text-sm font-semibold text-slate-700 gap-2">
              Confirm Password
              <input
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none focus:border-[#A83119] focus:ring-2 focus:ring-[#A83119]/40"
                placeholder="••••••••"
              />
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
    </div>,
    document.body
  );
};

export default FreeTrialModal;


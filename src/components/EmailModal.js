import React, { useState } from 'react';

const API_BASE = 'https://app.stormbuddi.com/api';
const CHECK_EMAIL_ENDPOINT = `${API_BASE}/pricing/check-email`;
const CHECKOUT_ENDPOINT = `${API_BASE}/client-pricing/checkout`;

export default function EmailModal({ isOpen, onClose, planId, planName }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!planId) {
      setError('Plan unavailable. Please refresh and try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const trimmedEmail = email.trim();

      const emailResponse = await fetch(CHECK_EMAIL_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (emailResponse.status === 409) {
        setError('Email already exists. Please enter another email.');
        setIsLoading(false);
        return;
      }

      let emailData = {};
      try {
        emailData = await emailResponse.json();
      } catch (_) {
        // ignore parse errors; we'll fall back to defaults
      }

      const emailTaken =
        emailData.exists === true ||
        emailData.available === false ||
        /already/i.test(emailData?.message || '');

      if (emailTaken) {
        setError('Email already exists. Please enter another email.');
        setIsLoading(false);
        return;
      }

      if (!emailResponse.ok) {
        throw new Error(emailData?.message || 'Unable to verify email. Please try again.');
      }

      const response = await fetch(CHECKOUT_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          email: trimmedEmail,
        }),
      });

      if (response.status === 409) {
        setError('Email already exists. Please enter another email.');
        setIsLoading(false);
        return;
      }

      let data = {};
      try {
        data = await response.json();
      } catch (_) {
        data = {};
      }

      if (data.success && data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to connect. Please try again.');
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        width: '100%',
        maxWidth: '420px',
        margin: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        position: 'relative',
      }}>
        <button
          onClick={onClose}
          disabled={isLoading}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          ×
        </button>

        <h2 style={{
          margin: '0 0 8px 0',
          fontSize: '24px',
          color: '#1a1a1a',
        }}>
          Get started with {planName || 'Roofr'}
        </h2>
        <p style={{
          margin: '0 0 24px 0',
          color: '#666',
          fontSize: '14px',
        }}>
          Enter your email to reserve this client plan
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333',
            }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@roofr.com"
              disabled={isLoading}
              autoFocus
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                border: error ? '2px solid #dc3545' : '1px solid #ddd',
                borderRadius: '8px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
            {error && (
              <p style={{
                color: '#dc3545',
                fontSize: '14px',
                margin: '8px 0 0 0',
              }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '600',
              background: isLoading ? '#ccc' : '#A83119',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {isLoading ? 'Please wait…' : 'Continue to Stripe checkout'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#999',
          marginTop: '16px',
        }}>
          You’ll be redirected to Stripe’s secure client checkout
        </p>
      </div>
    </div>
  );
}


import React, { useState, useEffect, useRef } from 'react';

const API_BASE = 'https://app.stormbuddi.com/api';
const CHECK_EMAIL_ENDPOINT = `${API_BASE}/pricing/check-email`;
const CHECKOUT_ENDPOINT = `${API_BASE}/pricing/checkout`;
const EMAIL_EXISTS_MESSAGE = 'This email is already registered. Please enter another email.';

export default function EmailModal({
  isOpen,
  onClose,
  planId,
  planName,
  billingCycle = 'monthly'
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollPositionRef = useRef(null);
  const originalStylesRef = useRef(null);

  // Lock scrolling when modal opens, restore when it closes
  useEffect(() => {
    if (!isOpen) {
      // Modal is closing - restore scroll position
      if (scrollPositionRef.current !== null && originalStylesRef.current) {
        const savedPos = scrollPositionRef.current;
        const savedStyles = originalStylesRef.current;

        // Temporarily disable smooth scrolling on html element
        const html = document.documentElement;
        const originalScrollBehavior = html.style.scrollBehavior || '';
        html.style.scrollBehavior = 'auto';

        // First, remove fixed positioning but keep overflow hidden temporarily
        document.body.style.position = savedStyles.position || '';
        document.body.style.top = savedStyles.top || '';
        document.body.style.left = savedStyles.left || '';
        document.body.style.right = savedStyles.right || '';
        document.body.style.width = savedStyles.width || '';
        
        // Now set scroll position immediately (before browser repaints)
        window.scrollTo(0, savedPos);
        document.documentElement.scrollTop = savedPos;
        document.body.scrollTop = savedPos;
        
        // Then restore overflow and padding
        document.body.style.overflow = savedStyles.overflow || '';
        document.body.style.paddingRight = savedStyles.paddingRight || '';
        
        // Restore smooth scroll behavior after position is set
        requestAnimationFrame(() => {
          html.style.scrollBehavior = originalScrollBehavior;
        });

        // Clear refs
        scrollPositionRef.current = null;
        originalStylesRef.current = null;
      }
      return;
    }

    // Modal is opening - lock scroll
    // Store the current scroll position BEFORE making any changes
    scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop || 0;
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Store all original body styles
    originalStylesRef.current = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
    };

    // Apply scroll lock
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Cleanup: restore scroll when component unmounts
    return () => {
      if (scrollPositionRef.current !== null && originalStylesRef.current) {
        const savedPos = scrollPositionRef.current;
        const savedStyles = originalStylesRef.current;

        document.body.style.overflow = savedStyles.overflow || '';
        document.body.style.position = savedStyles.position || '';
        document.body.style.top = savedStyles.top || '';
        document.body.style.left = savedStyles.left || '';
        document.body.style.right = savedStyles.right || '';
        document.body.style.width = savedStyles.width || '';
        document.body.style.paddingRight = savedStyles.paddingRight || '';

        const html = document.documentElement;
        const originalScrollBehavior = html.style.scrollBehavior || '';
        html.style.scrollBehavior = 'auto';
        window.scrollTo(0, savedPos);
        document.documentElement.scrollTop = savedPos;
        
        requestAnimationFrame(() => {
          html.style.scrollBehavior = originalScrollBehavior;
        });
      }
    };
  }, [isOpen]);

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
        body: JSON.stringify({
          plan_id: planId,
          email: trimmedEmail,
          billing_cycle: billingCycle,
        }),
      });

      const emailPayload = await emailResponse.json().catch(() => null);

      if (emailResponse.status === 409) {
        setError(emailPayload?.message || EMAIL_EXISTS_MESSAGE);
        setIsLoading(false);
        return;
      }

      if (!emailResponse.ok) {
        setError(emailPayload?.error || 'Unable to verify email. Please try again.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(CHECKOUT_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          billing_cycle: billingCycle,
          email: trimmedEmail,
        }),
      });

      const checkoutPayload = await response.json().catch(() => null);

      if (response.status === 409) {
        setError(checkoutPayload?.message || EMAIL_EXISTS_MESSAGE);
        setIsLoading(false);
        return;
      }

      const redirectUrl =
        checkoutPayload?.checkout_url || checkoutPayload?.url;
      const succeeded =
        checkoutPayload?.success ?? Boolean(redirectUrl);

      if (!response.ok || !redirectUrl || !succeeded) {
        setError(checkoutPayload?.error || 'Unable to start checkout. Please try again.');
        setIsLoading(false);
        return;
      }

      window.location.href = redirectUrl;
    } catch (fetchError) {
      console.error('Checkout error:', fetchError);
      const fallbackMessage =
        fetchError instanceof TypeError &&
        /failed to fetch/i.test(fetchError.message || '')
          ? EMAIL_EXISTS_MESSAGE
          : 'Failed to connect. Please try again.';
      setError(fallbackMessage);
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
      className="email-modal-overlay"
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
        overflowY: 'auto',
        padding: '20px',
      }}
    >
      <div 
        className="email-modal-content"
        style={{
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        width: '100%',
        maxWidth: '420px',
        margin: 'auto',
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
      <style>{`
        /* Mobile-specific styles for EmailModal */
        @media (max-width: 768px) {
          .email-modal-overlay {
            align-items: center !important;
            justify-content: center !important;
            padding: 20px !important;
            -webkit-overflow-scrolling: touch;
            overflow-y: auto !important;
            min-height: 100vh;
            min-height: -webkit-fill-available;
            display: flex !important;
          }

          .email-modal-content {
            margin: auto !important;
            max-width: calc(100% - 40px) !important;
            padding: 24px !important;
            position: relative !important;
            flex-shrink: 0;
            width: 100%;
          }

          /* Ensure overlay can scroll when content is taller than viewport */
          .email-modal-overlay::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
        }

        /* Very small screens */
        @media (max-width: 480px) {
          .email-modal-content {
            padding: 20px !important;
            max-width: calc(100% - 32px) !important;
          }

          .email-modal-overlay {
            padding: 16px !important;
          }
        }

        /* Extra small screens */
        @media (max-width: 360px) {
          .email-modal-content {
            padding: 16px !important;
            max-width: calc(100% - 24px) !important;
          }

          .email-modal-overlay {
            padding: 12px !important;
          }
        }

        /* Handle landscape orientation on mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .email-modal-overlay {
            align-items: flex-start !important;
            padding-top: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}


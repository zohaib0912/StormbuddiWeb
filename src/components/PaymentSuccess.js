import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const DEFAULT_API_BASE = 'https://app.stormbuddi.com/api/pricing';
const SESSION_LOOKUP_BASE =
  process.env.REACT_APP_SESSION_LOOKUP_API ||
  process.env.REACT_APP_PRICING_API ||
  DEFAULT_API_BASE;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  const [isLoading, setIsLoading] = useState(true);
  const [sessionDetails, setSessionDetails] = useState(null);
  const [error, setError] = useState(null);

  const sessionLookupUrl = useMemo(() => {
    if (!sessionId) return null;
    const base = SESSION_LOOKUP_BASE.replace(/\/$/, '');
    const encoded = encodeURIComponent(sessionId);
    return `${base}/checkout/session/${encoded}`;
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) {
      setError('Missing Stripe session id. Please contact support if this persists.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const fetchSessionDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(sessionLookupUrl, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            errorText || `Failed to load session details (${response.status}).`
          );
        }

        const payload = await response.json();
        const normalized = normalizeSessionResponse(payload);

        if (!normalized) {
          throw new Error('Session details were empty. Please contact support.');
        }

        if (isMounted) {
          setSessionDetails(normalized);
          setIsLoading(false);
        }
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return;
        }
        console.error('[PaymentSuccess] Unable to fetch session details:', fetchError);
        if (isMounted) {
          setError(fetchError.message || 'Failed to load session details.');
          setIsLoading(false);
        }
      }
    };

    fetchSessionDetails();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [sessionLookupUrl, sessionId]);

  const handleAccessAccount = () => {
    window.location.href = 'https://app.stormbuddi.com';
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#052637] via-[#0d3e59] to-[#7a1c18] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
        <SuccessBadge />

        <h1 className="text-3xl md:text-4xl font-bold text-[#042D43] mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Thank you for your subscription. Your payment has been processed successfully and your
          account has been activated.
        </p>

        {isLoading && <LoadingState />}

        {!isLoading && error && (
          <div className="bg-red-50 text-red-700 rounded-2xl p-4 mb-8">
            <p className="font-semibold mb-1">We could not load your receipt details.</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!isLoading && sessionDetails && (
          <div className="bg-gray-50 rounded-3xl p-6 md:p-8 mb-10 text-left shadow-inner">
            <p className="text-lg font-semibold text-gray-800 mb-4">Account Information</p>
            <div className="space-y-4">
              <InfoRow label="Customer Name" value={sessionDetails.customerName} />
              <InfoRow label="Email" value={sessionDetails.email} copyable />
              <InfoRow label="Phone" value={sessionDetails.phone} />
              <InfoRow label="Subscription Plan" value={sessionDetails.planName} />
              <InfoRow label="Billing Cycle" value={sessionDetails.billingCycle} />
              <InfoRow label="Amount Paid" value={sessionDetails.amountPaidFormatted} />
              <InfoRow
                label="Status"
                value={sessionDetails.statusLabel}
                highlight={sessionDetails.isActive}
              />
              {sessionId && (
                <InfoRow label="Session ID" value={sessionId} mono copyable small />
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleAccessAccount}
            className="px-8 py-3 rounded-full bg-[#B63F24] hover:bg-[#d34f31] text-white font-semibold shadow-lg transition-colors"
          >
            Access Your Account
          </button>
          <button
            onClick={handleReturnHome}
            className="px-8 py-3 rounded-full border-2 border-[#B63F24] text-[#B63F24] font-semibold hover:bg-[#fff4f0] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessBadge = () => (
  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
    <svg
      className="h-12 w-12 text-green-600"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M5 13l4 4L19 7"></path>
    </svg>
  </div>
);

const LoadingState = () => (
  <div className="bg-gray-50 rounded-3xl p-6 md:p-8 mb-10 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-6" />
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="h-4 bg-gray-200 rounded" />
      ))}
    </div>
  </div>
);

const InfoRow = ({ label, value, highlight = false, mono = false, copyable = false, small = false }) => {
  const handleCopy = () => {
    if (copyable && value) {
      navigator.clipboard?.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
      <span className={`text-sm font-semibold text-gray-500 ${small ? 'text-xs' : ''}`}>
        {label}:
      </span>
      <span
        className={[
          'text-base text-gray-900 break-all',
          highlight ? 'text-green-600 font-semibold' : '',
          mono ? 'font-mono text-xs' : '',
          small ? 'text-xs' : '',
          copyable ? 'cursor-pointer select-text' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handleCopy}
      >
        {value || '—'}
      </span>
    </div>
  );
};

const normalizeSessionResponse = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  // Some endpoints wrap the useful data under "data", others under "data.session"
  // or directly return the session object. Handle each case.
  const rawData = payload.data || payload;
  const session =
    rawData.session ||
    rawData.checkout_session ||
    rawData.data ||
    rawData;

  if (!session || typeof session !== 'object') {
    return null;
  }

  const customerDetails =
    session.customer_details ||
    session.customer ||
    session.customer_object ||
    {};
  const metadata = session.metadata || {};
  const lineItem =
    session.line_items?.data?.[0] ||
    session.line_items?.[0] ||
    session.items?.data?.[0] ||
    {};

  const recurringInterval = lineItem.price?.recurring?.interval;
  const amountRaw =
    session.amount ??
    session.amount_total ??
    session.amount_subtotal ??
    session.total_details?.amount_due ??
    lineItem.amount_total ??
    lineItem.amount_subtotal ??
    null;

  const currencyRaw =
    session.currency ||
    lineItem.price?.currency ||
    session.payment_intent?.currency ||
    'usd';

  const planName =
    session.plan_name ||
    metadata.plan_name ||
    lineItem.description ||
    lineItem.price?.nickname ||
    'Subscription';

  const billingCycle =
    session.billing_cycle ||
    metadata.billing_cycle ||
    (recurringInterval === 'year'
      ? 'Annual'
      : recurringInterval === 'month'
      ? 'Monthly'
      : recurringInterval || 'Recurring');

  const status =
    session.status ||
    session.payment_status ||
    session.subscription_status;

  const amountFormatted =
    session.amount_formatted ||
    (amountRaw !== null
      ? formatCurrency(
          amountRaw >= 1000 ? amountRaw / 100 : amountRaw,
          currencyRaw
        )
      : '—');

  return {
    customerName:
      session.customer_name ||
      metadata.customer_name ||
      customerDetails.name ||
      '—',
    email:
      session.customer_email ||
      metadata.email ||
      customerDetails.email ||
      session.customer_email ||
      '—',
    phone:
      session.customer_phone ||
      metadata.phone ||
      customerDetails.phone ||
      '—',
    planName,
    billingCycle,
    amountPaidFormatted: amountFormatted,
    statusLabel: formatStatus(status),
    isActive: /active|complete/i.test(status || ''),
  };
};

const formatCurrency = (value, currency) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency?.toUpperCase() || 'USD',
    }).format(value);
  } catch {
    return `$${value?.toFixed(2) ?? '0.00'}`;
  }
};

const formatStatus = (status) => {
  if (!status) return 'Pending';
  const normalized = status.replace(/_/g, ' ');
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

export default PaymentSuccess;


# Stripe Integration Setup Guide

This guide explains how to set up and configure the Stripe payment integration for the StormBuddi pricing plans.

## Prerequisites

1. A Stripe account (get one at https://stripe.com)
2. Stripe API keys (Secret Key and Publishable Key)
3. PHP backend server running at `http://192.168.1.182:8000` (or update the endpoint URLs)

## Setup Steps

### 1. Environment Variables

Set the following environment variables on your PHP backend server:

```bash
STRIPE_SECRET_KEY=sk_test_...  # Your Stripe Secret Key (use sk_live_... for production)
```

For local development, you can add this to your `.env` file or set it in your PHP runtime environment.

### 2. PHP Endpoint Location

The Stripe checkout endpoint file (`create-checkout-session.php`) should be placed in your backend server's public directory. 

**For Laravel applications:**
- Place the file at `public/create-checkout-session.php`, OR
- Create a route in `routes/api.php`:
  ```php
  Route::post('/stripe/create-checkout-session', [StripeController::class, 'createCheckoutSession']);
  ```
  And update the proxy configuration accordingly.

**For plain PHP servers:**
- Place the file in your web root directory so it's accessible at `http://your-server.com/create-checkout-session.php`

### 3. Frontend Configuration

The frontend is already configured to:
- Use `/api/stripe/create-checkout-session.php` in development (proxied through `setupProxy.js`)
- Fall back to direct server URL in production if needed

You can customize the Stripe API endpoint by setting:
```bash
REACT_APP_STRIPE_API=http://your-server.com
```

### 4. Update Proxy Configuration (if needed)

If your backend is at a different URL, update `src/setupProxy.js`:

```javascript
target: 'http://your-backend-url:port',
```

### 5. Success and Cancel URLs

The checkout flow redirects to:
- **Success:** `/payment-success?session_id={CHECKOUT_SESSION_ID}`
- **Cancel:** `/payment-cancel`

These routes are already set up in `src/App.js` using React Router.

### 6. Testing

1. Start your React development server: `npm start`
2. Ensure your PHP backend is running
3. Navigate to the pricing section
4. Click "Select Plan" on any plan
5. You'll be redirected to Stripe Checkout

**Test Cards (for Stripe test mode):**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Use any future expiry date, any 3-digit CVC, and any ZIP code

### 7. Production Deployment

Before going live:
1. Replace test API keys with live keys
2. Update environment variables in production
3. Ensure HTTPS is enabled (required by Stripe)
4. Test the full payment flow with real payment methods

## File Structure

```
server/
  └── create-checkout-session.php  # Stripe checkout endpoint

src/
  ├── components/
  │   ├── Pricing.js              # Main pricing component with Stripe integration
  │   ├── PaymentSuccess.js       # Success page after payment
  │   └── PaymentCancel.js        # Cancel page if payment is cancelled
  └── setupProxy.js               # Proxy configuration for API calls
```

## Troubleshooting

### CORS Errors
- Ensure your backend sends proper CORS headers
- Check that the proxy is configured correctly in `setupProxy.js`

### "Stripe secret key not configured" Error
- Verify `STRIPE_SECRET_KEY` environment variable is set
- Check that your PHP server has access to environment variables

### Checkout Page Not Loading
- Verify the PHP endpoint is accessible
- Check browser console for API errors
- Ensure Stripe API keys are valid

## Additional Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe PHP SDK Documentation](https://stripe.com/docs/api/php)


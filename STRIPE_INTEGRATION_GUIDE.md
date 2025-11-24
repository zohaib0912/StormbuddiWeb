# Stripe Integration Guide - Laravel Backend

This guide explains how to complete the Stripe integration using your Laravel backend.

## Overview

The frontend is now configured to call `/api/pricing/checkout` (which maps to your Laravel route). You need to implement the controller method that handles the checkout session creation.

## Laravel Route

Your route is already defined:
```php
Route::prefix('pricing')->middleware([])->group(function () {
    Route::post('/checkout', [PricingController::class, 'createCheckoutSession']);
});
```

This creates the endpoint: `POST /api/pricing/checkout`

## Implementation Steps

### 1. Install Stripe PHP SDK (if not already installed)

```bash
composer require stripe/stripe-php
```

### 2. Add Stripe Configuration

In your `.env` file:
```env
STRIPE_SECRET_KEY=sk_test_...  # Your Stripe secret key
```

Or configure it in `config/services.php`:
```php
'stripe' => [
    'secret' => env('STRIPE_SECRET_KEY'),
    'publishable' => env('STRIPE_PUBLISHABLE_KEY'),
],
```

### 3. Implement the Controller Method

See `server/PricingController_Example.php` for a complete reference implementation.

Key points:
- Validates the incoming request data
- Converts price from dollars to cents
- Creates a Stripe Checkout Session
- Returns the session URL for redirect

### 4. Expected Request Format

The frontend sends a POST request with this JSON body:
```json
{
  "planId": "professional",
  "planName": "Professional",
  "price": 95.00,
  "billingCycle": "monthly",
  "successUrl": "http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "http://localhost:3000/payment-cancel"
}
```

### 5. Expected Response Format

The controller should return:
```json
{
  "data": {
    "sessionId": "cs_test_...",
    "url": "https://checkout.stripe.com/pay/cs_test_..."
  }
}
```

Or without the `data` wrapper (the frontend handles both):
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

## Error Handling

The frontend expects error responses in this format:
```json
{
  "message": "Error description here"
}
```

Or Laravel's default validation error format.

## Testing

1. Start your Laravel server
2. Start your React app (`npm start`)
3. Navigate to the pricing section
4. Click "Select Plan" on any plan
5. You should be redirected to Stripe Checkout

**Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Use any future expiry, any 3-digit CVC, any ZIP

## Files Modified

### Frontend Files:
- `src/components/Pricing.js` - Updated to call `/api/pricing/checkout`
- `src/setupProxy.js` - Uses existing pricing API proxy (no changes needed)

### Backend Files Needed:
- `app/Http/Controllers/PricingController.php` - Implement `createCheckoutSession()` method
- `.env` - Add `STRIPE_SECRET_KEY`

## Troubleshooting

### 404 Error
- Verify the route is registered in your `routes/api.php`
- Check that the route is under the `/api` prefix
- Ensure the controller method exists and is public

### 500 Error - Stripe Key Not Found
- Verify `STRIPE_SECRET_KEY` is set in `.env`
- Run `php artisan config:cache` if using config cache
- Check that the environment variable is accessible

### CORS Issues
- The proxy in `setupProxy.js` should handle CORS for development
- For production, configure CORS in your Laravel app (see `config/cors.php`)

### Checkout URL Not Redirecting
- Check browser console for errors
- Verify the response includes the `url` field
- Ensure the URL is a valid Stripe Checkout URL

## Next Steps

After implementing the controller:
1. Test with test mode keys
2. Set up webhooks to handle successful payments (optional)
3. Store subscription data in your database
4. Switch to live keys before production


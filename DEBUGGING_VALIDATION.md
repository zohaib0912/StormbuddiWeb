# Debugging Laravel Validation Errors (422)

If you're getting a 422 "Validation failed" error, follow these steps:

## Step 1: Check Browser Console

The improved error handling now shows detailed validation errors in the browser console. Look for:

```
❌ [Checkout] Error response: { ... }
❌ [Checkout] Validation details: { ... }
```

This will show exactly which fields are failing validation.

## Step 2: Check Your Laravel Controller Validation Rules

Your `PricingController@createCheckoutSession` method should have validation rules. Compare them with what the frontend sends:

**Frontend sends (camelCase):**
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

**Example Controller Validation (from PricingController_Example.php):**
```php
$validated = $request->validate([
    'planId' => 'required|string',
    'planName' => 'required|string',
    'price' => 'required|numeric|min:0',
    'billingCycle' => 'required|string|in:monthly,annual',
    'successUrl' => 'nullable|url',
    'cancelUrl' => 'nullable|url',
]);
```

## Common Issues

### Issue 1: Field Name Mismatch (camelCase vs snake_case)

If your Laravel controller expects snake_case:
```php
'plan_id' => 'required|string',  // snake_case
```

But the frontend sends camelCase:
```json
{ "planId": "..." }  // camelCase
```

**Solution:** Either:
- Update your controller to accept camelCase (recommended)
- Or update the frontend to send snake_case

### Issue 2: Price Format

Ensure the price is sent as a number, not a string:
```json
{ "price": 95.00 }  // ✅ Correct
{ "price": "95.00" }  // ❌ Might fail validation
```

The frontend now ensures it's a number.

### Issue 3: URL Validation Failing

Laravel's `url` validation rule is strict. Make sure URLs are:
- Properly formatted (include http:// or https://)
- Valid URLs

The frontend now validates URLs before sending.

### Issue 4: Missing Required Fields

Check that all required fields are present:
- `planId` - should be a non-empty string
- `planName` - should be a non-empty string
- `price` - should be a positive number
- `billingCycle` - should be exactly "monthly" or "annual"

## Step 3: Check Laravel Logs

Check your Laravel log file for detailed validation errors:
```bash
tail -f storage/logs/laravel.log
```

## Step 4: Test with Postman/curl

Test the endpoint directly to see the exact error:

```bash
curl -X POST http://192.168.1.182:8000/api/pricing/checkout \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "planId": "test",
    "planName": "Test Plan",
    "price": 100,
    "billingCycle": "monthly",
    "successUrl": "http://localhost:3000/success",
    "cancelUrl": "http://localhost:3000/cancel"
  }'
```

This will show the exact validation errors.

## Quick Fix: Match Field Names

If your controller uses snake_case, update the frontend request body:

```javascript
const requestBody = {
  plan_id: planId,      // snake_case
  plan_name: planName,  // snake_case
  price: priceValue,
  billing_cycle: isAnnual ? 'annual' : 'monthly',  // snake_case
  success_url: successUrl,  // snake_case
  cancel_url: cancelUrl,    // snake_case
};
```

But it's better to update the controller to accept camelCase (standard for APIs).


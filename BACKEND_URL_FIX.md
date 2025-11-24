# Backend URL Configuration Fix

## Issue

Laravel's `url` validation rule rejects URLs containing the `{CHECKOUT_SESSION_ID}` placeholder because it's not a valid URL format. This causes a 422 validation error when sending `success_url` and `cancel_url` from the frontend.

## Current Solution

The frontend is now omitting `success_url` and `cancel_url` from the request. The backend will use its default URLs:
- `success_url`: `url('/subscription/success?session_id={CHECKOUT_SESSION_ID}')`
- `cancel_url`: `url('/subscription/cancel')`

## Problem

The backend default routes (`/subscription/success` and `/subscription/cancel`) don't match the frontend routes (`/payment-success` and `/payment-cancel`).

## Recommended Fix Options

### Option 1: Update Backend Validation (Recommended)

Update your Laravel controller validation to accept URLs with Stripe placeholders. Create a custom validation rule or modify the validation:

```php
$validated = $request->validate([
    'plan_id' => 'required',
    'email' => 'nullable|email|max:255',
    'success_url' => [
        'nullable',
        'string',
        'max:500',
        function ($attribute, $value, $fail) {
            // Remove placeholder for validation, then check if base URL is valid
            $testUrl = str_replace('{CHECKOUT_SESSION_ID}', 'test', $value);
            if (!filter_var($testUrl, FILTER_VALIDATE_URL)) {
                $fail('The '.$attribute.' must be a valid URL.');
            }
        },
    ],
    'cancel_url' => [
        'nullable',
        'string',
        'max:500',
        function ($attribute, $value, $fail) {
            if (!filter_var($value, FILTER_VALIDATE_URL)) {
                $fail('The '.$attribute.' must be a valid URL.');
            }
        },
    ],
]);
```

### Option 2: Update Backend Default URLs

Update your backend controller to use the frontend routes:

```php
'success_url' => $request->input('success_url', 
    url(config('app.frontend_url') . '/payment-success?session_id={CHECKOUT_SESSION_ID}')
),
'cancel_url' => $request->input('cancel_url', 
    url(config('app.frontend_url') . '/payment-cancel')
),
```

Add to your `.env`:
```env
FRONTEND_URL=http://localhost:3000
```

### Option 3: Accept Base URLs and Append Placeholder

Accept base URLs from frontend and append the placeholder on backend:

```php
$successUrlBase = $request->input('success_url_base');
$cancelUrlBase = $request->input('cancel_url_base');

$successUrl = $successUrlBase ? 
    $successUrlBase . '?session_id={CHECKOUT_SESSION_ID}' : 
    url('/subscription/success?session_id={CHECKOUT_SESSION_ID}');
```

## Immediate Workaround

For now, the frontend omits the URLs and the backend uses defaults. Update your backend default routes to match your frontend, or update the validation as shown in Option 1.


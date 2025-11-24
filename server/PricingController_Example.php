<?php
/**
 * Example Laravel Controller Method for Stripe Checkout
 * 
 * This is a reference implementation showing what the createCheckoutSession method
 * should look like in your PricingController.
 * 
 * Place this in: app/Http/Controllers/PricingController.php
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;

class PricingController extends Controller
{
    /**
     * Create a Stripe Checkout Session for the selected plan
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createCheckoutSession(Request $request): JsonResponse
    {
        // Validate the request
        $validated = $request->validate([
            'planId' => 'required|string',
            'planName' => 'required|string',
            'price' => 'required|numeric|min:0',
            'billingCycle' => 'required|string|in:monthly,annual',
            'successUrl' => 'nullable|url',
            'cancelUrl' => 'nullable|url',
        ]);

        // Set your Stripe secret key (from .env: STRIPE_SECRET_KEY)
        Stripe::setApiKey(config('services.stripe.secret') ?? env('STRIPE_SECRET_KEY'));

        if (!Stripe::getApiKey()) {
            return response()->json([
                'message' => 'Stripe secret key not configured. Please set STRIPE_SECRET_KEY environment variable.'
            ], 500);
        }

        $planId = $validated['planId'];
        $planName = $validated['planName'];
        $price = floatval($validated['price']);
        $billingCycle = $validated['billingCycle'];
        
        // Default URLs if not provided
        $successUrl = $validated['successUrl'] ?? url('/payment-success?session_id={CHECKOUT_SESSION_ID}');
        $cancelUrl = $validated['cancelUrl'] ?? url('/pricing');

        // Convert price to cents for Stripe
        $priceInCents = intval($price * 100);

        // Determine the interval for Stripe (month or year)
        $interval = $billingCycle === 'annual' ? 'year' : 'month';
        $intervalCount = 1;

        try {
            // Create Checkout Session
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $planName . ' Plan',
                            'description' => "Subscription plan for {$planName} - Billed {$billingCycle}",
                        ],
                        'unit_amount' => $priceInCents,
                        'recurring' => [
                            'interval' => $interval,
                            'interval_count' => $intervalCount,
                        ],
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => $successUrl,
                'cancel_url' => $cancelUrl,
                'metadata' => [
                    'plan_id' => $planId,
                    'plan_name' => $planName,
                    'billing_cycle' => $billingCycle,
                ],
                'allow_promotion_codes' => true,
            ]);

            // Return the session URL (Laravel typically wraps in 'data')
            return response()->json([
                'data' => [
                    'sessionId' => $session->id,
                    'url' => $session->url,
                ]
            ], 200);

        } catch (ApiErrorException $e) {
            return response()->json([
                'message' => 'Stripe API error: ' . $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }
}


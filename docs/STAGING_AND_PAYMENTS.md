# Staging and Payment Plan

This plan lets the new site run beside the old public Alva site without taking over the live domain.

## Domain Shape

Keep the old site on the current public records:

```text
alvatechnology.com
www.alvatechnology.com
```

Add non-conflicting staging records for the new site:

```text
staging.alvatechnology.com        new frontend
api-staging.alvatechnology.com    Express API
commerce-staging.alvatechnology.com Vendure Shop API
admin-staging.alvatechnology.com  Vendure dashboard
```

The production switch happens later by changing only `@` and `www` DNS records. Keep the old site available at `old.alvatechnology.com` before switching.

## Cloudflare Access

Protect all staging hostnames with Cloudflare Access:

```text
staging.alvatechnology.com
api-staging.alvatechnology.com
commerce-staging.alvatechnology.com
admin-staging.alvatechnology.com
```

Use an allow policy for internal email addresses or the company email domain. Do not rely on the staging hostname being unknown.

When real payment webhooks are added, do not put the webhook URL behind an interactive login page. Use a separate bypass rule for the webhook path and verify the provider signature in the backend:

```text
api-staging.alvatechnology.com/api/webhooks/stripe
```

## Frontend Config

For staging, deploy `js/config.js` with:

```js
window.ALVA_API_BASE_URL = "https://api-staging.alvatechnology.com";
window.ALVA_VENDURE_SHOP_API = "https://commerce-staging.alvatechnology.com/shop-api";
window.ALVA_STRIPE_PUBLISHABLE_KEY = "pk_test_...";
```

For production later:

```js
window.ALVA_API_BASE_URL = "https://api.alvatechnology.com";
window.ALVA_VENDURE_SHOP_API = "https://commerce.alvatechnology.com/shop-api";
window.ALVA_STRIPE_PUBLISHABLE_KEY = "pk_live_...";
```

Only publish `pk_test_` on staging. Never put Stripe secret keys in frontend files.

## Express Staging Env

Use:

```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://staging.alvatechnology.com,https://new.alvatechnology.com

PAYMENT_MODE=order_request
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_ALLOWED_METHODS=card,klarna
```

When Stripe test payments are implemented:

```env
PAYMENT_MODE=stripe_test
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_ALLOWED_METHODS=card,klarna
```

Do not use `stripe_live` until the company Stripe account, Klarna capability, KYC, tax, refunds, support and bank payout account are approved.

## Vendure Staging Env

Use:

```env
APP_ENV=production
PORT=2605
STOREFRONT_URL=https://staging.alvatechnology.com
STOREFRONT_ORIGINS=https://staging.alvatechnology.com,https://new.alvatechnology.com
COOKIE_SECRET=<long random secret>
SUPERADMIN_USERNAME=<admin username>
SUPERADMIN_PASSWORD=<strong password>

PAYMENT_MODE=order_request
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_ALLOWED_METHODS=card,klarna
```

The current Vendure implementation still keeps the dummy payment handler for order-request testing. The Stripe plugin is installed and registered, but no real collection happens until a Stripe payment method is created in the Vendure Admin UI with test or live credentials. Stripe customer IDs are not stored in Vendure yet, so this step does not require a customer-field migration.

## Payment Implementation Path

1. Keep current checkout as order-request mode on public pages.
2. In Vendure Admin, create a staging payment method using the `Stripe payments` handler.
3. Add the Stripe `sk_test_...` API key and webhook signing secret to that payment method.
4. Add a Stripe webhook endpoint for `payment_intent.succeeded` and `payment_intent.payment_failed`.
5. Point the webhook at:

```text
https://commerce-staging.alvatechnology.com/payments/stripe
```

6. Enable payment methods in Stripe test mode: `card` and `klarna`.
7. Update the storefront checkout to call Vendure's `createStripePaymentIntent` mutation and render Stripe Payment Element.
8. Test failed, canceled, successful and expired payment paths.
9. Complete company merchant onboarding and bank payout setup.
10. Switch staging from test keys to live keys only after owner approval.
11. Promote the same config shape to production.

The payment method can also be configured from the command line after the env values are present:

```powershell
npm.cmd --prefix vendure run payments:configure-stripe
```

## Go-Live DNS Switch

Before switching:

- staging checkout has passed test card and Klarna test flows
- webhook signature verification works
- production CORS includes only public domains
- Cloudflare Access protects admin and internal tools
- old site has a fallback hostname
- live Stripe account has company bank payout configured

Then change:

```text
www.alvatechnology.com -> new frontend
alvatechnology.com -> new frontend or redirect to www
```

Keep staging online after launch for future release testing.

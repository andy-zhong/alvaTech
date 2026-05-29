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
staging.alvatechnology.se         new frontend
staging-api.alvatechnology.se     Express API and Vendure Shop API
staging-api.alvatechnology.se/dashboard Vendure dashboard
```

The production switch happens later by changing only `@` and `www` DNS records. Keep the old site available at `old.alvatechnology.com` before switching.

## Cloudflare Access

Protect all staging hostnames with Cloudflare Access:

```text
staging.alvatechnology.se
staging-api.alvatechnology.se
```

Use an allow policy for internal email addresses or the company email domain. Do not rely on the staging hostname being unknown.

When real payment webhooks are added, do not put the webhook URL behind an interactive login page. Use a separate bypass rule for the webhook path and verify the provider signature in the backend:

```text
staging-api.alvatechnology.se/api/webhooks/stripe
```

## Frontend Config

The frontend reads these values at runtime from `js/config.js`. For local development, an empty config means same-origin Express API requests and Vendure fallback to `http://localhost:2605/shop-api`.

For staging, deploy `js/config.js` with:

```js
window.ALVA_API_BASE_URL = "https://staging-api.alvatechnology.se";
window.ALVA_VENDURE_SHOP_API = "https://staging-api.alvatechnology.se/shop-api";
window.ALVA_STRIPE_PUBLISHABLE_KEY = "pk_test_...";
```

For production later:

```js
window.ALVA_API_BASE_URL = "https://api.alvatechnology.se";
window.ALVA_VENDURE_SHOP_API = "https://api.alvatechnology.se/shop-api";
window.ALVA_STRIPE_PUBLISHABLE_KEY = "pk_live_...";
```

Only publish `pk_test_` on staging. Never put Stripe secret keys in frontend files.

When deploying the static frontend to 1Panel, make sure `js/config.js` uses public HTTPS URLs. Do not use Docker service names or `localhost` in frontend config for staging or production, because those values run in the visitor's browser, not inside the server.

Stripe variable boundaries:

- `ALVA_STRIPE_PUBLISHABLE_KEY` is frontend-only and must be a publishable key: `pk_test_...` on staging, `pk_live_...` only after go-live approval.
- `STRIPE_SECRET_KEY` is backend-only and must never be committed to frontend files.
- `STRIPE_WEBHOOK_SECRET` is backend-only and must match the Stripe webhook endpoint signing secret.
- `STRIPE_ALLOWED_METHODS` is backend/runtime configuration for enabled payment method types such as `card,klarna`.

## Express Staging Env

Use:

```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://staging.alvatechnology.se,https://www.alvatechnology.se

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
NODE_ENV=production
PORT=2605
STOREFRONT_URL=https://staging.alvatechnology.se
STOREFRONT_ORIGINS=https://staging.alvatechnology.se,https://www.alvatechnology.se
PUBLIC_API_URL=https://staging-api.alvatechnology.se
ASSET_URL_PREFIX=https://staging-api.alvatechnology.se/assets/
COOKIE_SECRET=<long random secret>
SUPERADMIN_USERNAME=<admin username>
SUPERADMIN_PASSWORD=<strong password>

DB_TYPE=postgres
DB_HOST=postgres
DB_PORT=5432
DB_NAME=alva_staging
DB_USERNAME=alva_vendure
DB_PASSWORD=<same value as POSTGRES_PASSWORD>
DB_SYNCHRONIZE=false

PAYMENT_MODE=order_request
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_ALLOWED_METHODS=card,klarna
```

For a first empty staging Postgres database, `DB_SYNCHRONIZE=true` can be used temporarily to let Vendure create the schema. After the first successful startup, change it back to `DB_SYNCHRONIZE=false`.

In Docker Compose, `DB_HOST` must be the Postgres service name on the Docker network, for example `postgres`. Do not set `DB_HOST=127.0.0.1` inside the Vendure container, because that points to the Vendure container itself.

The current Vendure implementation still keeps the dummy payment handler for order-request testing. The Stripe plugin is installed and registered, but no real collection happens until a Stripe payment method is created in the Vendure Admin UI with test or live credentials. Stripe customer IDs are not stored in Vendure yet, so this step does not require a customer-field migration.

The `staging-api.alvatechnology.se` backend is a production-mode backend for staging. It must allow browser requests from both active frontend hostnames:

```env
STOREFRONT_ORIGINS=https://staging.alvatechnology.se,https://www.alvatechnology.se
CORS_ORIGIN=https://staging.alvatechnology.se,https://www.alvatechnology.se
```

Restart the Vendure and Express processes after changing these values.

Vendure asset URLs are generated from the backend origin. On staging, asset URLs should look like:

```text
https://staging-api.alvatechnology.se/assets/source/92/voltdock01.png
```

If assets show `https://www.my-shop.com/assets/...`, set `PUBLIC_API_URL` or `ASSET_URL_PREFIX` and restart Vendure server and worker.

### Docker Compose Env

Use one `.env` file for both Postgres and Vendure:

```env
POSTGRES_DB=alva_staging
POSTGRES_USER=alva_vendure
POSTGRES_PASSWORD=<database password>

DB_TYPE=postgres
DB_HOST=postgres
DB_PORT=5432
DB_NAME=alva_staging
DB_USERNAME=alva_vendure
DB_PASSWORD=<same value as POSTGRES_PASSWORD>

NODE_ENV=production
APP_ENV=production
PORT=2605
COOKIE_SECRET=<long random secret>
SUPERADMIN_USERNAME=<admin username>
SUPERADMIN_PASSWORD=<strong password>

PAYMENT_MODE=order_request
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_ALLOWED_METHODS=card,klarna
```

The server and worker containers must use the same image tag and the same `.env` file so they share the same `VendureConfig` and database connection.

## Payment Implementation Path

1. Keep current checkout as order-request mode on public pages.
2. In Vendure Admin, create a staging payment method using the `Stripe payments` handler.
3. Add the Stripe `sk_test_...` API key and webhook signing secret to that payment method.
4. Add a Stripe webhook endpoint for `payment_intent.succeeded` and `payment_intent.payment_failed`.
5. Point the webhook at:

```text
https://staging-api.alvatechnology.se/payments/stripe
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
www.alvatechnology.se -> new frontend
alvatechnology.se -> redirect to www
```

Keep staging online after launch for future release testing.

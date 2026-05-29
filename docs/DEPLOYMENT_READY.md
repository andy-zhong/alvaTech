# Deployment Readiness

This project is prepared for Cloudflare + AWS, but does not require either account for local development.

## Recommended First Production Shape

- Registrar: keep current registrar until transfer is approved.
- DNS/CDN/SSL: Cloudflare Free plan.
- Static frontend: Cloudflare Pages, or Nginx on AWS if Pages is not available.
- Backend: AWS Lightsail running Express and Vendure.
- Database: SQLite is only for local/internal demo use. Docker/AWS staging and production should use PostgreSQL.

## Public DNS Plan

Use Cloudflare DNS records similar to:

| Name | Type | Target | Purpose |
| --- | --- | --- | --- |
| `@` | CNAME/A | Cloudflare Pages or AWS frontend | Root website |
| `www` | CNAME | Cloudflare Pages or root | Public website |
| `api` | A | AWS Lightsail public IP | Express API, contact forms |
| `commerce` | A | AWS Lightsail public IP | Vendure Shop API, if exposed |
| `admin` | A | AWS Lightsail public IP | Vendure dashboard, preferably restricted |

Keep `admin` private/restricted if possible.

## Staging Beside The Old Site

Do not point `alvatechnology.com` or `www.alvatechnology.com` at this new site until the owner approves the final cutover. Keep the old website on those records and add staging records instead:

| Name | Type | Target | Purpose |
| --- | --- | --- | --- |
| `staging` | CNAME/A | Cloudflare Pages or AWS frontend | New internal frontend |
| `api-staging` | A | AWS Lightsail public IP | Staging Express API |
| `commerce-staging` | A | AWS Lightsail public IP | Staging Vendure Shop API |
| `admin-staging` | A | AWS Lightsail public IP | Staging Vendure dashboard |

Protect staging hostnames with Cloudflare Access. See [STAGING_AND_PAYMENTS.md](STAGING_AND_PAYMENTS.md).

## Frontend Runtime Config

The frontend loads `js/config.js` before `js/main.js`.

Local default:

```js
window.ALVA_API_BASE_URL = "";
window.ALVA_VENDURE_SHOP_API = "";
window.ALVA_STRIPE_PUBLISHABLE_KEY = "";
```

Cloudflare Pages + AWS example:

```js
window.ALVA_API_BASE_URL = "https://api.alvatechnology.com";
window.ALVA_VENDURE_SHOP_API = "https://commerce.alvatechnology.com/shop-api";
window.ALVA_STRIPE_PUBLISHABLE_KEY = "pk_live_...";
```

Staging example:

```js
window.ALVA_API_BASE_URL = "https://api-staging.alvatechnology.com";
window.ALVA_VENDURE_SHOP_API = "https://commerce-staging.alvatechnology.com/shop-api";
window.ALVA_STRIPE_PUBLISHABLE_KEY = "pk_test_...";
```

If the frontend and Express API are served from the same origin, leave `ALVA_API_BASE_URL` empty.

## Express Env

Copy `server/.env.example` to the deployed server's `.env` and fill:

```env
PORT=3000
CORS_ORIGIN=https://www.alvatechnology.com,https://alvatechnology.com
EMAIL_USER=
EMAIL_PASS=
SALES_EMAIL=
COMPANY_EMAIL=
PAYMENT_MODE=order_request
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

For production, do not leave `CORS_ORIGIN=*`.

Stripe secret values belong only in backend env files. The frontend must only receive `window.ALVA_STRIPE_PUBLISHABLE_KEY`, and that value must be a publishable key beginning with `pk_`.

## Vendure Env

Copy `vendure/.env.example` to `vendure/.env` on the server and fill production values:

```env
APP_ENV=production
NODE_ENV=production
PORT=2605
STOREFRONT_URL=https://www.alvatechnology.com
STOREFRONT_ORIGINS=https://www.alvatechnology.com,https://alvatechnology.com
COOKIE_SECRET=<long random secret>
SUPERADMIN_USERNAME=<admin username>
SUPERADMIN_PASSWORD=<strong password>

DB_TYPE=postgres
DB_HOST=postgres
DB_PORT=5432
DB_NAME=alva_staging
DB_USERNAME=alva_vendure
DB_PASSWORD=<database password>
DB_SYNCHRONIZE=false

PAYMENT_MODE=order_request
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_ALLOWED_METHODS=card,klarna
```

For a Docker Compose deployment, `DB_HOST` must be the Postgres service name on the Docker network, such as `postgres`, not `127.0.0.1`.

For a first empty staging database, `DB_SYNCHRONIZE=true` may be used only for the initial schema creation. Set it back to `false` once the first startup succeeds.

Before real paid orders:

- disable dev email mode
- configure real payment methods in Vendure Admin
- use Stripe test keys on staging before any live keys
- disable public GraphiQL/debug exposure
- protect dashboard access

## Local Smoke Commands

```powershell
npm.cmd --prefix server start
npm.cmd --prefix vendure run dev
npm.cmd --prefix vendure run build
```

## Current Public-Site Rule

The public site should behave as a product showcase and order-request flow. It should not imply final payment, inventory or delivery certainty until operations are ready.

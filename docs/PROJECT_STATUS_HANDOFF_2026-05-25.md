# AlvaTechWeb Project Status Handoff

Date: 2026-05-25  
Branch: `feature/nordic-ui-showroom-redesign`  
Workspace: `D:\AlvaTechWeb`

## Business Context

This project is not ready for a real commercial ecommerce launch, and that is expected.

The immediate business need is a public-facing website that can be used for:

- supplier negotiation
- boss/stakeholder presentation
- early market credibility
- brand/company presence
- product platform storytelling
- collecting interest or business inquiries

The product situation is early:

- final product prices are not confirmed
- physical samples have not arrived
- supply chain is not finalized
- formal fulfillment, warranty, tax, payment and after-sales process are not ready

Therefore the correct target is a **negotiation-ready public showcase site**, not a production ecommerce site.

Recommended positioning:

- Brand/company website
- Nordic editorial commerce style
- Product platform preview
- Request quote / contact / register interest
- No real payment
- No open public checkout until products, prices and operations are ready

## Current Overall State

The project is now suitable for a first public demo/showcase deployment if real purchasing is disabled or softened.

It is not suitable yet for:

- live paid orders
- real inventory management
- production customer data
- long-term order storage
- public Vendure dashboard exposure
- formal ecommerce operations

## Frontend Status

The frontend is a static multi-page site using plain HTML/CSS/JS modules.

Main pages:

- `index.html`
- `views/products.html`
- `views/product.html`
- `views/solutions.html`
- `views/solution-summer-house.html`
- `views/solution-field.html`
- `views/about.html`
- `views/support.html`
- `views/buy.html`
- `views/buy-product.html`
- `views/checkout.html`
- `views/order-confirmation.html`
- `views/b2b.html`
- `views/privacy-policy.html`

Frontend bootstrapping:

- `js/app/bootstrap.js`
- pages mount into `#page-content`
- page identity comes from `body data-page="..."`
- language comes from local storage via `js/services/language-service.js`

Visual direction:

- Nordic editorial commerce
- milk white / light green rhythm
- dark green accents
- image-led product/story sections
- fewer heavy cards
- large typography and whitespace

Recent UI/i18n cleanup covered:

- About page
- Products page
- Solutions page
- Buy page
- Buy-product/cart page
- Checkout page
- Order confirmation page
- Support page

The strongest language coverage is now `en` and `sv`. Other languages may still fall back to English or contain incomplete/older copy.

Important product route:

- 5-Pack Kit canonical route: `/views/product.html?slug=voltrix-5-pack-kit`

## Frontend Risk / Recommendation

Because prices and samples are not ready, public UI should avoid promising immediate purchase.

Recommended near-term change:

- replace or soften `Buy`, `Checkout`, `Place Order` language for public deployment
- use:
  - `Request quote`
  - `Request configuration`
  - `Contact Alva`
  - `Register interest`
  - `Talk to Alva`

Current checkout/Vendure order chain can remain for internal testing, but should not be promoted as a real public ecommerce flow.

## Backend Status

There are two backend concepts.

### 1. Old Express Server

Path: `server/`

Current role:

- static file serving
- B2B/contact/quote endpoints
- analytics/tracking leftovers

Old admin/order routes were removed/deprecated:

- old admin HTML pages under `views/admin/*` are gone
- old `/api/orders` route is no longer the intended order flow
- old custom admin should not be revived

The old Express server may still contain useful contact/B2B/analytics code, but it is no longer the commerce backend.

### 2. Vendure Backend

Path: `vendure/`

Current role:

- commerce backend
- Shop API
- Admin API
- Dashboard
- local SQLite database
- internal order review/admin workflow

Local URLs:

- Dashboard: `http://localhost:2605/dashboard`
- Shop API: `http://localhost:2605/shop-api`
- Admin API: `http://localhost:2605/admin-api`

Root package scripts:

- `npm run commerce:dev`
- `npm run commerce:server`
- `npm run commerce:worker`
- `npm run commerce:build`

Vendure scripts:

- `npm --prefix vendure run dev`
- `npm --prefix vendure run dev:server`
- `npm --prefix vendure run dev:worker`
- `npm --prefix vendure run build`
- `npm --prefix vendure run seed:alva`
- `npm --prefix vendure run catalog:disable-demo`
- `npm --prefix vendure run catalog:disable-demo:dry-run`
- `npm --prefix vendure run orders:cleanup`
- `npm --prefix vendure run orders:cleanup:dry-run`

## Vendure Configuration

Main config:

- `vendure/src/vendure-config.ts`

Key facts:

- port: `2605`
- DB: `better-sqlite3`
- DB file: `vendure/vendure.sqlite`
- Shop API path: `shop-api`
- Admin API path: `admin-api`
- Dashboard route: `dashboard`
- local CORS includes Live Server origins:
  - `http://localhost:5500`
  - `http://127.0.0.1:5500`
  - `http://localhost:3000`
  - `http://127.0.0.1:3000`
  - `http://localhost:5173`
  - `http://127.0.0.1:5173`
- credentials/cookies are enabled
- payment uses Vendure `dummyPaymentHandler`
- email plugin is in dev mode
- GraphiQL is enabled in dev
- custom order review plugin is installed:
  - `vendure/src/plugins/alva-order-review/alva-order-review.plugin.ts`

## Vendure Order Flow

Frontend Vendure client:

- `js/services/vendure-client.js`
- endpoint resolution defaults to:
  - `http://localhost:2605/shop-api`
  - or `http://127.0.0.1:2605/shop-api` when frontend is opened on `127.0.0.1`
- all Shop API requests use `credentials: "include"`

Cart sync:

- `js/services/vendure-cart-sync.js`
- maps local cart items to Vendure variants
- uses `js/data/vendure-mapping.js`

Guest checkout:

- `js/services/vendure-guest-checkout.js`
- sets customer
- sets shipping/billing address
- sets custom customer note field
- sets shipping method
- transitions order state
- adds dummy payment

Checkout page:

- `js/pages/checkout.js`

Order confirmation:

- `js/pages/order-confirmation.js`

## Order Notes

Customer checkout notes are stored in Vendure order custom field:

- `alvaCustomerNote`

This was added through the Alva order review plugin.

In Vendure Dashboard, the note should be visible on the order detail under custom fields / order custom fields.

## Order Review / Admin Logic

Vendure replaces the old custom admin.

Custom order review plugin supports review/cancel/expire/approve-style admin behavior:

- plugin path: `vendure/src/plugins/alva-order-review/alva-order-review.plugin.ts`
- custom fields include review status/note/reviewer metadata
- intended for internal operations through Vendure Dashboard/Admin API

Do not rebuild old admin unless there is a very specific reason.

## Database Status

Current database:

- SQLite file: `vendure/vendure.sqlite`
- good for local development and demos
- not suitable for production

SQLite is okay for:

- internal smoke testing
- local order chain validation
- demo catalog
- development handoff

SQLite is not okay for:

- public production ecommerce
- real customer/order records
- multiple operators
- reliable backups
- long-term operational data

For production ecommerce later:

- migrate Vendure to PostgreSQL
- disable dev GraphiQL/debug options
- use real migrations instead of `synchronize`
- configure backups
- configure real email
- configure real payment/manual invoice policy

## Catalog / Data Cleanup State

Scripts exist for local data maintenance:

- `vendure/src/scripts/seed-alva-catalog.ts`
- `vendure/src/scripts/disable-demo-catalog.ts`
- `vendure/src/scripts/cleanup-test-orders.ts`

Seeded Alva demo products:

- Voltrix 5-Pack Kit
- Voltrix Battery Module
- VoltDock

Seed product images use existing local project assets from `Picture/products/...`.

The demo catalog cleanup preserves `ALVA-` SKU products and `alva-products` collection.

Test order cleanup deletes local active draft orders, but skips placed/non-draft orders such as `PaymentAuthorized` to avoid unsafe deletion/foreign key issues.

## Current Deployment Recommendation

For the current business need, do not deploy full Vendure publicly yet.

Recommended Phase 1 deployment:

- deploy static frontend only
- use Cloudflare Pages / Netlify / Vercel
- buy and connect domain
- use HTTPS
- use official email addresses
- change public CTAs from purchase to inquiry
- optionally connect contact form to email/form service
- keep Vendure local/internal only

This is enough to show:

- brand seriousness
- product direction
- company story
- supplier-facing credibility
- early market presence

## What Is Missing For The “Boss/Supplier Website”

Must have:

- domain name
- static hosting
- HTTPS
- business email
- final-ish homepage/product/about/support content
- clear contact path
- privacy policy
- basic cookie notice if analytics/cookies are used
- product disclaimer
- no real public payment

Strongly recommended:

- replace visible purchase language with quote/contact language
- hide or gate checkout from public nav
- add supplier/partner-friendly CTA
- add company registration/contact details when available
- add better product/lifestyle images when samples arrive
- remove visible test pages from public deployment:
  - `views/vendure-test.html`
  - `views/vendure-checkout-test.html`

Not needed yet:

- production Vendure server
- PostgreSQL
- Stripe/Klarna
- inventory system
- fulfillment automation
- customer accounts
- real public admin operations

## Domain / Server Answer

Yes, a domain is needed.

A traditional server is not necessary for Phase 1 if we deploy a static showcase site.

Best simple path:

- domain from Cloudflare / Namecheap / Loopia / one.com
- DNS in Cloudflare
- static hosting in Cloudflare Pages, Netlify or Vercel
- email via Google Workspace, Microsoft 365, Zoho Mail, or domain provider email

For later ecommerce:

- deploy Vendure backend separately
- PostgreSQL database
- object/file storage for assets
- HTTPS reverse proxy
- backups
- monitoring
- production secrets

## Recommended Public Copy Strategy

Avoid:

- “Buy now”
- “Place order”
- “Available now”
- exact delivery promises
- exact performance promises not validated by samples

Use:

- “Request product information”
- “Discuss a configuration”
- “Register interest”
- “Pilot availability”
- “Specifications subject to final validation”
- “Designed as a modular platform”
- “Supplier and partner discussions ongoing”

## Suggested Next Sprint

Priority 1: Public showcase readiness

- decide domain
- pick hosting
- remove/gate public checkout
- convert purchase CTAs to inquiry CTAs
- add supplier/partner CTA
- review public English and Swedish copy
- remove test pages from deployment path
- confirm all images load from deployed URLs

Priority 2: Contact/inquiry handling

- configure business email
- connect B2B/contact form
- define where inquiries go
- add simple spam protection
- add success/error states

Priority 3: Light legal/compliance

- privacy policy
- cookie notice
- product/spec disclaimer
- company/contact info

Priority 4: Internal commerce demo

- keep Vendure local/internal
- maintain seeded Alva catalog
- use Dashboard for internal order demo only
- do not expose Dashboard publicly

Priority 5: Real ecommerce later

- finalize prices
- validate samples
- decide manual invoice vs online payment
- move Vendure DB from SQLite to PostgreSQL
- production deployment
- real email/payment/tax/shipping/fulfillment

## One-Sentence Executive Summary

The project is currently good enough to launch as a credible Alva showcase and supplier negotiation website, but it should be positioned as an inquiry-led product platform site, not a live ecommerce store.

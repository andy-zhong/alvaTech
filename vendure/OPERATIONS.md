# Vendure Operations

This file is the handoff reference for day-to-day Vendure admin work in the local Alva integration.

## Login

Use the Vendure server dashboard for normal admin work:

* Dashboard: `http://localhost:2605/dashboard`
* Admin API: `http://localhost:2605/admin-api`
* Shop API: `http://localhost:2605/shop-api`

Default local credentials from `.env.example`:

* Username: `superadmin`
* Password: `superadmin`

These credentials are for local development only. Production and shared environments must use named administrator accounts with role-based permissions.

## Account Permissions

Use the minimum role needed for the task:

* Catalog operators may read and update products, assets, collections, facets and product variants.
* Pricing operators may update variant prices, promotions and tax-related catalog settings only when that is part of their role.
* Fulfillment operators may read orders and update fulfillment-related order state.
* Administrator, channel, payment, shipping, tax, API key and system settings require explicit owner approval.

Do not use a shared superadmin account for routine work outside local development.

## Product, Price And Inventory Boundaries

Allowed routine actions:

* Create or update Alva products, descriptions, assets, facets, collections and enabled/disabled status.
* Create or update Alva product variants and SKUs.
* Update product variant prices in the active channel after confirming currency and tax expectations.
* Update stock levels only from the current source of truth for inventory.
* Disable products or variants that should be hidden from the storefront.

Local setup scripts may seed the compact Alva demo catalog and clean the generated Vendure demo catalog. In local SQLite only, `npm run setup:local` preserves `ALVA-` SKU products, keeps the `alva-products` collection public, marks other collections private, and removes non-Alva demo assets through Vendure APIs. Stop the Vendure server and worker first to avoid SQLite write locks.

For local test order cleanup, run `npm run orders:cleanup:dry-run` first, then `npm run orders:cleanup` when the listed local orders are safe to delete. This is only for local SQLite reset work.

Before changing prices or inventory, confirm whether the value is a test value, a planned operational change or data imported from another system. Avoid mixing seed/demo data with operational data.

## Order Boundaries

Allowed routine actions:

* Inspect orders, customer details, line items, totals, payment state, shipping state and history.
* Move orders through fulfillment steps only when the real-world order status matches the dashboard action.
* Add internal notes or metadata only when the field is intended for operations.

Do not manually change order state, payment state, refunds, shipping methods, tax, discounts or totals to force an order through unless there is a documented support procedure and approval from the owner of the commerce flow.

## Do Not Do

Do not:

* Run local setup or cleanup scripts against production or any shared database.
* Delete products, variants, customers or orders unless there is an approved retention/data cleanup task.
* Change channels, currencies, tax zones, payment methods, shipping methods, roles, API keys or system settings during routine catalog work.
* Store production secrets in `.env.example`, source control, screenshots or tickets.
* Use SQLite for production or shared persistent environments.
* Treat GraphiQL mutations as an operations shortcut for production changes.

## Before Production

Production is not ready until these requirements are met:

* Replace SQLite with PostgreSQL and run Vendure with production database migrations.
* Serve the dashboard, Admin API and Shop API over HTTPS.
* Replace default local credentials with named accounts, strong passwords and least-privilege roles.
* Disable or restrict development-only tools such as GraphiQL.
* Configure backup and restore for the PostgreSQL database and uploaded assets.
* Configure application, worker, access and error logs with retention and alerting.
* Configure secret management for database credentials, cookie/session secrets, payment credentials and integration keys.
* Verify payment, shipping, tax, email and fulfillment flows against production-like data.
* Document incident, rollback and data recovery procedures.

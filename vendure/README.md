# Vendure

This project was generated with [`@vendure/create`](https://github.com/vendurehq/vendure/tree/master/packages/create).

This directory is the standalone Vendure commerce backend for the existing Alva storefront. It uses SQLite for local development and listens on port `2605` so the current Express site can continue running on port `3000`.

Useful links:

- [Vendure docs](https://www.vendure.io/docs)
- [Vendure Discord community](https://www.vendure.io/community)
- [Vendure on GitHub](https://github.com/vendurehq/vendure)
- [Vendure plugin template](https://github.com/vendurehq/plugin-template)

## Directory structure

* `/src` contains the source code of your Vendure server. All your custom code and plugins should reside here.
* `/static` contains static (non-code) files such as assets (e.g. uploaded images) and email templates.

## Development

Copy `.env.example` to `.env` for local development. The default local port is:

```env
PORT=2605
```

```
npm run dev
```

starts the Vendure server, worker and Vite dashboard dev server in development mode.

For handoff and daily local operations, use the dashboard served by the Vendure server:

Local access points:

* Dashboard: `http://localhost:2605/dashboard`
* Shop API: `http://localhost:2605/shop-api`
* Admin API: `http://localhost:2605/admin-api`
* GraphiQL Shop API: `http://localhost:2605/graphiql/shop`
* GraphiQL Admin API: `http://localhost:2605/graphiql/admin`

Default local credentials:

* Username: `superadmin`
* Password: `superadmin`

### VS Code

The workspace launch file includes:

* `Vendure: Server` - runs `npm run dev:server` in `vendure/` and opens the Dashboard when ready.
* `Vendure: Worker` - runs `npm run dev:worker`.
* `Vendure: Dashboard Dev (development only)` - runs `npm run dev:dashboard` for dashboard plugin/UI development.
* `Vendure: Server + Worker` - default compound config for local handoff and daily validation.
* `Vendure: Server + Worker + Dashboard Dev` - development-only compound config when actively working on the dashboard app.

Use `Vendure: Server + Worker` when validating the storefront integration, because order state and background jobs expect both the server and worker to be available. Open `http://localhost:2605/dashboard` for admin work; do not start the Vite dashboard dev server unless you are changing dashboard code.

### Runtime files

Local Vendure state is intentionally file based:

* `vendure.sqlite` - SQLite database used by the local server.
* `.vendure/` - local Vendure runtime metadata such as the installation id.
* `static/assets/` - uploaded asset files.
* `static/email/test-emails/` - dev-mode email output.

These files are runtime artifacts and should not be treated as source fixtures unless a task explicitly calls for that.

## Storefront integration

The existing storefront calls the Shop API through `../js/services/vendure-client.js`. The current order path is Vendure-only: the old `/api/orders` checkout endpoint and old `/api/admin` order admin have been removed.

Clicking "Continue to checkout" on `/views/buy-product.html` syncs the local cart into the current Vendure `activeOrder` before continuing to the checkout page. The checkout page reads the Vendure `activeOrder`, displays a sync status, and submits guest checkout through Vendure. Orders should be reviewed in the Vendure Dashboard at `http://localhost:2605/dashboard`.

Local end-to-end check:

1. Start `Vendure: Server + Worker`.
2. Start the existing storefront server.
3. Add a product to the cart and continue from `/views/buy-product.html`.
4. Confirm the checkout page shows a Vendure order sync status.
5. Submit the checkout form with a supported local country such as `Sweden` or `SE`.
6. Confirm the order confirmation URL includes `source=vendure`.
7. Open `http://localhost:2605/dashboard` and search for the displayed order code.

Planned integration order:

1. `activeOrder` - show the current Vendure order in cart or checkout views. Implemented for the cart-to-checkout flow.
2. `addItemToOrder` - sync buy-product cart lines to Vendure variants and quantities. Implemented through the SKU mapping in `js/data/vendure-mapping.js`.
3. Guest checkout - collect guest customer, address, shipping, payment and order confirmation data through Vendure. Implemented with the local dummy payment method.
4. `products` - later, read Vendure product and variant data into the existing product listing/detail surfaces.

Keep each stage independently testable against `http://localhost:2605/shop-api` before broadening Vendure into the remaining storefront product surfaces.

## Alva local setup commands

Stop the Vendure server and worker before running setup scripts against SQLite, then run this after creating or resetting the local database:

```shell
npm run setup:local
```

`setup:local` runs `configure:alva`, `seed:alva` and `catalog:disable-demo` in sequence. `configure:alva` sets the default channel currency to `SEK`. `seed:alva` creates or updates the three initial Alva products, their channel prices, their local image assets and the `alva-products` collection.

If a SQLite cleanup or seed script reports `database is locked`, stop any running Vendure server/worker processes and run the script again. SQLite allows only one writer at a time, so concurrent local server, worker and script processes can contend for the same `vendure.sqlite` file.

`setup:local` is for local development state only. Review script output before using the dashboard for catalog checks, and do not run setup scripts against any shared or production database.

## Catalog cleanup

The local Vendure database may include demo catalog products from initial setup. To keep Alva products and remove demo items from the storefront without deleting data, stop the Vendure server and worker, then run:

```shell
npm run catalog:disable-demo:dry-run
npm run catalog:disable-demo
```

The cleanup is idempotent and is intended for local SQLite demo state. Products are preserved when they have at least one variant SKU beginning with `ALVA-`; enabled variants whose SKUs do not begin with `ALVA-` are disabled. Non-Alva collections are made private, demo product/category asset links are cleared, and non-Alva assets are deleted through Vendure's asset service. The Alva seed assets are tagged with `alva-seed` and are preserved. You can override the protected SKU prefix when needed:

```powershell
$env:ALVA_SKU_PREFIX = "ALVA-"; npm run catalog:disable-demo:dry-run
```

Review the dry-run output before applying. If future Alva SKUs use a different prefix, update the prefix or the script before running the apply command.

## Build

```
npm run build
```

will compile the TypeScript sources into the `/dist` directory.

## Production

For production, there are many possibilities which depend on your operational requirements as well as your production
hosting environment.

The Docker/AWS deployment should use PostgreSQL, not the local SQLite database. The server and worker must use the same image tag and the same env file:

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

In Docker Compose, `DB_HOST=postgres` means the Postgres service named `postgres` on the shared Docker network. Do not use `127.0.0.1` from inside the Vendure container.

For an empty staging database, `DB_SYNCHRONIZE=true` may be used for the first schema creation only. Change it back to `false` after the first successful startup.

Stripe environment values are backend-only except for the frontend publishable key in `js/config.js`. Never place `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` in frontend files.

### Running directly

You can run the built files directly with the `start` script:

```
npm run start
```

You could also consider using a process manager like [pm2](https://pm2.keymetrics.io/) to run and manage
the server & worker processes.

Docker files are present from the generated Vendure project, but local development currently uses SQLite and the npm/VS Code workflow above.

## Plugins

In Vendure, your custom functionality will live in [plugins](https://www.vendure.io/docs/plugins/).
These should be located in the `./src/plugins` directory.

To create a new plugin run:

```
npx vendure add
```

and select `[Plugin] Create a new Vendure plugin`.

## Migrations

[Migrations](https://www.vendure.io/docs/developer-guide/migrations/) allow safe updates to the database schema. Migrations
will be required whenever you make changes to the `customFields` config or define new entities in a plugin.

To generate a new migration, run:

```
npx vendure migrate
```

The generated migration file will be found in the `./src/migrations/` directory, and should be committed to source control.
Next time you start the server, and outstanding migrations found in that directory will be run by the `runMigrations()`
function in the [index.ts file](./src/index.ts).

For local development, `APP_ENV=dev` sets `dbConnectionOptions.synchronize` to `true` so a fresh ignored SQLite database can be created without committed migration files. For production or any persistent data environment, set `APP_ENV` to a non-dev value and use generated migrations instead.

---

You can also run any pending migrations manually, without starting the server via the "vendure migrate" command.

---

## Troubleshooting

### Error: Could not load the "sharp" module using the \[OS\]-x\[Architecture\] runtime when running Vendure server.

- Make sure your Node version is ^18.17.0 || ^20.3.0 || >=21.0.0 to support the Sharp library.
- Make sure your package manager is up to date.
- **Not recommended**: if none of the above helps to resolve the issue, install sharp specifying your machines OS and Architecture. For example: `pnpm install sharp --config.platform=linux --config.architecture=x64` or `npm install sharp --os linux --cpu x64`

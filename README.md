# AlvaTechWeb

Public Alva showcase site plus local commerce demo.

## Current target

The public site should work as a product showcase and inquiry/order-request entry. It should not be treated as a fully operational ecommerce launch until final prices, stock, fulfillment, warranty, tax, payment and support processes are confirmed.

## Main apps

- Static storefront: `index.html`, `views/`, `css/`, `js/`, `Picture/`
- Legacy Express server: `server/`
- Vendure commerce backend: `vendure/`

## Local commands

```powershell
npm.cmd --prefix server start
npm.cmd --prefix vendure run dev
npm.cmd --prefix vendure run build
```

Root shortcuts:

```powershell
npm.cmd run commerce:dev
npm.cmd run commerce:build
```

## Commerce rule

Frontend product content is static. Vendure is the source of truth for SKU availability and current price. Before cart checkout and order submission, the frontend refreshes backend prices and asks the visitor to review the cart if anything changed.

## Deployment note

For a first public launch, deploy the static storefront only and keep Vendure internal until real payment, shipping, tax and operating rules are ready.

See [docs/DEPLOYMENT_READY.md](docs/DEPLOYMENT_READY.md) for the Cloudflare + AWS connection plan, DNS records, and environment variables.
Use [docs/STAGING_AND_PAYMENTS.md](docs/STAGING_AND_PAYMENTS.md) to run the new site on a protected staging subdomain while the old public site remains on the live domain.

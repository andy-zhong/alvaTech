# Frontend Runtime Config Packaging

The tracked `js/config.js` must stay as safe local defaults:

```js
window.ALVA_API_BASE_URL = "";
window.ALVA_VENDURE_SHOP_API = "";
window.ALVA_STRIPE_PUBLISHABLE_KEY = "";
```

Do not edit it for staging or production. The packaging script copies the frontend into `dist/`, then generates an environment-specific `js/config.js` inside the zip.

## Environment Values

Put package-time values in the root `.env` file. `.env` is ignored by git.

```env
ALVA_STAGING_STRIPE_PUBLISHABLE_KEY=pk_test_...
ALVA_PRODUCTION_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

The backend URLs are fixed by the packaging script:

```text
staging API: https://staging-api.alvatechnology.se
staging Shop API: https://staging-api.alvatechnology.se/shop-api
production API: https://api.alvatechnology.se
production Shop API: https://api.alvatechnology.se/shop-api
```

Only Stripe publishable keys belong in the frontend package. Never put `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, database passwords, `COOKIE_SECRET`, or Vendure admin passwords into `js/config.js`.

## Command Line

Build staging:

```powershell
npm.cmd run package:frontend:staging
```

Build production:

```powershell
npm.cmd run package:frontend:production
```

Build both:

```powershell
npm.cmd run package:frontend
```

The zip files are written to `dist/`. Each package includes `package-info.txt`, which reports whether a Stripe publishable key was configured without printing the key.

During packaging, every HTML file in the zip is updated to load `js/config.js` with a package timestamp query, for example:

```html
<script src="../js/config.js?v=20260529-171500"></script>
```

This prevents the browser, 1Panel, or a CDN from reusing an older runtime config with empty Stripe values after a new upload.

## VS Code Launch Buttons

Use Run and Debug:

```text
Package Frontend: Staging
Package Frontend: Production
Package Frontend: Staging + Production
```

These launch configurations load `${workspaceFolder}/.env` and call the same npm scripts. The result is the same as running the command line package scripts manually.

## Upload Flow

1. Keep tracked `js/config.js` unchanged with empty defaults.
2. Set the required `ALVA_*_STRIPE_PUBLISHABLE_KEY` value in root `.env`.
3. Run the matching VS Code launch button or npm package command.
4. Upload the generated zip from `dist/` to 1Panel.
5. After deployment, verify the deployed `js/config.js` contains the expected public API URL, Shop API URL, and non-empty Stripe publishable key for that environment.
6. Verify the deployed checkout HTML references `js/config.js?v=...`, so the browser does not keep an older empty config.

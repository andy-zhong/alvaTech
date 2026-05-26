# Alva Technology Storefront Handover

## Overview

This project is a static multi-page storefront framework built with plain HTML, CSS, and JavaScript.

The current goal of the codebase is:

- preserve the premium Alva visual direction
- keep the project lightweight and static-host friendly
- support future expansion to more products
- support Swedish and English UI text
- provide a clear front-end structure for future team development

The implementation intentionally avoids introducing a heavy front-end framework.

## Current Front-End Architecture

The storefront is now split by responsibility instead of keeping all logic in one file.

### HTML entry pages

- `index.html`
- `views/products.html`
- `views/product.html`
- `views/buy.html`
- `views/buy-product.html`
- `views/about.html`
- `views/account.html`

Each page keeps a very small shell:

- `#navbar`
- `#page-content`
- `#footer`

All rendering is bootstrapped from `js/main.js`.

## JavaScript Structure

### Entry point

- `js/main.js`

Responsibilities:

- imports the app bootstrap
- starts the app

### App bootstrap

- `js/app/bootstrap.js`

Responsibilities:

- reads the current page from `body[data-page]`
- resolves language and route helpers
- mounts the shared header and footer
- mounts the correct page module
- binds shared language switching

### Data layer

- `js/data/i18n.js`
- `js/data/products.js`

Responsibilities:

- holds UI translations
- holds all product definitions
- acts as the single source of truth for product-driven rendering

### Service layer

- `js/services/language-service.js`
- `js/services/product-service.js`

Responsibilities:

- wraps data access
- provides reusable helper functions such as:
  - getting the stored language
  - translating UI labels
  - finding a product by slug
  - returning language-specific product content

### Utilities

- `js/utils/routes.js`

Responsibilities:

- handles root path differences between `index.html` and `views/*.html`
- builds URLs for:
  - product detail pages
  - product checkout pages
- reads the current slug from the URL

### Shared components

- `js/components/header.js`
- `js/components/footer.js`
- `js/components/language-picker.js`

Responsibilities:

- render reusable UI shared across all pages
- keep navigation logic and language UI out of page modules

### Page modules

- `js/pages/home.js`
- `js/pages/products.js`
- `js/pages/product-detail.js`
- `js/pages/buy.js`
- `js/pages/buy-product.js`
- `js/pages/about.js`
- `js/pages/account.js`

Responsibilities:

- each page module owns its own rendering
- page-specific interactions stay local to the page module
- examples:
  - homepage product carousel logic is in `js/pages/home.js`
  - checkout quantity stepper logic is in `js/pages/buy-product.js`

## CSS Structure

The CSS is now split into shared and page-level files, aggregated by `css/styles.css`.

### CSS entry file

- `css/styles.css`

Responsibilities:

- imports all CSS modules in a predictable order

### Shared CSS

- `css/base.css`
- `css/layout.css`
- `css/components.css`

Responsibilities:

- base reset and tokens
- main layout and shared containers
- buttons, navigation, cards, reusable visual elements

### Page CSS

- `css/pages/home.css`
- `css/pages/catalog.css`
- `css/pages/detail.css`
- `css/pages/checkout.css`

Responsibilities:

- keep page-specific styling separate from shared UI

## Product Model

Products are defined in:

- `js/data/products.js`

Current products:

- `product-1`
- `product-2`

Each product includes fields such as:

- `slug`
- `name`
- `shortName`
- `heroImage`
- `heroMedia`
- `gallery`
- `price`
- `status`
- `buyEnabled`
- `translations.en`
- `translations.sv`

Within each translation block, the current structure includes:

- `name`
- `shortName`
- `summary`
- `intro`
- `features`
- `certifications`
- `specs`
- `useCases`
- `faq`

## Product Media Support

Product detail pages now support:

- static images
- GIFs
- videos

Implementation notes:

- GIFs can be used as normal image files
- videos are supported through media objects with `type: "video"`

Recommended product media shape:

- `heroMedia: { type: "image" | "video", src: "...", alt: "..." }`
- `gallery: [{ type: "image" | "video", src: "...", alt: "..." }]`

Fallback behavior:

- if `heroMedia` is missing, the storefront still falls back to `heroImage`

## How To Add Product 3 Or Product 4

Future product placeholders are intentionally marked in:

- `js/data/products.js`

Comments already exist there for:

- Product 3
- Product 4

Recommended process:

1. Copy an existing product object.
2. Change the `slug`.
3. Update `name`, `shortName`, images, and content fields.
4. Add both `en` and `sv` translations.
5. Set `buyEnabled` according to readiness.

No extra routing code is required if the product shape is valid.

The new product will automatically appear in:

- homepage product showcase
- top navigation product dropdown
- products overview grid
- product detail page route
- buy hub
- product checkout route

## Routing Model

This storefront uses a static-friendly route model.

Current route examples:

- `index.html`
- `views/products.html`
- `views/product.html?slug=product-1`
- `views/buy.html`
- `views/buy-product.html?slug=product-1`

This was chosen to stay compatible with static hosting and lightweight local development.

## Internationalization

UI translations live in:

- `js/data/i18n.js`

Language behavior is handled in:

- `js/services/language-service.js`
- `js/components/language-picker.js`

Current languages:

- English
- Swedish

The selected language is stored in local storage under:

- `alva-language`

## Header And Navigation

The shared header is rendered from:

- `js/components/header.js`

Current behavior:

- logo links back to homepage
- `Products` in the top nav links directly to the product overview page
- hovering `Products` shows product-only entries
- language switcher is shared across all pages

## Checkout Integration Notes

The checkout UI is intentionally front-end only for now.

Payment provider placeholders exist for:

- Stripe
- Klarna
- Cards

No live payment integration is currently implemented.

Future integration work should most likely connect:

- front-end checkout state
- a backend checkout session
- stock validation
- customer/order persistence
- payment authorization and capture

Recommended future integration point:

- keep UI rendering in `js/pages/buy-product.js`
- connect real payment logic through API endpoints in the server layer

## Legacy / Historical Files

The repo still contains some older folders from earlier iterations, such as:

- `components/`
- some original simple HTML partials

These are no longer part of the active storefront rendering path.

Current storefront rendering is fully handled by:

- page HTML shells
- modular JS rendering
- modular CSS

If the team decides to fully clean the repo later, these legacy files can be reviewed and removed carefully.

## Recommended Team Workflow

### When updating product content

- edit `js/data/products.js`

### When updating shared UI labels

- edit `js/data/i18n.js`

### When changing navigation or footer behavior

- edit `js/components/header.js`
- edit `js/components/footer.js`

### When changing one specific page

- update the corresponding file in `js/pages/`

### When changing reusable styles

- prefer:
  - `css/base.css`
  - `css/layout.css`
  - `css/components.css`

### When changing page-only styles

- prefer the corresponding file in `css/pages/`

## Important Implementation Notes

- Keep the project static-first unless there is a strong reason to change that.
- Keep product additions data-driven.
- Avoid re-centralizing page logic into `js/main.js`.
- Avoid duplicating translation strings directly inside page modules.
- Keep payment UIs honest: do not imply live processing until real integrations exist.
- If a new team member adds Product 3 or Product 4, the preferred path is to extend the data model instead of duplicating HTML pages.

## Suggested Next Steps

Potential follow-up improvements, if needed later:

- create dedicated asset files for real product photography instead of SVG placeholders
- add product schema validation for safer content updates
- move repeated product translation shapes into typed templates if the team later adopts TypeScript
- add a development README section for local serving and testing
- remove legacy unused partials after team review

## Final Notes

This refactor was done to improve maintainability and team-readiness while keeping the storefront behavior close to the working first version.

The current codebase should now be significantly easier to extend without creating merge conflicts around a single large script file.

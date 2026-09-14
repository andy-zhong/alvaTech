# Alva Technology frontend responsive baseline

Audit date: 2026-09-03  
Baseline: current local worktree served from `http://localhost:3000`  
Audit mode: source inspection plus local browser validation; no production frontend files were changed.

## Scope and audit method

The following routes were inspected at 1440 px, 390 px, and 430 px:

| Page | Local route |
|---|---|
| Homepage | `/index.html` |
| Products | `/views/products.html` |
| Product detail (representative configurable product) | `/views/product.html?slug=voltrix-5-pack-kit` |
| Solutions | `/views/solutions.html` |
| Summer House products | `/views/products/summerhouse/` |
| Installer products | `/views/products/installer/` |
| Accessories | `/views/products/accessories/` |
| Support | `/views/support.html` |
| B2B / Contact | `/views/b2b.html` |

The cookie prompt was rejected through its real control before the content screenshots. CSS animation and reveal timing were disabled only in the browser audit context so full-page captures were deterministic. No source file was altered for capture.

Browser checks found zero horizontal overflow at all 27 page/width combinations, zero uncaught JavaScript errors, and zero failed asset requests.

## 1. Current breakpoint map

There is no single two-tier breakpoint. The code uses several overlapping tiers.

| Range / boundary | Current role | Important owners |
|---|---|---|
| `<= 420px` | very narrow mobile refinements | `css/components.css`, `css/mobile-redesign.css` |
| `<= 430px` | small phone typography/layout refinements | `css/components.css`, `css/mobile.css` |
| `<= 460px` | component-level compacting | `css/components.css` |
| `<= 560px` | narrow layout and product-detail media refinements | `css/layout.css`, `css/components.css`, `css/pages/detail.css` |
| `<= 600px` | compact cookie banner | `css/components/consent-banner.css` |
| `<= 620px` | About-only refinement | `css/pages/about.css` |
| `<= 640px` | behavioral mobile: estimator accordion, Support two-level accordions, product-detail disclosures, B2B one-column form | `js/components/setup-estimator.js`, `js/pages/support.js`, `js/pages/product-detail.js`, related CSS |
| `<= 720px` | Solutions page stacking/spacing | `css/pages/solutions.css` |
| `<= 760px` | assorted one-column/spacing changes | `css/pages/home.css`, `css/cart-additions.css`, `css/pages/legal.css` |
| `<= 767px` | homepage App media internal sizing | `css/pages/home.css` |
| `<= 860px` | principal responsive layout/navigation tier: mobile header, homepage hero gestures, product mobile nav, mobile redesign layer | `css/mobile.css`, `css/mobile-redesign.css`, `js/pages/home.js`, `js/components/section-nav.js` |
| `861–1023px` | intermediate/tablet state; global mobile layout is mostly off, but homepage Platform still uses its non-desktop carousel/link behavior | `css/pages/home.css`, `js/pages/home.js` |
| `>= 1024px` | protected homepage Platform desktop layout and in-page detail interaction; protected App desktop media balance | `css/pages/home.css`, `js/pages/home.js` |
| `<= 1080px` / `>= 1081px` | catalog and scenario column changes | `css/layout.css`, `css/pages/catalog.css`, `css/pages/detail.css` |
| `<= 1120px` / `>= 1121px` | Solutions and several wide-layout adjustments | `css/pages/solutions.css`, `css/pages/home.css`, consent/floating widget CSS |
| `>= 1440px` | widest Summer House/Installer hero composition | `css/pages/catalog.css` |

Breakpoint policy to use in future work:

- Treat `>= 1024px` as **homepage desktop protected**, especially Platform and App.
- Treat `<= 767px` as **phone presentation**, but remember that interactive accordion behavior starts at `<= 640px`.
- Treat `768–1023px` as a real intermediate range, not as an untested remainder.
- Treat `<= 860px` as the codebase's broad mobile/tablet layout tier.
- Check exactly 860 px when editing consent/header/global mobile rules: `min-width: 860px` in consent CSS overlaps rules using `max-width: 860px` at that exact pixel.

The late import order is important: `css/mobile.css` and then `css/mobile-redesign.css` load after page CSS through `css/styles.css`. They can override apparently correct page-specific rules.

## 2. Homepage responsive behavior map

### Current protected section order

1. Hero
2. Four platform principles
3. Platform / scenarios
4. Voltrix 5-Pack Kit
5. Smart Control / App
6. Add-ons
7. Planning estimator
8. Nordic conditions / Trust + Contact
9. Footer

The order, meaning, shared content data, technical values, and routes are shared unless a future task explicitly changes them.

### 2.1 Hero

**Shared**

- Same Summer House (`summerHouse`) and Installer (`field`) scenario data.
- Scenario buttons change the hero image, headline, body, and benefit text in place.
- Primary CTA routes to `/views/products.html`; secondary CTA anchors to `#platform-section`.
- Scenario data and labels come from `js/data/platform-content.js`.

**Desktop-only**

- Full-bleed photographic hero with copy, benefit strip, actions, and scenario tabs composed together.
- Scenario switching is button-driven; touch gestures are not bound above 860 px.

**Mobile-only**

- Image, tabs, copy, CTA, and compact benefits are vertically paced rather than being a compressed desktop overlay.
- CTA treatment becomes stacked/dominant-primary on narrow phones.
- Swipe/pointer gesture switching is enabled only when `matchMedia('(max-width: 860px)')` matches.

**Protected**

- Preserve the two real use cases, their imagery, and in-place switching.
- Do not turn scenario tabs into route links during visual-only work.

### 2.2 Four platform principles

**Shared**

- Same four principles, order, numbers `01–04`, titles, and meaning.

**Desktop-only**

- Four simultaneous columns with full descriptions and tags.

**Mobile-only**

- Compact numbered rows; long descriptive paragraphs are suppressed by the mobile presentation.

**Protected**

- Preserve the compact mobile treatment and the full desktop explanations. The structural `nth-child` rules in `css/pages/home.css` control tablet/mobile borders; reordering children can alter separators.

### 2.3 Platform / scenarios

**Shared**

- Same platform introduction, Summer House and Installer data, images, standalone destinations, and homepage position.
- Standalone destination routes remain `/views/solution-summer-house.html` and `/views/solution-field.html`.

**Desktop-only (`>=1024px`)**

- Platform introduction is on the left.
- Summer House and Installer overview cards are both visible in two stable columns on the right.
- Clicking anywhere in a scenario overview, including its nested CTA, calls `preventDefault()`, keeps the homepage URL unchanged, reveals the matching `.platform-solution-detail`, and smooth-scrolls to the in-page detail area below the overview.
- Summer House click opens `data-solution-detail="summer-house"`; Installer opens `data-solution-detail="field"`.
- The CTA inside the newly opened lower detail panel still navigates to the standalone solution page.

**Mobile/tablet interaction (`<1024px`, visually phone-focused at `<=860px`)**

- One scenario is active at a time in the swipe/snap viewport, controlled by Summer House / Installer indicators.
- Inactive panels receive `aria-hidden` and `inert`.
- Manual tab selection, horizontal scrolling, and an 8-second in-view autoplay are available; reduced-motion disables autoplay motion.
- The overview CTA behaves as a normal link to its standalone solution page. It does not open the desktop lower detail panel.

**Protected — HIGH risk**

- Do not apply the single-scenario mobile composition at `>=1024px`.
- Do not replace desktop in-page opening with direct navigation.
- Preserve `data-solution-overview`, `data-solution-cta`, `data-solution-detail`, `data-solution-panels`, IDs, `aria-controls`, and the `min-width:1024px` JS/CSS boundary together.

### 2.4 Voltrix 5-Pack Kit

**Shared**

- Same fixed product, image, copy, and CTA destinations.
- Primary routes to `/views/product.html?slug=voltrix-5-pack-kit`; secondary routes to `/views/products.html`.

**Desktop-only**

- Wide editorial composition with heading/actions and a prominent product media area.

**Mobile-only**

- Vertical order, compact copy, full-width primary action, and product image centered as the focal object.

**Protected**

- Product identity, image, fixed 5 kWh starter-kit meaning, and routes.

### 2.5 Smart Control / App

**Shared**

- Exactly four slides in this order:
  1. `/Picture/products/apps/voltrix_app_inuse.png`
  2. `/Picture/products/apps/voltrix_app_effortless.png`
  3. `/Picture/products/apps/voltrix_app_energy-efficient.png`
  4. `/Picture/products/apps/voltrix_app_add.png`
- Slide 1 is the default. Four focusable dots control the same active index.
- One stable visual stage is used; transitions pause on hover/focus/pointer interaction and respect reduced motion.
- Same headline, introduction, and three feature meanings.

**Desktop-only (`>=1024px`)**

- Left copy and three feature rows; QR/download block visible; single media stage on the right.
- Current protected media stage: approximately `460 × 710 px`.
- Real-world photo uses a `4:3` frame at up to `460 × 345 px`, `object-fit: cover`, retaining phone/hand/hardware context.
- UI slides retain their phone treatment in an approximately `340 × 708 px` frame.

**Mobile-only (`<=767px` media sizing; mobile content at `<=860px`)**

- QR block hidden.
- One visual at a time, swipe/pointer interaction plus four dots.
- Stage is `351 × 430 px` at 390 px viewport; photo frame is approximately `351 × 236 px`; UI frame is approximately `236 × 430 px`.
- The real photo remains a contextual photograph, while UI images remain contained phone mockups. Fixed stage height prevents a visible section jump.
- Supporting feature descriptions are reduced/hidden while feature titles remain.

**Protected — HIGH risk**

- Do not force the real photo through UI/mockup sizing.
- Do not remove the desktop QR or expose it on phone.
- Keep slide data/order and both rendering modes synchronized with `bindAppShowcase()`.

### 2.6 Add-ons

**Shared**

- Same four items and whole-card links:
  - Backpack Power → `/views/product.html?slug=backpack-power`
  - VoltDock → `/views/product.html?slug=voltdock`
  - Bike accessory → `/views/product.html?slug=bike-accessory`
  - Solar tracking system → `/views/product.html?slug=solar-tracking-system`
- “Explore all accessories” remains a separate route to `/views/products/accessories/`.

**Desktop-only**

- All four items appear simultaneously in a restrained two-column editorial list/grid.
- Fine-pointer hover applies only a subtle image scale.

**Mobile-only**

- Horizontal snap/swipe rail; strong item image, name, and compact copy.
- Explanatory note is hidden; View all remains outside the rail.
- Drag protection (`user-select:none`, image drag disabled) avoids breaking swipe while the anchor remains keyboard-focusable/clickable.

**Protected**

- Whole-card links, slugs, horizontal swipe, and the distinct View-all responsibility.

### 2.7 Planning estimator

**Shared**

- Same Summer House / Installer scenario state, input data, quote destination, stored request summary, and calculations on homepage and Products.
- Architecture rule: one Voltrix group / PCS is recommended for 1–7 Battery Packs; counts above 7 add another group / PCS. Code uses `Math.ceil(packCount / 7)` for both ends of a calculated range.
- Examples implied by the calculation: 1–7 → 1 PCS, 8–14 → 2 PCS, 15–21 → 3 PCS.
- Primary “Request quote / Begär offert” links to `/views/b2b.html` and stores the estimate summary for message-field prefill.

**Desktop-only**

- Controls remain expanded and are presented alongside the result panel.
- Result explanatory details are open.

**Mobile-only (`<=640px` behavior)**

- Only the first control in the active scenario is open by default; opening another closes its siblings.
- Result explanatory details are closed.
- Compact result hierarchy hides price placeholders, prioritizes storage, packs, and recommended PCS, and makes quote the dominant action.

**Protected — HIGH risk**

- Do not modify calculation constants or the 7-pack divisor during layout work.
- Do not separate homepage and Products estimator behavior without an explicit product requirement.
- The metric CSS uses `nth-child` ordering; changing result metric order can silently change the mobile hierarchy.

### 2.8 Nordic conditions / Trust + Contact

**Shared**

- Verified proof values and descriptions:
  - `-20°C till +45°C` — Drifttemperatur
  - `IP65` — Damm- och vattenskydd
  - `2400 W PV` — Dual MPPT
  - `1600 VA` — 2400 VA peak
- Contact content and CTA destinations are shared: primary `/views/b2b.html`, secondary `/views/products.html`.

**Desktop-only**

- `NORDISKA / FÖRHÅLLANDEN` is a restrained two-line label.
- Four proof points sit in one horizontal band with value-first hierarchy and subtle vertical dividers; no cards or pills.
- Contact closing remains centered below a horizontal divider.

**Mobile-only**

- Label returns to one compact line.
- Proof points use a compact 2 × 2 grid with dividers, value first and muted description second.
- Contact actions stack vertically on narrow phones.

**Protected**

- Do not reintroduce the hidden Trust headline/body, giant hero, pills, cards, or specification-table styling.
- Preserve the exact values above and the current Contact layout.

### 2.9 Footer and global mobile shell

**Shared**

- Same company identity, legal/support links, contact entry, and footer content.

**Desktop-only**

- Full horizontal navigation and right-aligned footer aside.

**Mobile-only (`<=860px`)**

- Collapsed navigation/menu shell and left-aligned footer aside.
- Cookie banner becomes materially more compact at `<=600px` while preserving Accept, Reject, Customize, and privacy-policy access.

**Protected**

- Consent behavior and analytics wiring are outside visual layout scope. Do not treat hiding or resizing as permission to change consent state logic.

## 3. Other pages

### Products — `/views/products.html`

**Shared**

- Section/data hierarchy: hero → system composition → 5-Pack Kit → Add-ons → estimator → system components → specifications → closing CTA.
- Product/add-on relationships, slugs, specs, and estimator calculations are shared.
- Current public specs include NMC, 1–7 Battery Packs per Voltrix group / PCS, additional group above 7, 5 kWh kit, IP65, `-20°C to +45°C`, Wi-Fi/Bluetooth, app/cloud control.
- Hero and closing contact actions route to `/views/b2b.html`; product rows route to their product-detail slug.

**Desktop-only**

- System composition section is visible with image plus annotation list.
- Featured kit is a wide two-column editorial block.
- Add-ons and system products are broad multi-column/row presentations.
- Estimator controls and results are expanded.

**Mobile-only (`<=860px`, accordion behavior `<=640px`)**

- Sticky horizontal section nav links Kit, Add-ons, Planner, System, and Specs.
- System composition is intentionally hidden.
- Add-ons become a one-card-at-a-time horizontal snap rail with counter/arrows.
- System product descriptions are hidden and rows reduce to thumbnail/name/arrow.
- Estimator follows the compact behavior described above.

**Protected — HIGH risk**

- Keep the mobile section nav IDs and destination sections synchronized.
- Do not restore the hidden composition as a long mobile block.
- Keep estimator shared logic and PCS architecture identical to homepage.

### Product detail — `/views/product.html?slug=…`

**Shared**

- Product content comes from the shared product data layer; query-string slug selects the product.
- Gallery order is hero media followed by de-duplicated `product.gallery` media.
- Thumbnails, previous/next buttons, lightbox, Escape/arrow-key controls, and active index share the same media state.
- Product routes and product data remain identical across breakpoints.
- Commerce flags currently are `showPrices:false`, `showEstimatorPrices:false`, `allowCheckout:false`. Public price shows “Price coming soon”; advice routes to B2B. Products allowed to configure can enter the local cart flow, but checkout/payment remains disabled globally.

**Desktop-only**

- Hero uses media left and product copy/actions right.
- Representative 5-Pack media stage measured `633 × 620 px` at 1440 px.
- Content panels/specifications use simultaneous columns; disclosure content is open.

**Mobile-only**

- Media and copy stack; media stage measured `351 × 296 px` at 390 and `387 × 327 px` at 430.
- Sticky section nav is visible.
- Elements marked `data-mobile-disclosure` are closed at initial render when `<=640px`; content is preserved in native `<details>` controls.

**Protected — HIGH risk**

- Do not create product-specific gallery logic when shared `getProductMedia()`/`initProductMediaViewer()` supports it.
- Do not alter shared product data or commerce flags during responsive styling.
- The global keydown handler controls gallery/lightbox navigation; avoid duplicate handlers.

### Solutions — `/views/solutions.html`

**Shared**

- Only Summer House and Installer scenarios are present.
- Routes are `/views/solution-summer-house.html` and `/views/solution-field.html`.
- Platform explanation remains after the selector.

**Desktop-only**

- Two large scenario cards appear simultaneously side by side with image, icon, label, copy, and CTA.

**Mobile-only (`<=720px`, reinforced by `<=860px` mobile redesign)**

- Scenario selector becomes an image-led vertical sequence without desktop card framing; large photography carries the hierarchy.

**Protected**

- Preserve the two scenario routes and selector role. Do not infer or add Marine.

### Summer House products — `/views/products/summerhouse/`

**Shared**

- Hero, three use-case meanings, recommended-product order, product-detail routes, and closing actions.
- Hero primary anchors to `#scenario-products`; secondary routes to Products.
- Recommendations: 5-Pack Kit, Battery Module, VoltDock, then mounting/contact.

**Desktop-only**

- Two-column hero with image on the right.
- Three use cases are simultaneous columns.
- Recommended products are wide rows with media, copy, and CTA.

**Mobile-only**

- Strong hero image is first, followed by concise copy and stacked actions.
- Use cases become divider-separated rows.
- Product recommendations become compact thumbnail/name/arrow rows with descriptions hidden.

**Protected**

- Preserve lifestyle imagery, recommendation order, real product slugs, and closing CTA routes (Products primary, B2B secondary).

### Installer products — `/views/products/installer/`

**Shared**

- Workflow meaning remains office/workshop charging → service van → work site.
- Hero primary anchors to `#scenario-products`; secondary routes to Products.
- Recommendations: Battery Module, VoltDock, Backpack Power, then mounting/contact.

**Desktop-only**

- Two-column hero; three workflow stages appear simultaneously; broad recommendation rows.

**Mobile-only**

- Hero image first; workflow stages and recommended products become compact divider rows.
- Primary closing CTA is Contact/B2B; Products remains secondary.

**Protected**

- Preserve workflow order and CTA reversal relative to Summer House.

### Accessories — `/views/products/accessories/`

**Shared**

- Hero, three category meanings, product list, slugs, and closing routes.
- Product detail list contains VoltDock, Backpack Power, Bike accessory, Wall Mounting, Stand Mounting, Solar tracking system.
- Solar tracking uses a real image and routes to `slug=solar-tracking-system`; mounting placeholders retain their current status independently.

**Desktop-only**

- Hero copy/image are side by side; category explanations use three columns; products use wide rows.

**Mobile-only (`<=640px` special case)**

- Hero image first and controls stack.
- VoltDock, the first product, becomes one stronger feature block with large image, visible description, and route.
- Remaining products stay compact thumbnail/name/arrow rows.

**Protected — MEDIUM/HIGH risk**

- The stronger mobile feature is positional: CSS targets the first `.product-scenario-product`. Reordering data changes which product is featured.
- Keep every row linked to the existing shared product-detail route.

### Support — `/views/support.html`

**Shared**

- All Instructions, FAQ, Troubleshooting, and CTA content is present at both sizes.
- Quick links retain anchors `#instructions`, `#faqs`, `#troubleshooting`.
- Contact routes to `/views/b2b.html`; secondary routes to Products.

**Desktop-only (`>640px`; an intermediate one-column adjustment starts at `<=900px`)**

- All three first-level groups and all twelve second-level rows are open.
- Headings, descriptions, and answers are displayed as expanded editorial information rows.

**Mobile-only (`<=640px`)**

- First level: the three major groups are native `<details>` and all default closed.
- Second level: each question/item is also native `<details>` and all default closed.
- Opening a quick-link target opens its first-level group before anchor navigation.
- Introductory text inside group summaries and quick-link descriptions is hidden to keep the index compact.

**Protected — HIGH risk**

- `bindSupportPage()` resets all open states whenever the 640 px media query changes. Do not remove `open` from desktop markup or the JS sync without checking both levels.
- Preserve all content inside accordions; mobile compactness must not mean data removal.

### B2B / Contact — `/views/b2b.html`

**Shared**

- Same fields: company, contact person, email, phone, and project/product request.
- Contact, email, phone, and message are required; email format is validated; errors use `aria-invalid` and field messages.
- Valid submissions POST JSON to `apiUrl('/api/b2b')` with status/success feedback.
- Estimator requests may prefill the message from query parameter `request` or session key `alva-estimator-request-summary`.
- Entry points include homepage Contact, estimator quote, Products, product detail, Installer, Support, footer, and main navigation.

**Desktop-only**

- Maximum form width is 720 px; company/contact and email/phone use two columns (`354 px + 354 px` measured at 1440).

**Mobile-only (`<=640px`)**

- Every form row becomes one column (`351 px` at 390, `387 px` at 430); submit spans the content width.

**Protected — HIGH risk**

- Do not break field `name` values, IDs, error targets, estimator prefill key, submit binding guard, or `/api/b2b` payload while changing layout.

## 4. Change-safety matrix

| Area | Shared | Desktop protected | Mobile-specific | Risk |
|---|---|---|---|---|
| Global header/footer | routes, identity, legal/contact content | full nav and horizontal composition | collapsed nav, left footer | Medium |
| Cookie banner | consent actions and policy link | wider action/copy layout | compact at `<=600px` | High |
| Homepage Hero | scenario data, in-place switching, CTAs | full-bleed composition | vertical pacing and gestures | High |
| Four principles | four items/order/meaning | four descriptions visible | compact numbered rows | Medium |
| Platform | content, section position, standalone routes | two scenario columns + in-page detail click at `>=1024px` | one active scenario, swipe/tab, normal route link | **Critical** |
| 5-Pack | product, image, routes | wide editorial layout | vertical product focal point | Medium |
| App | four-slide data/order | QR + 460×710 stage + separate photo/UI scale | no QR + swipe + 351×430 stage at 390 | High |
| Homepage Add-ons | four products/slugs + View all route | simultaneous editorial items | horizontal snap rail | High |
| Estimator | data and `ceil(packs/7)` PCS logic | expanded controls/details | first control only, collapsed detail | **Critical** |
| Trust + Contact | four factual specs and routes | one proof band + two-line label | 2×2 proof grid + stacked actions | High |
| Products | hierarchy, products/specs/routes | composition visible, broad rows | composition hidden, sticky nav, compact rows | High |
| Product detail | shared data/gallery/commerce flags | two-column hero, open panels | stacked hero, sticky nav, disclosures | High |
| Solutions | two scenarios/routes | two cards side by side | image-led vertical selector | Medium |
| Summer House | use cases/recommendations/routes | 2-col hero, 3 columns, wide rows | image-first and compact rows | Medium |
| Installer | workflow/recommendations/routes | 2-col hero, 3 columns, wide rows | image-first and compact rows | Medium |
| Accessories | categories/products/slugs | wide rows | first item featured, rest compact | High |
| Support | all content and anchors | all details open | two levels default closed | **Critical** |
| B2B / Contact | fields, validation, prefill, endpoint | 2-column paired fields | 1-column fields | High |

## 5. High-risk selectors, functions, and files

| File / symbol | Current behavior | Do not accidentally change |
|---|---|---|
| `js/pages/home.js` — `bindSolutionShowcase()` | Branches at `min-width:1024px`; desktop prevents link navigation and opens/scrolls to detail, smaller widths use carousel and normal links | Do not unify click handlers across sizes or remove `preventDefault()` only on desktop |
| `css/pages/home.css` — Platform rules under `@media (min-width:1024px)` | Restores left intro + two right cards and lower detail panel | Do not let broad mobile `.platform-solution-*` rules override these |
| `js/pages/home.js` — `bindScenarioTabs()` | Mobile-only swipe gesture at `max-width:860px`; shared button switching | Do not convert hero tabs to navigation links |
| `js/pages/home.js` — `bindAppShowcase()` | Shared active slide/dot/autoplay/pointer state for two media types | Do not duplicate desktop/mobile carousels with divergent state |
| `css/pages/home.css` — `.platform-app-slide--photo` / `--ui` and 767/1024 queries | Same outer stage, different internal frames | Do not force photo into UI aspect ratio; do not remove fixed mobile stage |
| `js/components/setup-estimator.js` — `MOBILE_ACCORDION_QUERY`, `resetEstimatorAccordion()`, `calculateInverterRange()` | 640 px accordion behavior and 7-pack PCS calculation | Do not change responsive layout and calculation in the same patch; preserve `ceil(packs/7)` |
| `css/components.css`, `css/pages/home.css`, `css/pages/catalog.css` — `.setup-estimator__metric:nth-child(...)` | Reorders/emphasizes result metrics by DOM position | Do not reorder result metrics without checking both homepage and Products at all widths |
| `js/pages/support.js` — `bindSupportPage()` | Opens every group/row on desktop, closes every group/row at `<=640px`, resyncs on breakpoint change | Do not make markup-only changes that fight the JS-owned `open` state |
| `js/pages/product-detail.js` — `getProductMedia()` / `initProductMediaViewer()` | One gallery state for stage, thumbnails, lightbox, keyboard | Do not add per-product or breakpoint-specific duplicate gallery handlers |
| `js/pages/product-detail.js` — initial `max-width:640px` disclosure close | Mobile-only collapse, desktop remains open | Do not remove `data-mobile-disclosure` or close content globally |
| `js/components/section-nav.js` | Binds only if page loads at `<=860px`; smooth-scroll and active state depend on stable IDs | Do not rename section IDs or assume resizing from desktop creates a newly bound nav |
| `css/mobile.css` and `css/mobile-redesign.css` | Late, broad overrides for shared classes such as `.showroom-*`, `.platform-*`, `.solution-*` | Scope new rules with `body[data-page]`; always inspect cascade after both files |
| `css/pages/catalog.css` — first-child Accessories selector | First product becomes the mobile feature block | Do not reorder recommendations without deciding whether the feature should change |
| `css/pages/home.css` — explicit section color selectors | Assigns backgrounds by semantic modifier after homepage reorder | Do not return to position-based section colors |
| `css/pages/home.css` — principle and Trust `nth-child` selectors | Tablet borders and mobile 2×2 dividers rely on child order | Do not insert arbitrary children into these grids |
| `css/components/consent-banner.css` | Uses `min-width:860px`, `max-width:1120px`, and `max-width:600px` | Check exactly 860 px because inclusive min/max rules overlap |
| `js/pages/b2b.js` — `initB2BForm()` / `prefillEstimateRequest()` | Shared validation, session prefill, and endpoint submission | Do not change field names/IDs or estimator storage key during CSS work |

No audited JavaScript currently moves/reorders major page sections in the DOM. The high risks come from viewport-branching event behavior, `open`/`hidden`/`inert` state, and late CSS overrides rather than DOM relocation.

## 6. Protected baseline summary

These areas require an explicit future instruction before alteration:

1. Homepage order listed above.
2. Desktop Platform at `>=1024px`: left intro, two simultaneous scenario cards, in-page detail expansion/scroll, unchanged URL.
3. Mobile Platform: one active scenario, indicators/swipe, normal standalone navigation from overview CTA.
4. App: exact four-slide order, contextual photo rendering, UI mockup rendering, desktop QR, mobile no-QR.
5. Homepage and Products estimator calculation: one PCS per 1–7 packs and another PCS above 7.
6. Support: desktop fully expanded; phone two-level accordion fully collapsed by default.
7. Product-detail shared gallery and globally disabled live commerce flags.
8. Homepage Add-ons whole-card routes and mobile swipe.
9. Trust values and desktop band/mobile 2×2 hierarchy.
10. Accessories mobile first-item feature behavior and compact remaining rows.
11. Stable section IDs/anchors used by mobile nav, quick links, and in-page scroll behavior.
12. Consent logic, B2B form logic, analytics, backend, checkout, and product data are not implied targets of responsive visual tasks.

## 7. Mandatory rules for future Codex tasks

Prepend these rules to future frontend prompts:

1. **Use the current local worktree as baseline and preserve unrelated dirty changes.**
2. **A mobile-only task must not change layout or interaction at `>=1024px`; verify 1440 px before completion.**
3. **A desktop-only task must be checked at 390 px and 430 px; also check 768–1023 px when touching shared selectors.**
4. **Do not treat `<=860px` and `<=640px` as equivalent.** Layout often changes at 860; accordion behavior changes at 640; Platform desktop changes at 1024.
5. **Do not change routing or event behavior during visual-only work.** In particular, preserve desktop homepage Platform in-page expansion and mobile Platform standalone navigation.
6. **Preserve section IDs, anchor destinations, `data-*` hooks, `aria-controls`, `hidden`, `inert`, and `<details>` structure unless the task explicitly covers interaction.**
7. **Shared content/data changes must be verified on homepage, Products, Product detail, and both phone widths where consumed.**
8. **Never modify estimator presentation and calculation logic in the same task unless both are explicitly requested; retain `Math.ceil(packs/7)`.**
9. **When editing App media, retain one carousel, the exact four-slide order, desktop QR, mobile no-QR, and separate photo/UI rendering.**
10. **When editing shared classes, inspect `css/mobile.css` and `css/mobile-redesign.css` because they load last. Prefer page-scoped selectors.**
11. **Do not use positional section background rules. Keep homepage color rhythm attached to semantic section modifier classes.**
12. **Always capture before/after at every affected breakpoint and check: horizontal overflow, console errors, failed assets, destination URL/scroll state, and keyboard-accessible controls.**
13. **Never infer a CSS-only patch is interaction-safe: test JS branches, resize/media-query state, anchor clicks, swipe, and accordion defaults.**
14. **Do not change Tracker, commerce flags, consent/GA4, backend, or unrelated pages unless they are named in the task.**

## 8. Screenshot evidence

Audit output directory (outside the frontend source tree):

`D:\DataHub\_tmp\alva-responsive-baseline-2026-09-03`

Full-page captures:

- `home--desktop-1440.jpg`, `home--mobile-390.jpg`, `home--mobile-430.jpg`
- `products--desktop-1440.jpg`, `products--mobile-390.jpg`, `products--mobile-430.jpg`
- `product-detail--desktop-1440.jpg`, `product-detail--mobile-390.jpg`, `product-detail--mobile-430.jpg`
- `solutions--desktop-1440.jpg`, `solutions--mobile-390.jpg`, `solutions--mobile-430.jpg`
- `summer-house--desktop-1440.jpg`, `summer-house--mobile-390.jpg`, `summer-house--mobile-430.jpg`
- `installer--desktop-1440.jpg`, `installer--mobile-390.jpg`, `installer--mobile-430.jpg`
- `accessories--desktop-1440.jpg`, `accessories--mobile-390.jpg`, `accessories--mobile-430.jpg`
- `support--desktop-1440.jpg`, `support--mobile-390.jpg`, `support--mobile-430.jpg`
- `b2b-contact--desktop-1440.jpg`, `b2b-contact--mobile-390.jpg`, `b2b-contact--mobile-430.jpg`

Desktop Platform interaction captures:

- `home-platform-after-summer-house--desktop-1440.jpg`
- `home-platform-after-field--desktop-1440.jpg`

Machine-readable metrics and interaction state are stored beside the screenshots in the corresponding `.json` files and `interaction-states.json`.

### Measured full-page heights

| Page | 1440 desktop | 390 mobile | 430 mobile |
|---|---:|---:|---:|
| Homepage | 6714 px | 6031 px | 6205 px |
| Products | 8480 px | 5784 px | 5999 px |
| Product detail | 3676 px | 4009 px | 3990 px |
| Solutions | 2058 px | 1983 px | 2034 px |
| Summer House | 3800 px | 2898 px | 3040 px |
| Installer | 3852 px | 2938 px | 3086 px |
| Accessories | 4359 px | 3406 px | 3559 px |
| Support | 3477 px | 1609 px | 1578 px |
| B2B / Contact | 1000 px | 1106 px | 1113 px |

All measured horizontal overflow values were `0 px`.

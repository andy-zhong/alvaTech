import { getAllProducts } from "../services/product-service.js";

const PRODUCT_ASSETS = {
  kit: {
    primaryImage: "/Picture/products/voltrix/voltrix02.png",
    hoverImage: "/Picture/products/voltrix/voltrix05.png",
    imageClass: "showroom-image--voltrix-kit",
    galleryImages: [],
  },
  base: {
    primaryImage: "/Picture/products/voltrix/voltrix05.png",
    hoverImage: "/Picture/products/voltrix/voltrix02.png",
    galleryImages: [],
  },
  battery: {
    primaryImage: "/Picture/products/battery/battery01.png",
    hoverImage: "/Picture/products/battery/battery04.jpg",
    galleryImages: [],
  },
  voltdock: {
    primaryImage: "/Picture/products/voltdock/voltdock01.png",
    hoverImage: "/Picture/products/voltdock/voltdock02.png",
    galleryImages: [],
  },
  backpack: {
    primaryImage: "/Picture/products/voltrix/field/field03.png",
    hoverImage: "/Picture/products/voltrix/field/field02.png",
    galleryImages: [],
  },
  mounting: {
    primaryImage: "/Picture/products/voltrix/summerhouse/summerhouse02.jpg",
    hoverImage: "/Picture/products/voltrix/voltrix04.png",
    galleryImages: [],
  },
  mobility: {
    primaryImage: "/Picture/products/voltrix/field/field01.png",
    hoverImage: "/Picture/products/voltrix/field/field03.png",
    galleryImages: [],
  },
};

const COMPOSITION_LABELS = [
  ["Base unit", "The slim energy core for the system."],
  ["Battery packs", "Expandable capacity in the same platform."],
  ["Mounting", "Clean support for installation and placement."],
  ["VoltDock", "A compact hub for devices and temporary desks."],
  ["Backpack Power", "Useful power closer to the point of use."],
  ["Mobility layer", "Selected support when one battery needs to move further."],
];

const SHOWROOM_PRODUCTS = [
  {
    key: "base",
    category: "Core system",
    name: "Voltrix Base",
    body: "The energy core for organizing, charging and expanding the Voltrix system.",
    slug: "voltrix-5-pack-kit",
  },
  {
    key: "battery",
    category: "Capacity",
    name: "Battery Pack",
    body: "Expandable capacity for home routines, outdoor use and selected field workflows.",
    slug: "voltrix-battery-module",
  },
  {
    key: "voltdock",
    category: "Add-on",
    name: "VoltDock",
    body: "A compact hub for devices, desks and temporary workstations.",
    slug: "voltdock",
  },
  {
    key: "backpack",
    category: "Add-on",
    name: "Backpack Power",
    body: "Carry useful power closer to where life or work happens.",
    href: "/views/b2b.html",
  },
  {
    key: "mounting",
    category: "Installation",
    name: "Mounting",
    body: "Clean installation support for the base unit and battery packs.",
    href: "/views/b2b.html",
  },
  {
    key: "mobility",
    category: "Mobility",
    name: "Mobility option",
    body: "Selected support for moving one battery further from the fixed setup.",
    href: "/views/b2b.html",
  },
];

const CAPACITY_RANGES = [
  {
    label: "Voltrix Starter",
    range: "1-5 kWh",
    body: "For cabins, terraces and lighter everyday routines.",
    note: "Recommended starting point: Voltrix 5-Pack Kit",
    href: "/products/starter/",
  },
  {
    label: "Voltrix Medium",
    range: "6-8 kWh",
    body: "For larger seasonal homes, longer stays and more outdoor use.",
    note: "Plan with Alva",
    href: "/products/medium/",
  },
  {
    label: "Voltrix Max",
    range: "9-12 kWh",
    body: "For extended autonomy, professional workflows and future expansion.",
    note: "Plan with Alva",
    href: "/products/max/",
  },
];

const ADDONS = [
  {
    key: "voltdock",
    name: "VoltDock",
    body: "For devices, desks and temporary workstations.",
    slug: "voltdock",
  },
  {
    key: "backpack",
    name: "Backpack Power",
    body: "For last-meter use and carrying useful power closer.",
    href: "/views/b2b.html",
  },
  {
    key: "mobility",
    name: "Mobility option",
    body: "For selected routines where one battery needs to move further.",
    href: "/views/b2b.html",
  },
];

const SPECS = [
  ["Battery chemistry", "NCM"],
  ["Battery expansion", "1-12 kWh per inverter/base setup"],
  ["5-Pack Kit capacity", "5 kWh"],
  ["More capacity", "Additional inverter/base setup required"],
  ["Outdoor readiness", "IP65"],
  ["Temperature range", "-20 C to +65 C"],
  ["Communication", "WiFi / Bluetooth"],
  ["Control", "Cloud platform / app"],
  ["Add-ons", "VoltDock, Backpack Power, mobility options"],
];

export function renderProductsPage({ productUrl }) {
  const productMap = new Map(getAllProducts().map((product) => [product.slug, product]));
  const productHref = (slug) => productMap.has(slug) ? productUrl(slug) : "/views/b2b.html";

  return `
    <section class="showroom-hero editorial-section">
      <div class="showroom-hero__copy">
        <span class="eyebrow">Products</span>
        <h1>The Voltrix system.</h1>
        <p>A modular battery platform built from a base unit, expandable battery packs, mounting options and portable add-ons.</p>
        <div class="showroom-actions">
          <a class="button button--primary" href="#featured-setup">Explore kits</a>
          <a class="button button--secondary" href="/views/b2b.html">Talk to Alva</a>
        </div>
      </div>
      ${renderImage(PRODUCT_ASSETS.kit, "Voltrix system", "showroom-hero__media")}
    </section>

    <section class="showroom-section showroom-section--sage showroom-composition editorial-section--soft" aria-labelledby="composition-title">
      <div class="showroom-section__head">
        <span class="eyebrow">System composition</span>
        <h2 id="composition-title">One system, built in layers.</h2>
        <p>Start with the Voltrix base. Add battery packs for capacity. Extend use with selected add-ons when power needs to move beyond the wall or closer to the work area.</p>
      </div>
      <div class="showroom-composition__body">
        ${renderImage(PRODUCT_ASSETS.base, "Voltrix base and battery platform", "showroom-composition__image")}
        <div class="showroom-annotation-list thin-divider-list">
          ${COMPOSITION_LABELS.map(([label, body]) => `
            <div class="showroom-annotation">
              <strong>${label}</strong>
              <span>${body}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="showroom-section showroom-featured editorial-section" id="featured-setup" aria-labelledby="featured-title">
      ${renderImage(PRODUCT_ASSETS.kit, "Voltrix 5-Pack Kit", "showroom-featured__image")}
      <div class="showroom-featured__copy">
        <span class="eyebrow">Featured setup</span>
        <h2 id="featured-title">Voltrix 5-Pack Kit</h2>
        <p>A fixed 5 kWh starting setup for seasonal homes, everyday energy support and expandable outdoor use.</p>
        <small>Includes five NCM battery modules. Actual performance depends on connected devices, installation and usage pattern.</small>
        <div class="showroom-actions">
          <a class="button button--primary" href="${productHref("voltrix-5-pack-kit")}">View kit</a>
          <a class="button button--secondary" href="/views/b2b.html">Contact Alva</a>
        </div>
      </div>
    </section>

    <section class="showroom-section showroom-section--sage showroom-capacity editorial-section--soft" aria-labelledby="capacity-title">
      <div class="showroom-section__head">
        <span class="eyebrow">Capacity guide</span>
        <h2 id="capacity-title">Choose a setup range before choosing a product.</h2>
        <p>Capacity ranges help frame a starting setup. They are guidance for planning, not separate purchasable kits.</p>
      </div>
      <div class="showroom-capacity-scale">
        ${CAPACITY_RANGES.map((item) => `
          <a class="showroom-capacity-range" href="${item.href}">
            <span>${item.label}</span>
            <strong>${item.range}</strong>
            <p>${item.body}</p>
            <small>${item.note}</small>
          </a>
        `).join("")}
      </div>
      <p class="showroom-note">These ranges are planning guidance. Actual performance depends on connected devices, installation and usage pattern.</p>
    </section>

    <section class="showroom-section editorial-section" aria-labelledby="showroom-title">
      <div class="showroom-section__head">
        <span class="eyebrow">Product showroom</span>
        <h2 id="showroom-title">A platform, not a wall of products.</h2>
      </div>
      <div class="showroom-product-list">
        ${SHOWROOM_PRODUCTS.map((item) => renderShowroomItem(item, productHref)).join("")}
      </div>
    </section>

    <section class="showroom-section showroom-addons editorial-section" aria-labelledby="addons-title">
      <div class="showroom-section__head">
        <span class="eyebrow">Add-ons</span>
        <h2 id="addons-title">Use the battery pack in more places.</h2>
        <p>Selected add-ons help the same Voltrix battery platform support desks, outdoor routines, service vans and last-meter tasks.</p>
      </div>
      <div class="showroom-addon-shelf product-shelf">
        ${ADDONS.map((item) => renderAddon(item, productHref)).join("")}
      </div>
    </section>

    <section class="showroom-section showroom-section--sage editorial-section--soft" aria-labelledby="specs-title">
      <div class="showroom-section__head">
        <span class="eyebrow">Specs</span>
        <h2 id="specs-title">System basics</h2>
      </div>
      <div class="showroom-spec-table spec-table">
        ${SPECS.map(([label, value]) => `
          <div class="showroom-spec-row">
            <span>${label}</span>
            <strong>${value}</strong>
          </div>
        `).join("")}
      </div>
      <p class="showroom-note">Runtime and performance depend on connected devices, installation and usage pattern.</p>
    </section>

    <section class="showroom-cta editorial-cta-band">
      <h2>Not sure where to start?</h2>
      <p>Talk to Alva about your home, cabin, team routine or field workflow.</p>
      <div class="showroom-actions">
        <a class="button button--primary" href="/views/b2b.html">Contact Alva</a>
        <a class="button button--secondary" href="/views/solutions.html">Explore solutions</a>
      </div>
    </section>
  `;
}

function renderShowroomItem(item, productHref) {
  const href = item.slug ? productHref(item.slug) : item.href;
  const asset = PRODUCT_ASSETS[item.key];

  return `
    <a class="showroom-product" href="${href}">
      ${renderImage(asset, item.name, "showroom-product__media")}
      <div class="showroom-product__copy">
        <span>${item.category}</span>
        <h3>${item.name}</h3>
        <p>${item.body}</p>
      </div>
      <span class="showroom-link">View product <b aria-hidden="true">-&gt;</b></span>
    </a>
  `;
}

function renderAddon(item, productHref) {
  const href = item.slug ? productHref(item.slug) : item.href;

  return `
    <a class="showroom-addon" href="${href}">
      ${renderImage(PRODUCT_ASSETS[item.key], item.name, "showroom-addon__media")}
      <strong>${item.name}</strong>
      <span>${item.body}</span>
    </a>
  `;
}

function renderImage(asset, alt, className) {
  const primaryImage = asset.primaryImage;
  const hoverImage = asset.hoverImage ?? asset.primaryImage;
  const imageClass = asset.imageClass ? ` ${asset.imageClass}` : "";

  return `
    <figure class="${className}${imageClass} showroom-image frameless-image-stage">
      <img class="showroom-image__primary" src="${primaryImage}" alt="${alt}">
      <img class="showroom-image__hover" src="${hoverImage}" alt="" aria-hidden="true">
    </figure>
  `;
}

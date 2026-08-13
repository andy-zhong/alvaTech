import { getAllProducts } from "../services/product-service.js";
import { bindSetupEstimator, renderSetupEstimator } from "../components/setup-estimator.js";
import { bindSectionNav } from "../components/section-nav.js";

const PRODUCT_ASSETS = {
  solarTracking: {
    placeholderLabel: "Coming soon",
  },
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
  compositionUsecase: {
    primaryImage: "/Picture/products/voltrix/summerhouse/summerhouse01-optimized.jpg",
    hoverImage: "/Picture/products/voltrix/summerhouse/summerhouse01-optimized.jpg",
    imageClass: "showroom-composition__image--usecase",
    galleryImages: [],
  },
  battery: {
    primaryImage: "/Picture/products/battery/battery01.png",
    hoverImage: "/Picture/products/battery/battery04.jpg",
    galleryImages: [],
  },
  inverter: {
    primaryImage: "/Picture/products/inverter/Inverter01.png",
    hoverImage: "/Picture/products/inverter/inverter02.png",
    galleryImages: [],
  },
  voltdock: {
    primaryImage: "/Picture/products/voltdock/voltdock01.png",
    hoverImage: "/Picture/products/voltdock/voltdock02.png",
    galleryImages: [],
  },
  backpack: {
    primaryImage: "/Picture/products/backpack/backpack_1inverter+1battery-optimized.jpg",
    hoverImage: "/Picture/products/backpack/backpack03-optimized.jpg",
    galleryImages: [],
  },
  mounting: {
    placeholderLabel: "Coming soon",
  },
  mobility: {
    primaryImage: "/Picture/products/bike/bike01-optimized.png",
    hoverImage: "/Picture/products/bike/bike02-optimized.jpg",
    galleryImages: [],
  },
};

const COMPOSITION_LABELS = [
  ["MODULAR STORAGE", "Start with the capacity you need today, then expand as routines grow."],
  ["SOLAR-READY SETUP", "Use available solar input and store useful energy for when it matters most."],
  ["SLIM FOOTPRINT", "A vertical setup designed for cabins, homes, terraces and compact spaces."],
  ["NORDIC READY", "Built for changing conditions, with outdoor-ready protection and all-season use."],
  ["BEYOND THE WALL", "Bring stored energy closer to terraces, gardens, vans and daily routines."],
  ["ONE BATTERY PLATFORM", "Use the same Battery Packs across home, outdoor and selected workday scenarios."],
];

const SHOWROOM_PRODUCTS = [
  {
    key: "base",
    category: "Core system",
    name: "Voltrix",
    body: "The energy core for organizing, charging and expanding the Voltrix system.",
    slug: "voltrix-5-pack-kit",
  },
  {
    key: "battery",
    category: "Capacity",
    name: "Battery Pack",
    body: "Expandable capacity for home routines, outdoor use and selected installer workflows.",
    slug: "voltrix-battery-module",
  },
  {
    key: "inverter",
    category: "Core system",
    name: "Inverter",
    body: "The inverter unit for building and expanding a Voltrix Battery Pack setup.",
    slug: "voltrix-inverter",
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
    slug: "backpack-power",
  },
  {
    key: "mobility",
    category: "Mobility",
    name: "Bike accessory",
    body: "Selected support for moving one battery further from the fixed setup.",
    slug: "bike-accessory",
  },
  {
    key: "mounting",
    category: "Installation",
    name: "Mounting",
    body: "Wall-mounted and freestanding support options for Voltrix battery setups.",
    href: "/views/products/accessories",
  },
  {
    key: "solarTracking",
    category: "Solar extension",
    name: "Solar tracking system",
    body: "A future solar-focused extension for summer house setups.",
    slug: "solar-tracking-system",
  },
];

const ADDONS = [
  {
    key: "backpack",
    title: "Backpack Power",
    body: "Carry Battery Packs further for outdoor tasks, garden projects and last-meter work.",
    image: "/Picture/products/backpack/backpack_1inverter+1battery-optimized.jpg",
    href: "/views/product.html?slug=backpack-power",
  },
  {
    key: "voltdock",
    title: "VoltDock",
    body: "Turn a Battery Pack into a compact hub for devices, lights and everyday power.",
    image: "/Picture/products/voltdock/voltdock01.png",
    href: "/views/product.html?slug=voltdock",
  },
  {
    key: "bike",
    title: "Bike accessory",
    body: "Move Battery Packs further with a light mobility add-on for local movement.",
    image: "/Picture/products/bike/bike01-optimized.png",
    href: "/views/product.html?slug=bike-accessory",
  },
  {
    key: "solarTracking",
    title: "Solar tracking system",
    body: "A future solar add-on for summer house setups that want to make more of available daylight.",
    note: "Coming soon.",
    image: null,
    href: "/views/product.html?slug=solar-tracking-system",
  },
];

const SPECS = [
  ["Battery chemistry", "NMC"],
  ["Battery expansion", "1-12 kWh per inverter/base setup"],
  ["5-Pack Kit capacity", "5 kWh"],
  ["More capacity", "Additional inverter/base setup required"],
  ["Outdoor readiness", "IP65"],
  ["Temperature range", "-20 C to +65 C"],
  ["Communication", "WiFi / Bluetooth"],
  ["Control", "Cloud platform / app"],
  ["Add-ons", "VoltDock, Backpack Power, mobility options"],
];

const VOLTRIX_KIT_URL = "/views/product.html?slug=voltrix-5-pack-kit";

export function renderProductsPage({ lang, productUrl }) {
  const copy = getProductsCopy(lang);
  const productMap = new Map(getAllProducts().map((product) => [product.slug, product]));
  const productHref = (slug) => productMap.has(slug)
    ? `/views/product.html?slug=${encodeURIComponent(slug)}`
    : "/views/b2b.html";
  const compositionLabels = copy.compositionLabels ?? COMPOSITION_LABELS;
  const showroomProducts = copy.showroomProducts ?? SHOWROOM_PRODUCTS;
  const addons = copy.addons ?? ADDONS;
  const specs = copy.specs ?? SPECS;

  return `
    <section class="showroom-hero editorial-section">
      <div class="showroom-hero__copy">
        <span class="eyebrow">${copy.productsEyebrow}</span>
        <h1>${copy.heroTitle}</h1>
        <p>${copy.heroBody}</p>
        <div class="showroom-actions">
          <a class="button button--primary" href="#featured-setup">${copy.exploreKits}</a>
          <a class="button button--secondary" href="/views/b2b.html">${copy.talkToAlva}</a>
        </div>
      </div>
      ${renderHeroMedia()}
    </section>

    ${renderProductsMobileNav(copy)}

    <section class="showroom-section showroom-section--sage showroom-composition editorial-section--soft" aria-labelledby="composition-title">
      <div class="showroom-section__head">
        <span class="eyebrow">${copy.compositionEyebrow}</span>
        <h2 id="composition-title">${copy.compositionTitle}</h2>
        <p>${copy.compositionBody}</p>
      </div>
      <div class="showroom-composition__body">
        ${renderImage(PRODUCT_ASSETS.compositionUsecase, "Voltrix in a summer house setting", "showroom-composition__image")}
        <div class="showroom-annotation-list thin-divider-list">
          ${compositionLabels.map(([label, body]) => `
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
        <span class="eyebrow">${copy.featuredEyebrow}</span>
        <h2 id="featured-title">Voltrix 5-Pack Kit</h2>
        <p>${copy.featuredBody}</p>
        <small>${copy.featuredNote}</small>
        <div class="showroom-actions">
          <a class="button button--primary" href="${VOLTRIX_KIT_URL}" data-product-link="voltrix-5-pack-kit">${copy.viewKit}</a>
          <a class="button button--secondary" href="/views/b2b.html">${copy.contactAlva}</a>
        </div>
      </div>
    </section>

    ${renderProductsAddOnsSection(copy, addons)}

    ${renderSetupEstimator({ context: "products" })}

    <section class="showroom-section editorial-section" id="system-components" aria-labelledby="showroom-title">
      <div class="showroom-section__head">
        <span class="eyebrow">${copy.showroomEyebrow}</span>
        <h2 id="showroom-title">${copy.showroomTitle}</h2>
      </div>
      <div class="showroom-product-list">
        ${showroomProducts.map((item) => renderShowroomItem(item, productHref, copy)).join("")}
      </div>
    </section>

    <section class="showroom-section showroom-section--sage editorial-section--soft" id="system-specs" aria-labelledby="specs-title">
      <div class="showroom-section__head">
        ${copy.specsEyebrow ? `<span class="eyebrow">${copy.specsEyebrow}</span>` : ""}
        <h2 id="specs-title">${copy.specsTitle}</h2>
      </div>
      <div class="showroom-spec-table spec-table">
        ${specs.map(([label, value]) => `
          <div class="showroom-spec-row">
            <span>${label}</span>
            <strong>${value}</strong>
          </div>
        `).join("")}
      </div>
      <p class="showroom-note">${copy.specsNote}</p>
    </section>

    <section class="showroom-cta editorial-cta-band">
      <h2>${copy.ctaTitle}</h2>
      <p>${copy.ctaBody}</p>
      <div class="showroom-actions">
        <a class="button button--primary" href="/views/b2b.html">${copy.contactAlva}</a>
        <a class="button button--secondary" href="/views/solutions.html">${copy.exploreSolutions}</a>
      </div>
    </section>
  `;
}

export function afterRenderProductsPage() {
  bindSetupEstimator();
  bindProductsMobileNav();
  bindProductAddOnRail();

  document.querySelectorAll("[data-product-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const slug = link.getAttribute("data-product-link");

      if (slug !== "voltrix-5-pack-kit") {
        return;
      }

      event.preventDefault();
      window.location.assign(VOLTRIX_KIT_URL);
    });
  });
}

function renderProductsMobileNav(copy) {
  const labels = copy.mobileNav ?? {
    kit: "Kit",
    addons: "Add-ons",
    planner: "Planner",
    system: "System",
    specs: "Specs",
  };

  return `
    <nav class="mobile-section-nav products-mobile-nav" aria-label="${copy.productsEyebrow}">
      <div class="mobile-section-nav__track">
        <a href="#featured-setup" data-section-link="featured-setup">${labels.kit}</a>
        <a href="#product-addons" data-section-link="product-addons">${labels.addons}</a>
        <a href="#setup-estimator" data-section-link="setup-estimator">${labels.planner}</a>
        <a href="#system-components" data-section-link="system-components">${labels.system}</a>
        <a href="#system-specs" data-section-link="system-specs">${labels.specs}</a>
      </div>
    </nav>
  `;
}

function bindProductsMobileNav() {
  bindSectionNav(document.querySelector(".products-mobile-nav"));
}

function bindProductAddOnRail() {
  const rail = document.querySelector(".showroom-product-addons__grid");
  const controls = document.querySelector(".showroom-product-addons__nav");
  if (!rail || !controls) return;

  const items = [...rail.querySelectorAll(".showroom-product-addon")];
  const previous = controls.querySelector("[data-addons-previous]");
  const next = controls.querySelector("[data-addons-next]");
  const current = controls.querySelector("[data-addons-current]");

  const getIndex = () => items.reduce((closest, item, index) => (
    Math.abs(item.offsetLeft - rail.scrollLeft) < Math.abs(items[closest].offsetLeft - rail.scrollLeft)
      ? index
      : closest
  ), 0);

  const update = () => {
    const index = getIndex();
    if (current) current.textContent = String(index + 1);
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === items.length - 1;
  };

  const move = (direction) => {
    const index = Math.min(items.length - 1, Math.max(0, getIndex() + direction));
    const target = items[index];
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (target) rail.scrollTo({ left: target.offsetLeft, behavior });
  };

  previous?.addEventListener("click", () => move(-1));
  next?.addEventListener("click", () => move(1));
  rail.addEventListener("scroll", () => window.requestAnimationFrame(update), { passive: true });
  update();
}

function renderShowroomItem(item, productHref, copy) {
  const href = item.slug ? productHref(item.slug) : item.href;
  const asset = item.placeholderLabel
    ? { ...PRODUCT_ASSETS[item.key], placeholderLabel: item.placeholderLabel }
    : PRODUCT_ASSETS[item.key];

  return `
    <a class="showroom-product" href="${href}">
      ${renderImage(asset, item.name, "showroom-product__media")}
      <div class="showroom-product__copy">
        <span>${item.category}</span>
        <h3>${item.name}</h3>
        <p>${item.body}</p>
      </div>
      <span class="showroom-link">${copy.viewProduct} <b aria-hidden="true">-&gt;</b></span>
    </a>
  `;
}

function renderHeroMedia() {
  return `
    <figure class="showroom-hero__media showroom-hero__media--cycle showroom-image frameless-image-stage">
      <img
        class="showroom-hero__cycle-image showroom-hero__cycle-image--product"
        src="${PRODUCT_ASSETS.kit.primaryImage}"
        alt="Voltrix system"
      >
      <img
        class="showroom-hero__cycle-image showroom-hero__cycle-image--usecase"
        src="/Picture/products/voltrix/summerhouse/summerhouse02-optimized.jpg"
        alt=""
        aria-hidden="true"
      >
    </figure>
  `;
}

function renderProductsAddOnsSection(copy, addons) {
  return `
    <section class="showroom-section showroom-product-addons editorial-section" id="product-addons" aria-labelledby="products-addons-title">
      <div class="showroom-product-addons__inner">
        <div class="showroom-section__head">
          <span class="eyebrow">${copy.addonsEyebrow}</span>
          <h2 id="products-addons-title">${copy.addonsTitle}</h2>
          <p>${copy.addonsBody}</p>
        </div>

        <div class="showroom-product-addons__grid">
          ${addons.map((item) => renderProductAddOnItem(item)).join("")}
        </div>

        <div class="showroom-product-addons__nav" aria-label="${copy.addonsTitle}">
          <span><b data-addons-current>1</b> / ${addons.length}</span>
          <div>
            <button type="button" data-addons-previous aria-label="${copy.previous}" title="${copy.previous}">&larr;</button>
            <button type="button" data-addons-next aria-label="${copy.next}" title="${copy.next}">&rarr;</button>
          </div>
        </div>

        <div class="showroom-product-addons__footer">
          <p>${copy.addonsNote}</p>
          <a class="showroom-link" href="/views/products/accessories">${copy.exploreAccessories} <b aria-hidden="true">-&gt;</b></a>
        </div>
      </div>
    </section>
  `;
}

function renderProductAddOnItem(item) {
  const tag = item.href ? "a" : "article";
  const href = item.href ? ` href="${item.href}"` : "";

  return `
    <${tag} class="showroom-product-addon"${href}>
      <figure class="showroom-product-addon__media ${item.image ? "" : "showroom-product-addon__media--placeholder"}" aria-label="${escapeHtml(item.title)}">
        ${item.image
          ? `<img src="${item.image}" alt="${escapeHtml(item.title)}">`
          : `<span>${escapeHtml(item.title)}</span>`}
      </figure>
      <div class="showroom-product-addon__copy">
        <h3>${item.title}</h3>
        <p>${item.body}</p>
        ${item.note ? `<small>${item.note}</small>` : ""}
      </div>
    </${tag}>
  `;
}

function renderImage(asset, alt, className) {
  if (!asset?.primaryImage) {
    const label = asset?.placeholderLabel || alt;
    return `
      <figure class="${className} showroom-image showroom-image--placeholder frameless-image-stage" aria-label="${escapeHtml(alt)}">
        <span>${escapeHtml(label)}</span>
      </figure>
    `;
  }

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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getProductsCopy(lang) {
  const copies = {
    en: {
      heroTitle: "The Voltrix system.",
      heroBody: "A modular battery platform built from a base unit, expandable battery packs, mounting options and portable add-ons.",
      exploreKits: "Explore kits",
      talkToAlva: "Talk to Alva",
      compositionEyebrow: "System composition",
      compositionTitle: "One system, built in layers.",
      compositionBody: "Start with the Voltrix base. Add battery packs for capacity. Extend use with selected add-ons when power needs to move beyond the wall or closer to the work area.",
      featuredEyebrow: "Featured setup",
      featuredBody: "A fixed 5 kWh starting setup for seasonal homes, everyday energy support and expandable outdoor use.",
      featuredNote: "Includes five NMC battery modules. Actual performance depends on connected devices, installation and usage pattern.",
      viewKit: "View kit",
      contactAlva: "Contact Alva",
      showroomEyebrow: "Product showroom",
      showroomTitle: "A platform, not a wall of products.",
      addonsEyebrow: "Add-ons",
      addonsTitle: "Take Voltrix beyond the wall.",
      addonsBody: "Expand how Battery Packs are used with simple add-ons for everyday outdoor life, mobile routines and selected workday needs.",
      addonsNote: "Most add-ons pair with the same Battery Pack platform. Solar tracking system is a separate solar-focused extension.",
      exploreAccessories: "Explore accessories",
      specsEyebrow: "Specs",
      specsTitle: "System basics",
      specsNote: "Runtime and performance depend on connected devices, installation and usage pattern.",
      ctaTitle: "Not sure where to start?",
      ctaBody: "Talk to Alva about your home, cabin, team routine or installer workflow.",
      exploreSolutions: "Explore solutions",
      previous: "Previous",
      next: "Next",
      mobileNav: {
        kit: "Kit",
        addons: "Add-ons",
        planner: "Planner",
        system: "System",
        specs: "Specs",
      },
    },
    sv: {
      heroTitle: "Voltrix-systemet.",
      heroBody: "En modulär batteriplattform byggd av basenhet, expanderbara batteripack, monteringsval och portabla tillbehör.",
      exploreKits: "Utforska kit",
      talkToAlva: "Prata med Alva",
      compositionEyebrow: "Systemets uppbyggnad",
      compositionTitle: "Ett system, byggt i lager.",
      compositionBody: "Börja med Voltrix-basen. Lägg till batteripack för kapacitet. Utöka användningen med valda tillbehör när energi behöver flyttas bortom väggen eller närmare arbetsytan.",
      featuredEyebrow: "Utvald setup",
      featuredBody: "En fast 5 kWh-startsetup för fritidshus, vardaglig energistöd och expanderbar utomhusanvändning.",
      featuredNote: "Inkluderar fem NMC-batterimoduler. Faktisk prestanda beror på anslutna enheter, installation och användningsmönster.",
      viewKit: "Visa kit",
      contactAlva: "Kontakta Alva",
      showroomEyebrow: "Produktshowroom",
      showroomTitle: "En plattform, inte en vägg av produkter.",
      addonsEyebrow: "Tillbehör",
      addonsTitle: "Ta Voltrix bortom den fasta installationen.",
      addonsBody: "Utöka hur Battery Packs används med enkla tillbehör för vardag utomhus, mobila rutiner och utvalda arbetsbehov.",
      addonsNote: "De flesta tillbehör fungerar med samma Battery Pack-plattform. Solar tracking system är en separat solfokuserad utökning.",
      exploreAccessories: "Utforska tillbehör",
      specsEyebrow: "",
      specsTitle: "Specifikationer",
      specsNote: "Drifttid och prestanda beror på anslutna enheter, installation och användningsmönster.",
      ctaTitle: "Osäker på var du ska börja?",
      ctaBody: "Prata med Alva om ditt hem, din stuga eller teamets installatörsrutiner.",
      exploreSolutions: "Utforska lösningar",
      previous: "Föregående",
      next: "Nästa",
      mobileNav: {
        kit: "Kit",
        addons: "Tillbehör",
        planner: "Planera",
        system: "System",
        specs: "Specifikationer",
      },
    },
  };

  const baseCopy = {
    productsEyebrow: "Products",
    viewProduct: "View product",
  };
  const svData = {
    productsEyebrow: "Produkter",
    viewProduct: "Visa produkt",
    compositionLabels: [
      ["MODULÄR LAGRING", "Börja med kapaciteten du behöver idag och bygg ut när behoven ökar."],
      ["SOLREDO SETUP", "Använd tillgänglig solel och lagra användbar energi till när den behövs mest."],
      ["SMALT FORMAT", "En vertikal setup för stugor, hem, terrasser och kompakta ytor."],
      ["REDO FÖR NORDEN", "Byggd för skiftande förhållanden, med utomhusklassat skydd och användning över säsonger."],
      ["BORTOM VÄGGEN", "Flytta lagrad energi närmare terrasser, trädgårdar, servicebilar och vardagsrutiner."],
      ["EN BATTERIPLATTFORM", "Använd samma Battery Packs hemma, utomhus och i utvalda arbetsrutiner."],
    ],
    showroomProducts: [
      { key: "base", category: "Kärnsystem", name: "Voltrix Base", body: "Energikärnan för att organisera, ladda och bygga ut Voltrix-systemet.", slug: "voltrix-5-pack-kit" },
      { key: "battery", category: "Kapacitet", name: "Battery Pack", body: "Expanderbar kapacitet för hemrutiner, utomhusbruk och utvalda fältflöden.", slug: "voltrix-battery-module" },
      { key: "voltdock", category: "Tillbehör", name: "VoltDock", body: "En kompakt hubb för enheter, skrivbord och tillfälliga arbetsplatser.", slug: "voltdock" },
      { key: "backpack", category: "Tillbehör", name: "Backpack Power", body: "Bär användbar energi närmare platsen där livet eller arbetet sker.", slug: "backpack-power" },
      { key: "mounting", category: "Installation", name: "Montering", body: "Rent installationsstöd för basenheten och batteripack.", href: "/views/b2b.html", placeholderLabel: "Kommer snart" },
      { key: "mobility", category: "Mobilitet", name: "Bike accessory", body: "Utvalt stöd för att flytta ett batteri längre från den fasta setupen.", slug: "bike-accessory" },
    ],
    addons: [
      {
        key: "backpack",
        title: "Backpack Power",
        body: "Bär Battery Packs närmare utomhusaktiviteter, trädgårdsprojekt och praktisk energi där arbetet sker.",
        image: "/Picture/products/backpack/backpack_1inverter+1battery-optimized.jpg",
        href: "/views/product.html?slug=backpack-power",
      },
      {
        key: "voltdock",
        title: "VoltDock",
        body: "Gör ett Battery Pack till en kompakt hubb för enheter, belysning och vardagens energi.",
        image: "/Picture/products/voltdock/voltdock01.png",
        href: "/views/product.html?slug=voltdock",
      },
      {
        key: "bike",
        title: "Bike accessory",
        body: "Flytta Battery Packs längre med ett lätt mobilitetstillbehör för lokala rutiner.",
        image: "/Picture/products/bike/bike01-optimized.png",
        href: "/views/product.html?slug=bike-accessory",
      },
      {
        key: "solarTracking",
        title: "Solar tracking system",
        body: "Ett framtida soltillbehör för fritidshus som vill ta bättre vara på tillgängligt dagsljus.",
        note: "Kommer snart.",
        image: null,
        href: "/views/product.html?slug=solar-tracking-system",
      },
    ],
    specs: [
      ["Batterikemi", "NMC"],
      ["Batteriexpansion", "1-12 kWh per inverter/base setup"],
      ["5-Pack Kit-kapacitet", "5 kWh"],
      ["Mer kapacitet", "Ytterligare inverter/base setup krävs"],
      ["Utomhusklassning", "IP65"],
      ["Temperaturområde", "-20 C till +65 C"],
      ["Kommunikation", "WiFi / Bluetooth"],
      ["Kontroll", "Molnplattform / app"],
      ["Tillbehör", "VoltDock, Backpack Power, mobilitetsval"],
    ],
  };
  const selectedCopy = copies[lang] ?? copies.en;

  return lang === "sv"
    ? { ...baseCopy, ...selectedCopy, ...svData }
    : { ...baseCopy, ...selectedCopy };
}

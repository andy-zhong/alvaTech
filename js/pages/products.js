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
    primaryImage: "/Picture/products/voltrix/summerhouse/summerhouse02-optimized.jpg",
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

const VOLTRIX_KIT_URL = "/views/product.html?slug=voltrix-5-pack-kit";

export function renderProductsPage({ lang, productUrl }) {
  const copy = getProductsCopy(lang);
  const productMap = new Map(getAllProducts().map((product) => [product.slug, product]));
  const productHref = (slug) => productMap.has(slug)
    ? `/views/product.html?slug=${encodeURIComponent(slug)}`
    : "/views/b2b.html";
  const compositionLabels = copy.compositionLabels ?? COMPOSITION_LABELS;
  const showroomProducts = copy.showroomProducts ?? SHOWROOM_PRODUCTS;
  const capacityRanges = copy.capacityRanges ?? CAPACITY_RANGES;
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
      ${renderImage(PRODUCT_ASSETS.kit, "Voltrix system", "showroom-hero__media")}
    </section>

    <section class="showroom-section showroom-section--sage showroom-composition editorial-section--soft" aria-labelledby="composition-title">
      <div class="showroom-section__head">
        <span class="eyebrow">${copy.compositionEyebrow}</span>
        <h2 id="composition-title">${copy.compositionTitle}</h2>
        <p>${copy.compositionBody}</p>
      </div>
      <div class="showroom-composition__body">
        ${renderImage(PRODUCT_ASSETS.base, "Voltrix base and battery platform", "showroom-composition__image")}
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

    <section class="showroom-section showroom-section--sage showroom-capacity editorial-section--soft" aria-labelledby="capacity-title">
      <div class="showroom-section__head">
        <span class="eyebrow">${copy.capacityEyebrow}</span>
        <h2 id="capacity-title">${copy.capacityTitle}</h2>
        <p>${copy.capacityBody}</p>
      </div>
      <div class="showroom-capacity-scale">
        ${capacityRanges.map((item) => `
          <a class="showroom-capacity-range" href="${item.href}">
            <span>${item.label}</span>
            <strong>${item.range}</strong>
            <p>${item.body}</p>
            <small>${item.note}</small>
          </a>
        `).join("")}
      </div>
      <p class="showroom-note">${copy.rangeNote}</p>
    </section>

    <section class="showroom-section editorial-section" aria-labelledby="showroom-title">
      <div class="showroom-section__head">
        <span class="eyebrow">${copy.showroomEyebrow}</span>
        <h2 id="showroom-title">${copy.showroomTitle}</h2>
      </div>
      <div class="showroom-product-list">
        ${showroomProducts.map((item) => renderShowroomItem(item, productHref, copy)).join("")}
      </div>
    </section>

    <section class="showroom-section showroom-addons editorial-section" aria-labelledby="addons-title">
      <div class="showroom-section__head">
        <span class="eyebrow">${copy.addonsEyebrow}</span>
        <h2 id="addons-title">${copy.addonsTitle}</h2>
        <p>${copy.addonsBody}</p>
      </div>
      <div class="showroom-addon-shelf product-shelf">
        ${addons.map((item) => renderAddon(item, productHref)).join("")}
      </div>
    </section>

    <section class="showroom-section showroom-section--sage editorial-section--soft" aria-labelledby="specs-title">
      <div class="showroom-section__head">
        <span class="eyebrow">${copy.specsEyebrow}</span>
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

function renderShowroomItem(item, productHref, copy) {
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
      <span class="showroom-link">${copy.viewProduct} <b aria-hidden="true">-&gt;</b></span>
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
      featuredNote: "Includes five NCM battery modules. Actual performance depends on connected devices, installation and usage pattern.",
      viewKit: "View kit",
      contactAlva: "Contact Alva",
      capacityEyebrow: "Capacity guide",
      capacityTitle: "Choose a setup range before choosing a product.",
      capacityBody: "Capacity ranges help frame a starting setup. They are guidance for planning, not separate purchasable kits.",
      rangeNote: "These ranges are planning guidance. Actual performance depends on connected devices, installation and usage pattern.",
      showroomEyebrow: "Product showroom",
      showroomTitle: "A platform, not a wall of products.",
      addonsEyebrow: "Add-ons",
      addonsTitle: "Use the battery pack in more places.",
      addonsBody: "Selected add-ons help the same Voltrix battery platform support desks, outdoor routines, service vans and last-meter tasks.",
      specsEyebrow: "Specs",
      specsTitle: "System basics",
      specsNote: "Runtime and performance depend on connected devices, installation and usage pattern.",
      ctaTitle: "Not sure where to start?",
      ctaBody: "Talk to Alva about your home, cabin, team routine or field workflow.",
      exploreSolutions: "Explore solutions",
    },
    sv: {
      heroTitle: "Voltrix-systemet.",
      heroBody: "En modulär batteriplattform byggd av basenhet, expanderbara batteripack, monteringsval och portabla tillbehör.",
      exploreKits: "Utforska kit",
      talkToAlva: "Prata med Alva",
      compositionEyebrow: "Systemets uppbyggnad",
      compositionTitle: "Ett system, byggt i lager.",
      compositionBody: "Börja med Voltrix-basen. Lägg till batteripack för kapacitet. Utöka användningen med valda tillbehör när kraft behöver flyttas bortom väggen eller närmare arbetsytan.",
      featuredEyebrow: "Utvald setup",
      featuredBody: "En fast 5 kWh-startsetup för fritidshus, vardaglig energistöd och expanderbar utomhusanvändning.",
      featuredNote: "Inkluderar fem NCM-batterimoduler. Faktisk prestanda beror på anslutna enheter, installation och användningsmönster.",
      viewKit: "Visa kit",
      contactAlva: "Kontakta Alva",
      capacityEyebrow: "Kapacitetsguide",
      capacityTitle: "Välj setup-intervall innan du väljer produkt.",
      capacityBody: "Kapacitetsintervall hjälper till att rama in en startsetup. De är vägledning för planering, inte separata köpbara kit.",
      rangeNote: "Intervallen är planeringsstöd. Faktisk prestanda beror på anslutna enheter, installation och användningsmönster.",
      showroomEyebrow: "Produktshowroom",
      showroomTitle: "En plattform, inte en vägg av produkter.",
      addonsEyebrow: "Tillbehör",
      addonsTitle: "Använd batteripacket på fler platser.",
      addonsBody: "Valda tillbehör hjälper samma Voltrix-plattform att stödja skrivbord, utomhusrutiner, servicebilar och uppgifter nära arbetsplatsen.",
      specsEyebrow: "Specifikationer",
      specsTitle: "Systemgrunder",
      specsNote: "Drifttid och prestanda beror på anslutna enheter, installation och användningsmönster.",
      ctaTitle: "Osäker på var du ska börja?",
      ctaBody: "Prata med Alva om ditt hem, din stuga, teamets rutin eller fältarbete.",
      exploreSolutions: "Utforska lösningar",
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
      ["Basenhet", "Den smala energikärnan i systemet."],
      ["Batteripack", "Expanderbar kapacitet i samma plattform."],
      ["Montering", "Rent stöd för installation och placering."],
      ["VoltDock", "En kompakt hubb för enheter och tillfälliga arbetsplatser."],
      ["Backpack Power", "Användbar kraft närmare platsen där den behövs."],
      ["Mobilitetslager", "Utvalt stöd när ett batteri behöver flyttas längre."],
    ],
    showroomProducts: [
      { key: "base", category: "Kärnsystem", name: "Voltrix Base", body: "Energikärnan för att organisera, ladda och bygga ut Voltrix-systemet.", slug: "voltrix-5-pack-kit" },
      { key: "battery", category: "Kapacitet", name: "Battery Pack", body: "Expanderbar kapacitet för hemrutiner, utomhusbruk och utvalda fältflöden.", slug: "voltrix-battery-module" },
      { key: "voltdock", category: "Tillbehör", name: "VoltDock", body: "En kompakt hubb för enheter, skrivbord och tillfälliga arbetsplatser.", slug: "voltdock" },
      { key: "backpack", category: "Tillbehör", name: "Backpack Power", body: "Bär användbar kraft närmare platsen där livet eller arbetet sker.", href: "/views/b2b.html" },
      { key: "mounting", category: "Installation", name: "Montering", body: "Rent installationsstöd för basenheten och batteripack.", href: "/views/b2b.html" },
      { key: "mobility", category: "Mobilitet", name: "Mobilitetsval", body: "Utvalt stöd för att flytta ett batteri längre från den fasta setupen.", href: "/views/b2b.html" },
    ],
    capacityRanges: [
      { label: "Voltrix Starter", range: "1-5 kWh", body: "För stugor, terrasser och lättare vardagsrutiner.", note: "Rekommenderad startpunkt: Voltrix 5-Pack Kit", href: "/products/starter/" },
      { label: "Voltrix Medium", range: "6-8 kWh", body: "För större säsongsboenden, längre vistelser och mer utomhusbruk.", note: "Planera med Alva", href: "/products/medium/" },
      { label: "Voltrix Max", range: "9-12 kWh", body: "För längre autonomi, professionella arbetsflöden och framtida expansion.", note: "Planera med Alva", href: "/products/max/" },
    ],
    addons: [
      { key: "voltdock", name: "VoltDock", body: "För enheter, skrivbord och tillfälliga arbetsplatser.", slug: "voltdock" },
      { key: "backpack", name: "Backpack Power", body: "För sista metern och för att bära kraften närmare.", href: "/views/b2b.html" },
      { key: "mobility", name: "Mobilitetsval", body: "För utvalda rutiner där ett batteri behöver flyttas längre.", href: "/views/b2b.html" },
    ],
    specs: [
      ["Batterikemi", "NCM"],
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

  return lang === "sv" ? { ...baseCopy, ...selectedCopy, ...svData } : { ...baseCopy, ...selectedCopy };
}

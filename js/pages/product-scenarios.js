import { getAllProducts, getProductContent } from "../services/product-service.js";

const SCENARIO_ASSETS = {
  summerhouse: {
    hero: "/Picture/products/voltrix/summerhouse/summerhouse03-optimized.jpg",
    product: "/Picture/products/voltrix/voltrix02.png",
  },
  installer: {
    hero: "/Picture/products/voltrix/field/field02.png",
    product: "/Picture/products/voltrix/field/field03.png",
  },
  accessories: {
    hero: "/Picture/products/voltdock/voltdock07-optimized.jpg",
    product: "/Picture/products/voltdock/voltdock01.png",
  },
};

const ADD_ONS = {
  backpack: {
    name: "Backpack Power Mounting",
    image: "/Picture/products/voltrix/field/field03.png",
    category: "Portable use",
    body: "Mounting support for routines where one battery needs to move closer to the point of use.",
    href: "/views/b2b.html",
  },
  mounting: {
    name: "Mounting accessories",
    image: "/Picture/products/voltrix/summerhouse/summerhouse02-optimized.jpg",
    category: "Mounting",
    body: "Clean support for placement around the Voltrix base unit and battery packs.",
    href: "/views/b2b.html",
  },
};

const SCENARIO_COPY = {
  en: {
    summerhouse: {
      eyebrow: "For Summer house",
      title: "Power that follows summer house life outdoors.",
      body: "Keep useful energy close when everyday life moves beyond the walls - from the cabin to the terrace, garden, guest house or dock.",
      primary: "Explore summer house products",
      secondary: "View all products",
      usecaseEyebrow: "Use cases",
      usecaseTitle: "Built around the places summer house life actually happens.",
      usecases: [
        ["Terrace & garden", "Keep practical energy near outdoor seating, garden routines and small everyday devices without making the terrace feel technical."],
        ["Guest house & outdoor corners", "Use the same Voltrix platform around secondary spaces where useful power should be close, quiet and organized."],
        ["Dock, shed & seasonal routines", "Support selected outdoor routines with battery packs and add-ons where a fixed wall outlet is not the right answer."],
      ],
      productsEyebrow: "Recommended products",
      productsTitle: "Start with the platform, then add the parts that fit the routine.",
      ctaTitle: "Plan a summer house setup with Alva.",
      ctaBody: "Explore the full product range or talk to Alva about how Voltrix could fit your cabin, terrace, garden, guest house or dock.",
      ctaPrimary: "View all products",
      ctaSecondary: "Contact Alva",
    },
    installer: {
      eyebrow: "For Installer",
      title: "Practical power for installer routines.",
      body: "Charge battery packs at the office or workshop, bring them into the van, and use them where practical power is needed.",
      primary: "Explore installer products",
      secondary: "View all products",
      usecaseEyebrow: "Installer routines",
      usecaseTitle: "Organize power around the van, the route and the workday.",
      usecases: [
        ["Charge at the office or workshop", "Keep battery packs prepared before the day starts, without turning vehicle routines into a separate power project."],
        ["Bring energy into the van", "Move selected packs with the team so useful power is available for mobile work routines."],
        ["Use practical power on site", "Support charging, lighting, mobile desks and small-device routines where a compact power point helps the job move."],
      ],
      productsEyebrow: "Recommended products",
      productsTitle: "Products for battery packs, portable use and organized work vans.",
      ctaTitle: "Build an installer routine around Voltrix.",
      ctaBody: "Talk to Alva about vehicles, team routines and the type of devices your installation work needs to support.",
      ctaPrimary: "Contact Alva",
      ctaSecondary: "View all products",
    },
    accessories: {
      eyebrow: "Accessories",
      title: "Accessories that extend everyday energy.",
      body: "Add charging, mounting and portable options around the Voltrix platform without changing the way the system feels.",
      primary: "Explore accessories",
      secondary: "View all products",
      usecaseEyebrow: "Accessory categories",
      usecaseTitle: "Add-ons for charging, mounting and portable routines.",
      usecases: [
        ["Charging", "Use VoltDock and compatible battery packs around desks, devices and everyday charging points."],
        ["Mounting", "Keep the base unit, battery packs and selected accessories organized in the places they are used."],
        ["Portable use", "Extend selected summer house and installer routines with options that bring useful power closer."],
      ],
      productsEyebrow: "Product focus",
      productsTitle: "Accessories and add-ons around the Voltrix platform.",
      ctaTitle: "Choose add-ons around the system you already use.",
      ctaBody: "View the full product range or contact Alva if you need help matching accessories to a setup.",
      ctaPrimary: "View all products",
      ctaSecondary: "Contact Alva",
    },
    viewProduct: "View product",
    contactAlva: "Contact Alva",
  },
  sv: {
    summerhouse: {
      eyebrow: "För fritidshus",
      title: "Energi som följer fritidshuslivet utomhus.",
      body: "Keep useful energy close when everyday life moves beyond the walls - from the cabin to the terrace, garden, guest house or dock.",
      primary: "Utforska produkter för fritidshus",
      secondary: "Visa alla produkter",
      usecaseEyebrow: "Användning",
      usecaseTitle: "Byggt runt platserna där fritidshuslivet faktiskt händer.",
      usecases: [
        ["Terrass & trädgård", "Håll praktisk energi nära utemöbler, trädgårdsrutiner och mindre vardagsenheter utan att miljön känns teknisk."],
        ["Gästhus & uteplatser", "Använd samma Voltrix-plattform runt sekundära ytor där användbar kraft ska vara nära och organiserad."],
        ["Brygga, förråd & säsongsrutiner", "Stöd utvalda utomhusrutiner med batteripack och tillbehör där ett fast vägguttag inte passar."],
      ],
      productsEyebrow: "Rekommenderade produkter",
      productsTitle: "Börja med plattformen och lägg till delarna som passar rutinen.",
      ctaTitle: "Planera en fritidshussetup med Alva.",
      ctaBody: "Utforska hela produktutbudet eller prata med Alva om hur Voltrix kan passa stugan, terrassen, trädgården, gästhuset eller bryggan.",
      ctaPrimary: "Visa alla produkter",
      ctaSecondary: "Kontakta Alva",
    },
    installer: {
      eyebrow: "För installatörer",
      title: "Praktisk kraft för installatörsrutiner.",
      body: "Charge battery packs at the office or workshop, bring them into the van, and use them where practical power is needed.",
      primary: "Utforska produkter för installatörer",
      secondary: "Visa alla produkter",
      usecaseEyebrow: "Installatörsrutiner",
      usecaseTitle: "Organisera kraft runt bilen, rutten och arbetsdagen.",
      usecases: [
        ["Ladda på kontoret eller verkstaden", "Håll batteripack förberedda innan dagen börjar utan att fordonsrutinen blir ett separat energiprojekt."],
        ["Ta energi in i servicebilen", "Flytta utvalda pack med teamet så användbar kraft finns tillgänglig för mobila arbetsrutiner."],
        ["Använd praktisk kraft på plats", "Stöd laddning, belysning, mobila arbetsytor och mindre enhetsrutiner där en kompakt kraftpunkt hjälper arbetet vidare."],
      ],
      productsEyebrow: "Rekommenderade produkter",
      productsTitle: "Produkter för batteripack, portabel användning och organiserade servicebilar.",
      ctaTitle: "Bygg en installatörsrutin runt Voltrix.",
      ctaBody: "Prata med Alva om fordon, teamrutiner och vilken typ av enheter installationsarbetet behöver stödja.",
      ctaPrimary: "Kontakta Alva",
      ctaSecondary: "Visa alla produkter",
    },
    accessories: {
      eyebrow: "Tillbehör",
      title: "Tillbehör som utökar vardagens energi.",
      body: "Lägg till laddning, montering och portabla val runt Voltrix-plattformen utan att ändra hur systemet känns.",
      primary: "Utforska tillbehör",
      secondary: "Visa alla produkter",
      usecaseEyebrow: "Tillbehörskategorier",
      usecaseTitle: "Tillbehör för laddning, montering och portabla rutiner.",
      usecases: [
        ["Laddning", "Använd VoltDock och kompatibla batteripack runt skrivbord, enheter och vardagliga laddpunkter."],
        ["Montering", "Håll basenhet, batteripack och utvalda tillbehör organiserade på platserna där de används."],
        ["Portabel användning", "Utöka utvalda fritidshus- och installatörsrutiner med val som tar användbar kraft närmare."],
      ],
      productsEyebrow: "Produktfokus",
      productsTitle: "Tillbehör runt Voltrix-plattformen.",
      ctaTitle: "Välj tillbehör runt systemet du redan använder.",
      ctaBody: "Visa hela produktutbudet eller kontakta Alva om du vill matcha tillbehör med en setup.",
      ctaPrimary: "Visa alla produkter",
      ctaSecondary: "Kontakta Alva",
    },
    viewProduct: "Visa produkt",
    contactAlva: "Kontakta Alva",
  },
};

const RECOMMENDATIONS = {
  summerhouse: [
    { slug: "voltrix-5-pack-kit", category: "Core system" },
    { slug: "voltrix-battery-module", category: "Battery packs" },
    { slug: "voltdock", category: "Charging add-on" },
    { addOn: "mounting" },
  ],
  installer: [
    { slug: "voltrix-battery-module", category: "Battery packs" },
    { slug: "voltdock", category: "Charging add-on" },
    { addOn: "backpack" },
    { addOn: "mounting" },
  ],
  accessories: [
    { slug: "voltrix-battery-module", category: "Battery packs" },
    { slug: "voltdock", category: "Charging" },
    { addOn: "backpack" },
    { addOn: "mounting" },
  ],
};

export function renderProductScenarioPage({ lang, type }) {
  const copy = getScenarioCopy(lang, type);
  const asset = SCENARIO_ASSETS[type] ?? SCENARIO_ASSETS.summerhouse;
  const products = new Map(getAllProducts().map((product) => [product.slug, product]));
  const recommendations = RECOMMENDATIONS[type] ?? RECOMMENDATIONS.summerhouse;

  return `
    <section class="showroom-hero product-scenario-hero editorial-section">
      <div class="showroom-hero__copy">
        <span class="eyebrow">${copy.eyebrow}</span>
        <h1>${copy.title}</h1>
        <p>${copy.body}</p>
        <div class="showroom-actions">
          <a class="button button--primary" href="#scenario-products">${copy.primary}</a>
          <a class="button button--secondary" href="/views/products.html">${copy.secondary}</a>
        </div>
      </div>
      <figure class="showroom-hero__media product-scenario-hero__media frameless-image-stage">
        <img src="${asset.hero}" alt="${copy.eyebrow}">
      </figure>
    </section>

    <section class="showroom-section showroom-section--sage product-scenario-usecases editorial-section--soft" aria-labelledby="scenario-usecases-title">
      <div class="showroom-section__head">
        <span class="eyebrow">${copy.usecaseEyebrow}</span>
        <h2 id="scenario-usecases-title">${copy.usecaseTitle}</h2>
      </div>
      <div class="product-scenario-usecase-grid">
        ${copy.usecases.map(([title, body]) => `
          <article class="product-scenario-usecase">
            <h3>${title}</h3>
            <p>${body}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="showroom-section product-scenario-products editorial-section" id="scenario-products" aria-labelledby="scenario-products-title">
      <div class="showroom-section__head">
        <span class="eyebrow">${copy.productsEyebrow}</span>
        <h2 id="scenario-products-title">${copy.productsTitle}</h2>
      </div>
      <div class="showroom-product-list">
        ${recommendations.map((item) => renderRecommendation(item, products, copy, lang)).join("")}
      </div>
    </section>

    <section class="showroom-cta editorial-cta-band">
      <h2>${copy.ctaTitle}</h2>
      <p>${copy.ctaBody}</p>
      <div class="showroom-actions">
        <a class="button button--primary" href="${type === "installer" ? "/views/b2b.html" : "/views/products.html"}">${copy.ctaPrimary}</a>
        <a class="button button--secondary" href="${type === "installer" ? "/views/products.html" : "/views/b2b.html"}">${copy.ctaSecondary}</a>
      </div>
    </section>
  `;
}

function getScenarioCopy(lang, type) {
  const copies = SCENARIO_COPY[lang] ?? SCENARIO_COPY.en;
  return {
    ...SCENARIO_COPY.en[type],
    ...copies[type],
    viewProduct: copies.viewProduct ?? SCENARIO_COPY.en.viewProduct,
    contactAlva: copies.contactAlva ?? SCENARIO_COPY.en.contactAlva,
  };
}

function renderRecommendation(item, products, copy, lang) {
  if (item.slug) {
    const product = products.get(item.slug);
    if (!product) return "";

    const content = getProductContent(product, lang);
    return `
      <a class="showroom-product product-scenario-product" href="/views/product.html?slug=${encodeURIComponent(product.slug)}">
        <figure class="showroom-product__media showroom-image frameless-image-stage">
          <img src="${product.thumbnail ?? product.heroImage}" alt="${content.name}">
        </figure>
        <div class="showroom-product__copy">
          <span>${item.category}</span>
          <h3>${content.name}</h3>
          <p>${content.summary}</p>
        </div>
        <span class="showroom-link">${copy.viewProduct} <b aria-hidden="true">-&gt;</b></span>
      </a>
    `;
  }

  const addOn = ADD_ONS[item.addOn];
  if (!addOn) return "";

  return `
    <a class="showroom-product product-scenario-product" href="${addOn.href}">
      <figure class="showroom-product__media showroom-image frameless-image-stage">
        <img src="${addOn.image}" alt="${addOn.name}">
      </figure>
      <div class="showroom-product__copy">
        <span>${addOn.category}</span>
        <h3>${addOn.name}</h3>
        <p>${addOn.body}</p>
      </div>
      <span class="showroom-link">${copy.contactAlva} <b aria-hidden="true">-&gt;</b></span>
    </a>
  `;
}

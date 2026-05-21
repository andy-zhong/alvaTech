const RANGE_PATHS = {
  starter: "/products/starter/",
  medium: "/products/medium/",
  max: "/products/max/",
};

const COMPONENTS = [
  {
    name: "Voltrix base",
    body: "The fixed energy core for organizing the system.",
    image: "/Picture/products/voltrix/voltrix05.png",
  },
  {
    name: "Battery packs",
    body: "Expandable capacity inside the same platform.",
    image: "/Picture/products/battery/battery01.png",
  },
  {
    name: "VoltDock",
    body: "A compact hub for devices and temporary workstations.",
    image: "/Picture/products/voltdock/voltdock01.png",
  },
  {
    name: "Backpack Power",
    body: "Useful power closer to the point of use.",
    image: "/Picture/products/voltrix/field/field03.png",
  },
  {
    name: "Mounting",
    body: "Clean support for installation and placement.",
    image: "/Picture/products/voltrix/summerhouse/summerhouse02.jpg",
  },
];

const RANGES = {
  starter: {
    eyebrow: "Voltrix Starter",
    title: "A compact setup for cabins, terraces and everyday routines.",
    body:
      "A 1-5 kWh Voltrix system range for seasonal homes, lighter everyday energy needs and outdoor routines that start small and grow over time.",
    image: "/Picture/products/voltrix/1-12_battery/Voltrix_5b.png",
    imageAlt: "Voltrix Starter system range",
    primaryCta: { label: "View 5-Pack Kit", href: "/views/product.html?slug=voltrix-5-pack-kit" },
    secondaryCta: { label: "Talk to Alva", href: "/views/b2b.html" },
    fitTitle: "Made for smaller routines that still need flexibility.",
    fitBody:
      "Starter is for users who want a practical entry into the Voltrix platform - a compact setup that can support cabins, terraces, garden routines and selected everyday energy needs without overbuilding the system.",
    fitItems: [
      "Cabins and second homes",
      "Terraces and garden routines",
      "Smaller everyday energy needs",
      "Users who want a practical starting point",
    ],
    meaningTitle: "1-5 kWh system range.",
    meaningBody:
      "This range is a planning guide, not a single fixed product. Actual configuration depends on connected devices, installation and usage pattern.",
    specs: [
      ["Capacity range", "1-5 kWh"],
      ["System type", "Voltrix base + battery packs"],
      ["Expandable", "Yes"],
      ["Add-ons", "VoltDock, Backpack Power, mobility options"],
      ["Recommended path", "Start with Voltrix 5-Pack Kit"],
    ],
    pathEyebrow: "Popular setup",
    pathTitle: "Voltrix 5-Pack Kit",
    pathBody:
      "A fixed 5 kWh starting setup for seasonal homes, everyday energy support and expandable outdoor use. Includes five NCM battery modules. Actual performance depends on connected devices, installation and usage pattern. The 5-Pack Kit is a popular setup within the Starter range, not a separate competing category.",
    pathCta: { label: "View kit", href: "/views/product.html?slug=voltrix-5-pack-kit" },
    shelfTitle: "Build from one platform.",
    compareKey: "starter",
  },
  medium: {
    eyebrow: "Voltrix Medium",
    title: "More capacity for longer stays and flexible use.",
    body:
      "A 6-8 kWh Voltrix system range for larger summer houses, longer seasonal stays and outdoor routines that need more stored energy over time.",
    image: "/Picture/products/voltrix/1-12_battery/Voltrix_8b.png",
    imageAlt: "Voltrix Medium system range",
    primaryCta: { label: "Plan a Medium setup", href: "/views/b2b.html" },
    secondaryCta: { label: "Talk to Alva", href: "/views/b2b.html" },
    fitTitle: "For routines that grow beyond the starter range.",
    fitBody:
      "Medium is for users who expect more frequent use, longer stays or a wider mix of everyday and outdoor routines. It gives more room to plan capacity while staying within the same modular Voltrix platform.",
    fitItems: [
      "Larger summer houses",
      "Longer seasonal stays",
      "More frequent outdoor routines",
      "Users who expect to expand",
    ],
    meaningTitle: "6-8 kWh system range.",
    meaningBody:
      "This range is a planning guide, not a single fixed product. Actual configuration depends on connected devices, installation and usage pattern.",
    specs: [
      ["Capacity range", "6-8 kWh"],
      ["System type", "Voltrix base + battery packs"],
      ["Expandable", "Yes"],
      ["Add-ons", "VoltDock, Backpack Power, mobility options"],
      ["Recommended path", "Plan with Alva"],
    ],
    pathEyebrow: "Recommended path",
    pathTitle: "Build toward a Medium setup.",
    pathBody:
      "Start from the Voltrix base and add battery packs toward the 6-8 kWh range. Alva can help plan a configuration that fits your home, routines and expected use.",
    pathCta: { label: "Talk to Alva", href: "/views/b2b.html" },
    shelfTitle: "Use the same platform in more places.",
    compareKey: "medium",
  },
  max: {
    eyebrow: "Voltrix Max",
    title: "Extended capacity for demanding routines and future expansion.",
    body:
      "A 9-12 kWh Voltrix system range for extended autonomy, professional workflows and users planning the largest single inverter/base setup.",
    image: "/Picture/products/voltrix/1-12_battery/Voltrix_12b.png",
    imageAlt: "Voltrix Max system range",
    primaryCta: { label: "Plan a Max setup", href: "/views/b2b.html" },
    secondaryCta: { label: "Talk to Alva", href: "/views/b2b.html" },
    fitTitle: "For the largest single-platform setup.",
    fitBody:
      "Max is for users who need more capacity for extended routines, professional use or future expansion. It is suited for demanding seasonal homes, field teams and workflows where battery planning matters.",
    fitItems: [
      "Extended autonomy",
      "Professional workflows",
      "Field teams",
      "Users planning the largest single inverter/base setup",
    ],
    meaningTitle: "9-12 kWh system range.",
    meaningBody:
      "This range is a planning guide, not a single fixed product. More capacity beyond this range requires an additional inverter setup. Actual configuration depends on connected devices, installation and usage pattern.",
    specs: [
      ["Capacity range", "9-12 kWh"],
      ["System type", "Voltrix base + battery packs"],
      ["Expandable", "Up to 12 kWh per inverter/base setup"],
      ["More capacity", "Additional inverter/base setup required"],
      ["Add-ons", "VoltDock, Backpack Power, mobility options"],
      ["Recommended path", "Plan with Alva"],
    ],
    pathEyebrow: "Recommended path",
    pathTitle: "Plan the largest Voltrix range.",
    pathBody:
      "Build toward a 9-12 kWh setup with Alva's support. For larger needs, additional inverter setups may be required depending on installation and usage.",
    pathCta: { label: "Talk to Alva", href: "/views/b2b.html" },
    shelfTitle: "Extend the platform with compatible add-ons.",
    compareKey: "max",
  },
};

const COMPARE_RANGES = [
  { key: "starter", title: "Starter", range: "1-5 kWh" },
  { key: "medium", title: "Medium", range: "6-8 kWh" },
  { key: "max", title: "Max", range: "9-12 kWh" },
];

export function getSystemRangeTitle(type) {
  return `${RANGES[type]?.eyebrow ?? "Voltrix"} | Alva Technology`;
}

export function renderSystemRangePage({ type }) {
  const range = RANGES[type] ?? RANGES.starter;

  return `
    <section class="range-hero">
      <div class="range-hero__copy">
        <span class="eyebrow">${range.eyebrow}</span>
        <h1>${range.title}</h1>
        <p>${range.body}</p>
        <div class="range-actions">
          <a class="button button--primary" href="${range.primaryCta.href}">${range.primaryCta.label}</a>
          <a class="button button--secondary" href="${range.secondaryCta.href}">${range.secondaryCta.label}</a>
        </div>
      </div>
      <figure class="range-hero__media frameless-image-stage">
        <img src="${range.image}" alt="${range.imageAlt}">
      </figure>
    </section>

    <section class="range-section range-section--soft range-fit" aria-labelledby="range-fit-title">
      <div class="range-section__head">
        <span class="eyebrow">Who it fits</span>
        <h2 id="range-fit-title">${range.fitTitle}</h2>
        <p>${range.fitBody}</p>
      </div>
      <ul class="range-light-list">
        ${range.fitItems.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="range-section range-meaning" aria-labelledby="range-meaning-title">
      <div class="range-section__head">
        <span class="eyebrow">What this range means</span>
        <h2 id="range-meaning-title">${range.meaningTitle}</h2>
        <p>${range.meaningBody}</p>
      </div>
      <div class="range-spec-table">
        ${range.specs.map(([label, value]) => `
          <div class="range-spec-row">
            <span>${label}</span>
            <strong>${value}</strong>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="range-section range-section--soft range-path" aria-labelledby="range-path-title">
      <figure class="range-path__media frameless-image-stage">
        <img src="${range.image}" alt="">
      </figure>
      <div class="range-path__copy">
        <span class="eyebrow">${range.pathEyebrow}</span>
        <h2 id="range-path-title">${range.pathTitle}</h2>
        <p>${range.pathBody}</p>
        <a class="button button--primary" href="${range.pathCta.href}">${range.pathCta.label}</a>
      </div>
    </section>

    <section class="range-section range-components" aria-labelledby="range-components-title">
      <div class="range-section__head">
        <span class="eyebrow">Components and add-ons</span>
        <h2 id="range-components-title">${range.shelfTitle}</h2>
      </div>
      <div class="range-shelf">
        ${COMPONENTS.map((item) => `
          <article class="range-shelf__item">
            <figure class="range-shelf__media frameless-image-stage">
              <img src="${item.image}" alt="${item.name}">
            </figure>
            <strong>${item.name}</strong>
            <span>${item.body}</span>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="range-section range-section--soft range-compare" aria-labelledby="range-compare-title">
      <div class="range-section__head">
        <span class="eyebrow">Compare ranges</span>
        <h2 id="range-compare-title">Choose the planning range that fits the routine.</h2>
      </div>
      <div class="range-compare-strip">
        ${COMPARE_RANGES.map((item) => `
          <a class="range-compare-item ${item.key === range.compareKey ? "is-current" : ""}" href="${RANGE_PATHS[item.key]}">
            <span>${item.title}</span>
            <strong>${item.range}</strong>
          </a>
        `).join("")}
      </div>
    </section>

    <section class="range-cta">
      <h2>Plan the right Voltrix setup.</h2>
      <p>Use these ranges as a starting point, then confirm the final setup with Alva based on devices, installation and usage pattern.</p>
      <div class="range-actions">
        <a class="button button--primary" href="${range.primaryCta.href}">${range.primaryCta.label}</a>
        <a class="button button--secondary" href="/views/products.html">Back to products</a>
      </div>
    </section>
  `;
}

const ABOUT_COPY = {
  en: {
  eyebrow: "ABOUT ALVA",
  headline: "A Swedish energy company building practical green technology for everyday use.",
  body:
    "Alva Technology is a Swedish company focused on innovative green energy products that make clean power more flexible, useful and accessible in everyday life.",
  statementHeadline: "We believe energy should move closer to where life and work happen.",
  statementBody:
    "The energy transition is not only about producing cleaner electricity. It is also about making that energy easier to store, move and use in the places where people actually need it - at home, outdoors, on site and across daily routines.",
  buildEyebrow: "WHAT WE BUILD",
  buildHeadline: "Green energy products with a new sense of flexibility.",
  buildBody:
    "Alva develops modular energy systems designed to challenge how storage products are usually used. Instead of treating batteries as fixed equipment, we build platforms that can support compact installation, capacity expansion and portable use through compatible components.",
  buildPoints: [
    "Modular battery platforms",
    "Expandable energy storage",
    "Portable add-ons",
    "Nordic-ready product design",
  ],
  mattersHeadline: "From fixed storage to useful power in more places.",
  mattersBody:
    "Many energy products are designed around one fixed location. Alva takes a different approach. Our systems are built to support the routines around the product: seasonal homes, outdoor spaces, service vans, field teams and the moments when useful power needs to move beyond the wall.",
  swedishEyebrow: "SWEDISH BY DESIGN",
  swedishHeadline: "Designed for Nordic routines, weather and ways of living.",
  swedishBody:
    "As a Swedish company, Alva designs with Nordic conditions in mind: changing seasons, compact living spaces, outdoor routines and the practical need for reliable products that feel simple to use. Our goal is to combine technical innovation with calm, functional design.",
  philosophyHeadline: "Innovation should feel practical.",
  philosophyBody:
    "We focus on products that are not only technically advanced, but also understandable, modular and useful in real situations. For Alva, innovation means creating energy systems that fit into daily life instead of asking people to adapt their routines around the technology.",
  ctaHeadline: "Explore how Alva is building the next generation of flexible energy products.",
  productsButton: "View products",
  solutionsButton: "Explore solutions",
  },
  sv: {
    eyebrow: "OM ALVA",
    headline: "Ett svenskt energibolag som bygger praktisk grön teknik för vardagen.",
    body:
      "Alva Technology är ett svenskt bolag fokuserat på innovativa gröna energiprodukter som gör ren kraft mer flexibel, användbar och tillgänglig i vardagen.",
    statementHeadline: "Vi tror att energi ska flytta närmare platserna där livet och arbetet sker.",
    statementBody:
      "Energiomställningen handlar inte bara om att producera renare el. Den handlar också om att göra energin enklare att lagra, flytta och använda där människor faktiskt behöver den - hemma, utomhus, på plats och i vardagens rutiner.",
    buildEyebrow: "VAD VI BYGGER",
    buildHeadline: "Gröna energiprodukter med en ny känsla av flexibilitet.",
    buildBody:
      "Alva utvecklar modulära energisystem som utmanar hur lagringsprodukter vanligtvis används. I stället för att se batterier som fast utrustning bygger vi plattformar som stödjer kompakt installation, kapacitetsutbyggnad och portabel användning med kompatibla komponenter.",
    buildPoints: [
      "Modulära batteriplattformar",
      "Expanderbar energilagring",
      "Portabla tillbehör",
      "Produktdesign för nordiska förhållanden",
    ],
    mattersHeadline: "Från fast lagring till användbar kraft på fler platser.",
    mattersBody:
      "Många energiprodukter är byggda kring en fast plats. Alva arbetar annorlunda. Våra system är byggda för rutinerna runt produkten: fritidshus, utomhusmiljöer, servicebilar, fältteam och stunderna när användbar kraft behöver flytta bortom väggen.",
    swedishEyebrow: "SVENSK DESIGN",
    swedishHeadline: "Utformat för nordiska rutiner, väder och sätt att leva.",
    swedishBody:
      "Som svenskt bolag designar Alva med nordiska förhållanden i åtanke: skiftande årstider, kompakta ytor, utomhusrutiner och behovet av pålitliga produkter som känns enkla att använda. Målet är att kombinera teknisk innovation med lugn, funktionell design.",
    philosophyHeadline: "Innovation ska kännas praktisk.",
    philosophyBody:
      "Vi fokuserar på produkter som inte bara är tekniskt avancerade, utan också begripliga, modulära och användbara i verkliga situationer. För Alva betyder innovation att skapa energisystem som passar in i vardagen i stället för att kräva att människor anpassar sina rutiner efter tekniken.",
    ctaHeadline: "Utforska hur Alva bygger nästa generation flexibla energiprodukter.",
    productsButton: "Visa produkter",
    solutionsButton: "Utforska lösningar",
  },
};

function getRelativePath(page) {
  return window.location.pathname.includes("/views/") ? `./${page}` : `views/${page}`;
}

export function renderAboutPage({ lang } = {}) {
  const copy = ABOUT_COPY[lang] ?? ABOUT_COPY.en;
  const productsPath = getRelativePath("products.html");
  const solutionsPath = getRelativePath("solutions.html");

  return `
    <section class="about-hero section--milk">
      <div class="about-hero__inner">
        <div class="about-hero__copy">
          <span class="eyebrow">${copy.eyebrow}</span>
          <h1>${copy.headline}</h1>
          <p>${copy.body}</p>
        </div>
        <div class="about-visual" aria-hidden="true">
          <div class="about-visual__line"></div>
          <div class="about-visual__module about-visual__module--one"></div>
          <div class="about-visual__module about-visual__module--two"></div>
          <div class="about-visual__module about-visual__module--three"></div>
        </div>
      </div>
    </section>

    <section class="about-statement section--milk">
      <div class="about-statement__inner">
        <p>${copy.statementHeadline}</p>
        <div class="about-statement__body">${copy.statementBody}</div>
      </div>
    </section>

    <section class="about-build section--sage">
      <div class="about-build__inner">
        <div class="about-build__copy">
          <span class="eyebrow">${copy.buildEyebrow}</span>
          <h2>${copy.buildHeadline}</h2>
          <p>${copy.buildBody}</p>
        </div>
        <ul class="about-line-list" aria-label="What Alva builds">
          ${copy.buildPoints.map((point) => `<li>${point}</li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="about-split section--milk">
      <div class="about-split__inner">
        <div class="about-split__marker" aria-hidden="true">01</div>
        <div>
          <h2>${copy.mattersHeadline}</h2>
          <p>${copy.mattersBody}</p>
        </div>
      </div>
    </section>

    <section class="about-nordic section--sage">
      <div class="about-nordic__inner">
        <div class="about-nordic__visual" aria-hidden="true">
          <span>SE</span>
        </div>
        <div class="about-nordic__copy">
          <span class="eyebrow">${copy.swedishEyebrow}</span>
          <h2>${copy.swedishHeadline}</h2>
          <p>${copy.swedishBody}</p>
        </div>
      </div>
    </section>

    <section class="about-philosophy section--milk">
      <div class="about-philosophy__inner">
        <h2>${copy.philosophyHeadline}</h2>
        <p>${copy.philosophyBody}</p>
      </div>
    </section>

    <section class="about-cta section--sage">
      <div class="about-cta__inner">
        <h2>${copy.ctaHeadline}</h2>
        <div class="about-cta__actions">
          <a class="button button--primary" href="${productsPath}">${copy.productsButton}</a>
          <a class="button button--secondary" href="${solutionsPath}">${copy.solutionsButton}</a>
        </div>
      </div>
    </section>
  `;
}

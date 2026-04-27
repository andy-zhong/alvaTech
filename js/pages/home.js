import { getAllProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

const COPY = {
  en: {
    eyebrow: "VOLTRIX BY ALVA",
    heroTitle: ["One Battery", "for All"],
    heroPara:
      "The modular home energy hub. Store solar, power your home, and take the same battery anywhere.",
    browseLink: "Explore the system",
    stats: [
      { target: 12, suffix: "", label: "Battery modules" },
      { target: 2400, suffix: "W", label: "Peak AC output" },
      { target: 97, suffix: "%", label: "System efficiency" },
    ],
    featuresTitle: "Built for real life",
    features: [
      {
        title: "Grows with you",
        body: "Start with one module and scale to twelve without changing your core setup.",
      },
      {
        title: "Built for any weather",
        body: "IP65 protection and self-heating keep the system ready through Nordic seasons.",
      },
      {
        title: "One battery, everywhere",
        body: "Use the same energy core for the home, mobility and everyday outdoor use.",
      },
    ],
    configureBtn: "Configure System",
    ctaTitle: "One battery for all.",
    ctaBody: "Configure your Voltrix system, choose your capacity and continue directly to purchase.",
    ctaButton: "View all products",
  },
  sv: {
    eyebrow: "VOLTRIX AV ALVA",
    heroTitle: ["Ett batteri", "för allt"],
    heroPara:
      "Det modulära hemmaenergisystemet. Lagra solenergi, driv ditt hem och ta med batteriet vart du vill.",
    browseLink: "Utforska systemet",
    stats: [
      { target: 12, suffix: "", label: "Batterimoduler" },
      { target: 2400, suffix: "W", label: "Toppeffekt (AC)" },
      { target: 97, suffix: "%", label: "Systemverkningsgrad" },
    ],
    featuresTitle: "Byggt för verkligheten",
    features: [
      {
        title: "Växer med dig",
        body: "Börja med en modul och bygg ut till tolv utan att ändra grundsystemet.",
      },
      {
        title: "Byggt för alla väder",
        body: "IP65-skydd och självuppvärmning gör systemet redo för nordiska årstider.",
      },
      {
        title: "Ett batteri, överallt",
        body: "Använd samma energikärna för hemmet, mobilitet och vardagligt uteliv.",
      },
    ],
    configureBtn: "Konfigurera system",
    ctaTitle: "Ett batteri för allt.",
    ctaBody: "Konfigurera ditt Voltrix-system, välj kapacitet och gå vidare direkt till köp.",
    ctaButton: "Visa alla produkter",
  },
  fi: {
    eyebrow: "VOLTRIX BY ALVA",
    heroTitle: ["Yksi akku", "kaikkeen"],
    heroPara:
      "Modulaarinen kodin energiajärjestelmä. Varastoi aurinkoenergiaa, syötä kotia ja ota sama akku mukaasi.",
    browseLink: "Tutustu järjestelmään",
    stats: [
      { target: 12, suffix: "", label: "Akkumoduulia" },
      { target: 2400, suffix: "W", label: "Huippu AC-teho" },
      { target: 97, suffix: "%", label: "Järjestelmän hyötysuhde" },
    ],
    featuresTitle: "Rakennettu oikeaan arkeen",
    features: [
      {
        title: "Kasvaa tarpeidesi mukana",
        body: "Aloita yhdellä moduulilla ja laajenna kahteentoista ilman että perusratkaisua tarvitsee vaihtaa.",
      },
      {
        title: "Valmis kaikkiin sääoloihin",
        body: "IP65-suojaus ja itselämmitys pitävät järjestelmän valmiina pohjoisissa oloissa.",
      },
      {
        title: "Yksi akku kaikkialle",
        body: "Käytä samaa energiaydintä kotona, liikkeellä ja ulkona jokapäiväisessä käytössä.",
      },
    ],
    configureBtn: "Määritä järjestelmä",
    ctaTitle: "Yksi akku kaikkeen.",
    ctaBody: "Määritä Voltrix-järjestelmäsi, valitse kapasiteetti ja siirry suoraan ostoon.",
    ctaButton: "Katso kaikki tuotteet",
  },
  no: {
    eyebrow: "VOLTRIX BY ALVA",
    heroTitle: ["Ett batteri", "for alt"],
    heroPara:
      "Det modulære energisystemet for hjemmet. Lagre solenergi, driv hjemmet og ta med samme batteri hvor du vil.",
    browseLink: "Utforsk systemet",
    stats: [
      { target: 12, suffix: "", label: "Batterimoduler" },
      { target: 2400, suffix: "W", label: "Maks AC-effekt" },
      { target: 97, suffix: "%", label: "Systemeffektivitet" },
    ],
    featuresTitle: "Bygget for virkeligheten",
    features: [
      {
        title: "Vokser med deg",
        body: "Start med én modul og utvid til tolv uten å endre grunnoppsettet.",
      },
      {
        title: "Klar for all slags vær",
        body: "IP65-beskyttelse og selvoppvarming holder systemet klart gjennom nordiske årstider.",
      },
      {
        title: "Ett batteri, overalt",
        body: "Bruk samme energikjerne hjemme, på farten og i hverdagslig utendørsbruk.",
      },
    ],
    configureBtn: "Konfigurer system",
    ctaTitle: "Ett batteri for alt.",
    ctaBody: "Konfigurer Voltrix-systemet ditt, velg kapasitet og gå direkte videre til kjøp.",
    ctaButton: "Se alle produkter",
  },
  da: {
    eyebrow: "VOLTRIX BY ALVA",
    heroTitle: ["Ét batteri", "til alt"],
    heroPara:
      "Det modulære energisystem til hjemmet. Gem solenergi, forsyn hjemmet og tag det samme batteri med dig.",
    browseLink: "Udforsk systemet",
    stats: [
      { target: 12, suffix: "", label: "Batterimoduler" },
      { target: 2400, suffix: "W", label: "Maks AC-effekt" },
      { target: 97, suffix: "%", label: "Systemeffektivitet" },
    ],
    featuresTitle: "Bygget til virkeligheden",
    features: [
      {
        title: "Vokser med dig",
        body: "Start med ét modul og udvid til tolv uden at ændre den grundlæggende opsætning.",
      },
      {
        title: "Klar til alt slags vejr",
        body: "IP65-beskyttelse og selvopvarmning holder systemet klar gennem nordiske sæsoner.",
      },
      {
        title: "Ét batteri, overalt",
        body: "Brug den samme energikerne i hjemmet, på farten og i hverdagsbrug udendørs.",
      },
    ],
    configureBtn: "Konfigurer system",
    ctaTitle: "Ét batteri til alt.",
    ctaBody: "Konfigurer dit Voltrix-system, vælg kapacitet og fortsæt direkte til køb.",
    ctaButton: "Se alle produkter",
  },
};

const ICONS = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <polyline points="15 3 21 3 21 9"/>
     <polyline points="9 21 3 21 3 15"/>
     <line x1="21" y1="3" x2="14" y2="10"/>
     <line x1="3" y1="21" x2="10" y2="14"/>
   </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
   </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
   </svg>`,
];

export function renderHomePage({ lang }) {
  const copy = COPY[lang] ?? COPY.sv;

  return `
    <section class="hero hero--home">
      <div class="hero__shell">
        <div class="hero__copy">
          <span class="eyebrow hero__kicker">${copy.eyebrow}</span>
          <h1 class="hero__headline">${copy.heroTitle[0]}<br>${copy.heroTitle[1]}</h1>
          <p class="hero__sub">${copy.heroPara}</p>
          <a class="hero__explore" href="./views/products.html">
            ${copy.browseLink}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        <div class="showcase">
          <div class="showcase__stage">
            <button class="showcase__button" type="button"
                    data-direction="prev"
                    aria-label="${t(lang, "previousProduct")}"></button>

            <div class="product-visual" id="home-showcase"></div>

            <button class="showcase__button" type="button"
                    data-direction="next"
                    aria-label="${t(lang, "nextProduct")}"></button>
          </div>
        </div>
      </div>
    </section>

    <section class="home-stats">
      <div class="home-stats__inner">
        ${copy.stats.map((stat, index) => `
          <div class="home-stat reveal" style="--delay:${(index * 0.14).toFixed(2)}s">
            <strong class="home-stat__value"
                    data-counter-target="${stat.target}"
                    data-counter-suffix="${stat.suffix}">${stat.target}${stat.suffix}</strong>
            <p class="home-stat__label">${stat.label}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="home-features">
      <div class="home-section-inner">
        <h2 class="home-features__title reveal">${copy.featuresTitle}</h2>
        <div class="home-features__grid">
          ${copy.features.map((feature, index) => `
            <article class="home-feature reveal" style="--delay:${(index * 0.12).toFixed(2)}s">
              <div class="home-feature__icon">${ICONS[index] || ICONS[0]}</div>
              <h3 class="home-feature__title">${feature.title}</h3>
              <p class="home-feature__body">${feature.body}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="home-cta">
      <div class="home-section-inner">
        <div class="home-cta__card reveal reveal--scale">
          <h2 class="home-cta__title">${copy.ctaTitle}</h2>
          <p class="home-cta__body">${copy.ctaBody}</p>
          <a class="button button--primary home-cta__btn" href="./views/products.html">
            ${copy.ctaButton}
          </a>
        </div>
      </div>
    </section>
  `;
}

export function bindHomePage({ lang, productUrl, buyProductUrl }) {
  initCarousel(lang, productUrl, buyProductUrl);
  initScrollReveal();
  initCounters();
}

function initCarousel(lang, productUrl) {
  const target = document.getElementById("home-showcase");
  if (!target) return;

  const products = getAllProducts();
  if (!products.length) return;

  const copy = COPY[lang] ?? COPY.sv;
  let activeIndex = 0;
  let isAnimating = false;

  function paintProduct() {
    const product = products[activeIndex];
    const content = getProductContent(product, lang);
    const href = productUrl(product.slug);

    target.innerHTML = `
      <a class="product-visual__link" href="${href}" aria-label="${content.name}">
        <div class="product-visual__frame">
          <img src="${product.heroImage}" alt="${content.name}" draggable="false" loading="eager">
        </div>
      </a>
      <h2 class="product-visual__name">${content.name}</h2>
      <a class="button button--primary product-visual__configure" href="${href}">
        ${copy.configureBtn}
      </a>
    `;
  }

  function goTo(newIndex) {
    if (isAnimating || products.length <= 1) return;
    isAnimating = true;
    target.classList.add("is-fading");

    setTimeout(() => {
      activeIndex = (newIndex + products.length) % products.length;
      paintProduct();
      void target.offsetHeight;
      target.classList.remove("is-fading");
      isAnimating = false;
    }, 220);
  }

  const buttons = [...document.querySelectorAll(".showcase__button")];
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const delta = button.dataset.direction === "next" ? 1 : -1;
      goTo(activeIndex + delta);
    });
  });

  if (products.length <= 1) {
    buttons.forEach((button) => {
      button.hidden = true;
      button.setAttribute("aria-hidden", "true");
    });
  }

  paintProduct();
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const end = parseInt(element.dataset.counterTarget, 10);
      const suffix = element.dataset.counterSuffix || "";
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(end * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(element);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll("[data-counter-target]").forEach((element) => observer.observe(element));
}

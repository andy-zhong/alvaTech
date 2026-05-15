import { renderLanguagePicker } from "./language-picker.js";

const NAV_COPY = {
  en: {
    solutions: "Solutions",
    products: "Products",
    support: "Support",
    about: "About",
    contact: "Contact",
    summerHouse: "Summer House",
    field: "Field",
    starter: "Voltrix Starter 1-5 kWh",
    medium: "Voltrix Medium 6-8 kWh",
    max: "Voltrix Max 9-12 kWh",
    accessories: "Accessories",
    instructions: "Instructions",
    faqs: "FAQs",
    troubleshooting: "Troubleshooting",
    findSystem: "Find your system",
  },
  sv: {
    solutions: "Lösningar",
    products: "Produkter",
    support: "Support",
    about: "Om",
    contact: "Kontakt",
    summerHouse: "Fritidshus",
    field: "Fältarbete",
    starter: "Voltrix Starter 1-5 kWh",
    medium: "Voltrix Medium 6-8 kWh",
    max: "Voltrix Max 9-12 kWh",
    accessories: "Tillbehör",
    instructions: "Instruktioner",
    faqs: "FAQ",
    troubleshooting: "Felsökning",
    findSystem: "Hitta ditt system",
  },
  fi: {
    solutions: "Ratkaisut",
    products: "Tuotteet",
    support: "Tuki",
    about: "Tietoa",
    contact: "Yhteys",
    summerHouse: "Mökki",
    field: "Kenttätyö",
    starter: "Voltrix Starter 1-5 kWh",
    medium: "Voltrix Medium 6-8 kWh",
    max: "Voltrix Max 9-12 kWh",
    accessories: "Lisavarusteet",
    instructions: "Ohjeet",
    faqs: "UKK",
    troubleshooting: "Vianmaaritys",
    findSystem: "Löydä järjestelmä",
  },
  no: {
    solutions: "Løsninger",
    products: "Produkter",
    support: "Support",
    about: "Om",
    contact: "Kontakt",
    summerHouse: "Hytte",
    field: "Feltarbeid",
    starter: "Voltrix Starter 1-5 kWh",
    medium: "Voltrix Medium 6-8 kWh",
    max: "Voltrix Max 9-12 kWh",
    accessories: "Tilbehør",
    instructions: "Instruksjoner",
    faqs: "FAQ",
    troubleshooting: "Feilsøking",
    findSystem: "Finn ditt system",
  },
  da: {
    solutions: "Løsninger",
    products: "Produkter",
    support: "Support",
    about: "Om",
    contact: "Kontakt",
    summerHouse: "Sommerhus",
    field: "Feltarbejde",
    starter: "Voltrix Starter 1-5 kWh",
    medium: "Voltrix Medium 6-8 kWh",
    max: "Voltrix Max 9-12 kWh",
    accessories: "Tilbehør",
    instructions: "Instruktioner",
    faqs: "FAQ",
    troubleshooting: "Fejlfinding",
    findSystem: "Find dit system",
  },
  it: {
    solutions: "Soluzioni",
    products: "Prodotti",
    support: "Supporto",
    about: "Chi siamo",
    contact: "Contatto",
    summerHouse: "Casa vacanze",
    field: "Field",
    starter: "Voltrix Starter 1-5 kWh",
    medium: "Voltrix Medium 6-8 kWh",
    max: "Voltrix Max 9-12 kWh",
    accessories: "Accessori",
    instructions: "Istruzioni",
    faqs: "FAQ",
    troubleshooting: "Risoluzione problemi",
    findSystem: "Trova il sistema",
  },
};

export function initHeader({ page, lang, route }) {
  clearActiveLinks();
  setActive(page);
  setTranslations(lang);
  updateCart();
  renderLanguage(lang, route);
}

function clearActiveLinks() {
  document.querySelectorAll("[data-link].active").forEach((link) => {
    link.classList.remove("active");
  });
}

function setActive(page) {
  const activePage = page === "b2b"
    ? "contact"
    : page.startsWith("solution-")
      ? "solutions"
      : page;

  document.querySelectorAll("[data-link]").forEach((link) => {
    if (link.dataset.link === activePage) {
      link.classList.add("active");
    }
  });
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.textContent = value;
}

function getNavCopy(lang) {
  return {
    ...NAV_COPY.en,
    ...(NAV_COPY[lang] ?? {}),
  };
}

function setTranslations(lang) {
  const copy = getNavCopy(lang);

  setText('[data-link="solutions"]', copy.solutions);
  setText('[data-link="products"]', copy.products);
  setText('[data-link="support"]', copy.support);
  setText('[data-link="about"]', copy.about);
  setText('[data-link="contact"]', copy.contact);

  document.querySelectorAll("[data-nav-label]").forEach((el) => {
    const key = el.dataset.navLabel;
    el.textContent = copy[key] ?? key;
  });
}

function updateCart() {
  const el = document.getElementById("cart-count");
  if (!el) return;

  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    el.textContent = count > 0 ? String(count) : "";
  } catch (err) {
    console.error("[header] Failed to update cart count:", err);
    el.textContent = "";
  }
}

function renderLanguage(lang, route) {
  const el = document.getElementById("language");
  if (!el) return;

  try {
    el.innerHTML = renderLanguagePicker({ lang, route });
  } catch (err) {
    console.error("[header] Failed to render language picker:", err);
    el.innerHTML = "";
  }
}

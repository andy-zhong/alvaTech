import { renderLanguagePicker } from "./language-picker.js";

const NAV_COPY = {
  en: {
    solutions: "Solutions",
    products: "Products",
    support: "Support",
    about: "About",
    contact: "Contact",
    summerHouse: "Summer House",
    field: "Installer",
    marine: "Marine",
    forSummerHouse: "For Summer house",
    forInstaller: "For Installer",
    accessories: "Accessories",
    allProducts: "All products",
    instructions: "Instructions",
    faqs: "FAQs",
    troubleshooting: "Troubleshooting",
  },
  sv: {
    solutions: "Lösningar",
    products: "Produkter",
    support: "Support",
    about: "Om",
    contact: "Kontakt",
    summerHouse: "Fritidshus",
    field: "Installatör",
    marine: "Båtliv",
    forSummerHouse: "För fritidshus",
    forInstaller: "För installatörer",
    accessories: "Tillbehör",
    allProducts: "Alla produkter",
    instructions: "Instruktioner",
    faqs: "FAQ",
    troubleshooting: "Felsökning",
  },
  fi: {
    solutions: "Ratkaisut",
    products: "Tuotteet",
    support: "Tuki",
    about: "Tietoa",
    contact: "Yhteys",
    summerHouse: "Mökki",
    field: "Installer",
    instructions: "Ohjeet",
    faqs: "UKK",
    troubleshooting: "Vianmaaritys",
  },
  no: {
    solutions: "Løsninger",
    products: "Produkter",
    support: "Support",
    about: "Om",
    contact: "Kontakt",
    summerHouse: "Hytte",
    field: "Installer",
    instructions: "Instruksjoner",
    faqs: "FAQ",
    troubleshooting: "Feilsøking",
  },
  da: {
    solutions: "Løsninger",
    products: "Produkter",
    support: "Support",
    about: "Om",
    contact: "Kontakt",
    summerHouse: "Sommerhus",
    field: "Installer",
    instructions: "Instruktioner",
    faqs: "FAQ",
    troubleshooting: "Fejlfinding",
  },
  it: {
    solutions: "Soluzioni",
    products: "Prodotti",
    support: "Supporto",
    about: "Chi siamo",
    contact: "Contatto",
    summerHouse: "Casa vacanze",
    field: "Installer",
    instructions: "Istruzioni",
    faqs: "FAQ",
    troubleshooting: "Risoluzione problemi",
  },
};

export function initHeader({ page, lang, route }) {
  clearActiveLinks();
  setActive(page);
  setTranslations(lang);
  const cartLink=document.querySelector('.navbar__cart');
  if(cartLink){cartLink.setAttribute('aria-label',lang==='sv'?'Din konfiguration':'Your configuration');cartLink.title=lang==='sv'?'Din konfiguration':'Your configuration';}
  updateCart();
  renderLanguage(lang, route);
  bindMobileMenu(lang);
}

function clearActiveLinks() {
  document.querySelectorAll("[data-link].active").forEach((link) => {
    link.classList.remove("active");
  });
}

function setActive(page) {
  const activePage = page === "b2b"
    ? "contact"
    : page === "product" || page.startsWith("product-")
      ? "products"
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

function bindMobileMenu(lang) {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".site-header__menu-toggle");
  const nav = document.getElementById("site-nav");

  if (!header || !toggle || !nav) {
    return;
  }

  const openLabel = lang === "sv" ? "Öppna meny" : "Open menu";
  const closeLabel = lang === "sv" ? "Stäng meny" : "Close menu";

  const mobile=window.matchMedia("(max-width: 860px)");
  const pageMain=document.querySelector("main");
  const footer=document.querySelector("footer");
  function setOpen(isOpen) {
    header.classList.toggle("is-menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
    nav.setAttribute("aria-hidden", String(mobile.matches && !isOpen));
    nav.inert=mobile.matches && !isOpen;
    if (pageMain) pageMain.inert=mobile.matches && isOpen;
    if (footer) footer.inert=mobile.matches && isOpen;
    document.documentElement.classList.toggle("has-mobile-menu", mobile.matches && isOpen);
  }

  toggle.setAttribute("aria-label", openLabel);
  setOpen(false);
  mobile.addEventListener("change",()=>setOpen(false));
  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-menu-open"));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-menu-open")) {
      toggle.focus();
      setOpen(false);
      return;
    }
    if (event.key === "Tab" && mobile.matches && header.classList.contains("is-menu-open")) {
      const focusable=[...header.querySelectorAll('a[href],button:not([disabled])')].filter(el=>!el.closest('[aria-hidden="true"]'));
      if (!focusable.length) return;
      const first=focusable[0], last=focusable[focusable.length-1];
      if (event.shiftKey && document.activeElement===first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement===last) { event.preventDefault(); first.focus(); }
    }
  });
}

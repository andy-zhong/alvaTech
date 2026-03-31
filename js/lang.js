const translations = {
  en: {
    home: "Home",
    products: "Products",
    about: "About Us",
    account: "My Account",
    welcome: "Welcome to Alva Technology"
  },
  sv: {
    home: "Hem",
    products: "Produkter",
    about: "Om oss",
    account: "Mitt konto",
    welcome: "Välkommen till Alva Technology"
  },
  de: {
    home: "Startseite",
    products: "Produkte",
    about: "Über uns",
    account: "Mein Konto",
    welcome: "Willkommen bei Alva Technology"
  }
};

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang]?.[key]) {
      el.textContent = translations[lang][key];
    }
  });
  updateFlag(lang);
}

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
  updateFlag(lang);
}

function updateFlag(lang) {
  const flag = document.getElementById("current-flag");
  if (!flag) return;

  const map = {
    en: "/assets/flags/gb.svg",
    sv: "/assets/flags/se.svg",
    de: "/assets/flags/de.svg"
  };

  flag.src = map[lang] || map["en"];
}
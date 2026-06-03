export const MARKET_CLUSTERS = {
  NORDIC: "nordic",
  EU_ENGLISH: "euEnglish",
  ITALY: "italy",
};

export const MARKETS = {
  sv: {
    code: "sv",
    label: "SV",
    flag: "se",
    market: "Sweden",
    language: "Swedish",
    cluster: MARKET_CLUSTERS.NORDIC,
    likelyCurrency: "SEK",
  },
  fi: {
    code: "fi",
    label: "FI",
    flag: "fi",
    market: "Finland",
    language: "Finnish",
    cluster: MARKET_CLUSTERS.NORDIC,
    likelyCurrency: "EUR",
    selectable: false,
  },
  no: {
    code: "no",
    label: "NO",
    flag: "no",
    market: "Norway",
    language: "Norwegian",
    cluster: MARKET_CLUSTERS.NORDIC,
    likelyCurrency: "NOK",
    selectable: false,
  },
  da: {
    code: "da",
    label: "DA",
    flag: "dk",
    market: "Denmark",
    language: "Danish",
    cluster: MARKET_CLUSTERS.NORDIC,
    likelyCurrency: "DKK",
    selectable: false,
  },
  en: {
    code: "en",
    label: "EN",
    flag: "gb",
    market: "Europe",
    language: "English",
    cluster: MARKET_CLUSTERS.EU_ENGLISH,
    likelyCurrency: "EUR",
  },
  it: {
    code: "it",
    label: "IT",
    flag: "it",
    market: "Italy",
    language: "Italian",
    cluster: MARKET_CLUSTERS.ITALY,
    likelyCurrency: "EUR",
    selectable: false,
  },
};

export const DEFAULT_MARKET_CODE = "sv";

export function getMarket(lang) {
  return MARKETS[lang] ?? MARKETS[DEFAULT_MARKET_CODE];
}

export function getMarketOptions() {
  return Object.values(MARKETS).filter((market) => market.selectable !== false);
}

export function isSelectableMarket(lang) {
  return MARKETS[lang]?.selectable !== false && Boolean(MARKETS[lang]);
}

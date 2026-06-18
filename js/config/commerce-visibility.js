// Temporary public/staging commerce visibility switch. Reopen by setting all flags to true.
export const commerceVisibility = {
  showPrices: false,
  showEstimatorPrices: false,
  allowCheckout: false,
};

export function getPricingComingSoonLabel(lang = "en") {
  return lang === "sv" ? "Pris kommer snart" : "Price coming soon";
}

export function getQuantityEstimateOnlyLabel(lang = "en") {
  return lang === "sv" ? "Endast mängdberäkning" : "Quantity estimate only";
}

export function getCheckoutDisabledMessage(lang = "en") {
  return lang === "sv"
    ? "Kassan är tillfälligt avstängd medan offentliga priser fastställs."
    : "Checkout is temporarily disabled while public pricing is being finalized.";
}

export function getOnlineOrderingComingSoonMessage(lang = "en") {
  return lang === "sv"
    ? "Tack f\u00f6r ditt intresse. Onlinebest\u00e4llning \u00f6ppnar snart."
    : "Thank you for your interest. Online ordering will open soon.";
}

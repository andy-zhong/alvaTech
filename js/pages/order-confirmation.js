const ORDER_CONFIRMATION_COPY = {
  en: {
    title: "Order request received",
    numberLabel: "Request number",
    message:
      "Thank you. Alva has received your request. Our team will confirm price, availability and delivery window before any payment is arranged.",
    continueShopping: "View products",
    backHome: "Back to home",
  },
  sv: {
    title: "Orderförfrågan mottagen",
    numberLabel: "Förfrågningsnummer",
    message:
      "Tack. Alva har tagit emot er förfrågan. Vi bekräftar pris, tillgänglighet och leveransfönster innan betalning ordnas.",
    continueShopping: "Visa produkter",
    backHome: "Till startsidan",
  },
  fi: {
    title: "Tilaus vastaanotettu",
    numberLabel: "Tilausnumero",
    message:
      "Kiitos. Olemme vastaanottaneet tilauksesi ja lähettäneet vahvistuksen sähköpostiisi. Tiimimme ottaa sinuun pian yhteyttä varmistaakseen tiedot ja sopiakseen toimituksesta.",
    continueShopping: "Jatka ostoksia",
    backHome: "Takaisin etusivulle",
  },
  no: {
    title: "Bestilling mottatt",
    numberLabel: "Ordrenummer",
    message:
      "Takk. Vi har mottatt bestillingen din og sendt en bekreftelse til e-posten din. Teamet vårt tar snart kontakt for å bekrefte detaljene og avtale levering.",
    continueShopping: "Fortsett å handle",
    backHome: "Til forsiden",
  },
  da: {
    title: "Ordre modtaget",
    numberLabel: "Ordrenummer",
    message:
      "Tak. Vi har modtaget din ordre og sendt en bekræftelse til din e-mail. Vores team kontakter dig snart for at bekræfte detaljerne og aftale levering.",
    continueShopping: "Fortsæt med at handle",
    backHome: "Til forsiden",
  },
  it: {
    title: "Ordine ricevuto",
    numberLabel: "Numero ordine",
    message:
      "Grazie. Abbiamo ricevuto il tuo ordine. Il team Alva ti contattera per confermare dettagli, consegna e pagamento.",
    continueShopping: "Continua gli acquisti",
    backHome: "Torna alla home",
  },
};

function getCopy(lang) {
  const copy = ORDER_CONFIRMATION_COPY[lang] ?? ORDER_CONFIRMATION_COPY.en;
  const vendureCopy = lang === "sv"
    ? {
        vendureLabel: "Förfrågningsreferens",
        vendureSource: "Förfrågan har skapats för intern granskning. Ingen betalning debiteras i detta steg.",
        stripeLabel: "Orderreferens",
        stripeSource: "Betalningen hanteras säkert via Stripe. Alva bekräftar ordern när betalningsstatusen har uppdaterats.",
      }
    : {
        vendureLabel: "Request reference",
        vendureSource: "This request has been created for internal review. Payment is not captured at this step.",
        stripeLabel: "Order reference",
        stripeSource: "Payment is handled securely by Stripe. Alva will confirm the order when payment status has updated.",
      };

  return { ...copy, ...vendureCopy };
}

export function renderOrderConfirmationPage(lang = "sv") {
  const copy = getCopy(lang);
  const params = new URLSearchParams(window.location.search);
  const orderNumber = params.get("order") || "";
  const isVendureOrder = params.get("source") === "vendure";
  const isStripeOrder = params.get("source") === "stripe";

  if (isStripeOrder) {
    localStorage.removeItem("cart");
    sessionStorage.removeItem("alvaPendingStripeOrder");
  }

  return `
    <section class="section">
      <article class="order-confirm">
        <div class="order-confirm__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.6"
               stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        </div>

        <h1 class="order-confirm__title">${copy.title}</h1>

        ${orderNumber ? `
          <div class="order-confirm__number">
            <p class="order-confirm__number-label">${isStripeOrder ? copy.stripeLabel : isVendureOrder ? copy.vendureLabel : copy.numberLabel}</p>
            <p class="order-confirm__number-value">${orderNumber}</p>
          </div>
        ` : ""}

        ${isVendureOrder || isStripeOrder ? `
          <p class="order-confirm__source">
            ${isStripeOrder ? copy.stripeSource : copy.vendureSource}
          </p>
        ` : ""}

        <p class="order-confirm__message">${copy.message}</p>

        <div class="order-confirm__actions">
          <a class="button button--primary" href="/views/products.html">${copy.continueShopping}</a>
          <a class="button button--secondary" href="/index.html">${copy.backHome}</a>
        </div>
      </article>
    </section>`;
}

const ORDER_CONFIRMATION_COPY = {
  en: {
    title: "Order Placed",
    numberLabel: "Order Number",
    message:
      "Thank you. We've received your order and sent a confirmation to your email. Our team will be in touch shortly to confirm the details and arrange delivery.",
    continueShopping: "Continue Shopping",
    backHome: "Back to Home",
  },
  sv: {
    title: "Beställning mottagen",
    numberLabel: "Ordernummer",
    message:
      "Tack. Vi har tagit emot din beställning och skickat en bekräftelse till din e-post. Vårt team kontaktar dig inom kort för att bekräfta detaljerna och planera leveransen.",
    continueShopping: "Fortsätt handla",
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
  return ORDER_CONFIRMATION_COPY[lang] ?? ORDER_CONFIRMATION_COPY.en;
}

export function renderOrderConfirmationPage(lang = "sv") {
  const copy = getCopy(lang);
  const orderNumber = new URLSearchParams(window.location.search).get("order") || "";

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
            <p class="order-confirm__number-label">${copy.numberLabel}</p>
            <p class="order-confirm__number-value">${orderNumber}</p>
          </div>
        ` : ""}

        <p class="order-confirm__message">${copy.message}</p>

        <div class="order-confirm__actions">
          <a class="button button--primary" href="/views/products.html">${copy.continueShopping}</a>
          <a class="button button--secondary" href="/index.html">${copy.backHome}</a>
        </div>
      </article>
    </section>`;
}

import { MARINE_ASSETS } from "../data/marine-content.js";

export function renderMarineEnergyStory(lang) {
  const sv = lang === "sv";
  const c = sv ? {
    eyebrow: "TVÅ SÄTT ATT LADDA", title: "Ladda ombord. Förbered på land.",
    intro: "Ta med laddade batterier från din Voltrix hemma och fyll på med båtens solpaneler under dagen. Samma FieldPack ger ström till utrustningen ombord.",
    sources: "ENERGI IN", solar: "Båtens solpaneler", solarBody: "Ladda FieldPack med solenergi samtidigt som utrustningen får ström.",
    home: "Voltrix hemma", homeBody: "Ladda Battery Packs på land och flytta dem till FieldPack inför turen.",
    solarConnection: "Solcellsladdning", batteryConnection: "Laddade batterier", or: "eller",
    hub: "ENERGIN FÖLJER MED", product: "Voltrix FieldPack", productBody: "Inbyggd PCS · 1–2 Battery Packs",
    output: "STRÖM UT", devices: "Utrustning ombord", devicesBody: "För belysning, laddning och annan kompatibel utrustning under dagen.",
    note: "Solpanelerna laddar FieldPack ombord. På land laddas de löstagbara batterierna i Voltrix — sedan följer de med i FieldPack.",
  } : {
    eyebrow: "TWO WAYS TO RECHARGE", title: "Charge aboard. Prepare on shore.",
    intro: "Bring charged batteries from your Voltrix at home and top up with the boat’s solar panels during the day. The same FieldPack powers your equipment aboard.",
    sources: "ENERGY IN", solar: "Onboard solar panels", solarBody: "Recharge FieldPack with solar while your equipment keeps running.",
    home: "Home Voltrix", homeBody: "Charge Battery Packs on shore, then move them into FieldPack for the trip.",
    solarConnection: "Solar charging", batteryConnection: "Charged packs", or: "or",
    hub: "ENERGY WITH YOU", product: "Voltrix FieldPack", productBody: "Integrated PCS · 1–2 Battery Packs",
    output: "POWER OUT", devices: "Onboard devices", devicesBody: "For lights, charging and other compatible equipment throughout the day.",
    note: "Solar panels charge FieldPack aboard. On shore, removable batteries charge in Voltrix — then travel with you in FieldPack.",
  };
  return `<section class="marine-section marine-recharge" id="marine-recharge" aria-labelledby="marine-recharge-title">
    <div class="marine-recharge__heading"><div><span class="eyebrow">${c.eyebrow}</span><h2 id="marine-recharge-title">${c.title}</h2></div><p>${c.intro}</p></div>
    <div class="marine-recharge__map" role="group" aria-label="${c.title}">
      <div class="recharge-sources">
        <span class="recharge-stage-label">${c.sources}</span>
        <article class="recharge-source recharge-source--solar">
          <img src="/Picture/products/marine/marine_field_backpack_inuse_1.webp" alt="${sv ? "Solpaneler och FieldPack på båtdäck" : "Solar panels and FieldPack on a boat deck"}" width="1447" height="1087" loading="lazy">
          <div><h3>${c.solar}</h3><p>${c.solarBody}</p><span class="recharge-source__route">${c.solarConnection}</span></div>
        </article>
        <span class="recharge-or">${c.or}</span>
        <article class="recharge-source recharge-source--shore">
          <img src="/Picture/products/voltrix/summerhouse/summerhouse02-optimized.jpg" alt="${sv ? "Voltrix-system på land" : "Voltrix system on shore"}" width="1536" height="1024" loading="lazy">
          <div><h3>${c.home}</h3><p>${c.homeBody}</p><span class="recharge-source__route">${c.batteryConnection}</span></div>
        </article>
      </div>
      <div class="recharge-merge" aria-hidden="true"><svg viewBox="0 0 64 360" preserveAspectRatio="none"><path class="recharge-merge__solar" d="M0 98 H25 Q34 98 34 107 V180 H60"/><path class="recharge-merge__shore" d="M0 282 H25 Q34 282 34 273 V180"/><path class="recharge-merge__arrow" d="M51 174 L60 180 L51 186"/></svg><span>↓</span></div>
      <article class="recharge-hub"><span class="recharge-stage-label">${c.hub}</span><figure><img src="${MARINE_ASSETS.flowProduct}" alt="Voltrix FieldPack" width="1536" height="1024" loading="lazy"></figure><h3>${c.product}</h3><p>${c.productBody}</p></article>
      <div class="recharge-output-link" aria-hidden="true"><span>→</span></div>
      <article class="recharge-devices"><span class="recharge-stage-label">${c.output}</span><figure><img src="/Picture/products/marine/marine_field_backpack_inuse_6.webp" alt="${sv ? "FieldPack ger ström till en bärbar dator ombord" : "FieldPack powering a laptop aboard"}" width="1537" height="1023" loading="lazy"></figure><h3>${c.devices}</h3><p>${c.devicesBody}</p></article>
    </div>
    <p class="marine-recharge__note">${c.note}</p>
  </section>`;
}

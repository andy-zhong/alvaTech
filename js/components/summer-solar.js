export const SUMMER_TRACKER_PLANNER = '/views/products.html?scenario=summer&solar=tracking#setup-estimator';
export function trackerEnquiry(lang) {
  return '/views/b2b.html?context=summer-solar&request='+encodeURIComponent(lang==='sv'
    ? 'Jag vill planera solenergi för mitt fritidshus med Tracker, kompatibla solpaneler och Voltrix. Hjälp mig att bedöma placering, anslutningar och batterikapacitet.'
    : 'I would like to plan solar energy for my summer house with Tracker, compatible solar panels and Voltrix. Please help assess placement, connections and battery capacity.');
}
export function renderSummerSolar(lang, {compact=false}={}) {
 const sv=lang==='sv';
 return `<section class="summer-solar ${compact?'summer-solar--compact':''}" id="summer-solar" aria-labelledby="summer-solar-title">
   <figure class="summer-solar__image"><img src="${compact?'/Picture/products/tracker/tracker2.webp':'/Picture/products/tracker/tracker1.webp'}" alt="${sv?'Tracker med solpaneler':'Tracker with solar panels'}" loading="lazy" width="960" height="720"></figure>
   <div class="summer-solar__copy"><span class="eyebrow">${sv?'SOLENERGI · FRITIDSHUS':'SOLAR · SUMMER HOUSE'}</span>
   <h2 id="summer-solar-title">${sv?'Fånga dagsljuset. Spara energin till senare.':'Follow the daylight. Store energy for later.'}</h2>
   <p>${sv?'Tracker följer solen med kompatibla paneler. Voltrix lagrar energin för belysning, laddning och annan utrustning i fritidshuset.':'Tracker follows the sun with compatible panels. Voltrix stores the energy for lighting, charging and other summer house equipment.'}</p>
   <ol class="solar-path" aria-label="${sv?'Från solenergi till användning':'From solar to use'}">
     <li><strong>${sv?'Samla':'Collect'}</strong><span>Tracker + ${sv?'kompatibla paneler':'compatible panels'}</span></li>
     <li><strong>${sv?'Lagra':'Store'}</strong><span>Voltrix + Battery Packs</span></li>
     <li><strong>${sv?'Använd':'Use'}</strong><span>${sv?'Utrustning i fritidshuset':'Summer house devices'}</span></li>
   </ol>
   <p class="summer-solar__note">${sv?'Alva hjälper dig att kontrollera panelkompatibilitet, placering och elektrisk anslutning. Soltillskottet beror på väder och skuggning; batteriplaneringen utgår från behovet mellan säkra laddningar.':'Alva helps check panel compatibility, placement and electrical connections. Solar contribution depends on weather and shade; battery planning follows the need between reliable recharges.'}</p>
   <div class="refined-actions"><a class="button button--primary" href="${SUMMER_TRACKER_PLANNER}">${sv?'Planera med Tracker':'Plan with Tracker'}</a><a class="text-link" href="${compact?'/views/solution-summer-house.html#summer-solar':'/views/product.html?slug=solar-tracking-system'}">${compact?(sv?'Se hela fritidshuslösningen':'See the summer house solution'):(sv?'Utforska Tracker':'Explore Tracker')} →</a></div>
   </div>
 </section>`;
}

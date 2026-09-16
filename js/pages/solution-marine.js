import { renderMarineEnergyStory } from "../components/marine-energy-story.js";

import { getMarineContent, MARINE_ASSETS } from '../data/marine-content.js';

export function renderMarinePage({lang}) {
 const sv=lang==='sv';
 const c=getMarineContent(lang);
 const copy=sv ? {
  eyebrow:'BÅTLIV · VOLTRIX FIELDPACK', title:'Från land. Till båt. Och tillbaka.',
  intro:'Ta med energin ut på vattnet. FieldPack har inbyggd PCS, plats för upp till två Battery Packs och ett flytande hölje när skyddslocken är stängda. Solcellsladdning kan fortsätta medan utrustningen får ström.',
  primary:'Utforska FieldPack',secondary:'Så fungerar det',
  flowLabel:'EN DELAD BATTERIPLATTFORM',flowTitle:'Samma batterier. Fler platser.',
  steps:[['Förbered på land','Använd Voltrix hemma eller vid din bas för att ladda och organisera dina Battery Packs.'],['Ta med FieldPack','Flytta ett eller två laddade pack till FieldPack och ta med energin till båten eller bryggan.'],['Ladda och använd ombord','Anslut kompatibla solpaneler till FieldPack för laddning samtidigt som ström levereras.'],['Tillbaka i Voltrix','Efter turen kan batterierna återgå till din Voltrix-setup på land.']],
  solarLabel:'SOLENERGI OMBORD',solarTitle:'Ladda medan dagen pågår.',solarBody:'FieldPack kan ta emot solenergi samtidigt som ansluten utrustning får ström. Solen kompletterar energin du tog med från land; väder, skuggning och panelernas placering påverkar tillskottet.',
  pv:'Solpaneler',input:'Solenergi in',unit:'FieldPack + Battery Packs',output:'Ström ut',devices:'Din utrustning',
  solarNote:'Alva hjälper dig att matcha paneler, anslutningar och kablar med din FieldPack.',
  aboardLabel:'NÄRA LIVET PÅ VATTNET',aboardTitle:'Ström där du tillbringar dagen.',aboardBody:'På båten, vid bryggan eller under en paus på land. FieldPack ger dina batterier ett portabelt användningsområde, medan Voltrix fortsätter vara energibasen hemma.',
  connectTitle:'Två platser. Ett batterisystem.',shore:'På land',shoreBody:'Voltrix: hemmets energibas och platsen för batteriernas nästa användning.',boat:'Ombord',boatBody:'FieldPack: bärbar ström med inbyggd PCS och möjlighet till solcellsladdning.',batteryLink:'Se Battery Packs',
  finalTitle:'Börja med din FieldPack.',finalBody:'Har du redan kompatibla Battery Packs? Börja med FieldPack. Annars kan Alva hjälpa dig med en setup med ett eller två pack.',finalPrimary:'Välj din setup',finalSecondary:'Prata om min båtlösning',
  note:'Anslut utrustning enligt produktens instruktioner. Alva bekräftar belastning, kablar och användningsförhållanden för din setup.',
 } : {
  eyebrow:'MARINE · VOLTRIX FIELDPACK', title:'From shore. To boat. And back.',
  intro:'Take your energy out on the water. FieldPack has an integrated PCS, room for up to two Battery Packs and a buoyant enclosure when the protective covers are secured. Solar charging can continue while your equipment receives power.',
  primary:'Explore FieldPack',secondary:'See how it works',
  flowLabel:'ONE SHARED BATTERY PLATFORM',flowTitle:'Same batteries. More places.',
  steps:[['Prepare on shore','Use Voltrix at home or at your base to charge and organize your Battery Packs.'],['Bring FieldPack aboard','Move one or two charged packs into FieldPack and take your energy to the boat or dock.'],['Recharge while you use power','Connect compatible solar panels to FieldPack for charging while supplying power.'],['Return to Voltrix','After your trip, the batteries can return to your Voltrix setup on land.']],
  solarLabel:'SOLAR ABOARD',solarTitle:'Recharge as the day unfolds.',solarBody:'FieldPack can receive solar energy while supplying connected equipment. Solar supplements the energy you brought from shore; weather, shade and panel placement affect how much it adds.',
  pv:'Solar panels',input:'Solar energy in',unit:'FieldPack + Battery Packs',output:'Power out',devices:'Your equipment',
  solarNote:'Alva helps match the panels, connections and cables to your FieldPack.',
  aboardLabel:'CLOSER TO LIFE ON THE WATER',aboardTitle:'Power where you spend the day.',aboardBody:'On the boat, at the dock or during a stop on shore. FieldPack gives your batteries a portable role, while Voltrix remains your energy base at home.',
  connectTitle:'Two places. One battery system.',shore:'On shore',shoreBody:'Voltrix: your home energy base and the batteries’ next place of use.',boat:'Aboard',boatBody:'FieldPack: portable power with an integrated PCS and solar charging capability.',batteryLink:'Explore Battery Packs',
  finalTitle:'Start with your FieldPack.',finalBody:'Already have compatible Battery Packs? Start with FieldPack. Otherwise, Alva can help you with a setup with one or two packs.',finalPrimary:'Choose your setup',finalSecondary:'Discuss my Marine setup',
  note:'Connect equipment according to the product instructions. Alva confirms loads, cables and operating conditions for your setup.',
 };
 const product='/views/product.html?slug=voltrix-fieldpack';
 const enquiry='/views/b2b.html?context=marine&request='+encodeURIComponent(sv?'Jag vill diskutera en båtlösning med FieldPack, Battery Packs och solcellsladdning.':'I would like to discuss a Marine setup with FieldPack, Battery Packs and solar charging.');
 return `
 <section class="marine-hero marine-section">
   <div class="marine-hero__copy"><span class="eyebrow">${copy.eyebrow}</span><h1>${copy.title}</h1><p>${copy.intro}</p><div class="marine-actions"><a class="button button--primary" href="${product}">${copy.primary}</a><a class="marine-text-link" href="#marine-how">${copy.secondary} ↓</a></div></div>
   <figure><img src="${MARINE_ASSETS.hero}" width="1536" height="1024" alt="Voltrix FieldPack — ${c.label}" fetchpriority="high"></figure>
 </section>
 <span id="marine-how" class="anchor-alias"></span>
 ${renderMarineEnergyStory(lang)}
 <section class="marine-section marine-onboard">
   <figure><img src="${MARINE_ASSETS.onboard}" width="1537" height="1023" alt="${sv?'FieldPack ansluten till utrustning ombord':'FieldPack connected to equipment aboard'}" loading="lazy"></figure>
   <div><span class="eyebrow">${copy.aboardLabel}</span><h2>${copy.aboardTitle}</h2><p>${copy.aboardBody}</p><a class="marine-text-link" href="${product}">${copy.primary} →</a></div>
 </section>
 <section class="marine-section marine-final"><h2>${copy.finalTitle}</h2><p>${copy.finalBody}</p><div class="marine-actions"><a class="button button--primary" href="${product}#fieldpack-options">${copy.finalPrimary}</a><a class="marine-text-link" href="${enquiry}">${copy.finalSecondary} →</a></div><p class="marine-note">${copy.note}</p></section>
 `;
}

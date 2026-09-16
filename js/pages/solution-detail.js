import { renderSummerSolar } from '../components/summer-solar.js';
import { renderProductDirectory } from '../components/product-directory.js';
const SOLUTION_PAGE_COPY = {
  "summer-house": {
    type: "summer-house",
    eyebrow: "Summer House",
    title: "Energy that follows the rhythm of the summer house.",
    intro:
      "A modular battery platform for cabins, terraces and second homes - designed to keep useful energy close to the places where everyday life moves outdoors.",
    line: "Start compact. Expand over time. Bring useful power beyond the wall.",
    primaryCta: "Explore Voltrix kits",
    primaryHref: "/views/products.html",
    secondaryCta: "Talk to Alva",
    secondaryHref: "/views/b2b.html",
    heroClass: "solution-page__visual--summer",
    heroLabel: "Voltrix system at a summer house",
    statement:
      "The right energy setup for a summer house is not always the biggest one.",
    statementBody:
      "It is the one that fits the rhythm of the place: compact installation, simple expansion and useful power where daily life actually happens.",
    statementTags: ["Compact setup", "Expandable capacity", "Beyond the wall"],
    fitTitle: "A lighter way to support seasonal living.",
    fitBody:
      "Summer houses move between indoor comfort, terrace evenings, garden routines and quiet outdoor corners. Voltrix is designed as a compact platform that can grow over time and support useful energy where life actually happens.",
    fitImageClass: "solution-page__image--summer-living",
    fitBullets: [
      "For cabins, terraces and second homes",
      "Slim setup for compact spaces",
      "Expandable battery capacity over time",
      "Useful power closer to outdoor routines",
    ],
    setupTitle: "A clean base for everyday energy.",
    setupBody:
      "Voltrix starts with a slim base unit and battery packs that fit naturally into cabins, terraces, balconies and smaller utility spaces. Begin with the capacity you need today, then expand the setup as your routines grow.",
    steps: [
      ["Start with the Voltrix base", "A compact energy core for the cabin or second-home setup."],
      ["Add battery packs over time", "Expand capacity as seasonal use, weekend stays or outdoor routines grow."],
      ["Use selected add-ons beyond the wall", "Let battery packs support outdoor moments when useful power is needed away from fixed outlets."],
    ],
    bandTitle: "Bring useful power closer to outdoor life.",
    bandBody:
      "From the terrace to the garden room, from weekend projects to quiet corners away from fixed outlets, Voltrix lets stored energy become part of the way summer house life actually moves.",
    bandTags: [
      "Terrace evenings",
      "Garden rooms",
      "Outdoor work corners",
      "Weekend projects",
      "Quiet places away from fixed outlets",
    ],
    bandClass: "solution-page-band--summer",
    ecosystemTitle: "One battery platform. Multiple ways to use it.",
    ecosystemBody:
      "Voltrix is the energy core. From there, battery packs can stay with the home setup, move to outdoor routines or work with selected extensions when power needs to follow everyday life.",
    ecosystem: [
      ["VoltDock", "For devices, desks, lights and small outdoor moments around the cabin."],
      ["Voltrix FieldPack", "For garden tasks, outdoor work corners and places where power should move with you."],
      ["Mobility options", "For selected routines where one battery needs to travel further from the house."],
    ],
    proofBody:
      "Built for seasonal homes, outdoor routines and practical everyday energy needs in changing weather.",
    ctaTitle: "Start with a practical Voltrix setup.",
    ctaBody:
      "Begin with a recommended kit, then expand with battery packs and selected add-ons as your routines grow. Actual performance depends on connected devices, installation and usage pattern.",
    ctaHighlight: "Voltrix 5-Pack Kit",
    ctaHighlightBody:
      "A practical starting point for seasonal homes, everyday energy support and expandable outdoor use.",
    ctaPrimary: "Explore kits",
    ctaPrimaryHref: "/views/products.html",
    ctaSecondary: "Contact Alva",
    ctaSecondaryHref: "/views/b2b.html",
  },
  field: {
    type: "field",
    eyebrow: "Installer",
    title: "Portable energy for installer teams.",
    intro:
      "Charge batteries centrally at the office or workshop, bring selected packs into the service van and use them with compatible add-ons when useful power needs to move with the work.",
    line: "Workshop → Van → Job site → Recharge",
    primaryCta: "Plan an installer setup",
    primaryHref: "/views/b2b.html",
    secondaryCta: "Talk to Alva",
    secondaryHref: "/views/b2b.html",
    heroClass: "solution-page__visual--field",
    heroLabel: "Voltrix batteries in a service van",
    statement:
      "Useful power should not stop at the wall socket, the warehouse or the parking spot.",
    statementBody:
      "Voltrix helps organize batteries at the office or workshop, move them with the team and use them where work actually happens.",
    statementTags: ["Workshop charging", "Service vans", "Temporary workstations", "Last-meter power"],
    workflowTitle: "From centralized charging to work on site.",
    workflowBody:
      "Voltrix works as the energy base at your office, workshop or company site. Batteries can be prepared before the workday, brought into the service van as needed and returned for centralized charging.",
    steps: [
      ["Prepare centrally", "Charge batteries at the office or workshop before the team leaves for the day."],
      ["Bring only what is needed", "Take the right number of battery packs for the route, job type or expected workload."],
      ["Support flexible work", "Use VoltDock for phones, laptops, tablets and temporary workstations in the van or on site."],
      ["Reach the last meter", "Use Voltrix FieldPack when energy needs to move beyond the service van and closer to the final work area."],
      ["Return and recharge", "Bring batteries back to the workshop, recharge centrally and stay ready for the next workday."],
    ],
    dockTitle: "Create a flexible working desk where the job needs it.",
    dockBody:
      "With VoltDock, a battery becomes a compact hub for the everyday devices that keep field work moving - phones, laptops, tablets, routers, cameras and communication equipment.",
    dockBodyTwo:
      "Use it inside the service van, at a temporary desk or on site when the team needs a short office moment close to the work area.",
    dockTags: ["Mobile admin", "Communication", "Documentation", "Site coordination", "Temporary workstations"],
    dockImageClass: "solution-page__image--field-dock",
    backpackTitle: "Carry power closer to the point of work.",
    backpackBody:
      "FieldPack has an integrated PCS and room for up to two Battery Packs. Bring the same batteries from your Voltrix base to the place where the work happens.",
    backpackBullets: [
      "The parking spot is far from the work area",
      "Cables are inconvenient",
      "Power needs to arrive with the worker",
      "The task is indoors, remote or spread across a site",
    ],
    backpackImageClass: "solution-page__image--field-backpack",
    ecosystemTitle: "One battery platform. Multiple work formats.",
    ecosystemBody:
      "Voltrix is the central charging point. From there, batteries can move into the service van, support a temporary workstation, travel to the final work point and return for the next cycle.",
    ecosystem: [
      ["Voltrix charging point", "Centralized charging and energy organization at the office or workshop."],
      ["Battery packs", "Prepared centrally and moved with the team as needed."],
      ["VoltDock", "A compact hub for devices, field admin and temporary workstations."],
      ["Voltrix FieldPack", "Last-meter power and practical battery transport."],
      ["Mobility layer", "Optional support for selected sites where one battery needs to move across distance."],
    ],
    mobilityBody:
      "For selected situations where the work area is spread out or access by van is limited, a mobility layer can help move one battery across distance. It is not the core of the system, but an optional layer for teams that need a faster way to move one battery between access points.",
    mobilityTags: ["Larger sites", "Remote access points", "Parking-to-site gaps", "Light battery transport"],
    ctaTitle: "Start with the right battery setup for your team.",
    ctaBody:
      "Talk to Alva about your routes, vehicles, team routines and the type of devices or field tasks you need to support. Start with a practical battery setup, then expand as operations grow.",
    ctaPrimary: "Talk to Alva",
    ctaPrimaryHref: "/views/b2b.html",
    ctaSecondary: "View products",
    ctaSecondaryHref: "/views/products.html",
  },
};

const SOLUTION_PAGE_SV_COPY = {
  "summer-house": {
    ...SOLUTION_PAGE_COPY["summer-house"],
    eyebrow: "Fritidshus",
    title: "Energi som följer rytmen i fritidshuset.",
    intro:
      "En modulär batteriplattform för stugor, terrasser och andra hem - byggd för att hålla användbar energi nära platserna där vardagen flyttar utomhus.",
    line: "Börja kompakt. Bygg ut över tid. Ta med energi bortom väggen.",
    primaryCta: "Utforska Voltrix-kit",
    secondaryCta: "Kontakta Alva",
    statement:
      "Rätt energilösning för ett fritidshus är inte alltid den största.",
    statementBody:
      "Det är den som passar platsens rytm: kompakt installation, enkel utbyggnad och användbar energi där vardagen faktiskt händer.",
    statementTags: ["Kompakt setup", "Utbyggbar kapacitet", "Bortom väggen"],
    fitTitle: "Ett lättare sätt att stödja säsongslivet.",
    fitBody:
      "Fritidshuslivet rör sig mellan innekomfort, terrasskvällar, trädgårdsrutiner och lugna hörn utomhus. Voltrix är byggt som en kompakt plattform som kan växa över tid och ge användbar energi där livet faktiskt händer.",
    fitBullets: [
      "För stugor, terrasser och andra hem",
      "Smal setup för kompakta utrymmen",
      "Utbyggbar batterikapacitet över tid",
      "Användbar energi närmare utomhusrutiner",
    ],
    setupTitle: "En ren bas för vardagens energi.",
    setupBody:
      "Voltrix börjar med en smal basenhet och batteripack som passar naturligt i stugor, på terrasser, balkonger och mindre teknikytor. Börja med kapaciteten du behöver idag och bygg ut när rutinerna växer.",
    steps: [
      ["Börja med Voltrix-basen", "En kompakt energibas för stugan eller det andra hemmet."],
      ["Lägg till batteripack över tid", "Bygg ut kapaciteten när säsongsanvändning, helger eller utomhusrutiner växer."],
      ["Använd utvalda tillbehör bortom väggen", "Låt batteripack stödja utomhusaktiviteter när användbar energi behövs bort från fasta uttag."],
    ],
    bandTitle: "Ta användbar energi närmare livet utomhus.",
    bandBody:
      "Från terrassen till trädgårdsrummet, från helgprojekt till lugna hörn bort från fasta uttag, gör Voltrix lagrad energi till en del av hur fritidshuslivet faktiskt rör sig.",
    bandTags: [
      "Terrasskvällar",
      "Trädgårdsrum",
      "Arbetshörnor utomhus",
      "Helgprojekt",
      "Platser bort från fasta uttag",
    ],
    ecosystemTitle: "En batteriplattform. Flera sätt att använda den.",
    ecosystemBody:
      "Voltrix är energibasen. Därifrån kan batteripack stanna i hemmets setup, följa med till utomhusrutiner eller fungera med utvalda tillbehör när energin behöver flytta med vardagen.",
    ecosystem: [
      ["VoltDock", "För enheter, skrivbord, belysning och små utomhusmoment runt stugan."],
      ["Voltrix FieldPack", "För trädgårdsuppgifter, arbetshörnor utomhus och platser där energin ska följa med."],
      ["Mobilitetstillbehör", "För utvalda rutiner där ett batteri behöver flyttas längre från huset."],
    ],
    proofBody:
      "Byggd för säsongsboenden, utomhusrutiner och praktiska energibehov i skiftande väder.",
    ctaTitle: "Börja med en praktisk Voltrix-setup.",
    ctaBody:
      "Börja med ett rekommenderat kit och bygg sedan ut med batteripack och utvalda tillbehör när rutinerna växer. Faktisk prestanda beror på anslutna enheter, installation och användningsmönster.",
    ctaPrimary: "Utforska kit",
    ctaSecondary: "Kontakta Alva",
    labels: {
      whyItFits: "Varför det passar",
      setup: "Setupen",
      beyondTheWall: "Bortom väggen",
      ecosystem: "Ekosystemet",
      nordicConditions: "Nordiska förhållanden",
      nordicTitle: "Utformat för skiftande nordiska rutiner.",
      getStarted: "Kom igång",
    },
  },
  field: {
    ...SOLUTION_PAGE_COPY.field,
    eyebrow: "Installatör",
    title: "Portabel energi för installatörer.",
    intro:
      "Ladda batterier på kontoret eller i verkstaden, ta utvalda pack i servicebilen och använd dem på plats med kompatibla tillbehör när energin behöver följa arbetet.",
    line: "Verkstad → Servicebil → Arbetsplats → Ladda om",
    primaryCta: "Planera en installatörssetup",
    secondaryCta: "Kontakta Alva",
    statement:
      "Användbar energi ska inte stanna vid vägguttaget, verkstaden eller parkeringsplatsen.",
    statementBody:
      "Voltrix hjälper team att organisera batterier på kontoret eller i verkstaden, för att sedan ta med dem och använda energin där arbetet faktiskt sker.",
    statementTags: ["Centraliserad laddning", "Servicebilar", "Tillfälliga arbetsytor", "Energi sista biten"],
    workflowTitle: "Från laddning på kontoret till arbete på plats.",
    workflowBody:
      "Voltrix fungerar som central laddningspunkt på kontoret eller i verkstaden. Batterier kan förberedas innan arbetsdagen, tas med i servicebilen vid behov och återvända för laddning.",
    steps: [
      ["Förbered innan avfärd", "Ladda batterierna centralt innan teamet åker ut för dagen."],
      ["Ta bara med det som behövs", "Välj rätt antal batteripack för rutten, jobbet eller förväntad användning."],
      ["Stöd flexibelt arbete", "Använd VoltDock för telefoner, laptops, surfplattor och tillfälliga arbetsytor i bilen eller på plats."],
      ["Nå sista biten", "Använd Voltrix FieldPack när energin behöver flytta bortom servicebilen och närmare arbetsytan."],
      ["Tillbaka och ladda", "Ta tillbaka batterierna, ladda centralt och var redo för nästa arbetsdag."],
    ],
    dockTitle: "Skapa en flexibel arbetsyta där jobbet behöver den.",
    dockBody:
      "Med VoltDock blir ett batteri en kompakt hubb för vardagens enheter: telefoner, laptops, surfplattor, routrar, kameror och kommunikationsutrustning.",
    dockBodyTwo:
      "Använd den i servicebilen, vid ett tillfälligt skrivbord eller på plats när teamet behöver ett kort kontorsmoment nära arbetet.",
    dockTags: ["Mobil administration", "Kommunikation", "Dokumentation", "Samordning", "Tillfälliga arbetsytor"],
    backpackTitle: "Bär energi närmare arbetet.",
    backpackBody:
      "FieldPack har inbyggd PCS och plats för upp till två Battery Packs. Ta med samma batterier från Voltrix-basen till platsen där arbetet sker.",
    backpackBullets: [
      "Parkeringsplatsen ligger långt från arbetsytan",
      "Kablar är opraktiska",
      "Energin behöver följa med personen",
      "Arbetet är inomhus, utspritt eller svårt att nå från bilen",
    ],
    ecosystemTitle: "En batteriplattform. Flera arbetsformat.",
    ecosystemBody:
      "Voltrix är den centrala laddningspunkten. Därifrån kan batterier flytta in i servicebilen, stödja en tillfällig arbetsyta, följa med till sista arbetsmomentet och återvända för nästa cykel.",
    ecosystem: [
      ["Voltrix laddningspunkt", "Centraliserad laddning och ordning på kontoret eller i verkstaden."],
      ["Batteripack", "Förberedda centralt och flyttade med teamet vid behov."],
      ["VoltDock", "En kompakt hubb för enheter, administration och tillfälliga arbetsytor."],
      ["Voltrix FieldPack", "Energi sista biten och praktisk batteritransport."],
      ["Mobilitetslager", "Valfritt stöd för platser där ett batteri behöver flyttas längre."],
    ],
    mobilityBody:
      "För utvalda situationer där arbetsytan är utspridd eller svår att nå med bil kan ett mobilitetslager hjälpa till att flytta ett batteri längre. Det är inte kärnan i systemet, utan ett tillval för team som behöver ett snabbare sätt att flytta ett batteri mellan åtkomstpunkter.",
    mobilityTags: ["Större platser", "Avlägsna åtkomstpunkter", "Från parkering till arbetsyta", "Lätt batteritransport"],
    ctaTitle: "Börja med rätt batteriupplägg för teamet.",
    ctaBody:
      "Prata med Alva om era rutter, fordon, teamrutiner och vilken typ av enheter eller arbetsmoment ni behöver stödja. Börja med en praktisk setup och bygg ut när verksamheten växer.",
    ctaPrimary: "Kontakta Alva",
    ctaSecondary: "Visa produkter",
    labels: {
      workflow: "Arbetsflödet",
      vanToWorkstation: "Från bil till arbetsyta",
      lastMeter: "Sista biten",
      ecosystem: "Ekosystemet",
      optionalMobility: "Valfri mobilitet",
      mobilityTitle: "Flytta ett batteri över större arbetsytor.",
      planSetup: "Planera en setup",
    },
  },
};

function getSolutionCopy(type, lang) {
  const base = SOLUTION_PAGE_COPY[type] ?? SOLUTION_PAGE_COPY["summer-house"];
  return lang === "sv" ? (SOLUTION_PAGE_SV_COPY[type] ?? base) : base;
}

export function renderSolutionDetailPage({ type, lang }) {
  const copy = getSolutionCopy(type, lang);

  return copy.type === "field"
    ? renderFieldPage(copy, lang)
    : renderSummerHousePage(copy, lang);
}

function renderSummerHousePage(copy, lang) {
 const sv=lang==='sv';
 const hero={...copy,primaryCta:sv?'Planera batterikapacitet':'Plan battery capacity',primaryHref:'/views/products.html?scenario=summer#setup-estimator',secondaryCta:sv?'Solenergi med Tracker':'Solar with Tracker',secondaryHref:'#summer-solar'};
 return `
   ${renderHero(hero)}
   ${renderSummerSolar(lang)}
   <section class="refined-section"><div class="refined-section-head"><div><span class="eyebrow">${sv?'DIN SETUP':'YOUR SETUP'}</span><h2>${sv?'Börja med lagring. Ta med energin.':'Start with storage. Take energy with you.'}</h2><p>${sv?'Välj kapacitet för din vistelse och lägg till FieldPack om batterierna ska följa med till trädgården eller bryggan.':'Choose capacity for your stay, and add FieldPack when your batteries need to come along to the garden or dock.'}</p></div></div>${renderProductDirectory(lang,['voltrix-5-pack-kit','voltrix-battery-module','voltrix-fieldpack'],{compact:true})}</section>
   <section class="refined-section solution-practical"><h2>${sv?'Planera efter platsen och vistelsen.':'Plan around your site and your stay.'}</h2><p>${sv?'Har du redan solpaneler? Alva hjälper dig att kontrollera anslutning och kompatibilitet. Överväger du Tracker? Vi går igenom placering, paneler och installation tillsammans.':'Already have solar panels? Alva helps check connections and compatibility. Considering Tracker? We review placement, panels and installation together.'}</p><p>${sv?'Välj batterikapacitet efter utrustningen du använder och tiden mellan säkra laddningar. Solenergi kompletterar planeringen, utan att garantera en viss drifttid.':'Choose battery capacity around the equipment you use and the time between reliable recharges. Solar complements the plan without guaranteeing a particular runtime.'}</p><a class="button button--primary" href="/views/products.html?scenario=summer#setup-estimator">${sv?'Planera min setup':'Plan my setup'}</a></section>
 `;
}
function renderFieldPage(copy, lang) {
 const sv=lang==='sv';
 const hero={...copy,primaryCta:sv?'Planera för teamet':'Plan for your team',primaryHref:'/views/products.html?scenario=installer#setup-estimator',secondaryCta:sv?'Utforska FieldPack':'Explore FieldPack',secondaryHref:'/views/product.html?slug=voltrix-fieldpack'};
 return `
 ${renderHero(hero)}
 ${renderTimeline({eyebrow:copy.labels?.workflow??'The workflow',title:copy.workflowTitle,body:copy.workflowBody,steps:copy.steps,variant:'field'})}
 <section class="refined-section"><div class="refined-section-head"><div><h2>${sv?'Från verkstad till arbetsplats.':'From workshop to job site.'}</h2><p>${sv?'Voltrix förbereder batterierna. FieldPack ger portabel ström där arbetet sker. VoltDock stödjer enheter och tillfälliga arbetsytor.':'Voltrix prepares the batteries. FieldPack brings portable power to the job. VoltDock supports devices and temporary workstations.'}</p></div></div>${renderProductDirectory(lang,['voltrix-5-pack-kit','voltrix-fieldpack','voltdock'],{compact:true})}</section>
 <section class="refined-section solution-practical"><h2>${copy.ctaTitle}</h2><p>${copy.ctaBody}</p><div class="refined-actions"><a class="button button--primary" href="/views/products.html?scenario=installer#setup-estimator">${sv?'Planera för teamet':'Plan for your team'}</a><a class="text-link" href="/views/b2b.html">${copy.ctaPrimary} →</a></div></section>
 `;
}

function renderHero(copy) {
  return `
    <section class="solution-page-hero solution-page-hero--${copy.type}">
      <div class="solution-page-hero__copy">
        <span class="eyebrow">${copy.eyebrow}</span>
        <h1>${copy.title}</h1>
        <p>${copy.intro}</p>
        ${copy.type==='field'?`<ol class="solution-hero-flow" aria-label="${copy.line}">${copy.line.split('→').map((step,index)=>`<li><span>${String(index+1).padStart(2,'0')}</span>${step.trim()}</li>`).join('')}</ol>`:`<p class="solution-page-hero__line">${copy.line}</p>`}
        <div class="solution-page__actions">
          <a class="button button--primary" href="${copy.primaryHref}">${copy.primaryCta}</a>
          <a class="button button--secondary" href="${copy.secondaryHref}">${copy.secondaryCta}</a>
        </div>
      </div>
      <div class="solution-page__visual ${copy.heroClass}" role="img" aria-label="${copy.heroLabel}"></div>
    </section>
  `;
}

function renderStatement(copy) {
  return `
    <section class="solution-page-statement">
      <h2>${copy.statement}</h2>
      <p>${copy.statementBody}</p>
      <div class="solution-page-tags">
        ${copy.statementTags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderSplit({ eyebrow, title, body, bodyTwo, bullets, tags, imageClass, reverse = false }) {
  return `
    <section class="solution-page-split ${reverse ? "solution-page-split--reverse" : ""}">
      ${renderSplitImage(imageClass)}
      <div class="solution-page-split__copy">
        <span class="eyebrow">${eyebrow}</span>
        <h2>${title}</h2>
        <p>${body}</p>
        ${bodyTwo ? `<p>${bodyTwo}</p>` : ""}
        ${bullets ? `<ul class="solution-page-list">${bullets.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
        ${tags ? `<div class="solution-page-tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>` : ""}
      </div>
    </section>
  `;
}

function renderSplitImage(imageClass) {
  if (imageClass === "solution-page__image--field-backpack") {
    return `
      <a class="solution-page__image solution-page__image--fieldpack" href="/views/product.html?slug=voltrix-fieldpack" aria-label="Voltrix FieldPack">
        <img src="/Picture/products/marine/marine_field_backpack_1.webp" alt="Voltrix FieldPack" loading="lazy">
      </a>
    `;
  }

  return `<div class="solution-page__image ${imageClass}" aria-hidden="true"></div>`;
}

function renderTimeline({ eyebrow, title, body, steps, variant }) {
  return `
    <section class="solution-page-timeline solution-page-timeline--${variant}">
      <div class="solution-page-section__head">
        <span class="eyebrow">${eyebrow}</span>
        <h2>${title}</h2>
        <p>${body}</p>
      </div>
      <div class="solution-page-rail">
        ${steps.map(([stepTitle, stepBody], index) => `
          <article class="solution-page-step">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${stepTitle}</h3>
            <p>${stepBody}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderImageBand(copy) {
  return `
    <section class="solution-page-band ${copy.bandClass}">
      <div class="solution-page-band__content">
        <span class="eyebrow">${copy.labels?.beyondTheWall ?? "Beyond the wall"}</span>
        <h2>${copy.bandTitle}</h2>
        <p>${copy.bandBody}</p>
        <div class="solution-page-tags solution-page-tags--light">
          ${copy.bandTags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderEcosystemCards(copy) {
  return `
    <section class="solution-page-ecosystem-cards">
      <div class="solution-page-section__head">
        <span class="eyebrow">${copy.labels?.ecosystem ?? "The ecosystem"}</span>
        <h2>${copy.ecosystemTitle}</h2>
        <p>${copy.ecosystemBody}</p>
      </div>
      <div class="solution-page-addon-grid">
        ${copy.ecosystem.map(([title, body]) => `
          <article class="solution-page-addon">
            <span></span>
            <h3>${title}</h3>
            <p>${body}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderEcosystemStrip(copy) {
  return `
    <section class="solution-page-ecosystem-strip">
      <div class="solution-page-section__head">
        <span class="eyebrow">${copy.labels?.ecosystem ?? "The ecosystem"}</span>
        <h2>${copy.ecosystemTitle}</h2>
        <p>${copy.ecosystemBody}</p>
      </div>
      <div class="solution-page-strip">
        ${copy.ecosystem.map(([title, body], index) => `
          <article>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${title}</h3>
            <p>${body}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderProofBand(copy) {
  return `
    <section class="solution-page-proof">
      <div>
        <span class="eyebrow">${copy.labels?.nordicConditions ?? "Nordic conditions"}</span>
        <h2>${copy.labels?.nordicTitle ?? "Designed for changing Nordic routines."}</h2>
        <p>${copy.proofBody}</p>
      </div>
      <div class="solution-page-proof__badges">
        <span>-20°C to +45°C</span>
        <span>IP65</span>
        <span>1-7 Battery Packs per Voltrix group / PCS</span>
      </div>
    </section>
  `;
}

function renderMobilityNote(copy) {
  return `
    <section class="solution-page-note">
      <div>
        <span class="eyebrow">${copy.labels?.optionalMobility ?? "Optional mobility"}</span>
        <h2>${copy.labels?.mobilityTitle ?? "Move one battery across larger sites."}</h2>
        <p>${copy.mobilityBody}</p>
      </div>
      <div class="solution-page-tags">
        ${copy.mobilityTags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderCta(copy) {
  return `
    <section class="solution-page-cta">
      <span class="eyebrow">${copy.type === "field" ? (copy.labels?.planSetup ?? "Plan a setup") : (copy.labels?.getStarted ?? "Get started")}</span>
      <h2>${copy.ctaTitle}</h2>
      <p>${copy.ctaBody}</p>
      ${copy.ctaHighlight ? `
        <div class="solution-page-cta__highlight">
          <strong>${copy.ctaHighlight}</strong>
          <span>${copy.ctaHighlightBody}</span>
        </div>
      ` : ""}
      <div class="solution-page__actions">
        <a class="button button--primary" href="${copy.ctaPrimaryHref}">${copy.ctaPrimary}</a>
        <a class="button button--secondary" href="${copy.ctaSecondaryHref}">${copy.ctaSecondary}</a>
      </div>
    </section>
  `;
}

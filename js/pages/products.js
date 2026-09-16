import { bindSetupEstimator, renderSetupEstimator } from '../components/setup-estimator.js';
import { renderProductDirectory, CORE_PRODUCTS, COMPONENT_PRODUCTS, ACCESSORY_PRODUCTS } from '../components/product-directory.js';
export function renderProductsPage({lang}) {
 const sv=lang==='sv';
 return `<header class="catalog-intro refined-section"><span class="eyebrow">${sv?'PRODUKTER':'PRODUCTS'}</span>
   <h1 id="catalog-core-title">${sv?'Hitta delarna för din vardag.':'Find the pieces for your everyday.'}</h1>
   <p>${sv?'Voltrix hemma. FieldPack på plats. Solenergi med Tracker.':'Voltrix at home. FieldPack on the move. Solar with Tracker.'}</p>
   <nav class="catalog-jump" aria-label="${sv?'På denna sida':'On this page'}"><a href="#system-components">${sv?'Produkter':'Products'}</a><a href="#product-addons">${sv?'Tillbehör':'Accessories'}</a><a href="#setup-estimator">${sv?'Planera':'Planner'}</a></nav>
 </header>
 <section class="refined-section catalog-section" id="system-components" aria-labelledby="catalog-core-title"><span id="featured-setup" class="anchor-alias"></span>${renderProductDirectory(lang,CORE_PRODUCTS)}</section>
 <section class="refined-section catalog-section" id="product-addons" aria-labelledby="catalog-components-title"><h2 id="catalog-components-title">${sv?'Batterier & systemdelar':'Batteries & system components'}</h2>${renderProductDirectory(lang,COMPONENT_PRODUCTS,{compact:true})}
 <h2 class="catalog-subtitle">${sv?'Kompatibla tillbehör':'Compatible accessories'}</h2>${renderProductDirectory(lang,ACCESSORY_PRODUCTS,{compact:true})}</section>
 ${renderSetupEstimator({context:'products'})}
 <section class="refined-section catalog-help" id="system-specs"><details><summary>${sv?'Hur hänger delarna ihop?':'How do the pieces fit together?'}</summary><div class="catalog-help__body"><p>${sv?'En Voltrix-grupp har en PCS och upp till sju Battery Packs. FieldPack har en egen inbyggd PCS och plats för upp till två pack. Tracker är en separat solenergilösning som planeras efter plats och kompatibla paneler.':'One Voltrix group has a PCS and up to seven Battery Packs. FieldPack has its own integrated PCS and room for up to two packs. Tracker is a separate solar solution planned around your site and compatible panels.'}</p><p>${sv?'Specifikationer och vad som ingår finns på respektive produktsida. Nödvändig montering ingår med Voltrix.':'Specifications and included items are on each product page. Required mounting is included with Voltrix.'}</p></div></details><a class="text-link" href="/views/b2b.html">${sv?'Få hjälp att välja':'Get help choosing'} →</a></section>`;
}
export function afterRenderProductsPage(){bindSetupEstimator();}

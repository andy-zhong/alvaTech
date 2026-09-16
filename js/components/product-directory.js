import { getProductBySlug, getProductContent } from '../services/product-service.js';
export const CORE_PRODUCTS = ['voltrix-5-pack-kit', 'voltrix-fieldpack', 'solar-tracking-system'];
export const COMPONENT_PRODUCTS = ['voltrix-battery-module', 'voltrix-inverter'];
export const ACCESSORY_PRODUCTS = ['voltdock', 'bike-accessory', 'backpack-power'];
const CARD_COPY = {
  'voltrix-5-pack-kit': ['Your energy base', 'Din energibas', 'PCS + 5 Battery Packs. A 5 kWh starting point, with required mounting included.', 'PCS + 5 Battery Packs. En start med 5 kWh och nödvändig montering inkluderad.'],
  'voltrix-fieldpack': ['Portable power', 'Portabel ström', 'Integrated PCS and room for 1–2 Battery Packs. Take the same batteries to work or aboard.', 'Inbyggd PCS och plats för 1–2 Battery Packs. Ta med samma batterier till jobbet eller båten.'],
  'solar-tracking-system': ['Solar for your summer house', 'Solenergi för fritidshuset', 'A sun-tracking mount for your compatible solar panels, planned with Voltrix.', 'Ett solföljande stativ för dina kompatibla solpaneler, planerat med Voltrix.'],
  'voltrix-battery-module': ['Shared capacity', 'Gemensam kapacitet', '1 kWh per removable pack. Add capacity or share batteries between Voltrix and FieldPack.', '1 kWh per löstagbart pack. Utöka kapaciteten eller dela batterier mellan Voltrix och FieldPack.'],
  'voltrix-inverter': ['System component', 'Systemkomponent', 'The PCS for a Voltrix group with up to seven Battery Packs.', 'PCS för en Voltrix-grupp med upp till sju Battery Packs.'],
};
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function renderProductDirectory(lang, slugs = CORE_PRODUCTS, {compact=false} = {}) {
  const sv=lang==='sv';
  return `<div class="product-directory${compact?' product-directory--compact':''}">${slugs.map(slug=>{
    const product=getProductBySlug(slug); if(!product||product.hidden||product.includedWith) return '';
    const c=getProductContent(product,lang), copy=CARD_COPY[slug];
    const role=copy?.[sv?1:0]??(sv?'Kompatibelt tillbehör':'Compatible accessory');
    const description=copy?.[sv?3:2]??c.summary;
    return `<article class="directory-product" data-directory-product="${slug}">
      <a href="/views/product.html?slug=${slug}" class="directory-product__link">
        <figure><img src="${product.thumbnail||product.heroImage}" alt="${escape(c.name)}" loading="lazy" decoding="async" width="640" height="480"></figure>
        <div class="directory-product__copy"><span class="eyebrow">${role}</span><h3>${escape(c.name)}</h3><p>${escape(description)}</p><span class="directory-product__more">${sv?'Utforska produkten':'Explore product'} <span aria-hidden="true">→</span></span></div>
      </a>
      ${slug==='solar-tracking-system'?`<a class="directory-product__context" href="/views/solution-summer-house.html#summer-solar">${sv?'Se lösningen för fritidshuset':'See the summer house solution'} <span aria-hidden="true">→</span></a>`:''}
    </article>`;
  }).join('')}</div>`;
}

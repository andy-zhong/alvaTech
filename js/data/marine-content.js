
export const MARINE_ASSETS = {
  hero: '/Picture/products/marine/marine_field_backpack_inuse_9.webp',
  journey: '/Picture/products/marine/marine_field_backpack_inuse_3.webp',
  onboard: '/Picture/products/marine/marine_field_backpack_inuse_7.webp',
  product: '/Picture/products/marine/marine_field_backpack_1.webp',
  flowProduct: '/Picture/products/marine/marine_field_backpack_inuse_4.webp',
};
export function getMarineContent(lang) {
  const sv = lang === 'sv';
  return {
    id: 'marine', label: sv ? 'Båtliv' : 'Marine',
    headline: sv ? 'Energi från land till båt' : 'Energy from shore to boat',
    headlineLines: sv ? ['Energi från land', 'till båt'] : ['Energy from shore', 'to boat'],
    title: sv ? 'För livet på och vid vattnet' : 'For life on and around the water',
    body: sv ? 'Ta med FieldPack och dina Battery Packs ombord. Det flytande höljet ger extra trygghet nära vattnet, samtidigt som du kan ladda med solenergi och dela batterier med Voltrix på land.' : 'Bring FieldPack and your Battery Packs aboard. Its buoyant enclosure adds reassurance around water, while solar charging and shared batteries connect the boat with Voltrix on shore.',
    benefits: sv ? ['FieldPack ombord', 'Flyter med skyddslocken stängda', 'Solenergi och delade batterier'] : ['FieldPack aboard', 'Floats with covers secured', 'Solar and shared batteries'],
    cta: sv ? 'Utforska båtliv' : 'Explore Marine',
    href: '/views/solution-marine.html',
    productCta: sv ? 'Se FieldPack' : 'View FieldPack',
    productHref: '/views/product.html?slug=voltrix-fieldpack',
    detail: {
      eyebrow: sv ? 'Båtliv' : 'Marine',
      title: sv ? 'En batteriplattform, på land och ombord.' : 'One battery platform, on shore and aboard.',
      body: sv ? 'FieldPack ger dina löstagbara Battery Packs ett portabelt format för båten och bryggan. Tillbaka på land kan batterierna användas i Voltrix igen.' : 'FieldPack gives your removable Battery Packs a portable home for the boat and dock. Back on shore, use those batteries in Voltrix again.',
      bullets: sv ? ['Inbyggd PCS', 'Plats för upp till två Battery Packs', 'Flytande hölje med skyddslocken stängda', 'Solcellsladdning samtidigt som ström levereras', 'Delade batterier med Voltrix på land'] : ['Integrated PCS', 'Room for up to two Battery Packs', 'Buoyant enclosure with protective covers secured', 'Solar charging while supplying power', 'Shared batteries with Voltrix on shore'],
    },
  };
}

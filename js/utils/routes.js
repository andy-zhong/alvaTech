export function getRootPath(page) {
  return page === "home" ? "." : "..";
}

export function createRouteHelpers(page) {
  const root = getRootPath(page);

  const route = (path) => `${root}/${path}`;

  return {
    root,
    route,
    productUrl: (slug) => route(`views/product.html?slug=${encodeURIComponent(slug)}`),
    buyProductUrl: (slug) => route(`views/buy-product.html?slug=${encodeURIComponent(slug)}`),
    getCurrentSlug: () => new URLSearchParams(window.location.search).get("slug")
  };
}

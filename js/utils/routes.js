export function getRootPath() {
  const depth = window.location.pathname.split("/").length - 2;

  return depth === 0
    ? "."
    : "../".repeat(depth);
}

export function createRouteHelpers() {
  const root = getRootPath();

  const route = (path) => `${root}/${path}`;

  return {
    root,
    route,
    productUrl: (slug) =>
      route(`views/product.html?slug=${encodeURIComponent(slug)}`),
    buyProductUrl: (slug) =>
      route(`views/buy-product.html?slug=${encodeURIComponent(slug)}`),
    getCurrentSlug: () =>
      new URLSearchParams(window.location.search).get("slug"),
  };
}
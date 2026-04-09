import { getProductBySlug, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

export function renderProductDetailPage({ lang, slug, route, buyProductUrl }) {
  const product = getProductBySlug(slug);
  if (!product) {
    return renderMissingProduct({ lang, route });
  }

  const content = getProductContent(product, lang);

  return `
    <section class="detail-hero">
      <article class="detail-media">
        ${renderMediaItem(product.heroMedia ?? { type: "image", src: product.heroImage, alt: content.name }, content.name)}
      </article>
      <article class="detail-copy">
        <span class="eyebrow">${t(lang, "detailEyebrow")}</span>
        <div class="price-badge">${product.price}</div>
        <h1>${content.name}</h1>
        <p>${content.intro}</p>
        <div class="detail-actions">
          <a class="button button--primary" href="${buyProductUrl(product.slug)}">${t(lang, "detailBuy")}</a>
          <a class="button button--secondary" href="${route("views/products.html")}">${t(lang, "detailBack")}</a>
        </div>
      </article>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>${t(lang, "detailGallery")}</h2>
      </div>
      <div class="grid">
        ${product.gallery.map((media, index) => `
          <article class="product-card">
            ${renderMediaItem(media, `${content.name} ${index + 1}`)}
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section">
      <div class="info-grid">
        <article class="panel">
          <h3>${t(lang, "detailFeatures")}</h3>
          <ul class="detail-list">
            ${content.features.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
        <article class="panel">
          <h3>${t(lang, "detailSupport")}</h3>
          <ul class="support-list">
            <li>${content.summary}</li>
            <li>${product.price}</li>
            <li>${t(lang, "productCardStatus")}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="spec-grid">
        <article class="panel">
          <h3>${t(lang, "detailSpecifications")}</h3>
          <div class="spec-grid">
            ${content.specs.map((item) => `
              <article class="spec-card">
                <h3>${item.label}</h3>
                <p>${item.value}</p>
              </article>
            `).join("")}
          </div>
        </article>
        <article class="panel">
          <h3>${t(lang, "detailCertifications")}</h3>
          <ul class="detail-list">
            ${content.certifications.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="info-grid">
        <article class="panel">
          <h3>${t(lang, "detailUseCases")}</h3>
          <ul class="detail-list">
            ${content.useCases.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
        <article class="panel">
          <h3>${t(lang, "detailFaq")}</h3>
          <ul class="faq-list">
            ${content.faq.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      </div>
    </section>
  `;
}

function renderMediaItem(media, fallbackAlt) {
  const type = media?.type ?? "image";
  const src = media?.src ?? "";
  const alt = media?.alt ?? fallbackAlt;

  if (type === "video") {
    return `
      <video class="media-asset" controls playsinline preload="metadata" aria-label="${alt}">
        <source src="${src}">
        ${alt}
      </video>
    `;
  }

  return `<img class="media-asset" src="${src}" alt="${alt}">`;
}

export function renderMissingProduct({ lang, route }) {
  return `
    <section class="section">
      <article class="empty-state">
        <h1>${t(lang, "missingProductTitle")}</h1>
        <p class="muted">${t(lang, "missingProductBody")}</p>
        <div class="section">
          <a class="button button--secondary" href="${route("views/products.html")}">${t(lang, "backToProducts")}</a>
        </div>
      </article>
    </section>
  `;
}

export function bindSectionNav(nav, { rootMargin = "-112px 0px -58%" } = {}) {
  if (!nav || !window.matchMedia("(max-width: 860px)").matches) return;

  const links = [...nav.querySelectorAll("[data-section-link]")];
  const sections = links
    .map((link) => document.getElementById(link.dataset.sectionLink))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    links.forEach((link) => {
      const active = link.dataset.sectionLink === visible.target.id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
      if (active) {
        const track = link.parentElement;
        const left = link.offsetLeft - (track.clientWidth - link.offsetWidth) / 2;
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        track.scrollTo({ left, behavior });
      }
    });
  }, { rootMargin, threshold: [0, 0.15, 0.5] });

  sections.forEach((section) => observer.observe(section));
}

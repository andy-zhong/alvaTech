const placeholderImage = (title) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#0d2624" />
          <stop offset="55%" stop-color="#112f2b" />
          <stop offset="100%" stop-color="#081816" />
        </linearGradient>
        <linearGradient id="line" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#d9e85c" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#8ca134" stop-opacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" rx="48" fill="url(#bg)" />
      <circle cx="920" cy="220" r="160" fill="#c6d247" fill-opacity="0.12" />
      <circle cx="290" cy="700" r="180" fill="#c6d247" fill-opacity="0.06" />
      <rect x="150" y="150" width="900" height="600" rx="36" fill="none" stroke="url(#line)" stroke-width="3" />
      <path d="M250 600C360 500 465 438 560 420C664 399 783 420 940 520" fill="none" stroke="#c6d247" stroke-opacity="0.32" stroke-width="8" stroke-linecap="round" />
      <text x="600" y="438" text-anchor="middle" fill="#f3f6f2" font-family="Arial, sans-serif" font-size="68" font-weight="700">${title}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const PRODUCTS = [
  {
    slug: "product-1",
    name: "Product 1",
    shortName: "Product 1",
    heroImage: placeholderImage("product 1 picture"),
    heroMedia: createMediaItem(placeholderImage("product 1 picture"), "product 1 picture"),
    gallery: [
      createMediaItem(placeholderImage("product 1 picture"), "product 1 picture"),
      createMediaItem(placeholderImage("product 1 picture detail"), "product 1 picture detail")
    ],
    price: "0 SEK",
    status: "available",
    buyEnabled: true,
    translations: {
      en: {
        name: "Product 1",
        shortName: "Product 1",
        summary: "Product 1 intro",
        intro: "Product 1 intro",
        features: [
          "Placeholder feature architecture for future launch copy.",
          "Structured section ready for real consumer-facing benefits.",
          "Premium presentation pattern aligned with Alva brand styling."
        ],
        certifications: [
          "Certification placeholder",
          "Regulatory placeholder",
          "Compliance placeholder"
        ],
        specs: [
          { label: "Power range", value: "TBD" },
          { label: "Installation", value: "TBD" },
          { label: "Connectivity", value: "TBD" },
          { label: "Warranty", value: "TBD" }
        ],
        useCases: [
          "Residential energy setup placeholder",
          "Connected home placeholder",
          "Future direct-to-consumer offer placeholder"
        ],
        faq: [
          "FAQ placeholder for launch questions.",
          "FAQ placeholder for shipping and installation.",
          "FAQ placeholder for compatibility."
        ]
      },
      sv: {
        name: "Product 1",
        shortName: "Product 1",
        summary: "Produkt 1 intro",
        intro: "Produkt 1 intro",
        features: [
          "Platshallare for framtida lanseringscopy.",
          "Strukturerad sektion redo for riktiga konsumentnyttor.",
          "Premiumpresentation i linje med Alvas visuella uttryck."
        ],
        certifications: [
          "Platshallare for certifiering",
          "Platshallare for regelkrav",
          "Platshallare for efterlevnad"
        ],
        specs: [
          { label: "Effektomrade", value: "TBD" },
          { label: "Installation", value: "TBD" },
          { label: "Uppkoppling", value: "TBD" },
          { label: "Garanti", value: "TBD" }
        ],
        useCases: [
          "Platshallare for energilosning i hemmet",
          "Platshallare for uppkopplat hem",
          "Platshallare for framtida konsumenterbjudande"
        ],
        faq: [
          "Platshallare for vanliga fragor vid lansering.",
          "Platshallare for leverans och installation.",
          "Platshallare for kompatibilitet."
        ]
      }
    }
  },
  {
    slug: "product-2",
    name: "Product 2",
    shortName: "Product 2",
    heroImage: placeholderImage("product 2 picture"),
    heroMedia: createMediaItem(placeholderImage("product 2 picture"), "product 2 picture"),
    gallery: [
      createMediaItem(placeholderImage("product 2 picture"), "product 2 picture"),
      createMediaItem(placeholderImage("product 2 picture detail"), "product 2 picture detail")
    ],
    price: "0 SEK",
    status: "available",
    buyEnabled: true,
    translations: {
      en: {
        name: "Product 2",
        shortName: "Product 2",
        summary: "Product 2 intro",
        intro: "Product 2 intro",
        features: [
          "Placeholder feature architecture for future launch copy.",
          "Structured section ready for real consumer-facing benefits.",
          "Premium presentation pattern aligned with Alva brand styling."
        ],
        certifications: [
          "Certification placeholder",
          "Regulatory placeholder",
          "Compliance placeholder"
        ],
        specs: [
          { label: "Power range", value: "TBD" },
          { label: "Installation", value: "TBD" },
          { label: "Connectivity", value: "TBD" },
          { label: "Warranty", value: "TBD" }
        ],
        useCases: [
          "Residential energy setup placeholder",
          "Connected home placeholder",
          "Future direct-to-consumer offer placeholder"
        ],
        faq: [
          "FAQ placeholder for launch questions.",
          "FAQ placeholder for shipping and installation.",
          "FAQ placeholder for compatibility."
        ]
      },
      sv: {
        name: "Product 2",
        shortName: "Product 2",
        summary: "Produkt 2 intro",
        intro: "Produkt 2 intro",
        features: [
          "Platshallare for framtida lanseringscopy.",
          "Strukturerad sektion redo for riktiga konsumentnyttor.",
          "Premiumpresentation i linje med Alvas visuella uttryck."
        ],
        certifications: [
          "Platshallare for certifiering",
          "Platshallare for regelkrav",
          "Platshallare for efterlevnad"
        ],
        specs: [
          { label: "Effektomrade", value: "TBD" },
          { label: "Installation", value: "TBD" },
          { label: "Uppkoppling", value: "TBD" },
          { label: "Garanti", value: "TBD" }
        ],
        useCases: [
          "Platshallare for energilosning i hemmet",
          "Platshallare for uppkopplat hem",
          "Platshallare for framtida konsumenterbjudande"
        ],
        faq: [
          "Platshallare for vanliga fragor vid lansering.",
          "Platshallare for leverans och installation.",
          "Platshallare for kompatibilitet."
        ]
      }
    }
  }
  // Future products:
  // For Product 3 and Product 4 you can use:
  // heroMedia: { type: "image" | "video", src: "...", alt: "..." }
  // gallery: [{ type: "image" | "video", src: "...", alt: "..." }]
  // GIF assets can be used as normal image sources.
  // Add Product 3 here using the same object shape.
  // Add Product 4 here using the same object shape.
];

import { SITE_URL } from "@/lib/siteUrl";
import type { Product } from "@/lib/types";

/**
 * Reusable schema.org objects for The Poona Ayurveda.
 * Keep brand-level facts (name, logo, contact, social) here so every
 * page that emits structured data stays consistent.
 */

const BRAND_NAME = "The Poona Ayurveda";
// Brand logo is hosted on the WooCommerce media library (same asset the
// header <Logo> uses). Keep in sync if the logo ever moves.
const LOGO_URL =
  "https://api.thepoonaayurveda.com/wp-content/uploads/2025/01/Frame-64-1.png";

/** Stable @id so other schema can reference the org as a node. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: BRAND_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Authentic Ayurvedic wellness products — herbal oils, tablets, and choornam crafted on traditional formulations.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9730005222",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Marathi"],
  },
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: BRAND_NAME,
  url: SITE_URL,
  publisher: { "@id": ORGANIZATION_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;

/** Strip HTML tags and decode the common entities WooCommerce stores. */
function cleanText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/** A single Q&A pair for FAQPage schema. */
type Faq = { question: string; answer: string };

/** A single breadcrumb hop. */
type Crumb = { label: string; href: string };

/**
 * Product + Offer schema for a product page.
 * Price/availability come straight from WooCommerce.
 * AggregateRating is ONLY emitted when real reviews exist
 * (rating_count > 0) — we never fabricate ratings.
 */
export function buildProductSchema(product: Product) {
  const url = `${SITE_URL}/products/${product.slug}`;
  const images = (product.images || []).map((img) => img.src).filter(Boolean);

  const ratingCount = Number(product.rating_count) || 0;
  const ratingValue = Number(product.average_rating) || 0;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    url,
    ...(images.length > 0 && { image: images }),
    ...(product.short_description && {
      description: cleanText(product.short_description),
    }),
    ...(product.sku && { sku: product.sku }),
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: product.price || product.regular_price || "0",
      availability:
        product.stock_status === "instock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@id": ORGANIZATION_ID },
    },
  };

  // Only attach ratings backed by real reviews.
  if (ratingCount > 0 && ratingValue > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      reviewCount: ratingCount,
    };
  }

  return schema;
}

/** FAQPage schema from our curated product FAQ data. */
export function buildFaqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema. Mirrors the visual <Breadcrumb> trail.
 * Skips the trailing current item's URL (no href) per schema norms —
 * we still list it as the last position with the page's own URL.
 */
export function buildBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href && { item: `${SITE_URL}${crumb.href}` }),
    })),
  };
}

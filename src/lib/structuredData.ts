import { SITE_URL } from "@/lib/siteUrl";

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

/**
 * Per-product SEO overrides — keyword-led titles and meta descriptions.
 *
 * WooCommerce product names are brand-y ("Flexio Oil"), not search-intent
 * led. This map injects the actual keyword we're targeting into the <title>
 * and gives every product a non-empty meta description fallback.
 *
 * Anything NOT listed here falls back to a templated title/description built
 * from the product name (see `getProductSeo`). Add products as their target
 * keywords are validated in the SEO strategy doc.
 */

const BRAND = "The Poona Ayurveda";

type ProductSeoOverride = {
  /** Full <title> (we append the brand). Keyword-led, ≤60 chars before brand. */
  title?: string;
  /** Meta description, ~150-160 chars, benefit + intent led. */
  description?: string;
  /**
   * Short keyword-rich tagline shown as the on-page subheading under the H1.
   * Puts the primary keyword in visible body copy without spamming the H1.
   */
  tagline?: string;
};

const overrides: Record<string, ProductSeoOverride> = {
  "flexio-oil": {
    title: "Flexio Oil: Ayurvedic Joint Pain Oil with Nirgundi",
    description:
      "Flexio Oil is an Ayurvedic massage oil for joint pain, stiffness & muscle spasms. Made with Mahavishagarbha & Panchaguna Tailam. 100ml, for external use. Made in India.",
    tagline: "Ayurvedic Massage Oil for Joint Pain & Stiffness",
  },
};

/** Keyword-rich subheading for the product page, if defined. */
export function getProductTagline(slug: string): string | undefined {
  return overrides[slug]?.tagline;
}

/**
 * Returns the SEO title + description for a product.
 * Falls back to a templated title and the product's short_description
 * (then a generic template) when no override or WooCommerce copy exists.
 */
export function getProductSeo(product: {
  name: string;
  slug: string;
  short_description?: string;
}): { title: string; description: string } {
  const override = overrides[product.slug];

  const wooDescription =
    product.short_description?.replace(/<[^>]*>/g, "").trim() || "";

  const title = override?.title
    ? `${override.title} | ${BRAND}`
    : `${product.name}: Authentic Ayurvedic Product | ${BRAND}`;

  const description =
    override?.description ||
    wooDescription ||
    `Buy ${product.name} from ${BRAND}: authentic Ayurvedic formulation, crafted on traditional methods. Made in India, COD available.`;

  return { title, description };
}

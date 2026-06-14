/**
 * Display props for the product a blog post converts to (sidebar BuyCard +
 * inline ProductCTA). Keyed by product slug, matching a post's `product`
 * frontmatter. Keep prices/packs in sync with the live WooCommerce store.
 *
 * This is intentionally a tiny hand-maintained map, not a WooCommerce fetch:
 * blog pages are statically rendered and we only feature a handful of products,
 * so a build-time constant keeps the pages fast and avoids an API call per post.
 */
export type BlogProductMeta = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  price: string;
  pack: string;
  image: string;
};

const FLEXIO: BlogProductMeta = {
  slug: "flexio-oil",
  name: "Flexio Oil",
  tagline: "Ayurvedic Joint & Muscle Pain Oil with Nirgundi",
  blurb: "Ayurvedic joint & knee pain oil with Nirgundi. Formulated, ready to use.",
  price: "₹390",
  pack: "100ml",
  image:
    "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_1600_1200_2025-05-11-e1747232215172.png",
};

const blogProducts: Record<string, BlogProductMeta> = {
  "flexio-oil": FLEXIO,
  allergenie: {
    slug: "allergenie",
    name: "AllerGenie",
    tagline: "Ayurvedic Allergy Support Tablets",
    blurb: "Ayurvedic allergy support tablets. Traditional herbs for everyday relief.",
    price: "₹550",
    pack: "90 Tablets",
    image:
      "https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-7-scaled.png",
  },
};

/** Resolve a post's `product` slug to its display props; falls back to Flexio. */
export function getBlogProduct(slug?: string): BlogProductMeta {
  return (slug && blogProducts[slug]) || FLEXIO;
}

/**
 * Tag links from blog articles to product pages with a UTM source, so we can
 * measure how much the blog drives product views/sales in analytics.
 *
 * Scope is deliberate: only `/products/*` links get tagged. Tagging blog→blog
 * or other internal nav would pollute the conversion data (a blog→blog click
 * is not a product-conversion signal). External links are left untouched.
 */
const BLOG_UTM = "utm_source=blog";

/** True for internal product links (`/products/...`), which are what we track. */
function isProductLink(href: string): boolean {
  return href.startsWith("/products/");
}

/**
 * Append `?utm_source=blog` to a product link (preserving any existing query
 * and hash). Non-product links are returned unchanged.
 */
export function withBlogUtm(href: string): string {
  if (!isProductLink(href)) return href;
  if (/[?&]utm_source=/.test(href)) return href; // already tagged

  const [path, hash = ""] = href.split("#");
  const sep = path.includes("?") ? "&" : "?";
  const hashPart = hash ? `#${hash}` : "";
  return `${path}${sep}${BLOG_UTM}${hashPart}`;
}

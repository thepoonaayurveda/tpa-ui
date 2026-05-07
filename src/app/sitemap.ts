import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/woocommerce";
import { SITE_URL } from "@/lib/siteUrl";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/refund_returns`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts({ per_page: 100, status: "publish" });
    productRoutes = (products || []).map((product: any) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: product.date_modified ? new Date(product.date_modified) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("sitemap: failed to fetch products", error);
  }

  return [...staticRoutes, ...productRoutes];
}

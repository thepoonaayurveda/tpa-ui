import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/woocommerce";
import { ProductGallery } from "@/components/product/ProductGallery";
import { CompactProductInfo } from "@/components/product/CompactProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { WhyPoonaAyurvedaBest } from "@/components/product/WhyPoonaAyurvedaBest";
import { ProductFAQs } from "@/components/product/ProductFAQs";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getManualRelatedProducts } from "@/lib/productRelationships";
import { SITE_URL } from "@/lib/siteUrl";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFAQsForProduct } from "@/lib/faqData";
import { getProductSeo } from "@/lib/productSeo";
import {
  buildProductSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "@/lib/structuredData";

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const products = await getProducts({ per_page: 100 });

    return products.map((product: any) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | The Poona Ayurveda",
    };
  }

  const productCategories =
    product.categories?.map((c: any) => c.name).join(", ") || "";

  // Keyword-led title + non-empty description (override map → Woo copy → template).
  const { title, description } = getProductSeo(product);

  return {
    title,
    description,
    keywords: `${product.name}, ayurveda, ayurvedic products, ${productCategories}`,
    alternates: {
      // Canonical to the clean slug URL so ?category= / tracking params
      // don't fragment ranking signals across duplicate URLs.
      canonical: `/products/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      images:
        product.images?.map((img: any) => ({
          url: img.src,
          alt: img.alt || product.name,
        })) || [],
      type: "website",
      url: `${SITE_URL}/products/${params.slug}`,
      siteName: "The Poona Ayurveda",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.images?.[0]?.src ? [product.images[0].src] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Get related products with manual relationships priority
  let relatedProducts = [];
  
  try {
    // 1. First priority: Manual relationships
    const manualRelatedSlugs = getManualRelatedProducts(product.slug);
    
    if (manualRelatedSlugs.length > 0) {
      // Fetch products by slugs for manual relationships
      const manualRelatedProducts = await Promise.all(
        manualRelatedSlugs.map(async (slug) => {
          try {
            return await getProductBySlug(slug);
          } catch (error) {
            console.error(`Error fetching related product ${slug}:`, error);
            return null;
          }
        })
      );

      // Filter out null results and limit to 4
      relatedProducts = manualRelatedProducts
        .filter(p => p !== null)
        .slice(0, 4);
    }

    // 2. If we need more products, supplement with category-based
    if (relatedProducts.length < 4 && product.categories?.[0]?.id) {
      const categoryProducts = await getProducts({
        category: product.categories[0].id,
        exclude: [product.id, ...relatedProducts.map(p => p.id)],
        per_page: 4 - relatedProducts.length,
      });
      relatedProducts = [...relatedProducts, ...categoryProducts];
    }

    // 3. Final fallback: get popular products if still not enough
    if (relatedProducts.length < 4) {
      const popularProducts = await getProducts({
        exclude: [product.id, ...relatedProducts.map(p => p.id)],
        per_page: 4 - relatedProducts.length,
        orderby: 'popularity',
      });
      relatedProducts = [...relatedProducts, ...popularProducts];
    }

  } catch (error) {
    console.error("Error fetching related products:", error);
    // Ultimate fallback: get any other products
    try {
      relatedProducts = await getProducts({
        exclude: [product.id],
        per_page: 4,
      });
    } catch (fallbackError) {
      console.error("Fallback related products fetch failed:", fallbackError);
      relatedProducts = [];
    }
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    ...(product.categories?.[0]
      ? [
          {
            label: product.categories[0].name,
            href: `/products?category=${product.categories[0].slug}`,
          },
        ]
      : []),
    { label: product.name, href: "", current: true },
  ];

  // Structured data (JSON-LD). Breadcrumb schema carries the product's own
  // URL for the last hop (the visual trail leaves it hrefless).
  const breadcrumbSchemaItems = breadcrumbItems.map((item) =>
    item.current
      ? { label: item.label, href: `/products/${product.slug}` }
      : { label: item.label, href: item.href }
  );
  const productFaqs = getFAQsForProduct(product.slug);
  const structuredData = [
    buildProductSchema(product),
    buildBreadcrumbSchema(breadcrumbSchemaItems),
    ...(productFaqs.length > 0 ? [buildFaqSchema(productFaqs)] : []),
  ];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={structuredData} />
      {/* Above the Fold Section - Exact Layout from product_page.png */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Product Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Product Gallery */}
          <div className="lg:sticky lg:top-8 lg:h-fit lg:max-h-screen">
            <ProductGallery
              images={product.images || []}
              productName={product.name}
            />
          </div>

          {/* Right Side - Compact Product Info */}
          <div>
            <CompactProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* Below the Fold Content */}

      {/* FAQs Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ProductFAQs productSlug={product.slug} />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      )}
    </div>
  );
}

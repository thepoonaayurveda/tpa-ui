import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/woocommerce";
import { ProductGallery } from "@/components/product/ProductGallery";
import { CompactProductInfo } from "@/components/product/CompactProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { WhyPoonaAyurvedaBest } from "@/components/product/WhyPoonaAyurvedaBest";
import { ProductFAQs } from "@/components/product/ProductFAQs";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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

  const cleanDescription =
    product.short_description?.replace(/<[^>]*>/g, "") || "";
  const productCategories =
    product.categories?.map((c: any) => c.name).join(", ") || "";

  return {
    title: `${product.name} | The Poona Ayurveda`,
    description: cleanDescription,
    keywords: `${product.name}, ayurveda, ayurvedic products, ${productCategories}`,
    openGraph: {
      title: product.name,
      description: cleanDescription,
      images:
        product.images?.map((img: any) => ({
          url: img.src,
          alt: img.alt || product.name,
        })) || [],
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${params.slug}`,
      siteName: "The Poona Ayurveda",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: cleanDescription,
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

  // Get related products from the same category
  const relatedProducts = await getProducts({
    category: product.categories?.[0]?.id,
    exclude: [product.id],
    per_page: 4,
  });

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

  return (
    <div className="min-h-screen bg-white">
      {/* Above the Fold Section - Exact Layout from product_page.png */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Product Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Side - Product Gallery */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductGallery
              images={product.images || []}
              productName={product.name}
            />
          </div>

          {/* Right Side - Compact Product Info (Scrollable) */}
          <div className="lg:max-h-screen">
            <CompactProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* Below the Fold Content */}

      {/* FAQs Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ProductFAQs productName={product.name} />
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

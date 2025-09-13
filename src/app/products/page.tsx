import { Metadata } from "next";
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/woocommerce";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "All Products | The Poona Ayurveda",
  description: "Discover our complete range of authentic Ayurvedic products for holistic wellness. From herbal oils to tablets and choornam, find natural solutions for your health needs.",
  keywords: "ayurvedic products, herbal medicines, natural wellness, ayurvedic oils, tablets, choornam, holistic health",
  openGraph: {
    title: "All Products | The Poona Ayurveda",
    description: "Discover our complete range of authentic Ayurvedic products for holistic wellness.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/products`,
    siteName: "The Poona Ayurveda",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Products | The Poona Ayurveda",
    description: "Discover our complete range of authentic Ayurvedic products for holistic wellness.",
  },
};

interface ProductsPageProps {
  searchParams: { category?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const selectedCategory = searchParams.category;
  
  // Fetch all products and categories
  const [allProducts, categories] = await Promise.all([
    getProducts({ per_page: 100 }),
    getCategories()
  ]);

  // Filter products by category if selected
  const products = selectedCategory 
    ? allProducts.filter((product: any) => 
        product.categories?.some((cat: any) => cat.slug === selectedCategory)
      )
    : allProducts;
  
  // Find selected category info
  const selectedCategoryInfo = selectedCategory 
    ? categories.find((cat: any) => cat.slug === selectedCategory)
    : null;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...(selectedCategoryInfo ? [
      { label: "Products", href: "/products" },
      { label: selectedCategoryInfo.name, href: "", current: true }
    ] : [
      { label: "Products", href: "", current: true }
    ])
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Page Title */}
          <div className="text-center mt-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {selectedCategoryInfo ? selectedCategoryInfo.name : "Our Products"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {selectedCategoryInfo 
                ? `Browse our ${selectedCategoryInfo.name.toLowerCase()} products crafted with traditional Ayurvedic wisdom for your wellness needs.`
                : "Discover our complete range of authentic Ayurvedic products crafted with traditional wisdom and modern quality standards for your holistic wellness journey."
              }
            </p>
          </div>
          
          {/* Category Filter & Product Count */}
          <div className="text-center mt-8">
            {selectedCategory && (
              <div className="mb-4">
                <Link 
                  href="/products" 
                  className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  View All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Check back later for new products.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Categories Section */}
      {categories.length > 0 && (
        <div className="bg-gray-light py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-gray-600">
                Browse products by their therapeutic categories
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* All Products Option */}
              <Link
                href="/products"
                className={`bg-white rounded-lg p-6 text-center hover:shadow-md transition-all duration-200 border-2 ${
                  !selectedCategory 
                    ? 'border-primary shadow-md' 
                    : 'border-transparent hover:border-primary/20'
                }`}
              >
                <h3 className={`font-medium mb-2 ${
                  !selectedCategory ? 'text-primary' : 'text-gray-900'
                }`}>
                  All Products
                </h3>
                <p className="text-sm text-gray-500">
                  {allProducts.length} product{allProducts.length !== 1 ? 's' : ''}
                </p>
              </Link>
              
              {/* Category Options */}
              {categories.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className={`bg-white rounded-lg p-6 text-center hover:shadow-md transition-all duration-200 border-2 ${
                    selectedCategory === category.slug 
                      ? 'border-primary shadow-md' 
                      : 'border-transparent hover:border-primary/20'
                  }`}
                >
                  <h3 className={`font-medium mb-2 ${
                    selectedCategory === category.slug ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  {category.count > 0 && (
                    <p className="text-sm text-gray-500">
                      {category.count} product{category.count !== 1 ? 's' : ''}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Section */}
      <div className="py-16 bg-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our Ayurvedic experts are here to guide you towards the best products for your individual health needs.
          </p>
          <a
            href="/consultation"
            className="inline-block bg-white text-primary-dark px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Get Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
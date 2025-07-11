import { getProducts } from "../lib/woocommerce";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default async function HomePage() {
  const featuredProducts = await getProducts({
    featured: true,
    per_page: 8,
  });

  return (
    <div>
      <HeroSection />

      {/* Mission Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            To make wellness accessible, convenient, and sustainable for
            everyone. We aim to provide effective and safe remedies for modern
            medical problems caused by unhealthy lifestyles, poor eating habits,
            climate change, and pollution. By combining ancient wisdom with
            contemporary knowledge, we create products that address today's
            health issues.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <FeaturedProducts products={featuredProducts} />
      )}

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Get Authentic Ayurvedic Treatment Today!
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Book your FREE consultation with our Ayurveda experts
          </p>
          <a
            href="/consultation"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book FREE Consultation
          </a>
        </div>
      </section>
    </div>
  );
}

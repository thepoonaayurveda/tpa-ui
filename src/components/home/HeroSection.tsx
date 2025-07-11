import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-green-700 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get Authentic Ayurvedic Treatment Today!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Making wellness accessible, convenient, and sustainable for everyone
            through authentic Ayurvedic products that combine ancient wisdom
            with contemporary knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Book FREE Consultation
            </Link>
            <Link
              href="/products"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-lg"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

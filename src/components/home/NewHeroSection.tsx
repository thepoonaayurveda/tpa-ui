import Link from "next/link";
import Image from "next/image";

export function NewHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Ancient Ayurveda
              <span className="block text-primary">for Modern Lives</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover the healing power of traditional Ayurvedic medicine, 
              carefully crafted for today's lifestyle challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/consultation"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors text-lg shadow-lg"
              >
                Book FREE Consultation
              </Link>
              <Link
                href="/products"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-lg"
              >
                Explore Products
              </Link>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://thepoonaayurveda.com/wp-content/uploads/2025/01/Frame-64-1.png"
                alt="Ayurvedic Products and Herbs"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-green-400 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
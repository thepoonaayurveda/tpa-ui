import Link from "next/link";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Begin Your Journey to
              <span className="block">Natural Wellness</span>
            </h2>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Take the first step towards better health with our personalized Ayurvedic 
              approach. Get expert guidance tailored specifically for your unique needs.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-teal-100">Free initial consultation with certified practitioners</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-teal-100">Personalized treatment plans based on your constitution</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-teal-100">Access to premium quality, authentic Ayurvedic products</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/consultation"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg text-center shadow-lg"
              >
                Book FREE Consultation
              </Link>
              <Link
                href="/products"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors text-lg text-center"
              >
                Shop Products
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-7-scaled.png"
                alt="Ayurvedic Consultation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
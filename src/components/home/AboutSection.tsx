import Image from "next/image";

export function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://thepoonaayurveda.com/wp-content/uploads/2025/04/Render_Mockup_4000_3000_2025-05-11-6-scaled.png"
                alt="Traditional Ayurvedic Medicine"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose
              <span className="block text-primary">The Poona Ayurveda?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We bridge the gap between ancient Ayurvedic wisdom and modern healthcare needs. 
              Our authentic formulations are crafted using time-tested recipes, sourced from 
              the finest natural ingredients to ensure maximum efficacy and safety.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Natural & Safe</h3>
                  <p className="text-gray-600">All our products are made from pure, natural ingredients with no harmful chemicals or side effects.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ancient Wisdom</h3>
                  <p className="text-gray-600">Formulations based on thousands of years of Ayurvedic knowledge and traditional healing practices.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                  <p className="text-gray-600">Get personalized consultations from qualified Ayurvedic practitioners and wellness experts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
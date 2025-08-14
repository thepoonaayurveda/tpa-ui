import { TestimonialContent } from "./TestimonialContent";

export function TestimonialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our Customers
            <span className="block text-primary">Are Saying</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our authentic Ayurvedic solutions have helped thousands
            achieve better health and wellness naturally.
          </p>
        </div>

        {/* Testimonials Grid */}
        <TestimonialContent />

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to start your wellness journey?
          </p>
          <a
            href="/consultation"
            className="inline-block bg-primary-dark text-white px-8 py-6 rounded-full tracking-widest transition-colors text-sm uppercase shadow-lg font-roboto"
          >
            Book Your Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

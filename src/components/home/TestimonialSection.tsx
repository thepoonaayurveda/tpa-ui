import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Poona Ayurveda has transformed my approach to wellness. Their natural products and expert guidance helped me overcome chronic digestive issues that I struggled with for years.",
  },
  {
    name: "Rajesh Patel",
    location: "Pune",
    rating: 5,
    text: "Exceptional quality and authentic Ayurvedic formulations. The consultation process was thorough, and the customized treatment plan showed results within weeks.",
  },
  {
    name: "Anita Desai",
    location: "Delhi",
    rating: 5,
    text: "I appreciate their commitment to natural healing. The products are pure, effective, and have helped me maintain better health without any side effects.",
  },
];

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-light p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>

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

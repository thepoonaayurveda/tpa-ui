import { HeartIcon, UserGroupIcon, SparklesIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const services = [
  {
    icon: HeartIcon,
    title: "Holistic Wellness",
    description: "Comprehensive approach to health addressing body, mind, and spirit through natural healing methods."
  },
  {
    icon: UserGroupIcon,
    title: "Personal Consultations",
    description: "One-on-one sessions with experienced Ayurvedic practitioners to create customized treatment plans."
  },
  {
    icon: SparklesIcon,
    title: "Premium Quality",
    description: "Highest quality herbs and ingredients sourced directly from certified organic farms across India."
  },
  {
    icon: ShieldCheckIcon,
    title: "Safety Assured",
    description: "All products undergo rigorous quality testing to ensure purity, potency, and safety standards."
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Commitment to
            <span className="block text-primary">Your Wellness</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing authentic Ayurvedic solutions that promote 
            natural healing and sustainable wellness for modern lifestyles.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
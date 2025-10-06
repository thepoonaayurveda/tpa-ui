import { Metadata } from "next";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Contact Us | The Poona Ayurveda",
  description: "Get in touch with The Poona Ayurveda. Available 24/7 for customer support. Contact us via phone, email, or visit our location in Daund, Pune.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're here to help with your Ayurvedic wellness journey. Reach out to us anytime for consultations, product information, or general inquiries.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Customer Support */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <PhoneIcon className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Support</h3>
              <a 
                href="tel:+919730005222"
                className="text-lg text-green-600 font-semibold hover:text-green-700 transition-colors block mb-3"
              >
                +91-9730005222
              </a>
              <div className="flex items-center justify-center text-gray-600">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">Available 24/7</span>
              </div>
              <div className="mt-4">
                <a
                  href="https://wa.me/919730005222?text=I%27m%20interested%20to%20get%20ayurveda%20consultation%20from%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 28">
                    <path d="M15.391 15.219c0.266 0 2.812 1.328 2.922 1.516 0.031 0.078 0.031 0.172 0.031 0.234 0 0.391-0.125 0.828-0.266 1.188-0.359 0.875-1.813 1.437-2.703 1.437-0.75 0-2.297-0.656-2.969-0.969-2.234-1.016-3.625-2.75-4.969-4.734-0.594-0.875-1.125-1.953-1.109-3.031v-0.125c0.031-1.031 0.406-1.766 1.156-2.469 0.234-0.219 0.484-0.344 0.812-0.344 0.187 0 0.375 0.047 0.578 0.047 0.422 0 0.5 0.125 0.656 0.531 0.109 0.266 0.906 2.391 0.906 2.547 0 0.594-1.078 1.266-1.078 1.625 0 0.078 0.031 0.156 0.078 0.234 0.344 0.734 1 1.578 1.594 2.141 0.719 0.688 1.484 1.141 2.359 1.578 0.109 0.063 0.219 0.109 0.344 0.109 0.469 0 1.25-1.516 1.656-1.516zM12.219 23.5c5.406 0 9.812-4.406 9.812-9.812s-4.406-9.812-9.812-9.812-9.812 4.406-9.812 9.812c0 2.063 0.656 4.078 1.875 5.75l-1.234 3.641 3.781-1.203c1.594 1.047 3.484 1.625 5.391 1.625zM12.219 1.906c6.5 0 11.781 5.281 11.781 11.781s-5.281 11.781-11.781 11.781c-1.984 0-3.953-0.5-5.703-1.469l-6.516 2.094 2.125-6.328c-1.109-1.828-1.687-3.938-1.687-6.078 0-6.5 5.281-11.781 11.781-11.781z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <EnvelopeIcon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email</h3>
              <a 
                href="mailto:care@thepoonaayurveda.com"
                className="text-lg text-blue-600 font-semibold hover:text-blue-700 transition-colors block mb-4"
              >
                care@thepoonaayurveda.com
              </a>
              <p className="text-gray-600 text-sm">
                We typically respond within 24 hours
              </p>
            </div>

            {/* Mailing Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPinIcon className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mailing Address</h3>
              <address className="text-gray-600 not-italic leading-relaxed">
                <strong className="text-gray-900 block mb-2">Vaidya Gandhi's The Poona Ayurveda LLP</strong>
                Gandhi Building, Vadgaonkar Chawl<br/>
                Shivaji Chowk, Daund<br/>
                Pune, Maharashtra 413801<br/>
                India
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
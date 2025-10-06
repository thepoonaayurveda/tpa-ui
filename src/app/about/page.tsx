import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircleIcon,
  UserIcon,
  SparklesIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { VideoPopup } from "@/components/ui/VideoPopup";

export const metadata: Metadata = {
  title: "About Us | The Poona Ayurveda",
  description:
    "Learn about The Poona Ayurveda's mission to make wellness accessible and sustainable. Meet Dr. Deepak Gandhi and discover our expert-crafted Ayurvedic products.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About Us
          </h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Title and Button */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Explore our range of products designed to support your health
            </h2>

            {/* Video Section */}
            <div className="relative mb-8">
              <VideoPopup
                videoId="-xBSDzWLhR0"
                posterImage="https://api.thepoonaayurveda.com/wp-content/uploads/2025/05/Vario-Oil-Hero-Image.png"
                alt="Vario Oil Hero"
              />

              {/* Overlapping Text Box */}
              <div className="relative md:-mt-16 -mt-8 mx-auto max-w-3xl">
                <div className="bg-white rounded-lg space-y-6 shadow-lg p-6 md:p-12 mx-4 border border-gray-100">
                  <h3 className="text-xl md:text-3xl font-bold text-gray-900 text-center">
                    Our Mission Is To Make Wellness Accessible And Sustainable
                    For Everyone
                  </h3>

                  <p className="text-md text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
                    The Poona Ayurveda was founded with a singular purpose: to
                    help people maintain their health and recover from
                    illnesses. Our expert ayurvedic vaidyas have created herbal
                    products and supplements by deeply understanding ancient
                    ayurvedic texts and applying their extensive clinical
                    experience.
                  </p>

                  <Link
                    href="/products"
                    className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mb-16"
                  >
                    Our Products
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14m-7-7l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Vaidya Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet The Vaidya
              </h2>

              <p className="text-md text-gray-700 mb-8">
                Dr. Deepak Gandhi, has been practicing for over 10 years. He
                holds an MD in Samhita Siddhant, specializing in decoding
                ancient ayurvedic texts and applying this knowledge in clinical
                practice. Dr. Gandhi is well-versed in both ancient texts and
                modern medical practices, treating a broad spectrum of
                illnesses, particularly lifestyle disorders.
              </p>

              <a 
                href="https://wa.me/919730005222?text=I%27m%20interested%20to%20get%20ayurveda%20consultation%20from%20you." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Book Online Consultation
              </a>
            </div>

            <div className="text-center">
              <div className="relative aspect-square max-w-md mx-auto mb-6">
                <Image
                  src="https://api.thepoonaayurveda.com/wp-content/uploads/2025/04/Deepak-scaled.jpg"
                  alt="Dr. Deepak Gandhi"
                  fill
                  className="object-cover object-top rounded-lg"
                  sizes="(max-width: 768px) 100vw, 448px"
                />
              </div>
              <h5 className="text-xl font-bold text-gray-900 mb-2">
                Dr. Deepak Gandhi
              </h5>
              <p className="text-gray-600">Post-Graduate In Ayurveda</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Center aligned title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose The Poona Ayurveda?
            </h2>
          </div>

          <div className="relative">

            {/* Overlapping containers with missions */}
            <div className="relative -mb-44 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
              <div className="bg-white border border-gray-300 rounded-3xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  <SparklesIcon className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  We Are Committed
                </h3>
                <p className="text-gray-600">
                  to providing society with ancient solutions for modern
                  lifestyle related health issues.
                </p>
              </div>

              <div className="bg-white border border-gray-300 rounded-3xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  <UserIcon className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Our Products
                </h3>
                <p className="text-gray-600">
                  are crafted by expert ayurvedic vaidyas with extensive
                  clinical experience.
                </p>
              </div>

              <div className="bg-white border border-gray-300 rounded-3xl p-6 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  <BeakerIcon className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  We Prioritize
                </h3>
                <p className="text-gray-600">
                  safety, effectiveness, and natural ingredients in all our
                  offerings.
                </p>
              </div>
            </div>

            {/* Gray container with text at bottom */}
            <div className="bg-gray-100 rounded-lg p-12 pt-56 text-center max-w-7xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                We aim to provide effective and safe remedies for modern medical
                problems caused by unhealthy lifestyles, poor eating habits,
                climate change, and pollution. By combining ancient wisdom with
                contemporary knowledge, we create products that address today's
                health issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Benefits Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Boost Your Health and Wellness with Our Products.
              </h2>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Developed by highly qualified ayurvedic vaidyas who are
                    successful clinicians and academicians.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Products are born from decades of effective clinical
                    practice.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Our remedies are effective, time-tested, and safe, with no
                    adverse effects
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Tailor-made to address present-day health problems,
                    considering factors such as the root cause of illness and
                    individual body types.
                  </span>
                </li>
              </ul>

              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Our Products
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7-7l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="https://api.thepoonaayurveda.com/wp-content/uploads/2025/05/Sports-Edge-Oil-Junior-Hero-Image.png"
                  alt="Sports Edge Oil Junior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="https://api.thepoonaayurveda.com/wp-content/uploads/2025/05/Vario-Oil-Hero-Image.png"
                  alt="Vario Oil"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-2-scaled-e1747232462869.png"
                  alt="Product 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="https://api.thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-3-scaled-e1747232368137.png"
                  alt="Product 4"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}

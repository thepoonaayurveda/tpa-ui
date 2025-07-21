"use client";

import { useState } from "react";
import Image from "next/image";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-white rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Stay Connected with
              <span className="block">Ayurvedic Wisdom</span>
            </h2>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Join our community of wellness enthusiasts and receive exclusive insights, 
              health tips, and special offers on our premium Ayurvedic products delivered 
              straight to your inbox.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-teal-100">Weekly Ayurvedic health tips and lifestyle advice</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-teal-100">Exclusive access to new product launches</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-teal-100">Special discounts and seasonal offers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-teal-100">Expert consultations and personalized recommendations</span>
              </div>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                </button>
              </div>
              {message && (
                <p className="text-teal-100 text-sm">{message}</p>
              )}
            </form>

            <p className="text-sm text-teal-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://thepoonaayurveda.com/wp-content/uploads/2024/12/Render_Mockup_4000_3000_2025-05-11-2-scaled.png"
                alt="Ayurvedic Newsletter"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Floating Email Icon */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Statistics */}
            <div className="absolute -bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">10,000+</div>
                    <div className="text-sm text-gray-600">Happy Subscribers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
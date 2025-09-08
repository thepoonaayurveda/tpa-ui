"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage(result.message || "Thank you for subscribing to our newsletter!");
        setEmail("");
        setIsError(false);
      } else {
        setMessage(result.error || "Something went wrong. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage("Network error. Please check your connection and try again.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Three Column Layout - Empty, Content, Empty */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          {/* Left Empty Column */}
          <div className="hidden lg:block"></div>

          {/* Center Content Column */}
          <div className="text-center border-2 p-12 border-teal-600 rounded-r-2xl rounded-b-2xl lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Subscribe to access our exclusive deals, and more
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Receive email updates and hot offers.
            </p>

            {/* Newsletter Form - Horizontal Layout */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email Address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
              </div>
              {message && (
                <p className={`text-sm mt-3 text-center ${isError ? 'text-red-600' : 'text-primary'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Right Empty Column */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { getFAQsForProduct } from "@/lib/faqData";

interface ProductFAQsProps {
  productSlug: string;
}

export function ProductFAQs({ productSlug }: ProductFAQsProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = getFAQsForProduct(productSlug);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between text-left py-2"
              >
                <span className="text-base font-medium text-foreground pr-4">
                  {faq.question}
                </span>
                {expandedFaq === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="mt-3 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
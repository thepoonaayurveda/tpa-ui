"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface ProductFAQsProps {
  productName: string;
}

export function ProductFAQs({ productName }: ProductFAQsProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const getFAQs = (productName: string) => {
    const name = productName.toLowerCase();

    if (name.includes("flexio")) {
      return [
        {
          question: "How long does it take to see results?",
          answer: "Most users experience relief within 7-14 days of regular application. Full benefits are typically seen after 4-6 weeks of consistent use."
        },
        {
          question: "Can I use this with other medications?",
          answer: "While this is a natural Ayurvedic formulation, we recommend consulting with your healthcare provider before combining with other medications."
        },
        {
          question: "Is this suitable for sensitive skin?",
          answer: "Yes, Flexio is made with natural ingredients and is generally well-tolerated. However, we recommend doing a patch test before first use."
        }
      ];
    }
    if (name.includes("uristo")) {
      return [
        {
          question: "How long should I take Uristo tablets?",
          answer: "For kidney stone prevention and urinary health, take for 4-6 weeks or as directed by your healthcare provider. For acute conditions, consult your doctor."
        },
        {
          question: "Are there any side effects?",
          answer: "Uristo is made with natural herbs and is generally safe. Some people may experience mild stomach upset if taken on empty stomach. Take after meals as recommended."
        },
        {
          question: "Can I take this with water medications?",
          answer: "While Uristo has natural diuretic properties, consult your healthcare provider before combining with prescription diuretics or other medications."
        }
      ];
    }
    return [
      {
        question: "Is this product safe for daily use?",
        answer: "Yes, our Ayurvedic products are formulated for safe daily use when taken as directed. They are made with natural ingredients and traditional formulations."
      },
      {
        question: "How long does one bottle/pack last?",
        answer: "Usage duration depends on the recommended dosage. Typically, one pack lasts 15-30 days when used as directed."
      },
      {
        question: "Do you offer refunds if not satisfied?",
        answer: "Yes, we offer a satisfaction guarantee. If you're not satisfied with the product, please contact our customer service within 30 days of purchase."
      }
    ];
  };

  const faqs = getFAQs(productName);

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
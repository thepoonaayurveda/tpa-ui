"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import type { BlogFaq } from "@/lib/blog";

/**
 * On-page FAQ accordion for blog posts, driven by the post's frontmatter
 * `faqs`. Mirrors the product FAQ style. The same data is emitted as
 * FAQPage JSON-LD on the post page, so search engines and readers see the
 * identical Q&A set.
 */
export function BlogFaqs({ faqs }: { faqs: BlogFaq[] }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  if (!faqs?.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl md:text-3xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
            >
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="flex w-full items-center justify-between py-2 text-left"
                aria-expanded={expanded === index}
              >
                <h3 className="pr-4 text-base font-medium text-gray-900">
                  {faq.question}
                </h3>
                {expanded === index ? (
                  <ChevronUpIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
                )}
              </button>
              {expanded === index && (
                <div className="mt-3 leading-relaxed text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

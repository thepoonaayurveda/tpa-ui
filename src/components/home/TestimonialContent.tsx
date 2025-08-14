"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductReview } from "@/lib/types";

export function TestimonialContent() {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("Fetching product reviews from API...");
        const response = await fetch('/api/reviews');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const fetchedReviews = await response.json();
        console.log("Fetched reviews:", fetchedReviews);
        
        if (!fetchedReviews || fetchedReviews.length === 0) {
          console.log("No reviews found or empty array returned");
          setLoading(false);
          return;
        }
        
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-light p-8 rounded-2xl shadow-sm animate-pulse"
          >
            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-300 rounded" />
              ))}
            </div>
            <div className="space-y-3 mb-6">
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-300 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }


  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-gray-light p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          {/* Stars */}
          <div className="flex space-x-1 mb-4">
            {[...Array(review.rating)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
            ))}
          </div>

          {/* Quote */}
          <blockquote 
            className="text-gray-700 mb-6 italic leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: review.review 
            }}
          />

          {/* Author */}
          <div className="border-t border-gray-200 pt-4">
            <div className="font-semibold text-gray-900">
              {review.reviewer}
            </div>
            {review.product_name && (
              <div className="text-sm mt-1">
                Product: {review.product_slug ? (
                  <Link 
                    href={`/product/${review.product_slug}`}
                    className="text-primary-dark hover:text-primary underline transition-colors"
                  >
                    {review.product_name}
                  </Link>
                ) : (
                  <span className="text-primary-dark">{review.product_name}</span>
                )}
              </div>
            )}
            {review.verified && (
              <div className="text-sm text-green-600 mt-1">
                ✓ Verified Purchase
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
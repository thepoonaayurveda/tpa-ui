"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { CouponValidationRequest, CouponValidationResponse } from "@/lib/types";

interface CouponInputProps {
  className?: string;
}

export function CouponInput({ className = "" }: CouponInputProps) {
  const { 
    items, 
    appliedCoupon, 
    getSubtotal, 
    applyCoupon, 
    removeCoupon 
  } = useCartStore();
  
  const [couponCode, setCouponCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setIsValidating(true);
    setError("");

    try {
      const validationRequest: CouponValidationRequest = {
        code: couponCode.trim(),
        subtotal: getSubtotal(),
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationRequest),
      });

      const result: CouponValidationResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to validate coupon");
      }

      if (result.success && result.valid && result.coupon) {
        applyCoupon(result.coupon);
        setCouponCode("");
        setError("");
      } else {
        setError(result.error || "Invalid coupon code");
      }
    } catch (error: any) {
      console.error("Error validating coupon:", error);
      setError(error.message || "Failed to validate coupon. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setError("");
  };

  if (appliedCoupon) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Coupon "{appliedCoupon.code}" applied
              </p>
              {appliedCoupon.description && (
                <p className="text-sm text-green-700 mt-1">
                  {appliedCoupon.description}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleRemoveCoupon}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleApplyCoupon} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isValidating}
          />
          <button
            type="submit"
            disabled={isValidating || !couponCode.trim()}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isValidating ? "Applying..." : "Apply"}
          </button>
        </div>
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
}
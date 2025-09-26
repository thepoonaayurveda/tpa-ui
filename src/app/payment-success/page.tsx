"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import { useCartStore } from "@/store/cartStore";
import { detectPaymentStatus, logPaymentParameters } from "@/lib/payment-utils";
import { logPaymentFlow, logPaymentError } from "@/lib/logger";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [verifying, setVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending'>('pending');
  const [error, setError] = useState<string>("");
  
  const orderId = searchParams.get('orderId');
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    if (!orderId) {
      setError("Invalid payment session");
      setVerifying(false);
      return;
    }

    verifyPayment();
  }, [orderId, transactionId]);

  const verifyPayment = async () => {
    try {
      logPaymentFlow("🔍 === PAYMENT SUCCESS PAGE - VERIFICATION START ===");
      logPaymentFlow("📍 Current URL:", { url: window.location.href });
      logPaymentFlow("📋 Search Params Object:", Object.fromEntries(searchParams.entries()));
      logPaymentFlow("🆔 Order ID from params:", { orderId });
      logPaymentFlow("💳 Transaction ID from params:", { transactionId });
      
      // Log all parameters for debugging
      const allParams = logPaymentParameters(searchParams);
      logPaymentFlow("📦 All URL Parameters:", allParams);
      
      // Use intelligent payment status detection
      const detectionResult = detectPaymentStatus(allParams);
      
      console.log("🎯 Payment status detection result:", {
        status: detectionResult.status,
        confidence: detectionResult.confidence,
        reason: detectionResult.reason,
        timestamp: new Date().toISOString()
      });

      // If we have high confidence, use that result immediately
      if (detectionResult.confidence === 'high') {
        console.log("✅ HIGH CONFIDENCE DETECTION - Using result immediately");
        if (detectionResult.status === 'success') {
          console.log("🎉 HIGH CONFIDENCE SUCCESS - Setting success status and clearing cart");
          setPaymentStatus('success');
          clearCart();
          setVerifying(false);
          return;
        } else if (detectionResult.status === 'failed') {
          console.log("❌ HIGH CONFIDENCE FAILURE - Setting failed status:", detectionResult.reason);
          setPaymentStatus('failed');
          setError(detectionResult.reason);
          setVerifying(false);
          return;
        }
      }

      // For medium confidence failure (like cancellation), also use it
      if (detectionResult.confidence === 'medium' && detectionResult.status === 'failed') {
        console.log("⚠️ MEDIUM CONFIDENCE FAILURE - Setting failed status:", detectionResult.reason);
        setPaymentStatus('failed');
        setError(detectionResult.reason);
        setVerifying(false);
        return;
      }

      // Verify payment with our backend if transaction ID is available
      if (transactionId) {
        console.log("🔄 STARTING BACKEND VERIFICATION - Transaction ID available:", transactionId);
        
        // Extract order ID from orderId parameter to pass to verification
        const extractedOrderId = orderId?.match(/ORDER_(\d+)_/)?.[1] || orderId;
        console.log("🔍 Extracted Order ID for verification:", extractedOrderId);
        console.log("📝 Original Order ID:", orderId);
        
        console.log("📡 Calling PhonePe verification API with:", {
          transactionId: transactionId,
          orderId: extractedOrderId,
          url: "/api/phonepe/verify-payment"
        });
        
        const response = await fetch("/api/phonepe/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionId: transactionId,
            orderId: extractedOrderId, // Pass order ID to enable status updates
          }),
        });
        
        console.log("📬 Verification API Response Status:", response.status);
        console.log("📬 Verification API Response Headers:", Object.fromEntries(response.headers.entries()));

        // Check if the response is HTML (404/500 error page) instead of JSON
        const contentType = response.headers.get('content-type');
        logPaymentFlow("🧭 Response Content-Type:", { contentType });
        
        if (!contentType || !contentType.includes('application/json')) {
          console.warn("⚠️ NON-JSON RESPONSE - API returned HTML/non-JSON, assuming success based on redirect");
          console.warn("📄 Content-Type:", contentType);
          console.warn("🔗 User was redirected to success page, treating as success");
          // If API is down but user was redirected here, assume success
          setPaymentStatus('success');
          clearCart();
          setVerifying(false);
          return;
        }

        let result;
        try {
          result = await response.json();
          console.log("📦 Verification API JSON Response:", result);
        } catch (jsonError) {
          console.warn("❌ JSON PARSING FAILED - Cannot parse verification response:", jsonError);
          console.warn("🔗 User was redirected to success page, treating as success");
          // If JSON parsing fails but user was redirected here, assume success
          setPaymentStatus('success');
          clearCart();
          setVerifying(false);
          return;
        }

        console.log("🎯 PROCESSING VERIFICATION RESULT:");
        console.log("✅ Response OK:", response.ok);
        console.log("✅ Result Success:", result.success);
        console.log("📊 Payment Status from API:", result.status);
        
        if (response.ok && result.success) {
          console.log("✅ VERIFICATION API SUCCESS - Processing status:", result.status);
          
          if (result.status === 'COMPLETED') {
            console.log("🎉 PAYMENT COMPLETED - Setting success and clearing cart");
            setPaymentStatus('success');
            clearCart(); // Clear cart on successful payment verification
          } else if (result.status === 'FAILED') {
            console.log("❌ PAYMENT FAILED - Setting failed status");
            setPaymentStatus('failed');
            setError("Payment verification failed");
          } else {
            console.log("⏳ PAYMENT PENDING - Setting pending status for:", result.status);
            setPaymentStatus('pending');
          }
        } else {
          console.log("❌ VERIFICATION API FAILURE:");
          console.log("📄 Response OK:", response.ok);
          console.log("📄 Result Success:", result.success);
          console.log("📄 Error:", result.error);
          setPaymentStatus('failed');
          setError(result.error || "Payment verification failed");
        }
      } else {
        // No transaction ID to verify - use the detection result or default to failed
        console.log("⚠️ NO TRANSACTION ID - Cannot verify with backend");
        console.log("🔍 Using detection result for final decision:", detectionResult);
        
        if (detectionResult.confidence === 'medium' && detectionResult.status === 'success') {
          console.log("✅ MEDIUM CONFIDENCE SUCCESS - Setting success without verification");
          setPaymentStatus('success');
          clearCart();
        } else {
          console.log("❌ NO VERIFICATION POSSIBLE - Defaulting to failed");
          console.log("📝 Detection result:", detectionResult);
          // Default to failed with helpful message for cancelled payments
          setPaymentStatus('failed');
          setError("Payment was cancelled or could not be completed. Please try again.");
        }
      }
    } catch (error: any) {
      console.error("💥 PAYMENT VERIFICATION ERROR:", {
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      
      // Only assume success if we have high confidence indicators
      const detectionResult = detectPaymentStatus(logPaymentParameters(searchParams));
      console.log("🔍 FALLBACK DETECTION after error:", detectionResult);
      
      if (detectionResult.confidence === 'high' && detectionResult.status === 'success') {
        console.warn("✅ HIGH CONFIDENCE SUCCESS despite error - Assuming success");
        console.warn("📝 Detection reason:", detectionResult.reason);
        setPaymentStatus('success');
        clearCart();
        setError(""); // Clear any error
      } else {
        console.error("❌ VERIFICATION FAILED - No high confidence success indicators");
        console.error("📝 Final detection:", detectionResult);
        setPaymentStatus('failed');
        setError("Payment verification failed. If payment was deducted, please contact support.");
      }
    } finally {
      console.log("🏁 PAYMENT VERIFICATION COMPLETE - Final status:", {
        verifying: false,
        timestamp: new Date().toISOString()
      });
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-xl font-medium text-gray-900 mb-2">Verifying Payment</h1>
          <p className="text-gray-600">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {paymentStatus === 'success' ? (
            <>
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your order. Your payment has been processed successfully.
              </p>
              {orderId && (
                <p className="text-sm text-gray-500 mb-6">
                  Order ID: {orderId}
                </p>
              )}
              <div className="space-y-3">
                <Link
                  href="/orders"
                  className="block w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                >
                  View My Orders
                </Link>
                <Link
                  href="/products"
                  className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          ) : (
            <>
              <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
              <p className="text-gray-600 mb-2">
                We were unable to process your payment.
              </p>
              {error && (
                <p className="text-sm text-red-600 mb-6">{error}</p>
              )}
              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="block w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors text-center"
                >
                  Try Again
                </Link>
                <Link
                  href="/cart"
                  className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-center"
                >
                  Back to Cart
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-xl font-medium text-gray-900 mb-2">Loading...</h1>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
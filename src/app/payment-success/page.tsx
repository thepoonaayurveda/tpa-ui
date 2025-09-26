"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import { useCartStore } from "@/store/cartStore";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [verifying, setVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'verifying'>('verifying');
  const [error, setError] = useState<string>("");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      setError("Invalid payment session - no order ID found");
      setPaymentStatus('failed');
      setVerifying(false);
      return;
    }

    verifyPaymentWithPhonePe();
  }, [orderId]);

  const verifyPaymentWithPhonePe = async () => {
    try {
      // Since user reached the success page, we assume positive intent
      // but we need to verify with PhonePe using the proper API
      console.log("User reached success page - verifying payment status with PhonePe");

      // Extract merchant order ID for PhonePe verification
      // According to PhonePe docs, we need to use the merchantOrderId for getOrderStatus
      const merchantOrderId = orderId; // This is our merchant order ID
      
      console.log("Calling PhonePe verification with merchant order ID:", merchantOrderId);

      const response = await fetch("/api/phonepe/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchantOrderId: merchantOrderId, // Use merchantOrderId instead of transactionId
          orderId: extractWooCommerceOrderId(orderId!), // Extract numeric order ID for WooCommerce update
        }),
      });

      console.log("Verification API response status:", response.status);

      // Check if the response is HTML (404/500 error page) instead of JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn("API returned non-JSON response, treating as verification failure");
        throw new Error("Payment verification service unavailable. Please contact support if money was deducted.");
      }

      let result;
      try {
        result = await response.json();
        console.log("Verification API JSON response:", result);
      } catch (jsonError) {
        console.error("Failed to parse verification response");
        throw new Error("Payment verification failed. Please contact support if money was deducted.");
      }

      // Process the verification result based on PhonePe documentation
      if (response.ok && result.success) {
        console.log("PhonePe verification successful:", result.status);

        setOrderDetails({
          orderId: result.orderId,
          amount: result.amount,
          merchantOrderId: merchantOrderId
        });

        // Handle different payment states according to PhonePe docs
        switch (result.status) {
          case 'COMPLETED':
            console.log("Payment COMPLETED - Success!");
            setPaymentStatus('success');
            clearCart(); // Clear cart only on confirmed success
            break;
            
          case 'FAILED':
            console.error("Payment FAILED according to PhonePe");
            setPaymentStatus('failed');
            setError("Payment failed. Please try again or contact support if money was deducted.");
            break;
            
          case 'PENDING':
            console.log("Payment still PENDING - keeping verification state");
            setPaymentStatus('verifying');
            setError("Payment is still being processed. Please wait or check back later.");
            break;
            
          default:
            console.error("Unknown payment status from PhonePe:", result.status);
            setPaymentStatus('verifying');
            setError("Payment status unclear. Please contact support if money was deducted.");
            break;
        }
      } else {
        console.error("PhonePe verification failed:", result?.error);
        
        setPaymentStatus('failed');
        setError(result?.error || "Payment verification failed. Please contact support if money was deducted.");
      }

    } catch (error: any) {
      console.error("Payment verification error:", error);
      
      setPaymentStatus('failed');
      setError(error.message || "Payment verification failed. Please contact support if money was deducted.");
    } finally {
      console.log("Payment verification complete");
      setVerifying(false);
    }
  };

  // Helper function to extract WooCommerce order ID from merchant order ID
  const extractWooCommerceOrderId = (merchantOrderId: string): string => {
    // Extract numeric order ID from format like "ORDER_3190_5pt9jzpzb"
    const match = merchantOrderId.match(/ORDER_(\d+)_/);
    return match ? match[1] : merchantOrderId;
  };

  // Show verification in progress
  if (verifying || paymentStatus === 'verifying') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <ClockIcon className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h1>
            <p className="text-gray-600 mb-4">
              Please wait while we verify your payment status with PhonePe...
            </p>
            {orderDetails && (
              <div className="bg-gray-50 rounded-md p-4 mb-4">
                <p className="text-sm text-gray-600">
                  Order ID: {orderDetails.merchantOrderId}
                </p>
                {orderDetails.amount && (
                  <p className="text-sm text-gray-600">
                    Amount: ₹{(orderDetails.amount / 100).toFixed(2)}
                  </p>
                )}
              </div>
            )}
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-xs text-gray-500 mt-4">
              This usually takes a few seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show final result
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
              {orderDetails && (
                <div className="bg-green-50 rounded-md p-4 mb-6">
                  <p className="text-sm text-green-800 font-medium">
                    Order ID: {orderDetails.merchantOrderId}
                  </p>
                  {orderDetails.amount && (
                    <p className="text-sm text-green-700">
                      Amount Paid: ₹{(orderDetails.amount / 100).toFixed(2)}
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-3">
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Failed</h1>
              <p className="text-gray-600 mb-2">
                We were unable to verify your payment status.
              </p>
              {error && (
                <div className="bg-red-50 rounded-md p-4 mb-6">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              {orderDetails && (
                <div className="bg-gray-50 rounded-md p-4 mb-6">
                  <p className="text-sm text-gray-600">
                    Order ID: {orderDetails.merchantOrderId}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Please contact support with this order ID if money was deducted from your account.
                  </p>
                </div>
              )}
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="block w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Retry Verification
                </button>
                <Link
                  href="/checkout"
                  className="block w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors text-center"
                >
                  Try Payment Again
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
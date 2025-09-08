"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import { useCartStore } from "@/store/cartStore";

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
      if (!transactionId) {
        // If no transaction ID, this might be a direct return
        // Check for URL parameters that PhonePe might add
        const code = searchParams.get('code');
        const providerReferenceId = searchParams.get('providerReferenceId');
        
        if (code === 'PAYMENT_SUCCESS') {
          setPaymentStatus('success');
          clearCart(); // Clear cart on successful payment
          setVerifying(false);
          return;
        } else if (code === 'PAYMENT_ERROR' || code === 'PAYMENT_DECLINED') {
          setPaymentStatus('failed');
          setError("Payment was declined or failed");
          setVerifying(false);
          return;
        }
      }

      // Verify payment with our backend if transaction ID is available
      if (transactionId) {
        // Extract order ID from orderId parameter to pass to verification
        const extractedOrderId = orderId?.match(/ORDER_(\d+)_/)?.[1] || orderId;
        
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

        const result = await response.json();

        if (response.ok && result.success) {
          if (result.status === 'COMPLETED') {
            setPaymentStatus('success');
            clearCart(); // Clear cart on successful payment verification
          } else if (result.status === 'FAILED') {
            setPaymentStatus('failed');
            setError("Payment verification failed");
          } else {
            setPaymentStatus('pending');
          }
        } else {
          setPaymentStatus('failed');
          setError(result.error || "Payment verification failed");
        }
      } else {
        // No transaction ID to verify, check other URL parameters
        const code = searchParams.get('code');
        if (code === 'PAYMENT_SUCCESS') {
          setPaymentStatus('success');
          clearCart(); // Clear cart on successful payment
        } else if (code === 'PAYMENT_ERROR' || code === 'PAYMENT_DECLINED') {
          setPaymentStatus('failed');
          setError("Payment was cancelled or declined");
        } else {
          // If no clear status, assume payment was cancelled/failed
          setPaymentStatus('failed');
          setError("Payment was not completed");
        }
      }
    } catch (error: any) {
      console.error("Error verifying payment:", error);
      setPaymentStatus('failed');
      setError("Failed to verify payment status");
    } finally {
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
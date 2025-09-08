"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Order } from "@/lib/types";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const orderId = searchParams.get("order");

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const response = await fetch(`/api/orders/${orderId}`);
          if (response.ok) {
            const orderData = await response.json();
            setOrder(orderData);
          } else {
            console.error("Failed to fetch order");
          }
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        
        {order && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Details</h2>
            <div className="text-left space-y-2">
              <p><span className="font-medium">Order ID:</span> #{order.id}</p>
              <p><span className="font-medium">Total:</span> ₹{parseFloat(order.total).toFixed(2)}</p>
              <p><span className="font-medium">Status:</span> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
              <p><span className="font-medium">Payment:</span> {order.payment_method_title}</p>
            </div>
          </div>
        )}
        
        <p className="text-gray-600 mb-8">
          Thank you for your order. We have received your request and will process it shortly. 
          You will receive a confirmation email with your order details.
        </p>

        <div className="space-y-4">
          <Link
            href="/products"
            className="block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors font-medium"
          >
            Continue Shopping
          </Link>
          
          <Link
            href="/"
            className="block text-primary hover:text-primary-dark font-medium"
          >
            Back to Home
          </Link>
        </div>

        {!order && orderId && (
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Order details could not be loaded, but your order has been placed successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
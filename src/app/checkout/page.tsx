"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { CreateOrderData, BillingAddress, ShippingAddress, ShippingCalculationResponse } from "@/lib/types";
import { CouponInput } from "@/components/cart/CouponInput";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  paymentMethod: 'phonepe';
}

export default function CheckoutPage() {
  const { 
    items, 
    getSubtotal, 
    getDiscount, 
    getDiscountedTotal, 
    appliedCoupon, 
    clearCart 
  } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [orderError, setOrderError] = useState<string>("");
  const [shippingOptions, setShippingOptions] = useState<ShippingCalculationResponse>({ methods: [] });
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [calculatingShipping, setCalculatingShipping] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    paymentMethod: "phonepe",
  });

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <Link
            href="/products"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const calculateShippingCosts = async () => {
    if (!form.city || !form.state || !form.pincode) return;

    setCalculatingShipping(true);
    try {
      const response = await fetch("/api/shipping/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: {
            country: "IN",
            state: form.state,
            city: form.city,
            postcode: form.pincode,
          },
          items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        const shippingData: ShippingCalculationResponse = await response.json();
        setShippingOptions(shippingData);
        
        // Auto-select first available method
        if (shippingData.methods.length > 0) {
          const firstMethod = shippingData.methods[0];
          setSelectedShippingMethod(firstMethod.method_id);
          setShippingCost(firstMethod.cost);
        }
      }
    } catch (error) {
      console.error("Error calculating shipping:", error);
    } finally {
      setCalculatingShipping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutForm]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Recalculate shipping when address changes
    if (["city", "state", "pincode"].includes(name)) {
      // Debounce the shipping calculation
      setTimeout(() => {
        calculateShippingCosts();
      }, 500);
    }
  };

  const handleShippingMethodChange = (methodId: string) => {
    setSelectedShippingMethod(methodId);
    const selectedMethod = shippingOptions.methods.find(m => m.method_id === methodId);
    if (selectedMethod) {
      setShippingCost(selectedMethod.cost);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<CheckoutForm> = {};

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Pincode must be 6 digits";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) newErrors.phone = "Phone number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setOrderError("");

    try {
      // Prepare billing address
      const billing: BillingAddress = {
        first_name: form.firstName,
        last_name: form.lastName,
        address_1: form.address,
        city: form.city,
        state: form.state,
        postcode: form.pincode,
        country: "IN",
        email: form.email,
        phone: form.phone,
      };

      // Use same address for shipping
      const shipping: ShippingAddress = {
        first_name: form.firstName,
        last_name: form.lastName,
        address_1: form.address,
        city: form.city,
        state: form.state,
        postcode: form.pincode,
        country: "IN",
      };

      // Prepare line items from cart
      const line_items = items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      // Get selected shipping method details
      const selectedMethod = shippingOptions.methods.find(m => m.method_id === selectedShippingMethod);
      
      // Prepare order data
      const orderData: CreateOrderData = {
        payment_method: form.paymentMethod,
        payment_method_title: 'PhonePe',
        set_paid: false,
        billing,
        shipping,
        line_items,
        shipping_lines: selectedMethod ? [
          {
            method_id: selectedMethod.method_id,
            method_title: selectedMethod.method_title,
            total: selectedMethod.cost.toFixed(2),
          },
        ] : [],
        coupon_lines: appliedCoupon ? [
          {
            code: appliedCoupon.code,
            discount: appliedCoupon.discount.toFixed(2),
            discount_tax: "0.00", // Assuming no tax on discount for now
          }
        ] : [],
      };

      {
        // PhonePe payment - create order and initiate payment
        const orderResponse = await fetch("/api/orders/create-and-pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderData }),
        });

        if (!orderResponse.ok) {
          const errorData = await orderResponse.json();
          throw new Error(errorData.error || "Failed to create order");
        }

        const orderResult = await orderResponse.json();
        
        // Create PhonePe payment
        const merchantOrderId = `ORDER_${orderResult.order.id}_${Math.random().toString(36).substr(2, 9)}`;
        const redirectUrl = `${window.location.origin}/payment-success?orderId=${merchantOrderId}`;
        const callbackUrl = `${window.location.origin}/api/phonepe/callback`;

        const paymentResponse = await fetch("/api/phonepe/create-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: getDiscountedTotal() + shippingCost,
            orderId: merchantOrderId,
            customerInfo: {
              name: `${form.firstName} ${form.lastName}`,
              email: form.email,
              phone: form.phone,
            },
            redirectUrl,
            callbackUrl,
          }),
        });

        if (!paymentResponse.ok) {
          const paymentError = await paymentResponse.json();
          throw new Error(paymentError.error || "Failed to create payment");
        }

        const paymentResult = await paymentResponse.json();
        
        // Redirect to PhonePe (don't clear cart until payment is confirmed)
        window.location.href = paymentResult.paymentUrl;
      }
    } catch (error: any) {
      console.error("Error processing order:", error);
      setOrderError(error.message || "Failed to process order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const discountedSubtotal = getDiscountedTotal();
  const total = discountedSubtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link
            href="/cart"
            className="flex items-center text-primary hover:text-primary-dark mr-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {orderError && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Order Error</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{orderError}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={form.address}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={form.state}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      required
                      value={form.pincode}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.pincode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Methods */}
              {shippingOptions.methods.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Method</h2>
                  {calculatingShipping ? (
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Calculating shipping options...
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {shippingOptions.methods.map((method) => (
                        <div key={method.method_id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id={method.method_id}
                              name="shippingMethod"
                              type="radio"
                              value={method.method_id}
                              checked={selectedShippingMethod === method.method_id}
                              onChange={(e) => handleShippingMethodChange(e.target.value)}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <label htmlFor={method.method_id} className="ml-3 block text-sm font-medium text-gray-700">
                              {method.method_title}
                            </label>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {method.cost === 0 ? "Free" : `₹${method.cost.toFixed(2)}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      id="phonepe"
                      name="paymentMethod"
                      type="radio"
                      value="phonepe"
                      checked={form.paymentMethod === 'phonepe'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 mt-1"
                    />
                    <div className="ml-3">
                      <label htmlFor="phonepe" className="block text-sm font-medium text-gray-700">
                        Pay Online (PhonePe)
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Secure online payment via PhonePe</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <ul className="divide-y divide-gray-200 mb-4">
                {items.map((item) => (
                  <li key={item.id} className="flex py-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-sm">
                        <h3 className="font-medium text-gray-700">{item.name}</h3>
                        <p className="text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Coupon Input */}
              <div className="mb-6">
                <CouponInput />
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="text-gray-900">₹{subtotal.toFixed(2)}</dd>
                </div>
                
                {appliedCoupon && discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-green-600">Discount ({appliedCoupon.code})</dt>
                    <dd className="text-green-600">-₹{discount.toFixed(2)}</dd>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="text-gray-900">{shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}</dd>
                </div>
                <div className="flex justify-between text-base font-medium border-t border-gray-200 pt-2">
                  <dt className="text-gray-900">Total</dt>
                  <dd className="text-gray-900">₹{total.toFixed(2)}</dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
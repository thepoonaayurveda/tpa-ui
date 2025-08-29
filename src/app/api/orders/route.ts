import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";
import { CreateOrderData } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const orderData: CreateOrderData = await request.json();

    // Validate required fields
    if (!orderData.billing || !orderData.shipping || !orderData.line_items || orderData.line_items.length === 0) {
      return NextResponse.json(
        { error: "Missing required order data" },
        { status: 400 }
      );
    }

    // Create order via WooCommerce API
    const order = await createOrder(orderData);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
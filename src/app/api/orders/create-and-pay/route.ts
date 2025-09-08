import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";
import { CreateOrderData } from "@/lib/types";

interface CreateOrderAndPayRequest {
  orderData: CreateOrderData;
}

export async function POST(request: NextRequest) {
  try {
    const { orderData }: CreateOrderAndPayRequest = await request.json();

    // Validate required fields
    if (!orderData || !orderData.billing || !orderData.line_items) {
      return NextResponse.json(
        { error: "Missing required order data" },
        { status: 400 }
      );
    }

    // Create order with pending status for online payments
    const pendingOrderData = {
      ...orderData,
      status: 'pending',
      set_paid: false, // Will be updated after successful payment
    };

    // Create order in WooCommerce
    const order = await createOrder(pendingOrderData);

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        total: order.total,
      },
      message: "Order created successfully, proceed with payment",
    });
  } catch (error: any) {
    console.error("Error creating order for payment:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to create order",
        success: false,
      },
      { status: 500 }
    );
  }
}
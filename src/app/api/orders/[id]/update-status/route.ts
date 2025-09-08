import { NextRequest, NextResponse } from "next/server";
import { updateOrder } from "@/lib/woocommerce";

interface UpdateOrderStatusRequest {
  status: 'pending' | 'processing' | 'failed' | 'completed' | 'cancelled';
  transaction_id?: string;
  payment_method?: string;
  notes?: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const { status, transaction_id, payment_method, notes }: UpdateOrderStatusRequest = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {
      status: status,
    };

    // Add transaction ID if provided
    if (transaction_id) {
      updateData.transaction_id = transaction_id;
    }

    // Add payment method if provided
    if (payment_method) {
      updateData.payment_method = payment_method;
    }

    // Set paid status based on order status
    if (status === 'processing' || status === 'completed') {
      updateData.set_paid = true;
    } else if (status === 'failed' || status === 'cancelled') {
      updateData.set_paid = false;
    }

    // Add customer note if provided
    if (notes) {
      updateData.customer_note = notes;
    }

    // Update order in WooCommerce
    const updatedOrder = await updateOrder(parseInt(orderId), updateData);

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: `Order status updated to ${status}`,
    });
  } catch (error: any) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to update order status",
        success: false,
      },
      { status: 500 }
    );
  }
}
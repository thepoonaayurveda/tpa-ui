import { NextRequest, NextResponse } from "next/server";
import { updateOrder } from "@/lib/woocommerce";
import { logOrderUpdate, logPaymentError } from "@/lib/logger";

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
    logOrderUpdate("🔄 === ORDER STATUS UPDATE API START ===");
    
    const orderId = params.id;
    const requestBody = await request.json();
    const { status, transaction_id, payment_method, notes }: UpdateOrderStatusRequest = requestBody;

    logOrderUpdate("📡 Order Status Update Request:", {
      orderId,
      status,
      transaction_id,
      payment_method,
      notes: notes ? notes.substring(0, 100) + (notes.length > 100 ? '...' : '') : undefined,
      fullRequestBody: requestBody
    });

    if (!orderId || !status) {
      logPaymentError("❌ Missing required parameters:", { orderId: !!orderId, status: !!status });
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    // Prepare update data
    console.log("🔧 Preparing update data for order:", orderId);
    
    const updateData: any = {
      status: status,
    };

    // Add transaction ID if provided
    if (transaction_id) {
      console.log("💳 Adding transaction ID:", transaction_id);
      updateData.transaction_id = transaction_id;
    }

    // Add payment method if provided
    if (payment_method) {
      console.log("💳 Adding payment method:", payment_method);
      updateData.payment_method = payment_method;
    }

    // Set paid status based on order status
    if (status === 'processing' || status === 'completed') {
      console.log("✅ Setting order as PAID for status:", status);
      updateData.set_paid = true;
    } else if (status === 'failed' || status === 'cancelled') {
      console.log("❌ Setting order as NOT PAID for status:", status);
      updateData.set_paid = false;
    }

    // Add customer note if provided
    if (notes) {
      console.log("📝 Adding customer note (length:", notes.length, ")");
      updateData.customer_note = notes;
    }

    // Add metadata for tracking
    updateData.meta_data = [
      {
        key: '_payment_method_title',
        value: payment_method === 'phonepe' ? 'PhonePe' : (payment_method || 'Unknown')
      }
    ];

    if (transaction_id) {
      updateData.meta_data.push({
        key: '_transaction_id',
        value: transaction_id
      });
    }
    
    console.log("📦 Final update data prepared:", {
      ...updateData,
      customer_note: updateData.customer_note ? `${updateData.customer_note.substring(0, 50)}...` : undefined
    });

    logOrderUpdate("📡 Calling WooCommerce updateOrder API:", {
      orderId: parseInt(orderId),
      targetStatus: status,
      hasPaidFlag: updateData.set_paid,
      hasTransactionId: !!transaction_id,
      hasPaymentMethod: !!payment_method,
      hasNotes: !!notes,
      metaDataCount: updateData.meta_data?.length
    });

    // Update order in WooCommerce
    const updatedOrder = await updateOrder(parseInt(orderId), updateData);
    
    logOrderUpdate("✅ WooCommerce order update successful:", {
      orderId: parseInt(orderId),
      returnedOrderId: updatedOrder?.id,
      returnedStatus: updatedOrder?.status,
      isPaid: updatedOrder?.date_paid ? 'Yes' : 'No'
    });

    const successResponse = {
      success: true,
      order: updatedOrder,
      message: `Order status updated to ${status}`,
    };
    
    logOrderUpdate("✅ ORDER STATUS UPDATE SUCCESS - Returning response:", {
      success: successResponse.success,
      message: successResponse.message,
      orderPresent: !!successResponse.order
    });
    
    return NextResponse.json(successResponse);
  } catch (error: any) {
    logPaymentError("💥 ORDER STATUS UPDATE ERROR:", {
      orderId: params.id,
      error: error.message,
      stack: error.stack
    });
    
    const errorResponse = { 
      error: error.message || "Failed to update order status",
      success: false,
    };
    
    logPaymentError("❌ ORDER STATUS UPDATE FAILED - Returning error:", {
      ...errorResponse,
      status: 500
    });
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
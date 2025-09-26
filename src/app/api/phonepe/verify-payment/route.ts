import { NextRequest, NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from "pg-sdk-node";
import { updateOrder } from "@/lib/woocommerce";

async function updateOrderStatus(orderId: string, status: 'processing' | 'failed', transactionId: string, notes?: string) {
  try {
    // Prepare update data (same logic as in the API route)
    const updateData: any = {
      status: status,
      transaction_id: transactionId,
      payment_method: 'phonepe',
      customer_note: notes,
    };

    // Set paid status based on order status
    if (status === 'processing') {
      updateData.set_paid = true;
    } else if (status === 'failed') {
      updateData.set_paid = false;
    }

    // Add metadata for tracking
    updateData.meta_data = [
      {
        key: '_payment_method_title',
        value: 'PhonePe'
      },
      {
        key: '_transaction_id',
        value: transactionId
      }
    ];

    console.log(`Updating order ${orderId} status to ${status}`, {
      orderId,
      status,
      transaction_id: transactionId,
      payment_method: 'phonepe',
      notes
    });

    // Call WooCommerce directly instead of making HTTP request
    const updatedOrder = await updateOrder(parseInt(orderId), updateData);
    
    console.log(`Order ${orderId} status updated to ${status} after verification`);
    return {
      success: true,
      order: updatedOrder,
      message: `Order status updated to ${status}`,
    };
  } catch (error) {
    console.error(`Error updating order ${orderId} status:`, error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    // Update to use merchantOrderId as per PhonePe documentation
    const { merchantOrderId, orderId } = requestBody;
    
    console.log("Payment verification request:", { merchantOrderId, orderId });

    if (!merchantOrderId) {
      return NextResponse.json(
        { error: "merchantOrderId is required for payment verification" },
        { status: 400 }
      );
    }

    // Validate PhonePe credentials
    const clientId = process.env.PHONEPE_CLIENT_ID;
    const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
    const environment = process.env.PHONEPE_ENVIRONMENT || "SANDBOX";

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "PhonePe credentials not configured" },
        { status: 500 }
      );
    }

    // Initialize PhonePe SDK client using singleton pattern
    const env = environment === "PRODUCTION" ? Env.PRODUCTION : Env.SANDBOX;
    const client = StandardCheckoutClient.getInstance(clientId, clientSecret, 1, env);

    // Verify payment status with PhonePe SDK using the correct method
    // Use merchantOrderId instead of transactionId as per PhonePe documentation
    const phonePeResponse = await client.getOrderStatus(merchantOrderId);

    // The response structure has state property directly
    if (phonePeResponse && phonePeResponse.state) {
      
      // Update order status if orderId is provided
      if (orderId) {
        try {
          let orderStatus: 'processing' | 'failed' | undefined;
          let notes = '';

          switch (phonePeResponse.state) {
            case 'COMPLETED':
              orderStatus = 'processing';
              notes = `Payment verified and completed. Amount: ₹${phonePeResponse.amount/100}. PhonePe Order ID: ${phonePeResponse.orderId}. Merchant Order ID: ${merchantOrderId}`;
              break;
            case 'FAILED':
              orderStatus = 'failed';
              notes = `Payment verification failed. PhonePe Order ID: ${phonePeResponse.orderId}. Merchant Order ID: ${merchantOrderId}`;
              break;
            case 'PENDING':
              console.log(`Payment still pending for order ${orderId}`);
              orderStatus = undefined; // Don't update if still pending
              break;
            default:
              console.log(`Payment verification - unhandled state: ${phonePeResponse.state}`);
              orderStatus = undefined;
              break;
          }

          if (orderStatus) {
            // Use merchantOrderId as transactionId for WooCommerce tracking
            const transactionIdForWooCommerce = merchantOrderId;
            await updateOrderStatus(orderId, orderStatus, transactionIdForWooCommerce, notes);
            console.log(`Order ${orderId} status updated to ${orderStatus} after verification`);
          }
        } catch (updateError) {
          console.error(`Failed to update order ${orderId} after verification:`, updateError);
          // Continue with response even if update fails
        }
      }
      
      return NextResponse.json({
        success: true,
        status: phonePeResponse.state,
        orderId: phonePeResponse.orderId, // PhonePe's internal order ID
        amount: phonePeResponse.amount,
        expireAt: phonePeResponse.expireAt,
        merchantOrderId: merchantOrderId // Our merchant order ID
      });
    } else {
      // If verification failed and orderId is provided, mark order as failed
      if (orderId) {
        try {
          await updateOrderStatus(orderId, 'failed', merchantOrderId, `Payment verification failed - no valid response from PhonePe. Merchant Order ID: ${merchantOrderId}`);
          console.log(`Order ${orderId} marked as failed after verification failure`);
        } catch (updateError) {
          console.error(`Failed to mark order ${orderId} as failed:`, updateError);
        }
      }

      return NextResponse.json({
        success: false,
        error: "Payment verification failed - no valid response"
      });
    }
  } catch (error: any) {
    console.error("Error verifying PhonePe payment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
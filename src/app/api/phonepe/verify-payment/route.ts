import { NextRequest, NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from "pg-sdk-node";

async function updateOrderStatus(orderId: string, status: 'processing' | 'failed', transactionId: string, notes?: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/orders/${orderId}/update-status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: status,
        transaction_id: transactionId,
        payment_method: 'phonepe',
        notes: notes,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating order ${orderId} status:`, error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { transactionId, orderId } = await request.json();

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
    const phonePeResponse = await client.getOrderStatus(transactionId);

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
              notes = `Payment verified and completed. Amount: ₹${phonePeResponse.amount/100}. Order ID: ${phonePeResponse.orderId}`;
              break;
            case 'FAILED':
              orderStatus = 'failed';
              notes = `Payment verification failed. Order ID: ${phonePeResponse.orderId}`;
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
            await updateOrderStatus(orderId, orderStatus, transactionId, notes);
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
        orderId: phonePeResponse.orderId,
        amount: phonePeResponse.amount,
        expireAt: phonePeResponse.expireAt
      });
    } else {
      // If verification failed and orderId is provided, mark order as failed
      if (orderId) {
        try {
          await updateOrderStatus(orderId, 'failed', transactionId, `Payment verification failed - no valid response`);
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
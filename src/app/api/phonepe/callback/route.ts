import { NextRequest, NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from "pg-sdk-node";

async function updateOrderStatus(orderId: string, status: 'processing' | 'failed', transactionId: string, notes?: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WC_URL}/api/orders/${orderId}/update-status`, {
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
    const body = await request.json();

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

    console.log("PhonePe Callback received:", body);

    // PhonePe SDK callback handling
    // The callback data structure may vary based on SDK version
    // Extract transaction ID to verify the payment status
    const transactionId = body.transactionId || body.merchantTransactionId;
    
    if (!transactionId) {
      console.warn("No transaction ID found in callback");
      return NextResponse.json({ success: true });
    }

    // Initialize PhonePe SDK client using singleton pattern
    const env = environment === "PRODUCTION" ? Env.PRODUCTION : Env.SANDBOX;
    const client = StandardCheckoutClient.getInstance(clientId, clientSecret, 1, env);

    // Verify the payment status using SDK
    const paymentStatus = await client.getOrderStatus(transactionId);
    
    if (paymentStatus && paymentStatus.state) {
      // Extract order ID from transactionId (assuming format like ORDER_123_abc)
      const orderIdMatch = transactionId?.match(/ORDER_(\d+)_/);
      let orderId = null;
      
      // Try to extract order ID from the transaction ID pattern
      if (orderIdMatch) {
        orderId = orderIdMatch[1];
      } else {
        // If pattern doesn't match, try to find order by transaction ID
        // This would require a database lookup which we'll skip for now
        console.warn("Could not extract order ID from transactionId:", transactionId);
      }

      // Update order status based on payment state
      if (orderId) {
        let orderStatus: 'processing' | 'failed';
        let notes = '';

        switch (paymentStatus.state) {
          case 'COMPLETED':
            orderStatus = 'processing';
            notes = `Payment completed successfully via callback. Amount: ₹${paymentStatus.amount/100}. PhonePe Order ID: ${paymentStatus.orderId}`;
            break;
          case 'FAILED':
            orderStatus = 'failed';
            notes = `Payment failed via callback. PhonePe Order ID: ${paymentStatus.orderId}`;
            break;
          case 'PENDING':
            console.log(`Payment still pending for order ${orderId}`);
            return NextResponse.json({ success: true, message: "Payment pending - no action taken" });
          default:
            console.log(`Unhandled payment state: ${paymentStatus.state}`);
            return NextResponse.json({ success: true, message: "Callback received but no action taken" });
        }

        // Update order status in WooCommerce
        try {
          await updateOrderStatus(orderId, orderStatus, transactionId, notes);
          console.log(`Order ${orderId} status updated to ${orderStatus} via callback`);
        } catch (updateError) {
          console.error(`Failed to update order ${orderId}:`, updateError);
          // Still return success to PhonePe to avoid retries, but log the error
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error processing PhonePe callback:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process callback" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Handle GET callback (some payment gateways use GET for callbacks)
  const { searchParams } = new URL(request.url);
  const transactionId = searchParams.get('transactionId');
  const status = searchParams.get('code');
  const merchantTransactionId = searchParams.get('merchantTransactionId');

  console.log("PhonePe GET Callback:", { transactionId, status, merchantTransactionId });

  // Extract order ID from merchantTransactionId if available
  if (merchantTransactionId && status) {
    const orderIdMatch = merchantTransactionId.match(/ORDER_(\d+)_/);
    let orderId = null;
    
    if (orderIdMatch) {
      orderId = orderIdMatch[1];
    }

    // Update order status based on callback status
    if (orderId) {
      try {
        let orderStatus: 'processing' | 'failed';
        let notes = '';

        switch (status) {
          case 'PAYMENT_SUCCESS':
            orderStatus = 'processing';
            notes = `Payment completed via GET callback. Transaction ID: ${transactionId}`;
            break;
          case 'PAYMENT_ERROR':
          case 'PAYMENT_DECLINED':
            orderStatus = 'failed';
            notes = `Payment failed via GET callback. Status: ${status}. Transaction ID: ${transactionId}`;
            break;
          default:
            console.log(`Unhandled GET callback status: ${status}`);
            return NextResponse.json({ success: true, transactionId, status });
        }

        // Update order status in WooCommerce
        await updateOrderStatus(orderId, orderStatus, transactionId || merchantTransactionId, notes);
        console.log(`Order ${orderId} status updated to ${orderStatus} via GET callback`);
      } catch (updateError) {
        console.error(`Failed to update order via GET callback:`, updateError);
      }
    }
  }

  return NextResponse.json({ success: true, transactionId, status });
}